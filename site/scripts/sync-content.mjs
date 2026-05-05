// SPDX-License-Identifier: MPL-2.0
import { mkdirSync, rmSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

const siteRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
const repoRoot = resolve(siteRoot, "..");
const outRoot = join(siteRoot, "src/content/docs/generated");

const titleCase = (value) =>
  value
    .replace(/[-_]/g, " ")
    .replace(/\.md$/, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const routeName = (file) => basename(file, ".md").replace(/\./g, "");

const frontmatter = (title, description) =>
  `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;

const removeBclsComments = (text) =>
  text
    .replace(/^<!-- bcls:(?:partial|ignore-start|ignore-end) -->\n?/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();

const rewriteRootLinks = (text) =>
  text
    .replace(/\]\(STANDARD\.md\)/g, "](/generated/standard/)")
    .replace(/\]\(AGENTS\.md\)/g, "](/generated/agents/)")
    .replace(/\]\(CHANGELOG\.md\)/g, "](/generated/changelog/)")
    .replace(/\]\(TEMPLATES\/\)/g, "](/generated/templates/)")
    .replace(/\]\(EXAMPLES\/\)/g, "](/generated/examples/)");

const stripFirstHeading = (text) => text.replace(/^# .+\n\n?/, "");

const writeDoc = (slug, title, description, body) => {
  const target = join(outRoot, `${slug}.md`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, frontmatter(title, description) + body.trim() + "\n");
};

const readRoot = (path) => readFileSync(join(repoRoot, path), "utf8");

rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

writeDoc(
  "standard",
  "Standard",
  "The canonical BurntToasters Changelog Standard.",
  rewriteRootLinks(stripFirstHeading(removeBclsComments(readRoot("STANDARD.md"))))
);

writeDoc(
  "agents",
  "Agent Checklist",
  "The condensed operational checklist for agents drafting BCLS release notes.",
  rewriteRootLinks(stripFirstHeading(removeBclsComments(readRoot("AGENTS.md"))))
);

writeDoc(
  "changelog",
  "Changelog",
  "Changes to the BCLS specification.",
  rewriteRootLinks(stripFirstHeading(removeBclsComments(readRoot("CHANGELOG.md"))))
);

const writeListing = (directory, label, description, files) => {
  const items = files
    .map((file) => {
      const name = routeName(file);
      return `- [${titleCase(basename(file, ".md"))}](/generated/${directory}/${name}/)`;
    })
    .join("\n");
  writeDoc(`${directory}/index`, label, description, items);
};

const writeRawPage = (directory, file, description) => {
  const sourcePath = `${directory.toUpperCase()}/${file}`;
  const name = routeName(file);
  const title = titleCase(basename(file, ".md"));
  const content = removeBclsComments(readRoot(sourcePath));
  const body = `Source: \`${relative(repoRoot, join(repoRoot, sourcePath))}\`\n\n\`\`\`markdown\n${content}\n\`\`\``;
  writeDoc(`${directory}/${name}`, title, description, body);
};

const templates = readdirSync(join(repoRoot, "TEMPLATES"))
  .filter((file) => file.endsWith(".md"))
  .sort();
writeListing("templates", "Templates", "Copy-friendly BCLS release-note templates.", templates);
for (const file of templates) {
  writeRawPage("templates", file, "A BCLS release-note template.");
}

const examples = readdirSync(join(repoRoot, "EXAMPLES"))
  .filter((file) => file.endsWith(".md"))
  .sort();
writeListing("examples", "Examples", "Annotated BCLS release-note examples.", examples);
for (const file of examples) {
  writeRawPage("examples", file, "An annotated BCLS release-note example.");
}
