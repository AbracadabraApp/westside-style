// src/gasp/optimizer.js

const GaspGoogleAdsClient = require('./google-ads-client');
const GaspClaudeClient = require('./claude-client');
const { validateRecommendations, applySafetyLimits } = require('./utils/validation');
const { logOptimization } = require('./utils/logger');

class GaspOptimizer {
  constructor() {
    this.googleAds = new GaspGoogleAdsClient();
    this.claude = new GaspClaudeClient();
  }

  /**
   * Main weekly optimization cycle
   * @returns {Promise<Object>} Optimization results
   */
  async runWeeklyOptimization() {
    console.log('=== GASP Weekly Optimization Starting ===');
    console.log(`Timestamp: ${new Date().toISOString()}\n`);

    const results = {
      timestamp: new Date().toISOString(),
      phase: 'weekly_optimization',
      actions: [],
      errors: [],
      metrics: {}
    };

    try {
      // Step 1: Fetch search terms data
      console.log('Step 1: Fetching search terms (last 14 days)...');
      const searchTerms = await this.googleAds.getSearchTerms(14);
      console.log(`Found ${searchTerms.length} search terms\n`);

      results.metrics.searchTermsAnalyzed = searchTerms.length;

      if (searchTerms.length === 0) {
        console.log('⚠️  No search terms data. Campaigns might be new or paused.');
        results.actions.push({ type: 'INFO', message: 'No search terms to analyze' });
        return results;
      }

      // Step 2: Send to Claude for analysis
      console.log('Step 2: Analyzing with Claude...');
      const recommendations = await this.claude.analyzeSearchTerms(searchTerms);
      console.log(`Claude analysis complete. Token usage: ${recommendations.inputTokens + recommendations.outputTokens}\n`);

      results.metrics.claudeTokens = recommendations.inputTokens + recommendations.outputTokens;
      results.claudeSummary = recommendations.summary;

      // Step 3: Validate recommendations
      console.log('Step 3: Validating recommendations...');
      const validatedRecs = validateRecommendations(recommendations);
      const safeRecs = applySafetyLimits(validatedRecs);
      console.log(`Validated ${safeRecs.negativeKeywords.length} negative keywords\n`);

      // Step 4: Execute negative keywords (if any)
      if (safeRecs.negativeKeywords.length > 0) {
        console.log('Step 4: Adding negative keywords...');

        for (const negKw of safeRecs.negativeKeywords) {
          try {
            // Extract campaign ID from search terms
            // In production, map campaign name to ID properly
            const campaignId = '12345678'; // PLACEHOLDER - get from campaign mapping

            await this.googleAds.addCampaignNegativeKeyword(
              campaignId,
              negKw.keyword,
              negKw.matchType
            );

            results.actions.push({
              type: 'NEGATIVE_KEYWORD_ADDED',
              keyword: negKw.keyword,
              matchType: negKw.matchType,
              reasoning: negKw.reasoning
            });

            console.log(`✓ Added negative: "${negKw.keyword}" (${negKw.matchType})`);

          } catch (error) {
            results.errors.push({
              type: 'NEGATIVE_KEYWORD_FAILED',
              keyword: negKw.keyword,
              error: error.message
            });
            console.error(`✗ Failed: "${negKw.keyword}" - ${error.message}`);
          }
        }
      }

      // Step 5: Log optimization results
      await logOptimization(results);

      console.log('\n=== GASP Weekly Optimization Complete ===');
      console.log(`Actions taken: ${results.actions.length}`);
      console.log(`Errors: ${results.errors.length}\n`);

      return results;

    } catch (error) {
      console.error('Optimization failed:', error);
      results.errors.push({
        type: 'OPTIMIZATION_FAILED',
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Emergency health check (runs daily)
   * @returns {Promise<Object>} Health status
   */
  async runHealthCheck() {
    console.log('=== GASP Health Check ===');

    const health = {
      timestamp: new Date().toISOString(),
      status: 'OK',
      alerts: []
    };

    try {
      // Check campaign status
      const campaigns = await this.googleAds.getCampaigns();
      const gaspCampaigns = campaigns.filter(c =>
        c.campaign.name.includes('GASP')
      );

      for (const campaign of gaspCampaigns) {
        const metrics = campaign.metrics;
        const spend = metrics.cost_micros / 1000000;

        // Alert if campaign is paused
        if (campaign.campaign.status === 'PAUSED') {
          health.alerts.push({
            severity: 'URGENT',
            campaign: campaign.campaign.name,
            issue: 'Campaign is paused',
            action: 'Re-enable campaign if this was not intentional'
          });
        }

        // Alert if daily budget exceeded early
        const currentHour = new Date().getHours();
        const expectedSpend = (12 / 24) * currentHour; // $12/day budget

        if (spend > expectedSpend * 1.5 && currentHour < 12) {
          health.alerts.push({
            severity: 'WATCH',
            campaign: campaign.campaign.name,
            issue: `Spending ahead of pace: $${spend.toFixed(2)} by ${currentHour}:00`,
            action: 'Consider lowering bids or checking for runaway keyword'
          });
        }
      }

      if (health.alerts.length > 0) {
        health.status = 'ALERTS';
      }

      console.log(`Status: ${health.status}`);
      console.log(`Alerts: ${health.alerts.length}\n`);

      return health;

    } catch (error) {
      health.status = 'ERROR';
      health.error = error.message;
      console.error('Health check failed:', error);
      return health;
    }
  }
}

module.exports = GaspOptimizer;
