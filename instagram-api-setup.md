# Instagram API Setup Guide for @_westside_style_

## Overview
To display the actual Instagram feed from @_westside_style_ on your salon landing page, you'll need to set up Instagram's Basic Display API and obtain an access token.

## Step-by-Step Setup Instructions

### 1. Prerequisites
- A Facebook Developer Account (free to create)
- Admin access to the @_westside_style_ Instagram account
- The Instagram account must be a Business or Creator account

### 2. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Consumer" as the app type
4. Fill in the app details:
   - App Name: "Westside Style Website"
   - App Contact Email: your email
   - App Purpose: Business

### 3. Add Instagram Basic Display Product

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Click "Create New App" under Instagram Basic Display
4. Fill in required fields:
   - Display Name: "Westside Style Feed"
   - Redirect URIs: `https://yourdomain.com/` (use your actual domain)
   - Deauthorize Callback URL: `https://yourdomain.com/`
   - Data Deletion Request URL: `https://yourdomain.com/`

### 4. Add Instagram Test User

1. Go to Roles → Roles in the left sidebar
2. Click "Add Instagram Testers"
3. Enter the @_westside_style_ Instagram username
4. The account owner must accept the invitation:
   - Go to Instagram.com → Settings → Apps and Websites
   - Click on "Tester Invites"
   - Accept the invitation

### 5. Generate Access Token

1. Go back to Instagram Basic Display → Basic Display
2. Click "Generate Token" next to your test user
3. Log in with the @_westside_style_ account credentials
4. Authorize the app
5. Copy the generated access token

### 6. Make Token Long-Lived (Optional but Recommended)

Short-lived tokens expire after 1 hour. To get a 60-day token:

```bash
curl -i -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={app-secret}&access_token={short-lived-access-token}"
```

To refresh a long-lived token before it expires:

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={long-lived-access-token}"
```

### 7. Update Your Website

1. Open `salon-landing-page.html`
2. Find line 647 (or search for `'YOUR_ACCESS_TOKEN'`)
3. Replace it with your actual access token:

```javascript
// Before
const instagramFeed = new InstagramFeed('instagram-grid', 'YOUR_ACCESS_TOKEN');

// After
const instagramFeed = new InstagramFeed('instagram-grid', 'YOUR_ACTUAL_TOKEN_HERE');
```

## Important Security Notes

⚠️ **Never expose your access token in client-side code for production websites!**

For production, you should:
1. Create a server-side endpoint that stores the token securely
2. Make the API call from your server
3. Return the Instagram data to your frontend
4. This prevents token theft and abuse

## Alternative: Embedding Instagram Posts

If API setup is too complex, you can manually embed specific posts:

1. Go to any @_westside_style_ post on Instagram
2. Click the three dots (...) menu
3. Select "Embed"
4. Copy the embed code
5. Replace the placeholder images in the gallery section

## Testing

After setup, open your `salon-landing-page.html` in a browser. You should see:
- Real posts from @_westside_style_ in the gallery
- Clicking posts opens them on Instagram
- The gallery updates automatically when new posts are added

## Troubleshooting

### Common Issues:

1. **"Invalid Access Token"**
   - Token may have expired (regenerate it)
   - Token wasn't copied completely

2. **No images showing**
   - Check browser console for errors
   - Verify the Instagram account is public
   - Ensure the token has proper permissions

3. **CORS errors**
   - This usually means you're testing locally
   - Deploy to a web server or use a local server (e.g., `python -m http.server`)

## Support Resources

- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [API Reference](https://developers.facebook.com/docs/instagram-basic-display-api/reference)
- [Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)

## Contact for Help

If you encounter issues with the API setup, consider:
1. Using a third-party Instagram feed service (Elfsight, Behold, etc.)
2. Manually updating the gallery with selected images
3. Hiring a developer for the API integration