import type { PonytailAuditResult } from '../types/index.ts';
import { scanForSensitiveLeaks } from './betterleak_scanner.ts';

/**
 * Ponytail Decision Ladder Guardrails & BetterLeak Security Scanner:
 * 1. BetterLeak: Scan for sensitive data leaks (API keys, tokens, secrets)
 * 2. YAGNI: Reject unrequested dependencies & over-engineering
 * 3. StdLib: Prefer standard library over external npm packages
 * 4. Minimal Diff: Restrict excessive diff noise
 */
export function evaluatePonytailGuardrails(
  diffContent: string,
  newDependenciesAdded: string[] = []
): PonytailAuditResult {
  const violations: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // BetterLeak Security Check
  const leakResult = scanForSensitiveLeaks(diffContent);
  if (leakResult.hasLeaks) {
    for (const leak of leakResult.leaks) {
      violations.push(`BetterLeak Security Violation: Detected ${leak.type} leak on line ${leak.line}`);
      score -= 50;
    }
  }

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
    recommendations.push('Clean minimalist code structure & BetterLeak security verified (0 leaks detected).');
  }

  return {
    passed: violations.length === 0 && score >= 80,
    score: Math.max(0, score),
    violations,
    recommendations
  };
}
