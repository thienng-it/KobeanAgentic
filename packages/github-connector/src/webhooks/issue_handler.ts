import { runPipelineEngine } from '../../../engine/src/index.ts';
import type { SpecificationInput } from '../../../engine/src/types/index.ts';
import { createGitWorktree, removeGitWorktree } from '../worktree/worktree_manager.ts';

export interface PRPayload {
  issueId: string;
  branch: string;
  title: string;
  body: string;
  tddSummary: string;
}

export async function handleIssueEvent(event: any): Promise<PRPayload | null> {
  const isTargetLabel = event.label?.name === 'ai-build';
  const isPRCommentFix = event.comment?.body?.includes('@ai-pipeline fix');

  if (!isTargetLabel && !isPRCommentFix) {
    return null;
  }

  const issueId = `ISSUE-${event.issue.number}`;
  const spec: SpecificationInput = {
    issueId,
    title: event.issue.title,
    description: event.issue.body || '',
    repositoryUrl: event.repository.clone_url,
    baseBranch: event.repository.default_branch || 'main'
  };

  const worktree = await createGitWorktree('.', issueId);
  const pipelineResult = await runPipelineEngine(spec);

  await removeGitWorktree(worktree.worktreePath);

  return {
    issueId,
    branch: pipelineResult.pullRequestBranch,
    title: pipelineResult.pullRequestTitle,
    body: pipelineResult.pullRequestBody,
    tddSummary: `Passed ${pipelineResult.tddHistory.length} TDD stages.`
  };
}
