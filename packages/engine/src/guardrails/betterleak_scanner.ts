export interface LeakScanResult {
  hasLeaks: boolean;
  leaks: Array<{ type: string; line: number; snippet: string }>;
}

export function scanForSensitiveLeaks(content: string): LeakScanResult {
  const leaks: Array<{ type: string; line: number; snippet: string }> = [];

  const patterns: Array<{ type: string; regex: RegExp }> = [
    { type: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9]{32,}/g },
    { type: 'Anthropic API Key', regex: /sk-ant-[a-zA-Z0-9_-]{32,}/g },
    { type: 'Google Gemini API Key', regex: /AIzaSy[a-zA-Z0-9_-]{33}/g },
    { type: 'GitHub Personal Token', regex: /(ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36}/g },
    { type: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/g },
    { type: 'AWS Secret Access Key', regex: /(aws_secret_access_key|aws_access_key)\s*=\s*['"][A-Za-z0-9\/+=]{40}['"]/gi },
    { type: 'Private SSH / RSA Key', regex: /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/g },
    { type: 'Database Connection String (Hardcoded Password)', regex: /(postgres|mysql|mongodb(\+srv)?):\/\/[^:]+:[^@]+@/gi },
    { type: 'Hardcoded Secret Token', regex: /(secret|password|passwd|api_key|access_token)\s*[:=]\s*['"][A-Za-z0-9_\-]{20,}['"]/gi }
  ];

  const lines = content.split('\n');
  lines.forEach((lineContent, index) => {
    for (const { type, regex } of patterns) {
      if (regex.test(lineContent)) {
        leaks.push({
          type,
          line: index + 1,
          snippet: lineContent.trim().substring(0, 80)
        });
      }
    }
  });

  return {
    hasLeaks: leaks.length > 0,
    leaks
  };
}
