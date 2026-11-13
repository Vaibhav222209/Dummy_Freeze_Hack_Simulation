import React from 'react';
import { FreezerNode } from '../data/simulationData';
import {
  Flame,
  Snowflake,
  ShieldCheck,
  AlertOctagon,
  BellOff,
  Bell,
  ShoppingBag,
  HeartPulse,
  Cpu,
} from 'lucide-react';

interface FreezerNodeCardProps {
  node: FreezerNode;
  onAttackNode: (id: string) => void;
  onRestoreNode: (id: string) => void;
  onAdjustSetpoint: (id: string, newSetpoint: number) => void;
  onToggleHeater: (id: string) => void;
  onToggleAlarmMask: (id: string) => void;
}

export const FreezerNodeCard: React.FC<FreezerNodeCardProps> = ({
  node,
  onAttackNode,
  onRestoreNode,
  onAdjustSetpoint,
  onToggleHeater,
  onToggleAlarmMask,
}) => {
  const isSpoiling = node.currentTemp > node.spoilageThreshold;
  const isCompromised = node.status === 'COMPROMISED_HEATING' || node.status === 'CRITICAL_SPOILAGE';

  // Sparkline SVG path from tempHistory (-45°C to +42°C mapped to 0..28px height)
  const sparkPoints = node.tempHistory
    .map((t, idx) => {
      const x = (idx / Math.max(1, node.tempHistory.length - 1)) * 108;
      const clamped = Math.max(-45, Math.min(42, t));
      const y = 26 - ((clamped + 45) / 87) * 24;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const statusBadge = () => {
    switch (node.status) {
      case 'CRITICAL_SPOILAGE':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-rose-500/50 bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 animate-telemetry-pulse">
            <AlertOctagon className="w-3 h-3" /> SPOILAGE BREACH
          </span>
        );
      case 'COMPROMISED_HEATING':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-amber-500/50 bg-amber-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
            <Flame className="w-3 h-3" /> HEATING DRIFT
          </span>
        );
      case 'BLUE_TEAM_ISOLATED':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
            <ShieldCheck className="w-3 h-3" /> CRYO-LOCKED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
            <Snowflake className="w-3 h-3" /> SUB-ZERO NOMINAL
          </span>
        );
    }
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-300 bg-[#0B0F17] flex flex-col justify-between overflow-hidden ${
        node.status === 'CRITICAL_SPOILAGE'
          ? 'border-rose-500/65 shadow-lg shadow-rose-950/35'
          : node.status === 'COMPROMISED_HEATING'
          ? 'border-amber-500/50 shadow-md shadow-amber-950/20'
          : node.status === 'BLUE_TEAM_ISOLATED'
          ? 'border-emerald-500/45'
          : 'border-slate-800/90 hover:border-slate-700'
      }`}
    >
      {/* Top Bar */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="rounded bg-slate-800/90 border border-slate-700 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-200">
                {node.city.toUpperCase()} • {node.countryCode}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold ${
                  node.sector === 'hospital'
                    ? 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30'
                    : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                }`}
              >
                {node.sector === 'hospital' ? (
                  <>
                    <HeartPulse className="w-3 h-3" /> HOSPITAL CRYO
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3" /> GROCERY VAULT
                  </>
                )}
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
              {node.facilityName}
            </h4>
            <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{node.id}</span>
              <span className="text-slate-600">•</span>
              <span>{node.sandboxIp}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">{node.protocol}</span>
            </p>
          </div>
          {statusBadge()}
        </div>

        {/* Live Telemetry Block */}
        <div className="grid grid-cols-12 gap-2 rounded-lg border border-slate-800/90 bg-[#070A10] p-3 items-center">
          <div className="col-span-5">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Chamber Temp
            </span>
            <div
              className={`text-2xl font-mono font-bold tabular-nums tracking-tight ${
                isSpoiling
                  ? 'text-rose-400'
                  : node.currentTemp > node.nominalTemp + 4
                  ? 'text-amber-300'
                  : 'text-cyan-300'
              }`}
            >
              {node.currentTemp > 0 ? `+${node.currentTemp.toFixed(1)}` : node.currentTemp.toFixed(1)}°C
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Setpoint:{' '}
              <strong className={node.targetSetpoint > 0 ? 'text-rose-400' : 'text-slate-300'}>
                {node.targetSetpoint > 0 ? `+${node.targetSetpoint.toFixed(0)}` : node.targetSetpoint.toFixed(0)}°C
              </strong>
            </span>
          </div>

          <div className="col-span-4 flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase text-slate-500 mb-1">Thermal Curve</span>
            <svg width="110" height="28" className="overflow-visible">
              <polyline
                fill="none"
                stroke={isSpoiling ? '#F43F5E' : isCompromised ? '#F59E0B' : '#22D3EE'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={sparkPoints}
              />
            </svg>
          </div>

          <div className="col-span-3 text-right">
            <span className="block text-[10px] font-mono uppercase text-slate-500">Supply Viable</span>
            <span
              className={`text-lg font-mono font-bold tabular-nums ${
                node.integrityPercent < 55
                  ? 'text-rose-400'
                  : node.integrityPercent < 88
                  ? 'text-amber-300'
                  : 'text-emerald-400'
              }`}
            >
              {node.integrityPercent.toFixed(0)}%
            </span>
            <span className="block text-[9px] font-mono text-slate-500">{node.estimatedUnitsAtRisk}</span>
          </div>
        </div>

        {/* Integrity Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-slate-400">
              {node.sector === 'hospital' ? 'Blood & Biologics Cold Viability' : 'Food Supply Cold-Chain Integrity'}
            </span>
            <span className={isSpoiling ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
              Spoilage Above {node.spoilageThreshold.toFixed(0)}°C
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                node.integrityPercent < 50
                  ? 'bg-rose-500'
                  : node.integrityPercent < 85
                  ? 'bg-amber-400'
                  : 'bg-cyan-400'
              }`}
              style={{ width: `${Math.max(3, node.integrityPercent)}%` }}
            />
          </div>
        </div>

        {/* Critical Assets List */}
        <div className="rounded-lg bg-slate-900/55 border border-slate-800/75 p-2.5 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            {node.sector === 'hospital' ? 'Critical Medical Reserves Inside:' : 'Perishable Food Supply Inside:'}
          </div>
          <ul className="space-y-0.5 text-[11px] text-slate-300">
            {node.criticalAssets.map((asset, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-snug">
                <span className={isSpoiling ? 'text-rose-400' : 'text-cyan-400'}>•</span>
                <span>{asset}</span>
              </li>
            ))}
          </ul>
          <p className="pt-1 text-[10px] font-mono text-amber-300/90 border-t border-slate-800/80 mt-1">
            Impact: {node.supplyImpactMetric}
          </p>
        </div>

        {/* Manual Setpoint Slider + Relay Toggles */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <label htmlFor={`slider-${node.id}`} className="text-slate-400">
              PLC Setpoint Register:
            </label>
            <span className="text-slate-200 font-semibold">
              {node.targetSetpoint > 0 ? `+${node.targetSetpoint}` : node.targetSetpoint}°C
            </span>
          </div>
          <input
            id={`slider-${node.id}`}
            type="range"
            min={-42}
            max={38}
            step={1}
            value={node.targetSetpoint}
            onChange={(e) => onAdjustSetpoint(node.id, Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => onToggleHeater(node.id)}
              className={`flex-1 cursor-pointer inline-flex items-center justify-center gap-1 rounded border px-2 py-1 text-[10px] font-mono font-semibold transition-colors ${
                node.defrostHeaterForced
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-200'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3 h-3" />
              Defrost Coil: {node.defrostHeaterForced ? 'FORCED ON' : 'OFF'}
            </button>
            <button
              onClick={() => onToggleAlarmMask(node.id)}
              className={`flex-1 cursor-pointer inline-flex items-center justify-center gap-1 rounded border px-2 py-1 text-[10px] font-mono font-semibold transition-colors ${
                node.alarmSuppressed
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-200'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {node.alarmSuppressed ? <BellOff className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
              SCADA Alarm: {node.alarmSuppressed ? 'MASKED' : 'ARMED'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="grid grid-cols-2 border-t border-slate-800/90 bg-[#080C14]">
        <button
          onClick={() => onAttackNode(node.id)}
          className="cursor-pointer flex items-center justify-center gap-1.5 py-2.5 px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-rose-300 hover:bg-rose-500/15 hover:text-rose-200 transition-colors border-r border-slate-800/90"
        >
          <Flame className="w-3.5 h-3.5" />
          Heat to +35°C
        </button>
        <button
          onClick={() => onRestoreNode(node.id)}
          className="cursor-pointer flex items-center justify-center gap-1.5 py-2.5 px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-200 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Cryo-Restore
        </button>
      </div>
    </div>
  );
};
