export type CityName = 'Paris' | 'Milan' | 'Berlin' | 'London';
export type SectorType = 'grocery' | 'hospital';
export type NodeStatus = 'NOMINAL' | 'COMPROMISED_HEATING' | 'CRITICAL_SPOILAGE' | 'BLUE_TEAM_ISOLATED';

export interface FreezerNode {
  id: string;
  city: CityName;
  countryCode: string;
  sector: SectorType;
  facilityName: string;
  zoneLabel: string;
  protocol: string;
  plcModel: string;
  sandboxIp: string;
  nominalTemp: number;
  currentTemp: number;
  targetSetpoint: number;
  spoilageThreshold: number;
  integrityPercent: number; // 100% = pristine, 0% = total spoilage
  compressorActive: boolean;
  defrostHeaterForced: boolean;
  alarmSuppressed: boolean;
  status: NodeStatus;
  tempHistory: number[];
  criticalAssets: string[];
  supplyImpactMetric: string;
  estimatedUnitsAtRisk: string;
  cveSimulated: string;
}

export interface DummyShopkeeperLeak {
  id: string;
  city: CityName;
  storeName: string;
  fullName: string;
  role: string;
  syntheticEmail: string;
  syntheticPhone: string;
  bmsPinCode: string;
  posTerminalId: string;
  passwordHashSim: string;
  privilegeLevel: 'OT-ADMIN' | 'STORE-OWNER' | 'COLD-CHAIN-TECH' | 'SHIFT-LEAD';
  exfilTimestamp: string;
}

export interface DummyCustomerCardLeak {
  id: string;
  city: CityName;
  merchantNode: string;
  cardholderDummyName: string;
  brand: 'VISA-TEST' | 'MASTERCARD-TEST' | 'EURO-DEBIT-SIM';
  maskedPan: string;
  fullTestPan: string;
  expirySim: string;
  cvvSim: string;
  basketAmount: string;
  loyaltyTier: string;
  captureVector: string;
  timestamp: string;
}

export interface CityMapMeta {
  city: CityName;
  country: string;
  coords: { x: number; y: number }; // SVG viewBox 0 0 680 460
  latLon: string;
  populationServedSim: string;
}

export const CITY_MAP_META: Record<CityName, CityMapMeta> = {
  London: {
    city: 'London',
    country: 'United Kingdom',
    coords: { x: 215, y: 182 },
    latLon: '51.5074° N, 0.1278° W',
    populationServedSim: '9.6M Metro Cold-Chain Grid',
  },
  Paris: {
    city: 'Paris',
    country: 'France',
    coords: { x: 256, y: 252 },
    latLon: '48.8566° N, 2.3522° E',
    populationServedSim: '11.2M Île-de-France Supply',
  },
  Berlin: {
    city: 'Berlin',
    country: 'Germany',
    coords: { x: 438, y: 170 },
    latLon: '52.5200° N, 13.4050° E',
    populationServedSim: '6.1M Capital Bio & Food Grid',
  },
  Milan: {
    city: 'Milan',
    country: 'Italy',
    coords: { x: 372, y: 342 },
    latLon: '45.4642° N, 9.1900° E',
    populationServedSim: '8.4M Lombardy Logistics Hub',
  },
};

export const INITIAL_FREEZER_NODES: FreezerNode[] = [
  // ================= GROCERY FREEZERS =================
  {
    id: 'PAR-GRC-01',
    city: 'Paris',
    countryCode: 'FR',
    sector: 'grocery',
    facilityName: 'Marché Frais Bastille [Dummy]',
    zoneLabel: 'Cold-Storage Vaults A1–A6 & Dairy Cold-Chain',
    protocol: 'Modbus/TCP :502',
    plcModel: 'FrostLogic SC-400 PLC',
    sandboxIp: '10.44.12.18',
    nominalTemp: -18.5,
    currentTemp: -18.5,
    targetSetpoint: -18.5,
    spoilageThreshold: -4.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-18.6, -18.5, -18.4, -18.5, -18.5, -18.6, -18.5, -18.5],
    criticalAssets: [
      '18.4 Tons Frozen Meat, Poultry & Seafood',
      '9,200 Liters Pasteurized Dairy & Infant Milk',
      'Artisan Cold-Fermented Bakery & Produce Stock',
    ],
    supplyImpactMetric: 'Disrupts 14% of East-Paris Sample Retail Food Stock',
    estimatedUnitsAtRisk: '18.4 Metric Tons',
    cveSimulated: 'SIM-OT-2025-019 (Unauthenticated Coil Write)',
  },
  {
    id: 'MIL-GRC-02',
    city: 'Milan',
    countryCode: 'IT',
    sector: 'grocery',
    facilityName: 'Mercato Alimentare Brera [Dummy]',
    zoneLabel: 'Deep-Freeze Logistics Bay & Fresh Cheese Vault',
    protocol: 'BACnet/IP :47808',
    plcModel: 'EuroCold BMS-9000',
    sandboxIp: '10.48.21.09',
    nominalTemp: -19.0,
    currentTemp: -19.0,
    targetSetpoint: -19.0,
    spoilageThreshold: -4.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-19.1, -19.0, -19.0, -18.9, -19.0, -19.1, -19.0, -19.0],
    criticalAssets: [
      '15.8 Tons Chilled Lombardy Dairy & Charcuterie',
      'Mediterranean Frozen Fish & Fresh Pasta Reserves',
      'Regional Supermarket Replenishment Pallets',
    ],
    supplyImpactMetric: 'Halts Brera-Navigli Cold Distribution Corridor',
    estimatedUnitsAtRisk: '15.8 Metric Tons',
    cveSimulated: 'SIM-OT-2025-044 (BACnet WriteProperty Override)',
  },
  {
    id: 'BER-GRC-03',
    city: 'Berlin',
    countryCode: 'DE',
    sector: 'grocery',
    facilityName: 'FrischeMarkt Mitte [Dummy]',
    zoneLabel: 'Central Sub-Zero Bulk Grocery Warehouse',
    protocol: 'Modbus/TCP :502',
    plcModel: 'KälteSteuer S7-Sandbox',
    sandboxIp: '10.52.08.41',
    nominalTemp: -18.0,
    currentTemp: -18.0,
    targetSetpoint: -18.0,
    spoilageThreshold: -4.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-18.0, -18.1, -18.0, -17.9, -18.0, -18.0, -18.1, -18.0],
    criticalAssets: [
      '21.2 Tons Frozen Proteins & Organic Produce',
      'Pediatric Nutrition & Chilled Dairy Pallets',
      '24-Hour Metro Supermarket Cold-Chain Buffer',
    ],
    supplyImpactMetric: 'Triggers Emergency Rationing Across 11 Sample Stores',
    estimatedUnitsAtRisk: '21.2 Metric Tons',
    cveSimulated: 'SIM-OT-2025-072 (Default HVAC Gateway Creds)',
  },
  {
    id: 'LON-GRC-04',
    city: 'London',
    countryCode: 'UK',
    sector: 'grocery',
    facilityName: 'Thames Fresh Grocers [Dummy]',
    zoneLabel: 'Docklands Retail Freezer Array B1–B8',
    protocol: 'MQTT-OT :1883',
    plcModel: 'AlbionChill RTU-2X',
    sandboxIp: '10.60.14.77',
    nominalTemp: -18.2,
    currentTemp: -18.2,
    targetSetpoint: -18.2,
    spoilageThreshold: -4.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-18.2, -18.3, -18.2, -18.1, -18.2, -18.2, -18.3, -18.2],
    criticalAssets: [
      '19.6 Tons Atlantic Seafood, Poultry & Beef',
      'Chilled Ready-Meals & Fresh Milk Containers',
      'Southbank & Canary Retail Cold-Chain Stock',
    ],
    supplyImpactMetric: 'Spoils 48-Hour Fresh Perishable Buffer in Docklands',
    estimatedUnitsAtRisk: '19.6 Metric Tons',
    cveSimulated: 'SIM-OT-2025-088 (Unencrypted MQTT Setpoint Topic)',
  },

  // ================= HOSPITAL CRYO & BLOOD BANK FREEZERS =================
  {
    id: 'PAR-HSP-01',
    city: 'Paris',
    countryCode: 'FR',
    sector: 'hospital',
    facilityName: 'Centre Médical Saint-Lazare [Sandbox]',
    zoneLabel: 'Hematology Cryo-Bank & Biologics Vault',
    protocol: 'BACnet/SC-Downgrade',
    plcModel: 'CryoMed Ultra-80X',
    sandboxIp: '172.20.4.11',
    nominalTemp: -36.0,
    currentTemp: -36.0,
    targetSetpoint: -36.0,
    spoilageThreshold: -10.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-36.0, -36.1, -36.0, -35.9, -36.0, -36.1, -36.0, -36.0],
    criticalAssets: [
      '640 Units O-Negative Universal Donor Whole Blood',
      '310 Bags Fresh Frozen Plasma & Cryoprecipitate',
      'Oncology Monoclonal Antibodies & Pediatric Insulin',
    ],
    supplyImpactMetric: 'Forces Surgical Trauma Diversion & Blood Alert',
    estimatedUnitsAtRisk: '950+ Bio-Units',
    cveSimulated: 'SIM-MED-2025-103 (BMS Thermal Relay Injection)',
  },
  {
    id: 'MIL-HSP-02',
    city: 'Milan',
    countryCode: 'IT',
    sector: 'hospital',
    facilityName: 'Ospedale San Lorenzo [Sandbox]',
    zoneLabel: 'Transfusion Blood Cryo-Wing & Transplant Media',
    protocol: 'Modbus/TCP :502',
    plcModel: 'BioVault CryoPLC-4',
    sandboxIp: '172.22.9.34',
    nominalTemp: -38.0,
    currentTemp: -38.0,
    targetSetpoint: -38.0,
    spoilageThreshold: -10.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-38.0, -38.1, -38.0, -38.0, -37.9, -38.0, -38.1, -38.0],
    criticalAssets: [
      '520 Units Donated Blood (O-Neg / Rh-Rare Reserves)',
      'Hematopoietic Stem Cell Grafts & Clotting Factors',
      'Organ Transplant Cold-Perfusate Solutions',
    ],
    supplyImpactMetric: 'Compromises Regional Emergency Hematology Reserve',
    estimatedUnitsAtRisk: '840+ Bio-Units',
    cveSimulated: 'SIM-MED-2025-118 (Cryo Alarm Masking Register)',
  },
  {
    id: 'BER-HSP-03',
    city: 'Berlin',
    countryCode: 'DE',
    sector: 'hospital',
    facilityName: 'Klinikum Spree-Nord [Sandbox]',
    zoneLabel: 'Ultra-Low Trauma Blood & mRNA Cryo-Array',
    protocol: 'OPC-UA Sim :4840',
    plcModel: 'KryoWächter Med-900',
    sandboxIp: '172.24.3.19',
    nominalTemp: -40.0,
    currentTemp: -40.0,
    targetSetpoint: -40.0,
    spoilageThreshold: -12.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-40.0, -40.1, -40.0, -39.9, -40.0, -40.0, -40.1, -40.0],
    criticalAssets: [
      '790 Units Trauma & ICU Donated Blood Packs',
      'Platelet Concentrates & Emergency Neuro-Antivenom',
      'Thermolabile mRNA Vaccines & Neonatal Biologics',
    ],
    supplyImpactMetric: 'Degrades Critical ICU Transfusion & Vaccine Stock',
    estimatedUnitsAtRisk: '1,120+ Bio-Units',
    cveSimulated: 'SIM-MED-2025-141 (Anonymous OPC-UA Node Write)',
  },
  {
    id: 'LON-HSP-04',
    city: 'London',
    countryCode: 'UK',
    sector: 'hospital',
    facilityName: "St. Jude's Bio-Cryo Wing [Sandbox]",
    zoneLabel: 'National Rare-Blood & Tissue Cryogenic Vault',
    protocol: 'BACnet/IP :47808',
    plcModel: 'ThamesBio CryoGuard',
    sandboxIp: '172.28.7.62',
    nominalTemp: -37.5,
    currentTemp: -37.5,
    targetSetpoint: -37.5,
    spoilageThreshold: -10.0,
    integrityPercent: 100,
    compressorActive: true,
    defrostHeaterForced: false,
    alarmSuppressed: false,
    status: 'NOMINAL',
    tempHistory: [-37.5, -37.6, -37.5, -37.4, -37.5, -37.5, -37.6, -37.5],
    criticalAssets: [
      '710 Units O-Negative & Rare Rh-Null Donor Blood',
      'Neonatal Immunoglobulins & Fresh Frozen Plasma',
      'Corneal & Vascular Tissue Cryo-Preservation Media',
    ],
    supplyImpactMetric: 'Triggers Urgent Cross-Borough Blood Bank Alert',
    estimatedUnitsAtRisk: '1,040+ Bio-Units',
    cveSimulated: 'SIM-MED-2025-159 (Legacy BMS Bridge Pivot)',
  },
];

// Strictly fictionalized / RFC-2606 (.example / .invalid) dummy shopkeeper & operator data
export const DUMMY_SHOPKEEPER_LEAKS: DummyShopkeeperLeak[] = [
  {
    id: 'SHP-PAR-101',
    city: 'Paris',
    storeName: 'Marché Frais Bastille [Dummy]',
    fullName: 'Luc Moreau [Fictional]',
    role: 'Proprietor & Master Cold-Chain Manager',
    syntheticEmail: 'l.moreau@marche-bastille.sandbox.invalid',
    syntheticPhone: '+33-1-0000-0142',
    bmsPinCode: '8841-OVERRIDE (SIM)',
    posTerminalId: 'POS-PAR-BST-01',
    passwordHashSim: '$2b$12$SIMULATED.HASH.991xBastilleDummyKey00',
    privilegeLevel: 'STORE-OWNER',
    exfilTimestamp: '2025-05-14 02:14:09 UTC',
  },
  {
    id: 'SHP-PAR-102',
    city: 'Paris',
    storeName: 'Marché Frais Bastille [Dummy]',
    fullName: 'Camille Laurent [Fictional]',
    role: 'Night Refrigeration & Inventory Lead',
    syntheticEmail: 'c.laurent@marche-bastille.sandbox.invalid',
    syntheticPhone: '+33-1-0000-0189',
    bmsPinCode: '4310-HVAC (SIM)',
    posTerminalId: 'POS-PAR-BST-04',
    passwordHashSim: '$2b$12$SIMULATED.HASH.774aCryoRelayTest91',
    privilegeLevel: 'COLD-CHAIN-TECH',
    exfilTimestamp: '2025-05-14 02:14:22 UTC',
  },
  {
    id: 'SHP-MIL-201',
    city: 'Milan',
    storeName: 'Mercato Alimentare Brera [Dummy]',
    fullName: 'Matteo Conti [Fictional]',
    role: 'Storekeeper & Regional Cold-Vault Director',
    syntheticEmail: 'm.conti@mercato-brera.sandbox.invalid',
    syntheticPhone: '+39-02-0000-0211',
    bmsPinCode: '7729-BRERA (SIM)',
    posTerminalId: 'POS-MIL-BRE-01',
    passwordHashSim: '$2b$12$SIMULATED.HASH.552mLombardyDummy88',
    privilegeLevel: 'STORE-OWNER',
    exfilTimestamp: '2025-05-14 02:16:04 UTC',
  },
  {
    id: 'SHP-MIL-202',
    city: 'Milan',
    storeName: 'Mercato Alimentare Brera [Dummy]',
    fullName: 'Giulia Ferri [Fictional]',
    role: 'BMS Telemetry & POS Reconciliation Admin',
    syntheticEmail: 'g.ferri@mercato-brera.sandbox.invalid',
    syntheticPhone: '+39-02-0000-0276',
    bmsPinCode: '1904-BACNET (SIM)',
    posTerminalId: 'POS-MIL-BRE-03',
    passwordHashSim: '$2b$12$SIMULATED.HASH.310kBreraTestVault12',
    privilegeLevel: 'OT-ADMIN',
    exfilTimestamp: '2025-05-14 02:16:19 UTC',
  },
  {
    id: 'SHP-BER-301',
    city: 'Berlin',
    storeName: 'FrischeMarkt Mitte [Dummy]',
    fullName: 'Lukas Weber [Fictional]',
    role: 'Head Shopkeeper & Franchise Operations',
    syntheticEmail: 'l.weber@frischemarkt-mitte.sandbox.invalid',
    syntheticPhone: '+49-30-0000-0334',
    bmsPinCode: '6055-KAELTE (SIM)',
    posTerminalId: 'POS-BER-MIT-01',
    passwordHashSim: '$2b$12$SIMULATED.HASH.804dMitteSandboxKey7',
    privilegeLevel: 'STORE-OWNER',
    exfilTimestamp: '2025-05-14 02:18:45 UTC',
  },
  {
    id: 'SHP-BER-302',
    city: 'Berlin',
    storeName: 'FrischeMarkt Mitte [Dummy]',
    fullName: 'Hannah Richter [Fictional]',
    role: 'PLC Refrigeration Maintenance Supervisor',
    syntheticEmail: 'h.richter@frischemarkt-mitte.sandbox.invalid',
    syntheticPhone: '+49-30-0000-0391',
    bmsPinCode: '9920-MODBUS (SIM)',
    posTerminalId: 'POS-BER-MIT-06',
    passwordHashSim: '$2b$12$SIMULATED.HASH.661pSpreeColdSim440',
    privilegeLevel: 'OT-ADMIN',
    exfilTimestamp: '2025-05-14 02:19:02 UTC',
  },
  {
    id: 'SHP-LON-401',
    city: 'London',
    storeName: 'Thames Fresh Grocers [Dummy]',
    fullName: 'Arthur Pendelton [Fictional]',
    role: 'Managing Shopkeeper & Cold-Chain Buyer',
    syntheticEmail: 'a.pendelton@thames-fresh.sandbox.invalid',
    syntheticPhone: '+44-20-0000-0418',
    bmsPinCode: '5182-THAMES (SIM)',
    posTerminalId: 'POS-LON-THM-01',
    passwordHashSim: '$2b$12$SIMULATED.HASH.429uDocklandsSimKey3',
    privilegeLevel: 'STORE-OWNER',
    exfilTimestamp: '2025-05-14 02:21:11 UTC',
  },
  {
    id: 'SHP-LON-402',
    city: 'London',
    storeName: 'Thames Fresh Grocers [Dummy]',
    fullName: 'Priya Nair [Fictional]',
    role: 'MQTT Freezer Sensor & POS Gateway Lead',
    syntheticEmail: 'p.nair@thames-fresh.sandbox.invalid',
    syntheticPhone: '+44-20-0000-0465',
    bmsPinCode: '3077-RTU2X (SIM)',
    posTerminalId: 'POS-LON-THM-05',
    passwordHashSim: '$2b$12$SIMULATED.HASH.118zAlbionSandbox992',
    privilegeLevel: 'COLD-CHAIN-TECH',
    exfilTimestamp: '2025-05-14 02:21:38 UTC',
  },
];

// Strictly PCI-compliant non-routable TEST card prefixes (4000 00.., 5555 55..) with 000 CVV-sim
export const DUMMY_CUSTOMER_CARD_LEAKS: DummyCustomerCardLeak[] = [
  {
    id: 'CRD-SIM-9001',
    city: 'Paris',
    merchantNode: 'Marché Frais Bastille [POS-01]',
    cardholderDummyName: 'TESTHOLDER / E. DUBOIS [DUMMY]',
    brand: 'VISA-TEST',
    maskedPan: '4000 00•• •••• 0149',
    fullTestPan: '4000 0000 0000 0149 (SYNTHETIC-TEST)',
    expirySim: '08/29',
    cvvSim: '000',
    basketAmount: '€142.80',
    loyaltyTier: 'BASTILLE-GOLD-SIM',
    captureVector: 'POS-VLAN-PIVOT // RAM-SCRAPE-SIM',
    timestamp: '02:14:51 UTC',
  },
  {
    id: 'CRD-SIM-9002',
    city: 'Paris',
    merchantNode: 'Marché Frais Bastille [POS-04]',
    cardholderDummyName: 'TESTHOLDER / N. BERNARD [DUMMY]',
    brand: 'MASTERCARD-TEST',
    maskedPan: '5555 55•• •••• 4402',
    fullTestPan: '5555 5500 0000 4402 (SYNTHETIC-TEST)',
    expirySim: '11/28',
    cvvSim: '000',
    basketAmount: '€89.40',
    loyaltyTier: 'FRESH-MEMBER-SIM',
    captureVector: 'POS-VLAN-PIVOT // RAM-SCRAPE-SIM',
    timestamp: '02:15:09 UTC',
  },
  {
    id: 'CRD-SIM-9003',
    city: 'Milan',
    merchantNode: 'Mercato Alimentare Brera [POS-01]',
    cardholderDummyName: 'TESTHOLDER / A. ROSSI [DUMMY]',
    brand: 'EURO-DEBIT-SIM',
    maskedPan: '4000 00•• •••• 8821',
    fullTestPan: '4000 0000 0000 8821 (SYNTHETIC-TEST)',
    expirySim: '04/30',
    cvvSim: '000',
    basketAmount: '€216.50',
    loyaltyTier: 'BRERA-VIP-SIM',
    captureVector: 'BMS-TO-POS-BRIDGE // SIM-CAPTURE',
    timestamp: '02:16:48 UTC',
  },
  {
    id: 'CRD-SIM-9004',
    city: 'Milan',
    merchantNode: 'Mercato Alimentare Brera [POS-03]',
    cardholderDummyName: 'TESTHOLDER / S. BIANCHI [DUMMY]',
    brand: 'MASTERCARD-TEST',
    maskedPan: '5555 55•• •••• 7190',
    fullTestPan: '5555 5500 0000 7190 (SYNTHETIC-TEST)',
    expirySim: '09/29',
    cvvSim: '000',
    basketAmount: '€64.20',
    loyaltyTier: 'STANDARD-SIM',
    captureVector: 'BMS-TO-POS-BRIDGE // SIM-CAPTURE',
    timestamp: '02:17:12 UTC',
  },
  {
    id: 'CRD-SIM-9005',
    city: 'Berlin',
    merchantNode: 'FrischeMarkt Mitte [POS-01]',
    cardholderDummyName: 'TESTHOLDER / M. SCHMIDT [DUMMY]',
    brand: 'VISA-TEST',
    maskedPan: '4000 00•• •••• 3317',
    fullTestPan: '4000 0000 0000 3317 (SYNTHETIC-TEST)',
    expirySim: '01/30',
    cvvSim: '000',
    basketAmount: '€178.95',
    loyaltyTier: 'MITTE-PLUS-SIM',
    captureVector: 'FLAT-SUBNET-SNIFF // SIM-PCAP',
    timestamp: '02:19:30 UTC',
  },
  {
    id: 'CRD-SIM-9006',
    city: 'Berlin',
    merchantNode: 'FrischeMarkt Mitte [POS-06]',
    cardholderDummyName: 'TESTHOLDER / K. FISCHER [DUMMY]',
    brand: 'EURO-DEBIT-SIM',
    maskedPan: '5555 55•• •••• 9044',
    fullTestPan: '5555 5500 0000 9044 (SYNTHETIC-TEST)',
    expirySim: '06/28',
    cvvSim: '000',
    basketAmount: '€112.10',
    loyaltyTier: 'MITTE-PLUS-SIM',
    captureVector: 'FLAT-SUBNET-SNIFF // SIM-PCAP',
    timestamp: '02:19:54 UTC',
  },
  {
    id: 'CRD-SIM-9007',
    city: 'London',
    merchantNode: 'Thames Fresh Grocers [POS-01]',
    cardholderDummyName: 'TESTHOLDER / O. CLARKE [DUMMY]',
    brand: 'VISA-TEST',
    maskedPan: '4000 00•• •••• 6208',
    fullTestPan: '4000 0000 0000 6208 (SYNTHETIC-TEST)',
    expirySim: '12/29',
    cvvSim: '000',
    basketAmount: '£134.60',
    loyaltyTier: 'THAMES-CLUB-SIM',
    captureVector: 'MQTT-POS-BROKER // SIM-EXFIL',
    timestamp: '02:22:03 UTC',
  },
  {
    id: 'CRD-SIM-9008',
    city: 'London',
    merchantNode: 'Thames Fresh Grocers [POS-05]',
    cardholderDummyName: 'TESTHOLDER / C. EVANS [DUMMY]',
    brand: 'MASTERCARD-TEST',
    maskedPan: '5555 55•• •••• 2853',
    fullTestPan: '5555 5500 0000 2853 (SYNTHETIC-TEST)',
    expirySim: '03/30',
    cvvSim: '000',
    basketAmount: '£96.75',
    loyaltyTier: 'THAMES-CLUB-SIM',
    captureVector: 'MQTT-POS-BROKER // SIM-EXFIL',
    timestamp: '02:22:29 UTC',
  },
];
