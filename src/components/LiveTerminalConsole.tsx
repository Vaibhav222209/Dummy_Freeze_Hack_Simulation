import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, ChevronRight } from 'lucide-react';

export interface TerminalLogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'EXPLOIT' | 'SPOILAGE' | 'DEFENSE' | 'EXFIL';
  message: string;
}

interface LiveTerminalConsoleProps {
  logs: TerminalLogEntry[];
  onClearLogs: () => void;
  onRunCommand: (cmd: string) => void;
}

export const LiveTerminalConsole: React.FC<LiveTerminalConsoleProps> = ({
  logs,
  onClearLogs,
  onRunCommand,
}) => {
  const [input, setInput] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onRunCommand(trimmed);
    setInput('');
  };

  const quickCommands = [
    { label: 'la-surprise --all', cmd: 'la-surprise --all' },
    { label: 'strike --groceries', cmd: 'strike --groceries' },
    { label: 'strike --hospitals', cmd: 'strike --hospitals' },
    { label: 'exfil --dummy-vault', cmd: 'exfil --dummy-vault' },
    { label: 'defend --cryo-restore', cmd: 'defend --cryo-restore' },
    { label: 'status', cmd: 'status' },
  ];

  const badgeStyle = (level: TerminalLogEntry['level']) => {
    switch (level) {
      case 'EXPLOIT':
        return 'text-rose-400 bg-rose-500/15 border-rose-500/35';
      case 'SPOILAGE':
        return 'text-amber-300 bg-amber-500/15 border-amber-500/35';
      case 'DEFENSE':
        return 'text-emerald-300 bg-emerald-500/15 border-emerald-500/35';
      case 'EXFIL':
        return 'text-fuchsia-300 bg-fuchsia-500/15 border-fuchsia-500/35';
      default:
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#080B12] flex flex-col overflow-hidden h-full">
      {/* Terminal Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/90 bg-[#0D131F] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200 tracking-wide">
            OT-SCADA-CONSOLE // SANDBOX STREAM
          </span>
        </div>
        <button
          onClick={onClearLogs}
          title="Clear Console"
          className="cursor-pointer inline-flex items-center gap-1 rounded border border-slate-700/80 bg-slate-900 px-2 py-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
        >
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>

      {/* Quick Command Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800/80 bg-[#0A0E17] px-3 py-2">
        <span className="text-[10px] font-mono text-slate-500 shrink-0">Quick Exec:</span>
        {quickCommands.map((q) => (
          <button
            key={q.cmd}
            onClick={() => onRunCommand(q.cmd)}
            className="cursor-pointer shrink-0 rounded border border-slate-800 bg-slate-900/90 hover:border-cyan-500/50 hover:text-cyan-300 px-2 py-0.5 text-[10px] font-mono text-slate-300 transition-colors"
          >
            $ {q.label}
          </button>
        ))}
      </div>

      {/* Streaming Output */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-[245px] max-h-[305px] overflow-y-auto p-3.5 space-y-1.5 font-mono text-[11px] leading-relaxed"
      >
        {logs.map((entry) => (
          <div key={entry.id} className="flex items-start gap-2 break-words">
            <span className="text-slate-600 shrink-0 select-none">[{entry.timestamp}]</span>
            <span
              className={`shrink-0 rounded border px-1.5 py-0 text-[9px] font-bold uppercase ${badgeStyle(
                entry.level
              )}`}
            >
              {entry.level}
            </span>
            <span className="text-slate-200">{entry.message}</span>
          </div>
        ))}
      </div>

      {/* Interactive Input Prompt */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-800/90 bg-[#0B101A] px-3 py-2"
      >
        <span className="text-rose-400 font-mono text-xs font-bold flex items-center shrink-0">
          sandbox@la-surprise:~# <ChevronRight className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help', 'la-surprise --all', 'defend --cryo-restore'..."
          className="w-full bg-transparent text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-mono font-semibold text-cyan-300 transition-colors shrink-0"
        >
          RUN
        </button>
      </form>
    </div>
  );
};
