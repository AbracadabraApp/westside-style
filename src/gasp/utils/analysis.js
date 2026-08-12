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
