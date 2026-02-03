import mammoth from 'mammoth';
import { readFileSync, writeFileSync, renameSync, existsSync } from 'fs';
import { basename, join } from 'path';
import { execSync } from 'child_process';

/**
 * Convert a .docx file to markdown with frontmatter
 * Usage: node scripts/convert-docx.mjs path/to/file.docx
 */

const docxPath = process.argv[2];

if (!docxPath) {
  console.error('Usage: node scripts/convert-docx.mjs <path-to-docx>');
  process.exit(1);
}

if (!existsSync(docxPath)) {
  console.error(`File not found: ${docxPath}`);
  process.exit(1);
}

async function convertDocx(filePath) {
  console.log(`\n📄 Converting: ${filePath}`);

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
  let title = titleMatch ? titleMatch[1].trim() : basename(filePath, '.docx').replace(/-/g, ' ');

  // Remove the first heading if we extracted it as title
  if (titleMatch) {
    markdown = markdown.replace(/^#\s+.+\n+/, '');
  }

  // Generate slug from filename
  const slug = basename(filePath, '.docx')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine type based on content length (essays are longer)
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
  const outputPath = join('src/content/writing', `${slug}.md`);
  writeFileSync(outputPath, finalContent);
  console.log(`✅ Created: ${outputPath}`);

  // Move original to archived
  const archivedPath = join('drafts/archived', basename(filePath));
  renameSync(filePath, archivedPath);
  console.log(`📦 Archived: ${archivedPath}`);

  return { slug, title, outputPath };
}

async function main() {
  try {
    const { slug, title, outputPath } = await convertDocx(docxPath);

    // Auto-commit and push
    console.log('\n🚀 Committing and pushing...');
    execSync(`git add "${outputPath}"`, { stdio: 'inherit' });
    execSync(`git commit -m "post: ${title}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    console.log(`\n✨ Done! Post will be live shortly at /writing/${slug}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
