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
