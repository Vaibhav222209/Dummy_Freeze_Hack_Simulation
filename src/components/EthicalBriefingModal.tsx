import React from 'react';
import { ShieldCheck, Heart, AlertTriangle, CheckCircle2, Sparkles, Lock } from 'lucide-react';

interface EthicalBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalBriefingModal: React.FC<EthicalBriefingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-700/80 bg-[#0B0F17] shadow-2xl shadow-black/90 overflow-hidden my-auto">
        {/* Top Accent Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-rose-500 to-emerald-400" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-800/90 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Educational Sandbox • 100% Synthetic Data
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
                MISSION LA SURPRISE <span className="text-rose-400 font-mono text-base font-normal">// ETHICAL BRIEFING</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Created by <span className="text-cyan-300 font-semibold">Vaibhav Thakur</span> • OT/ICS Cold-Chain &amp; Medical Cryo Resilience Study
              </p>
            </div>
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          {/* Non-Affiliation & Synthetic Data Note */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.07] p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-display font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              Important Author Disclaimer &amp; Non-Affiliation Statement
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Note from Vaibhav Thakur:</strong> I do <strong className="underline decoration-amber-400/60">not</strong> have any relation, affiliation, or involvement whatsoever with anything that happened in real life.{' '}
              <span className="text-amber-200 font-medium">&ldquo;Mission La Surprise&rdquo;</span> is strictly a sample cybersecurity visualization project inspired by real-world critical-infrastructure awareness events, and{' '}
              <strong className="text-white">100% of the content inside this project is fictional and not real</strong>.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Dummy Grocery &amp; Hospital Nodes Only
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Zero Real Network / PLC Exploitation
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Fictional Shopkeeper `.invalid` IDs
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                PCI Test-Prefix Dummy Cards (`4000 00..`)
              </li>
            </ul>
          </div>

          {/* Heartfelt Wish of Gratitude & Prayer */}
          <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-950/35 via-slate-900/70 to-rose-950/25 p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-display font-semibold text-sm">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30 shrink-0" />
              A Wish of Gratitude &amp; Prayer for Safety
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              &ldquo;With deep gratitude to healthcare teams protecting donated blood and patients, shopkeepers and food supply workers serving our cities, and cyber defenders standing guard every day — I sincerely pray that everything will be alright, that affected communities stay strong and heal swiftly, and wish everyone peace, protection, and well-being. Please take care and stay safe.&rdquo;
            </p>
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-cyan-300/90">
              <span>— Vaibhav Thakur</span>
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <Sparkles className="w-3 h-3" /> Stay Safe &amp; Resilient
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
              Targets Simulated: <span className="text-slate-200">Paris • Milan • Berlin • London</span> (Grocery &amp; Hospital Cryo)
            </p>
            <button
              onClick={onClose}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-950/50 transition-all"
            >
              Acknowledge &amp; Enter Command Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
