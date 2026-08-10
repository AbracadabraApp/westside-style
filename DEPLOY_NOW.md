# Quick Deployment Guide - Go Live Now

## Step 1: Connect GitHub to Netlify (5 minutes)

1. **Go to Netlify:**
   - Visit: https://app.netlify.com/
   - Sign up/login (free account)

2. **Import Repository:**
   - Click **"Add new site"** button
   - Click **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access GitHub
   - Select repository: **`AbracadabraApp/westside-style`**

3. **Configure Build Settings:**
   ```
   Branch to deploy: main
   Build command: (leave empty)
   Publish directory: .
   ```
   - Click **"Deploy site"**
   - Wait ~2 minutes for initial deploy

4. **Note Your Site URL:**
   - Netlify assigns: `https://[random-name].netlify.app`
   - You can change this in Site Settings → Domain Management

---

## Step 2: Add Twilio Environment Variables (2 minutes)

You need 4 credentials from your Twilio account:

1. **Get Twilio Credentials:**
   - Go to: https://console.twilio.com/
   - Copy **Account SID** (starts with AC...)
   - Click "Show" and copy **Auth Token**
   - Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
   - Copy your **Twilio Phone Number** (format: +1XXXXXXXXXX)

2. **Add to Netlify:**
   - In Netlify: **Site Settings** → **Environment variables**
   - Click **"Add a variable"** → **"Add a single variable"**
   - Add each of these 4 variables:

   ```
   Variable 1:
   Key: TWILIO_ACCOUNT_SID
   Value: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (paste your actual SID)

   Variable 2:
   Key: TWILIO_AUTH_TOKEN
   Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (paste your actual token)

   Variable 3:
   Key: TWILIO_PHONE_NUMBER
   Value: +1XXXXXXXXXX (paste your Twilio number)

   Variable 4:
   Key: RECIPIENT_PHONE
   Value: +12062954549 (Jenn's phone)
   ```

---

## Step 3: Redeploy with Environment Variables (1 minute)

1. **Trigger Redeploy:**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Wait ~2 minutes

2. **Verify Function Deployed:**
   - Go to **"Functions"** tab
   - You should see: `send-sms`
   - Status should be: Active

---

## Step 4: Update Landing Pages with Production URL (1 minute)

Your Netlify URL will be something like: `https://westside-style-xxxxx.netlify.app`

Update the 3 landing pages to use YOUR actual Netlify URL:

**Files to update:**
- keratin-bond-extensions-seattle.html (line 432)
- hand-tied-extensions-seattle.html (line 432)
- tape-in-extensions-seattle.html (line 432)

**Change from:**
```javascript
fetch('https://westside-style.netlify.app/api/send-sms', {
```

**To:**
```javascript
fetch('https://YOUR-ACTUAL-SITE.netlify.app/api/send-sms', {
```

Then commit and push:
```bash
git add .
git commit -m "Update serverless endpoint to production URL"
git push
```

Netlify will auto-deploy in ~2 minutes.

---

## Step 5: Test Live (1 minute)

1. **Visit Live Page:**
   - Go to: `https://YOUR-SITE.netlify.app/keratin-bond-extensions-seattle.html`

2. **Submit Test Form:**
   - Fill in: Name, Phone, Email, Notes
   - Click **"TEXT JENN THIS INFO"**
   - Button should show: "Sending..." then "✓ Message Sent to Jenn!"

3. **Check Jenn's Phone:**
   - Should receive SMS within 5 seconds
   - Message format:
     ```
     New keratin_bond inquiry from westside.style
     Page: Keratin Bond Extensions
     Name: [your test name]
     Phone: [your test phone]
     Email: [your test email]
     Notes: [your test notes]
     ```

4. **If SMS Received:** ✅ **YOU'RE LIVE!**

---

## Step 6: Point Custom Domain (Optional, 10 minutes)

If you want to use `westside.style` instead of `xxx.netlify.app`:

1. **In Netlify:**
   - Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter: `westside.style`

2. **Update DNS:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add A record pointing to Netlify's load balancer IP
   - Netlify will show you the exact DNS records needed

3. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificate
   - Takes ~1 hour to activate

---

## Troubleshooting

### SMS Not Received

**Check Netlify Function Logs:**
- Netlify Dashboard → Functions → send-sms → Function logs
- Look for errors

**Check Twilio Console:**
- https://console.twilio.com/us1/monitor/logs/sms
- Verify message was sent
- Check for delivery failures

**Common Issues:**
- ❌ Wrong RECIPIENT_PHONE format (must be +12062954549)
- ❌ Twilio account out of credits
- ❌ Twilio number not verified for SMS
- ❌ Auth Token incorrect

### CORS Error in Browser

**Check:**
- Function logs show request received
- netlify.toml redirect is active
- Clear browser cache and try again

### "Error - Please call instead" Message

**This means:**
- Function returned 500 error
- Check Netlify function logs for details
- Usually Twilio credentials issue

---

## Cost Reminder

**Netlify:** FREE (under 125K function requests/month)
**Twilio:** $0.0075 per SMS (~$0.23/month for 30 leads)

---

## Next Step After Testing

Once you confirm SMS is working:

1. Update Google Ads campaigns with UTM parameters
2. Monitor conversion tracking in Google Ads dashboard
3. Check Twilio usage after first week
4. Consider updating remaining 3 landing pages

---

**Ready? Let's deploy! Follow Step 1 above.**
