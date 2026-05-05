#!/usr/bin/env node
// BCLS lint — minimal regex checker for the machine-checkable MUST rules.
//
// Usage:
//   node scripts/lint.mjs path/to/release-body.md [more.md ...]
//   cat body.md | node scripts/lint.mjs -
//
// Exit code: 0 = clean, 1 = at least one violation, 2 = bad invocation.
//
// What it checks (and only what it can check without a markdown parser):
//   M001  No literal "•" or "◦" characters.
//   M002  Each "## Changes in" heading is `## Changes in \`vX.Y.Z[-beta.N][...]:\``
//         (backticks present, trailing colon inside backticks).
//   M003  Every list-item line that should be a bullet starts with "- **"
//         (categorized bullet) — sub-bullets and quoted/code lines are skipped.
//   M004  A "# ⬇️ Downloads" section exists.
//   M005  A "## ℹ️ Release Info" section exists.
//   M006  Every categorized bullet ends with "." or "!" (or "...") on its line.
//   M007  No raw "## Changes in vX.Y.Z" without backticks.
//   M008  No "- **MISC:**" category bullet — canonical form is "Misc:".
//   M009  No "BETA build" phrasing — canonical casing is "Beta build".
//
// Pragmas (HTML comments anywhere in the file):
//   <!-- bcls:partial -->                 Skip whole-file checks (M004/M005).
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

const files = argv.slice(2);
if (files.length === 0) {
  console.error("usage: node scripts/lint.mjs <file> [<file> ...]   (use - for stdin)");
  exit(2);
}

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
    msg: "Literal '•' or '◦' character found — author with markdown '-' bullets instead.",
    test: (line) => /[•◦]/.test(line),
  },
  {
    id: "M007",
    msg: "'## Changes in' heading missing backticks. Use: ## Changes in `vX.Y.Z:`",
    test: (line) => /^##\s+Changes in\s+v\d/.test(line),
  },
  {
    id: "M002",
    msg: "Malformed 'Changes in' heading. Expected: ## Changes in `vX.Y.Z:` (backticks + trailing colon inside).",
    test: (line) => {
      if (!/^##\s+Changes in\s+`/.test(line)) return false;
      // Accept: ## Changes in `vX.Y.Z:` or `vX.Y.Z-beta.N:` or `vX.Y.Z (RC2):`
      return !/^##\s+Changes in\s+`v\d+\.\d+\.\d+(?:[-+][\w.()\s-]+)?:`\s*$/.test(line);
    },
  },
  {
    id: "M003",
    msg: "Top-level bullet doesn't start with '- **Category:**' — every bullet needs a bold category prefix.",
    test: (line) => {
      // Top-level bullets only (no leading spaces). Skip table/quote/code.
      if (!/^- /.test(line)) return false;
      // Exempt obvious non-change bullets used in Release Info / table cells.
      // Release-Info bullets DO start with "- **" too, so this stays uniform.
      return !/^- \*\*[^*]+\*\*/.test(line);
    },
  },
  {
    id: "M006",
    msg: "Categorized bullet should end with '.', '!', or '…' / '...'.",
    test: (line) => {
      if (!/^- \*\*[^*]+\*\*/.test(line)) return false;
      // Strip trailing inline code/markdown punctuation context.
      const trimmed = line.replace(/\s+$/, "");
      return !/[.!…]$|\.{3}$|`$/.test(trimmed);
    },
  },
  {
    id: "M008",
    msg: "Use canonical 'Misc:' category, not 'MISC:'.",
    test: (line) => /^- \*\*MISC:\*\*/.test(line),
  },
  {
    id: "M009",
    msg: "Use 'Beta build' (sentence case), not 'BETA build'.",
    test: (line) => /BETA build/.test(line),
  },
];

const FILE_RULES = [
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
];

let totalViolations = 0;

const lintText = (label, text) => {
  const violations = [];
  const isPartial = /<!--\s*bcls:partial\s*-->/.test(text);
  // Per-line checks. Skip fenced code blocks and bcls:ignore regions.
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
      if (rule.test(line)) {
        violations.push({ line: i + 1, id: rule.id, msg: rule.msg, src: line });
      }
    }
  });
  // Whole-file checks (skip for partials).
  if (!isPartial) {
    for (const rule of FILE_RULES) {
      if (rule.test(text)) {
        violations.push({ line: 0, id: rule.id, msg: rule.msg, src: "" });
      }
    }
  }
  if (violations.length === 0) {
    console.log(`✓ ${label}: clean${isPartial ? " (partial)" : ""}`);
  } else {
    console.log(`✗ ${label}: ${violations.length} violation(s)`);
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
