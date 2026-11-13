# Defensive OT / ICS Cold-Chain Security Playbook (`SECURITY.md`)

**Author:** Vaibhav Thakur  
**Focus:** Protecting Retail Refrigeration & Hospital Cryogenic Blood-Bank Systems

---

## Why Cold-Chain Systems Are High-Impact Targets

Unlike traditional IT servers where downtime causes temporary inconvenience, **Operational Technology (OT)** cold-chain breaches trigger irreversible **physical entropy**:
- **Grocery Cold-Chain (`-18°C` to `+4°C`):** Thermal excursions lasting just 2–4 hours promote bacterial growth, ruining tons of dairy, meat, seafood, and infant formula.
- **Hospital Cryo-Vaults (`-80°C` to `-30°C` / `+4°C`):** Donated O-Negative whole blood, fresh frozen plasma, stem cell grafts, and thermolabile biologics lose clinical viability rapidly if compressors stall and defrost heaters activate while SCADA alarms are masked.

---

## Recommended Blue-Team Hardening Controls

### 1. Strict IT / POS / OT Network Segmentation (Purdue Model)
- **Never** bridge Point-of-Sale (POS) terminals and Building Management System (BMS) / refrigeration PLCs on the same flat VLAN.
- Place refrigeration PLCs (`Modbus/TCP`, `BACnet/IP`, `OPC-UA`) behind an industrial DMZ firewall with strict allow-lists.

### 2. Independent Out-of-Band Physical Thermal Alarms
- Software SCADA dashboards can be spoofed (`ALM_SUPPRESS=1`).
- Install **air-gapped, battery-backed analog bimetallic/thermocouple hardware sirens & cellular SMS beacons** inside every blood bank cryo-freezer and bulk grocery vault that trigger purely on physical chamber temperature—completely independent of the main BMS PLC.

### 3. Hardware Setpoint Bounds & Physical Keylocks
- Configure PLC firmware upper hard-limits (e.g., a deep-freeze controller physically refuses remote register writes above `-10°C` unless a physical key-switch on the compressor cabinet is turned to `MAINTENANCE`).
- Interlock defrost heating elements with mechanical thermal cutouts so heaters cannot run continuously above `+5°C`.

### 4. Protocol Authentication & Encrypted Telemetry
- Replace legacy cleartext `Modbus/TCP` and unauthenticated `BACnet/IP` with **Modbus/TCP Security (TLS)**, **BACnet Secure Connect (BACnet/SC)**, and certificate-pinned **OPC-UA**.
- Enforce Multi-Factor Authentication (MFA) on all third-party HVAC vendor remote-maintenance portals.

---

## Reporting Issues in This Repository

If you spot a bug, UI accessibility issue, or want to contribute additional defensive blue-team countermeasures to **Mission La Surprise**, please open a GitHub Issue using `.github/ISSUE_TEMPLATE/simulation_module.md`.
