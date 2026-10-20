const twilio = require('twilio');
const querystring = require('querystring');

// Twilio inbound-SMS webhook for the Local Services Ads line.
// Customers who reply to the auto-text land here; forward each message to
// Jenn's cell so she can text them back directly.

const OPT_OUT = /^\s*(stop|stopall|unsubscribe|cancel|end|quit|start|unstop|help|info)\s*$/i;

const emptyTwiml = {
  statusCode: 200,
  headers: { 'Content-Type': 'text/xml' },
  body: '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
};

const formatPhone = (p) => {
  const d = (p || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p || 'unknown number';
};

exports.handler = async (event) => {
  const params = querystring.parse(event.body || '');
  const url = `https://${event.headers.host}${event.path}`;
  const signature = event.headers['x-twilio-signature'];

  if (!signature || !twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN, signature, url, params)) {
    console.error('Rejected request with invalid Twilio signature');
    return { statusCode: 403, body: 'Forbidden' };
  }

  const from = params.From;
  const body = (params.Body || '').trim();
  const media = parseInt(params.NumMedia || '0', 10);

  // Ignore Jenn texting the line herself, and carrier opt-out keywords (Twilio handles those)
  if (from === process.env.RECIPIENT_PHONE || OPT_OUT.test(body)) return emptyTwiml;

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: [
        `Text from ${formatPhone(from)}:`,
        body || '(no text)',
        media > 0 ? `[+${media} photo${media > 1 ? 's' : ''} — view in Twilio]` : null,
        `Reply to them directly at ${formatPhone(from)}.`
      ].filter(Boolean).join('\n'),
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.RECIPIENT_PHONE
    });
  } catch (error) {
    console.error('Forward to Jenn failed:', error);
  }

  return emptyTwiml;
};
