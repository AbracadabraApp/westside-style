# GASP Automated Approach - Using Google Ads API

**Date:** 2026-08-18
**Goal:** Shift from manual Google Ads interface to code-based, automated campaign management via Claude Code

## Why Automate

### Current Pain Points
1. **Manual CSV uploads failing** - Campaign ID requirements, format issues
2. **Interface crashes** - Google Ads web interface unstable during campaign creation
3. **Time-consuming** - Manual keyword entry, negative keyword copying, bid adjustments
4. **No version control** - Changes in Google Ads UI aren't tracked/documented
5. **Limited bulk operations** - Can't easily test multiple bid strategies simultaneously

### Benefits of API Approach
1. **Programmatic control** - Create campaigns, add keywords, set bids via code
2. **Batch operations** - Add 65 keywords + 41 negatives in one script run
3. **Reproducible** - Same code works every time, no UI quirks
4. **Auditable** - All changes tracked in git commits
5. **Testable** - Can create campaigns in paused state for review
6. **GASP integration** - Automated analysis → automated action

## Three Path Options

### Option 1: Adspirer MCP (Recommended for Speed)
**Best for:** Getting GASP live quickly with minimal setup friction

**Pros:**
- 39 Google Ads tools ready immediately
- No developer token needed (Adspirer handles it)
- Keyword research with real CPC data from Keyword Planner
- Campaign creation (paused by default)
- Search term analysis + negative keyword recommendations
- Works in Claude Code terminal with natural language
- Safety: campaigns created paused, budget changes require approval

**Cons:**
- Subscription cost: $49/mo (Plus tier, 150 API calls)
- Dependent on third-party service
- May have limits on advanced customization

**Setup time:** ~15 minutes
1. `/plugin marketplace add amekala/ads-mcp`
2. `/plugin install adspirer-advertising-agent@adspirer-marketplace`
3. Authenticate with Google Ads account
4. Start using natural language commands

**Immediate use cases for Westside Style:**
```
"Analyze search terms from Performance Max campaign and recommend negative keywords"
"Create paused Search campaign GASP-1-NonBrand with these 65 keywords [paste CSV]"
"Research CPC data for 'hair extensions federal way' in Seattle metro"
"Add these 41 negative keywords to GASP-1-NonBrand campaign"
```

**Cost analysis:**
- 150 calls/month = ~5 calls/day
- Typical workflow: 1 call for analysis, 1 for campaign creation, 2-3 for adjustments
- Should be sufficient for GASP management
- Can upgrade to Pro ($99/mo, 600 calls) if needed

### Option 2: Official Google Ads MCP (Read-Only)
**Best for:** Performance analysis and reporting without write access

**Pros:**
- Official Google implementation
- Free (run locally via pipx)
- No subscription costs
- Direct Google authentication

**Cons:**
- **READ-ONLY** - Cannot create campaigns, add keywords, or make changes
- Requires Google Ads Developer Token (2-5 business days approval)
- Requires OAuth setup (Google Cloud project, credentials)
- More complex authentication

**Setup time:** 30-45 minutes (plus token approval wait)
1. Get Developer Token from Google Ads MCC API Center
2. Create Google Cloud project, enable Google Ads API
3. Generate OAuth credentials
4. Install: `pipx run --spec git+https://github.com/googleads/google-ads-mcp.git google-ads-mcp`
5. Set environment variables

**Use cases for Westside Style:**
- Query campaign performance via GAQL
- Pull search term reports
- Analyze Performance Max black box
- Generate automated reports for dashboard

**Not suitable for:** Actually creating GASP campaigns (can only read)

### Option 3: Python Scripts via google-ads Library
**Best for:** Full control, no subscription, one-time cost

**Pros:**
- Complete read/write access
- No ongoing subscription
- Full API flexibility
- Custom automation possible (scheduled audits, auto-bidding logic)
- Can integrate with existing GASP dashboard

**Cons:**
- Most setup work (same auth as Option 2)
- Requires writing/maintaining Python code
- Requires Google Ads Developer Token
- More debugging if something breaks

**Setup time:** 1-2 hours initial, then reusable

**Authentication requirements (same as Option 2):**
1. Google Ads Developer Token from MCC
2. Google Cloud project with Ads API enabled
3. OAuth 2 credentials (client ID/secret)
4. Refresh token generated

**Example script structure:**
```python
from google.ads.googleads.client import GoogleAdsClient

# Create campaign
campaign_operation = client.get_type("CampaignOperation")
campaign = campaign_operation.create
campaign.name = "GASP-1-NonBrand"
campaign.advertising_channel_type = client.enums.AdvertisingChannelTypeEnum.SEARCH
campaign.status = client.enums.CampaignStatusEnum.PAUSED
campaign.manual_cpc.enhanced_cpc_enabled = False
campaign.campaign_budget = budget_resource_name
campaign.network_settings.target_google_search = True

# Add keywords
ad_group_criterion_operations = []
for kw in keywords:
    operation = client.get_type("AdGroupCriterionOperation")
    criterion = operation.create
    criterion.ad_group = ad_group_resource_name
    criterion.keyword.text = kw['text']
    criterion.keyword.match_type = client.enums.KeywordMatchTypeEnum.PHRASE
    criterion.cpc_bid_micros = int(kw['bid'] * 1000000)
    ad_group_criterion_operations.append(operation)

# Execute batch
response = ad_group_criterion_service.mutate_ad_group_criteria(
    customer_id=customer_id,
    operations=ad_group_criterion_operations
)
```

**Maintenance:** Scripts need updates if Google Ads API changes (rare, usually backward compatible)

## Recommended Approach for Westside Style

### Phase 1: Quick Win with Adspirer (Week 1)
**Immediate action:** Use Adspirer to get GASP-1-NonBrand live TODAY

1. Install Adspirer MCP ($49/mo Plus tier)
2. Have Claude Code create paused campaign with all 65 keywords
3. Add 41 negative keywords
4. Review campaign in Google Ads interface
5. Set budget to $10/day
6. Launch
7. Create GASP-1-Brand similarly

**Timeline:** 1-2 hours
**Cost:** $49/mo subscription
**Risk:** Low (campaigns created paused for review)

### Phase 2: Enhance with Python Scripts (Weeks 2-4)
**Goal:** Build custom GASP automation that doesn't require subscription

1. Apply for Google Ads Developer Token (Test Access, instant)
2. Set up OAuth while waiting for token
3. Build Python scripts for:
   - Pulling search term reports
   - Identifying wasteful terms (zero clicks, high impressions)
   - Auto-generating negative keyword recommendations
   - Updating GASP dashboard with real API data
4. Test scripts with Developer Token (Test Access)
5. Apply for Basic Access if needed (production accounts, 2-day review)

**Timeline:** 2-3 weeks part-time
**Cost:** Free (except dev time)
**Benefit:** Own the infrastructure, no ongoing subscription

### Phase 3: Full GASP Automation (Month 2+)
**Goal:** Systematic weekly optimization loop

**Automated weekly workflow:**
```
1. Sunday night: Pull Performance Max search term report
2. Identify terms with >100 impressions, 0 clicks (wasteful)
3. Auto-add as negative keywords to GASP campaigns
4. Identify high-performing terms not yet in GASP keyword list
5. Generate bid adjustment recommendations (raise winners, lower losers)
6. Email Josh summary + recommended actions
7. Josh approves via reply
8. Script executes approved changes
9. Update GASP dashboard with new data
```

**Technologies:**
- Python scripts via google-ads library
- Scheduled via cron or GitHub Actions
- Email notifications for approval
- Dashboard auto-updates

## Authentication Deep Dive

### What You Need (for Options 2 & 3)

1. **Google Ads Developer Token** (22-character string)
   - Where: Google Ads Manager account → Tools → API Center
   - Access levels:
     - Test Account Access: Instant, test accounts only, 15k ops/day
     - Basic Access: 2-5 business days, production accounts, 15k ops/day
   - You likely need: Test Access initially (to try scripts), then Basic for production

2. **Google Cloud Project**
   - Create at console.cloud.google.com
   - Enable "Google Ads API"
   - Note Project ID

3. **OAuth 2.0 Credentials**
   - In Cloud project: APIs & Services → Credentials
   - Create OAuth 2.0 Client ID (Desktop app type)
   - Download JSON (contains client_id and client_secret)

4. **Refresh Token**
   - Run OAuth flow once (browser window opens, you grant permission)
   - Script receives refresh_token (long-lived credential)
   - Store in google-ads.yaml config file

### Config File Format (google-ads.yaml)
```yaml
developer_token: YOUR_22_CHAR_TOKEN
client_id: YOUR_CLIENT_ID.apps.googleusercontent.com
client_secret: YOUR_CLIENT_SECRET
refresh_token: YOUR_REFRESH_TOKEN
login_customer_id: YOUR_MCC_ID  # 10-digit, no dashes
use_proto_plus: True
```

## Cost Comparison

| Approach | Setup Time | Monthly Cost | Ongoing Effort | Control Level |
|----------|------------|--------------|----------------|---------------|
| Adspirer MCP | 15 min | $49 (Plus) | Minimal | Medium |
| Official MCP | 45 min | $0 | Minimal | Low (read-only) |
| Python Scripts | 2 hours | $0 | Medium (maintenance) | Full |
| Hybrid (Adspirer + Python) | 2.5 hours | $49 initially, $0 later | Low-Medium | Full |

## Implementation Plan

### Week 1: Get Live with Adspirer
- [ ] Install Adspirer MCP in Claude Code
- [ ] Connect Google Ads account
- [ ] Create GASP-1-NonBrand campaign (paused)
  - [ ] 65 keywords with city variations
  - [ ] 41 negative keywords
  - [ ] Manual CPC bidding
  - [ ] $10/day budget
  - [ ] 30 Seattle metro cities
- [ ] Create GASP-1-Brand campaign (paused)
  - [ ] 3 brand keywords
  - [ ] $2/day budget
- [ ] Review both campaigns in Google Ads interface
- [ ] Launch campaigns
- [ ] Monitor for 7 days

### Week 2-3: Setup Python Infrastructure
- [ ] Apply for Google Ads Developer Token (Test Access)
- [ ] Create Google Cloud project
- [ ] Enable Google Ads API
- [ ] Generate OAuth credentials
- [ ] Install google-ads-python library: `pip install google-ads`
- [ ] Create google-ads.yaml config
- [ ] Run OAuth flow to get refresh token
- [ ] Test basic query (list campaigns)

### Week 3-4: Build GASP Scripts
- [ ] Script 1: Pull search term report from Performance Max
- [ ] Script 2: Analyze wasteful terms (GASP logic)
- [ ] Script 3: Generate negative keyword recommendations
- [ ] Script 4: Add negative keywords to campaigns (after approval)
- [ ] Script 5: Pull GASP campaign performance for dashboard
- [ ] Script 6: Generate weekly optimization report

### Month 2: Automation & Monitoring
- [ ] Schedule weekly search term analysis
- [ ] Integrate with GASP dashboard (real API data)
- [ ] Build approval workflow (email or Slack)
- [ ] Monitor GASP vs PMax performance
- [ ] Iterate on bid strategies
- [ ] Consider canceling Adspirer (if Python scripts mature)

## Security & Safety

### Best Practices
1. **Always create campaigns paused** - Review before spending
2. **Test with small budgets first** - $1/day to verify tracking
3. **Use Test Access developer token initially** - Won't affect production
4. **Store credentials securely** - google-ads.yaml in .gitignore
5. **Log all API actions** - Audit trail for changes
6. **Set spending limits** - Google Ads account budget caps
7. **Manual approval for large changes** - Budget increases, campaign deletions

### What to NEVER Automate (Without Approval)
- Campaign deletions
- Budget increases >20%
- Disabling conversion tracking
- Changing landing pages
- Force-pushing to main/master branches (git equivalent)

## Success Metrics

### Week 1 Goals (After Launch)
- [ ] GASP campaigns live and spending
- [ ] Zero manual CSV upload frustration
- [ ] Campaign structure matches plan (65 keywords, 41 negatives)
- [ ] First search term data from GASP campaigns

### Week 4 Goals
- [ ] Python scripts working (read-only)
- [ ] Automated search term report generated
- [ ] First negative keyword recommendations from script
- [ ] Dashboard showing GASP vs PMax performance

### Month 2 Goals
- [ ] Weekly automation running
- [ ] Cost per Lead improvement vs Performance Max (target: 40% reduction)
- [ ] City-specific keyword performance data (validate Federal Way = cheaper)
- [ ] Decision point: Keep or cancel Adspirer subscription

## Questions to Answer Through Testing

1. **Do city-specific keywords actually cost less?** Compare CPC for "hair extensions seattle" vs "hair extensions federal way"
2. **Do they convert equally well?** Same quality lead from Burien as Seattle?
3. **Which extension types perform best?** Keratin, hand-tied, or tape-in keywords?
4. **What's the GASP vs PMax performance delta?** Cost per lead comparison
5. **Can we reduce PMax budget?** If GASP captures high-intent searches, PMax may be redundant

## Next Decision Point

**Choose now:**
1. **Quick start:** Install Adspirer today, get GASP live by tonight ($49/mo, 15 min)
2. **DIY from scratch:** Apply for developer token, build Python scripts (free, 2-3 weeks)
3. **Hybrid:** Use Adspirer now while building Python scripts in parallel (best of both)

Which approach do you want to take?
