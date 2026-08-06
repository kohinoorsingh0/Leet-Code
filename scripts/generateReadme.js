#!/usr/bin/env node
/**
 * generateReadme.js
 * ---------------------------------------------------------------------------
 * The single entry point for the whole automation. Run via:
 *
 *     node scripts/generateReadme.js
 *
 * It scans the repository for solved LeetCode problems, gathers git and
 * (optionally) live LeetCode.com stats, and writes a fully rendered
 * README.md. It writes the file only if content actually changed, so the
 * GitHub Action can commit only meaningful updates.
 * ---------------------------------------------------------------------------
 */

const fs = require('fs');

const config = require('./config');
const { scanRepository, groupByTopic, countByDifficulty } = require('./parseSolutions');
const {
  getTotalCommits,
  getLastCommitDate,
  getFileAddedDate,
  getCommitStreak,
  getWeeklyActivity,
  getLanguageStats,
  getRecentCommits,
} = require('./githubStats');
const { fetchLeetCodeStats } = require('./leetcodeApi');
const {
  renderBar,
  renderRelativeBar,
  formatDateTime,
  badge,
  escapeTableCell,
  renderWeeklyChart,
} = require('./formatUtils');

async function main() {
  console.log('🔍 Scanning repository for solutions...');
  const problems = scanRepository(config);
  console.log(`✅ Found ${problems.length} solved problem file(s).`);

  const byTopic = groupByTopic(problems);
  const byDifficulty = countByDifficulty(problems);

  const totalCommits = getTotalCommits(config.rootDir);
  const lastCommitDate = getLastCommitDate(config.rootDir);
  const commitStreak = getCommitStreak(config.rootDir);
  const weeklyActivity = getWeeklyActivity(config.rootDir, config.weeklyActivityDays);
  const languageStats = getLanguageStats(config.rootDir, config.excludedDirs);
  const recentCommits = getRecentCommits(config.rootDir, 5);

  console.log('🌐 Fetching live LeetCode stats (if configured)...');
  const leetcodeStats = await fetchLeetCodeStats(config.leetcodeUsername);

  // Recent problems: newest first, based on when each file was added to git.
  console.log('🕓 Resolving file-added dates for recent problems...');
  const withDates = problems.map((p) => ({
    ...p,
    addedDate: getFileAddedDate(p.filePath, config.rootDir),
  }));
  const recentProblems = [...withDates]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, config.recentProblemsCount);

  const topicFolders = [...byTopic.keys()];
  const jsFileCount = problems.length;

  const readme = buildReadme({
    problems,
    byTopic,
    byDifficulty,
    topicFolders,
    totalCommits,
    lastCommitDate,
    commitStreak,
    weeklyActivity,
    languageStats,
    recentCommits,
    leetcodeStats,
    recentProblems,
    jsFileCount,
  });

  writeIfChanged(config.readmePath, readme);
}

// ---------------------------------------------------------------------------
// README section builders
// ---------------------------------------------------------------------------

function buildHeroHeader() {
  const encodedLines = config.typingLines.map((l) => encodeURIComponent(l)).join(';');
  const typingSvg = `https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=2E9EF7&center=true&vCenter=true&width=600&lines=${encodedLines}`;

  return `<div align="center">

# 💻 LeetCode Solutions

[![Typing SVG](${typingSvg})](https://git.io/typing-svg)

<p>
  <strong>Automated, self-updating log of my Data Structures & Algorithms practice.</strong><br/>
  This README regenerates itself on every push — nothing below is edited by hand.
</p>

</div>

---`;
}

function buildBadges() {
  const badges = [
    badge('JavaScript', 'ES2023', 'F7DF1E', 'javascript', '&logoColor=black'),
    badge('GitHub Actions', 'CI/CD', '2088FF', 'githubactions', '&logoColor=white'),
    badge('Node.js', '18+', '339933', 'node.js', '&logoColor=white'),
    badge('Markdown', 'Auto-Generated', '000000', 'markdown', '&logoColor=white'),
    badge('LeetCode', 'Tracked', 'FFA116', 'leetcode', '&logoColor=black'),
    badge('DSA', 'Practice', '9146FF', 'target', '&logoColor=white'),
    badge('Open Source', 'MIT', '3DA639', 'opensourceinitiative', '&logoColor=white'),
  ];
  return `<div align="center">\n\n${badges.join(' ')}\n\n</div>\n\n---`;
}

function buildStats({ problems, byDifficulty, topicFolders, totalCommits, jsFileCount, lastCommitDate }) {
  return `## 📊 Repository Stats

| Metric | Value |
| --- | --- |
| 🧩 Total Problems Solved | **${problems.length}** |
| 🟢 Easy | **${byDifficulty.Easy}** |
| 🟡 Medium | **${byDifficulty.Medium}** |
| 🔴 Hard | **${byDifficulty.Hard}** |
| 📁 Total Topic Folders | **${topicFolders.length}** |
| 📄 JavaScript Solution Files | **${jsFileCount}** |
| 🔁 Total Commits | **${totalCommits}** |
| 🕒 Last Updated | **${formatDateTime(lastCommitDate)}** |

---`;
}

function buildProgressBar({ problems }) {
  const bar = renderBar(problems.length, config.goal, config.progressBarWidth);
  return `## 🎯 Progress Toward Goal

\`\`\`
${problems.length} / ${config.goal}
${bar}
\`\`\`

---`;
}

function buildTopicTable({ byTopic }) {
  if (byTopic.size === 0) {
    return `## 🗂️ Topic Wise Progress

_No solutions found yet — add your first solution folder to see this table populate automatically._

---`;
  }

  const maxCount = Math.max(...[...byTopic.values()].map((arr) => arr.length));
  const rows = [...byTopic.entries()]
    .map(([topic, list]) => {
      const bar = renderRelativeBar(list.length, maxCount, config.topicBarWidth);
      return `| ${escapeTableCell(topic)} | ${list.length} | \`${bar}\` |`;
    })
    .join('\n');

  return `## 🗂️ Topic Wise Progress

| Topic | Solved | Progress |
| --- | ---: | --- |
${rows}

---`;
}

function buildRecentProblems({ recentProblems }) {
  if (recentProblems.length === 0) {
    return `## 🆕 Recent Problems

_No problems solved yet. Push your first solution to populate this list._

---`;
  }

  const items = recentProblems
    .map((p) => {
      const label = p.number ? `#${p.number} — ${p.title}` : p.title;
      const diffEmoji = { Easy: '🟢', Medium: '🟡', Hard: '🔴' }[p.difficulty] || '⚪';
      return `- ${diffEmoji} **${escapeTableCell(label)}** _(${p.topic})_`;
    })
    .join('\n');

  return `## 🆕 Recent Problems

${items}

---`;
}

function buildMilestones({ problems }) {
  const total = problems.length;
  const items = config.milestones
    .map((m) => `- ${total >= m ? '✅' : '⬜'} First ${m}`)
    .join('\n');

  return `## 🏁 Milestones

${items}

---`;
}

function buildWeeklyActivity({ weeklyActivity }) {
  const chart = renderWeeklyChart(weeklyActivity);
  return `## 📅 Weekly Activity

\`\`\`
${chart}
\`\`\`

---`;
}

function buildStreak({ commitStreak }) {
  return `## 🔥 Streak

**Current Commit Streak:** ${commitStreak} day${commitStreak === 1 ? '' : 's'} 🔥

---`;
}

function buildLeetCodeStats({ leetcodeStats }) {
  if (!leetcodeStats) {
    return `## 🌐 LeetCode Profile Stats

_Live stats unavailable right now (set \`LEETCODE_USERNAME\` and ensure network access to fetch these automatically)._

---`;
  }

  const s = leetcodeStats;
  return `## 🌐 LeetCode Profile Stats

| Metric | Value |
| --- | --- |
| ✅ Total Solved | **${s.totalSolved}** |
| 🟢 Easy | **${s.easySolved}** |
| 🟡 Medium | **${s.mediumSolved}** |
| 🔴 Hard | **${s.hardSolved}** |
| 🏆 Ranking | **${s.ranking ?? 'N/A'}** |
| 🎮 Contest Rating | **${s.contestRating ?? 'N/A'}** |
| 🌍 Global Contest Rank | **${s.globalContestRank ?? 'N/A'}** |
| 📈 Contests Attended | **${s.contestsAttended ?? 'N/A'}** |

_Fetched live from [leetcode.com/${s.username}](https://leetcode.com/${s.username}/)_

---`;
}

function buildRepoTree({ topicFolders, byTopic }) {
  if (topicFolders.length === 0) {
    return `## 🌳 Repository Tree

_No topic folders detected yet._

---`;
  }
  const lines = topicFolders
    .map((topic) => `├── ${topic}/  (${byTopic.get(topic).length} solved)`)
    .join('\n');

  return `## 🌳 Repository Tree

\`\`\`
${config.repoName}/
${lines}
\`\`\`

---`;
}

function buildLanguages({ languageStats }) {
  if (languageStats.length === 0) {
    return `## 🧬 Languages Used

_No source files detected yet._

---`;
  }
  const rows = languageStats
    .map(({ lang, percent }) => {
      const bar = renderRelativeBar(percent, 100, 20);
      return `\`${lang.padEnd(12)}\` ${bar} ${percent}%`;
    })
    .join('\n');

  return `## 🧬 Languages Used

${rows}

---`;
}

function buildRecentCommits({ recentCommits }) {
  if (recentCommits.length === 0) {
    return `## 📝 Recent Commits

_No commit history available yet._

---`;
  }
  const rows = recentCommits
    .map((c) => `- \`${c.hash}\` ${escapeTableCell(c.message)} _(${c.date})_`)
    .join('\n');

  return `## 📝 Recent Commits

${rows}

---`;
}

function buildGoalTracker({ problems }) {
  const percent = Math.min(100, Math.round((problems.length / config.goal) * 100));
  return `## 🚀 Goal Tracker

**Goal:** ${config.goal} Problems
**Completed:** ${percent}%

${renderBar(problems.length, config.goal, config.progressBarWidth)}

---`;
}

function buildFooter() {
  const githubBadge = badge('GitHub', config.githubUsername, '181717', 'github', '&logoColor=white');
  const portfolioBadge = badge('Portfolio', 'Visit', '2E9EF7', 'googlechrome', '&logoColor=white');
  const leetcodeBadge = badge('LeetCode', config.leetcodeUsername, 'FFA116', 'leetcode', '&logoColor=black');
  const linkedinBadge = badge('LinkedIn', 'Connect', '0A66C2', 'linkedin', '&logoColor=white');

  return `<div align="center">

Made with ❤️ by **${config.authorName}**

[${githubBadge}](https://github.com/${config.githubUsername})
[${portfolioBadge}](${config.portfolioUrl})
[${leetcodeBadge}](https://leetcode.com/${config.leetcodeUsername}/)
[${linkedinBadge}](${config.linkedinUrl})

<sub>🤖 This README is generated automatically by <code>scripts/generateReadme.js</code> via GitHub Actions. Last build: ${formatDateTime(
    new Date().toISOString()
  )}</sub>

</div>`;
}

function buildReadme(data) {
  const sections = [
    buildHeroHeader(),
    buildBadges(),
    buildStats(data),
    buildProgressBar(data),
    buildTopicTable(data),
    buildRecentProblems(data),
    buildMilestones(data),
    buildWeeklyActivity(data),
    buildStreak(data),
    buildLeetCodeStats(data),
    buildRepoTree(data),
    buildLanguages(data),
    buildRecentCommits(data),
    buildGoalTracker(data),
    buildFooter(),
  ];

  return sections.join('\n\n') + '\n';
}

// ---------------------------------------------------------------------------
// File I/O
// ---------------------------------------------------------------------------

function writeIfChanged(filePath, newContent) {
  let existing = null;
  try {
    existing = fs.readFileSync(filePath, 'utf-8');
  } catch {
    // file doesn't exist yet — that's fine
  }

  // Ignore the "Last build" timestamp line when diffing so the workflow
  // doesn't create a commit every single day just because time passed
  // with zero actual content change (still updates the file on disk).
  const normalize = (str) => (str || '').replace(/Last build:.*$/m, '');

  if (existing !== null && normalize(existing) === normalize(newContent)) {
    console.log('✅ README content unchanged (ignoring timestamp) — skipping write.');
    // Still touch the file with fresh timestamp so "Last Updated" reflects
    // reality, but signal to the workflow that no *meaningful* change occurred.
    fs.writeFileSync(filePath, newContent, 'utf-8');
    process.env.README_CONTENT_CHANGED = 'false';
    return;
  }

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ README.md written to ${filePath}`);
  process.env.README_CONTENT_CHANGED = 'true';
}

main().catch((err) => {
  console.error('❌ Fatal error while generating README:', err);
  process.exit(1);
});
