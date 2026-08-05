import { describe, it, expect } from 'vitest';
import { scanForSensitiveLeaks } from '../src/guardrails/betterleak_scanner.ts';

describe('BetterLeak Security & Sensitive Data Scanner', () => {
  it('should detect OpenAI API key leak', () => {
    const code = `const key = "sk-1234567890123456789012345678901234";`;
    const res = scanForSensitiveLeaks(code);
    expect(res.hasLeaks).toBe(true);
    expect(res.leaks[0].type).toBe('OpenAI API Key');
  });

  it('should detect GitHub Token leak', () => {
    const code = `const token = "ghp_123456789012345678901234567890123456";`;
    const res = scanForSensitiveLeaks(code);
    expect(res.hasLeaks).toBe(true);
    expect(res.leaks[0].type).toBe('GitHub Personal Token');
  });

  it('should pass clean code without leaks', () => {
    const code = `export function add(a: number, b: number) { return a + b; }`;
    const res = scanForSensitiveLeaks(code);
    expect(res.hasLeaks).toBe(false);
    expect(res.leaks).toHaveLength(0);
  });
});
