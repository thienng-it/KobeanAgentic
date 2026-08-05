import { describe, it } from 'node:test';
import assert from 'node:assert';
import { evaluatePonytailGuardrails } from '../src/guardrails/ponytail';

describe('Ponytail Guardrails', () => {
  it('passes minimal clean code changes', () => {
    const diff = `
+ export function add(a: number, b: number): number {
+   return a + b;
+ }
`;
    const result = evaluatePonytailGuardrails(diff, ['lodash']);
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.violations.length, 0);
  });

  it('rejects adding heavy unnecessary dependencies (YAGNI violation)', () => {
    const diff = `
+ import _ from 'lodash';
+ import axios from 'axios';
`;
    const result = evaluatePonytailGuardrails(diff, ['lodash', 'axios']);
    assert.strictEqual(result.passed, false);
    assert.ok(result.violations.some(v => v.includes('YAGNI Violation')));
  });

  it('warns on excessive boilerplate diff size (>500 lines modified without tests)', () => {
    const largeLines = Array.from({ length: 600 }, (_, i) => `+ const var${i} = ${i};`).join('\n');
    const result = evaluatePonytailGuardrails(largeLines, []);
    assert.ok(result.violations.some(v => v.includes('Minimal Diff Violation')));
  });
});
