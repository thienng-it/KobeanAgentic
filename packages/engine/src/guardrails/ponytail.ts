import type { PonytailAuditResult } from '../types/index.ts';

/**
 * Ponytail Decision Ladder Guardrails:
 * 1. YAGNI: Reject unrequested dependencies & over-engineering
 * 2. StdLib: Prefer standard library over external npm packages
 * 3. Minimal Diff: Restrict excessive diff noise
 */
export function evaluatePonytailGuardrails(
  diffContent: string,
  newDependenciesAdded: string[] = []
): PonytailAuditResult {
  const violations: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Rule 1: Check YAGNI & new dependency additions
  const allowedNativeLibs = ['lodash', 'vitest', 'typescript'];
  for (const dep of newDependenciesAdded) {
    if (!allowedNativeLibs.includes(dep)) {
      violations.push(`YAGNI Violation: Introduced new unapproved dependencies: ${dep}`);
      score -= 35;
    }
  }

  // Rule 2: Minimal Diff Evaluation
  const diffLines = diffContent.split('\n');
  const addedLines = diffLines.filter((l) => l.startsWith('+') && !l.startsWith('+++'));
  const hasTests = diffContent.includes('describe(') || diffContent.includes('test(') || diffContent.includes('it(');

  if (addedLines.length > 500 && !hasTests) {
    violations.push('Minimal Diff Violation: Diff exceeds 500 lines without test assertions');
    score -= 25;
  }

  if (violations.length === 0) {
    recommendations.push('Clean minimalist code structure aligned with Ponytail rules.');
  }

  return {
    passed: violations.length === 0 && score >= 80,
    score: Math.max(0, score),
    violations,
    recommendations
  };
}
