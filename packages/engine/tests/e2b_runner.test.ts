import { describe, it } from 'node:test';
import assert from 'node:assert';
import { executeSandboxCommand } from '../src/sandbox/e2b_runner';

describe('MicroVM Sandbox Runner', () => {
  it('executes simple shell test commands in isolated runner', async () => {
    const result = await executeSandboxCommand({
      worktreePath: '.',
      command: 'echo',
      args: ['Hello Sandbox']
    });

    assert.strictEqual(result.exitCode, 0);
    assert.strictEqual(result.stdout.trim(), 'Hello Sandbox');
    assert.strictEqual(result.success, true);
  });

  it('captures command failures gracefully', async () => {
    const result = await executeSandboxCommand({
      worktreePath: '.',
      command: 'node',
      args: ['-e', 'process.exit(1)']
    });

    assert.strictEqual(result.exitCode, 1);
    assert.strictEqual(result.success, false);
  });
});
