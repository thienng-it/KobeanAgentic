import { run } from 'probot';
import { handleIssueEvent } from './webhooks/issue_handler.ts';

/**
 * Enterprise AI Probot GitHub App Server
 */
export function startGitHubAppServer() {
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
