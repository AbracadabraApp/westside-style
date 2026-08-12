# GASP Technical Implementation Plan
## Google Ads Systematic Program - Developer Guide

**Project:** Claude-driven Google Ads optimization for Westside Style  
**Budget:** $360/month (low-traffic reality)  
**Goal:** Beat Performance Max through transparent, systematic optimization  
**Tech Stack:** Google Ads API v22, Claude API (Sonnet 4.5), Netlify Functions  

**Date Created:** August 12, 2026  
**Implementation Approach:** Phased rollout with manual → semi-automated → fully automated progression

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Decision: MCP vs Direct API](#architecture-decision)
3. [Phase 0: Prerequisites (Week 0)](#phase-0-prerequisites)
4. [Phase 1: Google Ads API Setup (Week 1)](#phase-1-google-ads-api-setup)
5. [Phase 2: Claude Integration (Week 2)](#phase-2-claude-integration)
6. [Phase 3: Automation Deployment (Week 3)](#phase-3-automation-deployment)
7. [Phase 4: Data Fetching & Analysis (Week 4)](#phase-4-data-fetching-analysis)
8. [Phase 5: Mutation Operations (Week 5-6)](#phase-5-mutation-operations)
9. [Security & Error Handling](#security-error-handling)
10. [Testing Strategy](#testing-strategy)
11. [Monitoring & Observability](#monitoring-observability)
12. [Cost Analysis](#cost-analysis)

---

## Project Overview

### The Challenge

At $360/month budget:
- ~30-40 clicks/month (1-2 clicks/day)
- ~1-2 bookings/month
- Performance Max is a black box
- Need extreme efficiency due to low volume

### The Solution: GASP

Claude-driven optimization that:
1. Separates brand/non-brand campaigns (critical at low budget)
2. Adds negative keywords weekly to eliminate waste
3. Adjusts bids based on performance data
4. Provides full transparency into every decision

### Success Metrics

After 90 days, GASP wins if 2 of 3:
- 20%+ lower CPA than Performance Max
- Equal or higher conversion volume
- 25%+ better ROAS

---

## Architecture Decision

### Option A: MCP Server Integration (Recommended for MVP)

**Pros:**
- Abstraction layer handles OAuth complexity
- Built-in error handling and retries
- Easier to get started
- May support write operations soon

**Cons:**
- Less control over API calls
- Dependent on MCP provider
- May have rate limits or costs

**MCP Providers to Evaluate:**

1. **windsor.ai** - Marketing data integration
   - Status: Check if supports Google Ads write operations
   - Pricing: Freemium model
   
2. **Composio** - Developer-friendly
   - Status: Check latest integration capabilities
   - Pricing: Usage-based

**Recommendation:** Start with direct API (Option B) for full control. MCP can be added later if beneficial.

### Option B: Direct Google Ads API (Recommended)

**Pros:**
- Full control over all operations
- No third-party dependencies
- Google's official SDK (google-ads-api npm package)
- Free (except Google Cloud costs)

**Cons:**
- OAuth setup complexity (one-time)
- Need to handle rate limits manually
- More code to write

**Verdict:** Use direct Google Ads API for transparency and control.

---

## Phase 0: Prerequisites

**Time Estimate:** 1-2 hours  
**Must Complete Before Starting Development**

### 0.1 Google Cloud Project Setup

```bash
# 1. Go to Google Cloud Console
https://console.cloud.google.com/

# 2. Create new project (or use existing)
Project Name: westside-style-gasp
Project ID: westside-style-gasp-2026

# 3. Enable Google Ads API
Navigation: APIs & Services → Library
Search: "Google Ads API"
Click: Enable

# 4. Set up OAuth 2.0 consent screen
Navigation: APIs & Services → OAuth consent screen
User Type: External
App Name: GASP - Westside Style Optimizer
User support email: [your email]
Developer contact: [your email]
Scopes: Add "Google Ads API" scope
Test users: Add your Google account email

# 5. Create OAuth 2.0 credentials
Navigation: APIs & Services → Credentials
Click: Create Credentials → OAuth client ID
Application type: Web application
Name: GASP Web Client
Authorized redirect URIs:
  - http://localhost:3000/oauth2callback
  - https://westside.style/.netlify/functions/oauth-callback
Click: Create
SAVE: Client ID and Client Secret (you'll need these)
```

### 0.2 Google Ads Developer Token

```bash
# 1. Apply for developer token
URL: https://ads.google.com/aw/apicenter

# 2. Fill out application form
Account: AW-18371102793 (Westside Style)
Purpose: Automated campaign optimization
Expected API calls: ~500/day
Token usage: Internal optimization tool

# 3. Wait for approval (1-3 business days)
# While waiting: Test with test account token
# Test token: Available immediately from API Center

# 4. Save developer token securely
# Format: Usually 22 characters, alphanumeric with dashes
# Example: AbCdEfGh1234567890-Xy
```

### 0.3 Local Development Environment

```bash
# Install Node.js dependencies
cd /Users/josh.petersen/westside-style
npm install --save google-ads-api @anthropic-ai/sdk dotenv

# Create environment variables file
cat > .env.local << 'ENVFILE'
# Google Ads API Credentials
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_here
GOOGLE_ADS_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_client_secret_here
GOOGLE_ADS_REFRESH_TOKEN=will_generate_this_in_phase_1
GOOGLE_ADS_CUSTOMER_ID=18371102793

# Anthropic API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Monitoring (optional)
GASP_LOG_LEVEL=info
GASP_ENABLE_SLACK_ALERTS=false
ENVFILE

# Add to .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### 0.4 Project Structure Setup

```bash
# Create directory structure
mkdir -p netlify/functions/gasp
mkdir -p src/gasp
mkdir -p src/gasp/utils
mkdir -p src/gasp/prompts
mkdir -p logs
mkdir -p config

# Create basic files
touch src/gasp/google-ads-client.js
touch src/gasp/claude-client.js
touch src/gasp/optimizer.js
touch src/gasp/utils/gaql-queries.js
touch src/gasp/utils/validation.js
touch src/gasp/utils/safety-limits.js
touch config/campaigns.json
touch config/negative-keywords.json
```

**Checklist:**
- [ ] Google Cloud project created
- [ ] Google Ads API enabled
- [ ] OAuth 2.0 credentials generated
- [ ] Google Ads developer token requested/received
- [ ] Node.js dependencies installed
- [ ] Environment variables configured
- [ ] Project structure created

---

## Phase 1: Google Ads API Setup

**Time Estimate:** 3-4 hours  
**Goal:** Establish working connection to Google Ads API with OAuth authentication

### 1.1 OAuth 2.0 Authentication Flow

**Create authentication utility:**

```javascript
// src/gasp/utils/oauth-helper.js

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const url = require('url');
const open = require('open');

const SCOPES = ['https://www.googleapis.com/auth/adwords'];
const TOKEN_PATH = path.join(__dirname, '../../../.google-ads-token.json');
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

/**
 * Generate OAuth2 client
 */
function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
    REDIRECT_URI
  );
}

/**
 * Generate refresh token (run once)
 * Usage: node src/gasp/utils/oauth-helper.js
 */
async function generateRefreshToken() {
  const oAuth2Client = getOAuth2Client();

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force to get refresh token
  });

  console.log('\n=== Google Ads OAuth Setup ===\n');
  console.log('1. Opening browser to authorize GASP...');
  console.log('2. Sign in with your Google Ads account');
  console.log('3. Grant permissions');
  console.log('\nIf browser doesn\'t open, visit this URL:\n');
  console.log(authorizeUrl);
  console.log('\n');

  // Open browser
  await open(authorizeUrl);

  // Start local server to receive callback
  const server = http.createServer(async (req, res) => {
    try {
      if (req.url.indexOf('/oauth2callback') > -1) {
        const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
        const code = qs.get('code');
        
        res.end('Authentication successful! You can close this window and return to terminal.');

        const { tokens } = await oAuth2Client.getToken(code);
        
        // Save refresh token
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        
        console.log('\n✅ Success! Refresh token saved to:', TOKEN_PATH);
        console.log('\nRefresh token:', tokens.refresh_token);
        console.log('\n📝 Add this to your .env.local:');
        console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}`);
        
        server.close();
        process.exit(0);
      }
    } catch (error) {
      console.error('Error during OAuth:', error);
      res.end('Authentication failed. Check terminal for error.');
      server.close();
      process.exit(1);
    }
  });

  server.listen(3000, () => {
    console.log('Listening for OAuth callback on http://localhost:3000');
  });
}

// If run directly, generate refresh token
if (require.main === module) {
  generateRefreshToken().catch(console.error);
}

module.exports = { getOAuth2Client };
```

**Run authentication:**

```bash
# Install additional dependency for OAuth flow
npm install --save googleapis open

# Run OAuth helper to generate refresh token
node src/gasp/utils/oauth-helper.js

# Follow prompts:
# 1. Browser opens to Google sign-in
# 2. Sign in with account that has access to AW-18371102793
# 3. Grant permissions
# 4. Copy refresh token from terminal
# 5. Add to .env.local as GOOGLE_ADS_REFRESH_TOKEN

# Test authentication
# The refresh token should be saved in .google-ads-token.json
# Add this file to .gitignore
echo ".google-ads-token.json" >> .gitignore
```

### 1.2 Google Ads API Client Setup

**Create API client wrapper:**

```javascript
// src/gasp/google-ads-client.js

const { GoogleAdsApi, enums } = require('google-ads-api');

class GaspGoogleAdsClient {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    });

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');
    
    this.customer = this.client.Customer({
      customer_id: this.customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
    });
  }

  /**
   * Execute GAQL query
   * @param {string} query - GAQL query string
   * @returns {Promise<Array>} Query results
   */
  async query(query) {
    try {
      const results = await this.customer.query(query);
      return results;
    } catch (error) {
      console.error('GAQL query error:', error);
      throw new Error(`Google Ads query failed: ${error.message}`);
    }
  }

  /**
   * Get campaign list
   * @returns {Promise<Array>} List of campaigns
   */
  async getCampaigns() {
    const query = `
      SELECT 
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        metrics.cost_micros,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions
      FROM campaign
      WHERE campaign.status != 'REMOVED'
      ORDER BY campaign.name
    `;

    return this.query(query);
  }

  /**
   * Get search terms report for GASP campaigns
   * @param {number} days - Number of days to look back
   * @returns {Promise<Array>} Search terms data
   */
  async getSearchTerms(days = 7) {
    const query = `
      SELECT
        campaign.name,
        campaign.id,
        ad_group.name,
        ad_group.id,
        segments.search_term,
        segments.search_term_match_type,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.average_cpc
      FROM search_term_view
      WHERE 
        segments.date DURING LAST_${days}_DAYS
        AND campaign.labels CONTAINS 'GASP-Test'
        AND metrics.impressions > 0
      ORDER BY metrics.cost_micros DESC
      LIMIT 500
    `;

    return this.query(query);
  }

  /**
   * Add negative keyword to campaign
   * @param {string} campaignId - Campaign resource name
   * @param {string} keyword - Keyword text
   * @param {string} matchType - EXACT, PHRASE, or BROAD
   */
  async addCampaignNegativeKeyword(campaignId, keyword, matchType = 'PHRASE') {
    try {
      const operation = {
        create: {
          campaign: `customers/${this.customerId}/campaigns/${campaignId}`,
          keyword: {
            text: keyword,
            match_type: enums.KeywordMatchType[matchType],
          },
        },
      };

      const response = await this.customer.campaignNegativeKeywords.create([operation]);
      console.log(`✓ Added negative keyword: "${keyword}" (${matchType}) to campaign ${campaignId}`);
      return response;
    } catch (error) {
      console.error(`Failed to add negative keyword: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update keyword bid
   * @param {string} adGroupCriterionId - Ad group criterion resource name
   * @param {number} bidMicros - New bid in micros (bid * 1,000,000)
   */
  async updateKeywordBid(adGroupCriterionId, bidMicros) {
    try {
      const operation = {
        update: {
          resource_name: adGroupCriterionId,
          cpc_bid_micros: bidMicros,
        },
        update_mask: {
          paths: ['cpc_bid_micros'],
        },
      };

      const response = await this.customer.adGroupCriteria.update([operation]);
      console.log(`✓ Updated bid for ${adGroupCriterionId} to $${bidMicros / 1000000}`);
      return response;
    } catch (error) {
      console.error(`Failed to update keyword bid: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GaspGoogleAdsClient;
```

### 1.3 Test Connection

**Create test script:**

```javascript
// test-google-ads-connection.js

require('dotenv').config({ path: '.env.local' });
const GaspGoogleAdsClient = require('./src/gasp/google-ads-client');

async function testConnection() {
  console.log('=== Testing Google Ads API Connection ===\n');

  try {
    const client = new GaspGoogleAdsClient();
    
    console.log('1. Fetching campaigns...');
    const campaigns = await client.getCampaigns();
    
    console.log(`\n✅ Success! Found ${campaigns.length} campaigns:\n`);
    
    campaigns.forEach(row => {
      const campaign = row.campaign;
      const metrics = row.metrics;
      
      console.log(`Campaign: ${campaign.name}`);
      console.log(`  ID: ${campaign.id}`);
      console.log(`  Status: ${campaign.status}`);
      console.log(`  Type: ${campaign.advertising_channel_type}`);
      console.log(`  Spend: $${(metrics.cost_micros / 1000000).toFixed(2)}`);
      console.log(`  Clicks: ${metrics.clicks}`);
      console.log(`  Conversions: ${metrics.conversions}`);
      console.log('');
    });

    // Test search terms query for GASP campaigns
    console.log('\n2. Testing search terms query (GASP campaigns only)...');
    const searchTerms = await client.getSearchTerms(7);
    console.log(`✅ Found ${searchTerms.length} search terms in last 7 days\n`);

    if (searchTerms.length > 0) {
      console.log('Sample search terms:');
      searchTerms.slice(0, 5).forEach(row => {
        console.log(`  "${row.segments.search_term}" → ${row.metrics.clicks} clicks, $${(row.metrics.cost_micros / 1000000).toFixed(2)} cost`);
      });
    }

    console.log('\n✅ All tests passed! Google Ads API connection working.\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check that .env.local has all credentials');
    console.error('2. Verify developer token is approved (or use test account)');
    console.error('3. Ensure refresh token is valid (regenerate if needed)');
    console.error('4. Confirm customer ID format: no dashes (18371102793)');
    process.exit(1);
  }
}

testConnection();
```

**Run tests:**

```bash
# Test connection
node test-google-ads-connection.js

# Expected output:
# ✅ Success! Found 3 campaigns
# Campaign: GASP-Brand-Defense (if created)
# Campaign: GASP-Non-Brand-Focused (if created)
# Campaign: Performance Max
# ...

# If errors:
# - Check environment variables in .env.local
# - Verify refresh token is correct
# - Ensure developer token is approved (or use test account)
```

**Checklist:**
- [ ] OAuth flow completed, refresh token saved
- [ ] Google Ads client initialized successfully
- [ ] Test script runs and fetches campaigns
- [ ] Search terms query returns data
- [ ] No authentication errors

**Time to Complete Phase 1:** 3-4 hours

---

## Phase 2: Claude Integration

**Time Estimate:** 2-3 hours  
**Goal:** Set up Claude API client and create prompt templates for optimization

### 2.1 Claude API Client

```javascript
// src/gasp/claude-client.js

const Anthropic = require('@anthropic-ai/sdk');

class GaspClaudeClient {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    this.model = 'claude-sonnet-4-5-20250929';
    this.maxTokens = 16000;
  }

  /**
   * Analyze search terms and provide optimization recommendations
   * @param {Array} searchTermsData - Search terms from Google Ads
   * @param {Object} context - Additional business context
   * @returns {Promise<Object>} Structured recommendations
   */
  async analyzeSearchTerms(searchTermsData, context = {}) {
    const systemPrompt = `You are an expert Google Ads strategist for Westside Style, a premium hair extensions specialist in Seattle.

Business Context:
- Services: Keratin bond extensions ($1,200+), Hand tied ($1,000+), Tape-in ($800+)
- Target market: Seattle metro, female 25-45, household income $100k+
- Unique value: Extensions-only specialist (not full-service salon), 10+ years experience
- Budget: $360/month ($12/day) - VERY LIMITED, must eliminate all waste
- Current performance: ~30-40 clicks/month, 1-2 bookings/month
- Average booking value: $1,000

Your task: Analyze search query performance and identify optimization opportunities.

CRITICAL: At this budget level, every wasted click matters. Be aggressive with negative keywords.`;

    const userPrompt = `Here are the search terms from the last 7 days for GASP campaigns:

${JSON.stringify(searchTermsData, null, 2)}

Please analyze this data and provide optimization recommendations in the following JSON format:

{
  "summary": "Brief 2-3 sentence overview of overall performance",
  "negativeKeywords": [
    {
      "keyword": "exact keyword text to block",
      "matchType": "PHRASE",
      "reasoning": "Why this should be blocked (low intent, wrong audience, etc.)",
      "estimatedSavings": "estimated dollars saved per month"
    }
  ],
  "bidAdjustments": [
    {
      "keyword": "keyword to adjust",
      "currentBid": 12.00,
      "recommendedBid": 15.00,
      "reasoning": "Why bid should change (high conversion rate, low CPA, etc.)"
    }
  ],
  "opportunities": [
    {
      "type": "NEW_KEYWORD" | "AD_COPY" | "LANDING_PAGE",
      "description": "What opportunity exists",
      "action": "Specific action to take",
      "priority": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "concerns": [
    {
      "issue": "What's concerning",
      "severity": "URGENT" | "WATCH" | "INFO",
      "recommendation": "How to address"
    }
  ]
}

Remember: 
- At $12/day budget, we get ~1-2 clicks/day. Every wasted click is 10% of daily budget.
- Be ruthless with negative keywords for low-intent queries
- Only recommend bid increases if clear performance justifies it
- Focus on high-intent keywords that drive bookings`;

    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: userPrompt
        }]
      });

      // Parse Claude's response
      const text = response.content[0].text;
      
      // Extract JSON from response (Claude might wrap it in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from Claude response');
      }

      const recommendations = JSON.parse(jsonMatch[0]);
      
      // Add metadata
      recommendations.analyzedAt = new Date().toISOString();
      recommendations.inputTokens = response.usage.input_tokens;
      recommendations.outputTokens = response.usage.output_tokens;
      
      return recommendations;
      
    } catch (error) {
      console.error('Claude analysis error:', error);
      throw new Error(`Failed to analyze with Claude: ${error.message}`);
    }
  }

  /**
   * Generate ad copy for a specific query and context
   * @param {Object} params - Ad generation parameters
   * @returns {Promise<Object>} Generated ad components
   */
  async generateAdCopy(params) {
    const { query, intent, landingPage, competitorAds = [] } = params;

    const systemPrompt = `You are an expert ad copywriter for Westside Style hair extensions.

Business voice:
- Professional but approachable
- Emphasize expertise and specialization (not a full-service salon)
- Focus on quality and results, not price
- Highlight availability and consultation

Key differentiators:
- Extensions-only specialist (10+ years focused expertise)
- Small clientele (high-touch, not factory)
- Natural-looking results
- Three methods: Keratin, Hand-Tied, Tape-In

Ad constraints:
- Headlines: Max 30 characters each
- Descriptions: Max 90 characters each
- Must include call-to-action
- Should match search intent`;

    const userPrompt = `Generate a responsive search ad for this query:

Query: "${query}"
Intent: ${intent}
Landing page: ${landingPage}
${competitorAds.length > 0 ? `\nCompetitor ads for reference:\n${JSON.stringify(competitorAds, null, 2)}` : ''}

Provide 5 headlines and 3 descriptions in JSON format:

{
  "headlines": [
    "Headline 1 (max 30 chars)",
    "Headline 2",
    "Headline 3",
    "Headline 4",
    "Headline 5"
  ],
  "descriptions": [
    "Description 1 (max 90 chars)",
    "Description 2",
    "Description 3"
  ],
  "reasoning": "Why this ad copy matches the query intent"
}`;

    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      });

      const text = response.content[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Could not parse ad copy JSON from Claude');
      }

      const adCopy = JSON.parse(jsonMatch[0]);
      
      // Validate character limits
      adCopy.headlines = adCopy.headlines.map(h => h.substring(0, 30));
      adCopy.descriptions = adCopy.descriptions.map(d => d.substring(0, 90));
      
      return adCopy;
      
    } catch (error) {
      console.error('Ad copy generation error:', error);
      throw new Error(`Failed to generate ad copy: ${error.message}`);
    }
  }
}

module.exports = GaspClaudeClient;
```

### 2.2 Prompt Templates

```javascript
// src/gasp/prompts/templates.js

const PROMPTS = {
  SYSTEM_CONTEXT: `You are an expert Google Ads strategist for Westside Style, a premium hair extensions specialist in Seattle.

Business Context:
- Services: Keratin bond extensions ($1,200+), Hand tied ($1,000+), Tape-in ($800+)
- Target market: Seattle metro, female 25-45, household income $100k+
- Unique value: Extensions-only specialist (not full-service salon), 10+ years experience
- Budget: $360/month ($12/day) - VERY LIMITED, must eliminate all waste
- Current performance: ~30-40 clicks/month, 1-2 bookings/month
- Average booking value: $1,000`,

  SEARCH_TERMS_ANALYSIS: (data) => `Analyze these search terms from the last 7 days:

${JSON.stringify(data, null, 2)}

Provide optimization recommendations focusing on:
1. Negative keywords to block waste (be aggressive - budget is tight)
2. Bid adjustments for high/low performers
3. New opportunities or concerns

Format as structured JSON.`,

  DEVICE_PERFORMANCE_ANALYSIS: (data) => `Analyze device performance:

${JSON.stringify(data, null, 2)}

Key questions:
- Is mobile converting at least 50% as well as desktop?
- Should we adjust mobile bids?
- Are there landing page issues affecting mobile?

Provide device bid modifier recommendations and reasoning.`,

  WEEKLY_SUMMARY: (weekData, previousWeek) => `Generate weekly performance summary:

This Week:
${JSON.stringify(weekData, null, 2)}

Previous Week:
${JSON.stringify(previousWeek, null, 2)}

Provide:
1. Performance summary (3-5 key insights)
2. Week-over-week trends
3. Top 3 actions for next week
4. Concerns or warnings

Format as Markdown for email report.`
};

module.exports = PROMPTS;
```

### 2.3 Test Claude Integration

```javascript
// test-claude-integration.js

require('dotenv').config({ path: '.env.local' });
const GaspClaudeClient = require('./src/gasp/claude-client');

async function testClaudeIntegration() {
  console.log('=== Testing Claude Integration ===\n');

  const claude = new GaspClaudeClient();

  // Test data: simulated search terms
  const testSearchTerms = [
    {
      campaign: { name: 'GASP-Non-Brand-Focused' },
      segments: { search_term: 'hair extensions seattle', search_term_match_type: 'EXACT' },
      metrics: { impressions: 45, clicks: 3, conversions: 1, cost_micros: 36000000, average_cpc: 12000000 }
    },
    {
      campaign: { name: 'GASP-Non-Brand-Focused' },
      segments: { search_term: 'cheap hair extensions', search_term_match_type: 'PHRASE' },
      metrics: { impressions: 20, clicks: 2, conversions: 0, cost_micros: 24000000, average_cpc: 12000000 }
    },
    {
      campaign: { name: 'GASP-Non-Brand-Focused' },
      segments: { search_term: 'keratin bond extensions seattle', search_term_match_type: 'EXACT' },
      metrics: { impressions: 30, clicks: 2, conversions: 1, cost_micros: 24000000, average_cpc: 12000000 }
    }
  ];

  try {
    console.log('1. Testing search terms analysis...\n');
    
    const recommendations = await claude.analyzeSearchTerms(testSearchTerms);
    
    console.log('✅ Claude analysis successful!\n');
    console.log('Summary:', recommendations.summary);
    console.log('\nNegative Keywords:', JSON.stringify(recommendations.negativeKeywords, null, 2));
    console.log('\nBid Adjustments:', JSON.stringify(recommendations.bidAdjustments, null, 2));
    console.log('\nToken Usage:', {
      input: recommendations.inputTokens,
      output: recommendations.outputTokens,
      total: recommendations.inputTokens + recommendations.outputTokens
    });

    console.log('\n2. Testing ad copy generation...\n');
    
    const adCopy = await claude.generateAdCopy({
      query: 'hand tied extensions seattle',
      intent: 'booking',
      landingPage: '/hand-tied-seattle.html'
    });
    
    console.log('✅ Ad copy generated!\n');
    console.log('Headlines:', adCopy.headlines);
    console.log('\nDescriptions:', adCopy.descriptions);
    console.log('\nReasoning:', adCopy.reasoning);

    console.log('\n✅ All Claude tests passed!\n');
    
  } catch (error) {
    console.error('\n❌ Claude test failed:', error.message);
    console.error('\nCheck:');
    console.error('1. ANTHROPIC_API_KEY in .env.local');
    console.error('2. API key is valid and has credits');
    console.error('3. Internet connection');
    process.exit(1);
  }
}

testClaudeIntegration();
```

**Run tests:**

```bash
# Test Claude integration
node test-claude-integration.js

# Expected output:
# ✅ Claude analysis successful!
# Summary: [Claude's analysis]
# Negative Keywords: [Recommendations]
# Token Usage: ~2000-4000 tokens

# If errors:
# - Check ANTHROPIC_API_KEY in .env.local
# - Verify API key at https://console.anthropic.com
```

**Checklist:**
- [ ] Claude client initialized successfully
- [ ] Search terms analysis returns structured JSON
- [ ] Ad copy generation works
- [ ] Token usage is reasonable (<5000 tokens per call)
- [ ] Error handling works for invalid API keys

**Time to Complete Phase 2:** 2-3 hours

---

## Phase 3: Automation Deployment

**Time Estimate:** 3-4 hours  
**Goal:** Deploy automated optimization to Netlify Functions with weekly scheduling

### 3.1 Core Optimizer Logic

```javascript
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
```

### 3.2 Validation & Safety Utilities

```javascript
// src/gasp/utils/validation.js

const SAFETY_LIMITS = {
  MAX_NEGATIVE_KEYWORDS_PER_RUN: 10,
  MAX_BID_INCREASE_PERCENT: 0.50, // 50% max increase
  MAX_BID_DECREASE_PERCENT: 0.40, // 40% max decrease
  MIN_BID_DOLLARS: 2.00,
  MAX_BID_DOLLARS: 25.00,
  MAX_DAILY_BUDGET_CHANGE_PERCENT: 0.20 // 20% max change
};

/**
 * Validate Claude's recommendations for safety
 * @param {Object} recommendations - Claude's output
 * @returns {Object} Validated recommendations
 */
function validateRecommendations(recommendations) {
  const validated = {
    negativeKeywords: [],
    bidAdjustments: [],
    concerns: recommendations.concerns || []
  };

  // Validate negative keywords
  if (recommendations.negativeKeywords) {
    for (const negKw of recommendations.negativeKeywords) {
      // Basic validation
      if (!negKw.keyword || !negKw.matchType) {
        console.warn('Skipping invalid negative keyword:', negKw);
        continue;
      }

      // Check keyword length
      if (negKw.keyword.length < 2 || negKw.keyword.length > 80) {
        console.warn('Skipping keyword with invalid length:', negKw.keyword);
        continue;
      }

      // Check match type
      if (!['EXACT', 'PHRASE', 'BROAD'].includes(negKw.matchType)) {
        console.warn('Invalid match type, defaulting to PHRASE:', negKw);
        negKw.matchType = 'PHRASE';
      }

      validated.negativeKeywords.push(negKw);
    }
  }

  // Validate bid adjustments
  if (recommendations.bidAdjustments) {
    for (const bidAdj of recommendations.bidAdjustments) {
      if (!bidAdj.keyword || !bidAdj.recommendedBid) {
        console.warn('Skipping invalid bid adjustment:', bidAdj);
        continue;
      }

      // Check bid is in reasonable range
      if (bidAdj.recommendedBid < SAFETY_LIMITS.MIN_BID_DOLLARS) {
        console.warn(`Bid too low, adjusting to minimum: ${bidAdj.keyword}`);
        bidAdj.recommendedBid = SAFETY_LIMITS.MIN_BID_DOLLARS;
      }

      if (bidAdj.recommendedBid > SAFETY_LIMITS.MAX_BID_DOLLARS) {
        console.warn(`Bid too high, capping at maximum: ${bidAdj.keyword}`);
        bidAdj.recommendedBid = SAFETY_LIMITS.MAX_BID_DOLLARS;
      }

      validated.bidAdjustments.push(bidAdj);
    }
  }

  return validated;
}

/**
 * Apply safety limits to prevent runaway changes
 * @param {Object} recommendations - Validated recommendations
 * @returns {Object} Safe recommendations
 */
function applySafetyLimits(recommendations) {
  const safe = { ...recommendations };

  // Limit negative keywords per run
  if (safe.negativeKeywords.length > SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN) {
    console.warn(`Limiting negative keywords to ${SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN}`);
    safe.negativeKeywords = safe.negativeKeywords
      .slice(0, SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN);
  }

  // Validate bid change percentages
  safe.bidAdjustments = safe.bidAdjustments.filter(bidAdj => {
    if (!bidAdj.currentBid) {
      console.warn('Missing current bid, skipping:', bidAdj.keyword);
      return false;
    }

    const changePercent = Math.abs(
      (bidAdj.recommendedBid - bidAdj.currentBid) / bidAdj.currentBid
    );

    if (bidAdj.recommendedBid > bidAdj.currentBid) {
      // Increase
      if (changePercent > SAFETY_LIMITS.MAX_BID_INCREASE_PERCENT) {
        console.warn(`Bid increase too large (${(changePercent * 100).toFixed(0)}%), skipping: ${bidAdj.keyword}`);
        return false;
      }
    } else {
      // Decrease
      if (changePercent > SAFETY_LIMITS.MAX_BID_DECREASE_PERCENT) {
        console.warn(`Bid decrease too large (${(changePercent * 100).toFixed(0)}%), skipping: ${bidAdj.keyword}`);
        return false;
      }
    }

    return true;
  });

  return safe;
}

module.exports = { validateRecommendations, applySafetyLimits, SAFETY_LIMITS };
```

### 3.3 Netlify Function for Weekly Optimization

```javascript
// netlify/functions/gasp/weekly-optimizer.js

const { schedule } = require('@netlify/functions');
const GaspOptimizer = require('../../../src/gasp/optimizer');

/**
 * Weekly GASP optimization
 * Runs every Monday at 9:00 AM Pacific Time
 * Cron: 0 17 * * 1 (9 AM PT = 5 PM UTC, accounting for DST complexity)
 */
const handler = schedule('0 17 * * 1', async (event) => {
  console.log('=== GASP Weekly Optimization Triggered ===');
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const optimizer = new GaspOptimizer();
    const results = await optimizer.runWeeklyOptimization();

    // Send success notification (email, Slack, etc.)
    // await sendNotification('GASP Weekly Optimization Complete', results);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'GASP weekly optimization complete',
        timestamp: new Date().toISOString(),
        results: {
          actionsCount: results.actions.length,
          errorsCount: results.errors.length,
          summary: results.claudeSummary
        }
      })
    };

  } catch (error) {
    console.error('GASP optimization failed:', error);

    // Send error notification
    // await sendNotification('GASP Optimization Failed', { error: error.message });

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
});

module.exports = { handler };
```

### 3.4 Manual Trigger Function (For Testing)

```javascript
// netlify/functions/gasp/manual-trigger.js

const GaspOptimizer = require('../../../src/gasp/optimizer');

/**
 * Manual trigger for GASP optimization
 * Call this endpoint to run optimization on-demand
 * 
 * Usage: POST /.netlify/functions/gasp/manual-trigger
 */
exports.handler = async (event, context) => {
  // Simple API key auth for security
  const apiKey = event.headers['x-api-key'];
  
  if (apiKey !== process.env.GASP_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  console.log('=== GASP Manual Trigger ===');

  try {
    const optimizer = new GaspOptimizer();
    
    // Check what type of optimization to run
    const action = event.queryStringParameters?.action || 'weekly';

    let results;
    
    if (action === 'health') {
      results = await optimizer.runHealthCheck();
    } else {
      results = await optimizer.runWeeklyOptimization();
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        action,
        timestamp: new Date().toISOString(),
        results
      })
    };

  } catch (error) {
    console.error('Manual optimization failed:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
```

### 3.5 Environment Variables for Netlify

```bash
# Add these to Netlify environment variables
# Site Settings → Environment Variables

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
GOOGLE_ADS_CUSTOMER_ID=18371102793

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your-api-key

# GASP Configuration
GASP_API_KEY=generate_random_32_char_string_for_security
GASP_LOG_LEVEL=info

# Optional: Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK
EMAIL_NOTIFICATION_TO=your-email@example.com
```

### 3.6 Deploy to Netlify

```bash
# 1. Install Netlify CLI (if not already)
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Link project to Netlify site
netlify link

# 4. Set environment variables
netlify env:set GOOGLE_ADS_DEVELOPER_TOKEN "your_token"
netlify env:set GOOGLE_ADS_CLIENT_ID "your_client_id"
netlify env:set GOOGLE_ADS_CLIENT_SECRET "your_secret"
netlify env:set GOOGLE_ADS_REFRESH_TOKEN "your_refresh_token"
netlify env:set GOOGLE_ADS_CUSTOMER_ID "18371102793"
netlify env:set ANTHROPIC_API_KEY "sk-ant-your-key"
netlify env:set GASP_API_KEY "$(openssl rand -hex 16)"

# 5. Test function locally
netlify dev

# In another terminal, test manual trigger:
curl -X POST http://localhost:8888/.netlify/functions/gasp/manual-trigger \
  -H "x-api-key: your_gasp_api_key" \
  -H "Content-Type: application/json"

# 6. Deploy to production
netlify deploy --prod

# 7. Verify scheduled function is active
netlify functions:list
# Should show: gasp/weekly-optimizer (scheduled: 0 17 * * 1)
```

**Checklist:**
- [ ] Optimizer logic implemented
- [ ] Validation and safety limits in place
- [ ] Netlify functions created
- [ ] Environment variables set in Netlify
- [ ] Manual trigger tested locally
- [ ] Deployed to production
- [ ] Scheduled function appears in Netlify dashboard

**Time to Complete Phase 3:** 3-4 hours

---

## Phase 4: Data Fetching & Analysis

**Time Estimate:** 2-3 hours  
**Goal:** Build comprehensive GAQL queries for performance analysis

### 4.1 GAQL Query Library

```javascript
// src/gasp/utils/gaql-queries.js

/**
 * GAQL query templates for GASP
 * All queries filter to GASP campaigns only (label: 'GASP-Test')
 */

const GAQL_QUERIES = {
  /**
   * Get search terms performance
   */
  SEARCH_TERMS: (days = 7) => `
    SELECT
      campaign.name,
      campaign.id,
      ad_group.name,
      ad_group.id,
      segments.search_term,
      segments.search_term_match_type,
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.conversion_rate,
      metrics.cost_micros,
      metrics.average_cpc,
      metrics.cost_per_conversion
    FROM search_term_view
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 500
  `,

  /**
   * Get device performance breakdown
   */
  DEVICE_PERFORMANCE: (days = 14) => `
    SELECT
      campaign.name,
      segments.device,
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.conversion_rate,
      metrics.cost_micros,
      metrics.average_cpc
    FROM campaign
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
    ORDER BY campaign.name, segments.device
  `,

  /**
   * Get time-of-day performance
   */
  TIME_OF_DAY_PERFORMANCE: (days = 30) => `
    SELECT
      campaign.name,
      segments.hour,
      segments.day_of_week,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.cost_micros
    FROM campaign
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
    ORDER BY segments.day_of_week, segments.hour
  `,

  /**
   * Get geographic performance
   */
  GEOGRAPHIC_PERFORMANCE: (days = 30) => `
    SELECT
      campaign.name,
      geographic_view.location_type,
      geographic_view.country_criterion_id,
      geographic_view.region,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.cost_micros
    FROM geographic_view
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 100
  `,

  /**
   * Get keyword-level performance
   */
  KEYWORD_PERFORMANCE: (days = 14) => `
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.cpc_bid_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.cost_micros,
      metrics.average_cpc,
      metrics.search_impression_share,
      metrics.search_rank_lost_impression_share
    FROM keyword_view
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
      AND ad_group_criterion.status = 'ENABLED'
    ORDER BY metrics.impressions DESC
  `,

  /**
   * Get ad performance
   */
  AD_PERFORMANCE: (days = 14) => `
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_ad.ad.id,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.ad.final_urls,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.conversion_rate,
      metrics.cost_micros,
      metrics.average_cpc
    FROM ad_group_ad
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
      AND ad_group_ad.status = 'ENABLED'
      AND metrics.impressions > 0
    ORDER BY metrics.impressions DESC
  `,

  /**
   * Get campaign-level summary
   */
  CAMPAIGN_SUMMARY: (days = 7) => `
    SELECT
      campaign.name,
      campaign.id,
      campaign.status,
      campaign.bidding_strategy_type,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.conversion_rate,
      metrics.cost_micros,
      metrics.average_cpc,
      metrics.cost_per_conversion,
      metrics.search_impression_share,
      metrics.search_budget_lost_impression_share
    FROM campaign
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND campaign.labels CONTAINS 'GASP-Test'
    ORDER BY campaign.name
  `,

  /**
   * Compare GASP vs Performance Max
   */
  CAMPAIGN_COMPARISON: (days = 7) => `
    SELECT
      campaign.name,
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions,
      metrics.cost_micros,
      metrics.average_cpc
    FROM campaign
    WHERE 
      segments.date DURING LAST_${days}_DAYS
      AND (
        campaign.labels CONTAINS 'GASP-Test'
        OR campaign.labels CONTAINS 'PMAX-Control'
      )
    ORDER BY campaign.name, segments.date
  `
};

module.exports = GAQL_QUERIES;
```

### 4.2 Performance Analysis Utilities

```javascript
// src/gasp/utils/analysis.js

/**
 * Calculate performance metrics and trends
 */
class PerformanceAnalyzer {
  /**
   * Calculate week-over-week change
   */
  static calculateWeekOverWeekChange(currentWeek, previousWeek, metric) {
    if (!previousWeek[metric] || previousWeek[metric] === 0) {
      return null;
    }
    
    return ((currentWeek[metric] - previousWeek[metric]) / previousWeek[metric]) * 100;
  }

  /**
   * Aggregate campaign performance
   */
  static aggregateCampaignPerformance(rows) {
    const aggregated = {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0
    };

    for (const row of rows) {
      const m = row.metrics;
      aggregated.impressions += m.impressions;
      aggregated.clicks += m.clicks;
      aggregated.conversions += m.conversions;
      aggregated.cost += m.cost_micros / 1000000;
    }

    // Calculate derived metrics
    aggregated.ctr = aggregated.clicks / aggregated.impressions || 0;
    aggregated.conversionRate = aggregated.conversions / aggregated.clicks || 0;
    aggregated.cpa = aggregated.conversions > 0 
      ? aggregated.cost / aggregated.conversions 
      : null;
    aggregated.avgCpc = aggregated.clicks > 0 
      ? aggregated.cost / aggregated.clicks 
      : null;

    return aggregated;
  }

  /**
   * Identify top performing keywords
   */
  static identifyTopPerformers(keywords, metric = 'conversions', minImpressions = 10) {
    return keywords
      .filter(kw => kw.metrics.impressions >= minImpressions)
      .sort((a, b) => b.metrics[metric] - a.metrics[metric])
      .slice(0, 5);
  }

  /**
   * Identify underperforming keywords
   */
  static identifyUnderperformers(keywords, maxCpa = 200, minClicks = 5) {
    return keywords
      .filter(kw => {
        const clicks = kw.metrics.clicks;
        const conversions = kw.metrics.conversions;
        const cost = kw.metrics.cost_micros / 1000000;
        
        if (clicks < minClicks) return false;
        
        if (conversions === 0) return true; // No conversions after min clicks
        
        const cpa = cost / conversions;
        return cpa > maxCpa;
      })
      .sort((a, b) => b.metrics.cost_micros - a.metrics.cost_micros);
  }

  /**
   * Device performance comparison
   */
  static analyzeDevicePerformance(deviceData) {
    const byDevice = {
      DESKTOP: { impressions: 0, clicks: 0, conversions: 0, cost: 0 },
      MOBILE: { impressions: 0, clicks: 0, conversions: 0, cost: 0 },
      TABLET: { impressions: 0, clicks: 0, conversions: 0, cost: 0 }
    };

    for (const row of deviceData) {
      const device = row.segments.device;
      const m = row.metrics;
      
      if (byDevice[device]) {
        byDevice[device].impressions += m.impressions;
        byDevice[device].clicks += m.clicks;
        byDevice[device].conversions += m.conversions;
        byDevice[device].cost += m.cost_micros / 1000000;
      }
    }

    // Calculate conversion rates
    for (const device in byDevice) {
      const d = byDevice[device];
      d.conversionRate = d.clicks > 0 ? d.conversions / d.clicks : 0;
      d.cpa = d.conversions > 0 ? d.cost / d.conversions : null;
    }

    // Calculate mobile vs desktop efficiency
    const mobileEfficiency = byDevice.MOBILE.conversionRate / byDevice.DESKTOP.conversionRate;

    return {
      byDevice,
      mobileEfficiency,
      recommendation: mobileEfficiency < 0.5 
        ? 'Consider -20% to -30% mobile bid adjustment' 
        : 'Mobile performance is acceptable'
    };
  }

  /**
   * Time of day analysis
   */
  static analyzeTimeOfDayPerformance(timeData) {
    const byHour = {};

    for (const row of timeData) {
      const hour = row.segments.hour;
      if (!byHour[hour]) {
        byHour[hour] = { impressions: 0, clicks: 0, conversions: 0, cost: 0 };
      }
      
      const m = row.metrics;
      byHour[hour].impressions += m.impressions;
      byHour[hour].clicks += m.clicks;
      byHour[hour].conversions += m.conversions;
      byHour[hour].cost += m.cost_micros / 1000000;
    }

    // Calculate conversion rate by hour
    const hourlyPerformance = Object.entries(byHour).map(([hour, data]) => ({
      hour: parseInt(hour),
      ...data,
      conversionRate: data.clicks > 0 ? data.conversions / data.clicks : 0
    }));

    // Find best hours (top 25% by conversion rate)
    const sortedByConvRate = hourlyPerformance
      .filter(h => h.clicks >= 3) // Min clicks threshold
      .sort((a, b) => b.conversionRate - a.conversionRate);
    
    const bestHours = sortedByConvRate.slice(0, Math.ceil(sortedByConvRate.length / 4));

    return {
      hourlyPerformance,
      bestHours: bestHours.map(h => h.hour),
      recommendation: bestHours.length > 0
        ? `Consider +20% bid adjustment for hours: ${bestHours.map(h => h.hour).join(', ')}`
        : 'Need more data for time-of-day optimization'
    };
  }
}

module.exports = PerformanceAnalyzer;
```

### 4.3 Weekly Report Generator

```javascript
// src/gasp/utils/weekly-report.js

const PerformanceAnalyzer = require('./analysis');
const GAQL_QUERIES = require('./gaql-queries');

/**
 * Generate comprehensive weekly report
 */
async function generateWeeklyReport(googleAdsClient) {
  console.log('Generating weekly report...');

  const report = {
    week: new Date().toISOString().split('T')[0],
    gasp: {},
    performanceMax: {},
    comparison: {},
    insights: []
  };

  try {
    // Fetch campaign comparison data
    const comparisonData = await googleAdsClient.query(
      GAQL_QUERIES.CAMPAIGN_COMPARISON(7)
    );

    // Split by campaign type
    const gaspData = comparisonData.filter(row => 
      row.campaign.name.includes('GASP')
    );
    const pmaxData = comparisonData.filter(row => 
      row.campaign.name.includes('Performance Max') ||
      row.campaign.labels?.includes('PMAX-Control')
    );

    // Aggregate performance
    report.gasp = PerformanceAnalyzer.aggregateCampaignPerformance(gaspData);
    report.performanceMax = PerformanceAnalyzer.aggregateCampaignPerformance(pmaxData);

    // Calculate comparison
    report.comparison.cpaDifference = report.gasp.cpa && report.performanceMax.cpa
      ? ((report.gasp.cpa - report.performanceMax.cpa) / report.performanceMax.cpa) * 100
      : null;
    
    report.comparison.conversionsDifference = 
      report.gasp.conversions - report.performanceMax.conversions;

    report.comparison.winner = report.gasp.cpa < report.performanceMax.cpa ? 'GASP' : 'Performance Max';

    // Add insights
    if (report.comparison.cpaDifference !== null) {
      if (report.comparison.cpaDifference < -20) {
        report.insights.push({
          type: 'SUCCESS',
          message: `GASP is winning with ${Math.abs(report.comparison.cpaDifference).toFixed(0)}% lower CPA`
        });
      } else if (report.comparison.cpaDifference > 20) {
        report.insights.push({
          type: 'WARNING',
          message: `GASP CPA is ${report.comparison.cpaDifference.toFixed(0)}% higher - investigate`
        });
      }
    }

    if (report.gasp.conversions === 0 && gaspData.length > 0) {
      report.insights.push({
        type: 'ALERT',
        message: 'GASP has zero conversions this week - check campaigns'
      });
    }

    console.log('✓ Weekly report generated');
    return report;

  } catch (error) {
    console.error('Failed to generate weekly report:', error);
    throw error;
  }
}

/**
 * Format report as Markdown for email
 */
function formatReportAsMarkdown(report) {
  return `# GASP Weekly Report
**Week of:** ${report.week}

## Performance Summary

### GASP Campaigns
- **Impressions:** ${report.gasp.impressions.toLocaleString()}
- **Clicks:** ${report.gasp.clicks}
- **Conversions:** ${report.gasp.conversions}
- **Cost:** $${report.gasp.cost.toFixed(2)}
- **CPA:** ${report.gasp.cpa ? '$' + report.gasp.cpa.toFixed(2) : 'N/A'}
- **CTR:** ${(report.gasp.ctr * 100).toFixed(2)}%
- **Conv Rate:** ${(report.gasp.conversionRate * 100).toFixed(2)}%

### Performance Max
- **Impressions:** ${report.performanceMax.impressions.toLocaleString()}
- **Clicks:** ${report.performanceMax.clicks}
- **Conversions:** ${report.performanceMax.conversions}
- **Cost:** $${report.performanceMax.cost.toFixed(2)}
- **CPA:** ${report.performanceMax.cpa ? '$' + report.performanceMax.cpa.toFixed(2) : 'N/A'}
- **CTR:** ${(report.performanceMax.ctr * 100).toFixed(2)}%
- **Conv Rate:** ${(report.performanceMax.conversionRate * 100).toFixed(2)}%

## Comparison

**Winner:** ${report.comparison.winner}

${report.comparison.cpaDifference !== null ? 
  `**CPA Difference:** ${report.comparison.cpaDifference > 0 ? '+' : ''}${report.comparison.cpaDifference.toFixed(0)}%` : 
  'Not enough data for CPA comparison'}

**Conversion Difference:** ${report.comparison.conversionsDifference > 0 ? '+' : ''}${report.comparison.conversionsDifference} bookings

## Insights

${report.insights.map(insight => `- **${insight.type}:** ${insight.message}`).join('\n')}

---

*Generated by GASP on ${new Date().toISOString()}*
`;
}

module.exports = { generateWeeklyReport, formatReportAsMarkdown };
```

**Checklist:**
- [ ] GAQL query library created
- [ ] Analysis utilities implemented
- [ ] Weekly report generator working
- [ ] All queries tested with real data
- [ ] Performance calculations verified

**Time to Complete Phase 4:** 2-3 hours

---

## Phase 5: Mutation Operations

**Time Estimate:** 3-4 hours  
**Goal:** Implement safe mutation operations (negative keywords, bid adjustments)

### 5.1 Campaign Mapping Configuration

```json
// config/campaigns.json
{
  "gasp": {
    "brand": {
      "name": "GASP-Brand-Defense",
      "id": "campaign_id_here",
      "dailyBudget": 2.00,
      "bidStrategy": "TARGET_IMPRESSION_SHARE"
    },
    "nonBrand": {
      "name": "GASP-Non-Brand-Focused",
      "id": "campaign_id_here",
      "dailyBudget": 10.00,
      "bidStrategy": "MANUAL_CPC"
    }
  },
  "performanceMax": {
    "control": {
      "name": "Performance Max",
      "id": "campaign_id_here",
      "dailyBudget": 12.00
    }
  }
}
```

### 5.2 Mutation Operations Module

```javascript
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
```

### 5.3 Logging Module

```javascript
// src/gasp/utils/logger.js

const fs = require('fs').promises;
const path = require('path');

const LOG_DIR = path.join(__dirname, '../../../logs');

/**
 * Log optimization results
 */
async function logOptimization(results) {
  try {
    // Ensure log directory exists
    await fs.mkdir(LOG_DIR, { recursive: true });

    // Create log entry
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...results
    };

    // Log to file (one file per day)
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `gasp-${date}.json`);

    // Read existing logs
    let logs = [];
    try {
      const existingData = await fs.readFile(logFile, 'utf8');
      logs = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist yet, that's OK
    }

    // Append new log
    logs.push(logEntry);

    // Write back
    await fs.writeFile(logFile, JSON.stringify(logs, null, 2));

    console.log(`✓ Logged optimization to ${logFile}`);

    // Also log to console (for Netlify logs)
    console.log('Optimization Results:', JSON.stringify(logEntry, null, 2));

  } catch (error) {
    console.error('Failed to write log file:', error);
    // Don't throw - logging failure shouldn't stop optimization
  }
}

/**
 * Get recent logs
 */
async function getRecentLogs(days = 7) {
  try {
    const logs = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const logFile = path.join(LOG_DIR, `gasp-${dateStr}.json`);

      try {
        const data = await fs.readFile(logFile, 'utf8');
        const dayLogs = JSON.parse(data);
        logs.push(...dayLogs);
      } catch (error) {
        // Log file doesn't exist for this day
      }
    }

    return logs;

  } catch (error) {
    console.error('Failed to read logs:', error);
    return [];
  }
}

module.exports = { logOptimization, getRecentLogs };
```

**Checklist:**
- [ ] Campaign mapping configuration created
- [ ] Mutation operations module implemented
- [ ] Negative keyword batch operations working
- [ ] Bid adjustment operations tested
- [ ] Logging module captures all actions
- [ ] Rate limiting implemented (100ms between operations)

**Time to Complete Phase 5:** 3-4 hours

---

## Security & Error Handling

### Environment Variable Security

```javascript
// Validate all required environment variables on startup
function validateEnvironment() {
  const required = [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
    'ANTHROPIC_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('✓ All required environment variables present');
}
```

### API Error Handling

```javascript
// Wrap all API calls with retry logic
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Rate Limit Handling

```javascript
// Google Ads API rate limits:
// - 15,000 operations per day per developer token
// - Burst limit: ~100 operations per second

class RateLimiter {
  constructor() {
    this.operations = [];
    this.maxPerSecond = 10;
  }

  async throttle() {
    const now = Date.now();
    
    // Remove operations older than 1 second
    this.operations = this.operations.filter(time => now - time < 1000);
    
    if (this.operations.length >= this.maxPerSecond) {
      const oldestOperation = Math.min(...this.operations);
      const waitTime = 1000 - (now - oldestOperation);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.operations.push(Date.now());
  }
}
```

---

## Testing Strategy

### Unit Tests

```javascript
// test/gasp/validation.test.js

const { validateRecommendations, applySafetyLimits } = require('../../src/gasp/utils/validation');

describe('Validation', () => {
  test('should filter invalid negative keywords', () => {
    const input = {
      negativeKeywords: [
        { keyword: 'valid keyword', matchType: 'PHRASE', reasoning: 'test' },
        { keyword: '', matchType: 'PHRASE', reasoning: 'test' }, // Invalid: empty
        { keyword: 'a', matchType: 'PHRASE', reasoning: 'test' }, // Invalid: too short
      ]
    };

    const result = validateRecommendations(input);
    expect(result.negativeKeywords.length).toBe(1);
    expect(result.negativeKeywords[0].keyword).toBe('valid keyword');
  });

  test('should cap negative keywords per run', () => {
    const input = {
      negativeKeywords: Array(20).fill({
        keyword: 'test keyword',
        matchType: 'PHRASE',
        reasoning: 'test'
      })
    };

    const result = applySafetyLimits(input);
    expect(result.negativeKeywords.length).toBeLessThanOrEqual(10);
  });

  test('should enforce bid limits', () => {
    const input = {
      bidAdjustments: [
        { keyword: 'test', currentBid: 10, recommendedBid: 1, reasoning: 'test' }, // Too low
        { keyword: 'test', currentBid: 10, recommendedBid: 30, reasoning: 'test' }, // Too high
        { keyword: 'test', currentBid: 10, recommendedBid: 12, reasoning: 'test' }, // Valid
      ]
    };

    const validated = validateRecommendations(input);
    expect(validated.bidAdjustments[0].recommendedBid).toBe(2.00); // Min
    expect(validated.bidAdjustments[1].recommendedBid).toBe(25.00); // Max
    expect(validated.bidAdjustments[2].recommendedBid).toBe(12); // Unchanged
  });
});
```

### Integration Tests

```bash
# Test full optimization flow with test account
npm run test:integration

# This should:
# 1. Connect to Google Ads test account
# 2. Fetch test data
# 3. Send to Claude
# 4. Validate recommendations
# 5. Execute mutations (in test account only!)
# 6. Verify mutations succeeded
```

### Manual Testing Checklist

```markdown
# GASP Manual Testing Checklist

## Pre-Deployment
- [ ] OAuth flow completes successfully
- [ ] Can fetch campaigns from Google Ads
- [ ] Can fetch search terms
- [ ] Claude analysis returns valid JSON
- [ ] Validation catches invalid inputs
- [ ] Safety limits are enforced

## Post-Deployment
- [ ] Manual trigger function works
- [ ] Scheduled function is registered
- [ ] Environment variables set correctly
- [ ] Logs appear in Netlify dashboard
- [ ] Weekly optimization runs successfully
- [ ] No API errors in logs

## Week 1 Monitoring
- [ ] Negative keywords are being added
- [ ] No duplicate negative keywords
- [ ] Bids stay within safety limits
- [ ] No runaway spending
- [ ] Logs are being written
- [ ] Weekly report is generated

## Week 4 Validation
- [ ] GASP vs Performance Max comparison accurate
- [ ] Optimization decisions make sense
- [ ] No false positives on negative keywords
- [ ] Token usage is reasonable (<$10/month)
- [ ] Performance is improving
```

---

## Monitoring & Observability

### Dashboard Endpoint

```javascript
// netlify/functions/gasp/dashboard.js

const { getRecentLogs } = require('../../../src/gasp/utils/logger');
const { generateWeeklyReport } = require('../../../src/gasp/utils/weekly-report');
const GaspGoogleAdsClient = require('../../../src/gasp/google-ads-client');

exports.handler = async (event, context) => {
  // Simple password protection
  const password = event.queryStringParameters?.password;
  
  if (password !== process.env.GASP_DASHBOARD_PASSWORD) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    };
  }

  try {
    const googleAds = new GaspGoogleAdsClient();
    
    // Get recent logs
    const logs = await getRecentLogs(7);
    
    // Get current week report
    const report = await generateWeeklyReport(googleAds);
    
    // Generate HTML dashboard
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>GASP Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .metric { display: inline-block; margin: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px; }
    .metric h3 { margin: 0; color: #C17817; }
    .metric .value { font-size: 2em; font-weight: bold; }
    .winner { color: #2E7D32; }
    .loser { color: #C62828; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #C17817; color: white; }
  </style>
</head>
<body>
  <h1>GASP Dashboard</h1>
  <p>Last updated: ${new Date().toISOString()}</p>
  
  <h2>Week Summary</h2>
  <div>
    <div class="metric ${report.comparison.winner === 'GASP' ? 'winner' : ''}">
      <h3>GASP CPA</h3>
      <div class="value">$${report.gasp.cpa ? report.gasp.cpa.toFixed(2) : 'N/A'}</div>
    </div>
    
    <div class="metric ${report.comparison.winner === 'Performance Max' ? 'winner' : ''}">
      <h3>Performance Max CPA</h3>
      <div class="value">$${report.performanceMax.cpa ? report.performanceMax.cpa.toFixed(2) : 'N/A'}</div>
    </div>
    
    <div class="metric">
      <h3>Winner</h3>
      <div class="value">${report.comparison.winner}</div>
    </div>
  </div>
  
  <h2>Recent Optimizations</h2>
  <table>
    <tr>
      <th>Date</th>
      <th>Actions</th>
      <th>Negative Keywords</th>
      <th>Bid Adjustments</th>
    </tr>
    ${logs.map(log => `
      <tr>
        <td>${new Date(log.timestamp).toLocaleDateString()}</td>
        <td>${log.actions.length}</td>
        <td>${log.actions.filter(a => a.type === 'NEGATIVE_KEYWORD_ADDED').length}</td>
        <td>${log.actions.filter(a => a.type === 'BID_ADJUSTED').length}</td>
      </tr>
    `).join('')}
  </table>
  
  <h2>Insights</h2>
  <ul>
    ${report.insights.map(insight => `
      <li><strong>${insight.type}:</strong> ${insight.message}</li>
    `).join('')}
  </ul>
</body>
</html>
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `Dashboard error: ${error.message}`
    };
  }
};
```

### Alert System

```javascript
// src/gasp/utils/alerts.js

async function sendAlert(severity, message, details = {}) {
  console.log(`[${severity}] ${message}`, details);

  // Send to Slack (if configured)
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `GASP Alert [${severity}]: ${message}`,
          attachments: [{
            color: severity === 'URGENT' ? 'danger' : 'warning',
            fields: Object.entries(details).map(([key, value]) => ({
              title: key,
              value: String(value),
              short: true
            }))
          }]
        })
      });
    } catch (error) {
      console.error('Failed to send Slack alert:', error);
    }
  }

  // Send email (if configured)
  if (process.env.EMAIL_NOTIFICATION_TO) {
    // Implement email notification via Resend, SendGrid, etc.
  }
}

module.exports = { sendAlert };
```

---

## Cost Analysis

### Expected Monthly Costs

| Component | Cost | Notes |
|-----------|------|-------|
| **Google Ads API** | $0 | Free (included with Google Ads account) |
| **Google Cloud** | $0-5 | Free tier covers OAuth |
| **Claude API** | $15-30 | ~500k tokens/month at $3/$15 per MTok |
| **Netlify Functions** | $0-10 | Free tier: 125k requests, 100 hrs runtime |
| **Total Infrastructure** | $15-45/month | Scales with usage |

### Token Usage Estimation

```
Weekly optimization cycle:
- Input tokens: ~2,000 (search terms data)
- Output tokens: ~1,500 (recommendations)
- Total per week: 3,500 tokens
- Monthly: 14,000 tokens

Weekly report generation:
- Input tokens: ~1,500
- Output tokens: ~800
- Total per week: 2,300 tokens
- Monthly: 9,200 tokens

Total monthly: ~23,200 tokens = $0.70 (Sonnet 4.5 pricing)
```

**Reality check:** At current usage, Claude API costs will be under $2/month.

### ROI Calculation

```
If GASP improves CPA by 30%:

Current Performance Max:
- Spend: $360/month
- Bookings: 2/month
- CPA: $180
- Revenue: $2,000

GASP at same spend:
- Spend: $360/month
- Bookings: 2.6/month (+30% efficiency)
- CPA: $138
- Revenue: $2,600

Extra revenue: $600/month
GASP costs: $30/month
Net gain: $570/month

Payback period: Immediate
Annual value: $6,840
```

---

## Implementation Timeline Summary

### Total Time Estimate: 15-20 hours

| Phase | Time | Deliverables |
|-------|------|-------------|
| Phase 0: Prerequisites | 1-2 hrs | Environment setup, credentials |
| Phase 1: Google Ads API | 3-4 hrs | OAuth, API client, connection test |
| Phase 2: Claude Integration | 2-3 hrs | Claude client, prompt templates |
| Phase 3: Automation | 3-4 hrs | Netlify functions, scheduling |
| Phase 4: Data Fetching | 2-3 hrs | GAQL queries, analysis utilities |
| Phase 5: Mutations | 3-4 hrs | Negative keywords, bid adjustments |
| Testing & Deployment | 1-2 hrs | End-to-end testing, launch |

### Recommended Implementation Schedule

**Week 1:** Phases 0-2 (Setup and Integration)
- Monday-Tuesday: Prerequisites and Google Ads API
- Wednesday-Thursday: Claude integration and testing
- Friday: Integration testing and documentation

**Week 2:** Phases 3-5 (Automation and Operations)
- Monday-Tuesday: Netlify functions and deployment
- Wednesday-Thursday: Data fetching and analysis
- Friday: Mutation operations and safety testing

**Week 3:** Testing and Launch
- Monday-Wednesday: End-to-end testing
- Thursday: Deploy to production
- Friday: Launch GASP campaigns, monitor first day

**Week 4-12:** Optimization Period
- Weekly: Monitor performance, review optimization decisions
- Weekly: Compare GASP vs Performance Max metrics
- Week 12: Declare winner, make decision on future budget

---

## Next Steps

After completing this implementation:

1. **Week 0:** Complete GASP campaign setup (from GASP_WEEK0_SETUP_GUIDE.md)
2. **Week 1-2:** Implement Phases 0-2 (API integration)
3. **Week 3:** Implement Phases 3-5 (automation)
4. **Week 4:** Test and deploy
5. **Week 5-12:** Monitor 90-day A/B test
6. **Week 13:** Analyze results and scale if successful

---

## Support & Troubleshooting

### Common Issues

**Issue:** OAuth refresh token expired
**Solution:** Re-run oauth-helper.js to generate new token

**Issue:** "DEVELOPER_TOKEN_NOT_APPROVED" error
**Solution:** Use test account token during approval period, or apply for production approval

**Issue:** Claude returns invalid JSON
**Solution:** Improve prompt to request strict JSON, add JSON parsing error handling

**Issue:** Rate limit exceeded
**Solution:** Implement exponential backoff, reduce operations per cycle

**Issue:** Netlify function timeout
**Solution:** Split long operations into smaller chunks, increase timeout limit

### Resources

- [Google Ads API Documentation](https://developers.google.com/google-ads/api/docs/start)
- [Claude API Documentation](https://docs.anthropic.com/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [google-ads-api NPM Package](https://www.npmjs.com/package/google-ads-api)

---

## Appendix: Quick Reference Commands

```bash
# Development
npm run dev                          # Run Netlify dev server
npm test                            # Run unit tests
node test-google-ads-connection.js  # Test Google Ads API
node test-claude-integration.js     # Test Claude API

# OAuth
node src/gasp/utils/oauth-helper.js # Generate refresh token

# Deployment
netlify deploy --prod               # Deploy to production
netlify functions:list              # List deployed functions

# Manual Testing
curl -X POST https://westside.style/.netlify/functions/gasp/manual-trigger \
  -H "x-api-key: YOUR_GASP_API_KEY"

# Logs
netlify logs:function gasp/weekly-optimizer  # View function logs
tail -f logs/gasp-$(date +%Y-%m-%d).json    # View local logs

# Dashboard
open https://westside.style/.netlify/functions/gasp/dashboard?password=YOUR_PASSWORD
```

---

**Document Version:** 1.0  
**Last Updated:** August 12, 2026  
**Maintainer:** Josh Petersen  

This implementation plan is designed for the $360/month reality. Scale complexity and features as budget increases.
