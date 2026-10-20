const twilio = require('twilio');
const querystring = require('querystring');

// Twilio voice webhook for the Local Services Ads phone line.
// Jenn doesn't take calls: answer with a short greeting and alert Jenn with the
// caller's number. Customers are only ever texted by Jenn, from her own phone.


// Callers with caller ID: we capture their number and Jenn texts them back from her own phone
const GREETING =
  "Hi, thanks for calling Westside Style hair extensions. Jenn is with clients and doesn't take phone calls, " +
  "but we've got your number, and Jenn will text you shortly. Talk soon!";
// Blocked caller ID: we can't capture the number, so point them to the website
const GREETING_NO_TEXT =
  "Hi, thanks for calling Westside Style hair extensions. Jenn is with clients and doesn't take phone calls, " +
  "and your caller ID is blocked, so we can't text you back. " +
  'Please visit westside dot style to send Jenn a message or book a free consultation. Thank you!';

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

  try {
    const alert = [
      `Local Services call from ${formatPhone(caller)} at ${when}.`,
      textable ? 'They were told you will text them shortly.' : 'Caller ID was blocked; they were sent to westside.style.',
      textable ? `TEXT THEM NOW: ${formatPhone(caller)}` : null
    ].filter(Boolean).join('\n');

    await client.messages.create({
      body: alert,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.RECIPIENT_PHONE
    });
  } catch (error) {
    // Never leave the caller on a dead line because a text failed
    console.error('Text failed:', error);
  }

  return twiml(textable ? GREETING : GREETING_NO_TEXT);
};
