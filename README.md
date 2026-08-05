# 🚀 Enterprise AI Pipeline Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![NPM Package](https://img.shields.io/badge/npm-%40josephnguyent%2Fkobean--agentic-red.svg)](https://www.npmjs.com)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.10-blue.svg)](https://www.python.org)
[![Monorepo: pnpm](https://img.shields.io/badge/monorepo-pnpm-orange.svg)](https://pnpm.io)
[![Next.js 15](https://img.shields.io/badge/dashboard-Next.js%2015-black.svg)](https://nextjs.org)
[![AI Providers: Cloud & Local](https://img.shields.io/badge/ai%20providers-Cloud%20API%20%2B%20Local%20Ollama-purple.svg)](https://ollama.com)

An enterprise-grade, zero-touch autonomous AI engineering platform that transforms GitHub issues into verified, test-proven Pull Requests automatically.

---

## 📦 NPM Package Usage (Pull & Use Instantly)

Any developer can run the platform directly from **npm**:

### 1️⃣ Run Instantly via `npx` (Zero Install)
```bash
npx @josephnguyent/kobean-agentic setup
```

### 2️⃣ Install Globally via `npm`
```bash
npm install -g @josephnguyent/kobean-agentic
kobean-agentic setup
```

---

## ⚡ 1-Command Interactive Setup & Launch

Run **`kobean-agentic setup`** to install dependencies, auto-create a dedicated Smee.io channel, and configure Webhooks automatically:

```bash
npx @josephnguyent/kobean-agentic setup
```

When prompted in terminal, enter your target GitHub repository (e.g. `your-username/your-repo`):
```text
👉 Enter your target GitHub repository (e.g. user/repo): thienng-it/KobeanREST
```

*Or pass your target repo directly in 1 line:*
```bash
npx @josephnguyent/kobean-agentic setup thienng-it/KobeanREST
```

---

## 📌 Quick Summary

- 🎯 **What it does**: Automatically writes code, runs unit tests, and opens GitHub Pull Requests when an issue is labeled `ai-build`.
- 🤖 **Universal AI Support**: Supports **Cloud AI Keys** (OpenAI / ChatGPT, Anthropic / Claude, Google / Gemini, DeepSeek) AND **Local Offline Ollama** (`$0` free).
- 🔒 **Privacy**: Code processing stays local or uses your configured cloud API keys.
- 📡 **Automated Webhook Channels**: Automatically creates a dedicated Smee.io Webhook channel programmatically.
- 🔄 **Self-Correction & Memory**: Automatically self-repairs code diffs and remembers past issue resolutions.
- ⚡ **Setup Time**: **1 Command (`npx @josephnguyent/kobean-agentic setup`)**.

---

## ⚡ Step-by-Step Guide 1: How to Connect to ANY Repository (60 Seconds)

### Step 1: Run 1-Command Setup *(30 Seconds)*
Run `npx @josephnguyent/kobean-agentic setup your-username/your-repo`. The CLI automatically:
1. Auto-generates your dedicated **Smee.io Webhook Proxy Channel**.
2. Registers the Webhook on your GitHub repository via GitHub CLI.
3. Creates the `.ai-pipeline.yml` configuration file in your project root!

```yaml
version: "1.0"
pipeline:
  repository: "your-username/your-repo-name"
  base_branch: "main"

  sandbox:
    isolation: "docker" # docker | e2b | process
    timeout_seconds: 300

  guardrails:
    ponytail_strict: true # Enforces YAGNI & minimal diff checks
    max_diff_lines: 500

  github:
    auto_pr: true
    trigger_label: "ai-build"
    comment_trigger: "@ai-pipeline fix"
```

### Step 2: Create an Issue & Add `ai-build` Label 🎉
1. Create an Issue on your GitHub repository (e.g., *"Add JWT auth middleware"*).
2. Add the **`ai-build`** label.
3. The platform automatically scans your codebase, writes TDD unit tests, and **opens a ready-to-merge Pull Request**!

---

## 🏛️ Principal Architectural Features

### 1. Universal Multi-Provider AI Adapter
Supports OpenAI (ChatGPT), Anthropic (Claude), Google (Gemini), DeepSeek, and Local Ollama with dynamic fallback.

### 2. Automated Smee.io Webhook Channel Generation
Generates a dedicated, isolated Smee.io proxy channel programmatically (`https://smee.io/new`) during setup without requiring manual browser navigation.

### 3. Iterative Self-Correction & Guardrail Loop
If a generated code diff fails unit tests or Ponytail guardrails, the Coder Agent automatically analyzes the audit feedback and **repairs its own code diff** before publishing to GitHub.

### 4. Persistent Repository Context Memory
Stores past issue trajectories, AST context symbols, and resolution patterns in `.ai-memory/repository_memory.json`. The AI gets **progressively smarter** with every PR generated!

---

## 🖥️ Step-by-Step Guide 2: How to Run & Test the Platform Locally

### Step 1: Clone & Run 1-Command Setup
```bash
git clone https://github.com/thienng-it/KobeanAgentic.git
cd KobeanAgentic
npx @josephnguyent/kobean-agentic setup
```

### Step 2: Run Automated Test Suites
```bash
# Run Python Graph Indexer unit tests
python3 packages/graph-indexer/tests/test_indexer.py

# Run 1-Command E2E Dry Run Execution Script
npx @josephnguyent/kobean-agentic dry-run
```

### Step 3: Launch Next.js Management Control Console
```bash
npx @josephnguyent/kobean-agentic dev
```
Open **`http://localhost:3001`** in your browser to view active workflows, live logs, and the interactive Temporal Workflow DAG.

---

## 🧠 Dynamic Per-User Local AI Auto-Discovery

The platform automatically detects whichever local AI model is installed on the user's computer via Ollama (`http://localhost:11434`):

```
User Computer A (gemma3:12b)      ──► Engine uses gemma3:12b
User Computer B (qwen2.5-coder) ──► Engine uses qwen2.5-coder
User Computer C (llama3)         ──► Engine uses llama3
```

- **Zero Cloud API Keys Required**.
- **Zero API Costs**.
- **100% Privacy Guarantee**.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph TargetRepo ["Target Codebase (Any Project)"]
        A[".ai-pipeline.yml Config"]
        B["GitHub Issues / PR Comments"]
    end

    subgraph Connector ["1. GitHub Connector Layer"]
        B -->|Webhook| C["Express & Smee Webhook Listener"]
        C --> D["Git Worktree Manager"]
    end

    subgraph CoreEngine ["2. Core Agent Engine"]
        E["Temporal.io Workflow Engine"]
        F["Tree-sitter AST & Knowledge Graph Indexer"]
        G["Planner Agent (Ponytail Decision Ladder)"]
        H["Coder Agent (TDD Cycle)"]
        I["Isolated MicroVM Sandbox (E2B / Docker)"]
        J["Reviewer Agent (Spec & Code Audit)"]

        C --> E
        E --> F
        F --> G
        G --> H
        H <--> I
        I -- Pass --> J
    end

    subgraph GitDelivery ["3. Delivery Layer"]
        J -- Approved --> K["Publish GitHub Branch & Open PR"]
    end

    subgraph ControlPlane ["4. Control & Observability"]
        L["Next.js Control Console"] <--> E
        M["Chrome Extension (Manifest V3)"] <--> L
    end
```

---

## 📂 Monorepo Structure

```text
.
├── bin/
│   └── kobean-agentic.js       # NPM CLI binary executable
├── .agents/
│   ├── skills/                 # AGY repository custom skills
│   └── rules/                  # AGY coding & guardrail rules
├── packages/
│   ├── engine/                 # Core engine (@enterprise-ai/engine): Temporal state machine, agents, guardrails
│   │   ├── src/
│   │   │   ├── agents/         # Planner, TDD Coder (Self-Repair), and Reviewer agents
│   │   │   ├── memory/         # Persistent context memory store (.ai-memory/)
│   │   │   ├── guardrails/     # Ponytail Decision Ladder rules
│   │   │   ├── sandbox/        # Universal Multi-Provider AI Adapter (OpenAI, Claude, Gemini, Ollama)
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   └── workflows/      # Temporal pipeline workflow logic
│   │   └── tests/              # Engine unit test suites
│   ├── graph-indexer/          # Tree-Sitter AST + Knowledge Graph hybrid search indexer (Python)
│   │   ├── src/
│   │   │   ├── ast_parser.py   # Multi-language symbol parser
│   │   │   ├── graph_builder.py# Zero-dependency DiGraph call dependency builder
│   │   │   └── hybrid_search.py# Lexical + Graph Centrality search engine
│   │   └── tests/              # Python unittest suite
│   └── github-connector/       # Express & Probot Webhook Connector
│       ├── src/
│       │   ├── webhooks/       # Issue labeling & PR comment (@ai-pipeline fix) handlers
│       │   ├── worktree/       # Git worktree branch isolation manager
│       │   ├── server.ts       # Express & Smee.io webhook server
│       │   └── pr_publisher.ts # GitHub Pull Request publisher
│       └── tests/              # Connector integration tests
├── apps/
│   ├── control-console/        # Next.js 15 App Router Management Dashboard
│   │   ├── app/
│   │   │   ├── (dashboard)/    # Live workflow visualizer & interactive DAG
│   │   │   ├── settings/       # Visual .ai-pipeline.yml config editor
│   │   │   └── api/            # API endpoints for workflow triggers
│   ├── browser-extension/      # Manifest V3 Chrome Extension
│   │   ├── manifest.json       # Chrome MV3 manifest configuration
│   │   └── src/
│   │       ├── contents/       # GitHub/Jira DOM overlay action buttons
│   │       └── background/     # Service worker background API client
├── scripts/
│   ├── setup.ts                # 1-Command interactive setup script with auto Smee generation
│   └── e2e_dry_run.ts          # End-to-End dry run execution script
├── pnpm-workspace.yaml         # PNPM workspace configuration
├── package.json                # Scoped NPM package manifest (@josephnguyent/kobean-agentic)
└── README.md
```

---

## 📜 Ponytail Decision Ladder

All code modifications generated by the platform are evaluated against the **Ponytail Decision Ladder**:

1. **YAGNI (You Aren't Gonna Need It)**: Reject unrequested abstractions or unnecessary dependencies.
2. **Standard Library First**: Prefer native APIs (`node:*`, Python stdlib) over heavy external packages.
3. **Platform Native**: Utilize underlying container, process isolation, and OS capabilities.
4. **Existing Dependencies**: Reuse pre-installed dependencies before adding new ones.
5. **Minimal Diff**: Restrict diff size and enforce line-targeted modifications verified by tests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
