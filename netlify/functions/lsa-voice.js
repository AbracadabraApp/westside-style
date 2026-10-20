const twilio = require('twilio');
const querystring = require('querystring');

// Twilio voice webhook for the Local Services Ads phone line.
// Jenn doesn't take calls: answer with a short greeting, text the caller
// so the conversation moves to text, and alert Jenn with the caller's number.

const JENN_DISPLAY = '(206) 295-4549';
const DEDUPE_HOURS = 12;

// Callers with caller ID: we capture their number and Jenn texts them back from her own phone
const GREETING =
  "Hi, thanks for calling Westside Style hair extensions. Jenn is with clients and doesn't take phone calls, " +
  "but we've got your number, and Jenn will text you shortly. Talk soon!";
// Blocked caller ID: we can't capture the number, so point them to the website
const GREETING_NO_TEXT =
  "Hi, thanks for calling Westside Style hair extensions. Jenn is with clients and doesn't take phone calls, " +
  "and your caller ID is blocked, so we can't text you back. " +
  'Please visit westside dot style to send Jenn a message or book a free consultation. Thank you!';

const CALLER_TEXT =
  "Hi! Thanks for calling Westside Style Hair Extensions. We got your number and Jenn will text you shortly " +
  `from ${JENN_DISPLAY}. You can also book a free consultation: westside.style/consultation`;

const twiml = (say) => ({
  statusCode: 200,
  headers: { 'Content-Type': 'text/xml' },
  body: `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Joanna">${say}</Say><Hangup/></Response>`
});

const formatPhone = (p) => {
  const d = (p || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p || 'unknown number';
};

// Blocked / anonymous callers can't be texted
const isTextable = (p) => /^\+1\d{10}$/.test(p || '');

exports.handler = async (event) => {
  const params = querystring.parse(event.body || '');
  const url = `https://${event.headers.host}${event.path}`;
  const signature = event.headers['x-twilio-signature'];

  // Only Twilio may trigger texts
  if (!signature || !twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN, signature, url, params)) {
    console.error('Rejected request with invalid Twilio signature');
    return { statusCode: 403, body: 'Forbidden' };
  }

  const caller = params.From;
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const when = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' });
  const textable = isTextable(caller);

  let texted = false;
  try {
    if (textable) {
      // Callers often redial several times in a row; only text them once
      const since = new Date(Date.now() - DEDUPE_HOURS * 3600 * 1000);
      const recent = await client.messages.list({ to: caller, dateSentAfter: since, limit: 1 });
      if (recent.length === 0) {
        await client.messages.create({
          body: CALLER_TEXT,
          messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
          to: caller
        });
        texted = true;
      }
    }

    const alert = [
      `Local Services call from ${formatPhone(caller)} at ${when}.`,
      textable ? 'They were told you will text them shortly.' : 'Caller ID was blocked; they were sent to westside.style.',
      textable ? `TEXT THEM NOW: ${formatPhone(caller)}` : null
    ].filter(Boolean).join('\n');

    const [sms, mail] = await Promise.allSettled([
      client.messages.create({
        body: alert,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: process.env.RECIPIENT_PHONE
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Westside Style <onboarding@resend.dev>',
          to: process.env.RECIPIENT_EMAIL,
          subject: `Local Services call from ${formatPhone(caller)} - text them back`,
          text: alert
        })
      }).then(r => { if (!r.ok) throw new Error(`Resend ${r.status}`); })
    ]);
    if (sms.status === 'rejected') console.error('Alert text failed:', sms.reason);
    if (mail.status === 'rejected') console.error('Alert email failed:', mail.reason);
  } catch (error) {
    // Never leave the caller on a dead line because a text failed
    console.error('Text failed:', error);
  }

  return twiml(textable ? GREETING : GREETING_NO_TEXT);
};
