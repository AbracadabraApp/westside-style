const twilio = require('twilio');

exports.handler = async (event, context) => {
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
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

    // Format email content
    const emailSubject = `New ${service_type || 'consultation'} inquiry - ${name}`;

    const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #C17817;">New Inquiry from Westside Style</h2>

  <div style="background: #FAF7F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 8px 0;"><strong>Page:</strong> ${page || 'Unknown'}</p>
    <p style="margin: 8px 0;"><strong>Service Type:</strong> ${service_type || 'consultation'}</p>
    <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
    ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
    ${email ? `<p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>` : ''}
    ${notes ? `<p style="margin: 8px 0;"><strong>Notes:</strong><br/>${notes.replace(/\n/g, '<br/>')}</p>` : ''}
  </div>

  <p style="color: #8B8680; font-size: 12px; margin-top: 30px;">
    This inquiry was submitted from westside.style
  </p>
</div>
    `.trim();

    // Text Jenn via Twilio (primary)
    const smsBody = [
      `New ${service_type || 'consultation'} inquiry from westside.style`,
      `Page: ${page || 'unknown'}`,
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      notes ? `Notes: ${notes}` : null
    ].filter(Boolean).join('\n');

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const smsSend = client.messages.create({
      body: smsBody,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.RECIPIENT_PHONE
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
        error: 'Failed to send message',
        details: error.message
      })
    };
  }
};
