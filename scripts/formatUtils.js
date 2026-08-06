/**
 * formatUtils.js
 * ---------------------------------------------------------------------------
 * Small, pure, dependency-free formatting helpers shared by the README
 * generator. Kept separate from generateReadme.js so each piece is easy to
 * unit test and reason about in isolation.
 * ---------------------------------------------------------------------------
 */

const FILLED = '█';
const EMPTY = '░';

/** Renders a block-character progress bar, e.g. "██████░░░░ 60%". */
function renderBar(current, total, width = 20) {
  const safeTotal = total > 0 ? total : 1;
  const ratio = Math.min(current / safeTotal, 1);
  const filledCount = Math.round(ratio * width);
  const emptyCount = width - filledCount;
  const percent = Math.round(ratio * 100);
  return `${FILLED.repeat(filledCount)}${EMPTY.repeat(emptyCount)} ${percent}%`;
}

/** Renders a bar sized relative to a max value (used for topic tables). */
function renderRelativeBar(value, max, width = 20) {
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.min(value / safeMax, 1);
  const filledCount = Math.max(1, Math.round(ratio * width));
  const emptyCount = width - filledCount;
  return `${FILLED.repeat(filledCount)}${EMPTY.repeat(emptyCount)}`;
}

/** Formats an ISO date string as "05 Aug 2026, 14:32 UTC". */
function formatDateTime(isoString) {
  const d = new Date(isoString);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = d.getUTCFullYear();
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
}

/**
 * Builds a shields.io badge markdown string.
 * shields.io uses "-" as the field delimiter in the URL path, so literal
 * hyphens/spaces in the label or message must be escaped per their
 * convention (hyphen -> "--", space -> "_") before URI-encoding.
 */
function badge(label, message, color, logo, extra = '') {
  const shieldsEscape = (s) => encodeURIComponent(s.replace(/-/g, '--').replace(/ /g, '_'));
  return `![${label}](https://img.shields.io/badge/${shieldsEscape(label)}-${shieldsEscape(
    message
  )}-${color}?style=for-the-badge&logo=${logo}${extra})`;
}

/** Escapes pipe characters so table cells don't break markdown tables. */
function escapeTableCell(str) {
  return String(str).replace(/\|/g, '\\|');
}

/** Weekly activity as a small sparkline-style bar chart in a code block. */
function renderWeeklyChart(weeklyData) {
  const max = Math.max(...weeklyData.map((d) => d.count), 1);
  const rows = weeklyData.map(({ date, count }) => {
    const dayLabel = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      timeZone: 'UTC',
    });
    const barWidth = Math.max(count > 0 ? 1 : 0, Math.round((count / max) * 15));
    return `${dayLabel.padEnd(4)} ${FILLED.repeat(barWidth)}${EMPTY.repeat(
      15 - barWidth
    )} ${count}`;
  });
  return rows.join('\n');
}

module.exports = {
  renderBar,
  renderRelativeBar,
  formatDateTime,
  badge,
  escapeTableCell,
  renderWeeklyChart,
};
