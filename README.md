# 🚀 Enterprise AI Pipeline Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![NPM Package](https://img.shields.io/badge/npm-%40josephnguyent%2Fkobean--agentic-red.svg)](https://www.npmjs.com/package/@josephnguyent/kobean-agentic)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.10-blue.svg)](https://www.python.org)
[![Monorepo: pnpm](https://img.shields.io/badge/monorepo-pnpm-orange.svg)](https://pnpm.io)

An enterprise-grade, zero-touch autonomous AI engineering platform that transforms GitHub issues into verified, test-proven Pull Requests automatically.

---

## ⚡ 1-Command Setup (Run Anywhere)

Run **1 single command** in your terminal to set up any GitHub repository automatically:

```bash
npx @josephnguyent/kobean-agentic@latest setup
```

---

## 📌 How It Works (3 Steps)

1. **Run Setup**:
   ```bash
   npx @josephnguyent/kobean-agentic@latest setup
   ```
2. **Enter Your Target Repo** when prompted in terminal:
   ```text
   👉 Enter your target GitHub repository: thienng-it/KobeanREST
   ```
3. **Create an Issue & Add `ai-build` Label** 🎉
   - Create an Issue on GitHub $\rightarrow$ Add label **`ai-build`**.
   - The AI automatically writes the code, runs unit tests, and **opens a ready-to-merge Pull Request**!

---

## 🔒 Security, Privacy & Universal AI

- **$0 Free & 100% Private**: Automatically uses your local installed AI model via Ollama (`llama3`, `qwen2.5-coder`, `gemma3:12b`, `mistral-nemo`).
- **Cloud AI API Keys (Optional)**: Set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or `DEEPSEEK_API_KEY` to use cloud models.
- **Automated Webhooks**: Auto-creates dedicated Smee.io Webhook proxy channels programmatically.
- **Self-Correction & Memory**: Automatically self-repairs code diffs and remembers past issue resolutions.

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
