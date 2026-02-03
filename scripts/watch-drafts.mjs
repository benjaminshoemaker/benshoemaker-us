import chokidar from 'chokidar';
import { spawn } from 'child_process';
import { basename } from 'path';

/**
 * Watch the drafts/ folder for new .docx files and auto-convert them
 * Usage: npm run watch-drafts
 */

const DRAFTS_DIR = 'drafts';

console.log('👀 Watching for new .docx files in drafts/');
console.log('   Drop a Google Doc export here to auto-publish\n');

// Debounce to avoid processing files that are still being written
const pendingFiles = new Map();
const DEBOUNCE_MS = 2000;

const watcher = chokidar.watch(`${DRAFTS_DIR}/*.docx`, {
  ignored: /archived/,
  persistent: true,
  ignoreInitial: false, // Process existing files on startup
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

watcher.on('add', (filePath) => {
  const fileName = basename(filePath);

  // Clear any existing timeout for this file
  if (pendingFiles.has(filePath)) {
    clearTimeout(pendingFiles.get(filePath));
  }

  console.log(`📥 Detected: ${fileName}`);

  // Debounce to ensure file is fully written
  const timeout = setTimeout(() => {
    pendingFiles.delete(filePath);
    processFile(filePath);
  }, DEBOUNCE_MS);

  pendingFiles.set(filePath, timeout);
});

function processFile(filePath) {
  console.log(`\n⚙️  Processing: ${basename(filePath)}`);

  const child = spawn('node', ['scripts/convert-docx.mjs', filePath], {
    stdio: 'inherit'
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n👀 Watching for more files...\n');
    } else {
      console.error(`\n❌ Conversion failed with code ${code}`);
      console.log('👀 Watching for more files...\n');
    }
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping watcher...');
  watcher.close();
  process.exit(0);
});
