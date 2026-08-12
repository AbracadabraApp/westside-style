# Meta Ads & Content Creation Ideas Archive

**Purpose:** Tracking valuable insights for Meta/Instagram advertising and content creation that don't belong in the Google Ads technical spec.

**Note:** These are good ideas for future exploration but not relevant to the current Claude-driven Google Ads optimization project.

---

## Meta Advertising Ideas

### Meta Ads + Claude MCP Integration (Lian Lim - May 3, 2026)
**Source:** @dashboardlim Twitter

**What It Is:**
Meta's official MCP connector at http://mcp.facebook.com/ads enables Claude to manage Facebook/Instagram ad campaigns with full read/write access.

**Capabilities:**
- Build campaign structure (ad sets, targeting, copy)
- Monitor pixel health
- Upload product catalogs
- Generate performance reports
- 29 tools total, free during beta

**Why It's Interesting:**
60-second setup to automate Meta ads management through Claude. Could be valuable for remarketing campaigns or brand awareness if Google Search campaigns generate sufficient demand.

**Implementation Notes:**
- Requires Facebook OAuth authorization
- Works through Claude Desktop custom connector
- Free during beta period

**Potential Use for Westside Style:**
Could use for Instagram remarketing to people who visited service pages but didn't book consultation. Show before/after gallery content to warm leads.

---

### AI Creative Production Stack (Ahad Shams - May 22)
**Source:** @spect3ral Twitter

**What It Is:**
Full creative automation workflow: Claude (briefs) → GPT Image 2 (static ads) → Seedance 2.0 (video ads) → Meta Ads MCP (publish & optimize)

**Claimed Results:**
Replaced $10k/month agency. Generates UGC-style video clips and product showcase ads with AI actors.

**Why NOT Applicable to Westside Style:**
- High-trust service business requires authentic before/after photos
- AI-generated images would damage credibility
- Extensions work requires real client testimonials, not synthetic content

**Potential Limited Application:**
Could use Claude to write captions for existing client photos on Instagram, but NOT for generating fake visuals.

---

### Node Graph Ad Production for CPG Brands
**Source:** Anonymous narrative post

**What It Is:**
Automated creative production using node graphs. Claims 300 ads generated overnight from one product photo and Claude-written angles.

**Why It's Not Relevant:**
- Volume production approach (300 variants) inappropriate for service business
- CPG/e-commerce focus (energy drinks)
- Trust and authenticity > creative volume for $1,200 services
- No technical implementation details provided

---

## Content Creation & SEO Ideas

### Paul Vengeons "Anti-Slop Filter" (Aug 11)
**Source:** @VengeonsP Twitter (French SEO expert)

**Core Principle:**
Avoid AI-generated content that gets flagged as "slop" by feeding Claude real data before it writes.

**3 Rules:**
1. **Real SEO Process** - Web research first, respect SERP intent, E-E-A-T (first-person opinion + how you tested), visual parity, internal linking
2. **Good Page Template** - Summary at top, centered scannable text, JSON-LD, explanatory images, delete all long dashes (AI tell)
3. **Real Business Strategy** - Feed Search Console data, competitor analysis, sitemap, business model to avoid vanity traffic

**Why It's Interesting:**
Good framework for content quality if Westside Style expands into content marketing (blog about extension care, comparison guides, etc.)

**Application:**
Could use this method to expand the FAQ pages on westside.style with authentic, helpful content that ranks organically.

---

### GSC Low-Hanging Fruit Method (Distribb.io/Borja)
**Source:** Detailed methodology post

**6-Step Process:**
1. Pull 3 months of Search Console query data
2. Prompt: "Find keywords where we rank but don't have specific content targeting this keyword"
3. Identify query gaps (page ranks for adjacent topic, not exact match)
4. Validate demand (check volume, confirm intent, avoid cannibalization)
5. Publish focused page targeting exact query
6. Track results, feed back to Claude

**Case Study:**
- "Automated SEO monitoring": Ranked in 3 days
- "Best AI tools for backlink outreach": Position 3 in 9 days, 106 impressions

**Application for Westside Style:**
If Search Console shows westside.style gets impressions for queries like:
- "extensions for thin hair" (but no dedicated page exists)
- "keratin bond vs hand tied for fine hair" (specific comparison not covered)

Create targeted pages to capture that traffic.

**Cross-Channel Opportunity:**
Queries that rank organically 11-20 with conversions = add to Google Ads as high-intent keywords.

---

### Paul Vengeons 12 SEO Workflows (Aug 3)
**Source:** @VengeonsP Twitter

**12 Claude Workflows:**
1. SEO Strategy - Site/market/competitor analysis → roadmap
2. Keyword Research - Volume × difficulty × business potential
3. Performance Analysis - Search Console CTR gaps
4. Competitor Analysis - Traffic, keywords, backlinks, strategy
5. AI Writing - Full page from SEO brief
6. On-Page Optimization - Titles, metas, Hn, density
7. Internal Linking - Find pages that should link to target
8. Backlink Analysis - Domains, anchors, nofollow ratio
9. Indexing Audit - Noindex, canonicals, robots.txt
10. Structured Data - JSON-LD schema generation
11. Brand Analysis - Brand mentions, AI visibility
12. Local SEO - Google Business, NAP consistency, reviews

**Why It's Interesting:**
"One system prompt per agent, one conversation per role" - modular workflow architecture similar to the Claude Code skills approach.

**Application:**
If Westside Style wants to build organic traffic alongside paid campaigns, these workflows could automate content strategy. However, paid search (our spec) delivers immediate results while SEO takes 3-6 months.

---

## Ideas NOT Worth Pursuing

### Generic Promotional Posts
- Posts that just say "comment WORKFLOW for access" with no implementation details
- Lead generation disguised as education
- Cannot evaluate without seeing actual code/methodology

### Wrong Business Model
- E-commerce creative automation (we're a service business)
- High-volume content production (we need high-trust content)
- B2B tools (we're B2C local service)

---

## Decision Framework: When to Pursue These Ideas

**Consider Meta/Instagram advertising when:**
- Google Search campaigns are profitable and scaled
- Have budget for brand awareness ($1,000+/month additional)
- Need remarketing to warm up cold traffic
- Want to build social proof and community

**Consider SEO/Content when:**
- Paid campaigns are mature and optimized
- Want to reduce CAC by building organic traffic
- Have 6-12 month timeline for results
- Can commit to publishing 2-4 articles/month

**Current Priority:**
Focus 100% on Google Ads spec implementation. These other channels are distractions until paid search is profitable.

---

**Status:** Archive of non-Google Ads ideas
**Last Updated:** August 12, 2026
