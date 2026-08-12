# GASP Week 0 Setup Guide
## Manual Walkthrough: $360/month Budget Version

**Time Required:** 2-3 hours total
**Current Budget:** Performance Max $360/month
**New Test Budget:** GASP $360/month + Performance Max $360/month = $720/month

---

## Setup Checklist Overview

```
☐ Day 1 (Monday): Create 2 GASP campaigns in Google Ads (60 min)
☐ Day 2 (Tuesday): Add tracking UTM parameters (20 min)
☐ Day 3 (Wednesday): Set up negative keyword foundation (30 min)
☐ Day 4 (Thursday): Configure conversion tracking (20 min)
☐ Day 5 (Friday): Launch and monitor first day (30 min)
☐ Day 6-7 (Weekend): Let run, check for issues (10 min)
```

---

## Day 1: Create GASP Campaigns (60 minutes)

### Step 1: Log into Google Ads

```
1. Go to: ads.google.com
2. Select account: AW-18371102793 (Westside Style)
3. Click "Campaigns" in left menu
```

### Step 2: Label Your Existing Performance Max Campaign

**Before creating new campaigns, label what you have:**

```
1. Find your existing Performance Max campaign
2. Click on it
3. Click "Labels" dropdown
4. Create new label: "PMAX-Control"
5. Apply label
6. This lets us track it separately in reports
```

### Step 3: Create Campaign 0: GASP-Brand-Defense

**Start Campaign Creation:**

```
1. Click blue "+ New Campaign" button
2. Goal: "Website traffic" or "Leads"
3. Campaign type: "Search"
4. Click "Continue"
```

**Campaign Settings:**

```
Campaign name: GASP-Brand-Defense

Networks:
☑ Search Network
☐ Search Partners (uncheck this)
☐ Display Network (uncheck this)

Locations:
☑ United States
  └─ Enter locations: Seattle, WA
  └─ Target: People in or regularly in your targeted locations

Languages: English

Budget and bidding:
├─ Budget: $2.00 per day
├─ Bidding: Target impression share
├─ Target: Absolute top of page
├─ Percent impressions: 90%
└─ Maximum CPC bid limit: $3.00

Ad schedule:
└─ All days, all hours (default)

Start date: Today
End date: None
```

**Create Ad Group:**

```
Ad group name: Brand Terms

Keywords (5 total - EXACT MATCH ONLY):
[westside style]
[westside style seattle]
[westside style extensions]
[jennifer arges]
[jennifer arges seattle]

NOTE: The brackets [ ] mean exact match. Type them exactly like this.
```

**Create Ad:**

```
Final URL: https://westside.style/

Responsive Search Ad:

Headlines (add all 3):
H1: Westside Style | Official Site
H2: Seattle Extensions Specialist
H3: Book Free Consultation

Descriptions (add both):
D1: Keratin, hand-tied, tape-in extensions. 10+ years experience. Small focused clientele.
D2: Same-week availability. View gallery and book online. Call or text 206-295-4549.

Display path (optional):
Path 1: Seattle
Path 2: Extensions
```

**Add Sitelinks:**

```
Click "Show more" → Sitelinks

Sitelink 1:
├─ Text: View Gallery
├─ Description 1: See before and after transformations
├─ Description 2: Real client results
└─ URL: https://westside.style/gallery.html

Sitelink 2:
├─ Text: Book Consultation
├─ Description 1: Free consultation for new clients
├─ Description 2: Online booking or call
└─ URL: https://westside.style/consultation.html

Sitelink 3:
├─ Text: About Jennifer
├─ Description 1: 10+ years extensions experience
├─ Description 2: Small focused clientele
└─ URL: https://westside.style/about.html

Sitelink 4:
├─ Text: Extension Types
├─ Description 1: Compare keratin, hand-tied, tape-in
├─ Description 2: Find your best option
└─ URL: https://westside.style/pros-cons-all-extensions.html
```

**Add Campaign Label:**

```
Before saving:
1. Click "Settings" tab
2. Click "Labels"
3. Create new label: "GASP-Test"
4. Apply to this campaign
```

**Save Campaign:**

```
Click "Save and continue"
Campaign 0 is now created but PAUSED
Don't enable yet - we'll launch all together on Friday
```

---

### Step 4: Create Campaign 1: GASP-Non-Brand-Focused

**Start New Campaign:**

```
1. Click "+ New Campaign" button
2. Goal: "Website traffic" or "Leads"
3. Campaign type: "Search"
4. Click "Continue"
```

**Campaign Settings:**

```
Campaign name: GASP-Non-Brand-Focused

Networks:
☑ Search Network
☐ Search Partners (uncheck)
☐ Display Network (uncheck)

Locations:
☑ Seattle, WA
☑ Bellevue, WA
☑ Kirkland, WA
☑ Mercer Island, WA
Target: People in or regularly in your targeted locations

Languages: English

Budget and bidding:
├─ Budget: $10.00 per day
├─ Bidding: Manual CPC
└─ Enable Enhanced CPC: ☑ (check this)

Ad schedule:
└─ All days, all hours (we'll optimize this later)

Start date: Today
End date: None
```

**Create Ad Group 1: Hair Extensions General**

```
Ad group name: Hair Extensions General

Keywords (5 keywords):
[hair extensions seattle]           - Bid: $12.00
[hair extensions specialist seattle] - Bid: $11.00
"hair extensions bellevue"          - Bid: $11.00
"hair extensions kirkland"          - Bid: $10.00
"extensions near me"                - Bid: $10.00

NOTE:
[brackets] = exact match
"quotes" = phrase match
```

**Create Ad Group 2: Keratin Extensions**

```
Ad group name: Keratin Extensions

Keywords (3 keywords):
[keratin extensions seattle]        - Bid: $12.00
[keratin bond seattle]              - Bid: $11.00
"keratin tips extensions"           - Bid: $10.00
```

**Create Ad Group 3: Hand Tied Extensions**

```
Ad group name: Hand Tied Extensions

Keywords (2 keywords):
[hand tied extensions seattle]      - Bid: $12.00
"hand tied seattle"                 - Bid: $10.00
```

**Create Ads (Create one for each ad group):**

For Hair Extensions General ad group:

```
Final URL: https://westside.style/

Responsive Search Ad:

Headlines:
H1: Hair Extensions Seattle
H2: Keratin, Hand-Tied, Tape-In
H3: 10+ Years Experience
H4: Same-Week Appointments
H5: Seattle Extensions Specialist

Descriptions:
D1: Expert installation. Small focused clientele. Natural results that last.
D2: Premium keratin, hand-tied, and tape-in extensions. Book free consultation.
D3: View gallery online. Same-week availability. Call or text 206-295-4549.

Display path:
Path 1: Seattle
Path 2: Extensions
```

For Keratin Extensions ad group:

```
Final URL: https://westside.style/keratin-bond-seattle.html

Responsive Search Ad:

Headlines:
H1: Keratin Bond Extensions Seattle
H2: Individual Strand Fusion
H3: Natural Movement & Longevity
H4: 10+ Years Experience
H5: Seattle Keratin Specialist

Descriptions:
D1: Premium keratin tips for the most natural movement. Long-lasting results.
D2: Expert installation. Small clientele. View before/after gallery online.
D3: Same-week appointments. Free consultation. Call or text 206-295-4549.

Display path:
Path 1: Seattle
Path 2: Keratin-Bond
```

For Hand Tied Extensions ad group:

```
Final URL: https://westside.style/hand-tied-seattle.html

Responsive Search Ad:

Headlines:
H1: Hand Tied Extensions Seattle
H2: Flat Micro-Beaded Rows
H3: Ideal for Fine Hair
H4: Natural Seamless Results
H5: Seattle Hand Tied Specialist

Descriptions:
D1: Wefts sewn onto micro-beaded rows. Incredibly flat and comfortable.
D2: Perfect for fine to medium hair. View results and pricing online.
D3: 10+ years experience. Same-week availability. Book free consultation.

Display path:
Path 1: Seattle
Path 2: Hand-Tied
```

**Add Campaign Label:**

```
Before saving:
1. Click "Settings" tab
2. Click "Labels"
3. Select "GASP-Test" label (you created this for Campaign 0)
4. Apply to this campaign
```

**Save Campaign:**

```
Click "Save and continue"
Campaign 1 is now created but PAUSED
```

---

## Day 2: Add Tracking UTM Parameters (20 minutes)

### Why UTM Parameters Matter

```
UTM parameters let you track:
├─ Which campaign drove each booking
├─ Compare Performance Max vs GASP in GA4
└─ Calculate exact CPA per campaign

Without them, all traffic looks the same in analytics.
```

### Step 1: Add UTM to GASP-Brand-Defense

```
1. Go to Campaigns → GASP-Brand-Defense
2. Click "Settings"
3. Scroll to "Campaign URL options"
4. Click "Show more"
5. In "Final URL suffix" field, enter:
   ?utm_source=google&utm_medium=gasp-brand&utm_campaign={campaignid}

6. Click "Save"
```

### Step 2: Add UTM to GASP-Non-Brand-Focused

```
1. Go to Campaigns → GASP-Non-Brand-Focused
2. Click "Settings"
3. Campaign URL options → Show more
4. Final URL suffix:
   ?utm_source=google&utm_medium=gasp-nonbrand&utm_campaign={campaignid}

5. Click "Save"
```

### Step 3: Add UTM to Performance Max (if not already)

```
1. Find your Performance Max campaign
2. Settings → Campaign URL options
3. Final URL suffix:
   ?utm_source=google&utm_medium=pmax&utm_campaign={campaignid}

4. Click "Save"
```

### Step 4: Verify in GA4

```
1. Go to analytics.google.com
2. Reports → Acquisition → Traffic acquisition
3. Add secondary dimension: "Session medium"
4. You should see (after campaigns launch):
   ├─ google / gasp-brand
   ├─ google / gasp-nonbrand
   └─ google / pmax
```

---

## Day 3: Set Up Negative Keywords Foundation (30 minutes)

### Why Start with Negatives

```
At $360/month budget, you can't waste ANY clicks.
Add obvious negatives BEFORE launching to prevent waste.
```

### Create Negative Keyword List

```
1. In Google Ads, click "Tools & Settings" (wrench icon)
2. Under "Shared library" → Click "Negative keyword lists"
3. Click blue "+" button
4. Name: "GASP - Waste Queries"
```

### Add Initial Negative Keywords (Phrase Match)

```
Add these to your list:

Low Intent / Wrong Service:
"cheap"
"diy"
"free"
"temporary"
"clip in"
"near me cheap"
"wholesale"
"supplies"
"kit"

Wrong Audience:
"salon for sale"
"hair salon jobs"
"hair stylist jobs"
"cosmetology school"
"training"
"certification"

Informational (Not Buying):
"how to apply"
"how to remove"
"tutorial"
"youtube"

Competitors (Don't waste budget on their brand):
"great lengths"
"bellami"
[Add competitor brand names here]

Note: Add as PHRASE MATCH (don't select exact match)
This blocks variations automatically.
```

### Apply List to GASP Campaigns

```
1. Still in Negative keyword lists
2. Find "GASP - Waste Queries" list
3. Click "Apply to campaigns"
4. Select:
   ☑ GASP-Brand-Defense
   ☑ GASP-Non-Brand-Focused
5. Click "Apply"

Leave Performance Max alone (don't apply to it)
We want pure comparison.
```

---

## Day 4: Configure Conversion Tracking (20 minutes)

### Check Existing Conversion Actions

```
1. Tools & Settings → Conversions
2. Check what's already tracking
3. You should see:
   ├─ Form submissions (consultation form)
   ├─ Phone calls (if set up)
   └─ Maybe: Submit lead form event from GA4
```

### If Conversion Tracking Exists (Most Likely)

```
You're good! Just verify:

1. Click on each conversion action
2. Check "Include in Conversions" = Yes
3. Check "Attribution model" = Data-driven or Last click
4. No action needed - you're already tracking

Move to next step.
```

### If NO Conversion Tracking (Need to Set Up)

```
This is more complex. You have 2 options:

Option A: Track form submissions via Google Tag Manager
├─ Requires GTM setup (30-60 min)
├─ Track clicks on consultation form submit button
└─ Outside scope of this guide - see Google Ads Help

Option B: Import GA4 events as conversions (Easier)
├─ In Google Ads: Tools → Conversions
├─ Click "+ New conversion action"
├─ Select "Import" → From "Google Analytics 4"
├─ Select events: form_submit, generate_lead, etc.
├─ Import them
└─ These will now track as conversions in Google Ads

Recommended: Option B if you have GA4 already tracking form submits.
```

---

## Day 5: Launch and Monitor (30 minutes)

### Pre-Launch Checklist

```
☐ GASP-Brand-Defense created, labeled "GASP-Test"
☐ GASP-Non-Brand-Focused created, labeled "GASP-Test"
☐ UTM parameters added to both GASP campaigns
☐ Negative keyword list applied to both GASP campaigns
☐ Conversion tracking verified
☐ Performance Max labeled "PMAX-Control"
☐ Performance Max still running at $12/day

Total daily budget check:
├─ GASP-Brand: $2/day
├─ GASP-Non-Brand: $10/day
├─ Performance Max: $12/day
└─ Total: $24/day = $720/month ✓
```

### Launch GASP Campaigns

```
1. Go to Campaigns view
2. Find GASP-Brand-Defense (Status: Paused)
3. Click the toggle to Enable
4. Find GASP-Non-Brand-Focused (Status: Paused)
5. Click the toggle to Enable

Both should now show "Eligible" status.
```

### First Hour Monitoring

```
After 60 minutes, check:

1. Campaigns → GASP-Brand-Defense
   └─ Status should be "Eligible" not "Learning" or "Paused"

2. Campaigns → GASP-Non-Brand-Focused
   └─ Status should be "Eligible"

3. Check for any policy violations:
   └─ If any ads say "Under review" that's normal (takes 24hrs)
   └─ If any ads say "Disapproved" - click to see reason and fix

4. First impressions should appear within 1-2 hours
   └─ Refresh the page to see impression counts
```

### First Day Monitoring (Check at 5pm)

```
By end of Day 1, you should see:

GASP-Brand-Defense:
├─ Impressions: 5-20 (low search volume for brand terms)
├─ Clicks: 0-2
├─ Spend: $0-6
└─ This is normal - brand searches are rare

GASP-Non-Brand-Focused:
├─ Impressions: 50-200
├─ Clicks: 2-5
├─ Spend: $10-20 (might spend more than daily budget on day 1)
└─ This is normal - Google tests on launch day

Performance Max:
├─ Should be running as usual
└─ No changes

If you see NO impressions after 4 hours:
├─ Check campaign status (enabled?)
├─ Check ad approval status
└─ Check if bids are too low (unlikely at $10-12)
```

---

## Day 6-7: Weekend Monitoring (10 minutes)

### Saturday Morning Check

```
1. Go to Google Ads
2. Change date range to "Yesterday"
3. View GASP campaigns:

GASP-Brand-Defense (Friday):
├─ Expected: 0-2 clicks, $0-8 spend
└─ If 0 clicks, that's NORMAL (low brand search volume)

GASP-Non-Brand-Focused (Friday):
├─ Expected: 2-6 clicks, $15-30 spend
└─ If 0 clicks, check if ads are approved

Performance Max (Friday):
├─ Should show usual performance
└─ Compare later in week 1
```

### Issues to Watch For

```
RED FLAG: Campaign spent $50+ on day 1
└─ Action: Lower bids by 30%
└─ Check for runaway keyword

RED FLAG: All ads "Disapproved"
└─ Action: Read disapproval reason
└─ Usually: Capitalization, trademark, or landing page issue
└─ Fix and resubmit

GREEN LIGHT: 3-8 clicks across both GASP campaigns
└─ This is perfect for $12/day budget
└─ Let run for Week 1, collect data
```

---

## Week 1: Let Run and Monitor

### Daily Quick Check (2 minutes)

```
Every morning for Week 1:

1. Check total spend yesterday:
   ├─ GASP total: Should be ~$12/day
   └─ If over $18, lower some bids

2. Check for new search terms:
   └─ Click "Search terms" in left menu
   └─ Filter to GASP campaigns only
   └─ Look for obvious waste queries
   └─ Add to negative keyword list

3. Check conversion tracking:
   └─ If you get a booking, does it show in Google Ads?
   └─ If not, check GA4 connection
```

### Week 1 Goals

```
DON'T optimize yet. Just collect data.

By end of Week 1, you should have:
├─ 15-25 clicks on GASP-Non-Brand
├─ 2-5 clicks on GASP-Brand
├─ 0-1 conversions (maybe none, that's OK)
├─ List of 5-10 search terms that triggered ads
└─ Baseline to compare to Performance Max

Week 2 is when GASP optimization starts.
```

---

## Post-Setup: Week 2+ Maintenance

### Weekly Optimization Routine (15 minutes every Monday)

```
1. Pull search terms report (last 7 days)
2. Add 2-3 negative keywords (obvious waste)
3. Adjust 2-3 keyword bids (if clear pattern)
4. Check Performance Max vs GASP comparison
5. Log changes in spreadsheet

This is what Claude will automate later.
But for first month, do manually to learn.
```

---

## Troubleshooting Guide

### Problem: No impressions after 24 hours

```
Check:
1. Campaign enabled? (should be green dot)
2. Ads approved? (check ad status)
3. Location targeting correct? (Seattle, not whole US)
4. Budget set? ($2 and $10 per day)
5. Keywords added? (15 total across both campaigns)

If all yes and still no impressions:
└─ Bids might be too low (unlikely)
└─ Check Search terms report in Performance Max
    to see what queries actually have volume
```

### Problem: Spending too fast (budget exhausted by noon)

```
Action:
1. Lower all keyword bids by 30%
2. Example: $12 → $8.50
3. Monitor next day
4. Adjust again if needed

At $360/month budget, you want spend to last full day.
```

### Problem: Getting clicks but from wrong queries

```
Example: Click from "cheap hair extensions"

Action:
1. Go to Search terms report
2. Find the bad query
3. Add to negative keyword list
4. Choose phrase match to block variations

Do this weekly to clean up waste.
```

### Problem: Zero conversions after 2 weeks

```
This might be normal at low budget.

Check:
1. Is Performance Max getting conversions?
   └─ If yes: GASP needs more time (wait 4 weeks)
   └─ If no: Maybe slow season, conversion tracking issue

2. Are people clicking and bouncing immediately?
   └─ Check landing page quality
   └─ Check mobile experience

3. Is conversion tracking working?
   └─ Test: Fill out your own consultation form
   └─ Does it show as conversion in Google Ads?

Don't panic until Week 6-8.
At 30-40 clicks/month, might take time to convert.
```

---

## What Happens Next

### Week 2-4: GASP Begins Optimizing

```
This is when Claude automation (or manual optimization) kicks in:

Week 2:
├─ Add 3-5 negative keywords based on search terms
├─ Adjust bids on clear winners/losers
└─ First comparison: GASP vs Performance Max (too early to tell)

Week 3-4:
├─ Add more negative keywords
├─ Test device bid adjustments (-20% mobile if not converting)
├─ Second comparison: GASP should start showing pattern
```

### Week 5-8: GASP Should Show Results

```
By Week 8, you should see:

Performance Max:
├─ 2-3 bookings over 8 weeks
├─ CPA: $180-240
└─ Baseline performance

GASP:
├─ 3-5 bookings over 8 weeks
├─ CPA: $120-180
└─ 20-40% better efficiency

If GASP is winning by Week 8:
└─ Continue test to Week 12 for statistical confidence
```

### Week 9-12: Decision Time

```
After 12 weeks ($2,160 spent):

If GASP clearly better:
├─ Pause Performance Max
├─ Increase GASP budget to $500/month
└─ Monitor for next 2 months before scaling further

If Performance Max better:
├─ Keep Performance Max
├─ Use GASP learnings to manually optimize
└─ Try GASP again in 6 months when you have more budget

If tie:
├─ Keep both running
└─ Extend test another 60 days
```

---

## Summary: What You Just Set Up

```
✓ Created 2 GASP campaigns ($360/month total)
  ├─ Brand Defense: $60/month (5 exact match brand terms)
  └─ Non-Brand Focused: $300/month (10 high-intent terms)

✓ Added tracking to compare vs Performance Max
  └─ UTM parameters on all campaigns

✓ Added 20+ negative keywords to prevent waste
  └─ Shared list applied to both GASP campaigns

✓ Verified conversion tracking works
  └─ Form submissions will count as conversions

✓ Launched and monitoring first week
  └─ Collecting baseline data

Total test budget: $720/month for 90 days = $2,160
├─ Performance Max: $360/month (unchanged)
└─ GASP: $360/month (new)

Goal: Prove GASP is 30-40% more efficient than Performance Max
Expected: +1-2 bookings per month at lower CPA
Timeline: 90 days to declare winner
```

---

## Next Steps

**Immediate (This Week):**
- Let campaigns run and collect data
- Monitor daily for issues (2 min/day)
- Don't optimize yet - just watch

**Week 2 (Next Monday):**
- Review first week results
- Add 3-5 negative keywords based on search terms
- Compare GASP to Performance Max (first data point)

**After Setup Complete:**
- Ready for agents to build:
  - Detailed implementation plan (Option 1)
  - Technical architecture review (Option 2)
  - Landing page optimization (Option 3)
  - GASP performance dashboard

You've completed Week 0 manual setup. Ready for agents to take over automation and optimization next?
