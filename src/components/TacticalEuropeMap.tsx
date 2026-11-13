import React from 'react';
import { CITY_MAP_META, CityName, FreezerNode } from '../data/simulationData';
import { Radio, Crosshair } from 'lucide-react';

interface TacticalEuropeMapProps {
  nodes: FreezerNode[];
  selectedCity: CityName | 'ALL';
  onSelectCity: (city: CityName | 'ALL') => void;
  onTriggerCityAttack: (city: CityName) => void;
}

export const TacticalEuropeMap: React.FC<TacticalEuropeMapProps> = ({
  nodes,
  selectedCity,
  onSelectCity,
  onTriggerCityAttack,
}) => {
  const cities: CityName[] = ['London', 'Paris', 'Berlin', 'Milan'];
  const c2Origin = { x: 88, y: 368 }; // Sandbox C2 Relay Anchor in Atlantic sector

  const getCityStatus = (city: CityName) => {
    const cityNodes = nodes.filter((n) => n.city === city);
    const hasCritical = cityNodes.some((n) => n.status === 'CRITICAL_SPOILAGE');
    const hasHeating = cityNodes.some((n) => n.status === 'COMPROMISED_HEATING');
    const allBlueTeam = cityNodes.every((n) => n.status === 'BLUE_TEAM_ISOLATED');

    if (hasCritical) return 'CRITICAL';
    if (hasHeating) return 'WARNING';
    if (allBlueTeam) return 'ISOLATED';
    return 'NOMINAL';
  };

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 px-4 py-3 bg-[#0E1420]/70">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
          <div>
            <h3 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-100">
              European Cold-Chain Theatre // C2 Telemetry Map
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Click any city node to filter telemetry or inject localized thermal override
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onSelectCity('ALL')}
            className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all border ${
              selectedCity === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ALL [4 CITIES]
          </button>
          {cities.map((c) => {
            const st = getCityStatus(c);
            const active = selectedCity === c;
            return (
              <button
                key={c}
                onClick={() => onSelectCity(active ? 'ALL' : c)}
                className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all border flex items-center gap-1.5 ${
                  active
                    ? 'bg-slate-800 text-white border-slate-500'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    st === 'CRITICAL'
                      ? 'bg-rose-500 animate-ping'
                      : st === 'WARNING'
                      ? 'bg-amber-400'
                      : st === 'ISOLATED'
                      ? 'bg-emerald-400'
                      : 'bg-cyan-400'
                  }`}
                />
                {c.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full bg-[#070B11] bg-tactical-grid">
        <svg
          viewBox="0 0 680 430"
          className="w-full h-auto max-h-[370px] select-none block"
          role="img"
          aria-label="Tactical Map of London, Paris, Berlin, and Milan"
        >
          <defs>
            <radialGradient id="criticalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="warningGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nominalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Latitude / Longitude Tactical Graticule */}
          {[90, 175, 260, 345].map((y) => (
            <g key={`lat-${y}`}>
              <line x1="0" y1={y} x2="680" y2={y} stroke="#162032" strokeWidth="1" strokeDasharray="3 5" />
              <text x="10" y={y - 4} fill="#334155" fontSize="9" fontFamily="JetBrains Mono">
                {60 - Math.round(y / 18)}°N
              </text>
            </g>
          ))}
          {[140, 270, 400, 530].map((x) => (
            <line
              key={`lon-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="430"
              stroke="#162032"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}

          {/* Stylized European Landmass Contours (UK, Ireland, Continental Western/Central Europe, Italy, Scandinavia tip) */}
          {/* Great Britain */}
          <path
            d="M178,95 L206,88 L220,115 L214,142 L236,166 L232,194 L196,204 L168,198 L175,172 L162,150 L176,125 Z"
            fill="#0F1726"
            stroke="#26354D"
            strokeWidth="1.4"
          />
          {/* Ireland */}
          <path
            d="M126,132 L152,126 L158,156 L136,174 L118,162 Z"
            fill="#0D1422"
            stroke="#1E2B40"
            strokeWidth="1.2"
          />
          {/* Scandinavia Southern Tip */}
          <path
            d="M362,25 L435,18 L465,62 L428,96 L388,88 L368,58 Z"
            fill="#0D1422"
            stroke="#1E2B40"
            strokeWidth="1.2"
          />
          {/* Continental Europe (France, Benelux, Germany, Poland West, Iberia North-East, Alpine, Italy Peninsula) */}
          <path
            d="M145,260 L195,232 L248,214 L298,186 L348,158 L382,118 L420,122 L492,130 L568,148 L595,215 L550,275 L478,295 L435,318 L452,358 L484,392 L462,412 L426,385 L395,352 L352,348 L314,328 L268,338 L220,368 L142,378 L112,328 Z"
            fill="#0F1726"
            stroke="#26354D"
            strokeWidth="1.5"
          />

          {/* Inter-City Cold-Chain Backbone Mesh */}
          <path
            d="M215,182 L256,252 L372,342 L438,170 L215,182 M256,252 L438,170"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* C2 Sandbox Proxy Node */}
          <g transform={`translate(${c2Origin.x}, ${c2Origin.y})`}>
            <rect
              x="-48"
              y="-15"
              width="96"
              height="30"
              rx="5"
              fill="#130D16"
              stroke="#F43F5E"
              strokeWidth="1.2"
            />
            <circle cx="-35" cy="0" r="3.5" fill="#F43F5E" className="animate-ping" />
            <circle cx="-35" cy="0" r="3.5" fill="#F43F5E" />
            <text x="-25" y="-2" fill="#FDA4AF" fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="700">
              C2-SIM-RELAY
            </text>
            <text x="-25" y="9" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono">
              198.51.100.99
            </text>
          </g>

          {/* Animated C2 Attack Vectors to Compromised Cities */}
          {cities.map((city) => {
            const meta = CITY_MAP_META[city];
            const st = getCityStatus(city);
            const isCompromised = st === 'CRITICAL' || st === 'WARNING';
            const midX = (c2Origin.x + meta.coords.x) / 2 - 22;
            const midY = Math.min(c2Origin.y, meta.coords.y) - 38;
            const pathD = `M ${c2Origin.x} ${c2Origin.y - 15} Q ${midX} ${midY} ${meta.coords.x} ${meta.coords.y}`;

            return (
              <path
                key={`arc-${city}`}
                d={pathD}
                fill="none"
                stroke={
                  st === 'CRITICAL'
                    ? '#F43F5E'
                    : st === 'WARNING'
                    ? '#F59E0B'
                    : st === 'ISOLATED'
                    ? '#10B981'
                    : '#1E293B'
                }
                strokeWidth={isCompromised ? '2' : '1'}
                strokeOpacity={isCompromised ? '0.9' : '0.45'}
                className={isCompromised ? 'animate-dash-flow' : ''}
              />
            );
          })}

          {/* City Nodes & Live Dual-Sector Telemetry Callouts */}
          {cities.map((city) => {
            const meta = CITY_MAP_META[city];
            const grc = nodes.find((n) => n.city === city && n.sector === 'grocery')!;
            const hsp = nodes.find((n) => n.city === city && n.sector === 'hospital')!;
            const st = getCityStatus(city);
            const isSelected = selectedCity === city;

            const ringColor =
              st === 'CRITICAL'
                ? '#F43F5E'
                : st === 'WARNING'
                ? '#F59E0B'
                : st === 'ISOLATED'
                ? '#10B981'
                : '#22D3EE';

            const glowUrl =
              st === 'CRITICAL'
                ? 'url(#criticalGlow)'
                : st === 'WARNING'
                ? 'url(#warningGlow)'
                : 'url(#nominalGlow)';

            // Position callout card neatly relative to marker so none overlap
            const labelOffset =
              city === 'London'
                ? { dx: -135, dy: -56 }
                : city === 'Paris'
                ? { dx: -142, dy: 14 }
                : city === 'Berlin'
                ? { dx: 18, dy: -46 }
                : { dx: 18, dy: -26 }; // Milan

            return (
              <g
                key={city}
                className="cursor-pointer group"
                onClick={() => onSelectCity(isSelected ? 'ALL' : city)}
              >
                {/* Radial Glow */}
                <circle cx={meta.coords.x} cy={meta.coords.y} r="36" fill={glowUrl} />

                {/* Outer Selection / Sector Ring */}
                <circle
                  cx={meta.coords.x}
                  cy={meta.coords.y}
                  r={isSelected ? '16' : '12'}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth={isSelected ? '2.2' : '1.4'}
                  strokeDasharray={st === 'CRITICAL' ? '3 2' : undefined}
                />

                {/* Inner Core */}
                <circle cx={meta.coords.x} cy={meta.coords.y} r="5.5" fill={ringColor} />

                {/* Leader Line */}
                <line
                  x1={meta.coords.x}
                  y1={meta.coords.y}
                  x2={meta.coords.x + (labelOffset.dx > 0 ? 18 : -18)}
                  y2={meta.coords.y + labelOffset.dy + 22}
                  stroke={ringColor}
                  strokeWidth="1"
                  strokeOpacity="0.65"
                />

                {/* Telemetry Callout Box */}
                <g transform={`translate(${meta.coords.x + labelOffset.dx}, ${meta.coords.y + labelOffset.dy})`}>
                  <rect
                    x="0"
                    y="0"
                    width="132"
                    height="56"
                    rx="6"
                    fill="#0B101B"
                    fillOpacity="0.94"
                    stroke={isSelected ? '#F8FAFC' : ringColor}
                    strokeWidth={isSelected ? '1.5' : '1'}
                  />
                  <text x="8" y="14" fill="#F8FAFC" fontSize="10" fontFamily="Space Grotesk" fontWeight="700">
                    {city.toUpperCase()}
                  </text>
                  <text x="92" y="14" fill={ringColor} fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="700">
                    {st === 'CRITICAL' ? 'SPOIL!' : st === 'WARNING' ? 'DRIFT' : st === 'ISOLATED' ? 'SAFE' : 'CRYO'}
                  </text>

                  {/* Grocery Temp Line */}
                  <text x="8" y="30" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono">
                    GRC:
                  </text>
                  <text
                    x="36"
                    y="30"
                    fill={grc.currentTemp > grc.spoilageThreshold ? '#FDA4AF' : '#67E8F9'}
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="700"
                  >
                    {grc.currentTemp > 0 ? `+${grc.currentTemp.toFixed(1)}` : grc.currentTemp.toFixed(1)}°C
                  </text>
                  <text x="88" y="30" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono">
                    {Math.round(grc.integrityPercent)}%
                  </text>

                  {/* Hospital Temp Line */}
                  <text x="8" y="45" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono">
                    HSP:
                  </text>
                  <text
                    x="36"
                    y="45"
                    fill={hsp.currentTemp > hsp.spoilageThreshold ? '#FDA4AF' : '#38BDF8'}
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="700"
                  >
                    {hsp.currentTemp > 0 ? `+${hsp.currentTemp.toFixed(1)}` : hsp.currentTemp.toFixed(1)}°C
                  </text>
                  <text x="88" y="45" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono">
                    {Math.round(hsp.integrityPercent)}%
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Bottom Map Quick-Strike Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-[#0A0F18]/90 px-4 py-2.5 text-[11px] font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Sub-Zero Nominal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Setpoint Heating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Bio / Food Spoilage
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 mr-1 hidden sm:inline">Localized Strike:</span>
            {cities.map((c) => (
              <button
                key={`strike-${c}`}
                onClick={() => onTriggerCityAttack(c)}
                className="cursor-pointer inline-flex items-center gap-1 rounded border border-rose-500/35 bg-rose-500/10 hover:bg-rose-500/25 px-2 py-0.5 text-[10px] font-semibold text-rose-300 transition-colors"
              >
                <Crosshair className="w-3 h-3" />
                Heat {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
