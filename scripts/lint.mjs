#!/usr/bin/env node
// SPDX-License-Identifier: MPL-2.0
// BCLS lint — minimal regex checker for the machine-checkable MUST rules.
//
// Usage:
//   node scripts/lint.mjs [--kind=binary|web|commit|docs] path/to/file.md [more.md ...]
//   cat body.md | node scripts/lint.mjs [--kind=web] -
//
// Exit code: 0 = clean, 1 = at least one violation, 2 = bad invocation.
//
// Kind (CLI --kind= wins, else <!-- bcls:kind NAME -->, else binary):
//   binary  GitHub release with installers (default; v1.0 behavior)
//   web     GitHub release with no binaries
//   commit  Git commit subject lines
//   docs    README / CONTRIBUTING / docs-site pages
//
// What it checks (and only what it can check without a markdown parser):
//   M001  No literal "•" or "◦" characters.
//   M002  Each "## Changes in" heading is `## Changes in \`vX.Y.Z[-beta.N][...]:\``
//         (backticks present, trailing colon inside backticks).
//   M003  Every list-item line that should be a bullet starts with "- **"
//         (categorized bullet) — sub-bullets and quoted/code lines are skipped.
//   M004  A "# ⬇️ Downloads" section exists. (binary only)
//   M005  A "## ℹ️ Release Info" section exists. (binary only)
//   M006  Every categorized bullet ends with "." or "!" (or "...") on its line.
//   M007  No raw "## Changes in vX.Y.Z" without backticks.
//   M008  No "- **MISC:**" category bullet — canonical form is "Misc:".
//   M009  No "BETA build" phrasing — canonical casing is "Beta build".
//   W001  Kind web MUST NOT contain "# ⬇️ Downloads".
//   W002  Kind web MUST NOT contain "## ℹ️ Release Info".
//   C001  Commit subject is `Category: Description.` or `NEW - Feature: Description.`
//   C002  Commit subject MUST NOT exceed 72 characters.
//   C003  Commit subject has no emoji.
//   C004  Commit subject is not Conventional Commits (`feat:`, `fix:`, …).
//
// Pragmas (HTML comments anywhere in the file):
//   <!-- bcls:kind web -->                Set kind when --kind is not passed.
//   <!-- bcls:partial -->                 Skip whole-file checks (M004/M005/W001/W002).
//                                         Use for snippets, partials, EXAMPLES with annotations.
//   <!-- bcls:ignore-start --> ... <!-- bcls:ignore-end -->
//                                         Skip per-line checks inside the region.
//                                         Use for annotation/commentary sections in EXAMPLES.
//
// This is intentionally not exhaustive. Things like the carry-forward rule,
// canonical category vocabulary membership, and tone are not statically
// checkable here — humans / agents enforce those. See STANDARD.md §0.

import { readFileSync } from "node:fs";
import { argv, exit, stdin } from "node:process";

const KINDS = new Set(["binary", "web", "commit", "docs"]);

const parseArgs = (args) => {
  let cliKind = null;
  const files = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--kind") {
      cliKind = args[++i];
    } else if (a.startsWith("--kind=")) {
      cliKind = a.slice("--kind=".length);
    } else {
      files.push(a);
    }
  }
  if (cliKind != null && !KINDS.has(cliKind)) {
    console.error(`unknown kind: ${cliKind}  (expected binary|web|commit|docs)`);
    exit(2);
  }
  return { cliKind, files };
};

const { cliKind, files } = parseArgs(argv.slice(2));
if (files.length === 0) {
  console.error(
    "usage: node scripts/lint.mjs [--kind=binary|web|commit|docs] <file> [<file> ...]   (use - for stdin)"
  );
  exit(2);
}

const pragmaKind = (text) => {
  const m = text.match(/<!--\s*bcls:kind\s+(binary|web|commit|docs)\s*-->/);
  return m ? m[1] : null;
};

const resolveKind = (text) => cliKind || pragmaKind(text) || "binary";

const readStdin = () =>
  new Promise((resolve) => {
    let data = "";
    stdin.setEncoding("utf8");
    stdin.on("data", (c) => (data += c));
    stdin.on("end", () => resolve(data));
  });

const RULES = [
  {
    id: "M001",
    kinds: ["binary", "web", "commit", "docs"],
    msg: "Literal '•' or '◦' character found — author with markdown '-' bullets instead.",
    test: (line) => /[•◦]/.test(line),
  },
  {
    id: "M007",
    kinds: ["binary", "web"],
    msg: "'## Changes in' heading missing backticks. Use: ## Changes in `vX.Y.Z:`",
    test: (line) => /^##\s+Changes in\s+v\d/.test(line),
  },
  {
    id: "M002",
    kinds: ["binary", "web"],
    msg: "Malformed 'Changes in' heading. Expected: ## Changes in `vX.Y.Z:` (backticks + trailing colon inside).",
    test: (line) => {
      if (!/^##\s+Changes in\s+`/.test(line)) return false;
      return !/^##\s+Changes in\s+`v\d+\.\d+\.\d+(?:[-+][\w.()\s-]+)?:`\s*$/.test(line);
    },
  },
  {
    id: "M003",
    kinds: ["binary", "web"],
    msg: "Top-level bullet doesn't start with '- **Category:**' — every bullet needs a bold category prefix.",
    test: (line) => {
      if (!/^- /.test(line)) return false;
      return !/^- \*\*[^*]+\*\*/.test(line);
    },
  },
  {
    id: "M006",
    kinds: ["binary", "web"],
    msg: "Categorized bullet should end with '.', '!', or '…' / '...'.",
    test: (line) => {
      if (!/^- \*\*[^*]+\*\*/.test(line)) return false;
      const trimmed = line.replace(/\s+$/, "");
      return !/[.!…]$|\.{3}$|`$/.test(trimmed);
    },
  },
  {
    id: "M008",
    kinds: ["binary", "web", "commit", "docs"],
    msg: "Use canonical 'Misc:' category, not 'MISC:'.",
    test: (line) => /^- \*\*MISC:\*\*/.test(line) || /^MISC: /.test(line),
  },
  {
    id: "M009",
    kinds: ["binary", "web", "commit", "docs"],
    msg: "Use 'Beta build' (sentence case), not 'BETA build'.",
    test: (line) => /BETA build/.test(line),
  },
];

const COMMIT_SHAPE = /^(?:NEW - [^:]+: |[A-Za-z][\w]*: ).+\.$/;
const CONV_COMMITS = /^(feat|fix|chore|docs|style|refactor|test|perf|ci|build|revert)(!)?(\([^)]+\))?:/;

const COMMIT_RULES = [
  {
    id: "C004",
    msg: "Conventional Commits prefix — use a BCLS category (`Category: Description.`), not feat:/fix:.",
    test: (line) => CONV_COMMITS.test(line),
  },
  {
    id: "C001",
    msg: "Commit subject must be `Category: Description.` or `NEW - Feature: Description.` (imperative, trailing period).",
    test: (line) => !COMMIT_SHAPE.test(line) && !CONV_COMMITS.test(line),
  },
  {
    id: "C002",
    msg: "Commit subject exceeds 72 characters.",
    test: (line) => line.length > 72,
  },
  {
    id: "C003",
    msg: "Commit subject must not contain emoji.",
    test: (line) => /\p{Extended_Pictographic}/u.test(line),
  },
];

const skipCommitLine = (line) => {
  const t = line.trim();
  if (!t) return true;
  if (/^<!--/.test(t)) return true;
  if (/^#{1,6}\s/.test(t)) return true;
  if (/^>/.test(t)) return true;
  if (/^---+$/.test(t)) return true;
  if (/^[-*]\s/.test(t)) return true;
  if (/^\|/.test(t)) return true;
  return false;
};

const FILE_RULES = {
  binary: [
    {
      id: "M004",
      msg: "Missing '# ⬇️ Downloads' section.",
      test: (text) => !/^#\s+⬇️\s+Downloads\s*$/m.test(text),
    },
    {
      id: "M005",
      msg: "Missing '## ℹ️ Release Info' section.",
      test: (text) => !/^##\s+ℹ️\s+Release Info\s*$/m.test(text),
    },
  ],
  web: [
    {
      id: "W001",
      msg: "Kind web MUST NOT contain '# ⬇️ Downloads'.",
      test: (text) => /^#\s+⬇️\s+Downloads\s*$/m.test(text),
    },
    {
      id: "W002",
      msg: "Kind web MUST NOT contain '## ℹ️ Release Info'.",
      test: (text) => /^##\s+ℹ️\s+Release Info\s*$/m.test(text),
    },
  ],
  commit: [],
  docs: [],
};

let totalViolations = 0;

const lintText = (label, text) => {
  const violations = [];
  const kind = resolveKind(text);
  const isPartial = /<!--\s*bcls:partial\s*-->/.test(text);
  let inFence = false;
  let inIgnore = false;
  text.split(/\r?\n/).forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence;
    if (/<!--\s*bcls:ignore-start\s*-->/.test(line)) inIgnore = true;
    if (/<!--\s*bcls:ignore-end\s*-->/.test(line)) {
      inIgnore = false;
      return;
    }
    if (inFence || inIgnore) return;
    for (const rule of RULES) {
      if (!rule.kinds.includes(kind)) continue;
      if (rule.test(line)) {
        violations.push({ line: i + 1, id: rule.id, msg: rule.msg, src: line });
      }
    }
    if (kind === "commit" && !skipCommitLine(line)) {
      for (const rule of COMMIT_RULES) {
        if (rule.test(line)) {
          violations.push({ line: i + 1, id: rule.id, msg: rule.msg, src: line });
        }
      }
    }
  });
  if (!isPartial) {
    for (const rule of FILE_RULES[kind]) {
      if (rule.test(text)) {
        violations.push({ line: 0, id: rule.id, msg: rule.msg, src: "" });
      }
    }
  }
  if (violations.length === 0) {
    console.log(`✓ ${label}: clean${isPartial ? " (partial)" : ""} [${kind}]`);
  } else {
    console.log(`✗ ${label}: ${violations.length} violation(s) [${kind}]`);
    for (const v of violations) {
      const where = v.line ? `:${v.line}` : "";
      console.log(`  [${v.id}]${where}  ${v.msg}`);
      if (v.src) console.log(`    > ${v.src}`);
    }
  }
  totalViolations += violations.length;
};

for (const f of files) {
  if (f === "-") {
    const txt = await readStdin();
    lintText("<stdin>", txt);
  } else {
    try {
      const txt = readFileSync(f, "utf8");
      lintText(f, txt);
    } catch (err) {
      console.error(`! ${f}: ${err.message}`);
      totalViolations += 1;
    }
  }
}

exit(totalViolations === 0 ? 0 : 1);
