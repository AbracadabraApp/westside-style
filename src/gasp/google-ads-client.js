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
