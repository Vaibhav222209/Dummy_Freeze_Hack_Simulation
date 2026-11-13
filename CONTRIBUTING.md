# Contributing to Mission La Surprise

Thank you for your interest in contributing to **Mission La Surprise** by **Vaibhav Thakur**!

## Ethical Contribution Guidelines

1. **Strictly Synthetic Data Only:** Never submit real organization names, real IP ranges outside RFC 1918 / RFC 5737 documentation blocks, real personal identities, or real financial numbers. Always use `.sandbox.invalid` domains and non-routable PCI test card blocks (`4000 00..`, `5555 55..`).
2. **Defensive & Educational Focus:** Contributions that add **Blue-Team detection rules**, **IEC-62443 OT segmentation visualizations**, or **Backup Cryo-Cooling remediation steps** are especially welcome.

## Development Workflow

```bash
# 1. Fork & clone the repository
git clone https://github.com/<your-username>/mission-la-surprise.git
cd mission-la-surprise

# 2. Create a feature branch
git checkout -b feat/blue-team-anomaly-detector

# 3. Install dependencies & run locally
npm install
npm run dev

# 4. Verify TypeScript & Vite production build before submitting PR
npm run build
```
