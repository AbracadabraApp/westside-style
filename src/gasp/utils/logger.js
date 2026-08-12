// src/gasp/utils/logger.js

const fs = require('fs').promises;
const path = require('path');

const LOG_DIR = path.join(__dirname, '../../../logs');

/**
 * Log optimization results
 */
async function logOptimization(results) {
  try {
    // Ensure log directory exists
    await fs.mkdir(LOG_DIR, { recursive: true });

    // Create log entry
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...results
    };

    // Log to file (one file per day)
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `gasp-${date}.json`);

    // Read existing logs
    let logs = [];
    try {
      const existingData = await fs.readFile(logFile, 'utf8');
      logs = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist yet, that's OK
    }

    // Append new log
    logs.push(logEntry);

    // Write back
    await fs.writeFile(logFile, JSON.stringify(logs, null, 2));

    console.log(`✓ Logged optimization to ${logFile}`);

    // Also log to console (for Netlify logs)
    console.log('Optimization Results:', JSON.stringify(logEntry, null, 2));

  } catch (error) {
    console.error('Failed to write log file:', error);
    // Don't throw - logging failure shouldn't stop optimization
  }
}

/**
 * Get recent logs
 */
async function getRecentLogs(days = 7) {
  try {
    const logs = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const logFile = path.join(LOG_DIR, `gasp-${dateStr}.json`);

      try {
        const data = await fs.readFile(logFile, 'utf8');
        const dayLogs = JSON.parse(data);
        logs.push(...dayLogs);
      } catch (error) {
        // Log file doesn't exist for this day
      }
    }

    return logs;

  } catch (error) {
    console.error('Failed to read logs:', error);
    return [];
  }
}

module.exports = { logOptimization, getRecentLogs };
