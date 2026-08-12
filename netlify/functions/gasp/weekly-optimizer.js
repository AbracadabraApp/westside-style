// netlify/functions/gasp/weekly-optimizer.js

const { schedule } = require('@netlify/functions');
const GaspOptimizer = require('../../../src/gasp/optimizer');

/**
 * Weekly GASP optimization
 * Runs every Monday at 9:00 AM Pacific Time
 * Cron: 0 17 * * 1 (9 AM PT = 5 PM UTC, accounting for DST complexity)
 */
const handler = schedule('0 17 * * 1', async (event) => {
  console.log('=== GASP Weekly Optimization Triggered ===');
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const optimizer = new GaspOptimizer();
    const results = await optimizer.runWeeklyOptimization();

    // Send success notification (email, Slack, etc.)
    // await sendNotification('GASP Weekly Optimization Complete', results);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'GASP weekly optimization complete',
        timestamp: new Date().toISOString(),
        results: {
          actionsCount: results.actions.length,
          errorsCount: results.errors.length,
          summary: results.claudeSummary
        }
      })
    };

  } catch (error) {
    console.error('GASP optimization failed:', error);

    // Send error notification
    // await sendNotification('GASP Optimization Failed', { error: error.message });

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
});

module.exports = { handler };
