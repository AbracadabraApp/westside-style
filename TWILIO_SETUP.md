# Twilio SMS Integration Setup Guide

## Overview
Your landing pages now submit forms directly to Netlify serverless function, which sends SMS to Jenn's phone via Twilio. No SMS app popup required - direct submission!

## Benefits
✅ Direct submission - no SMS app leak
✅ Keeps users on westside.style domain
✅ Full conversion tracking maintained
✅ Free (using existing Twilio account)
✅ Professional user experience

## Setup Steps

### 1. Get Your Twilio Credentials

Log into your Twilio account and get:

1. **Account SID**
   - Found at: https://console.twilio.com/
   - Looks like: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Auth Token**
   - Click "Show" next to Auth Token on console
   - Looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

3. **Twilio Phone Number**
   - Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
   - Copy your Twilio number (format: `+1xxxxxxxxxx`)

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Connect GitHub to Netlify:**
   - Go to: https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select repository: `AbracadabraApp/westside-style`

2. **Configure Build Settings:**
   - Build command: (leave empty)
   - Publish directory: `.`
   - Click "Deploy site"

3. **Add Environment Variables:**
   - Go to Site Settings → Environment variables
   - Click "Add a variable"
   - Add these 4 variables:

   ```
   Key: TWILIO_ACCOUNT_SID
   Value: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (your actual SID)

   Key: TWILIO_AUTH_TOKEN
   Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (your actual token)

   Key: TWILIO_PHONE_NUMBER
   Value: +1xxxxxxxxxx (your Twilio number)

   Key: RECIPIENT_PHONE
   Value: +12062954549 (Jenn's phone)
   ```

4. **Redeploy:**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

#### Option B: Deploy via Netlify CLI (Advanced)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Set environment variables
netlify env:set TWILIO_ACCOUNT_SID "ACxxxxxx..."
netlify env:set TWILIO_AUTH_TOKEN "xxxxxxxx..."
netlify env:set TWILIO_PHONE_NUMBER "+1xxxxxxxxxx"
netlify env:set RECIPIENT_PHONE "+12062954549"
```

### 3. Get Your Endpoint URL

After deployment, Netlify gives you a URL like:
```
https://westside-style.netlify.app
```

Your SMS function will be available at:
```
https://westside-style.netlify.app/.netlify/functions/send-sms
```

Or with the redirect:
```
https://westside-style.netlify.app/api/send-sms
```

### 4. Update Landing Pages

Update the `submitContact()` function in each landing page to use the new endpoint.

**Current code (opens SMS app):**
```javascript
setTimeout(() => {
    window.location.href = `sms:2062954549?body=${encodeURIComponent(body)}`;
}, 500);
```

**New code (direct submission):**
```javascript
// Send to serverless function
fetch('https://westside-style.netlify.app/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        notes: notes,
        service_type: 'keratin_bond', // Change per page
        page: window.location.pathname
    })
})
.then(response => response.json())
.then(data => {
    btn.textContent = '✓ Message Sent!';
    setTimeout(() => closeContactModal(), 2000);
})
.catch(error => {
    console.error('Error:', error);
    btn.textContent = 'Error - Please call instead';
    btn.disabled = false;
});
```

### 5. Test the Flow

1. **Visit a landing page:** https://westside.style/keratin-bond-extensions-seattle.html
2. **Click "FREE CONSULTATION"**
3. **Fill out the form**
4. **Click "TEXT JENN THIS INFO"**
5. **Check Jenn's phone** - should receive SMS within seconds

### 6. Monitor & Debug

**View Logs:**
- Netlify Dashboard → Functions → send-sms → Function logs
- Twilio Console → Monitor → Logs → Messaging

**Test the function directly:**
```bash
curl -X POST https://westside-style.netlify.app/api/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "206-555-1234",
    "email": "test@example.com",
    "notes": "This is a test",
    "service_type": "keratin_bond",
    "page": "/keratin-bond-extensions-seattle.html"
  }'
```

## Cost Breakdown

### Netlify (FREE Tier):
- 100GB bandwidth/month
- 300 build minutes/month
- 125K function requests/month
- **Your usage:** ~10-50 requests/month = FREE

### Twilio Costs:
- SMS (US): $0.0075 per message
- **Your volume:** ~20-50 leads/month = $0.15-$0.38/month
- **Using your existing Twilio account**

### Total Monthly Cost: ~$0.15-$0.38 🎉

## Comparison

### Before (SMS App Method):
1. User fills form
2. Opens SMS app
3. ❌ **30-50% abandon here**
4. User must send manually

### After (Direct Submit):
1. User fills form
2. ✅ **Instant submission**
3. SMS sent to Jenn automatically
4. 0% leak rate

### Result:
**Potentially 2x more leads with same traffic!**

## Troubleshooting

### SMS not being sent:
- Check Netlify function logs for errors
- Verify environment variables are set correctly
- Check Twilio console for API errors
- Ensure Twilio account has credits

### CORS errors in browser:
- Headers are already configured in function
- Make sure you're using the correct endpoint URL

### Form not submitting:
- Check browser console for JavaScript errors
- Verify endpoint URL is correct
- Test endpoint with curl command above

## Next Steps

Once deployed and tested:

1. ✅ Update all 3 tracked landing pages (keratin, hand-tied, tape-in)
2. ✅ Monitor conversion rates (should increase!)
3. ✅ Check Twilio usage/costs after first month
4. ✅ Consider adding email backup notification
5. ✅ Add SMS auto-reply from Jenn's number (optional)

## Security Notes

- ✅ Environment variables are encrypted
- ✅ Function only accepts POST requests
- ✅ CORS headers prevent unauthorized use
- ✅ No API keys exposed to browser
- ✅ Twilio credentials never in client code

---

**Questions?** Check Netlify docs: https://docs.netlify.com/functions/overview/
