# Google Ads Conversion Tracking Setup Guide

## Overview
Enhanced conversion tracking has been implemented on the keratin-bond-extensions-seattle.html page as a template. This guide explains how to set up conversion actions in Google Ads and apply the same tracking to all service pages.

## What's Been Implemented (Keratin Bond Page)

### 1. UTM Parameter Tracking
Automatically captures and tracks:
- `utm_source` - Traffic source (e.g., "google")
- `utm_medium` - Medium (e.g., "cpc")
- `utm_campaign` - Campaign name
- `utm_term` - **The actual search keyword** (e.g., "k-tips", "keratin bond")
- `utm_content` - Ad creative ID

### 2. Event Tracking
Three types of events are tracked:

**Button Clicks:**
- Event: `consultation_button_click`
- Tracks when users click "FREE CONSULTATION" button
- Data sent: service_type, value

**Form Submissions:**
- Event: `conversion` (Google Ads)
- Event: `generate_lead` (GA4)
- Tracks actual consultation requests
- Data sent: service_type, value, currency

**Phone Clicks:**
- Event: `phone_click`
- Tracks when users click phone/text links
- Data sent: service_type, click_location (header vs CTA)

## Google Ads Setup Required

### Step 1: Create Conversion Actions in Google Ads

1. Go to Google Ads → Tools & Settings → Conversions
2. Click "+ New conversion action"
3. Select "Website"
4. Create **5 separate conversion actions**:

| Conversion Name | Conversion Action | Value | Category |
|----------------|-------------------|-------|----------|
| Keratin Bond Consultation | KERATIN_BOND_CONVERSION | $1,200 | Lead/Submit lead form |
| Hand Tied Consultation | HAND_TIED_CONVERSION | $1,000 | Lead/Submit lead form |
| Tape-In Consultation | TAPE_IN_CONVERSION | $800 | Lead/Submit lead form |
| Move-Up Booking | MOVE_UP_CONVERSION | $300 | Lead/Submit lead form |
| Free Consultation Request | CONSULTATION_CONVERSION | $0 | Lead/Submit lead form |

### Step 2: Get Conversion Labels

After creating each conversion action, Google will give you a conversion label like:
```
AW-18371102793/AbC123XYZ
```

### Step 3: Update the Code

Replace the placeholder in each page's `submitContact` function:

**Current (placeholder):**
```javascript
'send_to': 'AW-18371102793/KERATIN_BOND_CONVERSION'
```

**Replace with actual label:**
```javascript
'send_to': 'AW-18371102793/AbC123XYZ'  // Your actual label from Google Ads
```

## URL Structure for Google Ads

### Campaign URLs Should Look Like:

**Keratin Bond Campaign:**
```
https://westside.style/keratin-bond-extensions-seattle.html?utm_source=google&utm_medium=cpc&utm_campaign=keratin-bond&utm_term={keyword}&utm_content={creative}
```

**Hand Tied Campaign:**
```
https://westside.style/hand-tied-extensions-seattle.html?utm_source=google&utm_medium=cpc&utm_campaign=hand-tied&utm_term={keyword}&utm_content={creative}
```

### Setting Up in Google Ads:

1. Go to your ad or ad group settings
2. Under "Ad URL options" → click "Ad URL options (advanced)"
3. In "Final URL suffix" add:
   ```
   ?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}
   ```

**OR** add it directly to your Final URL in each ad.

## What You'll Be Able to Track

### In Google Ads:
- **Conversions by keyword** - See which keywords actually convert
- **Cost per conversion** - Know your real ROI per keyword
- **Conversion rate by ad** - Test different ad copy
- **Service-specific performance** - Compare keratin vs tape-in vs hand-tied

### In Google Analytics 4:
- **Traffic source by service** - Where each service gets traffic
- **Keyword performance** - Which keywords bring quality traffic
- **User journey** - What pages people visit before converting
- **Engagement metrics** - Button clicks, phone clicks, form submissions

## Example Reports You Can Create

### "K-Tips" Performance:
```
Search Term: k-tips
Clicks: 45
Impressions: 523
CTR: 8.6%
Conversions: 3
Cost per Conversion: $47
Revenue: $3,600 (3 × $1,200)
ROAS: 76x
```

### Service Comparison:
```
Service         | Conversions | Avg CPC | Conv Rate | Rev per Click
----------------|-------------|---------|-----------|---------------
Keratin Bond    | 12          | $4.50   | 8.2%      | $98.40
Hand Tied       | 8           | $3.75   | 6.1%      | $61.00
Tape-In         | 15          | $2.80   | 9.8%      | $78.40
Move-Up         | 22          | $1.90   | 12.4%     | $37.20
```

## Files Modified

✅ **keratin-bond-extensions-seattle.html** - Full tracking implemented

### Still Need Tracking (Same Pattern):
- [ ] hand-tied-extensions-seattle.html
- [ ] tape-in-extensions-seattle.html
- [ ] extension-move-up-seattle.html
- [ ] hair-extensions-seattle.html
- [ ] consultation.html

## Implementation Checklist

- [x] Add UTM tracking to keratin bond page
- [x] Add event tracking to keratin bond page
- [ ] Apply same pattern to all other service pages
- [ ] Create 5 conversion actions in Google Ads
- [ ] Get conversion labels from Google Ads
- [ ] Replace placeholder labels with actual labels
- [ ] Add UTM parameters to all Google Ads campaigns
- [ ] Test conversions are firing (Google Tag Assistant)
- [ ] Verify data appears in Google Ads (24-48 hours)

## Testing Your Setup

### Use Google Tag Assistant:
1. Install: https://tagassistant.google.com
2. Open your landing page with UTM parameters
3. Click buttons and submit form
4. Check that events are firing:
   - `page_view_with_utm`
   - `consultation_button_click`
   - `phone_click`
   - `conversion` and `generate_lead` (on form submit)

### Test URL:
```
https://westside.style/keratin-bond-extensions-seattle.html?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=k-tips&utm_content=ad1
```

## Questions?

**Q: Do I need to add tracking to every page?**
A: Yes, each service page should have its own tracking with service-specific labels so you can see which services convert best.

**Q: What if I only want to track overall conversions, not by service?**
A: You can use one conversion action, but you'll lose the ability to optimize bids by service type.

**Q: How long until I see data?**
A: Events appear in GA4 within minutes. Google Ads conversions can take 24-48 hours to show up.

**Q: Can I track phone calls?**
A: Yes! Google Ads offers call tracking where they give you a forwarding number. This tracks actual phone calls as conversions.

---

**Next Step:** Create the 5 conversion actions in Google Ads and update the code with real conversion labels.
