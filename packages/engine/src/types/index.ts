export interface SandboxExecutionRequest {
  worktreePath: string;
  command: 'install' | 'lint' | 'test' | 'build' | string;
  args?: string[];
  env?: Record<string, string>;
  timeoutMs?: number;
}

export interface SandboxExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  success: boolean;
}

export interface PonytailAuditResult {
  passed: boolean;
  score: number; // 0-100
  violations: string[];
  recommendations: string[];
}

export interface SpecificationInput {
  issueId: string;
  title: string;
  description: string;
  repositoryUrl: string;
  baseBranch: string;
  labels?: string[];
}

export interface ExecutionPlan {
  specId: string;
  goals: string[];
  targetFiles: string[];
  testFilesToCreate: string[];
  ponytailCheckPassed: boolean;
}

export interface TDDStageResult {
  stage: 'RED' | 'GREEN' | 'REFACTOR';
  testOutput: SandboxExecutionResult;
  codeDiff: string;
  passed: boolean;
}

export interface ReviewAuditResult {
  approved: boolean;
  specCoverageScore: number;
  securityPassed: boolean;
  comments: string[];
}

export interface PipelineWorkflowOutput {
  issueId: string;
  pullRequestBranch: string;
  pullRequestTitle: string;
  pullRequestBody: string;
  tddHistory: TDDStageResult[];
  reviewAudit: ReviewAuditResult;
  status: 'SUCCESS' | 'FAILED';
}
