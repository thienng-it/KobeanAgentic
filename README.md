# Enterprise AI Pipeline Platform (Zero-to-Production Blueprint)

An enterprise-grade, zero-touch AI engineering platform designed to turn natural language requirements, GitHub/Jira issues, and spec documents into verified, tested GitHub Pull Requests.

## Architecture & Monorepo Structure

- `packages/engine`: Core Temporal.io workflow engine, agent prompts, Ponytail guardrails, and microVM sandbox runner.
- `packages/graph-indexer`: Tree-Sitter AST & Knowledge Graph hybrid search indexer (Python).
- `packages/github-connector`: Probot GitHub App listener & Git worktree branch manager.
- `apps/control-console`: Next.js 15 App Router Management Dashboard with live workflow trajectory visualizer.
- `apps/browser-extension`: Manifest V3 Chrome Extension providing GitHub/Jira DOM overlays.

## Ponytail Decision Ladder
1. **YAGNI**: Reject unnecessary abstractions or unrequested boilerplate.
2. **Standard Library**: Prefer native APIs over heavy external dependencies.
3. **Platform Native**: Utilize underlying container, OS, and platform capabilities.
4. **Existing Deps**: Reuse installed packages before introducing new ones.
5. **Minimal Diff**: Make line-targeted, focused edits.

## Quickstart

```bash
# Install dependencies
pnpm install

# Run automated tests
pnpm test

# Build all packages & applications
pnpm build
```
