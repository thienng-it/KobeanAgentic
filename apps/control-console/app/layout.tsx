import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Enterprise AI Pipeline Control Console',
  description: 'Management Control Plane for Temporal AI Pipeline Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 antialiased">
        <header className="h-16 border-b border-gray-800 glass-panel sticky top-0 z-50 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white glow-accent">
              AI
            </div>
            <span className="font-semibold text-lg tracking-wide text-white">
              Enterprise AI Pipeline <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Control Plane</span>
            </span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium text-gray-400">
            <a href="/" className="hover:text-white transition">Dashboard</a>
            <a href="/settings" className="hover:text-white transition">Config & Settings</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub Repo</a>
          </nav>
        </header>
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </body>
    </html>
  );
}
