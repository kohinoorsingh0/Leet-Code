/**
 * githubStats.js
 * ---------------------------------------------------------------------------
 * Derives repository-level statistics directly from git history, so no
 * GitHub API token is strictly required for these numbers (the GitHub
 * Actions checkout already gives us the full git log when configured with
 * fetch-depth: 0).
 *
 * Every function here fails soft: if git isn't available, or history is
 * shallow, we return a reasonable fallback rather than throwing.
 * ---------------------------------------------------------------------------
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function git(cmd, cwd) {
  try {
    return execSync(`git ${cmd}`, { cwd, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    return '';
  }
}

function isGitRepo(cwd) {
  return git('rev-parse --is-inside-work-tree', cwd) === 'true';
}

/** Total number of commits on the current branch. */
function getTotalCommits(cwd) {
  if (!isGitRepo(cwd)) return 0;
  const out = git('rev-list --count HEAD', cwd);
  return out ? parseInt(out, 10) : 0;
}

/** ISO timestamp of the most recent commit (falls back to "now"). */
function getLastCommitDate(cwd) {
  if (!isGitRepo(cwd)) return new Date().toISOString();
  const out = git('log -1 --format=%aI', cwd);
  return out || new Date().toISOString();
}

/**
 * Returns the date (YYYY-MM-DD) a specific file was first added to git
 * history. Falls back to the filesystem mtime if git has no record
 * (e.g. the file is new/uncommitted).
 */
function getFileAddedDate(filePath, cwd) {
  if (isGitRepo(cwd)) {
    const out = git(
      `log --diff-filter=A --follow --format=%aI -- "${path.relative(cwd, filePath)}"`,
      cwd
    );
    if (out) {
      const dates = out.split('\n').filter(Boolean);
      return dates[dates.length - 1]; // earliest = first "Added" entry
    }
  }
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Computes the current daily commit streak (consecutive days with at least
 * one commit, counting backward from today or yesterday).
 */
function getCommitStreak(cwd) {
  if (!isGitRepo(cwd)) return 0;
  const out = git('log --format=%ad --date=short', cwd);
  if (!out) return 0;

  const uniqueDates = [...new Set(out.split('\n').filter(Boolean))]
    .map((d) => new Date(d))
    .sort((a, b) => b - a); // newest first

  if (uniqueDates.length === 0) return 0;

  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = new Date(uniqueDates[0]);
  mostRecent.setHours(0, 0, 0, 0);

  const daysSinceMostRecent = Math.round((today - mostRecent) / oneDay);
  if (daysSinceMostRecent > 1) return 0; // streak broken (no commit today or yesterday)

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const curr = new Date(uniqueDates[i - 1]);
    curr.setHours(0, 0, 0, 0);
    const prev = new Date(uniqueDates[i]);
    prev.setHours(0, 0, 0, 0);
    const diff = Math.round((curr - prev) / oneDay);
    if (diff === 1) {
      streak++;
    } else if (diff === 0) {
      continue; // same day, shouldn't happen post-dedup but guard anyway
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Returns commit counts for the last `days` days, oldest first, as
 * [{ date: 'YYYY-MM-DD', count: number }].
 */
function getWeeklyActivity(cwd, days = 7) {
  const result = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const counts = {};
  if (isGitRepo(cwd)) {
    const out = git('log --format=%ad --date=short', cwd);
    if (out) {
      for (const dateStr of out.split('\n').filter(Boolean)) {
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      }
    }
  }

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, count: counts[key] || 0 });
  }

  return result;
}

/**
 * Walks the repo counting file extensions (excluding config-defined
 * excluded directories) to build a rough "languages used" breakdown.
 */
function getLanguageStats(rootDir, excludedDirs) {
  const extToLang = {
    '.js': 'JavaScript',
    '.ts': 'TypeScript',
    '.mjs': 'JavaScript',
    '.cjs': 'JavaScript',
    '.md': 'Markdown',
    '.yml': 'YAML',
    '.yaml': 'YAML',
    '.json': 'JSON',
  };

  const counts = {};

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (excludedDirs.includes(entry.name)) continue;
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        const lang = extToLang[ext];
        if (lang) counts[lang] = (counts[lang] || 0) + 1;
      }
    }
  }

  walk(rootDir);

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .map(([lang, count]) => ({ lang, count, percent: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count);
}

/** Latest N commits as [{ hash, message, date }]. */
function getRecentCommits(cwd, count = 5) {
  if (!isGitRepo(cwd)) return [];
  const out = git(`log -${count} --format="%h|||%s|||%ad" --date=short`, cwd);
  if (!out) return [];
  return out
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [hash, message, date] = line.split('|||');
      return { hash, message, date };
    });
}

module.exports = {
  getTotalCommits,
  getLastCommitDate,
  getFileAddedDate,
  getCommitStreak,
  getWeeklyActivity,
  getLanguageStats,
  getRecentCommits,
  isGitRepo,
};
