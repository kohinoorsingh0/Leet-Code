# Setup Guide

This project is plug-and-play: clone it, drop in your solutions, push, and the
README updates itself. This guide walks through the one-time setup.

## 1. Use this repository

Clone it, or click "Use this template" if you've made it a GitHub template repo:

```bash
git clone https://github.com/<your-username>/leetcode-solutions.git
cd leetcode-solutions
```

## 2. Configure your identity

The generator reads all personal details from environment variables — nothing
is hard-coded in the scripts. In GitHub Actions these come from **Repository
Variables** (Settings → Secrets and variables → Actions → Variables tab).

Add the following **Repository Variables**:

| Variable | Example | Required? |
| --- | --- | --- |
| `LEETCODE_USERNAME` | `johndoe123` | Yes, for live LeetCode stats |
| `AUTHOR_NAME` | `Kohinoor Singh` | Optional (defaults provided) |
| `PORTFOLIO_URL` | `https://johndoe.dev` | Optional |
| `LINKEDIN_URL` | `https://linkedin.com/in/johndoe` | Optional |
| `GOAL` | `500` | Optional (defaults to 500) |

> `GITHUB_USERNAME` and `REPO_NAME` are inferred automatically from the
> repository itself inside GitHub Actions — you don't need to set them.

No secrets are required for the LeetCode stats fetch — it uses LeetCode's
public GraphQL endpoint, the same one leetcode.com's own profile pages use.

## 3. Enable Actions permissions

Go to **Settings → Actions → General → Workflow permissions** and select
**"Read and write permissions"**. This lets the workflow commit the updated
`README.md` back to the repository.

## 4. Add your solutions

Drop solution files into the matching topic folder (create new folders freely
— the generator detects them automatically, no config changes needed):

```
Arrays/two-sum.js
Strings/valid-parentheses.js
DynamicProgramming/climbing-stairs.js
```

Each file **must** start with a header comment block in this exact format
(order of fields doesn't matter, but each label must be present for full
stats to populate):

```js
// LeetCode 1
// Two Sum
// Difficulty: Easy
// Time: O(n)
// Space: O(n)
// Tags: Array, HashMap

// ...your solution code...
```

- `Difficulty` must be exactly `Easy`, `Medium`, or `Hard`.
- The line right after `// LeetCode <number>` is treated as the problem title.
- `Tags` is a comma-separated list, used for future extensions.

## 5. Push

```bash
git add .
git commit -m "Add Two Sum solution"
git push
```

The **Update README** workflow (`.github/workflows/update-readme.yml`) runs
automatically on push, regenerates `README.md`, and commits the change back
if anything meaningful updated. It also runs once a day on a schedule (so
"Last Updated" and streaks stay current even without new pushes), and can be
triggered manually from the **Actions** tab.

## 6. (Optional) Local testing

You can run the generator locally before pushing:

```bash
cp .env.example .env
# edit .env with your own values
npm run generate
```

This writes `README.md` in place so you can preview it before committing.

## How it all fits together

```
Push / daily schedule
        │
        ▼
.github/workflows/update-readme.yml
        │
        ▼
scripts/generateReadme.js  (orchestrator)
   ├── parseSolutions.js   → scans folders, parses header comments
   ├── githubStats.js      → commits, streak, weekly activity, languages
   ├── leetcodeApi.js      → live LeetCode.com profile/contest stats
   └── formatUtils.js      → progress bars, badges, date formatting
        │
        ▼
   README.md written
        │
        ▼
Workflow commits README.md if it changed
```

## Troubleshooting

- **README isn't updating**: check the Actions tab for a failed run, and
  confirm "Read and write permissions" is enabled (step 3).
- **LeetCode stats show "unavailable"**: verify `LEETCODE_USERNAME` is set
  exactly as it appears in your LeetCode profile URL, and that your LeetCode
  profile is public.
- **A solution isn't being counted**: make sure the file has a `// LeetCode
  <number>` line somewhere in its first 20 lines — that's what the parser
  looks for to recognize a file as a solution.
- **Commit streak looks wrong right after cloning**: streak/weekly-activity
  numbers depend on real commit history — a freshly-cloned or squashed repo
  will show a shorter streak until you've pushed on consecutive days.
