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
