import mammoth from 'mammoth';
import { readdirSync, writeFileSync, renameSync, mkdirSync, existsSync } from 'fs';
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

  // Generate slug from filename (needed early for image paths)
  const slug = basename(fileName, '.docx')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Create image output directory
  const imageDir = join('public', 'images', 'writing', slug);
  let imageCount = 0;

  // Convert docx to markdown, extracting embedded images
  const result = await mammoth.convertToMarkdown(
    { path: filePath },
    {
      styleMap: [
        "p[style-name='Heading 1'] => # ",
        "p[style-name='Heading 2'] => ## ",
        "p[style-name='Heading 3'] => ### ",
      ],
      convertImage: mammoth.images.imgElement(function (image) {
        return image.read().then(function (imageBuffer) {
          imageCount++;
          const ext = image.contentType.split('/')[1] || 'png';
          const imageName = `image-${imageCount}.${ext}`;

          // Ensure directory exists
          mkdirSync(imageDir, { recursive: true });

          // Write image file
          const imagePath = join(imageDir, imageName);
          writeFileSync(imagePath, imageBuffer);

          return { src: `/images/writing/${slug}/${imageName}` };
        });
      }),
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
  if (imageCount > 0) {
    console.log(`   ✅ ${fileName} → ${slug}.md (${imageCount} image${imageCount > 1 ? 's' : ''} extracted)`);
  } else {
    console.log(`   ✅ ${fileName} → ${slug}.md`);
  }

  // Move original to archived
  const archivedPath = join(ARCHIVED_DIR, fileName);
  renameSync(filePath, archivedPath);

  return { outputPath, imageDir: imageCount > 0 ? imageDir : null };
}

async function main() {
  const results = [];

  for (const fileName of docxFiles) {
    try {
      const result = await convertDocx(fileName);
      results.push(result);
    } catch (error) {
      console.error(`   ❌ Failed to convert ${fileName}: ${error.message}`);
    }
  }

  // Stage the new markdown files and any extracted images
  if (results.length > 0) {
    const pathsToStage = results.map(r => `"${r.outputPath}"`);
    for (const r of results) {
      if (r.imageDir) pathsToStage.push(`"${r.imageDir}"`);
    }
    execSync(`git add ${pathsToStage.join(' ')}`, { stdio: 'inherit' });
    console.log(`\n📝 Staged ${results.length} new post(s)\n`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
