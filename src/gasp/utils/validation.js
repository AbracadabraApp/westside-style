// src/gasp/utils/validation.js

const SAFETY_LIMITS = {
  MAX_NEGATIVE_KEYWORDS_PER_RUN: 10,
  MAX_BID_INCREASE_PERCENT: 0.50, // 50% max increase
  MAX_BID_DECREASE_PERCENT: 0.40, // 40% max decrease
  MIN_BID_DOLLARS: 2.00,
  MAX_BID_DOLLARS: 25.00,
  MAX_DAILY_BUDGET_CHANGE_PERCENT: 0.20 // 20% max change
};

/**
 * Validate Claude's recommendations for safety
 * @param {Object} recommendations - Claude's output
 * @returns {Object} Validated recommendations
 */
function validateRecommendations(recommendations) {
  const validated = {
    negativeKeywords: [],
    bidAdjustments: [],
    concerns: recommendations.concerns || []
  };

  // Validate negative keywords
  if (recommendations.negativeKeywords) {
    for (const negKw of recommendations.negativeKeywords) {
      // Basic validation
      if (!negKw.keyword || !negKw.matchType) {
        console.warn('Skipping invalid negative keyword:', negKw);
        continue;
      }

      // Check keyword length
      if (negKw.keyword.length < 2 || negKw.keyword.length > 80) {
        console.warn('Skipping keyword with invalid length:', negKw.keyword);
        continue;
      }

      // Check match type
      if (!['EXACT', 'PHRASE', 'BROAD'].includes(negKw.matchType)) {
        console.warn('Invalid match type, defaulting to PHRASE:', negKw);
        negKw.matchType = 'PHRASE';
      }

      validated.negativeKeywords.push(negKw);
    }
  }

  // Validate bid adjustments
  if (recommendations.bidAdjustments) {
    for (const bidAdj of recommendations.bidAdjustments) {
      if (!bidAdj.keyword || !bidAdj.recommendedBid) {
        console.warn('Skipping invalid bid adjustment:', bidAdj);
        continue;
      }

      // Check bid is in reasonable range
      if (bidAdj.recommendedBid < SAFETY_LIMITS.MIN_BID_DOLLARS) {
        console.warn(`Bid too low, adjusting to minimum: ${bidAdj.keyword}`);
        bidAdj.recommendedBid = SAFETY_LIMITS.MIN_BID_DOLLARS;
      }

      if (bidAdj.recommendedBid > SAFETY_LIMITS.MAX_BID_DOLLARS) {
        console.warn(`Bid too high, capping at maximum: ${bidAdj.keyword}`);
        bidAdj.recommendedBid = SAFETY_LIMITS.MAX_BID_DOLLARS;
      }

      validated.bidAdjustments.push(bidAdj);
    }
  }

  return validated;
}

/**
 * Apply safety limits to prevent runaway changes
 * @param {Object} recommendations - Validated recommendations
 * @returns {Object} Safe recommendations
 */
function applySafetyLimits(recommendations) {
  const safe = { ...recommendations };

  // Limit negative keywords per run
  if (safe.negativeKeywords.length > SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN) {
    console.warn(`Limiting negative keywords to ${SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN}`);
    safe.negativeKeywords = safe.negativeKeywords
      .slice(0, SAFETY_LIMITS.MAX_NEGATIVE_KEYWORDS_PER_RUN);
  }

  // Validate bid change percentages
  safe.bidAdjustments = safe.bidAdjustments.filter(bidAdj => {
    if (!bidAdj.currentBid) {
      console.warn('Missing current bid, skipping:', bidAdj.keyword);
      return false;
    }

    const changePercent = Math.abs(
      (bidAdj.recommendedBid - bidAdj.currentBid) / bidAdj.currentBid
    );

    if (bidAdj.recommendedBid > bidAdj.currentBid) {
      // Increase
      if (changePercent > SAFETY_LIMITS.MAX_BID_INCREASE_PERCENT) {
        console.warn(`Bid increase too large (${(changePercent * 100).toFixed(0)}%), skipping: ${bidAdj.keyword}`);
        return false;
      }
    } else {
      // Decrease
      if (changePercent > SAFETY_LIMITS.MAX_BID_DECREASE_PERCENT) {
        console.warn(`Bid decrease too large (${(changePercent * 100).toFixed(0)}%), skipping: ${bidAdj.keyword}`);
        return false;
      }
    }

    return true;
  });

  return safe;
}

module.exports = { validateRecommendations, applySafetyLimits, SAFETY_LIMITS };
