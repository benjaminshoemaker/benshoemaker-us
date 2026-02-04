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

  // Clean up mammoth conversion artifacts
  // 1. Remove Google Docs anchor tags: <a id="..."></a>
  markdown = markdown.replace(/<a id="[^"]*"><\/a>/g, '');
  // 2. Fix mammoth's excessive backslash escaping (periods, parens, hyphens)
  markdown = markdown.replace(/\\([.\-()>])/g, '$1');
  // 3. Convert double-underscore bold (__text__) to standard markdown (**text**)
  markdown = markdown.replace(/__([^_]+)__/g, '**$1**');
  // 4. Clean up any resulting empty headings or extra whitespace
  markdown = markdown.replace(/^(#{1,6})\s*\n/gm, '');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // Extract title from first heading, or derive from filename
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  let title;
  if (titleMatch) {
    title = titleMatch[1].trim();
    markdown = markdown.replace(/^#\s+.+\n+/, '');
  } else {
    // Convert slug-style filename to title case: "the-ai-wrapper-problem" → "The AI Wrapper Problem"
    title = basename(fileName, '.docx')
      .replace(/[_-]+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  // Clean any residual HTML tags from title
  title = title.replace(/<[^>]+>/g, '').trim();

  // Extract description from first non-empty, non-image paragraph
  const bodyLines = markdown.trim().split('\n').filter(l => l.trim() && !l.startsWith('!['));
  let description = '';
  if (bodyLines.length > 0) {
    // Take first paragraph, strip markdown formatting, truncate to ~160 chars
    description = bodyLines[0]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // [text](url) → text
      .replace(/[*_`#]/g, '')                     // strip formatting chars
      .replace(/\\([.\-()>!])/g, '$1')            // unescape
      .trim();
    if (description.length > 160) {
      description = description.slice(0, 157).replace(/\s+\S*$/, '') + '...';
    }
  }

  // Determine type based on content length
  const wordCount = markdown.split(/\s+/).length;
  const type = wordCount > 500 ? 'essay' : 'note';

  // Build frontmatter — tags left empty for manual curation
  const today = new Date().toISOString().split('T')[0];
  const frontmatter = `---
title: "${title}"
date: ${today}
type: ${type}
tags: []
description: "${description}"
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
