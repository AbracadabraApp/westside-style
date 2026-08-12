# GASP Manual Setup Guide
## Launch GASP-Brand and GASP-Nonbrand Campaigns Today

**Date:** August 12, 2026
**Goal:** Create two Search campaigns to compete against Performance Max
**Time Required:** 30-45 minutes

---

## Campaign Overview

| Campaign | Budget | Purpose |
|----------|--------|---------|
| **GASP-Brand** | $60/month ($2/day) | Defend brand searches, high impression share |
| **GASP-Nonbrand** | $300/month ($10/day) | High-intent hair extension searches |
| **PMAX-Control** | Keep current | Comparison baseline |

---

## Step 1: Label Your Existing Performance Max Campaign

1. Go to Google Ads → Campaigns
2. Click on your Performance Max campaign
3. Click "Labels" → "New label"
4. Create label: **"PMAX-Control"**
5. Apply to campaign
6. **Keep it running at current budget** (we need it for comparison)

---

## Step 2: Create GASP-Brand Campaign

### Campaign Settings

1. **Campaign type:** Search
2. **Campaign name:** GASP-Brand
3. **Networks:**
   - ✅ Google Search
   - ❌ Search Partners (uncheck)
   - ❌ Display Network (uncheck)
4. **Locations:**
   - Seattle, WA (25 mile radius)
   - Or: Seattle, Bellevue, Redmond, Kirkland, Issaquah (specific cities)
5. **Languages:** English
6. **Budget:** $2.00 per day ($60/month)
7. **Bidding:** Manual CPC (enhanced)
   - Set max CPC bid limit: $5.00
8. **Ad rotation:** Optimize (prefer best performing ads)

### Ad Group: Brand Keywords

**Ad group name:** Westside Style Brand

**Keywords (3 total):**
```
[westside style]                    EXACT    Bid: $2.00
[westside style seattle]            EXACT    Bid: $2.00
"westside style hair extensions"    PHRASE   Bid: $2.50
```

**Why these keywords:**
- EXACT match ensures we ONLY show for brand searches
- Low bids because brand searches convert well
- PHRASE match variation catches "westside style keratin extensions" etc.

**Negative Keywords (Apply at campaign level):**
```
jobs                 PHRASE
careers              PHRASE
reviews              PHRASE
complaints           PHRASE
```
(Blocks informational searches about your business)

### Ads (2 variations)

**Ad 1: Direct**
```
Headline 1: Westside Style | Seattle Hair Extensions
Headline 2: Keratin, Hand-Tied & Tape-In Methods
Headline 3: 15+ Years Experience | Free Consult
Description 1: Seattle's hair extension specialist. Three premium methods to match your hair type and lifestyle. Book your free consultation today.
Description 2: Real results. Natural looking. Long-lasting. Instagram: @_westside_style_
Final URL: https://westside.style/
Display Path: westside.style/extensions
```

**Ad 2: Method Focus**
```
Headline 1: Westside Style Hair Extensions
Headline 2: Keratin Bonds | Hand-Tied | Tape-In
Headline 3: Seattle Extension Specialist Since 2009
Description 1: Premium hair extensions matched to your hair type. Natural movement, long-lasting results. Free consultation to find your perfect method.
Description 2: Serving Seattle, Bellevue, Kirkland, Redmond. @_westside_style_
Final URL: https://westside.style/
Display Path: westside.style/consultation
```

### Ad Extensions

**Sitelink Extensions:**
1. Free Consultation → https://westside.style/consultation.html → "Book your free consultation"
2. Keratin Bonds → https://westside.style/keratin-bond-seattle.html → "Premium keratin extensions"
3. Hand-Tied → https://westside.style/hand-tied-seattle.html → "Natural hand-tied wefts"
4. Tape-In → https://westside.style/tape-in-seattle.html → "Quick tape-in method"

**Callout Extensions:**
- 15+ Years Experience
- Free Consultation
- Natural Looking Results
- Three Premium Methods
- Instagram @_westside_style_

**Structured Snippets:**
- Services: Keratin Bonds, Hand-Tied Wefts, Tape-In Extensions, Consultations
- Locations: Seattle, Bellevue, Kirkland, Redmond

---

## Step 3: Create GASP-Nonbrand Campaign

### Campaign Settings

1. **Campaign type:** Search
2. **Campaign name:** GASP-Nonbrand
3. **Networks:**
   - ✅ Google Search
   - ❌ Search Partners (uncheck)
   - ❌ Display Network (uncheck)
4. **Locations:**
   - Seattle, WA (25 mile radius)
5. **Languages:** English
6. **Budget:** $10.00 per day ($300/month)
7. **Bidding:** Manual CPC (enhanced)
   - Set max CPC bid limit: $15.00
8. **Ad rotation:** Optimize (prefer best performing ads)

### Ad Group 1: Core Hair Extensions

**Ad group name:** Hair Extensions Seattle

**Keywords (8 total):**
```
"hair extensions seattle"                      PHRASE   Bid: $8.00
"hair extensions seattle wa"                   PHRASE   Bid: $7.00
"best hair extensions seattle"                 PHRASE   Bid: $9.00
"hair extension specialist seattle"            PHRASE   Bid: $10.00
+hair +extension +specialist +near +me         BROAD    Bid: $8.00
"natural looking hair extensions seattle"      PHRASE   Bid: $9.00
"seattle hair extensions"                      PHRASE   Bid: $7.00
"hair extensions specialist near me"           PHRASE   Bid: $9.00
```

**Why these bids:**
- Higher bids ($7-10) to reach positions 1-3
- Specialist keywords get highest bids (more intent)
- Broad match modified for "near me" catches local variants

### Ad Group 2: Keratin Extensions

**Ad group name:** Keratin Extensions

**Keywords (5 total):**
```
"keratin bond extensions seattle"              PHRASE   Bid: $8.00
"keratin extensions seattle"                   PHRASE   Bid: $8.00
"keratin tip extensions seattle"               PHRASE   Bid: $7.00
"i tip extensions seattle"                     PHRASE   Bid: $7.00
"keratin hair extensions"                      PHRASE   Bid: $6.00
```

### Ad Group 3: Hand-Tied Extensions

**Ad group name:** Hand-Tied Extensions

**Keywords (5 total):**
```
"hand tied extensions seattle"                 PHRASE   Bid: $7.00
"hand tied hair extensions seattle"            PHRASE   Bid: $7.00
"beaded weft extensions seattle"               PHRASE   Bid: $6.00
"weft extensions seattle"                      PHRASE   Bid: $5.00
"hand tied weft extensions"                    PHRASE   Bid: $6.00
```

### Ad Group 4: Tape-In Extensions

**Ad group name:** Tape-In Extensions

**Keywords (5 total):**
```
"tape in extensions seattle"                   PHRASE   Bid: $6.00
"tape in hair extensions seattle"              PHRASE   Bid: $6.00
"tape extensions seattle"                      PHRASE   Bid: $5.00
"tape in extensions near me"                   PHRASE   Bid: $7.00
"best tape in extensions seattle"              PHRASE   Bid: $7.00
```

### Ad Group 5: Hair Type Specific

**Ad group name:** Hair Type Extensions

**Keywords (5 total):**
```
"hair extensions for thin hair"                PHRASE   Bid: $8.00
"hair extensions for fine hair"                PHRASE   Bid: $8.00
"extensions for thin hair seattle"             PHRASE   Bid: $9.00
"hair extensions that look natural"            PHRASE   Bid: $8.00
"natural hair extensions"                      PHRASE   Bid: $6.00
```

### Campaign-Level Negative Keywords (ALL 22 from config)

**Apply these to GASP-Nonbrand campaign:**

```
GLOBAL NEGATIVES:
wasters                          BROAD
diy                              PHRASE
cheap                            PHRASE
free                             PHRASE
training                         PHRASE
school                           PHRASE
course                           PHRASE
wholesale                        PHRASE
supplier                         PHRASE
wigs                             PHRASE
hair pieces                      PHRASE

COMPETITOR NEGATIVES:
bellami mon bebe                 EXACT
bellami hair extensions          EXACT
ashley james custom hair         EXACT
1630 hair artisans renton        EXACT

GENERIC SALON NEGATIVES:
beauty salons seattle wa         EXACT
beauty parlor                    EXACT
beauty with a twist              EXACT
beauty salons redmond wa         EXACT
beauty salons issaquah wa        EXACT
salon near me                    PHRASE
hair salon                       PHRASE
```

**PLUS 18 NEW NEGATIVES from test analysis:**

```
IRRELEVANT:
lash                             PHRASE
how to                           PHRASE
one piece                        PHRASE
butterfly weft                   EXACT

COMPETITORS:
maeve and nash                   EXACT
rubaiyat                         EXACT
lux beauty bar                   EXACT
salon 334                        EXACT
salon nouveau                    EXACT
bangz                            EXACT
hair by lisa                     EXACT

GENERIC:
hair stylist                     PHRASE
best hair salons                 PHRASE
best beauty salons               PHRASE

GEOGRAPHIC:
tacoma                           EXACT
```

**Total negative keywords: 40**

### Ads for GASP-Nonbrand (3 variations)

**Ad 1: Specialist Focus (Use for Core, Hair Type ad groups)**
```
Headline 1: Seattle Hair Extension Specialist
Headline 2: Keratin, Hand-Tied & Tape-In Methods
Headline 3: 15+ Years | Natural Looking Results
Description 1: Premium hair extensions matched to your hair type. Three methods: Keratin bonds, Hand-tied wefts, Tape-in. Free consultation.
Description 2: Serving Seattle area. Real results that look natural and last. Book your free consultation today. @_westside_style_
Final URL: https://westside.style/
Display Path: westside.style/extensions
```

**Ad 2: Method Emphasis (Use for Keratin, Hand-Tied, Tape-In ad groups)**
```
Headline 1: Premium {KeyWord:Hair Extensions} Seattle
Headline 2: Keratin Bonds | Hand-Tied | Tape-In
Headline 3: Free Consultation | 15+ Years Experience
Description 1: Seattle's extension specialist. Three premium methods for different hair types and lifestyles. Natural movement, long-lasting results.
Description 2: Keratin bonds from $1,200. Hand-tied from $1,800. Tape-in from $800. Book free consultation to find your perfect method.
Final URL: https://westside.style/
Display Path: westside.style/consultation
```

**Ad 3: Results Focus (Use for all ad groups)**
```
Headline 1: Natural Looking Hair Extensions Seattle
Headline 2: Matched to Your Hair Type & Lifestyle
Headline 3: Free Consultation | Real Results
Description 1: Stop settling for extensions that don't match your hair. Three premium methods tailored to your needs. See real results on Instagram.
Description 2: 15+ years perfecting hair extensions in Seattle. Keratin, Hand-tied, Tape-in. @_westside_style_
Final URL: https://westside.style/
Display Path: westside.style/results
```

**Note:** {KeyWord:Hair Extensions} is dynamic keyword insertion - it will show the user's search term in the headline when possible.

### Ad Extensions (Same as Brand)

**Sitelink Extensions:**
1. Free Consultation → https://westside.style/consultation.html
2. Keratin Bonds → https://westside.style/keratin-bond-seattle.html
3. Hand-Tied → https://westside.style/hand-tied-seattle.html
4. Tape-In → https://westside.style/tape-in-seattle.html
5. View Gallery → https://westside.style/gallery.html
6. About Jenn → https://westside.style/about.html

**Callout Extensions:**
- 15+ Years Experience
- Free Consultation
- Natural Looking Results
- Three Premium Methods
- Matched to Your Hair Type
- Instagram @_westside_style_

**Structured Snippets:**
- Services: Keratin Bonds, Hand-Tied Wefts, Tape-In Extensions, Consultations
- Types: I-Tip, Beaded Weft, Tape-In, Custom Color Matching

---

## Step 4: Set Up Conversion Tracking

Make sure your form submissions are tracking as conversions:

1. Go to Tools & Settings → Conversions
2. Verify conversion action exists: "Contact Form Submit"
3. Check that it's counting "Every" conversion (not "One per click")
4. Verify conversion value is set or tracking revenue

---

## Step 5: Create Labels for Campaign Comparison

1. Go to Campaigns view
2. Select GASP-Brand campaign → Add label → "GASP-1"
3. Select GASP-Nonbrand campaign → Add label → "GASP-1"
4. Now you can filter by label to see combined GASP-1 performance

---

## Step 6: Initial Monitoring Checklist

### Day 1-3 (Check daily):
- [ ] Are ads showing? (Search for your keywords on Google)
- [ ] Are you getting impressions?
- [ ] Check search terms report - any waste showing through?
- [ ] Add any new negative keywords that appear

### Week 1 (Check Monday):
- [ ] Compare GASP-1 vs PMAX-Control metrics
- [ ] Review which keywords are getting clicks
- [ ] Adjust bids up if low impression share
- [ ] Adjust bids down if wasting budget
- [ ] Add 3-5 new negative keywords from search terms

### Week 2-4:
- [ ] Weekly comparison GASP vs PMAX
- [ ] Track cost per lead for each
- [ ] Begin GASP automation development (optional)

---

## Budget Allocation Summary

| Campaign | Daily Budget | Monthly Budget | Purpose |
|----------|-------------|----------------|---------|
| GASP-Brand | $2.00 | $60 | Protect brand searches |
| GASP-Nonbrand | $10.00 | $300 | Acquire new clients |
| **GASP Total** | **$12.00** | **$360** | **Test against PMAX** |
| PMAX-Control | Keep current | Keep current | Comparison baseline |

---

## Quick Import Files

I'll create CSV files you can import directly into Google Ads to speed up setup.

---

## Expected Results

### Week 1:
- GASP impressions: 500-800
- GASP clicks: 15-30 (2-4% CTR)
- GASP leads: 0-1 (bootstrapping)

### Week 2-4:
- Impressions stabilize
- CTR improves to 4-6%
- Cost per lead: $120-180 (better than current)

### Week 4-13:
- Weekly optimizations improve performance
- Cost per lead drops to $100-140
- Compare to PMAX, declare winner

---

## Troubleshooting

**"My ads aren't showing"**
- Check if campaigns are enabled
- Check if budget is exhausted
- Try searching incognito with exact keyword
- Check location targeting

**"I'm getting impressions but no clicks"**
- Increase bids to reach positions 1-3
- Review ad copy - is it compelling?
- Check Quality Score (should be 7+)

**"I'm getting wasteful search terms"**
- Add them as negatives immediately
- Review match types - too broad?
- Check if negative keywords are applied at campaign level

**"Cost per click is too high"**
- Lower bids slightly (10-20%)
- Improve Quality Score (landing page relevance)
- Add more specific keywords (better targeting)

---

## Next Steps After Manual Setup

1. **This week:** Monitor daily, adjust bids, add negatives as needed
2. **Week 2:** Begin Phase 0 of GASP automation (Google Cloud setup)
3. **Week 3-4:** Build automation (Phases 1-5)
4. **Week 5+:** Let automation run weekly, compare to PMAX
5. **Week 13:** Evaluate winner, scale accordingly

---

**Ready to launch?**

Follow Steps 1-5 in order. Total time: 30-45 minutes.

After launch, I can help you:
- Analyze first week's results
- Build the automation
- Create weekly comparison reports
- Optimize based on performance

---

**Document Version:** 1.0
**Created:** August 12, 2026
**Campaign Structure:** GASP-Brand ($60/mo) + GASP-Nonbrand ($300/mo)
**Total Keywords:** 31 positive, 40 negative
**Expected Timeline:** Launch today, evaluate Week 13
