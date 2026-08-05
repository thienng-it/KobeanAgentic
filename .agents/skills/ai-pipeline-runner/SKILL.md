---
name: ai-pipeline-runner
description: Orchestrates execution, memory retrieval, TDD cycles, and PR publishing for KobeanAgentic.
---

# AI Pipeline Runner Skill

Use this skill whenever you need to run, debug, test, or inspect the **KobeanAgentic** AI Pipeline Platform.

## Core Workflows

### 1. Run All-in-One Setup Script
```bash
pnpm run setup
```

### 2. Execute End-to-End Dry Run Execution Script
```bash
node --experimental-strip-types scripts/e2e_dry_run.ts
```

### 3. Launch Next.js Management Control Console
```bash
npx pnpm --filter @enterprise-ai/control-console dev
```

### 4. Launch GitHub App & Webhook Connector Server
```bash
PORT=4000 WEBHOOK_PROXY_URL=https://smee.io/KShRqrPDcgLv6 npx pnpm --filter @enterprise-ai/github-connector dev
```

## Key Engine Features

- **Dynamic Local Model Auto-Discovery**: Queries `http://localhost:11434/api/tags` to automatically adapt to whichever Ollama model is installed on the user's computer (`gemma3:12b`, `qwen2.5-coder`, `mistral-nemo`, `llama3`).
- **Persistent Context Memory Store**: Saved in `.ai-memory/repository_memory.json` to recall past bugfixes and code patterns.
- **Ponytail Decision Ladder Guardrails**: Enforces YAGNI, minimal diffs, and platform-native standards.
