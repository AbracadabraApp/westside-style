const twilio = require('twilio');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Enable CORS for your domain
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Parse form data
    const data = JSON.parse(event.body);
    const { name, phone, email, notes, service_type, page } = data;

    // Validate required fields
    if (!name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name is required' })
      };
    }

    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Format SMS message
    const smsBody = [
      `New ${service_type || 'consultation'} inquiry from westside.style`,
      `Page: ${page || 'unknown'}`,
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      notes ? `Notes: ${notes}` : null
    ].filter(Boolean).join('\n');

    // Send SMS via Twilio Messaging Service
    const message = await client.messages.create({
      body: smsBody,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.RECIPIENT_PHONE // Jenn's phone: +12062954549
    });

    console.log('SMS sent successfully:', message.sid);

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Consultation request sent!',
        messageSid: message.sid
      })
    };

  } catch (error) {
    console.error('Error sending SMS:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send message',
        details: error.message
      })
    };
  }
};
