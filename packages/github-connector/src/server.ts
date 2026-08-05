import { run } from 'probot';
import SmeeClient from 'smee-client';
import { handleIssueEvent } from './webhooks/issue_handler.ts';

/**
 * Enterprise AI Probot GitHub App Server with Smee.io Forwarding
 */
export function startGitHubAppServer() {
  const port = process.env.PORT || 4000;
  const smeeUrl = process.env.WEBHOOK_PROXY_URL || 'https://smee.io/KShRqrPDcgLv6';

  if (smeeUrl) {
    const smee = new SmeeClient({
      source: smeeUrl,
      target: `http://localhost:${port}/api/github/webhooks`,
      logger: console
    });
    smee.start();
    console.log(`📡 Smee.io Webhook Forwarder connected: ${smeeUrl} -> http://localhost:${port}/api/github/webhooks`);
  }

  run((app) => {
    app.log.info('🚀 Enterprise AI GitHub Connector is running!');

    app.on(['issues.labeled', 'issue_comment.created'], async (context) => {
      const payload = context.payload;
      app.log.info(`[Webhook Event] Processing event for issue #${(payload as any).issue?.number}`);
      
      const result = await handleIssueEvent(payload);
      if (result) {
        app.log.info(`[Pipeline Complete] Created PR branch ${result.branch}`);
      }
    });
  });
}

// Start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startGitHubAppServer();
}
