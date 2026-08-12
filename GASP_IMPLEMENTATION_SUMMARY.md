# GASP Implementation Summary
## Quick Reference Guide

**Full Details:** See [GASP_TECHNICAL_IMPLEMENTATION_PLAN.md](GASP_TECHNICAL_IMPLEMENTATION_PLAN.md)

---

## What is GASP?

Google Ads Systematic Program - A Claude-driven optimization system to compete against Performance Max at $360/month budget.

**Goal:** Prove 20-40% better efficiency through:
- Brand/non-brand campaign separation
- Weekly negative keyword additions
- Systematic bid optimization
- Full transparency into every decision

---

## Implementation Phases

### Phase 0: Prerequisites (1-2 hours)
- Create Google Cloud project
- Enable Google Ads API
- Generate OAuth credentials
- Request developer token
- Set up local environment

### Phase 1: Google Ads API Setup (3-4 hours)
- Complete OAuth 2.0 flow
- Generate refresh token
- Create API client wrapper
- Test connection with campaigns

### Phase 2: Claude Integration (2-3 hours)
- Set up Anthropic API client
- Create prompt templates
- Test search term analysis
- Validate JSON responses

### Phase 3: Automation Deployment (3-4 hours)
- Build core optimizer logic
- Create Netlify Functions
- Set up weekly scheduling
- Deploy to production

### Phase 4: Data Fetching & Analysis (2-3 hours)
- Build GAQL query library
- Create performance analyzers
- Generate weekly reports
- Compare GASP vs Performance Max

### Phase 5: Mutation Operations (3-4 hours)
- Implement negative keyword additions
- Build bid adjustment logic
- Add safety limits
- Set up logging

**Total Time: 15-20 hours**

---

## Technology Stack

```
Frontend:
- None (headless automation)

Backend:
- Node.js 18+
- Netlify Functions (serverless)
- Scheduled Functions (cron)

APIs:
- Google Ads API v22 (google-ads-api npm)
- Claude API (Sonnet 4.5)

Storage:
- Environment variables (secrets)
- JSON logs (optimization history)
- No database required

Deployment:
- Existing Netlify infrastructure
- Zero additional hosting costs
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Weekly Optimization Cycle                │
│                  (Runs Monday 9 AM Pacific)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  1. Fetch Performance Data (Google Ads API)                 │
│     - Search terms (last 14 days)                           │
│     - Device performance                                    │
│     - Keyword performance                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Analyze with Claude (Anthropic API)                     │
│     - Identify negative keywords                            │
│     - Suggest bid adjustments                               │
│     - Flag concerns                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Validate & Apply Safety Limits                          │
│     - Max 10 negative keywords per week                     │
│     - Bid changes capped at +/- 50%                         │
│     - Bids stay within $2-25 range                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Execute Mutations (Google Ads API)                      │
│     - Add negative keywords                                 │
│     - Adjust keyword bids                                   │
│     - Update campaign settings                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Log Results & Send Report                               │
│     - Write optimization log                                │
│     - Generate weekly report                                │
│     - Compare to Performance Max                            │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
westside-style/
├── src/gasp/
│   ├── google-ads-client.js       # Google Ads API wrapper
│   ├── claude-client.js           # Claude API wrapper
│   ├── optimizer.js               # Main optimization logic
│   ├── mutations.js               # Mutation operations
│   ├── utils/
│   │   ├── oauth-helper.js        # OAuth 2.0 flow
│   │   ├── gaql-queries.js        # Query templates
│   │   ├── analysis.js            # Performance analysis
│   │   ├── validation.js          # Safety checks
│   │   ├── logger.js              # Logging utilities
│   │   └── weekly-report.js       # Report generation
│   └── prompts/
│       └── templates.js           # Claude prompts
├── netlify/functions/gasp/
│   ├── weekly-optimizer.js        # Scheduled function
│   ├── manual-trigger.js          # Manual trigger endpoint
│   └── dashboard.js               # Simple dashboard
├── config/
│   ├── campaigns.json             # Campaign mappings
│   └── negative-keywords.json     # Initial negative list
├── logs/
│   └── gasp-YYYY-MM-DD.json       # Daily logs
├── test-google-ads-connection.js  # Test script
├── test-claude-integration.js     # Test script
└── .env.local                     # Environment variables
```

---

## Environment Variables

Required in `.env.local` and Netlify:

```bash
# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_from_oauth
GOOGLE_ADS_CUSTOMER_ID=18371102793

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your-api-key

# GASP Configuration
GASP_API_KEY=random_32_char_string_for_manual_trigger
GASP_DASHBOARD_PASSWORD=your_dashboard_password

# Optional: Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK
EMAIL_NOTIFICATION_TO=your-email@example.com
```

---

## Cost Analysis

### Monthly Operating Costs

| Component | Cost | Notes |
|-----------|------|-------|
| Google Ads API | $0 | Free |
| Google Cloud | $0-5 | OAuth only (free tier) |
| Claude API | $15-30 | ~500k tokens/month |
| Netlify Functions | $0-10 | Within free tier |
| **Total** | **$15-45/month** | |

### ROI Calculation

```
If GASP improves CPA by 30%:

Before:
- Spend: $360/month
- Bookings: 2/month
- CPA: $180

After:
- Spend: $360/month  
- Bookings: 2.6/month
- CPA: $138

Result:
- Extra bookings: 0.6/month = $600 extra revenue
- GASP costs: $30/month
- Net gain: $570/month = $6,840/year

Payback: Immediate
```

---

## Key Features

### 1. Brand/Non-Brand Separation
**Why it matters:** Performance Max mixes them, skewing all metrics
- Brand campaign: $60/month, target 90% impression share
- Non-brand campaign: $300/month, high-intent keywords only
- Accurate CPA tracking for each

### 2. Weekly Negative Keyword Optimization
**Why it matters:** At $12/day budget, every wasted click hurts
- Claude identifies low-intent queries
- Adds 3-5 negative keywords per week
- Saves ~10-15% of budget from waste

### 3. Systematic Bid Adjustments
**Why it matters:** Manual bid management at scale is impossible
- Increases bids on converters
- Decreases bids on non-converters
- Stays within safety limits

### 4. Full Transparency
**Why it matters:** Performance Max is a black box
- See every search query
- See every optimization decision
- Understand what's working and why

### 5. Performance Comparison
**Why it matters:** Need proof GASP works better
- Weekly GASP vs Performance Max report
- Track CPA, conversions, ROAS
- Declare winner after 90 days

---

## Safety Features

### Validation Layer
- Keywords validated for length, format
- Match types checked (EXACT, PHRASE, BROAD only)
- Invalid recommendations filtered out

### Safety Limits
- Max 10 negative keywords per run
- Bid increases capped at +50%
- Bid decreases capped at -40%
- Minimum bid: $2.00
- Maximum bid: $25.00
- Budget changes capped at ±20%

### Error Handling
- Retry logic with exponential backoff
- Rate limiting (100ms between operations)
- Comprehensive error logging
- Failed mutations don't stop optimization

### Logging
- Every action logged to JSON file
- Daily log files (gasp-YYYY-MM-DD.json)
- Console logging for Netlify dashboard
- Audit trail for all changes

---

## Testing Strategy

### Unit Tests
```bash
npm test
```
- Validation logic
- Safety limits
- Performance calculations
- JSON parsing

### Integration Tests
```bash
npm run test:integration
```
- Full optimization cycle
- Google Ads API operations
- Claude analysis
- Mutation execution

### Manual Testing
```bash
# Test connection
node test-google-ads-connection.js

# Test Claude
node test-claude-integration.js

# Manual trigger
curl -X POST https://westside.style/.netlify/functions/gasp/manual-trigger \
  -H "x-api-key: YOUR_API_KEY"
```

---

## Monitoring

### Daily Health Check
Runs automatically, checks for:
- Campaign paused unexpectedly
- Budget exhausted too early
- Zero impressions/clicks
- API errors

### Weekly Report
Email/Slack report with:
- GASP vs Performance Max comparison
- Actions taken (negative keywords, bids)
- Week-over-week trends
- Top 3 recommendations

### Dashboard
Simple web dashboard at:
```
https://westside.style/.netlify/functions/gasp/dashboard?password=YOUR_PASSWORD
```

Shows:
- Current week metrics
- GASP vs Performance Max winner
- Recent optimization history
- Alerts and concerns

---

## Launch Checklist

### Pre-Launch (Week 0)
- [ ] GASP campaigns created in Google Ads
- [ ] Performance Max labeled "PMAX-Control"
- [ ] GASP campaigns labeled "GASP-Test"
- [ ] UTM tracking configured
- [ ] Conversion tracking verified

### Development (Week 1-3)
- [ ] Google Cloud project set up
- [ ] OAuth flow completed
- [ ] Google Ads API connection tested
- [ ] Claude integration tested
- [ ] Netlify functions deployed
- [ ] Environment variables set
- [ ] Manual trigger tested

### Launch (Week 4)
- [ ] Enable GASP campaigns
- [ ] Verify first optimization runs
- [ ] Monitor first week daily
- [ ] Check weekly report generated
- [ ] Compare to Performance Max

### Ongoing (Week 5-12)
- [ ] Weekly review of optimization decisions
- [ ] Monthly comparison GASP vs PMax
- [ ] Token usage monitoring
- [ ] Budget pacing check

### Decision Point (Week 13)
- [ ] Calculate final CPA comparison
- [ ] Determine winner (GASP or PMax)
- [ ] If GASP wins: pause PMax, scale GASP
- [ ] If PMax wins: use GASP insights, iterate

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install google-ads-api @anthropic-ai/sdk dotenv googleapis open

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Generate OAuth refresh token
node src/gasp/utils/oauth-helper.js

# 4. Test connections
node test-google-ads-connection.js
node test-claude-integration.js

# 5. Deploy to Netlify
netlify deploy --prod

# 6. Test manual trigger
curl -X POST https://westside.style/.netlify/functions/gasp/manual-trigger \
  -H "x-api-key: $(netlify env:get GASP_API_KEY)"

# 7. View logs
netlify logs:function gasp/weekly-optimizer

# 8. Check dashboard
open "https://westside.style/.netlify/functions/gasp/dashboard?password=$(netlify env:get GASP_DASHBOARD_PASSWORD)"
```

---

## Troubleshooting

### "Developer token not approved"
**Solution:** Use test account token during approval, or apply for production approval at https://ads.google.com/aw/apicenter

### "Refresh token expired"
**Solution:** Re-run `node src/gasp/utils/oauth-helper.js`

### "Claude returns invalid JSON"
**Solution:** Check prompt template, add JSON validation to parsing logic

### "Function timeout on Netlify"
**Solution:** Increase timeout in netlify.toml, or split operations into smaller chunks

### "No search terms data"
**Solution:** Campaigns might be new (< 7 days), or paused. Wait for data to accumulate.

---

## Next Steps

1. **Read Full Plan:** [GASP_TECHNICAL_IMPLEMENTATION_PLAN.md](GASP_TECHNICAL_IMPLEMENTATION_PLAN.md)
2. **Set Up Campaigns:** [GASP_WEEK0_SETUP_GUIDE.md](GASP_WEEK0_SETUP_GUIDE.md)
3. **Understand Budget:** [GASP_REALISTIC_BUDGET.md](GASP_REALISTIC_BUDGET.md)
4. **Review Strategy:** [CLAUDE_ADS_TECHNICAL_SPEC.md](CLAUDE_ADS_TECHNICAL_SPEC.md)

---

## Support Resources

- [Google Ads API Docs](https://developers.google.com/google-ads/api/docs/start)
- [Claude API Docs](https://docs.anthropic.com/)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [google-ads-api NPM](https://www.npmjs.com/package/google-ads-api)

---

**Document Version:** 1.0  
**Last Updated:** August 12, 2026

**Ready to build GASP?** Start with Phase 0 in the full implementation plan.
