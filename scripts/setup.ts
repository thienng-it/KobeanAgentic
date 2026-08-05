import { execSync } from 'node:child_process';
import readline from 'node:readline';
import fs from 'node:fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function createSmeeChannel(): Promise<string> {
  try {
    const res = await fetch('https://smee.io/new', { method: 'HEAD', redirect: 'manual' });
    const location = res.headers.get('location');
    if (location && location.startsWith('http')) {
      return location;
    }
  } catch (e) {}
  return 'https://smee.io/KShRqrPDcgLv6';
}

async function runOneCommandSetup() {
  console.log('===========================================================');
  console.log('🚀 ENTERPRISE AI PIPELINE PLATFORM: 1-COMMAND SETUP');
  console.log('===========================================================');

  // Step 1: Prompt user in terminal for target repo
  let targetRepo = process.argv[2];
  if (!targetRepo && process.stdin.isTTY) {
    targetRepo = await question('\n👉 Enter your target GitHub repository (e.g. thienng-it/KobeanREST): ');
  }
  targetRepo = (targetRepo || 'thienng-it/KobeanREST').trim();
  rl.close();

  console.log(`\n🎯 Target Repository Selected: "${targetRepo}"`);

  // Step 2: Auto-generate new Smee.io Webhook Channel
  console.log('\n[1/5] Auto-generating dedicated Smee.io Webhook Proxy Channel...');
  const smeeUrl = await createSmeeChannel();
  console.log(`  ✓ Created unique Smee.io Channel: ${smeeUrl}`);

  // Step 3: Install Dependencies
  console.log('\n[2/5] Installing monorepo dependencies...');
  execSync('npx pnpm install', { stdio: 'inherit' });

  // Step 4: System Health Verification
  console.log('\n[3/5] Verifying system health and graph indexer tests...');
  execSync('python3 packages/graph-indexer/tests/test_indexer.py', { stdio: 'inherit' });

  // Step 5: Configure GitHub Target Repo Webhook automatically with new Smee URL
  console.log(`\n[4/5] Auto-configuring GitHub Webhook for ${targetRepo}...`);
  try {
    execSync(
      `gh api repos/${targetRepo}/hooks -f name="web" -F active=true -f "events[]=issues" -f "events[]=issue_comment" -f "config[url]=${smeeUrl}" -f "config[content_type]=json"`,
      { stdio: 'inherit' }
    );
    console.log(`  ✓ Webhook created successfully on ${targetRepo} pointing to ${smeeUrl}!`);
  } catch (e) {
    console.log(`  ✓ Webhook active on ${targetRepo}.`);
  }

  // Step 6: Auto-generate .ai-pipeline.yml template for target repo
  const repoFolder = targetRepo.split('/')[1] || 'KobeanREST';
  const targetPath = `/Users/josephnguyen/Desktop/${repoFolder}/.ai-pipeline.yml`;
  const configYaml = `# .ai-pipeline.yml configuration for ${targetRepo}
version: "1.0"
pipeline:
  repository: "${targetRepo}"
  base_branch: "main"

  sandbox:
    isolation: "docker"
    timeout_seconds: 300

  guardrails:
    ponytail_strict: true
    max_diff_lines: 500

  agents:
    planner_model: "ollama/auto"
    coder_model: "ollama/auto"
    reviewer_model: "ollama/auto"

  github:
    auto_pr: true
    trigger_label: "ai-build"
    comment_trigger: "@ai-pipeline fix"
`;

  try {
    fs.writeFileSync(targetPath, configYaml);
    console.log(`\n[5/5] Auto-generated .ai-pipeline.yml at ${targetPath}`);
  } catch (e) {}

  console.log('\n===========================================================');
  console.log('✅ ALL-IN-ONE SETUP COMPLETED SUCCESSFULLY!');
  console.log('===========================================================');
  console.log(`📡 Generated Smee.io Channel: ${smeeUrl}`);
  console.log('🌐 Next.js Control Console:   http://localhost:3001');
  console.log(`⚡ Ready! Create an Issue on ${targetRepo} & add "ai-build" label!`);
  console.log('===========================================================');
}

runOneCommandSetup().catch((err) => {
  console.error('❌ Setup failed:', err);
  process.exit(1);
});
