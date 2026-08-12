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
