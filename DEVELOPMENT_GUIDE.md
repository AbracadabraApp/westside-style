# Development Guide - Westside Style

## CRITICAL: Read This Before Every Change

This guide exists because trust was broken by making unnecessary changes, removing existing functionality, and not following established patterns. Every rule here addresses a specific mistake that damaged trust.

---

## 1. READ-FIRST PROTOCOL

**NEVER make changes to a file without reading it first.**

### Before Any Edit:
- [ ] Read the ENTIRE current file
- [ ] Document what already exists
- [ ] Identify what will change
- [ ] Verify nothing will be lost

### Example Violation:
❌ Building new landing pages from scratch without reading the original pages
✅ Reading tape-in-seattle.html completely, then adding only hero video and CTAs

---

## 2. EXACT WORDING POLICY

**NEVER paraphrase the user's words. Use them exactly as provided.**

### Rules:
- If the user provides text in quotes, use it VERBATIM
- Do not rewrite, improve, or "clarify" user's copy
- Do not add words like "exact" or "We'll" that change meaning
- When in doubt, ask for exact wording

### Example Violations:
❌ User says: "To determine your pricing we will have a consult"
❌ You write: "We'll determine your exact pricing during your free consultation"

✅ User says: "I offer 12", 16", 20", and 26" extensions. Pricing will be based on length and your desired fullness."
✅ You write: "I offer 12", 16", 20", and 26" extensions. Pricing will be based on length and your desired fullness."

### Why This Matters:
Changing the user's words changes meaning and sets incorrect expectations. "Exact pricing after consult" promises something that can't be delivered.

---

## 3. EXISTING PATTERNS POLICY

**ALWAYS check existing site patterns before creating new components.**

### Before Creating Any New Component:
- [ ] Check if this component already exists on the site
- [ ] Read index.html for site-wide patterns
- [ ] Check existing pages for established styles
- [ ] Use the existing pattern, don't create a new one

### Example Violations:
❌ Creating a simple contact modal when index.html already has a full form
❌ Creating new CTA button styles when index.html has established button patterns
❌ Building landing pages from scratch when originals had UTM tracking, benefits sections, and visual dividers

✅ Reading index.html first to see the contact form pattern
✅ Using the exact same contact form on new pages
✅ Reading original landing pages to preserve all existing functionality

### Where to Check:
1. **index.html** - Site-wide patterns (header, footer, forms, CTAs)
2. **Existing method pages** - Already-established page structures
3. **User's instructions** - Specific requirements for this project

---

## 4. CHANGE SCOPE POLICY

**ONLY make changes that were explicitly requested. No "improvements."**

### Rules:
- Make ONLY the changes the user requested
- Do not add "improvements" or "optimizations"
- Do not change styling to "match" other pages unless asked
- If you think something should change, ASK first

### Example Violations:
❌ User asks: "Are they using the form?"
❌ You do: Replace the modal with a form AND change CTA button styling

✅ User asks: "Are they using the form?"
✅ You answer: "No, tape-in uses a simple modal. Index.html uses a full form. Should I change it?"

### Why This Matters:
Unnecessary changes diminish trust. Each unauthorized change makes the user wonder what else you changed without asking.

---

## 5. PROJECT-SPECIFIC RULES

### Westside Style Requirements:

#### Development Workflow:
- **All new work goes in /test/ first**
- Never commit changes outside /test/ unless explicitly requested
- If you committed outside /test/, revert immediately

#### Pricing & Copy:
- Use user's EXACT wording for all pricing text
- Never promise "exact pricing" - pricing depends on work done
- Pricing format: "FROM $XXX" in hero
- Pricing details: User's exact text below CTA

#### Site Patterns (Check These First):
- **Contact Form**: Use index.html pattern (Name, Phone, Email, Notes fields)
- **CTA Buttons**: Check index.html for button styling
- **UTM Tracking**: All landing pages must have UTM tracking in `<head>`
- **Video Loading**: Use lazy loading with IntersectionObserver
- **Schema Markup**: All method pages need Service schema

#### File Naming:
- New test pages: `{method}-seattle-NEW.html` in /test/
- Videos: `{method}-result-{number}.mp4` in /test/videos/
- Placeholders: Use existing videos with overlay text

#### Git Commits:
- Commit frequently with clear messages
- Include "🤖 Generated with Claude Code" footer
- Push after each logical change
- Never batch unrelated changes

---

## 6. PRE-FLIGHT CHECKLIST

**Before making ANY change, verify:**

- [ ] Have I read the current file completely?
- [ ] Do I know what already exists in this file?
- [ ] Am I making ONLY the requested change?
- [ ] Am I using the user's exact words where specified?
- [ ] Have I checked existing site patterns (index.html, original pages)?
- [ ] Am I working in /test/ if this is new work?
- [ ] Will this change remove any existing functionality?

**If you answer "No" or "Unsure" to any question, STOP and ask the user.**

---

## 7. WHAT TO DO WHEN YOU MAKE A MISTAKE

When you realize you've violated these rules:

1. **Acknowledge it immediately** - Don't wait for the user to find it
2. **Explain what you did wrong** - Be specific
3. **Offer to revert** - Ask if they want you to undo the change
4. **Don't make excuses** - Take responsibility
5. **Learn from it** - Add the mistake to this guide if needed

### Example:
"I made a mistake. I changed the CTA button styling when you only asked if they were using the form. I should have just answered your question. Would you like me to revert the button styling changes?"

---

## 8. TRUST-BUILDING BEHAVIORS

### Do This:
✅ Read files before editing them
✅ Use exact user wording
✅ Check existing patterns
✅ Make only requested changes
✅ Ask questions when unsure
✅ Acknowledge mistakes immediately
✅ Work in /test/ for new development
✅ Commit frequently with clear messages

### Never Do This:
❌ Build from scratch without reading existing files
❌ Paraphrase or "improve" user's copy
❌ Create new patterns when existing ones exist
❌ Make unauthorized "improvements"
❌ Batch changes without asking
❌ Commit outside /test/ without permission
❌ Make assumptions instead of asking

---

## 9. SPECIFIC MISTAKES TO NEVER REPEAT

### Mistake 1: Removing Existing Functionality
**What Happened:** Built new landing pages from scratch, lost UTM tracking, benefits sections, and visual dividers.
**Why It Happened:** Didn't read original pages completely before building new ones.
**Never Again:** Always read existing files first. Make surgical changes, not rebuilds.

### Mistake 2: Paraphrasing User's Copy
**What Happened:** Changed "To determine your pricing we will have a consult" to "We'll determine your exact pricing during consultation"
**Why It Happened:** Tried to "improve" the wording instead of using exact text.
**Never Again:** Use user's exact wording. Never paraphrase.

### Mistake 3: Creating New Patterns
**What Happened:** Created simple contact modal instead of using existing form from index.html
**Why It Happened:** Didn't check index.html for existing patterns.
**Never Again:** Check index.html and existing pages before creating any component.

### Mistake 4: Unauthorized Style Changes
**What Happened:** Changed CTA button styling when only asked "are they using the form?"
**Why It Happened:** Assumed user wanted buttons to match, made changes without asking.
**Never Again:** Only make explicitly requested changes. Ask before changing anything else.

---

## 10. QUESTIONS TO ASK YOURSELF

Before every change:
1. "Did the user explicitly ask for this change?"
2. "Have I read the existing file completely?"
3. "Am I removing or changing anything that already works?"
4. "Have I checked for existing patterns on the site?"
5. "Am I using the user's exact words, or paraphrasing?"
6. "Is this change in /test/ if it's new development?"
7. "Would the user be surprised by any part of this change?"

**If you answer "Yes" to #7, STOP and ask the user first.**

---

## SUMMARY

**The Golden Rule: Make only the changes explicitly requested, using existing patterns, with exact user wording, after reading what's already there.**

Every rule in this guide exists because it was violated and damaged trust. Follow these rules to rebuild and maintain that trust.
