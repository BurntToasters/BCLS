// SPDX-License-Identifier: MPL-2.0
import { useMemo, useState } from "react";

type ReleaseType = "patch" | "minor" | "major" | "beta" | "security";
type Stack = "Tauri V2" | "Electron" | "Flutter" | "Other";
type Kind = "binary" | "web";

type Change = {
  id: number;
  category: string;
  featureName: string;
  description: string;
  subitems: string;
};

type Validation = {
  id: string;
  message: string;
  line?: number;
};

const categories = [
  "PKG",
  "Electron",
  "Tauri",
  "Typescript",
  "Codebase",
  "Testing",
  "UI",
  "Logo",
  "Updater",
  "Security",
  "Licenses",
  "Docs",
  "Ver",
  "Windows",
  "Linux",
  "macOS",
  "Misc",
  "NEW - Feature"
];

const normalizeVersion = (version: string) => {
  const trimmed = version.trim();
  return trimmed.startsWith("v") ? trimmed : `v${trimmed || "X.Y.Z"}`;
};

const titleVersion = (version: string) => normalizeVersion(version).replace(/^v/, "");

const releaseTitle = (version: string, type: ReleaseType) => {
  const base = titleVersion(version);
  const beta = normalizeVersion(version).match(/-beta\.(\d+)/);
  if (type === "security") return `${base} - SECURITY UPDATE: Manual Update Required`;
  if (type === "beta" && beta) return `${base.replace(/-beta\.\d+$/, "")} Beta ${beta[1]}`;
  return base;
};

const stackNeedsSig = (stack: Stack) => stack === "Tauri V2";
const stackCanMsi = (stack: Stack, type: ReleaseType) => (stack === "Tauri V2" || stack === "Electron") && type !== "beta";

const initialChanges: Change[] = [
  { id: 1, category: "PKG", featureName: "", description: "Updated packages.", subitems: "" }
];

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const renderInline = (value: string) =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

const renderMarkdown = (markdown: string) => {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let listOpen = false;
  let quoteOpen = false;
  let tableRows: string[] = [];

  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  const closeQuote = () => {
    if (quoteOpen) {
      html.push("</blockquote>");
      quoteOpen = false;
    }
  };

  const closeTable = () => {
    if (tableRows.length > 0) {
      html.push(`<table><tbody>${tableRows.join("")}</tbody></table>`);
      tableRows = [];
    }
  };

  for (const line of lines) {
    if (/^\|.*\|$/.test(line) && !/^\|\s*-+/.test(line)) {
      closeList();
      closeQuote();
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((cell) => `<td>${renderInline(cell.trim())}</td>`)
        .join("");
      tableRows.push(`<tr>${cells}</tr>`);
      continue;
    }
    closeTable();

    if (line.startsWith("> ")) {
      closeList();
      if (!quoteOpen) {
        html.push("<blockquote>");
        quoteOpen = true;
      }
      html.push(`<p>${renderInline(line.slice(2))}</p>`);
      continue;
    }
    closeQuote();

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^- (.+)$/);
    if (bullet) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    const nested = line.match(/^  - (.+)$/);
    if (nested) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${renderInline(nested[1])}</li>`);
      continue;
    }

    closeList();
    if (line.trim()) {
      html.push(`<p>${renderInline(line)}</p>`);
    }
  }

  closeTable();
  closeList();
  closeQuote();
  return html.join("\n");
};

const importantCallout = (stack: Stack) => {
  const lines = ["> [!IMPORTANT]"];
  if (stackNeedsSig(stack)) {
    lines.push(
      "> The `.sig` files in this repo are NOT normal gpg signatures — they are for Tauri V2's",
      "> updater to verify the integrity of updates before downloading and installing.",
      ">"
    );
  }
  lines.push(
    "> The `.asc` files are my normal GPG signatures which you can verify using my GPG Public",
    "> Key: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc"
  );
  if (stack === "Tauri V2") {
    lines.push(
      ">",
      "> ⚠️ Arm64 Linux Binaries are NOT available at the moment. Its something I may get around to",
      "> in the future but its not a priority. However, I do have the logic setup in the repo",
      "> in-case people would like to build their own :)"
    );
  }
  if (stack === "Flutter") {
    lines.push(">", "> This app is currently unstable. Bugs, issues, and rough edges are expected.");
  }
  return lines.join("\n");
};

const ASSET_BASE = (org: string, app: string, tag: string) =>
  `https://github.com/${org}/${app}/releases/download/${tag}`;

const downloadsTable = (
  includeMsi: boolean,
  appName: string,
  org: string,
  tag: string,
  msStoreId: string
) => {
  const ORG = (org || "<ORG>").trim() || "<ORG>";
  const APP = (appName || "<APP>").trim() || "<APP>";
  const TAG = (tag || "<TAG>").trim() || "<TAG>";
  const STORE = (msStoreId || "").trim();
  const base = ASSET_BASE(ORG, APP, TAG);

  const winRow1 = `**EXE:** [x64](${base}/${APP}-Win-x64.exe) / [arm64](${base}/${APP}-Win-arm64.exe)`;
  const winRow2 = STORE
    ? `<div align="center"><a href="https://apps.microsoft.com/detail/${STORE}?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div>`
    : "";
  const winRow3 = includeMsi ? "*See MSI note below*" : "";

  const macRow1 = `**[Universal DMG](${base}/${APP}-MacOS-universal.dmg)**`;
  const macRow2 = `**[Universal ZIP](${base}/${APP}-MacOS-universal.zip)**`;

  const linRow1 = `**AppImage:** [x64](${base}/${APP}-Linux-x86_64.AppImage) <!-- / [arm64](${base}/${APP}-Linux-arm64.AppImage) -->`;
  const linRow2 = `**DEB:** [x64](${base}/${APP}-Linux-amd64.deb) <!-- / [arm64](${base}/${APP}-Linux-arm64.deb) -->`;
  const linRow3 = `**RPM:** [x64](${base}/${APP}-Linux-x86_64.rpm) <!-- / [arm64](${base}/${APP}-Linux-aarch64.rpm) -->`;
  const linRow4 = `**Flatpak:** [x64](${base}/${APP}-Linux-x86_64.flatpak) <!-- / [arm64](${base}/${APP}-Linux-aarch64.flatpak) -->`;

  const header =
    '| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |';

  const rows = [
    `| ${winRow1} | ${macRow1} | ${linRow1} |`,
    `| ${winRow2} | ${macRow2} | ${linRow2} |`
  ];
  if (includeMsi) {
    rows.push(`| ${winRow3} | | ${linRow3} |`);
    rows.push(`| | | ${linRow4} |`);
  } else {
    rows.push(`| | | ${linRow3} |`);
    rows.push(`| | | ${linRow4} |`);
  }

  return ["# ⬇️ Downloads", "", header, "| :--- | :--- | :--- |", ...rows].join("\n");
};

const formatChange = (change: Change) => {
  const category = change.category === "NEW - Feature" ? `NEW - ${change.featureName || "Feature Name"}` : change.category;
  const description = change.description.trim() || "Description.";
  const subitems = change.subitems
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `  - ${item}`)
    .join("\n");
  return [`- **${category}:** ${description}`, subitems].filter(Boolean).join("\n");
};

const msiNote = [
  "### MSI Installer Support (MSI builds are NOT provided for betas)",
  "",
  "> [!IMPORTANT]",
  "> **Enterprise Users:** We support Windows X64/ARM64 `.MSI` installers for MDM/AD deployment.",
  ">",
  "> - `.MSI` installers do NOT support auto-updates. You must deploy the new MSI manually.",
  "> - These are strictly for enterprise management; standard users should use the EXE above.",
  '> - Files available in the "Assets" dropdown below.'
].join("\n");

const releaseInfo = [
  "## ℹ️ Release Info",
  "",
  "- **GPG Signed:** My public key is attached to every release to ensure authenticity.",
  "- **GPG Key:** You can get my public GPG key here: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc",
  "- **Code Signing:** macOS releases are fully signed. Windows releases are not signed by an org, but",
  "  are signed by my GPG signature (same with Linux).",
  "- **Legacy Binaries:** Separate x64/arm64 Windows binaries are deprecated in favor of the Universal",
  "  installer. They are still listed in the downloads section, but the universal installer is recommended",
  "  for simplicity."
].join("\n");

const validate = (markdown: string, kind: Kind): Validation[] => {
  const violations: Validation[] = [];
  const lines = markdown.split("\n");
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (/[•◦]/.test(line)) {
      violations.push({ id: "M001", line: lineNumber, message: "Literal bullet character found. Use markdown '-' bullets." });
    }
    if (/^##\s+Changes in\s+v\d/.test(line)) {
      violations.push({ id: "M007", line: lineNumber, message: "'Changes in' heading needs backticks." });
    }
    if (/^##\s+Changes in\s+`/.test(line) && !/^##\s+Changes in\s+`v\d+\.\d+\.\d+(?:[-+][\w.()\s-]+)?:`\s*$/.test(line)) {
      violations.push({ id: "M002", line: lineNumber, message: "Malformed 'Changes in' heading. Use ## Changes in `vX.Y.Z:`." });
    }
    if (/^- /.test(line) && !/^- \*\*[^*]+\*\*/.test(line)) {
      violations.push({ id: "M003", line: lineNumber, message: "Top-level bullet needs a bold category prefix." });
    }
    if (/^- \*\*[^*]+\*\*/.test(line) && !/[.!…]$|\.{3}$|`$/.test(line.trim())) {
      violations.push({ id: "M006", line: lineNumber, message: "Categorized bullet should end with punctuation." });
    }
    if (/^- \*\*MISC:\*\*/.test(line)) {
      violations.push({ id: "M008", line: lineNumber, message: "Use canonical 'Misc:', not 'MISC:'." });
    }
    if (/BETA build/.test(line)) {
      violations.push({ id: "M009", line: lineNumber, message: "Use 'Beta build', not 'BETA build'." });
    }
    if (/\bMacOS\b/.test(line)) {
      violations.push({ id: "BCLS", line: lineNumber, message: "Use 'macOS', not 'MacOS'." });
    }
  });
  if (kind === "web") {
    if (/^#\s+⬇️\s+Downloads\s*$/m.test(markdown)) {
      violations.push({ id: "W001", message: "Kind web MUST NOT contain '# ⬇️ Downloads'." });
    }
    if (/^##\s+ℹ️\s+Release Info\s*$/m.test(markdown)) {
      violations.push({ id: "W002", message: "Kind web MUST NOT contain '## ℹ️ Release Info'." });
    }
  } else {
    if (!/^#\s+⬇️\s+Downloads\s*$/m.test(markdown)) {
      violations.push({ id: "M004", message: "Missing '# ⬇️ Downloads' section." });
    }
    if (!/^##\s+ℹ️\s+Release Info\s*$/m.test(markdown)) {
      violations.push({ id: "M005", message: "Missing '## ℹ️ Release Info' section." });
    }
  }
  return violations;
};

export default function ReleaseBuilder() {
  const [kind, setKind] = useState<Kind>("binary");
  const [appName, setAppName] = useState("IYERIS");
  const [org, setOrg] = useState("BurntToasters");
  const [stack, setStack] = useState<Stack>("Tauri V2");
  const [version, setVersion] = useState("v1.0.0");
  const [releaseType, setReleaseType] = useState<ReleaseType>("patch");
  const [includeMsi, setIncludeMsi] = useState(true);
  const [msStoreId, setMsStoreId] = useState("");
  const [changes, setChanges] = useState<Change[]>(initialChanges);
  const [carryForward, setCarryForward] = useState("");
  const [securityText, setSecurityText] = useState("I'm sorry for the inconvenience. Please download and install this release manually so future updates can continue normally.");
  const [manualSteps, setManualSteps] = useState("Download the installer for your platform.\nRun the installer manually.\nOpen the app again after installation.");
  const [copyStatus, setCopyStatus] = useState("");

  const isWeb = kind === "web";
  const canShowMsi = !isWeb && stackCanMsi(stack, releaseType);
  const normalized = normalizeVersion(version);
  const effectiveMsi = canShowMsi && includeMsi;

  const markdown = useMemo(() => {
    const sections: string[] = [];
    if (releaseType === "beta") {
      sections.push("> [!NOTE]\n> 🅱️ This is a Beta build.");
    }
    if (!isWeb) {
      sections.push(downloadsTable(effectiveMsi, appName, org, normalized, msStoreId));
      sections.push(importantCallout(stack));
    }
    sections.push(`### ℹ️ Enjoying ${appName || "<App>"}? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)`);
    if (releaseType === "major") {
      const major = normalized.match(/^v(\d+)/)?.[1] || "N";
      sections.push(`# Welcome to ${appName || "<App>"} v${major}!!!\n\n<Optional hook line>\n\n## Why are we already on ${major}.0?\n<Story / motivation paragraphs>\n\n## Breaking Changes\n<What users must do>`);
    }
    const changeLines = [`## Changes in \`${normalized}:\``];
    if (releaseType === "security") {
      changeLines.push("", "### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!", "", securityText.trim());
      const steps = manualSteps
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean)
        .map((step) => `- **Manual Update:** ${step.endsWith(".") || step.endsWith("!") ? step : `${step}.`}`)
        .join("\n");
      if (steps) changeLines.push("", steps);
    }
    if (releaseType === "beta" && /-beta\.1$/.test(normalized)) {
      changeLines.push(
        "",
        `Beta 1 releases of ${appName || "<App>"} don't include any changes besides pkg updates, and are`,
        "meant to sync beta users to the latest STABLE."
      );
    }
    changeLines.push("", changes.map(formatChange).join("\n"));
    sections.push(changeLines.join("\n"));
    if (carryForward.trim()) {
      sections.push(carryForward.trim());
    }
    if (effectiveMsi) {
      sections.push(msiNote);
    }
    if (!isWeb) {
      sections.push(releaseInfo);
    }
    return sections.join("\n\n");
  }, [isWeb, appName, org, stack, normalized, releaseType, effectiveMsi, msStoreId, changes, carryForward, securityText, manualSteps]);

  const validations = useMemo(() => validate(markdown, kind), [markdown, kind]);
  const preview = useMemo(() => renderMarkdown(markdown), [markdown]);

  const updateChange = (id: number, patch: Partial<Change>) => {
    setChanges((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addChange = () => {
    setChanges((items) => [
      ...items,
      { id: Math.max(0, ...items.map((item) => item.id)) + 1, category: "Misc", featureName: "", description: "", subitems: "" }
    ]);
  };

  const removeChange = (id: number) => {
    setChanges((items) => (items.length === 1 ? items : items.filter((item) => item.id !== id)));
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopyStatus("Copied release body Markdown.");
    window.setTimeout(() => setCopyStatus(""), 1800);
  };

  return (
    <div className="bcls-builder">
      <div className="builder-panel">
        <h2>Guided Composer</h2>
        <div className="builder-two">
          <label className="builder-field">
            <span className="builder-label">Kind</span>
            <select
              className="builder-select"
              value={kind}
              onChange={(event) => {
                const next = event.target.value as Kind;
                setKind(next);
                if (next === "web") {
                  setSecurityText("I'm sorry for the inconvenience. Reload the site (a hard refresh is enough); you do not need to download anything.");
                  setManualSteps("Hard-refresh the site.\nConfirm you are on the new version.");
                }
              }}
            >
              <option value="binary">binary (installers)</option>
              <option value="web">web (no binaries)</option>
            </select>
          </label>
          <label className="builder-field">
            <span className="builder-label">{isWeb ? "Site / project name" : "App name"}</span>
            <input className="builder-input" value={appName} onChange={(event) => setAppName(event.target.value)} />
          </label>
          {!isWeb && (
            <label className="builder-field">
              <span className="builder-label">GitHub org/user</span>
              <input className="builder-input" value={org} onChange={(event) => setOrg(event.target.value)} placeholder="BurntToasters" />
            </label>
          )}
          <label className="builder-field">
            <span className="builder-label">Version tag</span>
            <input className="builder-input" value={version} onChange={(event) => setVersion(event.target.value)} />
          </label>
          {!isWeb && (
            <label className="builder-field">
              <span className="builder-label">MS Store ID (optional)</span>
              <input className="builder-input" value={msStoreId} onChange={(event) => setMsStoreId(event.target.value)} placeholder="9pkgd6lkcl5j" />
            </label>
          )}
          {!isWeb && (
            <label className="builder-field">
              <span className="builder-label">Stack</span>
              <select className="builder-select" value={stack} onChange={(event) => setStack(event.target.value as Stack)}>
                <option>Tauri V2</option>
                <option>Electron</option>
                <option>Flutter</option>
                <option>Other</option>
              </select>
            </label>
          )}
          <label className="builder-field">
            <span className="builder-label">Release type</span>
            <select className="builder-select" value={releaseType} onChange={(event) => setReleaseType(event.target.value as ReleaseType)}>
              <option value="patch">patch</option>
              <option value="minor">minor</option>
              <option value="major">major</option>
              <option value="beta">beta</option>
              <option value="security">security</option>
            </select>
          </label>
        </div>
        {canShowMsi && (
          <label className="builder-row">
            <span className="builder-label">MSI builds</span>
            <select className="builder-select" value={includeMsi ? "yes" : "no"} onChange={(event) => setIncludeMsi(event.target.value === "yes")}>
              <option value="yes">Included</option>
              <option value="no">Not included</option>
            </select>
          </label>
        )}
        {releaseType === "security" && (
          <div className="builder-two">
            <label className="builder-field">
              <span className="builder-label">Security/manual-update paragraph</span>
              <textarea className="builder-textarea" value={securityText} onChange={(event) => setSecurityText(event.target.value)} />
            </label>
            <label className="builder-field">
              <span className="builder-label">{isWeb ? "Reload steps" : "Manual install steps"}</span>
              <textarea className="builder-textarea" value={manualSteps} onChange={(event) => setManualSteps(event.target.value)} />
            </label>
          </div>
        )}
      </div>

      <div className="builder-grid">
        <section className="builder-panel">
          <h3>Changes</h3>
          {changes.map((change) => (
            <div className="change-card" key={change.id}>
              <div className="builder-two">
                <label className="builder-field">
                  <span className="builder-label">Category</span>
                  <select className="builder-select" value={change.category} onChange={(event) => updateChange(change.id, { category: event.target.value })}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                {change.category === "NEW - Feature" && (
                  <label className="builder-field">
                    <span className="builder-label">Feature name</span>
                    <input className="builder-input" value={change.featureName} onChange={(event) => updateChange(change.id, { featureName: event.target.value })} />
                  </label>
                )}
              </div>
              <label className="builder-field">
                <span className="builder-label">Description</span>
                <input className="builder-input" value={change.description} onChange={(event) => updateChange(change.id, { description: event.target.value })} />
              </label>
              <label className="builder-field">
                <span className="builder-label">Optional sub-bullets, one per line</span>
                <textarea className="builder-textarea" value={change.subitems} onChange={(event) => updateChange(change.id, { subitems: event.target.value })} />
              </label>
              <button className="builder-button" type="button" onClick={() => removeChange(change.id)} disabled={changes.length === 1}>
                Remove
              </button>
            </div>
          ))}
          <button className="builder-button" type="button" onClick={addChange}>
            Add change
          </button>
        </section>

        <section className="builder-panel">
          <h3>Carry-forward Sections</h3>
          <label className="builder-field">
            <span className="builder-label">Paste prior `## Changes in` blocks here</span>
            <textarea className="builder-textarea" value={carryForward} onChange={(event) => setCarryForward(event.target.value)} />
          </label>
          <h3>Checks</h3>
          <ul className="validation-list">
            {validations.length === 0 ? (
              <li className="ok">No inline BCLS issues found.</li>
            ) : (
              validations.map((item, index) => (
                <li className="error" key={`${item.id}-${index}`}>
                  {item.id}{item.line ? ` line ${item.line}` : ""}: {item.message}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <div className="builder-grid">
        <section className="builder-panel">
          <h3>Release Title</h3>
          <pre>{releaseTitle(version, releaseType)}</pre>
          <div className="builder-actions">
            <button className="builder-button primary" type="button" onClick={copyMarkdown}>
              Copy Markdown
            </button>
          </div>
          <div className="copy-status" aria-live="polite">{copyStatus}</div>
          <textarea className="builder-textarea builder-output" readOnly value={markdown} />
        </section>
        <section className="builder-panel builder-preview">
          <h3>Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </section>
      </div>
    </div>
  );
}
