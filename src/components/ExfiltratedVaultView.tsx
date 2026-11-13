import React, { useState } from 'react';
import {
  CityName,
  DUMMY_CUSTOMER_CARD_LEAKS,
  DUMMY_SHOPKEEPER_LEAKS,
} from '../data/simulationData';
import {
  Database,
  Eye,
  EyeOff,
  Download,
  ShieldAlert,
  CreditCard,
  KeyRound,
  Search,
  Network,
} from 'lucide-react';

export const ExfiltratedVaultView: React.FC = () => {
  const [cityFilter, setCityFilter] = useState<CityName | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealSyntheticSecrets, setRevealSyntheticSecrets] = useState(false);

  const cities: Array<CityName | 'ALL'> = ['ALL', 'Paris', 'Milan', 'Berlin', 'London'];

  const filteredShopkeepers = DUMMY_SHOPKEEPER_LEAKS.filter((s) => {
    const matchesCity = cityFilter === 'ALL' || s.city === cityFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      s.fullName.toLowerCase().includes(q) ||
      s.storeName.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q);
    return matchesCity && matchesSearch;
  });

  const filteredCards = DUMMY_CUSTOMER_CARD_LEAKS.filter((c) => {
    const matchesCity = cityFilter === 'ALL' || c.city === cityFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      c.cardholderDummyName.toLowerCase().includes(q) ||
      c.merchantNode.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.loyaltyTier.toLowerCase().includes(q);
    return matchesCity && matchesSearch;
  });

  const handleDownloadDummyJson = () => {
    const payload = {
      project: 'Mission La Surprise — Educational Cyber Simulation',
      author: 'Vaibhav Thakur',
      syntheticDataGuarantee:
        '100% FICTIONAL & NON-ROUTABLE TEST DATA. Zero relation to real individuals, stores, or cards.',
      exportedAt: new Date().toISOString(),
      shopkeeperCredentialsDummy: filteredShopkeepers,
      customerPosCardsDummy: filteredCards,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mission-la-surprise-synthetic-forensic-dump.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Synthetic Safety Callout + Controls */}
      <div className="rounded-xl border border-fuchsia-500/35 bg-gradient-to-r from-[#130C1C] via-[#0D111B] to-[#0B131E] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
              <ShieldAlert className="w-3.5 h-3.5" />
              Verified Synthetic Sandbox Artifact • RFC-2606 &amp; PCI Test Ranges Only
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-fuchsia-400" />
              IT / OT Lateral Movement Exfiltration Vault <span className="text-fuchsia-400 font-mono text-sm">[DUMMY]</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Simulates secondary data exfiltration when unsegmented retail grocery networks bridge{' '}
              <span className="text-cyan-300 font-mono">BMS Refrigeration PLCs</span> and{' '}
              <span className="text-rose-300 font-mono">Point-of-Sale (POS) Subnets</span>. Every shopkeeper identity (
              <code className="text-emerald-300">.sandbox.invalid</code>) and customer card (
              <code className="text-emerald-300">4000 00.. / 5555 55..</code>) below is completely fictional.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setRevealSyntheticSecrets((prev) => !prev)}
              className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-mono font-bold transition-all ${
                revealSyntheticSecrets
                  ? 'border-rose-500/60 bg-rose-500/20 text-rose-200'
                  : 'border-cyan-500/40 bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/25'
              }`}
            >
              {revealSyntheticSecrets ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Mask Synthetic Fields
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" /> De-Mask Dummy Vault
                </>
              )}
            </button>

            <button
              onClick={handleDownloadDummyJson}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-mono font-semibold text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-fuchsia-400" />
              Export Dummy JSON
            </button>
          </div>
        </div>

        {/* Filter & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 flex-wrap">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`cursor-pointer px-3 py-1 rounded-md text-xs font-mono font-semibold border transition-colors ${
                  cityFilter === c
                    ? 'border-fuchsia-500/60 bg-fuchsia-500/20 text-fuchsia-200'
                    : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                {c === 'ALL' ? 'ALL CITIES (4)' : c.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter dummy store, shopkeeper, card..."
              className="w-full rounded-lg border border-slate-800 bg-[#080B12] pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:border-fuchsia-500/60 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 1: Dummy Shopkeeper & BMS Operator Credentials */}
      <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/90 bg-[#0F1522] px-4 py-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white">
              Leaked Shopkeeper &amp; Cold-Chain BMS Credentials [Dummy]
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredShopkeepers.length} Synthetic Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 bg-[#090D15] text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-4">City / Store</th>
                <th className="py-2.5 px-4">Fictional Shopkeeper / Staff</th>
                <th className="py-2.5 px-4">Privilege</th>
                <th className="py-2.5 px-4">BMS Freezer PIN</th>
                <th className="py-2.5 px-4">POS Node</th>
                <th className="py-2.5 px-4">Simulated Password Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
              {filteredShopkeepers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-200">{item.city}</div>
                    <div className="text-[11px] text-slate-400">{item.storeName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-cyan-300 font-semibold">{item.fullName}</div>
                    <div className="text-[11px] text-slate-400">{item.role}</div>
                    <div className="text-[10px] text-slate-500">{item.syntheticEmail}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded border border-amber-500/35 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {item.privilegeLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] text-rose-300">
                      {revealSyntheticSecrets ? item.bmsPinCode : '••••-OVERRIDE'}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{item.posTerminalId}</td>
                  <td className="py-3 px-4 text-[11px] text-slate-400 max-w-[230px] truncate">
                    {revealSyntheticSecrets ? item.passwordHashSim : '$2b$12$SIMULATED.REDACTED.••••••••••'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Dummy Customer POS Card Captures */}
      <div className="rounded-xl border border-slate-800/90 bg-[#0B0F17] overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/90 bg-[#0F1522] px-4 py-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white">
              Intercepted Customer Payment Card Telemetry [Non-Routable PCI Test Data]
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredCards.length} Synthetic POS Captures
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 bg-[#090D15] text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-4">City / Terminal</th>
                <th className="py-2.5 px-4">Dummy Cardholder</th>
                <th className="py-2.5 px-4">Synthetic Test PAN</th>
                <th className="py-2.5 px-4">Exp / Test CVV</th>
                <th className="py-2.5 px-4">Basket / Loyalty</th>
                <th className="py-2.5 px-4">Simulated Pivot Vector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
              {filteredCards.map((card) => (
                <tr key={card.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{card.city}</div>
                    <div className="text-[11px] text-slate-400">{card.merchantNode}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-200 font-semibold">{card.cardholderDummyName}</div>
                    <span className="inline-block mt-0.5 rounded bg-slate-800 px-1.5 py-0 text-[9px] text-cyan-300">
                      {card.brand}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <code
                      className={`rounded border px-2 py-0.5 text-[11px] ${
                        revealSyntheticSecrets
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                          : 'border-slate-800 bg-slate-900 text-slate-300'
                      }`}
                    >
                      {revealSyntheticSecrets ? card.fullTestPan : card.maskedPan}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {card.expirySim} •{' '}
                    <span className="text-slate-400">CVV: {revealSyntheticSecrets ? card.cvvSim : '•••'}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-emerald-300 font-semibold">{card.basketAmount}</div>
                    <div className="text-[10px] text-slate-500">{card.loyaltyTier}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded border border-fuchsia-500/30 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] text-fuchsia-300">
                      {card.captureVector}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Defensive Lesson Callout */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/15 p-4 flex items-start gap-3">
        <Network className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
          <div className="font-display font-bold text-cyan-300 uppercase tracking-wider">
            Defensive Takeaway: Why Refrigeration Attacks &amp; POS Card Leaks Co-Occur
          </div>
          <p>
            Historically, some retail breaches began through third-party HVAC/refrigeration maintenance credentials and
            pivoted horizontally into Point-of-Sale subnets—or vice versa. Enforcing{' '}
            <strong className="text-white">Purdue-Model VLAN segmentation</strong>,{' '}
            <strong className="text-white">Point-to-Point Encryption (P2PE)</strong> on card readers, and{' '}
            <strong className="text-white">isolated OT firewalls</strong> stops a single intrusion from endangering both
            customer payment privacy and physical cold-chain food safety.
          </p>
        </div>
      </div>
    </div>
  );
};
