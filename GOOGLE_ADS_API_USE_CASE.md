# Google Ads API Use Case Documentation - Westside Style

## Company Information

**Company Name:** Westside Style

**Business Model:** Westside Style is a specialized hair extensions salon based in Seattle, WA. We provide keratin bond, hand-tied, and tape-in hair extension services exclusively. We operate a single business location and advertise only for our own services at www.westsidestyle.com. We do not manage advertising for any other businesses.

## Tool Access/Use

**Primary Users:** Josh Petersen (owner) and internal staff only

**Purpose:** Internal campaign management and optimization tool called GASP (Google Ads Systematic Program) that will:
- Monitor search term performance across our Google Ads campaigns
- Identify and recommend negative keywords to reduce wasted ad spend
- Create and manage Search campaigns alongside our existing Performance Max campaigns
- Generate weekly performance reports comparing campaign effectiveness
- Optimize keyword bids based on conversion data

**Access:** This is a private, internal tool. No external access will be provided. The tool runs locally via Claude Code (Anthropic's AI coding assistant) and MCP (Model Context Protocol) servers on the owner's personal computer.

## Tool Design

**Architecture:**
- MCP server (google-ads-write-mcp) connects directly to Google Ads API
- Local dashboard (gasp-dashboard.html) displays performance metrics
- Weekly automated scripts analyze search terms and recommend optimizations
- All campaign changes are created in "paused" state for manual review before activation
- Performance data is stored locally for historical analysis

**User Workflow:**
1. Owner requests campaign analysis via natural language commands in Claude Code
2. Tool queries Google Ads API for search term reports and campaign performance
3. Tool analyzes data and generates recommendations (negative keywords, bid adjustments)
4. Recommendations are presented to owner for approval
5. Upon approval, tool executes changes via API (campaigns created paused, keywords added, negatives applied)
6. Dashboard auto-updates with latest performance data

**Frequency:**
- Performance monitoring: Daily
- Search term analysis: Weekly
- Campaign modifications: As needed, always with manual approval

## API Services Called

**Read Operations:**
- `GoogleAdsService.Search` (GAQL queries) - Pull campaign performance, search terms, keyword data
- `Customer` resource - Account-level metrics
- `Campaign` resource - Campaign performance data
- `SearchTermView` resource - Search term reports from Performance Max and Search campaigns
- `AdGroup` resource - Ad group performance
- `AdGroupCriterion` resource - Keyword performance and match types

**Write Operations:**
- `CampaignService.MutateCampaigns` - Create new Search campaigns (paused state)
- `AdGroupService.MutateAdGroups` - Create ad groups within campaigns
- `AdGroupAdService.MutateAdGroupAds` - Create Responsive Search Ads
- `AdGroupCriterionService.MutateAdGroupCriteria` - Add keywords and negative keywords
- `CampaignCriterionService.MutateCampaignCriteria` - Add campaign-level negative keywords
- `CampaignBudgetService.MutateCampaignBudgets` - Set campaign budgets

**Expected Volume:**
- ~50-100 API calls per day (primarily read operations for monitoring)
- ~10-20 write operations per week (campaign adjustments)
- Well within the 15,000 operations/day limit for Basic Access

## Tool Mockups

### Dashboard View (gasp-dashboard.html)
```
┌─────────────────────────────────────────────────────────┐
│ GASP Dashboard - Westside Style                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Performance Max Campaign          GASP Search Campaigns│
│  ┌──────────────────────┐         ┌──────────────────┐ │
│  │ Spend: $360          │         │ Spend: $298      │ │
│  │ Leads: 2             │         │ Leads: 3         │ │
│  │ Cost/Lead: $180      │         │ Cost/Lead: $99   │ │
│  │ Status: 🔴 Above    │         │ Status: 🟢 Good  │ │
│  └──────────────────────┘         └──────────────────┘ │
│                                                          │
│  Search Term Analysis (This Week)                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Wasteful terms identified: 12                      │ │
│  │ - "beauty salons seattle wa" (87 impr, 0 clicks) │ │
│  │ - "lash extensions" (65 impr, 0 clicks)          │ │
│  │ - "hair salon near me" (54 impr, 0 clicks)       │ │
│  │                                                      │ │
│  │ Recommendation: Add 8 negative keywords            │ │
│  │ Projected savings: $62/month                       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  [Generate Report] [Apply Recommendations]              │
└─────────────────────────────────────────────────────────┘
```

### Claude Code Terminal Interface
```
$ claude

User: Analyze search terms from last week and recommend negative keywords