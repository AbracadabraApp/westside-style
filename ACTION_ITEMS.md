# Google Ads Launch - Action Items
## Westside Style Hair Extensions

**Created:** August 10, 2026
**Budget:** $3,300/month ($2,000 Search + $1,300 LSA recommended)

---

## How to Use This Document

**Legend:**
- 🔴 **CRITICAL** - Must complete before launch
- 🟡 **HIGH** - Important for success
- 🟢 **MEDIUM** - Helpful but not essential
- ⚪ **OPTIONAL** - Nice to have

**Who Does What:**
- **[JOSH]** - Only Josh can do (needs account access or personal decisions)
- **[CLAUDE]** - Claude can do (code, content, technical)
- **[BOTH]** - Requires collaboration

---

# WEEK 1: FOUNDATION SETUP

## Step 1: Make Business Decisions
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 15 minutes
**Due:** Before anything else

### Answer These 7 Questions:

1. **Monthly ad budget?**
   - [ ] $2,000/month (conservative)
   - [ ] $3,300/month (recommended)
   - [ ] Other: $________

2. **Pursue Local Service Ads?**
   - [ ] Yes (needs insurance + background check)
   - [ ] No (Search Ads only)
   - [ ] Maybe later

3. **Do you have General Liability Insurance?**
   - [ ] Yes (required for LSA)
   - [ ] No
   - [ ] Not sure

4. **Business location?**
   - [ ] Physical salon: ______________
   - [ ] Home-based (private)
   - [ ] Mobile service
   - [ ] Suite rental at: ______________

5. **Can you check ads daily for Week 1?**
   - [ ] Yes
   - [ ] No

6. **Can you respond to leads within 1-2 hours?**
   - [ ] Yes
   - [ ] Sometimes
   - [ ] No

7. **When to launch?**
   - [ ] ASAP
   - [ ] Date: __________
   - [ ] Not sure

---

## Step 2: Create Google Business Profile
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 30 minutes + 2-5 day verification
**Due:** Week 1

### Tasks:

1. **Go to:** business.google.com

2. **Enter business info:**
   - Business name: "Westside Style" or "Westside Style Hair Extensions"
   - Category: "Hair Salon" or "Hair Extensions Service"
   - Location: Your address OR "Service area: Seattle + 15 miles"
   - Phone: (206) 295-4549
   - Website: westside.style
   - Hours: Set your availability

3. **Verify your business:**
   - Google sends verification postcard (2-5 days)
   - OR instant if using Google Workspace email

4. **Add photos (minimum 10):**
   - [ ] Logo/branding
   - [ ] Before/after extension work (5-10 photos)
   - [ ] Workspace photos (if applicable)

5. **Share profile URL with Claude**
   - [ ] Copy Google Business Profile link
   - [ ] Send to Claude to add to website

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

## Step 3: Get Initial Reviews
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 2 hours over 1-2 weeks
**Due:** Before heavy ad spend

### Tasks:

1. **Make a list:**
   - [ ] Identify 5-10 happy past clients
   - [ ] Write down their names/contact info

2. **Request reviews:**
   - [ ] Send Google Business Profile review link
   - [ ] Personal text/email: "Would you mind leaving an honest review?"
   - [ ] Follow up after 3-5 days if no response

3. **Request photo permissions:**
   - [ ] Ask clients for permission to use before/after photos
   - [ ] Get written permission (text confirmation OK)

4. **Optional incentive:**
   - [ ] Consider: "$25 off next move-up for honest review"
   - [ ] Make sure complies with Google policies

**Goal:** Minimum 5 reviews before launch
**Status:** [ ] Not started [ ] In progress [ ] Complete

---

## Step 4: Set Up Conversion Tracking
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH] creates, [CLAUDE] implements
**Time:** Josh 30 min, Claude 15 min
**Due:** Week 1

### Part A: Josh Creates Conversion Actions

1. **Log into Google Ads:**
   - Go to: ads.google.com
   - Account: AW-18371102793

2. **Navigate to conversions:**
   - Click: Tools & Settings (wrench icon)
   - Click: Measurement > Conversions
   - Click: + New Conversion Action
   - Select: Website

3. **Create Conversion 1 - Keratin Bond:**
   - Conversion name: `Keratin Bond Lead`
   - Category: `Submit lead form`
   - Value: `1200`
   - Count: `Every`
   - Window: `30 days`
   - Click: Create and Continue
   - **COPY THE LABEL** (looks like: `AbC1dE2fG3HiJk`)
   - Paste here: `AW-18371102793/_____________`

4. **Create Conversion 2 - Hand-Tied:**
   - Conversion name: `Hand-Tied Lead`
   - Category: `Submit lead form`
   - Value: `1000`
   - Count: `Every`
   - Window: `30 days`
   - **COPY THE LABEL**
   - Paste here: `AW-18371102793/_____________`

5. **Create Conversion 3 - Tape-In:**
   - Conversion name: `Tape-In Lead`
   - Category: `Submit lead form`
   - Value: `800`
   - Count: `Every`
   - Window: `30 days`
   - **COPY THE LABEL**
   - Paste here: `AW-18371102793/_____________`

6. **Share labels with Claude:**
   - [ ] Send all 3 conversion labels to Claude

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

### Part B: Claude Updates Website Code

**Owner:** [CLAUDE]
**Prerequisites:** Josh must provide conversion labels first

1. **Update keratin-bond-extensions-seattle.html:**
   - [ ] Find line with `KERATIN_BOND_CONVERSION`
   - [ ] Replace with actual conversion label
   - [ ] Test that code is valid

2. **Update hand-tied-extensions-seattle.html:**
   - [ ] Find line with `HAND_TIED_CONVERSION`
   - [ ] Replace with actual conversion label
   - [ ] Test that code is valid

3. **Update tape-in-extensions-seattle.html:**
   - [ ] Find line with `TAPE_IN_CONVERSION`
   - [ ] Replace with actual conversion label
   - [ ] Test that code is valid

**Status:** [ ] Waiting for labels [ ] Complete

---

### Part C: Josh Tests Conversion Tracking

**Owner:** [JOSH]
**Prerequisites:** Claude must update code first

1. **Test Keratin page:**
   - [ ] Visit: `https://westside.style/keratin-bond-extensions-seattle.html?utm_source=google&utm_medium=cpc&utm_campaign=test`
   - [ ] Fill out contact form
   - [ ] Submit form
   - [ ] Wait 3-6 hours
   - [ ] Check Google Ads > Tools > Conversions for test conversion

2. **Test Hand-Tied page:**
   - [ ] Repeat process for hand-tied-extensions-seattle.html
   - [ ] Confirm conversion appears

3. **Test Tape-In page:**
   - [ ] Repeat process for tape-in-extensions-seattle.html
   - [ ] Confirm conversion appears

**Status:** [ ] Not started [ ] In progress [ ] All 3 working

---

# WEEK 2: CAMPAIGN SETUP

## Step 5: Build Search Campaigns
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 2-3 hours
**Due:** Week 2

### Campaign 1: Keratin Bond

1. **Create campaign:**
   - [ ] Log into ads.google.com
   - [ ] Click: + New Campaign
   - [ ] Goal: Leads
   - [ ] Type: Search
   - [ ] Name: `WS_Keratin_Search`

2. **Campaign settings:**
   - [ ] Networks: Google Search only (uncheck Partners)
   - [ ] Locations: Seattle, WA + 15 mile radius
   - [ ] Location options: "People in or regularly in targeted locations"
   - [ ] Languages: English
   - [ ] Budget: $____/day (based on your answer to Step 1, question 1)
   - [ ] Bidding: Manual CPC
   - [ ] Enable: Enhanced CPC
   - [ ] Ad rotation: Optimize

3. **Add keywords:**
   - [ ] Copy keywords from GOOGLE_ADS_CAMPAIGN_SETUP.md (lines 64-113)
   - [ ] Set max CPC: $4.00

4. **Add negative keywords:**
   - [ ] Copy negative list from GOOGLE_ADS_CAMPAIGN_SETUP.md (lines 202-233)
   - [ ] Add at campaign level

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

### Campaign 2: Hand-Tied

1. **Create campaign:**
   - [ ] Name: `WS_HandTied_Search`
   - [ ] Budget: $____/day
   - [ ] Bidding: Manual CPC + Enhanced CPC

2. **Add keywords:**
   - [ ] Copy keywords from lines 119-156
   - [ ] Set max CPC: $3.50

3. **Add negative keywords:**
   - [ ] Copy same negative list (lines 202-233)

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

### Campaign 3: Tape-In

1. **Create campaign:**
   - [ ] Name: `WS_TapeIn_Search`
   - [ ] Budget: $____/day
   - [ ] Bidding: Manual CPC + Enhanced CPC

2. **Add keywords:**
   - [ ] Copy keywords from lines 161-198
   - [ ] Set max CPC: $3.00

3. **Add negative keywords:**
   - [ ] Copy same negative list (lines 202-233)

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

## Step 6: Create Ad Copy
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH] creates ads, [CLAUDE] can customize first
**Time:** 1-2 hours
**Due:** Week 2

### For Each Campaign:

1. **Create 3-4 Responsive Search Ads:**
   - [ ] Copy ad text from GOOGLE_ADS_CAMPAIGN_SETUP.md
   - [ ] Keratin ads: lines 239-294
   - [ ] Hand-Tied ads: lines 297-340
   - [ ] Tape-In ads: lines 343-386

2. **Set Final URLs:**
   - [ ] Include UTM tracking parameters
   - [ ] Format: `https://westside.style/[page].html?utm_source=google&utm_medium=cpc&utm_campaign=[campaign]&utm_term={keyword}&utm_content=[ad#]`

3. **Set Display Paths:**
   - [ ] Path 1: "Extensions" or service type
   - [ ] Path 2: "Seattle" or "Free-Consult"

**Status:**
- Keratin ads: [ ] Not started [ ] Complete
- Hand-Tied ads: [ ] Not started [ ] Complete
- Tape-In ads: [ ] Not started [ ] Complete

---

## Step 7: Add Ad Extensions
**Priority:** 🟡 HIGH
**Owner:** [JOSH]
**Time:** 30-45 minutes
**Due:** Week 2

### Sitelink Extensions (add to all campaigns):

- [ ] **Free Consultation** → https://westside.style/consultation.html
- [ ] **View Pricing** → https://westside.style/#services
- [ ] **See Gallery** → https://westside.style/#gallery
- [ ] **About Jennifer** → https://westside.style/#about

### Callout Extensions (add to all campaigns):

- [ ] 10+ Years Experience
- [ ] Small Clientele
- [ ] Free Consultation
- [ ] Text Preferred
- [ ] Seattle Extension Specialist
- [ ] Premium Methods Only

### Call Extension:

- [ ] Phone: (206) 295-4549
- [ ] Enable click-to-call on mobile
- [ ] Consider Google forwarding number for tracking

### Structured Snippets:

- [ ] Header: "Services" → Values: Keratin Bond, Hand-Tied, Tape-In, Move-Up
- [ ] Header: "Amenities" → Values: Free Consultation, Text Booking, Portfolio, Small Clientele

### Location Extension (if applicable):

- [ ] Link Google Business Profile (if you have physical location)
- [ ] Skip if mobile/home-based

**Status:** [ ] Not started [ ] In progress [ ] Complete

---

# WEEK 3: LOCAL SERVICE ADS (OPTIONAL)

## Step 8: Apply for Local Service Ads
**Priority:** 🟡 HIGH (if pursuing LSA)
**Owner:** [JOSH]
**Time:** 1-2 hours + 2-4 week approval
**Due:** Week 3 (runs parallel to Search Ads)

### Only Do This If:
- You answered "Yes" to LSA in Step 1, question 2
- You have General Liability Insurance
- You're willing to do background check ($50-100)

### Tasks:

1. **Check eligibility:**
   - [ ] Go to: https://ads.google.com/local-services-ads/
   - [ ] Enter: "Hair Salon" or "Beauty Salon"
   - [ ] Location: Seattle, WA
   - [ ] Confirm hair extensions is available

2. **Gather documents:**
   - [ ] Washington State Cosmetology License (scan/photo)
   - [ ] General Liability Insurance certificate
   - [ ] Business license (if applicable)
   - [ ] Photo ID

3. **Complete application:**
   - [ ] Business information
   - [ ] Service area: Seattle + 15 mile radius
   - [ ] Services: Hair Extensions, Maintenance, Consultations
   - [ ] Upload documents
   - [ ] Pay background check fee

4. **Complete background check:**
   - [ ] Follow Google's email instructions
   - [ ] Usually 3-5 business days

5. **Set budget:**
   - [ ] Daily budget: $40-50/day
   - [ ] Weekly cap: $300-350/week

6. **Wait for approval:**
   - [ ] Typical: 2-4 weeks
   - [ ] Google will email status updates

**Status:**
- [ ] Not pursuing LSA
- [ ] Applied, waiting for approval
- [ ] Approved and live

---

# WEEK 4: PRE-LAUNCH FINAL CHECKS

## Step 9: Pre-Launch Verification
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 30 minutes
**Due:** Day before launch

### Do NOT Launch Until All Checked:

**Google Ads Setup:**
- [ ] All 3 campaigns built and PAUSED
- [ ] Keywords added (20-30 per campaign)
- [ ] Negative keywords added (30+ terms)
- [ ] Ad copy created (3-4 ads per campaign)
- [ ] Ad extensions added
- [ ] Budgets set correctly
- [ ] Payment method valid

**Tracking Setup:**
- [ ] Conversion tracking installed
- [ ] All 3 conversions tested and working
- [ ] Google Analytics receiving data

**Business Readiness:**
- [ ] Google Business Profile verified
- [ ] Minimum 3-5 reviews collected
- [ ] Can respond to leads within 1-2 hours
- [ ] Phone (206) 295-4549 working

**Tools Ready:**
- [ ] Tracking spreadsheet created (see template below)
- [ ] Daily budget alerts set up in Google Ads
- [ ] Calendar reminder to check ads daily (Week 1)

**Status:** [ ] Not ready [ ] READY TO LAUNCH

---

## Step 10: Launch Campaigns
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 15 minutes
**Due:** Launch day

### Launch Process:

**Option A: Conservative Launch**
1. [ ] Enable only Keratin campaign
2. [ ] Wait 24 hours
3. [ ] Review results
4. [ ] If good, enable Hand-Tied and Tape-In

**Option B: Full Launch**
1. [ ] Enable all 3 campaigns at once
2. [ ] Monitor closely first 24 hours

**After Launch:**
- [ ] Verify ads show as "Eligible" (not paused/disapproved)
- [ ] Search your keywords to see if ads appear
- [ ] Click your own ad once to verify landing page works
- [ ] Set calendar reminders to check daily for Week 1

**Launch Date:** __________
**Status:** [ ] Not launched [ ] LIVE

---

# ONGOING: DAILY & WEEKLY TASKS

## Week 1: Daily Monitoring (CRITICAL)
**Priority:** 🔴 CRITICAL
**Owner:** [JOSH]
**Time:** 30 minutes per day
**Frequency:** Every day for 7 days

### Daily Checklist:

**Day 1 (after 24 hours):**
- [ ] Are ads running? Check status
- [ ] Any clicks yet?
- [ ] Any disapprovals? Fix immediately
- [ ] CPC reasonable? ($2-6 expected)
- [ ] Any conversions?

**Days 2-7 (repeat daily):**
- [ ] Check Search Terms Report
- [ ] Add 3-5 new negative keywords from irrelevant searches
- [ ] Check which keywords got clicks
- [ ] Respond to ANY leads within 1 hour
- [ ] Update tracking spreadsheet
- [ ] Check budget pacing (spending evenly?)

**Red Flags to Watch:**
- ⚠️ CPC over $8 → Lower bids immediately
- ⚠️ No impressions → Increase bids
- ⚠️ Ad disapproved → Fix and resubmit
- ⚠️ Budget spent by noon → Increase daily budget or lower bids
- ⚠️ Lots of clicks, no conversions → Check tracking, review keywords

---

## Week 2-4: Every 2-3 Days
**Priority:** 🟡 HIGH
**Owner:** [JOSH]
**Time:** 30-45 minutes
**Frequency:** Every 2-3 days

### Optimization Checklist:

- [ ] Review Search Terms Report
- [ ] Add 5-10 negative keywords
- [ ] Pause keywords with 20+ clicks, 0 conversions
- [ ] Increase bids +20% on keywords with conversions
- [ ] Check ad performance (CTR > 5% is good)
- [ ] Pause ads with CTR < 2% after 50+ impressions
- [ ] Respond to all leads promptly
- [ ] Update tracking spreadsheet
- [ ] Calculate current ROI

---

## Monthly Review (Ongoing)
**Priority:** 🟡 HIGH
**Owner:** [JOSH]
**Time:** 2-3 hours
**Frequency:** 1st of each month

### Monthly Tasks:

**Performance Review:**
- [ ] Calculate totals: Spend | Clicks | Leads | Clients | Revenue
- [ ] Calculate ROI: Revenue ÷ Ad Spend
- [ ] Identify best performing: Campaign | Keywords | Ads | Times/Days

**Budget Adjustments:**
- [ ] Move budget from low performers to high performers
- [ ] If ROI > 2x: Consider increasing budget 20-30%
- [ ] If ROI < 0.5x: Consider pausing or reducing budget

**Content Updates:**
- [ ] Add new keywords based on winning Search Terms
- [ ] Pause ads with consistently low CTR
- [ ] Create new ad variations of winners
- [ ] Test seasonal messaging

**Competitive Check:**
- [ ] Search your keywords
- [ ] Screenshot competitor ads
- [ ] Note any new competitors
- [ ] Adjust messaging if needed

---

# TRACKING SPREADSHEET TEMPLATE

## Weekly Performance Tracker

Copy this to Google Sheets or Excel:

```
Week | Campaign    | Impressions | Clicks | CTR   | CPC   | Cost   | Leads | CPL    | Clients | Revenue | ROI
-----|-------------|-------------|--------|-------|-------|--------|-------|--------|---------|---------|-----
1    | Keratin     |             |        |       |       |        |       |        |         |         |
1    | Hand-Tied   |             |        |       |       |        |       |        |         |         |
1    | Tape-In     |             |        |       |       |        |       |        |         |         |
1    | TOTAL       |             |        |       |       |        |       |        |         |         |
-----|-------------|-------------|--------|-------|-------|--------|-------|--------|---------|---------|-----
2    | Keratin     |             |        |       |       |        |       |        |         |         |
...
```

**How to Fill Out:**
- Get data from Google Ads interface
- Leads = conversion count from Google Ads
- Clients = manually track who actually booked
- Revenue = Clients × Service Price
- ROI = Revenue ÷ Cost

---

# EMERGENCY PROCEDURES

## If Costs Are Too High

1. **PAUSE campaigns immediately**
2. Review Search Terms Report
3. Add 20+ negative keywords for irrelevant clicks
4. Lower max CPC by 30-50%
5. Pause keywords with no conversions
6. Resume with lower bids

## If No Leads Coming In

1. Check ad approval status (might be disapproved)
2. Check budget (might be exhausted early)
3. Check bids (might be too low for impressions)
4. Check landing page (might be broken)
5. Increase bids by 30% on exact match keywords
6. Review ad copy (low CTR = bad messaging)

## If Conversions Not Tracking

1. Verify tracking code on page (View Source)
2. Test form submission in Incognito mode
3. Check Google Tag Assistant Chrome extension
4. Wait 3-6 hours (data delay is normal)
5. Contact Claude if still not working

## If Ads Disapproved

1. Check email for disapproval reason
2. Common issues:
   - Excessive capitalization
   - "Click here" language (not allowed)
   - URL mismatch
   - Trademark issues
3. Fix issue and resubmit
4. Usually approved within 24 hours

---

# SUPPORT CONTACTS

**Google Ads Support:**
- Phone: 1-866-246-6453 (9am-5pm PT, Mon-Fri)
- Chat: Available in Google Ads interface
- Help: support.google.com/google-ads

**Claude (for technical issues):**
- Website code problems
- Tracking implementation
- Landing page updates
- Analytics questions

**Your Conversion Labels:**
_(Fill in after Step 4)_
- Keratin: `AW-18371102793/_____________`
- Hand-Tied: `AW-18371102793/_____________`
- Tape-In: `AW-18371102793/_____________`

---

# QUICK START SUMMARY

**If you want the absolute fastest path to launch:**

1. ✅ **Today:** Answer 7 questions in Step 1
2. ✅ **Today:** Create Google Business Profile (Step 2)
3. ✅ **This week:** Request 5-10 reviews (Step 3)
4. ✅ **This week:** Set up conversion tracking (Step 4)
5. ✅ **Next week:** Build 3 campaigns (Step 5)
6. ✅ **Next week:** Write ads (Step 6)
7. ✅ **Next week:** Add extensions (Step 7)
8. ✅ **Week 3:** Pre-launch check (Step 9)
9. ✅ **Week 3:** LAUNCH (Step 10)
10. ✅ **Week 4+:** Daily monitoring (Week 1 section)

**Minimum Time to Launch:** 3 weeks (includes Google verification wait time)

**Total Josh Time:**
- Setup: 11-13 hours over 3 weeks
- Ongoing: 30 min/day Week 1, then 2-3 hours/month

---

**Ready to start?**

Begin with **Step 1: Make Business Decisions** and check off items as you complete them.

**Questions?** Message Claude for help with any step.

---

**Document Version:** 1.0
**Last Updated:** August 10, 2026
**Created By:** Claude Code for Westside Style
