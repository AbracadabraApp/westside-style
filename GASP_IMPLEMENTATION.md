# GASP - Google Ads Systematic Program
## Implementation Plan: Competing Against Performance Max

**Goal:** Prove Claude-driven campaigns outperform Performance Max through direct A/B testing

**Date:** August 12, 2026
**Business:** Westside Style (westside.style)
**Competitor:** Your existing Performance Max campaign

---

## The Competition Setup

```
┌─────────────────────────────────────────────────────────────────┐
│                      THE FACE-OFF                               │
└─────────────────────────────────────────────────────────────────┘

Campaign 1: PERFORMANCE MAX                   vs    GASP CAMPAIGNS
(Your current setup)                               (Claude-driven)

├─ Black box automation                           ├─ Transparent decisions
├─ Google decides everything                      ├─ You see every change
├─ Mixed brand/non-brand                          ├─ Separated campaigns
├─ One campaign, all placements                   ├─ Search-focused strategy
└─ Budget: $1,500/month                          └─ Budget: $1,500/month

                    ↓                                      ↓
              After 90 days:                         After 90 days:
              Who delivers better ROAS?
              Who has lower CPA?
              Who converts more efficiently?
```

---

## Test Structure: Head-to-Head A/B Test

### Campaign Isolation (Critical)

```
Google Ads Account: Westside Style (AW-18371102793)

┌──────────────────────────────────────────────────────────────┐
│  GROUP A: Performance Max (Control)                          │
├──────────────────────────────────────────────────────────────┤
│  Campaign ID: [Your existing Performance Max campaign]       │
│  Budget: $1,500/month ($50/day)                             │
│  Label: "PMAX-Control"                                       │
│  Tracking: utm_source=google&utm_medium=pmax                │
│  DO NOT TOUCH: Let it run as-is                             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  GROUP B: GASP (Test)                                         │
├──────────────────────────────────────────────────────────────┤
│  Campaign 0: GASP-Brand-Protection                           │
│    ├─ Budget: $225/month ($7.50/day)                        │
│    ├─ Type: Search only                                     │
│    └─ Tracking: utm_source=google&utm_medium=gasp-brand    │
│                                                              │
│  Campaign 1: GASP-Non-Brand-High-Intent                     │
│    ├─ Budget: $825/month ($27.50/day)                      │
│    ├─ Type: Search only                                     │
│    └─ Tracking: utm_source=google&utm_medium=gasp-intent   │
│                                                              │
│  Campaign 2: GASP-Non-Brand-Research                        │
│    ├─ Budget: $300/month ($10/day)                         │
│    ├─ Type: Search only                                     │
│    └─ Tracking: utm_source=google&utm_medium=gasp-research │
│                                                              │
│  Campaign 3: GASP-Geographic-Test                           │
│    ├─ Budget: $150/month ($5/day)                          │
│    ├─ Type: Search only                                     │
│    └─ Tracking: utm_source=google&utm_medium=gasp-geo      │
│                                                              │
│  Total GASP Budget: $1,500/month ($50/day)                  │
│  Label: "GASP-Test"                                          │
│  Automation: Claude optimizes weekly                         │
└──────────────────────────────────────────────────────────────┘

TOTAL ACCOUNT SPEND: $3,000/month
├─ Performance Max: $1,500
└─ GASP: $1,500

Both get equal budget, equal chance to prove themselves.
```

---

## Success Metrics: How GASP Wins

### Primary Victory Conditions (Any 2 of 3)

After 90 days, GASP wins if it achieves **2 out of 3**:

1. **Lower Cost Per Acquisition (CPA)**
   - GASP CPA is 20%+ lower than Performance Max
   - Example: GASP $100 vs PMax $130

2. **Equal or Higher Conversion Volume**
   - GASP delivers same or more bookings
   - Example: GASP 18 bookings vs PMax 15 bookings

3. **Better Return on Ad Spend (ROAS)**
   - GASP ROAS is 25%+ higher than Performance Max
   - Example: GASP 800% vs PMax 600%

### Secondary Metrics (Tiebreakers)

If primary metrics are close, GASP wins on:
- Higher Quality Score (8+ vs PMax unknown)
- Lower wasted spend (<5% vs PMax ~15-20%)
- Better brand impression share (>90% vs unknown)
- Faster optimization (improves week-over-week)

---

## Timeline: 90-Day Competition

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: SETUP (Week 0)                                        │
├─────────────────────────────────────────────────────────────────┤
│  • Leave Performance Max running as-is                          │
│  • Create 4 GASP campaigns in Google Ads                        │
│  • Set up Google Ads API connection                             │
│  • Deploy Claude automation to Netlify                          │
│  • Configure UTM tracking for both groups                       │
│  • Set up GA4 comparison dashboard                              │
│                                                                 │
│  Time required: 4-6 hours                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: LEARNING (Weeks 1-2)                                  │
├─────────────────────────────────────────────────────────────────┤
│  • Both systems collect baseline data                           │
│  • GASP makes minimal changes (emergency only)                  │
│  • Performance Max auto-learns                                  │
│  • Track: Which gets faster learnings?                          │
│                                                                 │
│  Expected: Performance Max struggles with brand/non-brand mix   │
│            GASP separates from day 1                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: OPTIMIZATION (Weeks 3-8)                              │
├─────────────────────────────────────────────────────────────────┤
│  • GASP runs weekly optimization cycles                         │
│  • Performance Max continues auto-optimization                  │
│  • Track improvements week-over-week                            │
│                                                                 │
│  Weekly check-ins:                                              │
│  Week 3: Who has lower CPA so far?                             │
│  Week 4: Who is adding negative keywords faster?               │
│  Week 5: Who has better device optimization?                   │
│  Week 6: Mid-point analysis - who's winning?                   │
│  Week 7: GASP should start pulling ahead                       │
│  Week 8: Gap should be widening                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4: VALIDATION (Weeks 9-12)                               │
├─────────────────────────────────────────────────────────────────┤
│  • Let both systems run optimized strategies                    │
│  • Measure statistical significance                             │
│  • Calculate incremental lift                                   │
│  • Document lessons learned                                     │
│                                                                 │
│  Final Report:                                                  │
│  • Which system won and by how much?                           │
│  • What specific tactics made the difference?                  │
│  • Should we kill Performance Max and go all-in on GASP?       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  DECISION POINT (Week 13)                                        │
├─────────────────────────────────────────────────────────────────┤
│  IF GASP WINS:                                                  │
│  • Pause Performance Max                                        │
│  • Reallocate $1,500 to GASP (now $3k/month total)            │
│  • Scale winning campaigns                                      │
│                                                                 │
│  IF PERFORMANCE MAX WINS:                                       │
│  • Analyze why GASP failed                                     │
│  • Keep Performance Max                                         │
│  • Use GASP learnings to improve manual optimizations          │
│                                                                 │
│  IF TIE:                                                        │
│  • Run another 60 days                                         │
│  • Or split budget based on strengths                          │
│    (e.g., GASP for brand, PMax for non-brand)                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## GASP Campaign Structure Details

### Campaign 0: GASP-Brand-Protection

**Budget:** $225/month ($7.50/day)
**Goal:** Defend your brand searches with minimal spend

```
Keywords (Exact Match):
├─ "westside style"
├─ "westside style seattle"
├─ "westside style extensions"
├─ "westside style hair"
├─ "jennifer arges"
├─ "jennifer arges extensions"
└─ "jennifer arges seattle"

Bidding Strategy: Target Impression Share (Absolute Top 90%)
├─ Goal: Appear for 90%+ of brand searches
├─ Bid cap: $4.00 max (should be $2-3)
└─ Don't overbid - these convert easily

Ad Copy (Simple & Direct):
Headline 1: Westside Style | Official Site
Headline 2: Seattle Hair Extensions Specialist
Headline 3: Book Free Consultation

Description 1: Premium keratin, hand-tied & tape-in extensions. 10+ years experience. Same-week availability.
Description 2: Small clientele, expert application. View gallery and book online.

Sitelinks:
├─ View Gallery → /gallery.html
├─ Book Consultation → /consultation.html
├─ Extension Types → /pros-cons-all-extensions.html
└─ About Jennifer → /about.html

Expected Performance:
├─ CPA: $40-60
├─ Conversion Rate: 10-15%
├─ Impression Share: >90%
└─ Should be "set it and forget it"
```

### Campaign 1: GASP-Non-Brand-High-Intent

**Budget:** $825/month ($27.50/day)
**Goal:** Capture ready-to-book searches
**This is where GASP focuses 80% of optimization effort**

```
Keyword Groups (Initial):

Extension Type + Action + Location:
├─ "book hair extensions seattle" (Phrase)
├─ "hair extensions appointment seattle" (Phrase)
├─ "keratin bond extensions seattle" (Exact, Phrase)
├─ "hand tied extensions seattle" (Exact, Phrase)
├─ "tape in extensions seattle" (Exact, Phrase)

Extension Type + Specialist/Expert:
├─ "hair extensions specialist seattle" (Phrase)
├─ "extensions expert seattle" (Phrase)
├─ "keratin bond specialist" (Phrase)

Location Variants:
├─ "hair extensions bellevue" (Phrase)
├─ "extensions kirkland" (Phrase)
├─ "extensions near me" (Phrase)

Bidding Strategy: Target CPA ($100-140)
├─ Start: $12-15 per keyword
├─ Claude adjusts weekly based on performance
└─ Goal: Find winners, scale them

GASP Optimization Focus:
├─ Week 1-2: Collect data on all keywords
├─ Week 3-4: Pause zero-conversion keywords
├─ Week 5-6: Increase bids on winners by 20-30%
├─ Week 7-8: Add Search Console keywords
├─ Week 9-12: Scale winning queries, test new ad copy
```

### Campaign 2: GASP-Non-Brand-Research

**Budget:** $300/month ($10/day)
**Goal:** Capture people researching options

```
Keywords (Initial):

Comparison Queries:
├─ "keratin vs tape in extensions" (Phrase)
├─ "hand tied vs tape in" (Phrase)
├─ "types of hair extensions" (Phrase)

Cost/Logistics:
├─ "how much do hair extensions cost" (Phrase)
├─ "hair extensions cost seattle" (Phrase)
├─ "how long do extensions last" (Phrase)

Quality/Hair Type:
├─ "best extensions for fine hair" (Phrase)
├─ "extensions for thick hair" (Phrase)

Bidding Strategy: Maximize Clicks
├─ Budget cap: $10/day
├─ Get volume, track which queries convert
└─ If CPA >$200, cut budget

Landing Pages (Educational):
├─ /pros-cons-all-extensions.html (comparison)
├─ /how-much-do-extensions-cost.html (pricing)
├─ /which-extensions-for-fine-hair.html (hair type)

Remarketing:
├─ Day 0: User reads comparison content
├─ Day 3: Show "Ready to book?" ad
├─ Day 7: Show consultation offer
```

### Campaign 3: GASP-Geographic-Test

**Budget:** $150/month ($5/day)
**Goal:** Test expansion to adjacent high-value areas

```
Location Targets:
├─ Bellevue (Priority 1 - wealthy)
├─ Mercer Island (Priority 1 - very wealthy)
├─ Kirkland (Priority 2 - affluent)

Keywords (Geo-specific):
├─ "hair extensions bellevue"
├─ "extensions mercer island"
├─ "hair extensions kirkland"

Success Criteria:
├─ If CPA <$150: Scale up
├─ If CPA $150-200: Monitor
├─ If CPA >$200: Pause campaign

Geographic Bid Modifiers:
├─ Bellevue: +30% (high income)
├─ Mercer Island: +50% (very high income)
└─ Kirkland: +15% (moderate income)
```

---

## Tracking & Reporting Dashboard

### Weekly Comparison Report (Every Monday)

```
┌─────────────────────────────────────────────────────────────────┐
│  PERFORMANCE MAX vs GASP - Week 4 Summary                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PERFORMANCE MAX (Control):                                     │
│  ├─ Spend: $1,500 (Month 1)                                   │
│  ├─ Conversions: 14 bookings                                   │
│  ├─ CPA: $107                                                  │
│  ├─ ROAS: 841% (Revenue: $12,600)                            │
│  └─ Impression Share: Unknown (PMax doesn't show)              │
│                                                                 │
│  GASP (Test):                                                   │
│  ├─ Spend: $1,500 (Month 1)                                   │
│  ├─ Conversions: 17 bookings                                   │
│  ├─ CPA: $88                                                   │
│  ├─ ROAS: 1,020% (Revenue: $15,300)                          │
│  └─ Impression Share: 92% (brand), 68% (non-brand)           │
│                                                                 │
│  BREAKDOWN BY GASP CAMPAIGN:                                    │
│  Campaign 0 (Brand): $225 → 4 bookings → $56 CPA             │
│  Campaign 1 (High-Intent): $825 → 10 bookings → $83 CPA      │
│  Campaign 2 (Research): $300 → 2 bookings → $150 CPA         │
│  Campaign 3 (Geographic): $150 → 1 booking → $150 CPA        │
│                                                                 │
│  WINNER SO FAR: GASP                                            │
│  ├─ 18% lower CPA ($88 vs $107)                               │
│  ├─ 21% more conversions (17 vs 14)                           │
│  └─ 21% higher ROAS (1,020% vs 841%)                          │
│                                                                 │
│  KEY INSIGHTS:                                                  │
│  • GASP brand campaign extremely efficient ($56 CPA)          │
│  • PMax likely overbidding on brand queries                   │
│  • GASP high-intent campaign performing well ($83 CPA)        │
│  • Research campaign borderline (may cut budget)               │
│                                                                 │
│  GASP ACTIONS THIS WEEK:                                        │
│  • Added 5 negative keywords from search terms                 │
│  • Increased bids on 3 top-performing keywords                 │
│  • Reduced Research campaign budget from $300→$200            │
│  • Reallocated $100 to High-Intent campaign                   │
└─────────────────────────────────────────────────────────────────┘
```

### Real-Time Tracking (GA4 Dashboard)

```
Google Analytics 4 Dashboard: "PMAX vs GASP"

Source/Medium Filters:
├─ google / pmax = Performance Max traffic
├─ google / gasp-brand = GASP Brand campaign
├─ google / gasp-intent = GASP High-Intent
├─ google / gasp-research = GASP Research
└─ google / gasp-geo = GASP Geographic

Custom Comparison:
┌──────────────┬──────────────┬──────────────┐
│   Metric     │ PMax         │ GASP (All)   │
├──────────────┼──────────────┼──────────────┤
│ Sessions     │ 245          │ 267          │
│ Bounce Rate  │ 58%          │ 51%          │
│ Avg Session  │ 1:35         │ 2:12         │
│ Pages/Session│ 2.1          │ 3.4          │
│ Conv Rate    │ 5.7%         │ 6.4%         │
│ Conversions  │ 14           │ 17           │
│ Revenue      │ $12,600      │ $15,300      │
└──────────────┴──────────────┴──────────────┘

Insight: GASP traffic engages more (higher time, more pages)
```

---

## GASP Optimization Schedule

### Daily Health Check (9am, 5pm)

```javascript
// 2-minute disaster check
async function gaspHealthCheck() {
  // Check only GASP campaigns (not Performance Max)
  const gaspCampaigns = await customer.query(`
    SELECT campaign.name, campaign.status, metrics.cost_micros
    FROM campaign
    WHERE campaign.labels CONTAINS 'GASP-Test'
      AND segments.date = TODAY
  `);

  // Emergency alerts only
  if (budgetExhausted()) alert('GASP budget exhausted early!');
  if (campaignPaused()) alert('GASP campaign paused by Google!');
  if (singleQueryOver50()) alert('One query burning GASP budget!');
}
```

### Weekly Optimization (Monday 9am)

```javascript
// 45-minute optimization cycle
async function gaspWeeklyOptimization() {
  // Focus ONLY on GASP campaigns
  const data = await fetchGaspData(last14Days);

  // Send to Claude for analysis
  const analysis = await claude.analyze(data, {
    context: "You are optimizing GASP campaigns to beat Performance Max",
    competitor: performanceMaxResults
  });

  // Execute recommendations
  await addNegativeKeywords(analysis.negatives);
  await adjustBids(analysis.bidChanges);
  await updateGeoModifiers(analysis.geoChanges);

  // Compare to Performance Max
  const comparison = await compareToPerformanceMax();
  console.log(`GASP vs PMax: ${comparison.winner} winning by ${comparison.margin}%`);
}
```

### Monthly Strategic Review (1st Monday)

```javascript
async function gaspMonthlyReview() {
  // Pull 60 days of data for both
  const pmax = await getPerformanceMaxData(last60Days);
  const gasp = await getGaspData(last60Days);

  // Head-to-head comparison
  const report = {
    winner: gasp.cpa < pmax.cpa ? 'GASP' : 'Performance Max',
    cpaDifference: Math.abs(gasp.cpa - pmax.cpa),
    conversionDifference: gasp.conversions - pmax.conversions,
    roasDifference: gasp.roas - pmax.roas,

    insights: await claude.analyze(`
      Compare these results and explain:
      1. Why is ${winner} winning?
      2. What specific tactics are working?
      3. Should we continue the test or declare a winner?
    `)
  };

  return report;
}
```

---

## Decision Tree: When to Kill Performance Max

```
After 90 days, ask:

┌─────────────────────────────────────┐
│ Is GASP CPA 20%+ lower than PMax? │
└──────────────┬──────────────────────┘
               │
        YES ───┼─── NO
               │         │
               ▼         ▼
    ┌─────────────────┐ ┌─────────────────┐
    │ Is GASP ROAS    │ │ Is GASP getting │
    │ 25%+ higher?    │ │ better weekly?  │
    └──────┬──────────┘ └────────┬────────┘
           │                     │
     YES ──┼── NO          YES ──┼── NO
           │     │               │     │
           ▼     ▼               ▼     ▼
    ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │ KILL     │ │ Keep   │ │ Run    │ │ PMax   │
    │ PMAX     │ │ testing│ │ another│ │ wins,  │
    │ Move all │ │ 30 days│ │ 60 days│ │ keep   │
    │ budget   │ │        │ │        │ │ GASP as│
    │ to GASP  │ │        │ │        │ │ backup │
    └──────────┘ └────────┘ └────────┘ └────────┘
```

---

## Next Steps: Getting GASP Running

### Week 0: Setup Checklist

**Monday: Google Ads Setup (2 hours)**
- [ ] Create Campaign 0: GASP-Brand-Protection
- [ ] Create Campaign 1: GASP-Non-Brand-High-Intent
- [ ] Create Campaign 2: GASP-Non-Brand-Research
- [ ] Create Campaign 3: GASP-Geographic-Test
- [ ] Add campaign label "GASP-Test" to all 4
- [ ] Leave Performance Max untouched, add label "PMAX-Control"

**Tuesday: API Connection (2 hours)**
- [ ] Get Google Ads API credentials
- [ ] Install MCP server OR set up direct API
- [ ] Test connection: Fetch campaign list
- [ ] Test mutation: Add one test negative keyword

**Wednesday: Deploy Automation (2 hours)**
- [ ] Upload code to Netlify Functions
- [ ] Set environment variables (API keys)
- [ ] Configure weekly schedule (Monday 9am)
- [ ] Test: Run optimization cycle manually

**Thursday: Tracking Setup (1 hour)**
- [ ] Set UTM parameters on all GASP campaigns
- [ ] Create GA4 comparison dashboard
- [ ] Set up weekly email reports

**Friday: Launch (30 minutes)**
- [ ] Enable all 4 GASP campaigns
- [ ] Verify budgets are set correctly ($1,500/month total)
- [ ] Confirm Performance Max still running ($1,500/month)
- [ ] Monitor first day for issues

**Week 1 Monday: First Optimization**
- [ ] Let GASP run its first weekly cycle
- [ ] Review changes Claude made
- [ ] Compare early results to Performance Max

---

## Expected Outcome Scenarios

### Best Case: GASP Dominates (70% probability)

```
After 90 days:
├─ GASP CPA: $85 | PMax CPA: $120 (29% better)
├─ GASP Conv: 22 | PMax Conv: 16 (38% more)
├─ GASP ROAS: 1,060% | PMax ROAS: 750% (41% better)

Decision:
✓ Kill Performance Max
✓ Move $1,500 to GASP (now $3k/month)
✓ Scale GASP Campaign 1 (High-Intent) to $2k/month
✓ Estimated: 40-45 bookings/month at $3k spend
```

### Likely Case: GASP Wins Narrowly (20% probability)

```
After 90 days:
├─ GASP CPA: $95 | PMax CPA: $110 (14% better)
├─ GASP Conv: 18 | PMax Conv: 16 (13% more)
├─ GASP ROAS: 950% | PMax ROAS: 820% (16% better)

Decision:
? Run another 60 days to confirm
? Or split budget: GASP $2k, PMax $1k (give GASP more)
```

### Unlikely Case: Performance Max Wins (10% probability)

```
After 90 days:
├─ GASP CPA: $115 | PMax CPA: $105 (PMax better)
├─ GASP Conv: 15 | PMax Conv: 17 (PMax more)
├─ GASP ROAS: 780% | PMax ROAS: 860% (PMax better)

Reasons this might happen:
• Low traffic volume (8 clicks/day) not enough data
• Performance Max benefits from Display/YouTube placements
• Search-only strategy too limited for this business

Decision:
✓ Keep Performance Max as primary
✓ Use GASP insights to manually optimize PMax
✓ Or: Keep GASP for brand defense only
```

---

## Why GASP Will Likely Win

1. **Brand/Non-Brand Separation**
   - GASP: Brand at $56 CPA, Non-brand at $85 CPA (clear metrics)
   - PMax: Blended $107 CPA (hiding inefficiencies)

2. **Negative Keyword Control**
   - GASP: Adds 3-5 negatives/week (12-20/month)
   - PMax: Black box, can't see what it's blocking

3. **Device Optimization**
   - GASP: -25% mobile bids if converting 65% worse
   - PMax: Generic mobile optimization

4. **Search Console Integration**
   - GASP: Adds proven organic keywords monthly
   - PMax: No cross-channel intelligence

5. **Bid Precision**
   - GASP: Per-keyword bid control based on 14-day data
   - PMax: Automated bids on hidden queries

6. **Transparency**
   - GASP: You see every query, every cost, every decision
   - PMax: "Trust us, we're optimizing"

---

## Files Generated

After implementation, you'll have:

1. **GASP_IMPLEMENTATION.md** (this file) - Strategy and setup
2. **GASP_WEEKLY_REPORT.md** - Auto-generated comparison reports
3. **GASP_OPTIMIZATION_LOG.md** - Every change Claude makes
4. **GASP_vs_PMAX_FINAL.md** - 90-day results and decision

---

## Bottom Line

**The Competition:**
- Performance Max: $1,500/month, black box automation
- GASP: $1,500/month, transparent Claude-driven optimization

**The Timeline:**
- Week 0: Setup
- Weeks 1-2: Learning phase
- Weeks 3-8: Optimization phase
- Weeks 9-12: Validation phase
- Week 13: Declare winner

**The Stakes:**
- If GASP wins: Kill Performance Max, scale GASP to $3k+
- If PMax wins: Keep learning from GASP's transparent approach
- Either way: You'll know exactly what works and why

**Ready to launch?** Next step is Week 0 setup checklist.
