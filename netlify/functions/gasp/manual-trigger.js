// netlify/functions/gasp/manual-trigger.js

const GaspOptimizer = require('../../../src/gasp/optimizer');

/**
 * Manual trigger for GASP optimization
 * Call this endpoint to run optimization on-demand
 *
 * Usage: POST /.netlify/functions/gasp/manual-trigger
 */
exports.handler = async (event, context) => {
  // Simple API key auth for security
  const apiKey = event.headers['x-api-key'];

  if (apiKey !== process.env.GASP_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  console.log('=== GASP Manual Trigger ===');

  try {
    const optimizer = new GaspOptimizer();

    // Check what type of optimization to run
    const action = event.queryStringParameters?.action || 'weekly';

    let results;

    if (action === 'health') {
      results = await optimizer.runHealthCheck();
    } else {
      results = await optimizer.runWeeklyOptimization();
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        action,
        timestamp: new Date().toISOString(),
        results
      })
    };

  } catch (error) {
    console.error('Manual optimization failed:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
