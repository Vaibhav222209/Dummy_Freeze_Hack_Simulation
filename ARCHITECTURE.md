# Technical Simulation Architecture (`ARCHITECTURE.md`)

**Project:** Mission La Surprise  
**Created By:** Vaibhav Thakur

---

## System Architecture Diagram

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                   MISSION LA SURPRISE — BROWSER SANDBOX                    │
├──────────────────────┬───────────────────────────┬─────────────────────────┤
│  Tactical Theatre    │   Thermal Physics & OT    │   Synthetic Forensics   │
│  SVG Map (Europe)    │   State Simulation Loop   │   & GitHub Repo Viewer  │
│  • London (UK)       │   • 1000ms Tick Engine    │   • Dummy Shopkeepers   │
│  • Paris (FR)        │   • Setpoint Drift Calc   │   • PCI-Test Card Vault │
│  • Berlin (DE)       │   • Bio/Food Spoilage %   │   • Mask/Unmask Toggle  │
│  • Milan (IT)        │   • C2 / Blue-Team Logs   │   • Live Markdown Docs  │
└──────────┬───────────┴─────────────┬─────────────┴────────────┬────────────┘
           │                         │                          │
           ▼                         ▼                          ▼
┌────────────────────────────────────────────────────────────────────────────┐
│             8 Isolated In-Memory OT Nodes (Zero External I/O)              │
│   [PAR-GRC-01] [MIL-GRC-02] [BER-GRC-03] [LON-GRC-04]  (Grocery Freezers)  │
│   [PAR-HSP-01] [MIL-HSP-02] [BER-HSP-03] [LON-HSP-04]  (Hospital Cryo)     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Thermal Drift & Spoilage Simulation Model

Every `1.2s` simulation tick updates each node's chamber temperature (`currentTemp`) and asset integrity (`integrityPercent`):

1. **Thermal Escalation (`COMPROMISED_HEATING` / `CRITICAL_SPOILAGE`):**
   - When `targetSetpoint > nominalTemp`, the simulated chamber warms proportionally to `(targetSetpoint - currentTemp) * driftRate`.
   - If **`defrostHeaterForced`** is active while **`compressorActive === false`**, thermal climb accelerates by `2.1x`, simulating runaway electric defrost coils inside an insulated vault.
2. **Threshold Crossing & Bio/Food Integrity Decay:**
   - Once `currentTemp > spoilageThreshold` (`-4.0°C` for grocery deep-freeze; `-10.0°C` to `-12.0°C` for hospital cryo plasma/blood vaults), `integrityPercent` decays dynamically per tick based on thermal delta above threshold.
3. **Blue-Team Cryo-Restoration (`BLUE_TEAM_ISOLATED`):**
   - Resets `targetSetpoint` to `nominalTemp`, disables forced defrost heaters, re-enables compressors & hardware alarms, and rapidly cools the chamber back to safe sub-zero operating temperature.
