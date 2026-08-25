# Quick Start - Contact Form Deployment

## Update Forms Site-Wide (3 Steps)

### 1. Edit Component Files

```bash
cd /Users/josh.petersen/westside-style/components
```

Edit any of these files:
- `modal.html` - Modal HTML structure
- `form-script.js` - JavaScript functions
- `sr-only.css` - Accessibility CSS

### 2. Run Deployment Script

```bash
cd /Users/josh.petersen/westside-style
python3 deploy_forms.py
```

This will:
- Create timestamped backup
- Update all 48 HTML files
- Show success/failure for each file

### 3. Verify Deployment

```bash
python3 verify_deployment.py
```

Should show: ✅ 44/44 pages verified

---

## Test Live Form

1. Open any service page in browser:
   - `tape-in-seattle.html`
   - `keratin-bond-seattle.html`
   - `hand-sewn-weft-seattle.html`

2. Click "FREE CONSULTATION" button

3. Fill out form:
   - Name (optional)
   - Phone (optional, but validates if provided)
   - Email (required)
   - Notes (optional)

4. Click "FREE CONSULTATION" to submit

5. Check Jenn's phone for SMS: **206-295-4549**

6. User should be redirected to `/inquiry.html`

---

## Common Tasks

### Change Button Text

1. Edit `/components/modal.html`
2. Find: `FREE CONSULTATION`
3. Change to: `YOUR NEW TEXT`
4. Run: `python3 deploy_forms.py`

### Update Netlify Endpoint

1. Edit `/components/form-script.js`
2. Find: `fetch('https://roaring-kulfi-cd788b.netlify.app/.netlify/functions/send-sms'`
3. Update URL
4. Run: `python3 deploy_forms.py`

### Add New Form Field

1. Edit `/components/modal.html` - Add HTML input
2. Edit `/components/form-script.js` - Capture value in submitContact()
3. Run: `python3 deploy_forms.py`

### Restore from Backup

```bash
cd /Users/josh.petersen/westside-style
ls -d backup_* | tail -1  # Find latest backup
cp backup_YYYYMMDD_HHMMSS/*.html .
```

---

## File Locations

| File | Purpose |
|------|---------|
| `/components/modal.html` | Modal HTML |
| `/components/form-script.js` | JavaScript |
| `/components/sr-only.css` | Accessibility CSS |
| `deploy_forms.py` | Deployment script |
| `verify_deployment.py` | Verification script |
| `backup_*/` | Timestamped backups |

---

## Expected Results

```
📊 DEPLOYMENT SUMMARY
   Total files:    48
   ✓ Updated:      48
   ✗ Failed:       0
```

```
📊 VERIFICATION RESULTS
   Total files:  48
   ✓ Passed:     44  (pages with forms)
   ✗ Failed:     0

   4 informational pages without forms (expected)
```

---

## Troubleshooting

**Deployment fails:**
- Check Python 3 is installed: `python3 --version`
- Check component files exist: `ls components/`
- Check permissions: `chmod +x deploy_forms.py`

**Forms not working:**
- Run verification: `python3 verify_deployment.py`
- Check browser console for errors
- Verify Netlify function is running
- Test endpoint: `curl https://roaring-kulfi-cd788b.netlify.app/.netlify/functions/send-sms`

**SMS not arriving:**
- Check Twilio account status
- Verify phone number in Netlify function
- Check network tab in browser dev tools

---

## Support

See full documentation:
- `DEPLOYMENT_COMPLETE.md` - Full deployment details
- `components/README.md` - Component documentation
- `DEPLOYMENT_SUMMARY.md` - Initial deployment notes

---

**That's it! 3 steps to update forms site-wide.**
