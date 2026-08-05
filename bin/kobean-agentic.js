#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const command = process.argv[2] || 'setup';
const args = process.argv.slice(3);

if (command === 'setup') {
  spawnSync('node', ['--experimental-strip-types', path.join(rootDir, 'scripts/setup.ts'), ...args], {
    cwd: rootDir,
    stdio: 'inherit'
  });
} else if (command === 'dev') {
  spawnSync('npx', ['pnpm', '--filter', '@enterprise-ai/control-console', 'dev'], {
    cwd: rootDir,
    stdio: 'inherit'
  });
} else if (command === 'dry-run') {
  spawnSync('node', ['--experimental-strip-types', path.join(rootDir, 'scripts/e2e_dry_run.ts')], {
    cwd: rootDir,
    stdio: 'inherit'
  });
} else {
  console.log('Enterprise AI Pipeline Platform CLI');
  console.log('Usage: kobean-agentic <command>');
  console.log('\nCommands:');
  console.log('  setup [repo]   Run 1-command interactive setup');
  console.log('  dev            Launch Next.js Control Console Dashboard');
  console.log('  dry-run        Execute end-to-end dry run pipeline');
}
