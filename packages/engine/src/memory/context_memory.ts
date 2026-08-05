import fs from 'node:fs';
import path from 'node:path';

export interface MemoryEntry {
  id: string;
  issueId: string;
  title: string;
  codebaseSymbols: string[];
  tddPassRate: string;
  timestamp: string;
  summary: string;
}

export class RepositoryMemoryStore {
  private memoryPath: string;
  private entries: MemoryEntry[] = [];

  constructor(baseDir: string = process.cwd()) {
    const memoryDir = path.join(baseDir, '.ai-memory');
    if (!fs.existsSync(memoryDir)) {
      fs.mkdirSync(memoryDir, { recursive: true });
    }
    this.memoryPath = path.join(memoryDir, 'repository_memory.json');
    this.loadMemory();
  }

  private loadMemory() {
    if (fs.existsSync(this.memoryPath)) {
      try {
        const raw = fs.readFileSync(this.memoryPath, 'utf-8');
        this.entries = JSON.parse(raw || '[]');
      } catch (e) {
        this.entries = [];
      }
    }
  }

  public saveMemoryEntry(entry: Omit<MemoryEntry, 'id' | 'timestamp'>): MemoryEntry {
    const newEntry: MemoryEntry = {
      ...entry,
      id: `mem_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.entries.unshift(newEntry);
    fs.writeFileSync(this.memoryPath, JSON.stringify(this.entries.slice(0, 100), null, 2));
    return newEntry;
  }

  public getRelevantMemories(query: string, limit: number = 3): MemoryEntry[] {
    const keywords = query.toLowerCase().split(/\s+/);
    return this.entries
      .filter((entry) => {
        const text = `${entry.title} ${entry.summary} ${entry.codebaseSymbols.join(' ')}`.toLowerCase();
        return keywords.some((kw) => text.includes(kw));
      })
      .slice(0, limit);
  }

  public getAllMemories(): MemoryEntry[] {
    return this.entries;
  }
}
