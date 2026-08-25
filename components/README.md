# Westside Style - Contact Form Components

This directory contains the standardized contact form components used across all Westside Style HTML pages.

## Components

### 1. modal.html
Complete HTML structure for the contact modal including:
- Backdrop overlay
- Modal panel with proper z-index layering
- Accessible form with labels
- Phone validation pattern
- Required email field
- Close button with screen-reader text

### 2. form-script.js
JavaScript functions for form behavior:
- `getServiceType()` - Auto-detects service from page URL
- `openContactModal()` - Opens modal with focus management
- `closeContactModal()` - Closes modal and restores scroll
- `submitContact(e)` - Handles form submission to Netlify function
- `trapFocus(modal)` - Accessibility focus trap
- Escape key handler
- Conversion tracking integration

### 3. sr-only.css
Screen-reader-only utility class for accessibility compliance.

## Deployment

### Running the Deployment Script

```bash
cd /Users/josh.petersen/westside-style
python3 deploy_forms.py
```

The script will:
1. Load all component files from this directory
2. Create a timestamped backup of all HTML files
3. Update 48 HTML files (excluding inquiry.html, gasp-dashboard.html, google-ads-app.html)
4. Replace modal HTML, form scripts, add CSS, and standardize button text
5. Report success/failure for each file

### What Gets Updated

For each HTML file:
- **Modal HTML**: Replaces entire `<!-- Contact Modal -->` section
- **JavaScript**: Replaces `<script>` containing form functions
- **CSS**: Adds `.sr-only` if not present
- **Button Text**: Changes all variants to "FREE CONSULTATION"

### Manual Updates

If you need to update the form across all pages:

1. Edit the component files in `/components/`
2. Run `python3 deploy_forms.py`
3. Test on a few pages
4. Commit changes

### Testing After Deployment

```bash
# Verify a specific file
python3 -c "
content = open('tape-in-seattle.html').read()
print('✓ Modal present' if '<!-- Contact Modal -->' in content else '✗ Modal missing')
print('✓ Functions present' if 'function getServiceType()' in content else '✗ Functions missing')
print('✓ Button text' if 'FREE CONSULTATION' in content else '✗ Wrong button text')
"
```

## Form Flow

1. User clicks "FREE CONSULTATION" button
2. Modal opens (`openContactModal()`)
3. User fills form (name optional, phone optional with validation, email required, notes optional)
4. User submits form (`submitContact()`)
5. JavaScript posts to Netlify serverless function
6. Netlify function sends SMS via Twilio to Jenn's phone: 206-295-4549
7. Google Analytics conversion event fired
8. User redirected to `/inquiry.html` (thank you page)

## Netlify Function Endpoint

```
https://roaring-kulfi-cd788b.netlify.app/.netlify/functions/send-sms
```

Payload:
```json
{
  "name": "John Doe",
  "phone": "206.555.1234",
  "email": "john@example.com",
  "notes": "Interested in tape-ins",
  "service_type": "tape_in_extensions",
  "page": "Tape-In Hair Extensions Seattle | Westside Style"
}
```

## Service Type Detection

The `getServiceType()` function automatically detects service type from URL:
- `/keratin-bond-seattle.html` → `keratin_bond_extensions`
- `/hand-sewn-weft-seattle.html` → `hand_tied_extensions`
- `/tape-in-seattle.html` → `tape_in_extensions`
- All others → `general_inquiry`

## Accessibility Features

- Proper label/input associations
- Screen-reader-only text for close button
- Focus trap when modal is open
- Escape key to close
- Required field validation
- Phone pattern validation

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify Netlify function endpoint is accessible
- Check network tab for 200 response

### Modal not opening
- Verify `openContactModal()` function is present in page
- Check for JavaScript errors in console
- Ensure button has `onclick="openContactModal()"`

### Wrong service type in SMS
- Check URL path matches expected patterns
- Verify `getServiceType()` function logic
- Manually override if needed for special pages

## Maintenance

To update the form site-wide:
1. Edit component files in `/components/`
2. Run deployment script
3. Test on multiple pages
4. Commit and push changes

This ensures all 48 pages stay synchronized with the same form behavior and appearance.
