// src/gasp/utils/oauth-helper.js

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const url = require('url');
const open = require('open');

const SCOPES = ['https://www.googleapis.com/auth/adwords'];
const TOKEN_PATH = path.join(__dirname, '../../../.google-ads-token.json');
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

/**
 * Generate OAuth2 client
 */
function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
    REDIRECT_URI
  );
}

/**
 * Generate refresh token (run once)
 * Usage: node src/gasp/utils/oauth-helper.js
 */
async function generateRefreshToken() {
  const oAuth2Client = getOAuth2Client();

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force to get refresh token
  });

  console.log('\n=== Google Ads OAuth Setup ===\n');
  console.log('1. Opening browser to authorize GASP...');
  console.log('2. Sign in with your Google Ads account');
  console.log('3. Grant permissions');
  console.log('\nIf browser doesn\'t open, visit this URL:\n');
  console.log(authorizeUrl);
  console.log('\n');

  // Open browser
  await open(authorizeUrl);

  // Start local server to receive callback
  const server = http.createServer(async (req, res) => {
    try {
      if (req.url.indexOf('/oauth2callback') > -1) {
        const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
        const code = qs.get('code');

        res.end('Authentication successful! You can close this window and return to terminal.');

        const { tokens } = await oAuth2Client.getToken(code);

        // Save refresh token
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));

        console.log('\n✅ Success! Refresh token saved to:', TOKEN_PATH);
        console.log('\nRefresh token:', tokens.refresh_token);
        console.log('\n📝 Add this to your .env.local:');
        console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}`);

        server.close();
        process.exit(0);
      }
    } catch (error) {
      console.error('Error during OAuth:', error);
      res.end('Authentication failed. Check terminal for error.');
      server.close();
      process.exit(1);
    }
  });

  server.listen(3000, () => {
    console.log('Listening for OAuth callback on http://localhost:3000');
  });
}

// If run directly, generate refresh token
if (require.main === module) {
  generateRefreshToken().catch(console.error);
}

module.exports = { getOAuth2Client };
