# Ponytail Guardrails & Coding Standards

Whenever modifying or generating code in this repository, follow these strict rules:

1. **YAGNI (You Aren't Gonna Need It)**:
   - Do not write speculative code or unrequested abstractions.
   - Keep pull requests tightly focused on the specific issue requirement.

2. **Standard Library First**:
   - Prefer native Node.js (`node:fs`, `node:child_process`) and Python standard library before introducing external packages.

3. **Dynamic Per-User Local AI**:
   - Always auto-discover local Ollama models via `http://localhost:11434/api/tags` rather than hardcoding a single model string.

4. **Persistent Context Memory**:
   - Log pipeline execution summaries to `.ai-memory/repository_memory.json` so past issue resolutions enhance future runs.
