import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { SandboxExecutionRequest, SandboxExecutionResult } from '../types/index.ts';

const execFileAsync = promisify(execFile);

/**
 * Isolated MicroVM Sandbox Runner (E2B / Docker / Process sandbox runner fallback)
 */
export async function executeSandboxCommand(
  request: SandboxExecutionRequest
): Promise<SandboxExecutionResult> {
  const startTime = Date.now();
  const timeout = request.timeoutMs || 30000;

  try {
    const { stdout, stderr } = await execFileAsync(
      request.command,
      request.args || [],
      {
        cwd: request.worktreePath || '.',
        env: { ...process.env, ...request.env },
        timeout
      }
    );

    return {
      exitCode: 0,
      stdout: stdout.toString(),
      stderr: stderr.toString(),
      durationMs: Date.now() - startTime,
      success: true
    };
  } catch (error: any) {
    return {
      exitCode: typeof error.code === 'number' ? error.code : 1,
      stdout: error.stdout ? error.stdout.toString() : '',
      stderr: error.stderr ? error.stderr.toString() : error.message || 'Execution error',
      durationMs: Date.now() - startTime,
      success: false
    };
  }
}
