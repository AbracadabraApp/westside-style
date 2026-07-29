# Westside Style

Luxury hair salon website for Westside Style (@_westside_style_)

## Features

- Responsive single-page design
- Editorial aesthetic with modern touches
- Services and pricing menu
- Instagram gallery integration
- Online booking section
- Mobile-responsive navigation

## Setup

### Option 1: GitHub Pages (Free Hosting)

1. Fork or clone this repository
2. Go to Settings → Pages
3. Source: Deploy from a branch
4. Branch: main / root
5. Save and wait for deployment

Your site will be available at: `https://[username].github.io/westside-style/`

### Option 2: Custom Domain (westside.style)

1. Follow GitHub Pages setup above
2. In Settings → Pages → Custom domain
3. Add: `westside.style`
4. Configure DNS records with your domain provider:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `[username].github.io`

## Instagram Integration

To display your actual Instagram feed:
1. Follow the instructions in `instagram-api-setup.md`
2. Get your Instagram API access token
3. Replace `'YOUR_ACCESS_TOKEN'` in index.html

## Customization

Update these sections with your information:
- Business hours
- Phone number
- Address
- Services and pricing
- Hero background image

## Technologies

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Instagram Graph API (optional)

## License

© 2024 Westside Style. All rights reserved.