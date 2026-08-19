# GASP Current Approach - Saved State

**Date:** 2026-08-18
**Status:** In progress - campaign created but keywords not yet uploaded

## Current Campaign Structure

### GASP-1-NonBrand Campaign
- **Status:** Published
- **Budget:** $15/day (should be $10/day)
- **Bidding:** Manual CPC (Clicks)
- **Location Targeting:** 30 Seattle metro cities
- **Keywords:** NONE (upload in progress)
- **Negative Keywords:** Not yet added (41 ready in file)

### GASP-1-Brand Campaign
- **Status:** Unknown (may not be created yet)
- **Planned Budget:** $2/day
- **Purpose:** Defend brand searches

## Keyword Strategy

### Original Keywords (27 total)
All Seattle-focused with high bids ($6-10):
- "hair extensions seattle" - $8.00
- "keratin extensions seattle" - $8.00
- "hand tied extensions seattle" - $7.00
- "tape in extensions seattle" - $6.00
- Plus variations for each extension type

### Expanded Keywords (65 total)
Added city-specific variations at lower bids based on insight that:
- Generic "seattle" keywords are expensive due to competition
- City-specific keywords (Federal Way, Burien, Renton, etc.) have much lower CPCs
- Same qualified customer at fraction of cost

**City tiers by bid:**
- Tier 1 - Seattle: $6-10
- Tier 2 - Bellevue: $4-5
- Tier 3 - Kirkland, Redmond, Mercer Island: $3.50-4
- Tier 4 - Federal Way, Burien, Renton, Issaquah, Bothell, Woodinville: $2.50-3
- Tier 5 - Tukwila, SeaTac, Des Moines, Newcastle: $2.50

**Extension types covered:**
- General hair extensions (14 city variations)
- Keratin/I-tip extensions (9 city variations)
- Hand-tied/beaded weft (7 city variations)
- Tape-in extensions (7 city variations)
- Hair type specific (thin/fine hair) (7 keywords)

## Negative Keywords (41 total)

**Categories:**
1. Competitors (11): maeve and nash, rubaiyat, bellami, ashley james, etc.
2. Generic salons (12): beauty salons, hair stylists, beauty parlor, etc.
3. Irrelevant (18): diy, cheap, free, training, wholesale, wigs, how to, jobs, careers, reviews, complaints, lash, tacoma

**File:** gasp-41-negative-keywords.txt

## Files Created

### Documentation
- `GASP_TEST_ANALYSIS.md` - Analysis of 40 wasteful search terms from Performance Max
- `GASP_MANUAL_SETUP_GUIDE.md` - Step-by-step campaign setup instructions

### CSV/Import Files
- `gasp-keywords-template.csv` - Google Ads template format (Action, Status, Campaign, Ad Group, Keyword, Match Type)
- `gasp-keywords-expanded.csv` - 65 keywords with all city variations
- `gasp-keywords-simple-upload.csv` - Simplified format (Keyword, Match Type, Max CPC)
- `gasp-nonbrand-keywords.csv` - Original nonbrand keywords
- `gasp-brand-keywords.csv` - Brand protection keywords
- `gasp-negative-keywords.csv` - 41 negative keywords
- `gasp-location-targets.csv` - 30 cities structured
- `gasp-locations-plain.txt` - Comma-separated city list

### Plain Text Files
- `gasp-41-negative-keywords.txt` - For copy/paste
- `gasp-keywords-only.txt` - Just keyword phrases

## Current Blocking Issues

### CSV Upload Problem
Google Ads keyword upload failing with error: "Missing value in 'Campaign ID'"

**Attempted formats:**
1. Full Google template (Action, Keyword status, Campaign, Ad group, Keyword, Match type)
2. Simple format (Keyword, Match Type, Max CPC)

Both failed - Google requires Campaign ID when uploading to existing campaign.

**Solutions considered:**
1. Get Campaign ID from Google Ads interface and add to CSV
2. Manual keyword entry (paste keywords directly into ad group)
3. Use Google Ads Editor (desktop app - more stable than web interface)

## Strategic Rationale

### Why Manual Search Campaigns vs Performance Max

Performance Max issues:
- Zero visibility into search terms
- Can't add negative keywords
- Black box optimization
- Wasteful spending identified ($198/month on zero-performing terms)

GASP Search advantages:
- Full search term transparency
- Negative keyword control
- Precise bid management
- Target specific high-intent queries
- Cheaper city-specific keywords

### Brand/Nonbrand Separation

**Brand ($2/day):** Defensive
- Protect against competitors bidding on "westside style"
- 3 exact/phrase match keywords
- Low budget because volume is low

**Nonbrand ($10/day):** Offensive
- Prospecting new customers
- 65+ phrase match keywords
- Geographic arbitrage strategy (cheap city keywords)
- Extension type variations

## Budget Strategy

- **Total GASP:** $12/day ($360/month)
- **Performance Max:** Keep running (currently $12/day = $360/month)
- **Total Ad Spend:** $24/day ($720/month)

Goal: Let GASP and Performance Max compete. GASP should capture high-intent searches cheaper, leaving Performance Max to handle display/discovery/YouTube.

## Next Steps (Before Reevaluation)

1. Resolve CSV upload issue (get Campaign ID or use manual entry)
2. Add 41 negative keywords
3. Fix budget from $15 to $10/day
4. Create GASP-1-Brand campaign
5. Launch both campaigns
6. Monitor for 7 days
7. Analyze which city-specific keywords perform

## Key Insights from Conversation

1. **Cost differential:** "seattle hair extensions" costs 10x "burien hair extensions" for same qualified customer
2. **Demographics:** Extensions aren't limited to wealthy areas - avoid stereotyping
3. **Geographic arbitrage:** Lower-cost cities = same service need, fraction of CPC
4. **Search term data:** PDF shows wasteful spending on competitors, generic salons, irrelevant terms
5. **Manual control:** Need visibility and negative keyword power to stop waste

## Files Locations

Working directory: `/Users/josh.petersen/westside-style/`
Downloads (for Google Ads upload): `/Users/josh.petersen/Downloads/`

---

**Status at pause:** Campaign shell exists, keywords ready but not uploaded due to Campaign ID requirement.
