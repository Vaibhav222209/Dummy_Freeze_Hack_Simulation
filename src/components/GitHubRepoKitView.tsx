import React, { useState } from 'react';
import readmeRaw from '../../README.md?raw';
import disclaimerRaw from '../../DISCLAIMER.md?raw';
import securityRaw from '../../SECURITY.md?raw';
import architectureRaw from '../../ARCHITECTURE.md?raw';
import contributingRaw from '../../CONTRIBUTING.md?raw';
import licenseRaw from '../../LICENSE?raw';
import prTemplateRaw from '../../.github/PULL_REQUEST_TEMPLATE.md?raw';
import issueTemplateRaw from '../../.github/ISSUE_TEMPLATE/simulation_module.md?raw';

import {
  FileText,
  Copy,
  Check,
  Download,
  Terminal,
  BookOpen,
  Shield,
  Heart,
  FolderGit2,
  Sparkles,
} from 'lucide-react';

interface RepoDocItem {
  id: string;
  filename: string;
  badge: string;
  description: string;
  content: string;
}

const REPO_FILES: RepoDocItem[] = [
  {
    id: 'readme',
    filename: 'README.md',
    badge: 'MAIN SHOWCASE',
    description: 'Aesthetic ASCII banner, shields.io badges, target matrix, disclaimer, prayer & setup steps',
    content: readmeRaw,
  },
  {
    id: 'disclaimer',
    filename: 'DISCLAIMER.md',
    badge: 'ETHICS & PRAYER',
    description: "Vaibhav Thakur's formal non-affiliation notice, synthetic data guarantee & prayer for safety",
    content: disclaimerRaw,
  },
  {
    id: 'security',
    filename: 'SECURITY.md',
    badge: 'BLUE-TEAM GUIDE',
    description: 'Defensive OT/ICS cold-chain & hospital blood-bank hardening playbook',
    content: securityRaw,
  },
  {
    id: 'architecture',
    filename: 'ARCHITECTURE.md',
    badge: 'SYSTEM DESIGN',
    description: 'Thermal physics drift simulation model & zero-external-I/O architecture diagram',
    content: architectureRaw,
  },
  {
    id: 'contributing',
    filename: 'CONTRIBUTING.md',
    badge: 'OPEN SOURCE',
    description: 'Ethical contribution rules & local development workflow',
    content: contributingRaw,
  },
  {
    id: 'license',
    filename: 'LICENSE',
    badge: 'MIT + ETHICS',
    description: 'MIT License attributed to Vaibhav Thakur with Educational Simulation Notice',
    content: licenseRaw,
  },
  {
    id: 'pr-template',
    filename: '.github/PULL_REQUEST_TEMPLATE.md',
    badge: 'GITHUB PR',
    description: 'Structured pull request verification checklist for GitHub',
    content: prTemplateRaw,
  },
  {
    id: 'issue-template',
    filename: '.github/ISSUE_TEMPLATE/simulation_module.md',
    badge: 'GITHUB ISSUE',
    description: 'GitHub issue template for proposing defensive cold-chain scenarios',
    content: issueTemplateRaw,
  },
];

const SETUP_STEPS = [
  {
    step: '01',
    title: 'Verify Node.js & npm Prerequisites',
    detail: 'Install Node.js v18+ (includes npm v9+) on Windows, macOS, or Linux.',
    cmd: 'node -v && npm -v',
  },
  {
    step: '02',
    title: 'Clone the GitHub Repository',
    detail: 'Clone Mission La Surprise locally and move into the project directory.',
    cmd: 'git clone https://github.com/vaibhav-thakur/mission-la-surprise.git && cd mission-la-surprise',
  },
  {
    step: '03',
    title: 'Install Project Packages',
    detail: 'Installs React 19, Vite, Tailwind CSS v4, TypeScript, and Lucide telemetry icons.',
    cmd: 'npm install',
  },
  {
    step: '04',
    title: 'Start Live Tactical Command Console',
    detail: 'Runs Vite dev server with instant HMR at http://localhost:5173.',
    cmd: 'npm run dev',
  },
  {
    step: '05',
    title: 'Build & Preview Production Bundle',
    detail: 'Compiles optimized static bundle into dist/ ready for GitHub Pages / Vercel / Netlify.',
    cmd: 'npm run build && npm run preview',
  },
];

export const GitHubRepoKitView: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('readme');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeFile = REPO_FILES.find((f) => f.id === selectedFileId) || REPO_FILES[0];

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const downloadFile = (file: RepoDocItem) => {
    const cleanName = file.filename.split('/').pop() || file.filename;
    const blob = new Blob([file.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Step-by-Step: How to Make the Project Work */}
      <div className="rounded-xl border border-cyan-500/30 bg-[#0B0F17] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 bg-[#0F1624] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <div>
              <h2 className="text-sm sm:text-base font-display font-bold uppercase tracking-wider text-white">
                How to Make the Project Work // Step-by-Step Setup Guide
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Complete local setup, build instructions &amp; simulator operation workflow
              </p>
            </div>
          </div>
          <span className="rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
            READY FOR GITHUB • VITE + REACT + TS
          </span>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
          {SETUP_STEPS.map((s) => (
            <div
              key={s.step}
              className="rounded-lg border border-slate-800/90 bg-[#070A10] p-3.5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">STEP {s.step}</span>
                  <button
                    onClick={() => copyText(`step-${s.step}`, s.cmd)}
                    className="cursor-pointer inline-flex items-center gap-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/50 px-2 py-0.5 text-[10px] font-mono text-slate-300 transition-colors"
                  >
                    {copiedKey === `step-${s.step}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-xs font-display font-bold text-white">{s.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{s.detail}</p>
              </div>
              <code className="block rounded bg-[#0D131F] border border-slate-800/90 px-2.5 py-2 text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-nowrap">
                $ {s.cmd}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Author Disclaimer & Prayer Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-display font-bold text-sm">
            <Shield className="w-4 h-4 shrink-0" />
            Non-Affiliation &amp; Fictional Sample Notice — Vaibhav Thakur
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            I (<strong className="text-white">Vaibhav Thakur</strong>) have{' '}
            <strong className="text-amber-200">zero relation or connection to anything that happened in real life</strong>.
            &ldquo;Mission La Surprise&rdquo; is purely an educational cybersecurity sample project inspired by real-world
            resilience discussions, and all stores, hospital cryo-units, telemetry, shopkeepers, and customer card records
            inside this project are <strong className="text-white">100% synthetic and not real</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-950/25 via-[#0B0F17] to-cyan-950/25 p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-rose-300 font-display font-bold text-sm">
              <Heart className="w-4 h-4 fill-rose-400/30 text-rose-400 shrink-0" />
              Wish of Gratitude &amp; Prayer for Safety
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300">
              <Sparkles className="w-3 h-3" /> Stay Safe
            </span>
          </div>
          <p className="text-xs text-slate-200 italic leading-relaxed">
            &ldquo;Grateful to every healthcare worker protecting donated blood &amp; patients, every shopkeeper sustaining
            local food supplies, and every cyber defender on watch — I pray everything will be alright and wish peace,
            healing, and safety to everyone everywhere. Stay safe!&rdquo; — <strong className="not-italic text-cyan-300">Vaibhav Thakur</strong>
          </p>
        </div>
      </div>

      {/* GitHub Repository File Suite Browser */}
      <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar File Tree */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800/90 bg-[#080C13] p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
            <FolderGit2 className="w-4 h-4 text-rose-400" />
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                Included GitHub Repository Files
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                All 8 files are generated directly in your project root
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            {REPO_FILES.map((file) => {
              const isSelected = file.id === activeFile.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full text-left cursor-pointer rounded-lg border p-2.5 transition-all ${
                    isSelected
                      ? 'border-cyan-500/55 bg-cyan-500/10'
                      : 'border-slate-800/80 bg-[#0B101A]/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-100 truncate">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {file.filename}
                    </span>
                    <span className="shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-cyan-300">
                      {file.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{file.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right File Viewer */}
        <div className="lg:col-span-8 flex flex-col bg-[#070A10]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 bg-[#0D131F] px-4 py-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-bold text-white">{activeFile.filename}</span>
              <span className="text-[10px] font-mono text-slate-400">
                ({activeFile.content.split('\n').length} lines)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyText(`file-${activeFile.id}`, activeFile.content)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 px-3 py-1 text-xs font-mono text-slate-200 transition-colors"
              >
                {copiedKey === `file-${activeFile.id}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Markdown
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" /> Copy Raw File
                  </>
                )}
              </button>
              <button
                onClick={() => downloadFile(activeFile)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 px-3 py-1 text-xs font-mono font-semibold text-cyan-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          <pre className="p-4 sm:p-5 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-[560px] overflow-y-auto whitespace-pre-wrap break-words">
            {activeFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
