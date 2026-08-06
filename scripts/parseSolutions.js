/**
 * parseSolutions.js
 * ---------------------------------------------------------------------------
 * Walks the repository, finds every solution file, and parses the standard
 * header comment block into structured data:
 *
 *   // LeetCode 1
 *   // Two Sum
 *   // Difficulty: Easy
 *   // Time: O(n)
 *   // Space: O(n)
 *   // Tags: Array, HashMap
 *
 * The header lines can appear in any order (only their *labels* are
 * required), and missing fields degrade gracefully instead of crashing —
 * a malformed comment in one file should never break the whole build.
 * ---------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const HEADER_SCAN_LINES = 20; // how many lines from the top of a file we inspect

const PATTERNS = {
  number: /LeetCode\s*#?\s*(\d+)/i,
  difficulty: /Difficulty:\s*(Easy|Medium|Hard)/i,
  time: /Time:\s*(.+)/i,
  space: /Space:\s*(.+)/i,
  tags: /Tags:\s*(.+)/i,
};

/**
 * Recursively collects every solution file under `dir`, skipping any
 * directory listed in `excludedDirs` (matched by folder name, at any depth).
 */
function collectFiles(dir, excludedDirs, extensions, rootDir, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`⚠️  Could not read directory "${dir}": ${err.message}`);
    return results;
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (excludedDirs.includes(entry.name)) continue;
      collectFiles(fullPath, excludedDirs, extensions, rootDir, results);
    } else if (entry.isFile()) {
      if (extensions.includes(path.extname(entry.name))) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

/**
 * Extracts the human-readable title. Convention: the first non-empty
 * comment line that ISN'T the "LeetCode <n>" line and isn't a labelled
 * field (Difficulty/Time/Space/Tags) is treated as the title.
 */
function extractTitle(lines) {
  for (const rawLine of lines) {
    const line = rawLine.replace(/^\/\/\s?/, '').trim();
    if (!line) continue;
    if (/^LeetCode/i.test(line)) continue;
    if (/^(Difficulty|Time|Space|Tags):/i.test(line)) continue;
    return line;
  }
  return null;
}

/**
 * Parses a single solution file's header comment block.
 * Returns null if the file has no recognizable "LeetCode" header at all
 * (so stray non-solution .js files don't pollute the stats).
 */
function parseSolutionFile(filePath, rootDir) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.warn(`⚠️  Could not read file "${filePath}": ${err.message}`);
    return null;
  }

  const lines = content.split('\n').slice(0, HEADER_SCAN_LINES);
  const headerBlock = lines.join('\n');

  const numberMatch = headerBlock.match(PATTERNS.number);
  if (!numberMatch) return null; // not a recognized solution file, skip silently

  const difficultyMatch = headerBlock.match(PATTERNS.difficulty);
  const timeMatch = headerBlock.match(PATTERNS.time);
  const spaceMatch = headerBlock.match(PATTERNS.space);
  const tagsMatch = headerBlock.match(PATTERNS.tags);

  const relativePath = path.relative(rootDir, filePath);
  const topic = relativePath.split(path.sep)[0];

  return {
    number: parseInt(numberMatch[1], 10),
    title: extractTitle(lines) || path.basename(filePath, path.extname(filePath)),
    difficulty: difficultyMatch ? capitalize(difficultyMatch[1]) : 'Unknown',
    time: timeMatch ? timeMatch[1].trim() : null,
    space: spaceMatch ? spaceMatch[1].trim() : null,
    tags: tagsMatch
      ? tagsMatch[1].split(',').map((t) => t.trim()).filter(Boolean)
      : [],
    topic,
    filePath,
    relativePath,
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Main entry point: scans the repo and returns an array of parsed problems.
 */
function scanRepository(config) {
  const files = collectFiles(
    config.rootDir,
    config.excludedDirs,
    config.solutionExtensions,
    config.rootDir
  );

  const problems = [];
  for (const file of files) {
    const parsed = parseSolutionFile(file, config.rootDir);
    if (parsed) problems.push(parsed);
  }

  return problems;
}

/**
 * Groups problems by topic (top-level folder name).
 * Returns a Map<topic, problems[]> sorted by solved count descending.
 */
function groupByTopic(problems) {
  const map = new Map();
  for (const p of problems) {
    if (!map.has(p.topic)) map.set(p.topic, []);
    map.get(p.topic).push(p);
  }
  return new Map([...map.entries()].sort((a, b) => b[1].length - a[1].length));
}

/**
 * Counts problems by difficulty.
 */
function countByDifficulty(problems) {
  const counts = { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 };
  for (const p of problems) {
    counts[p.difficulty] = (counts[p.difficulty] || 0) + 1;
  }
  return counts;
}

module.exports = {
  scanRepository,
  groupByTopic,
  countByDifficulty,
  parseSolutionFile, // exported for unit testing
};
