'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [yamlConfig, setYamlConfig] = useState(`# .ai-pipeline.yml Configuration Blueprint
version: "1.0"
pipeline:
  sandbox:
    isolation: "e2b" # e2b | docker | process
    timeout_seconds: 300
  guardrails:
    ponytail_strict: true
    max_diff_lines: 500
    allow_new_deps: false
  agents:
    planner_model: "gemini-3.6-pro"
    coder_model: "gemini-3.6-flash"
    reviewer_model: "gemini-3.6-pro"
  github:
    auto_pr: true
    trigger_label: "ai-build"
    comment_trigger: "@ai-pipeline fix"
`);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Repository Configuration & Model Router</h1>
        <p className="text-gray-400 text-sm mt-1">Manage global .ai-pipeline.yml parameters, sandbox VM limits, and guardrail rules.</p>
      </div>

      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-200">.ai-pipeline.yml Manifest Blueprint</label>
          {saved && <span className="text-xs text-emerald-400 font-semibold">✓ Configuration Saved!</span>}
        </div>
        <textarea
          value={yamlConfig}
          onChange={(e) => setYamlConfig(e.target.value)}
          rows={16}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-indigo-300 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition glow-accent"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
