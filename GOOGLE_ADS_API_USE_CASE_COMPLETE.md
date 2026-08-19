# Google Ads API Use Case Documentation - Westside Style

**Company Name:** Westside Style

**Business Model:** Westside Style is a specialized hair extensions salon based in Seattle, WA. We provide keratin bond, hand-tied, and tape-in hair extension services exclusively. We operate a single business location and advertise only for our own services at www.westsidestyle.com (Netlify site: westsidestyle.netlify.app). We do not manage advertising for any other businesses.

## Tool Access/Use

**Primary Users:** Josh Petersen (owner) - internal use only

**Purpose:** Internal campaign management and optimization tool called GASP (Google Ads Systematic Program) that will:
- Monitor search term performance across our Google Ads campaigns
- Identify and recommend negative keywords to reduce wasted ad spend
- Create and manage Search campaigns alongside our existing Performance Max campaigns
- Generate weekly performance reports comparing campaign effectiveness
- Optimize keyword bids based on conversion data

**Access:** This is a private, internal tool running locally on the owner's personal computer. No external access. No third-party access. Tool runs via Claude Code (Anthropic's AI assistant) and MCP servers.

## Tool Design

**Architecture:**
- MCP server (google-ads-write-mcp) connects to Google Ads API locally
- Local HTML dashboard (gasp-dashboard.html) displays performance metrics
- Weekly automated scripts analyze search terms
- All campaign changes created in "paused" state for manual review
- Performance data stored locally for historical analysis

**User Workflow:**
1. Owner requests analysis via natural language commands in Claude Code terminal
2. Tool queries Google Ads API for search term reports and campaign performance
3. Tool analyzes data and generates recommendations (negative keywords, bid adjustments)
4. Recommendations presented to owner for approval
5. Upon approval, tool executes changes via API (campaigns paused, keywords added, negatives applied)
6. Dashboard auto-updates with latest data

**Frequency:**
- Performance monitoring: Daily
- Search term analysis: Weekly
- Campaign modifications: As needed with manual approval

## API Services Called

**Read Operations:**
- GoogleAdsService.Search (GAQL queries) - Campaign performance, search terms, keyword data
- Customer resource - Account metrics
- Campaign resource - Campaign performance
- SearchTermView resource - Search term reports
- AdGroup resource - Ad group performance
- AdGroupCriterion resource - Keyword performance

**Write Operations:**
- CampaignService.MutateCampaigns - Create Search campaigns (paused)
- AdGroupService.MutateAdGroups - Create ad groups
- AdGroupAdService.MutateAdGroupAds - Create Responsive Search Ads
- AdGroupCriterionService.MutateAdGroupCriteria - Add keywords and negatives
- CampaignCriterionService.MutateCampaignCriteria - Add campaign-level negatives
- CampaignBudgetService.MutateCampaignBudgets - Set budgets

**Expected Volume:**
- 50-100 API calls/day (mostly reads)
- 10-20 write operations/week
- Well within 15,000 ops/day limit

## Tool Mockups

**Screenshot 1: Dashboard View**
```
GASP Dashboard - Westside Style

Performance Max Campaign          GASP Search Campaigns
┌──────────────────────┐         ┌──────────────────┐
│ Spend: $360          │         │ Spend: $298      │
│ Leads: 2             │         │ Leads: 3         │
│ Cost/Lead: $180      │         │ Cost/Lead: $99   │
│ Status: 🔴 Above    │         │ Status: 🟢 Good  │
└──────────────────────┘         └──────────────────┘

Search Term Analysis (This Week)
┌────────────────────────────────────────────────────┐
│ Wasteful terms identified: 12                      │
│ - "beauty salons seattle wa" (87 impr, 0 clicks)  │
│ - "lash extensions" (65 impr, 0 clicks)           │
│ - "hair salon near me" (54 impr, 0 clicks)        │
│                                                     │
│ Recommendation: Add 8 negative keywords            │
│ Projected savings: $62/month                       │
└────────────────────────────────────────────────────┘

[Generate Report] [Apply Recommendations]
```

**Screenshot 2: Claude Code Terminal Interface**
```
$ claude

User: Analyze search terms from last week and recommend negative keywords

Claude: Analyzing search term report from Aug 4-11, 2026...

Found 40 search terms with zero clicks:
- 12 wasteful terms (generic salons, competitors)
- 8 high-intent terms that need better targeting
- Recommended adding 18 negative keywords

Would you like me to add these negative keywords to your campaigns?

User: Yes, add them to GASP-1-NonBrand

Claude: Adding 18 negative keywords to GASP-1-NonBrand campaign...
✓ Added successfully
Updated dashboard with new data.
```

**Screenshot 3: Weekly Report Email**
```
Subject: GASP Weekly Report - Aug 11-18, 2026

Performance Summary:
- GASP campaigns: $298 spend, 3 leads, $99 CPL
- Performance Max: $360 spend, 2 leads, $180 CPL
- GASP is 45% more efficient this week

Top Performing Keywords:
1. "hair extensions federal way" - $2.50 CPC, 2 conversions
2. "tape in extensions seattle" - $6.00 CPC, 1 conversion

Recommendations:
- Increase budget on GASP-1-NonBrand by $5/day
- Add 4 new city-specific keywords
- Add 6 new negative keywords

[View Full Report] [Apply Recommendations]
```

## Security & Compliance

- All credentials stored locally, never shared
- Campaigns created paused for review
- No automated budget increases without approval
- Logs maintained for all API actions
- Tool used only by business owner for own account
- Complies with Google Ads API Terms of Service

## Business Justification

Our Performance Max campaign is spending on wasteful search terms we cannot control (competitors, generic salons, irrelevant searches). Analysis shows $198/month waste on zero-performing terms. GASP allows us to:
1. Add negative keywords to prevent waste
2. Target specific high-intent keywords at lower CPCs
3. Test city-specific keyword strategy (cheaper than generic "seattle" terms)
4. Maintain visibility and control over ad spending

Expected outcome: 40% reduction in cost per lead while maintaining lead volume.
