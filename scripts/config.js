/**
 * config.js
 * ---------------------------------------------------------------------------
 * Single source of truth for all configurable values used by the README
 * generator. Everything can be overridden with environment variables
 * (set them as repo Secrets/Variables, or in a local .env file for testing)
 * so nothing needs to be hard-coded or hand-edited later.
 * ---------------------------------------------------------------------------
 */

const path = require('path');

// Lightweight .env loader (no external dependency required).
// Only used for local development; GitHub Actions injects real env vars.
function loadDotEnv() {
  const fs = require('fs');
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

// Try to infer "owner/repo" from GitHub Actions' built-in env var.
const repoFromActions = process.env.GITHUB_REPOSITORY || '';
const [inferredOwner, inferredRepo] = repoFromActions.includes('/')
  ? repoFromActions.split('/')
  : [null, null];

const config = {
  // --- Identity -------------------------------------------------------
  authorName: process.env.AUTHOR_NAME || 'Kohinoor Singh',
  githubUsername: process.env.GITHUB_USERNAME || inferredOwner || 'your-github-username',
  leetcodeUsername: process.env.LEETCODE_USERNAME || 'your-leetcode-username',
  repoName: process.env.REPO_NAME || inferredRepo || 'leetcode-solutions',

  // --- Social / footer links ------------------------------------------
  portfolioUrl: process.env.PORTFOLIO_URL || 'https://your-portfolio.example.com',
  linkedinUrl: process.env.LINKEDIN_URL || 'https://linkedin.com/in/your-profile',

  // --- Goals ------------------------------------------------------------
  goal: parseInt(process.env.GOAL || '500', 10),
  milestones: [10, 25, 50, 100, 200, 300, 500],

  // --- Scanning behaviour -------------------------------------------
  // Directories that are never treated as "topic" folders.
  excludedDirs: [
    '.git',
    '.github',
    'node_modules',
    'scripts',
    'templates',
    '.vscode',
    'assets',
  ],
  // File extensions treated as solution files.
  solutionExtensions: ['.js', '.ts', '.mjs', '.cjs'],

  // --- Display tuning ---------------------------------------------------
  recentProblemsCount: 10,
  progressBarWidth: 20,
  topicBarWidth: 20,
  weeklyActivityDays: 7,

  // --- Paths -------------------------------------------------------------
  rootDir: path.join(__dirname, '..'),
  readmePath: path.join(__dirname, '..', 'README.md'),

  // --- Typing animation lines (readme.typing-svg or similar service) ----
  typingLines: [
    'LeetCode Journey',
    'Solving DSA in JavaScript',
    'Future Software Engineer',
    'Goal: 500+ Problems',
    'Consistency Beats Motivation',
  ],
};

module.exports = config;
