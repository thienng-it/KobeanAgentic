import { describe, it } from 'node:test';
import assert from 'node:assert';
import { runPipelineEngine } from '../src/workflows/pipeline_workflow';
import { SpecificationInput } from '../src/types';

describe('Temporal Pipeline Workflow Engine', () => {
  it('executes full spec-to-PR pipeline state machine', async () => {
    const spec: SpecificationInput = {
      issueId: 'ISSUE-101',
      title: 'Add JWT Auth Handler',
      description: 'Implement JWT validation middleware',
      repositoryUrl: 'https://github.com/org/repo',
      baseBranch: 'main'
    };

    const output = await runPipelineEngine(spec);
    assert.strictEqual(output.issueId, 'ISSUE-101');
    assert.strictEqual(output.status, 'SUCCESS');
    assert.strictEqual(output.pullRequestBranch, 'ai/feat-ISSUE-101');
    assert.ok(output.tddHistory.length >= 2);
    assert.strictEqual(output.reviewAudit.approved, true);
  });
});
