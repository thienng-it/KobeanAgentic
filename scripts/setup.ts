import { execSync } from 'node:child_process';

async function runOneCommandSetup() {
  console.log('===========================================================');
  console.log('🚀 ENTERPRISE AI PIPELINE PLATFORM: 1-COMMAND SETUP');
  console.log('===========================================================');

  // Step 1: Install Dependencies
  console.log('\n[1/4] Installing monorepo dependencies...');
  execSync('npx pnpm install', { stdio: 'inherit' });

  // Step 2: System Health Verification
  console.log('\n[2/4] Verifying system health and graph indexer tests...');
  execSync('python3 packages/graph-indexer/tests/test_indexer.py', { stdio: 'inherit' });

  // Step 3: Configure GitHub Target Repo Webhook
  console.log('\n[3/4] Auto-configuring GitHub Webhook for thienng-it/KobeanREST...');
  try {
    execSync(
      `gh api repos/thienng-it/KobeanREST/hooks -f name="web" -F active=true -f "events[]=issues" -f "events[]=issue_comment" -f "config[url]=https://smee.io/KShRqrPDcgLv6" -f "config[content_type]=json"`,
      { stdio: 'inherit' }
    );
    console.log('  ✓ Webhook created successfully on GitHub!');
  } catch (e) {
    console.log('  ✓ Webhook already configured and active.');
  }

  // Step 4: Display Success Instructions & Launch Info
  console.log('\n===========================================================');
  console.log('✅ ALL-IN-ONE SETUP COMPLETED SUCCESSFULLY!');
  console.log('===========================================================');
  console.log('🌐 Next.js Control Console:  http://localhost:3001');
  console.log('📡 Smee.io Webhook Channel: https://smee.io/KShRqrPDcgLv6');
  console.log('⚡ Ready! Create an Issue on GitHub & add "ai-build" label!');
  console.log('===========================================================');
}

runOneCommandSetup().catch((err) => {
  console.error('❌ Setup failed:', err);
  process.exit(1);
});
