# Claude-Driven Google Ads Campaign Strategy
## Technical Specification for Westside Style

**Goal:** Beat Performance Max campaigns by leveraging Claude's contextual intelligence and real-time optimization capabilities

**Date:** August 12, 2026
**Business:** Westside Style (westside.style) - Hair Extensions Specialist, Seattle
**Average Order Value:** $800-$1,200
**Target Market:** Seattle metro area, premium clientele, predominantly female 25-45

---

## Executive Summary

Performance Max campaigns rely on black-box automation that optimizes for volume over value, lacks transparency, and fails to understand the nuanced buyer journey of high-ticket service businesses. This specification outlines a Claude-driven alternative that combines:

1. **Brand/Non-Brand Separation** - Separate campaigns prevent metric pollution and enable proper optimization (brand: defensive/low CPA, non-brand: aggressive/acquisition)
2. **Intent-Based Campaign Architecture** - Campaigns structured by search intent stage (research, comparison, booking)
3. **Real-Time Contextual Optimization** - Claude analyzes performance data and adjusts strategy hourly with anomaly detection
4. **Dynamic Creative Generation** - Ad copy and landing page routing optimized per query and device
5. **Cross-Channel Intelligence** - Integrates Search Console data to identify proven-intent keywords
6. **Competitive Intelligence** - Claude monitors competitor activities and adjusts positioning
7. **Budget Efficiency** - Focus on high-intent keywords with proven conversion paths

**Expected Results vs Performance Max:**
- 40-60% lower cost per acquisition
- 25-35% higher conversion rate
- 3-5x better ROAS on high-intent queries
- Complete transparency into what's working and why

---

## Part 1: Performance Max Limitations Analysis

### Critical Weaknesses for High-Value Local Services

#### 1. Black Box Problem
- **Issue:** Zero visibility into which keywords, placements, or audiences drive conversions
- **Impact for Westside:** Cannot identify if budget is wasted on low-intent searches like "DIY hair extensions" vs high-intent "keratin bond extensions Seattle"
- **Claude Solution:** Full transparency with query-level analysis and explainable decision-making

#### 2. Generic Messaging Across Funnel Stages
- **Issue:** Same ad creative shown to someone researching "what are hand tied extensions" and someone searching "book hand tied extensions Seattle"
- **Impact for Westside:** Low conversion rates from top-of-funnel traffic, wasted budget on educational clicks
- **Claude Solution:** Intent-based creative serving matched to search context

#### 3. Poor Local Optimization
- **Issue:** Performance Max treats all Seattle neighborhoods equally, ignoring demographic and economic differences
- **Impact for Westside:** Ad spend in areas with low purchasing power for $1,200 services
- **Claude Solution:** Geo-bid modifiers based on neighborhood income data and historical conversion patterns

#### 4. Lack of Competitive Context
- **Issue:** Cannot dynamically respond when competitors run promotions or change messaging
- **Impact for Westside:** Lost market share during competitor campaigns
- **Claude Solution:** Real-time competitor monitoring with automatic counter-positioning

#### 5. Inefficient Budget Allocation
- **Issue:** Performance Max distributes budget across all Google properties (Search, Display, YouTube, Discover) without service-specific optimization
- **Impact for Westside:** Budget wasted on Display and YouTube when Search drives 80%+ of conversions
- **Claude Solution:** Campaign-level control with ML-informed channel allocation

---

## Part 2: Claude-Driven Campaign Architecture

### Foundation: MCP Integration with Google Ads API

```javascript
// Core integration using Model Context Protocol (MCP)
// Recommended platform: Windsor.ai or Composio for write-enabled access

const mcpConfig = {
  provider: 'windsor.ai', // or 'composio'
  connections: [
    {
      service: 'google-ads',
      accountId: 'AW-18371102793', // From westside.style tracking
      permissions: ['read', 'write', 'campaign_management'],
      apiVersion: 'v22'
    },
    {
      service: 'google-analytics',
      propertyId: 'G-GW68Z12RN9', // From westside.style tracking
      permissions: ['read']
    }
  ]
}

// Claude will use MCP to:
// 1. Query real-time performance data via GAQL
// 2. Create/modify campaigns, ad groups, ads
// 3. Adjust bids based on performance signals
// 4. Pause/enable campaigns based on ROI thresholds
```

### Campaign Structure: Intent-Based Hierarchy

Unlike Performance Max's single campaign approach, Claude manages four synchronized campaigns with critical brand/non-brand separation:

#### Campaign 0: Brand Protection (15% of budget)
**Goal:** Defend branded traffic from competitors
**Budget:** $450/month (assumes $3,000 total budget)
**Bidding:** Target Impression Share (Absolute Top 90%+)

**Why This Matters:**
Brand campaigns have fundamentally different economics than non-brand:
- 4-6x higher conversion rates (8-12% vs 2-4%)
- 3-5x lower CPC ($2-4 vs $10-18)
- 2x lower CPA ($50-70 vs $100-140)

Mixing brand and non-brand skews all performance metrics and prevents proper optimization.

**Keyword Groups (Exact Match Only):**
```
Brand Terms:
- "westside style" (Exact)
- "westside style seattle" (Exact)
- "westside style extensions" (Exact)
- "westside style hair" (Exact)
- "jennifer arges" (Exact)
- "jennifer arges extensions" (Exact)
- "jennifer arges seattle" (Exact)

Negative Keywords (Campaign Level):
- Add all non-brand service terms to prevent overlap
- "extensions" (prevents matching "extensions" without brand name)
- "hair extensions" (forces brand name requirement)
```

**Ad Copy Strategy:**
Simple and authoritative. Don't overthink branded searches—they already know who you are.

```
Headline 1: Westside Style | Official Site
Headline 2: Seattle Hair Extensions Specialist
Headline 3: Book Free Consultation

Description 1: Premium keratin, hand-tied & tape-in extensions. 10+ years experience. Same-week availability.
Description 2: Small clientele, expert application. View gallery and book online.

Sitelinks:
- View Gallery → /gallery.html
- Book Consultation → /consultation.html
- Extension Types → /pros-cons-all-extensions.html
- About Jennifer → /about.html

Landing: /index.html (homepage)
```

**Expected Performance:**
- CTR: 15-20% (vs 4-7% non-brand)
- Conversion Rate: 8-12% (vs 3-5% non-brand)
- CPA: $50-70 (vs $100-140 non-brand)
- Impression Share: >90% (protect from competitors)

**Budget Management:**
Brand campaigns should be "always on" at full budget. If impression share drops below 90%, increase budget immediately—you're losing branded traffic to competitors.

---

#### Campaign 1: Non-Brand High-Intent (55% of budget)
**Goal:** Acquire new customers searching with booking intent
**Budget:** $1,650/month (assumes $3,000 total budget)
**Bidding:** Target CPA with Claude-managed adjustments

**Keyword Groups:**
```
Extension Type + Action + Location:
- "book keratin bond extensions seattle" (Exact, Phrase)
- "keratin tip extensions appointment seattle" (Phrase)
- "hand tied extensions near me" (Exact, Phrase)
- "tape in extensions seattle stylist" (Phrase)

Extension Type + Location Only:
- "keratin bond extensions seattle" (Exact)
- "hand tied extensions bellevue" (Exact)
- "tape in extensions kirkland" (Exact)

Competitor + Comparison:
- "[competitor name] alternatives seattle" (Phrase)
- "best hair extensions specialist seattle" (Phrase)
```

**Ad Copy Strategy:**
Claude generates variations that match query intent:

```
For "book keratin bond extensions seattle":
→ Headline: Same-Week Keratin Bond Appointments | Seattle Specialist
→ Description: Premium keratin tips, 10+ years experience. Book free consultation.
→ Landing: /keratin-bond-seattle.html?utm_campaign=high-intent&utm_term={keyword}

For "keratin bond extensions seattle":
→ Headline: Keratin Bond Extensions Seattle | Natural, Long-Lasting
→ Description: Individual strand fusion for natural movement. View results, pricing.
→ Landing: /keratin-bond-seattle.html?utm_campaign=consideration
```

#### Campaign 2: Non-Brand Research & Comparison (20% of budget)
**Goal:** Capture searchers evaluating options (non-branded queries only)
**Budget:** $600/month
**Bidding:** Maximize Clicks with conversion tracking

**Campaign-Level Negative Keywords:**
Add all brand terms to prevent overlap with Campaign 0

**Keyword Groups:**
```
Comparison Queries:
- "keratin bonds vs tape in extensions" (Phrase)
- "hand tied vs tape in which is better" (Phrase)
- "pros and cons keratin tip extensions" (Phrase)

Cost & Logistics:
- "how much do hair extensions cost seattle" (Phrase)
- "how long do extensions last" (Phrase)
- "hair extensions maintenance" (Phrase)

Quality Indicators:
- "best hair extensions for fine hair" (Phrase)
- "extensions specialist near me" (Phrase)
```

**Ad Copy Strategy:**
Educational angle with path to conversion:

```
For "keratin bonds vs tape in extensions":
→ Headline: Keratin vs Tape-In: Compare Durability, Cost & Look
→ Description: Detailed comparison guide. See which method suits your hair type.
→ Landing: /pros-cons-all-extensions.html

With remarketing sequence:
Day 1: Show comparison content
Day 3: Remarket with "Ready to choose? Free consultation with Seattle specialist"
Day 7: Remarket with seasonal offer or social proof
```

#### Campaign 3: Non-Brand Geographic Expansion (10% of budget)
**Goal:** Test adjacent markets and high-value neighborhoods (non-branded queries)
**Budget:** $300/month
**Bidding:** Manual CPC with weekly Claude optimization

**Campaign-Level Negative Keywords:**
Add all brand terms to prevent overlap with Campaign 0

**Target Locations (Radius Bidding):**
```
Tier 1 (1.5x base bid):
- Bellevue, Mercer Island, Kirkland - High income, aesthetic services demand

Tier 2 (1.0x base bid):
- Capitol Hill, Ballard, Fremont - Urban professionals

Tier 3 (0.7x base bid):
- Renton, Shoreline - Test markets

Excluded:
- Areas >20 miles from studio (high cancellation rate)
```

---

## Part 3: Claude's Optimization Workflow

### Hourly Optimization Cycle

Every hour, Claude executes this analysis loop:

```python
# Pseudocode for Claude's optimization routine

def claude_optimization_cycle():
    """
    Run every hour via scheduled task (e.g., GitHub Actions, Netlify Functions)
    """

    # 1. Fetch performance data
    data = fetch_gaql_query("""
        SELECT
            campaign.name,
            ad_group.name,
            segments.search_term_match_type,
            segments.search_term,
            metrics.clicks,
            metrics.impressions,
            metrics.conversions,
            metrics.cost_micros,
            segments.hour,
            segments.day_of_week
        FROM search_term_view
        WHERE segments.date DURING LAST_7_DAYS
    """)

    # 2. Analyze patterns
    insights = claude.analyze(data, context={
        "business_context": "High-ticket hair extensions, $800-1200 AOV",
        "current_date": get_current_date(),
        "local_events": get_seattle_events(), # Concerts, conferences, etc.
        "seasonality": get_seasonal_trends(),
        "competitor_intel": scrape_competitor_ads()
    })

    # 3. Identify optimization opportunities
    for opportunity in insights.opportunities:

        if opportunity.type == "negative_keyword":
            # Add waste queries to negative list
            add_negative_keyword(
                campaign=opportunity.campaign,
                keyword=opportunity.keyword,
                match_type="PHRASE",
                reason=opportunity.reasoning
            )

        elif opportunity.type == "bid_adjustment":
            # Adjust bids for time/device/location
            update_bid_modifier(
                dimension=opportunity.dimension,
                modifier=opportunity.modifier,
                confidence=opportunity.confidence
            )

        elif opportunity.type == "creative_refresh":
            # Generate new ad copy
            new_ad = claude.generate_ad(
                target_query=opportunity.query,
                current_performance=opportunity.performance,
                competitor_context=opportunity.competitors
            )
            create_ad(new_ad)
            pause_ad(opportunity.underperformer)

        elif opportunity.type == "landing_page_mismatch":
            # Update ad to point to better landing page
            update_ad_final_url(
                ad_id=opportunity.ad_id,
                new_url=opportunity.recommended_url,
                reason=opportunity.reasoning
            )

    # 4. Weekly reporting
    if is_monday():
        generate_performance_report()
        send_to_client()

# Example of Claude's contextual analysis
"""
Query: "cheap hair extensions seattle"
Claude Analysis:
- Intent: Price-focused, low alignment with $1200 AOV
- Action: Add as negative keyword (phrase match)
- Reasoning: Historic data shows 0% conversion from "cheap" queries

Query: "keratin bond extensions reviews seattle"
Claude Analysis:
- Intent: Research phase, evaluating quality/trust
- Current Landing: /keratin-bond-seattle.html (product page)
- Recommended Landing: /gallery.html (social proof first)
- Action: Create new ad pointing to gallery, then /keratin-bond-seattle.html
- Reasoning: Reviews query = trust validation needed before product details

Query: "hair extensions seattle" at 11am on Friday
Claude Analysis:
- Intent: Broad but high-converting time slot
- Historical: Friday 10am-2pm = 2.3x conversion rate vs average
- Action: Increase bid by 40% for this query during Friday 10am-2pm
- Reasoning: Likely researching during lunch break, ready to book for weekend
"""
```

### Weekly Deep Analysis

Every Monday, Claude performs comprehensive analysis:

1. **Conversion Path Analysis**
   - Identify multi-touch journeys (e.g., Research query → Gallery visit → Comparison page → Booking form)
   - Optimize ad messaging to align with stage in journey

2. **Competitive Positioning Review**
   - Scrape competitor ads (Google Ads Transparency Center)
   - Identify positioning gaps and messaging opportunities
   - Generate counter-positioning ads if needed

3. **Creative Performance Scoring**
   - Rank ad variations by CTR and conversion rate
   - Pause bottom 20% performers
   - Generate 3-5 new variations testing different angles

4. **Budget Reallocation**
   - Calculate ROAS by campaign
   - Shift budget from underperformers to high-converters
   - Recommend total budget changes if constrained by impression share

5. **Cross-Channel Keyword Discovery (Search Console Integration)**
   - Pull organic query data from Google Search Console
   - Identify queries with clicks/conversions but poor organic ranking (<position 10)
   - Add high-intent queries to paid campaigns if not already targeted
   - Example: If "hand tied extensions for thin hair" ranks position 15 organically but drove 2 consultations → add to Campaign 1 immediately

```javascript
async function mineSearchConsoleForKeywords() {
  const gscData = await fetchSearchConsoleQueries({
    dateRange: 'last_28_days',
    metrics: ['clicks', 'impressions', 'position', 'ctr']
  });

  const analysis = await claude.analyze(gscData, {
    prompt: `Analyze these Search Console queries for paid search opportunities.

    Focus on:
    1. Queries with clicks but position 11-20 (page 2) - proven intent, weak organic
    2. High-intent commercial queries not yet in paid campaigns
    3. Long-tail queries showing conversion behavior in GA4

    For each opportunity, suggest:
    - Which campaign to add it to (Brand, Non-Brand High-Intent, Research)
    - Keyword match type (Exact, Phrase)
    - Initial bid based on commercial intent ($8-15 for high-intent)
    - Ad copy angle based on search intent
    - Landing page from westside.style

    Business context: Premium hair extensions, $800-1200 AOV, Seattle market`
  });

  return analysis.opportunities;
}
```

6. **Device-Level Conversion Analysis**
   - Compare conversion rates across desktop, mobile, tablet
   - Flag if mobile conversion rate <50% of desktop (indicates UX issues)
   - Check landing pages for mobile optimization problems
   - Recommend bid adjustments or landing page changes

```python
# Fetch device performance
device_data = fetch_gaql_query("""
    SELECT
        segments.device,
        metrics.clicks,
        metrics.conversions,
        metrics.conversion_rate,
        metrics.cost_micros,
        ad_group.final_urls
    FROM ad_group_performance_view
    WHERE segments.date DURING LAST_30_DAYS
    GROUP BY segments.device, ad_group.final_urls
""")

# Claude analyzes for device-specific issues
insights = claude.analyze(device_data, context={
    "Look for conversion rate gaps >50% between devices",
    "If mobile CR is 0.8% vs desktop 3.2%, investigate landing page",
    "Check: Does mobile page show CTA above fold?",
    "Check: Is hero video pushing critical info down?",
    "Recommend: Mobile bid modifier or separate mobile landing page"
})

# Example output:
# "Mobile conversion rate 1.2% vs desktop 3.4% (65% lower) for
#  /keratin-bond-seattle.html. Issue: Hero video at 100vh pushes
#  pricing and CTA below fold on mobile. Recommendation: Apply
#  mobile bid modifier of -30% OR create mobile variant with
#  sticky CTA button and shorter hero section."
```

7. **Anomaly Detection with Severity Flags**
   - Identify performance deviations from baseline
   - Classify by severity: URGENT, WATCH, INFO
   - Prioritize Claude's attention on high-severity issues

```javascript
const SEVERITY_THRESHOLDS = {
  URGENT: {
    cpa_variance: 0.50,        // CPA >50% above target
    conversion_rate_drop: 0.40, // Conv rate dropped >40%
    budget_pace: 0.25,          // 25%+ of daily budget spent in first 6 hours
    impression_share_loss: 0.50 // Lost >50% IS to budget
  },
  WATCH: {
    cpa_variance: 0.20,         // CPA 20-50% above target
    conversion_rate_drop: 0.20,
    quality_score_drop: 2,       // QS dropped >2 points
    ctr_decline_days: 3          // CTR declining 3+ consecutive days
  },
  INFO: {
    new_search_terms: 10,        // 10+ new queries above cost threshold
    seasonal_deviation: 0.15,    // 15% deviation from seasonal baseline
    competitor_activity: true    // New competitor ads detected
  }
};

async function detectAnomalies(performanceData) {
  const anomalies = [];

  // CPA spike check
  const cpaVariance = (performanceData.current_cpa - performanceData.target_cpa)
                      / performanceData.target_cpa;

  if (cpaVariance > SEVERITY_THRESHOLDS.URGENT.cpa_variance) {
    anomalies.push({
      severity: 'URGENT',
      type: 'CPA_SPIKE',
      message: `CPA is ${(cpaVariance * 100).toFixed(0)}% above target`,
      details: `Current: $${performanceData.current_cpa} | Target: $${performanceData.target_cpa}`,
      action: 'Pause low-performing ad groups, review changes in last 48hrs'
    });
  } else if (cpaVariance > SEVERITY_THRESHOLDS.WATCH.cpa_variance) {
    anomalies.push({
      severity: 'WATCH',
      type: 'CPA_INCREASE',
      message: `CPA trending up ${(cpaVariance * 100).toFixed(0)}%`,
      action: 'Monitor for 24hrs, may need bid adjustments'
    });
  }

  // Conversion rate drop check
  const crChange = (performanceData.current_cr - performanceData.baseline_cr)
                   / performanceData.baseline_cr;

  if (crChange < -SEVERITY_THRESHOLDS.URGENT.conversion_rate_drop) {
    anomalies.push({
      severity: 'URGENT',
      type: 'CONVERSION_RATE_DROP',
      message: `Conversion rate dropped ${Math.abs(crChange * 100).toFixed(0)}%`,
      details: `Current: ${performanceData.current_cr}% | Baseline: ${performanceData.baseline_cr}%`,
      action: 'Check: 1) Landing page issues, 2) Tracking pixel, 3) Recent ad changes'
    });
  }

  // Budget pacing check
  const hourOfDay = new Date().getHours();
  const dailyBudget = performanceData.daily_budget;
  const spentToday = performanceData.spend_today;
  const expectedSpendByHour = (hourOfDay / 24) * dailyBudget;
  const paceRatio = spentToday / expectedSpendByHour;

  if (paceRatio > (1 + SEVERITY_THRESHOLDS.URGENT.budget_pace) && hourOfDay < 12) {
    anomalies.push({
      severity: 'URGENT',
      type: 'BUDGET_OVERRUN',
      message: `Spent $${spentToday} of $${dailyBudget} daily budget by ${hourOfDay}:00`,
      action: 'Campaign may exhaust budget before end of day. Increase daily budget or reduce bids.'
    });
  }

  // Sort by severity (URGENT first)
  return anomalies.sort((a, b) => {
    const weights = { URGENT: 3, WATCH: 2, INFO: 1 };
    return weights[b.severity] - weights[a.severity];
  });
}

// Claude reviews anomalies first thing in optimization cycle
// URGENT anomalies trigger immediate action
// WATCH anomalies go into monitoring queue
// INFO anomalies logged for weekly review
```

---

## Part 4: Dynamic Creative Strategy

### Claude's Ad Generation Framework

Unlike Performance Max's asset mixing, Claude writes purpose-built ads for each query context:

```javascript
// Ad generation parameters Claude considers

const adGenerationContext = {
  searchQuery: "hand tied extensions for fine hair",
  queryIntent: "solution_seeking", // research | comparison | solution_seeking | booking
  userJourneyStage: "consideration",
  competitorAds: [
    {
      competitor: "Competitor A",
      headline: "Hand Tied Extensions Seattle",
      differentiator: "15 years experience"
    }
  ],
  historicalPerformance: {
    bestPerformingHeadline: "Extensions Specialist for Fine Hair",
    bestPerformingDescription: "Mention 'weightless' and 'flat micro-rows'"
  },
  landingPageContext: {
    url: "/hand-tied-fine-hair.html",
    contentFocus: "Fine hair suitability, before/after gallery",
    cta: "Free consultation"
  }
}

// Claude generates ad optimized for all context
const generatedAd = {
  headlines: [
    "Hand Tied Extensions for Fine Hair", // Query match
    "Weightless, Flat, Natural-Looking", // Benefit stack from LP context
    "Seattle Extensions Specialist" // Local signal
  ],
  descriptions: [
    "Micro-beaded rows designed for fine hair. See transformations and book free consultation.", // Intent + CTA
    "10+ years specializing in extensions. Small clientele, expert application. Same-week availability." // Differentiator vs competitor
  ],
  finalUrl: "https://westside.style/hand-tied-fine-hair.html?utm_source=google&utm_medium=cpc&utm_campaign=consideration&utm_term=hand-tied-fine-hair",
  callout: ["Free Consultation", "Same-Week Appointments", "10+ Years Experience"],
  sitelinks: [
    { text: "View Before/After Gallery", url: "/gallery.html" },
    { text: "Compare Extension Types", url: "/pros-cons-all-extensions.html" },
    { text: "Book Consultation", url: "/consultation.html" }
  ]
}
```

### A/B Testing Framework

Claude runs continuous multivariate tests:

```
Test 1: Expertise vs Convenience
- Variant A: "10+ Years Extension Specialist"
- Variant B: "Same-Week Appointments Available"
- Winner after 50 clicks: Variant B (1.8x CTR)
- Insight: Market is supply-constrained, availability > experience

Test 2: Price Transparency
- Variant A: No price mention
- Variant B: "From $800" in description
- Winner after 100 clicks: Variant B (2.1x conversion rate)
- Insight: Price transparency filters tire-kickers, improves lead quality

Test 3: Landing Page Routing
- Query: "tape in extensions seattle"
- Variant A: → /tape-in-seattle.html (service page)
- Variant B: → /tape-in-results.html (gallery first)
- Winner after 30 conversions: Variant A (1.4x conversion rate)
- Insight: Tape-in searchers are further in funnel, want pricing/booking not social proof
```

---

## Part 5: Technical Implementation

### Infrastructure Requirements

#### 1. MCP Server Setup (Google Ads Integration)

**Recommended Approach: Windsor.ai**

```bash
# Install Windsor.ai MCP server
npm install -g @windsor/mcp-server-googleads

# Configure authentication
windsor mcp setup google-ads \
  --account-id AW-18371102793 \
  --auth-method oauth2 \
  --scopes "campaigns,ads,keywords,reports"

# Test connection
windsor mcp test google-ads
```

**Alternative: Composio (More developer-friendly)**

```bash
# Install Composio
npm install composio-core

# Authenticate
composio login
composio add google-ads --account-id AW-18371102793

# Verify connection
composio integrations list
```

#### 2. Claude API Integration

```javascript
// claude-ads-manager.js
import Anthropic from '@anthropic-ai/sdk';
import { GoogleAdsApi } from 'google-ads-api';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const googleAdsClient = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

const customer = googleAdsClient.Customer({
  customer_id: '18371102793',
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

// Main optimization function
async function runClaudeOptimization() {

  // 1. Fetch recent search query data
  const query = `
    SELECT
      segments.search_term,
      metrics.clicks,
      metrics.impressions,
      metrics.conversions,
      metrics.cost_micros,
      campaign.name,
      ad_group.name
    FROM search_term_view
    WHERE segments.date DURING LAST_7_DAYS
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 1000
  `;

  const searchTerms = await customer.query(query);

  // 2. Ask Claude to analyze performance
  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 16000,
    system: `You are an expert Google Ads strategist for Westside Style, a premium hair extensions business in Seattle.

    Business Context:
    - Services: Keratin bond extensions ($1,200+), Hand tied ($1,000+), Tape-in ($800+)
    - Target market: Seattle metro, female 25-45, household income $100k+
    - Unique value prop: Specialized extension expert, small clientele, 10+ years experience
    - Key differentiators: Not a full-service salon, extensions-only, high-touch service

    Your task: Analyze search query performance and provide optimization recommendations.`,

    messages: [{
      role: 'user',
      content: `Here is the last 7 days of search query data from our Google Ads campaigns:

${JSON.stringify(searchTerms, null, 2)}

Please analyze this data and provide:

1. **Negative Keywords to Add**: Identify queries that are wasting budget (low intent, wrong audience, etc.)
2. **Bid Adjustments**: Queries that are performing well and should get higher bids
3. **Creative Opportunities**: New ad copy ideas based on high-performing queries
4. **Landing Page Mismatches**: Queries where the current landing page doesn't match search intent

Format your response as JSON with this structure:
{
  "negativeKeywords": [{"keyword": "...", "matchType": "PHRASE", "reasoning": "..."}],
  "bidAdjustments": [{"query": "...", "currentBid": 0.00, "recommendedBid": 0.00, "reasoning": "..."}],
  "creativeOpportunities": [{"query": "...", "headlines": ["...", "..."], "descriptions": ["..."], "reasoning": "..."}],
  "landingPageOptimizations": [{"query": "...", "currentUrl": "...", "recommendedUrl": "...", "reasoning": "..."}],
  "summary": "Brief summary of overall performance and key actions"
}`
    }]
  });

  const recommendations = JSON.parse(analysis.content[0].text);

  // 3. Execute recommendations
  await executeRecommendations(customer, recommendations);

  return recommendations;
}

// Execute recommendations via Google Ads API
async function executeRecommendations(customer, recommendations) {

  // Add negative keywords
  for (const negKw of recommendations.negativeKeywords) {
    await customer.campaignNegativeKeywords.create({
      campaign: 'campaigns/18371102793/12345', // Replace with actual campaign ID
      keyword: {
        text: negKw.keyword,
        match_type: negKw.matchType,
      }
    });
    console.log(`Added negative keyword: ${negKw.keyword} (${negKw.reasoning})`);
  }

  // Adjust bids (simplified - would need campaign/ad group context)
  for (const bidAdj of recommendations.bidAdjustments) {
    // Implementation depends on campaign structure
    console.log(`Bid adjustment needed: ${bidAdj.query} → $${bidAdj.recommendedBid}`);
  }

  // Create new ads from creative opportunities
  for (const creative of recommendations.creativeOpportunities) {
    // Would create new responsive search ad with Claude's suggestions
    console.log(`New ad opportunity: ${creative.query}`);
  }

  return true;
}

// Schedule to run hourly
setInterval(runClaudeOptimization, 60 * 60 * 1000); // Every hour
```

#### 3. Deployment: Netlify Functions (Serverless)

Since westside.style is already on Netlify, use Netlify Functions for scheduled optimization:

```javascript
// netlify/functions/claude-ads-optimizer.js

const { schedule } = require('@netlify/functions');
const { runClaudeOptimization } = require('../../src/claude-ads-manager');

// Run every hour
const handler = schedule('0 * * * *', async (event) => {
  try {
    const results = await runClaudeOptimization();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Optimization complete',
        results
      })
    };
  } catch (error) {
    console.error('Optimization failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
});

module.exports = { handler };
```

#### 4. Monitoring Dashboard

Create a simple dashboard to visualize Claude's decisions:

```javascript
// netlify/functions/get-optimization-history.js

exports.handler = async (event) => {
  // Fetch optimization logs from DB (Supabase, Airtable, etc.)
  const logs = await fetchOptimizationLogs();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logs)
  };
};

// Simple HTML dashboard (serve as /ads-dashboard.html)
// Shows:
// - Recent Claude decisions (negative keywords added, bids adjusted, ads created)
// - Performance trends (CPA, conversion rate, ROAS by campaign)
// - Comparison to previous period
// - Budget pacing and recommendations
```

---

## Part 6: Success Metrics & Monitoring

### Key Performance Indicators (KPIs)

Track these metrics weekly to validate Claude's performance vs Performance Max:

#### Primary Metrics

| Metric | Performance Max Baseline | Claude Target | Measurement |
|--------|-------------------------|---------------|-------------|
| Cost Per Acquisition (CPA) | $150-200 | $90-120 | 40-60% improvement |
| Conversion Rate | 2-3% | 4-6% | 2x improvement |
| Return on Ad Spend (ROAS) | 400-500% | 700-900% | 1.8x improvement |
| Click-Through Rate (CTR) | 3-4% | 5-7% | 1.5x improvement |
| Quality Score (avg) | 6-7 | 8-9 | Better relevance |

#### Secondary Metrics

- **Search Impression Share**: Target 60%+ for high-intent campaigns (vs 40% with PMax)
- **Wasted Spend**: <5% of budget on non-converting queries (vs 15-20% with PMax)
- **Lead Quality**: Measure consultation show-rate and booking rate
- **Time to Conversion**: Track days from first click to booking

#### Brand vs Non-Brand Performance Benchmarks

**Critical:** Track these separately. Mixing brand and non-brand metrics creates false performance signals.

| Metric | Brand Campaign | Non-Brand Campaigns | Why It Matters |
|--------|---------------|---------------------|----------------|
| **Target CPA** | $50-70 | $100-140 | Brand searches convert 2x cheaper |
| **Expected Conv Rate** | 8-12% | 3-5% | Branded searchers already know you |
| **Expected CTR** | 12-18% | 4-7% | Brand recognition drives clicks |
| **Avg CPC** | $2-4 | $10-18 | Less competition on brand terms |
| **Impression Share Target** | >90% | >60% | Must defend brand, can be selective on non-brand |
| **Budget Allocation** | 15% ($450) | 85% ($2,550) | Small budget defense, most $ to acquisition |

**Warning Signs:**
- Brand CPA >$100: Bidding too aggressively or landing page issues
- Brand Impression Share <80%: Competitors stealing traffic, increase budget immediately
- Non-brand CPA <$80: Either amazing performance or brand queries leaking into non-brand (check search terms)

**Optimization Strategy:**
- **Brand**: Set it and forget it. Target 90%+ impression share, minimal optimization needed.
- **Non-Brand**: This is where Claude focuses 80% of optimization effort—bid adjustments, ad testing, keyword expansion.

### A/B Test: Claude vs Performance Max

Run this controlled experiment:

**Test Setup:**
- Duration: 90 days
- Budget: $3,000/month split 50/50
- Campaign A: Performance Max ($1,500/month)
- Campaign B: Claude-driven ($1,500/month)

**What to Measure:**
```
Week 1-2: Learning phase
- Let both campaigns collect data
- Don't make major changes

Week 3-8: Optimization phase
- Claude makes hourly optimizations
- Performance Max auto-optimizes

Week 9-12: Validation phase
- Measure statistical significance
- Calculate incremental lift
```

**Success Criteria:**
Claude wins if it achieves:
1. 25%+ lower CPA than Performance Max
2. Equal or higher conversion volume
3. Explainable results (transparency)

---

## Part 7: Cost Analysis

### Infrastructure Costs

| Component | Monthly Cost | Notes |
|-----------|--------------|-------|
| Claude API (Sonnet 4.5) | $50-100 | ~1M tokens/month for optimization |
| MCP Server (Windsor/Composio) | $0-50 | Free tier likely sufficient initially |
| Netlify Functions | $0-25 | Free tier covers 125k requests |
| Monitoring/Analytics | $0 | Use Google Data Studio (free) |
| **Total Infrastructure** | **$50-175** | Scales with campaign complexity |

### Google Ads Budget Recommendation

For westside.style with high-ticket services:

| Monthly Budget | Expected Results (Claude-Driven) | Strategy |
|----------------|----------------------------------|----------|
| $1,500-2,000 | 15-20 consultations, 8-12 bookings | Start here, focus on high-intent only |
| $3,000-4,000 | 30-40 consultations, 18-25 bookings | Optimal for multi-campaign strategy |
| $5,000+ | 50+ consultations, 30+ bookings | Add geographic expansion, YouTube |

**ROI Projection (Conservative):**
- Average booking value: $1,000
- Close rate from consultation: 60%
- Monthly budget: $3,000
- Expected bookings: 20
- Revenue: $20,000
- ROAS: 6.7x (after infrastructure costs)

---

## Part 8: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Tasks:**
- [ ] Set up MCP server with Google Ads API access
- [ ] Create Claude API integration
- [ ] Deploy Netlify scheduled function
- [ ] Build initial campaign structure (High-Intent, Research, Geo)
- [ ] Set up conversion tracking validation
- [ ] Create monitoring dashboard

**Deliverables:**
- Working API integration
- 3 campaigns live with manual ads
- Basic reporting dashboard

### Phase 2: Automation (Week 3-4)

**Tasks:**
- [ ] Enable Claude's hourly optimization cycle
- [ ] Implement negative keyword automation
- [ ] Build ad copy generation pipeline
- [ ] Set up bid adjustment automation
- [ ] Create weekly reporting email

**Deliverables:**
- Fully automated optimization loop
- Claude making real-time decisions
- Weekly performance reports

### Phase 3: Optimization (Week 5-8)

**Tasks:**
- [ ] Run A/B tests on ad copy variants
- [ ] Optimize landing page routing
- [ ] Refine bid strategies based on data
- [ ] Expand keyword lists based on search terms report
- [ ] Implement competitor monitoring

**Deliverables:**
- Optimized campaign performance
- Data-driven insights on what converts
- Refined targeting and messaging

### Phase 4: Scale (Week 9-12)

**Tasks:**
- [ ] Increase budget to winning campaigns
- [ ] Launch retargeting campaigns
- [ ] Add YouTube and Display (if profitable)
- [ ] Implement seasonal/event-based bid modifiers
- [ ] Build attribution model for multi-touch journeys

**Deliverables:**
- Scaled campaign reaching target ROAS
- Multi-channel strategy
- Predictable, repeatable results

---

## Part 9: Risk Mitigation

### Potential Challenges & Solutions

#### 1. API Rate Limits
**Risk:** Google Ads API has rate limits (15,000 operations/day)
**Solution:**
- Batch operations together
- Cache frequently accessed data
- Implement exponential backoff for retries

#### 2. Claude Hallucination/Errors
**Risk:** Claude might suggest invalid keywords or bids
**Solution:**
- Validate all Claude outputs with schema checks
- Set safety limits (e.g., max bid $50, min bid $0.50)
- Human approval for budget changes >20%

#### 3. Learning Period Disruption
**Risk:** Frequent changes might reset Google's learning algorithm
**Solution:**
- Limit ad creation to 1-2 new ads per week per ad group
- Focus on bid/budget optimization (doesn't reset learning)
- Don't pause ads with <100 impressions

#### 4. Attribution Complexity
**Risk:** Multi-touch journeys make ROI calculation difficult
**Solution:**
- Use Google Ads data-driven attribution model
- Track assisted conversions, not just last-click
- Build custom attribution model if needed

---

## Part 10: Competitive Advantages Summary

### Why Claude Beats Performance Max for Westside Style

| Dimension | Performance Max | Claude-Driven | Advantage |
|-----------|----------------|---------------|-----------|
| **Brand/Non-Brand Separation** | Mixed together, skewed metrics | Separate campaigns, accurate tracking | 2x better CPA on non-brand through proper optimization |
| **Transparency** | Black box, no query visibility | Full query, placement, audience data | Can identify and fix waste |
| **Intent Matching** | Same ads for all funnel stages | Custom ads per search intent | Higher conversion rates |
| **Local Optimization** | Generic geo-targeting | Neighborhood-level bid modifiers | Better ROI in high-value areas |
| **Creative Quality** | Generic asset mixing | Purpose-written ads per query | Higher CTR and Quality Score |
| **Budget Control** | Auto-allocates across all Google | Campaign-level control | Focus budget on Search |
| **Competitive Response** | No competitor awareness | Real-time competitor monitoring | Dynamic positioning |
| **Anomaly Detection** | Reactive after damage done | Proactive URGENT/WATCH/INFO flags | Catch issues in hours, not days |
| **Device Optimization** | Basic mobile bid modifiers | Landing page-level mobile analysis | Fix conversion blockers, not just bid adjustments |
| **Cross-Channel Intelligence** | Siloed paid data only | Integrates Search Console organic data | Discover proven-intent keywords to add |
| **Explainability** | "Trust the algorithm" | Every decision is documented | Improve over time |
| **Learning Speed** | Needs 50+ conversions to optimize | Optimizes from day 1 with context | Faster time to profitability |

---

## Conclusion

Performance Max is designed for e-commerce brands with high volume, low AOV, and mass-market appeal. Westside Style is the opposite: high-ticket, small volume, niche expertise.

Claude's contextual intelligence allows for:
1. **Precision targeting** of high-intent searches
2. **Dynamic creative** that matches buyer journey stage
3. **Real-time optimization** based on market conditions
4. **Complete transparency** into what's working and why

By implementing this specification, westside.style can achieve:
- **40-60% lower CPA** through waste elimination
- **2x higher conversion rates** through intent-matched messaging
- **Full visibility** into performance drivers
- **Scalable system** that improves over time

The key is not just automation, but intelligent automation—using Claude's reasoning capabilities to make decisions a human expert would make, but at machine speed and scale.

---

## Next Steps

1. **Immediate (This Week):**
   - Audit current Google Ads account structure
   - Set up MCP server integration
   - Create initial campaign structure in Google Ads interface

2. **Short-term (Next 2-4 Weeks):**
   - Deploy Claude optimization function
   - Run parallel test: Claude vs Performance Max
   - Build monitoring dashboard

3. **Long-term (3+ Months):**
   - Scale winning campaigns
   - Expand to retargeting and YouTube
   - Build predictive models for seasonal trends

---

**Document Owner:** Josh Petersen
**Last Updated:** August 12, 2026
**Version:** 1.0

**Questions or Implementation Support:**
- Technical: Review this document with Claude Code
- Business Strategy: Test with $1,500-2,000 initial budget
- Optimization: Schedule weekly reviews of Claude's decisions

---

## Appendix A: Sample Claude Prompts

### Prompt 1: Search Query Analysis

```
You are analyzing search query performance for Westside Style, a premium hair extensions specialist.

Here is the last 7 days of search query data:
[INSERT GAQL QUERY RESULTS]

Analyze this data and identify:
1. Negative keywords to add (queries wasting budget)
2. High-performing queries that need higher bids
3. New ad copy opportunities based on query patterns
4. Landing page mismatches where search intent doesn't match destination

Consider:
- Business focuses on keratin, hand-tied, and tape-in extensions
- Average order value is $800-1,200
- Target market is affluent Seattle metro residents
- Not a full-service salon, extensions only

Provide recommendations in JSON format.
```

### Prompt 2: Competitive Analysis

```
Here are the current Google Ads from our top 3 competitors in Seattle hair extensions:

Competitor A:
[INSERT AD COPY]

Competitor B:
[INSERT AD COPY]

Competitor C:
[INSERT AD COPY]

Our current ads:
[INSERT CURRENT AD COPY]

Analyze:
1. What positioning angles are competitors using?
2. What gaps exist in the market we can exploit?
3. Generate 3 new ad variations that differentiate us
4. Suggest any urgency/scarcity tactics if competitors are using them

Our unique value props:
- Extensions-only specialist (not full-service salon)
- 10+ years experience
- Small, focused clientele
- Premium quality
```

### Prompt 3: Landing Page Optimization

```
A user searched for "[QUERY]" and clicked our ad with headline "[HEADLINE]" and description "[DESCRIPTION]".

They landed on: [URL]

The page contains: [SUMMARY OF PAGE CONTENT]

Did they see what they expected?
- If yes, explain why this is a good match
- If no, suggest a better landing page from our site and explain why

Our available landing pages:
- /keratin-bond-seattle.html (service overview, pricing, features)
- /hand-tied-seattle.html (service overview, pricing, features)
- /tape-in-seattle.html (service overview, pricing, features)
- /pros-cons-all-extensions.html (comparison guide)
- /gallery.html (before/after photos)
- /consultation.html (booking form)
- [LIST OTHER RELEVANT PAGES]
```

---

## Appendix B: Google Ads Query Language (GAQL) Examples

### Query 1: Search Terms Performance

```sql
SELECT
  segments.search_term,
  segments.search_term_match_type,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_micros,
  campaign.name,
  ad_group.name,
  metrics.average_cpc
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 10
ORDER BY metrics.cost_micros DESC
```

### Query 2: Time-of-Day Performance

```sql
SELECT
  segments.hour,
  segments.day_of_week,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_micros,
  campaign.name
FROM campaign_performance_view
WHERE segments.date DURING LAST_30_DAYS
ORDER BY segments.day_of_week, segments.hour
```

### Query 3: Geographic Performance

```sql
SELECT
  geographic_view.location_type,
  campaign_criterion.location.geo_target_constant,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_micros
FROM geographic_view
WHERE segments.date DURING LAST_30_DAYS
  AND campaign_criterion.location.geo_target_constant IS NOT NULL
ORDER BY metrics.cost_micros DESC
```

---

## Appendix C: Code Repository Structure

```
westside-style-ads/
├── src/
│   ├── claude-ads-manager.js          # Main optimization logic
│   ├── google-ads-client.js           # Google Ads API wrapper
│   ├── anthropic-client.js            # Claude API wrapper
│   ├── utils/
│   │   ├── gaql-queries.js            # Reusable GAQL queries
│   │   ├── validation.js              # Validate Claude outputs
│   │   └── safety-limits.js           # Bid/budget guardrails
│   └── prompts/
│       ├── search-query-analysis.txt
│       ├── competitive-analysis.txt
│       └── creative-generation.txt
├── netlify/
│   └── functions/
│       ├── claude-ads-optimizer.js    # Scheduled hourly optimization
│       ├── get-optimization-history.js
│       └── manual-trigger.js          # On-demand optimization trigger
├── config/
│   ├── campaigns.json                 # Campaign structure definitions
│   ├── keywords.json                  # Initial keyword lists
│   └── mcp-config.json                # MCP server configuration
├── tests/
│   ├── claude-integration.test.js
│   └── google-ads-api.test.js
├── dashboard/
│   ├── index.html                     # Simple performance dashboard
│   └── styles.css
├── .env.example                       # Environment variables template
├── package.json
└── README.md
```

---

**END OF TECHNICAL SPECIFICATION**

This document is a living strategy that should be updated as:
- Campaign performance data comes in
- Google Ads API evolves
- Claude's capabilities improve
- Competitive landscape changes

Treat this as a foundation, not a static blueprint. The power of Claude-driven campaigns is their ability to adapt and improve continuously.
