import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createGitWorktree, removeGitWorktree } from '../src/worktree/worktree_manager';
import { handleIssueEvent } from '../src/webhooks/issue_handler';

describe('Git Worktree Manager & Webhook Connector', () => {
  it('creates an isolated git worktree path', async () => {
    const issueId = 'ISSUE-202';
    const worktree = await createGitWorktree('.', issueId);

    assert.strictEqual(worktree.branch, 'ai/feat-ISSUE-202');
    assert.ok(worktree.worktreePath.includes('ai_worktrees/ISSUE-202'));

    const cleanup = await removeGitWorktree(worktree.worktreePath);
    assert.strictEqual(cleanup.success, true);
  });

  it('processes issue.labeled event and generates PR payload', async () => {
    const eventPayload = {
      action: 'labeled',
      label: { name: 'ai-build' },
      issue: {
        number: 42,
        title: 'Add User Auth Endpoint',
        body: 'Create POST /api/auth endpoint',
        html_url: 'https://github.com/example/repo/issues/42'
      },
      repository: {
        clone_url: 'https://github.com/example/repo.git',
        default_branch: 'main'
      }
    };

    const prPayload = await handleIssueEvent(eventPayload);
    assert.notStrictEqual(prPayload, null);
    assert.strictEqual(prPayload?.title, 'feat(ISSUE-42): Add User Auth Endpoint');
    assert.strictEqual(prPayload?.branch, 'ai/feat-ISSUE-42');
  });
});
