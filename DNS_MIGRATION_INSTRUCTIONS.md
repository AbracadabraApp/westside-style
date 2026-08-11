# DNS Migration Instructions for westside.style

## Current Status
- **Domain:** westside.style
- **DNS Provider:** name.com
- **Current DNS:** Points to GitHub Pages (185.199.x.x IPs)
- **Target:** Netlify (roaring-kulfi-cd788b.netlify.app)

## Changes Required

### Step 1: Login to name.com
1. Go to https://www.name.com/account/domain
2. Find westside.style in your domain list
3. Click "Manage DNS Records"

### Step 2: Update A Records
Replace the current GitHub Pages A records with Netlify's load balancer IP:

**Remove these records:**
```
Type: A
Host: @
Value: 185.199.111.153
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
```

**Add this record:**
```
Type: A
Host: @
Value: 75.2.60.5
TTL: 3600 (or use default)
```

### Step 3: Verify CNAME for www (if it exists)
If you have a www subdomain, update it:

**Add or update:**
```
Type: CNAME
Host: www
Value: roaring-kulfi-cd788b.netlify.app
TTL: 3600
```

### Step 4: Verify in Netlify
After DNS changes:
1. Go to https://app.netlify.com/sites/roaring-kulfi-cd788b/settings/domain
2. Click "Add custom domain"
3. Enter: westside.style
4. Follow prompts to verify ownership
5. Enable HTTPS (Let's Encrypt SSL)

## DNS Propagation
- Changes typically take 5-60 minutes
- Can take up to 48 hours in rare cases
- Check status: `dig westside.style +short`
- Should show: 75.2.60.5

## Testing After Migration
Once DNS propagates:

1. Visit https://westside.style/keratin-bond-seattle.html
2. Open browser DevTools → Network tab
3. Fill out and submit the consultation form
4. Verify the API call goes to `/api/send-sms` (not hardcoded URL)
5. Check Jenn's phone for SMS arrival

## Rollback Plan (if needed)
If something breaks, restore the old GitHub Pages A records:
```
Type: A
Host: @
Value: 185.199.111.153
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
```

## Post-Migration Tasks
- [ ] Test form submissions on all 3 service pages via westside.style
- [ ] Update Google Ads sitelinks from netlify.app to westside.style URLs
- [ ] Monitor form submissions for 24-48 hours
- [ ] Verify Google Analytics tracking still works

## Support
- Netlify DNS docs: https://docs.netlify.com/domains-https/custom-domains/
- name.com DNS help: https://www.name.com/support/articles/205188538
