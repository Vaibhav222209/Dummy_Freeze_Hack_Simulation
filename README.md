<div align="center">

```text
███╗   ███╗██╗███████╗███████╗██╗ ██████╗ ███╗   ██╗    ██╗      █████╗     ███████╗██╗   ██╗██████╗ ██████╗ ██████╗ ██╗███████╗███████╗
████╗ ████║██║██╔════╝██╔════╝██║██╔═══██╗████╗  ██║    ██║     ██╔══██╗    ██╔════╝██║   ██║██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██╔════╝
██╔████╔██║██║███████╗███████╗██║██║   ██║██╔██╗ ██║    ██║     ███████║    ███████╗██║   ██║██████╔╝██████╔╝██████╔╝██║███████╗█████╗  
██║╚██╔╝██║██║╚════██║╚════██║██║██║   ██║██║╚██╗██║    ██║     ██╔══██║    ╚════██║██║   ██║██╔═══╝ ██╔══██╗██╔══██╗██║╚════██║██╔══╝  
██║ ╚═╝ ██║██║███████║███████║██║╚██████╔╝██║ ╚████║    ███████╗██║  ██║    ███████║╚██████╔╝██║     ██║  ██║██║  ██║██║███████║███████╗
╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝    ╚══════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
```

### **OT / ICS Cold-Chain & Medical Cryo-Storage Cyber Incident Simulator**
*Exploring Thermal Setpoint Manipulation, Food Supply Spoilage, Hospital Blood-Bank Risk & IT/OT Lateral Movement Across **Paris · Milan · Berlin · London***

[![Created By](https://img.shields.io/badge/Created%20By-Vaibhav%20Thakur-f43f5e?style=for-the-badge&labelColor=0b0f17)](#author--attribution)
[![Environment](https://img.shields.io/badge/Sandbox-100%25%20Synthetic%20%26%20Dummy%20Data-10b981?style=for-the-badge&labelColor=0b0f17)](#-important-ethical-disclaimer--non-affiliation-note)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%E2%80%A2%20TypeScript%20%E2%80%A2%20Vite%20%E2%80%A2%20Tailwind%20v4-22d3ee?style=for-the-badge&labelColor=0b0f17)](#-how-to-make-the-project-work-step-by-step)
[![License](https://img.shields.io/badge/License-MIT%20(Educational)-f59e0b?style=for-the-badge&labelColor=0b0f17)](./LICENSE)

---

**[Overview](#-mission-overview) • [Disclaimer & Prayer](#-important-ethical-disclaimer--non-affiliation-note) • [Target Matrix](#-simulated-european-target-matrix) • [How to Run](#-how-to-make-the-project-work-step-by-step) • [Defensive Playbook](./SECURITY.md) • [Architecture](./ARCHITECTURE.md)**

</div>

---

## ⚠️ Important Ethical Disclaimer & Non-Affiliation Note

> **Statement by Vaibhav Thakur:**  
> **I do not have any relation, connection, or involvement whatsoever with anything that happened in real life.**  
> **"Mission La Surprise"** is strictly an **educational, academic cybersecurity awareness and incident-simulation sample project** inspired by public discussions around critical-infrastructure resilience.  
>
> - **100% Fictional & Synthetic Content:** Every grocery store name, hospital cryo-wing, IP address (`10.x.x.x` / `172.20.x.x`), PLC model, shopkeeper identity (`.sandbox.invalid`), and customer payment card number (`4000 00..` / `5555 55..` non-routable PCI test ranges) inside this project is **completely fake, synthetic, and not real**.  
> - **Zero Real-World Exploitation:** This application performs **no real network scanning, no real Modbus/BACnet packet transmission, and no external API attacks**. All telemetry, thermal physics, and packet logs run purely inside an in-browser React state engine for defensive education and visualization.

### 🙏 A Wish of Gratitude & Prayer for Safety

> *With heartfelt gratitude to the healthcare professionals safeguarding donated blood and life-saving medicines, the shopkeepers and logistics workers keeping our cities fed, and the cybersecurity defenders working tirelessly behind the scenes:*  
>
> **I sincerely pray that everything will be alright, that anyone impacted by cyber disruptions or hardships in the real world recovers swiftly, and that peace and resilience prevail. Thank you for reading and exploring responsibly — please take care of one another and stay safe.** 🤍  
> — *Vaibhav Thakur*

---

## 🎯 Mission Overview

Modern urban life depends on invisible **Operational Technology (OT)** and **Building Management Systems (BMS)** maintaining strict sub-zero temperatures around the clock. When retail refrigeration controllers or hospital cryogenic PLC gateways sit on flat, unsegmented networks alongside Point-of-Sale (POS) terminals, a single breach can cascade from digital intrusion into physical spoilage.

**Mission La Surprise** simulates a synchronized multi-city red-team / blue-team scenario across **Paris, Milan, Berlin, and London**:

1. **🛒 Retail Grocery Cold-Chain Thermal Override (`-18.5°C ➔ +34.0°C`)**
   - Simulates unauthenticated Modbus/TCP, BACnet/IP, and MQTT setpoint injection against dummy grocery hubs.
   - Disables compressor relays while forcing auxiliary **defrost heating coils ON**, rapidly warming deep-freeze vaults and spoiling tons of dairy, meat, seafood, produce, and infant nutrition reserves.
2. **🏥 Hospital Cryo-Vault & Donated Blood Supply Breach (`-40.0°C ➔ +30.0°C`)**
   - Simulates thermal threshold alarm masking (`ALM_SUPPRESS=1`) and setpoint escalation inside sandbox hospital hematology & cryogenic storage wings.
   - Visualizes real-time integrity loss across **O-Negative Universal Donor Blood**, **Fresh Frozen Plasma**, **Stem Cell Grafts**, **Pediatric Insulin**, **Monoclonal Biologics**, and **Organ Transplant Perfusate**.
3. **💳 Synthetic IT-to-OT Lateral Movement Vault (Dummy Shopkeeper & Card Data)**
   - Demonstrates how attackers pivoting between shared BMS and POS VLANs harvest storekeeper BMS PINs, operator hashes, and synthetic POS card track telemetry.
   - Includes interactive **Redacted / Unmasked Sandbox Inspection** and JSON forensic export.
4. **🛡️ Blue-Team Emergency Cryo-Lock & Containment**
   - Engage instant defensive countermeasures to sever rogue C2 sessions, isolate OT VLANs, restore sub-zero PLC setpoints, and activate backup liquid-nitrogen (`LN2`) cooling.

---

## 🌍 Simulated European Target Matrix

| Node ID | City | Sector | Sandbox Facility Name | Simulated OT Protocol | Nominal Temp | Primary Supply-Chain Asset at Risk |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `PAR-GRC-01` | 🇫🇷 **Paris** | Grocery | *Marché Frais Bastille [Dummy]* | `Modbus/TCP :502` | `-18.5°C` | 18.4T Frozen Meat, Dairy & Infant Milk |
| `MIL-GRC-02` | 🇮🇹 **Milan** | Grocery | *Mercato Alimentare Brera [Dummy]* | `BACnet/IP :47808` | `-19.0°C` | 15.8T Lombardy Dairy, Fish & Cold Pasta |
| `BER-GRC-03` | 🇩🇪 **Berlin** | Grocery | *FrischeMarkt Mitte [Dummy]* | `Modbus/TCP :502` | `-18.0°C` | 21.2T Bulk Proteins & Metro Grocery Buffer |
| `LON-GRC-04` | 🇬🇧 **London** | Grocery | *Thames Fresh Grocers [Dummy]* | `MQTT-OT :1883` | `-18.2°C` | 19.6T Seafood, Poultry & Chilled Meals |
| `PAR-HSP-01` | 🇫🇷 **Paris** | Hospital | *Centre Médical Saint-Lazare [Sandbox]* | `BACnet/SC-Sim` | `-36.0°C` | 640u O-Neg Blood, 310 Plasma & Insulin |
| `MIL-HSP-02` | 🇮🇹 **Milan** | Hospital | *Ospedale San Lorenzo [Sandbox]* | `Modbus/TCP :502` | `-38.0°C` | 520u Rare Donor Blood, Stem Cells & Perfusate |
| `BER-HSP-03` | 🇩🇪 **Berlin** | Hospital | *Klinikum Spree-Nord [Sandbox]* | `OPC-UA :4840` | `-40.0°C` | 790u Trauma Blood, Antivenom & mRNA Stock |
| `LON-HSP-04` | 🇬🇧 **London** | Hospital | *St. Jude's Bio-Cryo Wing [Sandbox]* | `BACnet/IP :47808` | `-37.5°C` | 710u O-Neg / Rh-Null Blood & Tissue Media |

---

## 🚀 How to Make the Project Work (Step-by-Step)

Follow these exact steps to run **Mission La Surprise** locally on **Windows, macOS, or Linux**:

### 1. Prerequisites
Ensure you have **Node.js (v18.0 or newer)** and **npm (v9.0 or newer)** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/vaibhav-thakur/mission-la-surprise.git
cd mission-la-surprise
```
*(If you downloaded the project as a `.zip` archive, extract it and open your terminal inside the project folder.)*

### 3. Install Dependencies
Install React, Vite, Tailwind CSS, and Lucide telemetry icons:
```bash
npm install
```

### 4. Start the Live Development Server
Launch the interactive tactical command console with hot-reload:
```bash
npm run dev
```
Open your browser and navigate to the URL printed in your terminal (typically **`http://localhost:5173`**).

### 5. Build for Production (Optional)
Generate an optimized production bundle inside the `dist/` directory:
```bash
npm run build
npm run preview
```

---

## 🎮 How to Operate the Simulator Once Running

1. **Acknowledge the Ethical Sandbox Briefing:** Review the ethical notice and prayer on initial launch and enter the Command Console.
2. **Launch Coordinated Multi-City Thermal Attack:** Click **`EXECUTE "LA SURPRISE" OVERRIDE`** in the top command bar to inject `+34°C` / `+32°C` heating setpoints across Paris, Milan, Berlin, and London simultaneously—or target individual cities/sectors from the **Tactical Europe Map** and **Freezer Telemetry Cards**.
3. **Fine-Tune Individual Freezer Setpoints:** Use the thermal override slider (`-40°C` to `+38°C`), toggle **Force Defrost Heater**, or toggle **Suppress SCADA Alarm** on any grocery or hospital node and watch chamber temperatures climb and bio/food integrity degrade in real time.
4. **Inspect the Synthetic Leaked Data Vault:** Switch to the **`Exfiltrated Vault [Dummy]`** tab to filter dummy shopkeeper BMS credentials and synthetic customer POS payment cards across Paris, Milan, Berlin, and London, toggle **De-Mask Synthetic PANs**, or export a sample JSON forensic report.
5. **Deploy Blue-Team Cryo-Containment:** Click **`ENGAGE BLUE-TEAM CRYO-RESTORE`** at any moment to isolate compromised PLCs, restore sub-zero cooling, and observe defensive remediation steps.

---

## 📂 Repository Documentation Suite

We crafted a complete set of repository governance and technical docs so this GitHub project looks clean, professional, and educational:

```text
mission-la-surprise/
├── README.md                                  # Main visual showcase, scenario matrix & setup guide
├── DISCLAIMER.md                              # Formal non-affiliation notice, synthetic guarantee & prayer
├── SECURITY.md                                # Defensive OT/ICS Cold-Chain & Hospital Cryo hardening guide
├── ARCHITECTURE.md                            # Thermal drift engine & frontend architecture documentation
├── CONTRIBUTING.md                            # Guidelines for adding blue-team modules & cities
├── LICENSE                                    # MIT License with Ethical Educational Use notice
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md               # Structured PR checklist for contributors
│   └── ISSUE_TEMPLATE/
│       └── simulation_module.md               # Issue template for proposing defensive OT scenarios
└── src/
    ├── App.tsx                                # Main Mission La Surprise Tactical Command Console
    ├── data/
    │   ├── simulationData.ts                  # 8 City Nodes + Dummy Shopkeeper & PCI-Test Card Vault
    │   └── githubFilesData.ts                 # In-app GitHub documentation viewer & setup snippets
    └── components/                            # Map, Freezer Cards, Terminal, Vault, Ethics Modal & Repo Kit
```

---

## 👤 Author & Attribution

<div align="center">

**Designed & Developed by Vaibhav Thakur**  
*Cybersecurity Research • Critical Infrastructure Resilience • Interactive Threat Modeling*

> *"Built to visualize why securing invisible refrigeration and medical cold-chain systems matters for every community — may everyone stay safe, protected, and resilient."*

</div>
