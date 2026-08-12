// src/gasp/mutations.js

const { enums } = require('google-ads-api');

class GaspMutations {
  constructor(googleAdsClient) {
    this.client = googleAdsClient;
  }

  /**
   * Add negative keywords in batch
   * @param {Array} negativeKeywords - Array of {campaignId, keyword, matchType}
   * @returns {Promise<Array>} Results
   */
  async addNegativeKeywordsBatch(negativeKeywords) {
    const results = [];

    for (const negKw of negativeKeywords) {
      try {
        const result = await this.client.addCampaignNegativeKeyword(
          negKw.campaignId,
          negKw.keyword,
          negKw.matchType
        );

        results.push({
          success: true,
          keyword: negKw.keyword,
          matchType: negKw.matchType,
          reasoning: negKw.reasoning
        });

        // Rate limiting: wait 100ms between mutations
        await this.sleep(100);

      } catch (error) {
        results.push({
          success: false,
          keyword: negKw.keyword,
          error: error.message
        });

        console.error(`Failed to add negative keyword "${negKw.keyword}":`, error.message);
      }
    }

    return results;
  }

  /**
   * Update keyword bids in batch
   * @param {Array} bidAdjustments - Array of {criterionId, newBidMicros}
   * @returns {Promise<Array>} Results
   */
  async updateKeywordBidsBatch(bidAdjustments) {
    const results = [];

    for (const bidAdj of bidAdjustments) {
      try {
        const result = await this.client.updateKeywordBid(
          bidAdj.criterionId,
          bidAdj.newBidMicros
        );

        results.push({
          success: true,
          keyword: bidAdj.keyword,
          oldBid: bidAdj.currentBid,
          newBid: bidAdj.newBidMicros / 1000000,
          reasoning: bidAdj.reasoning
        });

        // Rate limiting
        await this.sleep(100);

      } catch (error) {
        results.push({
          success: false,
          keyword: bidAdj.keyword,
          error: error.message
        });

        console.error(`Failed to update bid for "${bidAdj.keyword}":`, error.message);
      }
    }

    return results;
  }

  /**
   * Pause underperforming ads
   * @param {Array} adIds - Array of ad IDs to pause
   * @returns {Promise<Array>} Results
   */
  async pauseAds(adIds) {
    const results = [];

    for (const adId of adIds) {
      try {
        const operation = {
          update: {
            resource_name: adId,
            status: enums.AdGroupAdStatus.PAUSED
          },
          update_mask: {
            paths: ['status']
          }
        };

        await this.client.customer.adGroupAds.update([operation]);

        results.push({
          success: true,
          adId,
          action: 'PAUSED'
        });

        await this.sleep(100);

      } catch (error) {
        results.push({
          success: false,
          adId,
          error: error.message
        });

        console.error(`Failed to pause ad ${adId}:`, error.message);
      }
    }

    return results;
  }

  /**
   * Create new responsive search ad
   * @param {Object} adConfig - Ad configuration
   * @returns {Promise<Object>} Created ad info
   */
  async createResponsiveSearchAd(adConfig) {
    try {
      const operation = {
        create: {
          ad_group: adConfig.adGroupResourceName,
          status: enums.AdGroupAdStatus.ENABLED,
          ad: {
            final_urls: [adConfig.finalUrl],
            responsive_search_ad: {
              headlines: adConfig.headlines.map(text => ({ text })),
              descriptions: adConfig.descriptions.map(text => ({ text })),
              path1: adConfig.path1,
              path2: adConfig.path2
            }
          }
        }
      };

      const response = await this.client.customer.adGroupAds.create([operation]);

      console.log(`✓ Created new ad in ad group ${adConfig.adGroupResourceName}`);

      return {
        success: true,
        resourceName: response[0].resource_name
      };

    } catch (error) {
      console.error('Failed to create ad:', error);
      throw error;
    }
  }

  /**
   * Update campaign daily budget
   * @param {string} campaignId - Campaign ID
   * @param {number} newBudgetMicros - New budget in micros
   * @returns {Promise<Object>} Result
   */
  async updateCampaignBudget(campaignId, newBudgetMicros) {
    try {
      // Get campaign budget resource name first
      const query = `
        SELECT campaign_budget.resource_name
        FROM campaign
        WHERE campaign.id = ${campaignId}
      `;

      const results = await this.client.query(query);
      const budgetResourceName = results[0].campaign_budget.resource_name;

      // Update budget
      const operation = {
        update: {
          resource_name: budgetResourceName,
          amount_micros: newBudgetMicros
        },
        update_mask: {
          paths: ['amount_micros']
        }
      };

      await this.client.customer.campaignBudgets.update([operation]);

      console.log(`✓ Updated campaign ${campaignId} budget to $${newBudgetMicros / 1000000}/day`);

      return {
        success: true,
        campaignId,
        newDailyBudget: newBudgetMicros / 1000000
      };

    } catch (error) {
      console.error('Failed to update budget:', error);
      throw error;
    }
  }

  /**
   * Helper: Sleep for rate limiting
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = GaspMutations;
