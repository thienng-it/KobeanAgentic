import express from 'express';
import SmeeClient from 'smee-client';
import { handleIssueEvent } from './webhooks/issue_handler.ts';

/**
 * Enterprise AI Probot & Express GitHub App Server with Smee.io Forwarding
 */
export function startGitHubAppServer() {
  const app = express();
  app.use(express.json());

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

  app.post('/api/github/webhooks', async (req, res) => {
    const payload = req.body;
    const eventType = req.headers['x-github-event'] || 'issues';

    console.log(`\n[Webhook Received] Event: ${eventType}, Action: ${payload.action}, Issue #${payload.issue?.number || 'N/A'}`);

    res.status(200).json({ status: 'OK' });

    try {
      const result = await handleIssueEvent(payload);
      if (result) {
        console.log(`\n✅ [Pipeline Complete] Created PR branch ${result.branch}`);
      }
    } catch (err: any) {
      console.error('❌ Pipeline processing error:', err.message);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Enterprise AI Connector listening on http://localhost:${port}`);
  });
}

// Start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startGitHubAppServer();
}
