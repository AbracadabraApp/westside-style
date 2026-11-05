const twilio = require('twilio');

// Only the salon's own pages may call this function.
const ALLOWED_ORIGINS = [
  'https://westside.style',
  'https://www.westside.style',
  'https://roaring-kulfi-cd788b.netlify.app',
  'https://westside-style.netlify.app',
  'https://westsidestyle.netlify.app'
];

// Best-effort per-IP limit. Netlify reuses warm instances, so this stops
// rapid-fire abuse; it is not a durable limit across cold starts.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const LIMITS = { name: 100, phone: 30, email: 200, notes: 2000, service_type: 60, page: 200 };
const escapeHtml = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

exports.handler = async (event, context) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const originAllowed = ALLOWED_ORIGINS.includes(origin);
  const headers = {
    'Access-Control-Allow-Origin': originAllowed ? origin : ALLOWED_ORIGINS[0],
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!originAllowed) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: 'Forbidden' }) };
  }

  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || 'unknown';
  if (rateLimited(ip)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'Too many requests. Please call or try again later.' }) };
  }

  try {
    // Parse form data
    const data = JSON.parse(event.body);

    // Honeypot: a hidden "website" field that people never fill in.
    // Pretend success so bots don't learn they were caught.
    if (data.website) {
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Consultation request sent!' }) };
    }

    for (const [field, max] of Object.entries(LIMITS)) {
      if (data[field] != null && String(data[field]).length > max) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: `${field} is too long` }) };
      }
    }

    const { phone, service_type } = data;
    // Escaped copies for the HTML email; raw values are fine for SMS text.
    const name = data.name && String(data.name).trim();
    const notes = data.notes;
    const email = data.email;
    const page = data.page;
    const h = { name: name && escapeHtml(name), phone: phone && escapeHtml(phone), email: email && escapeHtml(email), notes: notes && escapeHtml(notes), service_type: service_type && escapeHtml(service_type), page: page && escapeHtml(page) };

    // Validate required fields
    if (!name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name is required' })
      };
    }

    // Format email content
    const emailSubject = `New ${service_type || 'consultation'} inquiry - ${name}`.replace(/[\r\n]/g, ' ');

    const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #C17817;">New Inquiry from Westside Style</h2>

  <div style="background: #FAF7F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 8px 0;"><strong>Page:</strong> ${h.page || 'Unknown'}</p>
    <p style="margin: 8px 0;"><strong>Service Type:</strong> ${h.service_type || 'consultation'}</p>
    <p style="margin: 8px 0;"><strong>Name:</strong> ${h.name}</p>
    ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${h.phone}</p>` : ''}
    ${email ? `<p style="margin: 8px 0;"><strong>Email:</strong> ${h.email}</p>` : ''}
    ${notes ? `<p style="margin: 8px 0;"><strong>Notes:</strong><br/>${h.notes.replace(/\n/g, '<br/>')}</p>` : ''}
  </div>

  <p style="color: #8B8680; font-size: 12px; margin-top: 30px;">
    This inquiry was submitted from westside.style
  </p>
</div>
    `.trim();

    // Text Jenn via Twilio (primary)
    const smsBody = [
      `Westside Style Lead Alert: new ${service_type || 'consultation'} inquiry from westside.style`,
      `Page: ${page || 'unknown'}`,
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      notes ? `Notes: ${notes}` : null,
      // Marker for Jenn's iPhone Shortcut, which auto-texts the customer from her own number
      phone ? `TEXT THEM NOW: ${phone}` : null,
      'Reply STOP to opt out.'
    ].filter(Boolean).join('\n');

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Lead Alerts sign-up (westside.style/lead-alerts.html): confirm the opt-in to the person who signed up
    const digits = (phone || '').replace(/\D/g, '');
    const optinPhone = digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits[0] === '1' ? `+${digits}` : null;
    const isOptin = service_type === 'lead-alerts-optin';
    if (isOptin && (!data.sms_consent || !optinPhone)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'SMS consent and a valid mobile number are required' }) };
    }

    const smsSend = client.messages.create({
      body: isOptin
        ? "Westside Style Lead Alerts: you're signed up for new customer inquiry alerts. Msg frequency varies (about 1-10/week). Msg & data rates may apply. Reply HELP for help, STOP to cancel."
        : smsBody,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: isOptin ? optinPhone : process.env.RECIPIENT_PHONE
    });

    // Email via Resend (backup, so a lead is never lost if the text fails)
    const emailSend = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Westside Style <onboarding@resend.dev>',
        to: process.env.RECIPIENT_EMAIL,
        subject: emailSubject,
        html: emailBody
      })
    }).then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to send email');
      return result;
    });

    const [sms, mail] = await Promise.allSettled([smsSend, emailSend]);

    if (sms.status === 'fulfilled') console.log('SMS sent successfully:', sms.value.sid);
    else console.error('SMS failed:', sms.reason);
    if (mail.status === 'fulfilled') console.log('Email sent successfully:', mail.value.id);
    else console.error('Email failed:', mail.reason);

    if (sms.status === 'rejected' && mail.status === 'rejected') {
      throw new Error(`SMS: ${sms.reason.message}; Email: ${mail.reason.message}`);
    }

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Consultation request sent!',
        sms: sms.status === 'fulfilled',
        messageSid: sms.status === 'fulfilled' ? sms.value.sid : null,
        emailId: mail.status === 'fulfilled' ? mail.value.id : null
      })
    };

  } catch (error) {
    console.error('Error sending message:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send message'
      })
    };
  }
};
