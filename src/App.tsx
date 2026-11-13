import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CityName,
  FreezerNode,
  INITIAL_FREEZER_NODES,
  SectorType,
} from './data/simulationData';
import { EthicalBriefingModal } from './components/EthicalBriefingModal';
import { TacticalEuropeMap } from './components/TacticalEuropeMap';
import { FreezerNodeCard } from './components/FreezerNodeCard';
import { LiveTerminalConsole, TerminalLogEntry } from './components/LiveTerminalConsole';
import { ExfiltratedVaultView } from './components/ExfiltratedVaultView';
import { GitHubRepoKitView } from './components/GitHubRepoKitView';
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  RotateCcw,
  Database,
  Activity,
  FolderGit2,
  Heart,
  ShoppingBag,
  HeartPulse,
  Sparkles,
  UserCheck,
} from 'lucide-react';

type ActiveTab = 'console' | 'vault' | 'github';

const nowTime = () => {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
};

export function App() {
  const [nodes, setNodes] = useState<FreezerNode[]>(INITIAL_FREEZER_NODES);
  const [activeTab, setActiveTab] = useState<ActiveTab>('console');
  const [selectedCity, setSelectedCity] = useState<CityName | 'ALL'>('ALL');
  const [sectorFilter, setSectorFilter] = useState<SectorType | 'ALL'>('ALL');
  const [showBriefingModal, setShowBriefingModal] = useState<boolean>(true);

  const alertedSpoilageIds = useRef<Set<string>>(new Set());

  const [logs, setLogs] = useState<TerminalLogEntry[]>([
    {
      id: 'init-1',
      timestamp: nowTime(),
      level: 'INFO',
      message:
        'MISSION LA SURPRISE // Educational OT Cold-Chain Sandbox initialized by Vaibhav Thakur.',
    },
    {
      id: 'init-2',
      timestamp: nowTime(),
      level: 'INFO',
      message:
        'Connected to 8 synthetic PLC telemetry twins across PARIS, MILAN, BERLIN & LONDON (Zero external network traffic).',
    },
    {
      id: 'init-3',
      timestamp: nowTime(),
      level: 'DEFENSE',
      message:
        'All grocery cold-vaults (-18.5°C) and hospital blood/cryo freezers (-38.0°C) currently NOMINAL.',
    },
  ]);

  const appendLog = useCallback((level: TerminalLogEntry['level'], message: string) => {
    setLogs((prev) => [
      ...prev.slice(-75),
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: nowTime(),
        level,
        message,
      },
    ]);
  }, []);

  // Real-time Thermal Drift & Bio/Food Spoilage Engine
  useEffect(() => {
    const interval = setInterval(() => {
      const newlySpoiled: FreezerNode[] = [];

      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const delta = node.targetSetpoint - node.currentTemp;
          let step = 0;

          if (Math.abs(delta) > 0.15) {
            // Faster heating if defrost heater coil is forced ON while compressor is OFF
            const accel =
              delta > 0 && node.defrostHeaterForced ? 0.22 : delta < 0 ? 0.25 : 0.13;
            step = delta * accel;
            // Ensure minimum visible movement during active transition
            if (Math.abs(step) < 0.35) {
              step = delta > 0 ? Math.min(0.45, delta) : Math.max(-0.55, delta);
            }
          } else {
            // Tiny realistic sensor jitter (+/- 0.1°C)
            step = (Math.random() - 0.5) * 0.12;
          }

          const nextTemp = Number((node.currentTemp + step).toFixed(1));
          const nextHistory = [...node.tempHistory.slice(-7), nextTemp];

          // Integrity decay if temperature rises above spoilageThreshold
          let nextIntegrity = node.integrityPercent;
          if (nextTemp > node.spoilageThreshold) {
            const excessDegrees = nextTemp - node.spoilageThreshold;
            const decay = Math.max(0.7, excessDegrees * (node.sector === 'hospital' ? 0.16 : 0.13));
            nextIntegrity = Math.max(0, Number((node.integrityPercent - decay).toFixed(1)));
          }

          // Compute tactical status
          let nextStatus = node.status;
          if (nextTemp > node.spoilageThreshold) {
            nextStatus = 'CRITICAL_SPOILAGE';
            if (!alertedSpoilageIds.current.has(node.id)) {
              alertedSpoilageIds.current.add(node.id);
              newlySpoiled.push({ ...node, currentTemp: nextTemp });
            }
          } else if (
            node.targetSetpoint > node.nominalTemp + 5 ||
            node.defrostHeaterForced ||
            nextTemp > node.nominalTemp + 5
          ) {
            nextStatus = 'COMPROMISED_HEATING';
          } else if (node.status === 'BLUE_TEAM_ISOLATED') {
            nextStatus = 'BLUE_TEAM_ISOLATED';
          } else {
            nextStatus = 'NOMINAL';
          }

          return {
            ...node,
            currentTemp: nextTemp,
            tempHistory: nextHistory,
            integrityPercent: nextIntegrity,
            status: nextStatus,
          };
        })
      );

      newlySpoiled.forEach((n) => {
        appendLog(
          'SPOILAGE',
          `[${n.id} // ${n.city.toUpperCase()}] Thermal threshold (${n.spoilageThreshold}°C) breached at ${
            n.currentTemp > 0 ? `+${n.currentTemp}` : n.currentTemp
          }°C! ${
            n.sector === 'hospital'
              ? 'Donated O-Neg blood, plasma & biologics degrading!'
              : 'Perishable meat, dairy & produce supply spoiling!'
          }`
        );
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [appendLog]);

  // Attack Single Node
  const handleAttackNode = (id: string) => {
    const target = nodes.find((n) => n.id === id);
    if (!target) return;
    const hotSetpoint = target.sector === 'grocery' ? 35 : 32;

    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              targetSetpoint: hotSetpoint,
              compressorActive: false,
              defrostHeaterForced: true,
              alarmSuppressed: true,
              status: n.currentTemp > n.spoilageThreshold ? 'CRITICAL_SPOILAGE' : 'COMPROMISED_HEATING',
            }
          : n
      )
    );

    appendLog(
      'EXPLOIT',
      `[${target.protocol}] Injected setpoint +${hotSetpoint}°C + DEFROST_COIL=ON + ALM_SUPPRESS=1 -> ${target.facilityName} (${target.city})`
    );
  };

  // Restore Single Node (Blue Team)
  const handleRestoreNode = (id: string) => {
    const target = nodes.find((n) => n.id === id);
    if (!target) return;
    alertedSpoilageIds.current.delete(id);

    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              targetSetpoint: n.nominalTemp,
              compressorActive: true,
              defrostHeaterForced: false,
              alarmSuppressed: false,
              status: 'BLUE_TEAM_ISOLATED',
            }
          : n
      )
    );

    appendLog(
      'DEFENSE',
      `[BLUE-TEAM] Isolated VLAN & engaged backup cryo-compressors on ${target.id} (${target.city}). Returning to ${target.nominalTemp}°C.`
    );
  };

  // Adjust Setpoint Slider
  const handleAdjustSetpoint = (id: string, newSetpoint: number) => {
    const target = nodes.find((n) => n.id === id);
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              targetSetpoint: newSetpoint,
              compressorActive: newSetpoint <= 0,
              status:
                newSetpoint > n.nominalTemp + 5
                  ? n.currentTemp > n.spoilageThreshold
                    ? 'CRITICAL_SPOILAGE'
                    : 'COMPROMISED_HEATING'
                  : n.status,
            }
          : n
      )
    );
    if (target) {
      appendLog(
        newSetpoint > 0 ? 'EXPLOIT' : 'INFO',
        `Register write [${target.id}]: targetSetpoint updated to ${
          newSetpoint > 0 ? `+${newSetpoint}` : newSetpoint
        }°C.`
      );
    }
  };

  const handleToggleHeater = (id: string) => {
    const target = nodes.find((n) => n.id === id);
    if (!target) return;
    const nextState = !target.defrostHeaterForced;
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, defrostHeaterForced: nextState } : n))
    );
    appendLog(
      nextState ? 'EXPLOIT' : 'DEFENSE',
      `[${target.id}] Auxiliary electric defrost heater coil set to ${nextState ? 'FORCED ON' : 'OFF'}.`
    );
  };

  const handleToggleAlarmMask = (id: string) => {
    const target = nodes.find((n) => n.id === id);
    if (!target) return;
    const nextMask = !target.alarmSuppressed;
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, alarmSuppressed: nextMask } : n))
    );
    appendLog(
      nextMask ? 'EXPLOIT' : 'DEFENSE',
      `[${target.id}] SCADA thermal excursion alarm register ${
        nextMask ? 'MASKED (ALM_SUPPRESS=1)' : 'RE-ARMED'
      }.`
    );
  };

  // Coordinated Multi-City Attack ("Mission La Surprise")
  const executeCoordinatedAttack = (filterSector?: SectorType, filterCity?: CityName) => {
    setNodes((prev) =>
      prev.map((n) => {
        const matchSector = !filterSector || n.sector === filterSector;
        const matchCity = !filterCity || n.city === filterCity;
        if (!matchSector || !matchCity) return n;

        return {
          ...n,
          targetSetpoint: n.sector === 'grocery' ? 35 : 32,
          compressorActive: false,
          defrostHeaterForced: true,
          alarmSuppressed: true,
          status: n.currentTemp > n.spoilageThreshold ? 'CRITICAL_SPOILAGE' : 'COMPROMISED_HEATING',
        };
      })
    );

    if (filterCity) {
      appendLog(
        'EXPLOIT',
        `[LOCALIZED STRIKE // ${filterCity.toUpperCase()}] Overrode Grocery & Hospital Cryo PLCs to +35°C/+32°C and forced defrost coils ON.`
      );
    } else if (filterSector === 'grocery') {
      appendLog(
        'EXPLOIT',
        '[SECTOR STRIKE // GROCERIES] Paris, Milan, Berlin & London retail freezer setpoints escalated to +35°C! Urban food supply chain heating.'
      );
    } else if (filterSector === 'hospital') {
      appendLog(
        'EXPLOIT',
        '[SECTOR STRIKE // HOSPITALS] Paris, Milan, Berlin & London cryo blood-banks overridden to +32°C! O-Neg blood & biologics at risk.'
      );
    } else {
      appendLog(
        'EXPLOIT',
        '>>> EXECUTING "MISSION LA SURPRISE" FULL SEQUENCE // All 8 Grocery & Hospital Cryo PLCs in Paris, Milan, Berlin & London set to +35°C/+32°C!'
      );
      appendLog(
        'EXFIL',
        'Secondary POS/BMS VLAN pivot captured 8 dummy shopkeeper profiles & 8 synthetic PCI-test card records -> Inspect [Exfiltrated Vault].'
      );
    }
  };

  // Coordinated Blue-Team Cryo-Restore
  const engageBlueTeamAll = () => {
    alertedSpoilageIds.current.clear();
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        targetSetpoint: n.nominalTemp,
        compressorActive: true,
        defrostHeaterForced: false,
        alarmSuppressed: false,
        status: 'BLUE_TEAM_ISOLATED',
      }))
    );
    appendLog(
      'DEFENSE',
      '>>> BLUE-TEAM EMERGENCY CRYO-LOCK ENGAGED // Rogue C2 severed, backup LN2 & sub-zero compressors active across Paris, Milan, Berlin & London!'
    );
  };

  // Pristine Reset
  const resetFullSimulation = () => {
    alertedSpoilageIds.current.clear();
    setNodes(INITIAL_FREEZER_NODES);
    appendLog(
      'INFO',
      'Sandbox state reset to 100% pristine food & medical blood-bank integrity across all 4 European cities.'
    );
  };

  // Interactive CLI Command Handler
  const handleTerminalCommand = (rawCmd: string) => {
    const cmd = rawCmd.toLowerCase().trim();
    appendLog('INFO', `$ ${rawCmd}`);

    if (cmd === 'help') {
      appendLog(
        'INFO',
        'Commands: la-surprise --all | strike --groceries | strike --hospitals | exfil --dummy-vault | defend --cryo-restore | status | reset'
      );
    } else if (cmd.includes('la-surprise') || cmd === 'exploit --all') {
      executeCoordinatedAttack();
    } else if (cmd.includes('grocer')) {
      executeCoordinatedAttack('grocery');
    } else if (cmd.includes('hospital')) {
      executeCoordinatedAttack('hospital');
    } else if (cmd.includes('exfil') || cmd.includes('vault')) {
      appendLog(
        'EXFIL',
        'Opening Synthetic Exfiltrated Vault (8 fictional shopkeepers + 8 PCI-test card captures)...'
      );
      setActiveTab('vault');
    } else if (cmd.includes('defend') || cmd.includes('restore')) {
      engageBlueTeamAll();
    } else if (cmd === 'reset') {
      resetFullSimulation();
    } else if (cmd === 'status') {
      const compromisedCount = nodes.filter(
        (n) => n.status === 'COMPROMISED_HEATING' || n.status === 'CRITICAL_SPOILAGE'
      ).length;
      appendLog(
        'INFO',
        `Telemetry Status: ${compromisedCount}/8 nodes heating/spoiling | Avg Grocery Integrity: ${avgGroceryIntegrity}% | Avg Hospital Blood Integrity: ${avgHospitalIntegrity}%`
      );
    } else {
      appendLog(
        'INFO',
        `Unrecognized sandbox command '${rawCmd}'. Type 'help' for available tactical commands.`
      );
    }
  };

  // Derived KPI Metrics
  const compromisedNodesCount = nodes.filter(
    (n) => n.status === 'COMPROMISED_HEATING' || n.status === 'CRITICAL_SPOILAGE'
  ).length;

  const groceryNodes = nodes.filter((n) => n.sector === 'grocery');
  const hospitalNodes = nodes.filter((n) => n.sector === 'hospital');

  const avgGroceryIntegrity = Math.round(
    groceryNodes.reduce((acc, n) => acc + n.integrityPercent, 0) / groceryNodes.length
  );
  const avgHospitalIntegrity = Math.round(
    hospitalNodes.reduce((acc, n) => acc + n.integrityPercent, 0) / hospitalNodes.length
  );

  const visibleNodes = nodes.filter((n) => {
    const cityOk = selectedCity === 'ALL' || n.city === selectedCity;
    const sectorOk = sectorFilter === 'ALL' || n.sector === sectorFilter;
    return cityOk && sectorOk;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#07090D] text-slate-100">
      {/* Ethical Briefing & Prayer Modal */}
      <EthicalBriefingModal
        isOpen={showBriefingModal}
        onClose={() => setShowBriefingModal(false)}
      />

      {/* Top Tactical Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-[#090D14]/95 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Brand Title & Author */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                  compromisedNodesCount > 0
                    ? 'border-rose-500/60 bg-rose-500/15 text-rose-400'
                    : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-lg font-display font-bold tracking-tight text-white">
                    MISSION LA SURPRISE
                  </h1>
                  <span className="rounded border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                    SYNTHETIC SANDBOX
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <span>Paris • Milan • Berlin • London Cold-Chain Cyber Sim</span>
                  <span className="text-slate-600">|</span>
                  <span className="inline-flex items-center gap-1 text-cyan-300 font-semibold">
                    <UserCheck className="w-3 h-3" /> Made by Vaibhav Thakur
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowBriefingModal(true)}
              className="lg:hidden cursor-pointer inline-flex items-center gap-1 rounded-lg border border-rose-500/35 bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-mono font-semibold text-rose-200"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Ethics &amp; Prayer
            </button>
          </div>

          {/* Primary Workspace Tabs + Ethics Trigger */}
          <div className="flex items-center gap-2 flex-wrap">
            <nav className="flex items-center gap-1 rounded-lg border border-slate-800 bg-[#06080D] p-1">
              <button
                onClick={() => setActiveTab('console')}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                  activeTab === 'console'
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-500/45'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Tactical OT Console
              </button>

              <button
                onClick={() => setActiveTab('vault')}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                  activeTab === 'vault'
                    ? 'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/45'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Dummy Leaked Vault
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                  activeTab === 'github'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/45'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                GitHub Docs &amp; Setup
              </button>
            </nav>

            <button
              onClick={() => setShowBriefingModal(true)}
              className="hidden lg:inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-2 text-xs font-mono font-semibold text-cyan-200 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              Disclaimer &amp; Prayer
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* Top 4 KPI Telemetry Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {/* KPI 1 */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Thermal Override Nodes
              </span>
              <div
                className={`text-2xl font-mono font-bold tabular-nums mt-0.5 ${
                  compromisedNodesCount > 0 ? 'text-rose-400' : 'text-cyan-300'
                }`}
              >
                {compromisedNodesCount} / 8{' '}
                <span className="text-xs font-normal text-slate-400">
                  {compromisedNodesCount > 0 ? 'HEATING ACTIVE' : 'SUB-ZERO SAFE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Paris • Milan • Berlin • London
              </p>
            </div>
            <div
              className={`h-10 w-10 rounded-lg border flex items-center justify-center ${
                compromisedNodesCount > 0
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                  : 'border-slate-800 bg-slate-900 text-cyan-400'
              }`}
            >
              <Flame className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 2 */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Grocery Food Cold-Chain
              </span>
              <div
                className={`text-2xl font-mono font-bold tabular-nums mt-0.5 ${
                  avgGroceryIntegrity < 65
                    ? 'text-rose-400'
                    : avgGroceryIntegrity < 95
                    ? 'text-amber-300'
                    : 'text-emerald-400'
                }`}
              >
                {avgGroceryIntegrity}% <span className="text-xs font-normal text-slate-400">VIABLE</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                75.0 Metric Tons Dairy, Meat &amp; Produce
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-300 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 3 */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Hospital Blood &amp; Cryo Supply
              </span>
              <div
                className={`text-2xl font-mono font-bold tabular-nums mt-0.5 ${
                  avgHospitalIntegrity < 65
                    ? 'text-rose-400'
                    : avgHospitalIntegrity < 95
                    ? 'text-amber-300'
                    : 'text-emerald-400'
                }`}
              >
                {avgHospitalIntegrity}% <span className="text-xs font-normal text-slate-400">VIABLE</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                3,950+ O-Neg Blood, Plasma &amp; Biologics
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 4 */}
          <div
            onClick={() => setActiveTab('vault')}
            className="cursor-pointer rounded-xl border border-slate-800/90 hover:border-fuchsia-500/50 bg-[#0B0F17] p-4 flex items-center justify-between transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Dummy POS / BMS Vault
              </span>
              <div className="text-2xl font-mono font-bold tabular-nums text-fuchsia-300 mt-0.5">
                16 <span className="text-xs font-normal text-slate-400">SYNTHETIC RECORDS</span>
              </div>
              <p className="text-[11px] text-fuchsia-300/80 mt-0.5 underline decoration-fuchsia-500/40">
                8 Shopkeepers + 8 PCI-Test Cards →
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg border border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* TAB 1: TACTICAL OT CONSOLE */}
        {activeTab === 'console' && (
          <div className="space-y-6">
            {/* Master Scenario Action Deck */}
            <div className="rounded-xl border border-slate-800/90 bg-gradient-to-r from-[#130B13] via-[#0B0F17] to-[#091319] p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-white">
                  Coordinated Scenario Orchestrator // &ldquo;Mission La Surprise&rdquo;
                </h2>
                <p className="text-xs text-slate-400">
                  Simulate multi-city freezer heating across Grocery Food Supply &amp; Hospital Blood Cryo-Storage—or test Blue-Team containment
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => executeCoordinatedAttack()}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-950/50 transition-all"
                >
                  <Flame className="w-4 h-4" />
                  Execute &ldquo;La Surprise&rdquo; (All 4 Cities)
                </button>

                <button
                  onClick={() => executeCoordinatedAttack('grocery')}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-amber-500/45 bg-amber-500/15 hover:bg-amber-500/25 px-3 py-2 text-xs font-mono font-semibold text-amber-200 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Heat Grocery Freezers
                </button>

                <button
                  onClick={() => executeCoordinatedAttack('hospital')}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-fuchsia-500/45 bg-fuchsia-500/15 hover:bg-fuchsia-500/25 px-3 py-2 text-xs font-mono font-semibold text-fuchsia-200 transition-colors"
                >
                  <HeartPulse className="w-3.5 h-3.5" />
                  Heat Hospital Cryo-Banks
                </button>

                <button
                  onClick={engageBlueTeamAll}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/15 hover:bg-emerald-500/25 px-3.5 py-2 text-xs font-mono font-bold text-emerald-200 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Blue-Team Cryo-Restore
                </button>

                <button
                  onClick={resetFullSimulation}
                  title="Reset Full Sandbox"
                  className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Map + Live OT Terminal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7">
                <TacticalEuropeMap
                  nodes={nodes}
                  selectedCity={selectedCity}
                  onSelectCity={setSelectedCity}
                  onTriggerCityAttack={(city) => executeCoordinatedAttack(undefined, city)}
                />
              </div>
              <div className="lg:col-span-5">
                <LiveTerminalConsole
                  logs={logs}
                  onClearLogs={() =>
                    setLogs([
                      {
                        id: 'cleared',
                        timestamp: nowTime(),
                        level: 'INFO',
                        message: 'Console buffer cleared. Type "help" for sandbox commands.',
                      },
                    ])
                  }
                  onRunCommand={handleTerminalCommand}
                />
              </div>
            </div>

            {/* Freezer Nodes Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Simulated Cold-Chain &amp; Cryo PLC Telemetry Twins ({visibleNodes.length})
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Adjust PLC setpoint sliders or trigger thermal overrides to observe food &amp; blood-bank spoilage physics
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setSectorFilter('ALL')}
                  className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-mono font-semibold transition-colors ${
                    sectorFilter === 'ALL'
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-200'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Sectors (8)
                </button>
                <button
                  onClick={() => setSectorFilter('grocery')}
                  className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-mono font-semibold transition-colors ${
                    sectorFilter === 'grocery'
                      ? 'border-sky-500/50 bg-sky-500/15 text-sky-200'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Grocery Stores (4)
                </button>
                <button
                  onClick={() => setSectorFilter('hospital')}
                  className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-mono font-semibold transition-colors ${
                    sectorFilter === 'hospital'
                      ? 'border-fuchsia-500/50 bg-fuchsia-500/15 text-fuchsia-200'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hospital Blood/Cryo (4)
                </button>
              </div>
            </div>

            {/* Freezer Node Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {visibleNodes.map((node) => (
                <FreezerNodeCard
                  key={node.id}
                  node={node}
                  onAttackNode={handleAttackNode}
                  onRestoreNode={handleRestoreNode}
                  onAdjustSetpoint={handleAdjustSetpoint}
                  onToggleHeater={handleToggleHeater}
                  onToggleAlarmMask={handleToggleAlarmMask}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DUMMY EXFILTRATED VAULT */}
        {activeTab === 'vault' && <ExfiltratedVaultView />}

        {/* TAB 3: GITHUB REPOSITORY SUITE & SETUP STEPS */}
        {activeTab === 'github' && <GitHubRepoKitView />}
      </main>

      {/* Persistent Ethical Disclaimer, Gratitude & Prayer Footer */}
      <footer className="mt-8 border-t border-slate-800/90 bg-[#06080D] py-6 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              ETHICAL DISCLAIMER &amp; NON-AFFILIATION NOTICE — BY VAIBHAV THAKUR
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              I (<strong className="text-slate-200">Vaibhav Thakur</strong>) do <strong className="text-slate-200">not</strong> have any relation or involvement with anything that happened in real life.{' '}
              <span className="text-slate-300">&ldquo;Mission La Surprise&rdquo;</span> is strictly a sample cybersecurity awareness &amp; simulation project inspired by real-world critical-infrastructure protection concepts; all stores, hospitals, telemetry, shopkeeper records, and payment cards inside this project are{' '}
              <strong className="text-emerald-300">100% synthetic/dummy and not real</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-950/25 via-slate-900/60 to-rose-950/25 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs font-display font-bold text-cyan-300">
              <span className="inline-flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                Gratitude &amp; Prayer for Safety
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300">
                <Sparkles className="w-3 h-3" /> Stay Safe
              </span>
            </div>
            <p className="text-[11px] text-slate-300 italic leading-relaxed">
              &ldquo;Thankful for every defender, healthcare hero, and supply-chain worker — praying sincerely that everything will be alright and wishing peace, resilience, and safety to all. Stay safe!&rdquo; — Vaibhav Thakur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
