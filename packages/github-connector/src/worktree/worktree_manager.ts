import path from 'node:path';
import fs from 'node:fs';

export interface WorktreeDetails {
  issueId: string;
  branch: string;
  worktreePath: string;
  createdAt: string;
}

/**
 * Git Worktree Manager for isolated execution environments.
 */
export async function createGitWorktree(
  repoRoot: string,
  issueId: string
): Promise<WorktreeDetails> {
  const branch = `ai/feat-${issueId}`;
  const worktreeDir = path.join(repoRoot, 'ai_worktrees', issueId);

  if (!fs.existsSync(worktreeDir)) {
    fs.mkdirSync(worktreeDir, { recursive: true });
  }

  return {
    issueId,
    branch,
    worktreePath: worktreeDir,
    createdAt: new Date().toISOString()
  };
}

export async function removeGitWorktree(worktreePath: string): Promise<{ success: boolean }> {
  try {
    if (fs.existsSync(worktreePath)) {
      fs.rmSync(worktreePath, { recursive: true, force: true });
    }
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
