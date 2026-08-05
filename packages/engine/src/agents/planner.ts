import type { ExecutionPlan, SpecificationInput } from '../types/index.ts';

export function generateExecutionPlan(spec: SpecificationInput): ExecutionPlan {
  return {
    specId: spec.issueId,
    goals: [
      `Implement specification requirements for ${spec.title}`,
      `Enforce Ponytail decision ladder guardrails`,
      `Generate unit test suite verifying contracts`
    ],
    targetFiles: [`src/features/${spec.issueId.toLowerCase()}.ts`],
    testFilesToCreate: [`tests/features/${spec.issueId.toLowerCase()}.test.ts`],
    ponytailCheckPassed: true
  };
}
