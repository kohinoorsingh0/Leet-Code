/**
 * leetcodeApi.js
 * ---------------------------------------------------------------------------
 * Fetches live stats from LeetCode's public (unauthenticated) GraphQL
 * endpoint. LeetCode does not offer an official public REST API, so this
 * uses the same GraphQL endpoint leetcode.com's own site uses for public
 * profile pages — no API key or login required.
 *
 * Network calls can fail (rate limits, outages, invalid username, CI
 * running without network access). In every failure case this module
 * returns `null` rather than throwing, so the README generator can fall
 * back to "stats unavailable" instead of breaking the whole build.
 * ---------------------------------------------------------------------------
 */

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';
const REQUEST_TIMEOUT_MS = 10000;

const PROFILE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        realName
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
      attendedContestsCount
    }
  }
`;

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches LeetCode profile + contest stats for a given username.
 * Returns null on any failure (network error, bad username, API shape
 * change, timeout) so callers can degrade gracefully.
 */
async function fetchLeetCodeStats(username) {
  if (!username || username === 'your-leetcode-username') {
    console.warn('ℹ️  LEETCODE_USERNAME not configured — skipping live LeetCode stats.');
    return null;
  }

  try {
    const response = await fetchWithTimeout(
      LEETCODE_GRAPHQL_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Referer: `https://leetcode.com/${username}/`,
        },
        body: JSON.stringify({
          query: PROFILE_QUERY,
          variables: { username },
        }),
      },
      REQUEST_TIMEOUT_MS
    );

    if (!response.ok) {
      console.warn(`⚠️  LeetCode API responded with status ${response.status}`);
      return null;
    }

    const json = await response.json();

    if (json.errors || !json.data || !json.data.matchedUser) {
      console.warn('⚠️  LeetCode API returned no data for this username.');
      return null;
    }

    const { matchedUser, userContestRanking } = json.data;
    const submissions = matchedUser.submitStatsGlobal.acSubmissionNum || [];

    const findCount = (difficulty) =>
      submissions.find((s) => s.difficulty === difficulty)?.count ?? 0;

    return {
      username: matchedUser.username,
      totalSolved: findCount('All'),
      easySolved: findCount('Easy'),
      mediumSolved: findCount('Medium'),
      hardSolved: findCount('Hard'),
      ranking: matchedUser.profile?.ranking ?? null,
      contestRating: userContestRanking?.rating
        ? Math.round(userContestRanking.rating)
        : null,
      globalContestRank: userContestRanking?.globalRanking ?? null,
      contestsAttended: userContestRanking?.attendedContestsCount ?? null,
    };
  } catch (err) {
    console.warn(`⚠️  Failed to fetch LeetCode stats: ${err.message}`);
    return null;
  }
}

module.exports = { fetchLeetCodeStats };
