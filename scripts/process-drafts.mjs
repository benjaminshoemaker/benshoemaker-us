import mammoth from 'mammoth';
import { readdirSync, writeFileSync, renameSync, existsSync } from 'fs';
import { basename, join } from 'path';
import { execSync } from 'child_process';

/**
 * Process all .docx files in drafts/ folder
 * Called by pre-commit hook
 */

const DRAFTS_DIR = 'drafts';
const OUTPUT_DIR = 'src/content/writing';
const ARCHIVED_DIR = 'drafts/archived';

// Find all docx files in drafts/
const docxFiles = readdirSync(DRAFTS_DIR)
  .filter(f => f.endsWith('.docx'));

if (docxFiles.length === 0) {
  process.exit(0); // Nothing to process
}

console.log(`\n📄 Found ${docxFiles.length} draft(s) to convert...\n`);

async function convertDocx(fileName) {
  const filePath = join(DRAFTS_DIR, fileName);

  // Convert docx to markdown
  const result = await mammoth.convertToMarkdown(
    { path: filePath },
    {
      styleMap: [
        "p[style-name='Heading 1'] => # ",
        "p[style-name='Heading 2'] => ## ",
        "p[style-name='Heading 3'] => ### ",
      ]
    }
  );

  let markdown = result.value;

  // Extract title from first heading or filename
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  let title = titleMatch ? titleMatch[1].trim() : basename(fileName, '.docx').replace(/-/g, ' ');

  // Remove the first heading if we extracted it as title
  if (titleMatch) {
    markdown = markdown.replace(/^#\s+.+\n+/, '');
  }

  // Generate slug from filename
  const slug = basename(fileName, '.docx')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine type based on content length
  const wordCount = markdown.split(/\s+/).length;
  const type = wordCount > 500 ? 'essay' : 'note';

  // Build frontmatter
  const today = new Date().toISOString().split('T')[0];
  const frontmatter = `---
title: "${title}"
date: ${today}
type: ${type}
tags: []
description: ""
draft: false
---

`;

  const finalContent = frontmatter + markdown.trim() + '\n';

  // Write to content directory
  const outputPath = join(OUTPUT_DIR, `${slug}.md`);
  writeFileSync(outputPath, finalContent);
  console.log(`   ✅ ${fileName} → ${slug}.md`);

  // Move original to archived
  const archivedPath = join(ARCHIVED_DIR, fileName);
  renameSync(filePath, archivedPath);

  return outputPath;
}

async function main() {
  const outputPaths = [];

  for (const fileName of docxFiles) {
    try {
      const outputPath = await convertDocx(fileName);
      outputPaths.push(outputPath);
    } catch (error) {
      console.error(`   ❌ Failed to convert ${fileName}: ${error.message}`);
    }
  }

  // Stage the new markdown files
  if (outputPaths.length > 0) {
    execSync(`git add ${outputPaths.map(p => `"${p}"`).join(' ')}`, { stdio: 'inherit' });
    console.log(`\n📝 Staged ${outputPaths.length} new post(s)\n`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
