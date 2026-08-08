# Conversion Tracking Implementation Status

## ✅ Completed Pages

### 1. keratin-bond-extensions-seattle.html
- ✅ UTM parameter tracking
- ✅ Button click tracking (consultation_button_click)
- ✅ Phone click tracking (header + CTA)
- ✅ Form submission tracking (conversion + generate_lead)
- **Service Type:** keratin_bond
- **Value:** $1,200
- **Conversion Label:** KERATIN_BOND_CONVERSION

### 2. hand-tied-extensions-seattle.html
- ✅ UTM parameter tracking
- ✅ Button click tracking
- ✅ Phone click tracking (header + CTA)
- ✅ Form submission tracking
- **Service Type:** hand_tied
- **Value:** $1,000
- **Conversion Label:** HAND_TIED_CONVERSION

## 🔄 Remaining Pages (Same Pattern Needed)

### 3. tape-in-extensions-seattle.html
- Service Type: `tape_in`
- Value: `800`
- Conversion Label: `TAPE_IN_CONVERSION`
- Event Label: `Tape-In`

### 4. extension-move-up-seattle.html
- Service Type: `move_up`
- Value: `300`
- Conversion Label: `MOVE_UP_CONVERSION`
- Event Label: `Move-Up`

### 5. consultation.html
- Service Type: `consultation`
- Value: `0`
- Conversion Label: `CONSULTATION_CONVERSION`
- Event Label: `Free Consultation`

### 6. hair-extensions-seattle.html (General)
- Service Type: `general_extensions`
- Value: `1000` (average)
- Conversion Label: `GENERAL_EXTENSIONS_CONVERSION`
- Event Label: `Hair Extensions General`

## Code Pattern to Apply

For each remaining page, add three code blocks:

### Block 1: UTM Tracking (in <head> after gtag config)
```javascript
// Track UTM parameters for keyword tracking
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmTerm = urlParams.get('utm_term');
  const utmContent = urlParams.get('utm_content');

  if (utmSource || utmMedium || utmCampaign) {
    gtag('event', 'page_view_with_utm', {
      'event_category': 'Marketing',
      'event_label': '[SERVICE NAME] Landing',
      'utm_source': utmSource || 'direct',
      'utm_medium': utmMedium || 'none',
      'utm_campaign': utmCampaign || 'none',
      'utm_term': utmTerm || 'none',
      'utm_content': utmContent || 'none'
    });
  }
})();
```

### Block 2: Update openContactModal() function
```javascript
function openContactModal() {
    document.getElementById('contactModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Track consultation button click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'consultation_button_click', {
            'event_category': 'Engagement',
            'event_label': '[SERVICE NAME]',
            'service_type': '[service_type]',
            'value': [VALUE]
        });
    }
}
```

### Block 3: Update submitContact() function
```javascript
function submitContact(e) {
    e.preventDefault();
    const name  = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const notes = document.getElementById('cf-notes').value.trim();

    // Track form submission
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-18371102793/[CONVERSION_LABEL]',
            'event_category': 'Lead',
            'event_label': '[SERVICE NAME] Consultation',
            'service_type': '[service_type]',
            'value': [VALUE],
            'currency': 'USD'
        });

        // Also send to GA4
        gtag('event', 'generate_lead', {
            'event_category': 'Lead',
            'event_label': '[SERVICE NAME]',
            'service_type': '[service_type]',
            'value': [VALUE],
            'currency': 'USD'
        });
    }

    const body = [
        `Inquiry for [SERVICE] from westside.style`,
        `Name: ${name}`,
        phone ? `Phone: ${phone}` : null,
        email ? `Email: ${email}` : null,
        notes ? `Notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    const btn = document.querySelector('#contactForm button[type="submit"]');
    btn.textContent = 'Opening text message...';
    btn.disabled = true;

    setTimeout(() => {
        window.location.href = `sms:2062954549?body=${encodeURIComponent(body)}`;
    }, 500);
}
```

### Block 4: Add trackPhoneClick() function (before document.addEventListener)
```javascript
function trackPhoneClick(location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
            'event_category': 'Contact',
            'event_label': '[SERVICE NAME] - ' + location,
            'service_type': '[service_type]',
            'click_location': location
        });
    }
}
```

### Block 5: Add onclick to phone links
Find these two lines and add `onclick="trackPhoneClick('header')"` and `onclick="trackPhoneClick('cta')"`:

```html
<!-- Header -->
<a href="sms:2062954549" onclick="trackPhoneClick('header')" class="...">

<!-- CTA Section -->
<a href="sms:2062954549" onclick="trackPhoneClick('cta')" class="...">
```

## Quick Reference Table

| Page | Service Type | Value | Label | Event Label |
|------|-------------|-------|-------|-------------|
| ✅ keratin-bond | keratin_bond | 1200 | KERATIN_BOND_CONVERSION | Keratin Bond |
| ✅ hand-tied | hand_tied | 1000 | HAND_TIED_CONVERSION | Hand Tied |
| ⏳ tape-in | tape_in | 800 | TAPE_IN_CONVERSION | Tape-In |
| ⏳ move-up | move_up | 300 | MOVE_UP_CONVERSION | Move-Up |
| ⏳ consultation | consultation | 0 | CONSULTATION_CONVERSION | Free Consultation |
| ⏳ general | general_extensions | 1000 | GENERAL_EXTENSIONS_CONVERSION | Hair Extensions General |

## Benefits Once All Pages Complete

### Keyword-Level Insights:
```
Keyword: "tape in extensions near me"
→ Lands on: tape-in page
→ Clicks button: tape_in service_type tracked
→ Converts: $800 value, TAPE_IN_CONVERSION
→ Result: Know tape-in keywords ROI
```

### Service Comparison:
```
Service     | Impressions | Clicks | Conversions | Cost/Conv | ROAS
------------|-------------|--------|-------------|-----------|------
Keratin     | 2,340       | 187    | 12          | $42       | 28.5x
Hand Tied   | 1,890       | 145    | 8           | $38       | 26.3x
Tape-In     | 3,120       | 298    | 18          | $31       | 25.8x
Move-Up     | 1,240       | 156    | 24          | $18       | 16.7x
```

### Optimization Actions:
- Increase bid on high-converting keywords
- Pause keywords with 0 conversions after 50 clicks
- Create separate budgets per service based on performance
- A/B test ad copy for each service
- Adjust landing page content based on engagement metrics

## Next Steps

1. **Option A: Manual Application**
   - Copy code blocks above
   - Apply to each remaining page
   - Replace placeholders with values from Quick Reference Table
   - Test with Google Tag Assistant

2. **Option B: Automated (Claude Code)**
   - Let Claude apply the pattern to remaining 4 pages
   - Takes 5 minutes
   - Ensures consistency

3. **Then: Google Ads Setup**
   - Create 6 conversion actions in Google Ads
   - Get real conversion labels
   - Replace placeholder labels (TAPE_IN_CONVERSION, etc.)
   - Add UTM parameters to all campaigns
   - Launch campaigns

## Testing Checklist

Once all pages have tracking:

- [ ] Install Google Tag Assistant Chrome extension
- [ ] Visit each page with test UTM parameters
- [ ] Click "Free Consultation" button (should fire consultation_button_click)
- [ ] Click phone number (should fire phone_click)
- [ ] Submit form (should fire conversion + generate_lead)
- [ ] Check events in Tag Assistant
- [ ] Verify events appear in GA4 Real-Time (5 minutes)
- [ ] Verify conversions appear in Google Ads (24-48 hours)

## Current Implementation: 33% Complete (2 of 6 pages)

**Status:** Keratin Bond ✅ | Hand Tied ✅ | Tape-In ⏳ | Move-Up ⏳ | Consultation ⏳ | General ⏳
