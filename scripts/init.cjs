#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const colors = {
  error: '\x1b[31m',
  success: '\x1b[32m',
  reset: '\x1b[0m'
};

const sourceSwPath = path.join(__dirname, '../node_modules/msw/lib/mockServiceWorker.js');
const targetSwPath = path.join(process.cwd(), 'public/mockServiceWorker.js');

try {
  if (!fs.existsSync(sourceSwPath)) {
    console.error(colors.error + '❌  Mock Service Worker not found' + colors.reset);
    process.exit(0);
  }

  const publicDir = path.dirname(targetSwPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.copyFileSync(sourceSwPath, targetSwPath);
  console.log(colors.success + '✅  Mock Service Worker copied to public/' + colors.reset);

} catch (error) {
  console.error(colors.error + '❌  Failed to copy Mock Service Worker:' + colors.reset);
  console.error(colors.error + error.message + colors.reset);
}