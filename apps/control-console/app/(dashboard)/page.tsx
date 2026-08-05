'use client';

import React, { useState, useEffect } from 'react';

interface WorkflowRun {
  id: string;
  issueId: string;
  title: string;
  status: 'SUCCESS' | 'RUNNING' | 'FAILED' | 'CLOSED';
  currentStage: string;
  duration: string;
  prUrl?: string;
}

interface Metrics {
  activeWorkflows: number;
  passRate: string;
  generatedPRs: number;
  ponytailScore: number;
}

export default function DashboardPage() {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    activeWorkflows: 3,
    passRate: '100%',
    generatedPRs: 2,
    ponytailScore: 98.5
  });
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const fetchRealData = async () => {
    try {
      const res = await fetch('/api/workflows');
      const data = await res.json();
      if (data.success) {
        setRuns(data.runs);
        if (data.metrics) {
          setMetrics(data.metrics);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData();
    const interval = setInterval(fetchRealData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerPipeline = async () => {
    setTriggering(true);
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Implement Resilient Request Rate Limiter',
          description: 'Auto-generated rate limiter module for KobeanREST API.'
        })
      });
      const data = await res.json();
      if (data.success) {
        setRuns((prev) => [data.run, ...prev]);
        fetchRealData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
            <span>Pipeline Execution Console</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
              thienng-it/KobeanREST Live
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time status of Temporal workflows, MicroVM TDD sandboxes, and PR publishing for <strong>thienng-it/KobeanREST</strong>.</p>
        </div>
        <button
          onClick={handleTriggerPipeline}
          disabled={triggering}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition glow-accent disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>{triggering ? 'Building Real PR...' : '🚀 Trigger Real AI Pipeline Run'}</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Repo Issues & PRs</span>
          <div className="text-3xl font-extrabold text-white mt-2">{metrics.activeWorkflows}</div>
          <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">↑ Live GitHub API Sync</span>
        </div>
        <div className="glass-panel p-5 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TDD Test Pass Rate</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">{metrics.passRate}</div>
          <span className="text-xs text-gray-400 mt-1 inline-block">MicroVM Sandbox Runner</span>
        </div>
        <div className="glass-panel p-5 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Generated Pull Requests</span>
          <div className="text-3xl font-extrabold text-indigo-400 mt-2">{metrics.generatedPRs}</div>
          <span className="text-xs text-gray-400 mt-1 inline-block">thienng-it/KobeanREST</span>
        </div>
        <div className="glass-panel p-5 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ponytail Compliance</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-2">{metrics.ponytailScore}</div>
          <span className="text-xs text-gray-400 mt-1 inline-block">YAGNI & Minimal Diff Guardrail</span>
        </div>
      </div>

      {/* Interactive Workflow DAG Visualizer */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <span>⚡ Interactive Temporal Workflow DAG Architecture</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          <div className="glass-card p-4 rounded-lg border-l-4 border-indigo-500 text-center">
            <span className="text-xs text-indigo-400 font-mono block mb-1">STAGE 1</span>
            <span className="font-semibold text-sm text-white block">AST Indexing</span>
            <span className="text-xs text-gray-400">Tree-sitter Search</span>
          </div>
          <div className="glass-card p-4 rounded-lg border-l-4 border-purple-500 text-center">
            <span className="text-xs text-purple-400 font-mono block mb-1">STAGE 2</span>
            <span className="font-semibold text-sm text-white block">Planner Agent</span>
            <span className="text-xs text-gray-400">Ponytail Decision</span>
          </div>
          <div className="glass-card p-4 rounded-lg border-l-4 border-emerald-500 text-center">
            <span className="text-xs text-emerald-400 font-mono block mb-1">STAGE 3</span>
            <span className="font-semibold text-sm text-white block">Sandbox TDD</span>
            <span className="text-xs text-gray-400">RED ➔ GREEN Cycle</span>
          </div>
          <div className="glass-card p-4 rounded-lg border-l-4 border-amber-500 text-center">
            <span className="text-xs text-amber-400 font-mono block mb-1">STAGE 4</span>
            <span className="font-semibold text-sm text-white block">Reviewer Audit</span>
            <span className="text-xs text-gray-400">Security & Coverage</span>
          </div>
          <div className="glass-card p-4 rounded-lg border-l-4 border-blue-500 text-center">
            <span className="text-xs text-blue-400 font-mono block mb-1">STAGE 5</span>
            <span className="font-semibold text-sm text-white block">PR Delivery</span>
            <span className="text-xs text-gray-400">GitHub Publisher</span>
          </div>
        </div>
      </div>

      {/* Workflow Runs Table */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Live GitHub Execution Trajectories (thienng-it/KobeanREST)</h2>
          {loading && <span className="text-xs text-indigo-400 font-mono animate-pulse">Syncing GitHub API...</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/60 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-3 px-4">Workflow ID</th>
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Real GitHub PR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {runs.map((run) => (
                <tr key={run.id} className="hover:bg-gray-800/30 transition">
                  <td className="py-3.5 px-4 font-mono text-xs text-indigo-400">{run.id}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-400">{run.issueId}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{run.title}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {run.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-300 text-xs">{run.currentStage}</td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{run.duration}</td>
                  <td className="py-3.5 px-4">
                    {run.prUrl && (
                      <a href={run.prUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline font-mono text-xs flex items-center space-x-1">
                        <span>View Real PR</span>
                        <span>↗</span>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
