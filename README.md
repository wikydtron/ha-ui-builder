<div align="center">

<img src="public/logo.svg" alt="HA Dashboard Builder" width="600"/>

<br/>
<br/>

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Ready-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%E2%98%95-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://paypal.me/theboss3dfactory/)

**A modern, visual drag-and-drop editor for Home Assistant Lovelace dashboards.**  
Build, preview, import, and export real HA dashboards — no YAML knowledge required.

[🚀 Quick Start](#-quick-start) · [✨ Features](#-features) · [📖 Documentation](#-documentation) · [☕ Support](#-support)

</div>

---

## ✨ Features

### 🎨 Visual Dashboard Builder
- **Drag and drop** cards from the sidebar onto the canvas
- **12-column grid system** — set card width from 1 to 12 columns with presets (Full / Half / Third / Quarter)
- **Live resize** — drag the right edge of any selected card to resize it visually
- **Multiple views** — add, rename, reorder, and configure view type per dashboard

### 🏠 Home Assistant Integration
- **Connect to your live HA instance** — enter your HA URL and a long-lived access token
- **Real entity picker** — browse your actual entities, grouped by domain
- **HACS card discovery** — auto-detect your installed custom cards from Lovelace resources
- Credentials stored **locally in your browser only** — never sent anywhere else

### 📄 YAML Import & Export
- **Import existing dashboards** — paste your current Lovelace YAML and reconstruct it visually
- **Export valid YAML** — copy or download dashboard YAML ready to paste into HA
- **Lossless import** — unknown card types preserved as raw blocks, nothing is ever discarded
- **View type support** — Masonry, Sections, and Panel

### 🃏 Card Support
- All standard Home Assistant built-in cards
- 10+ popular HACS cards pre-configured: Mushroom, mini-graph-card, ApexCharts, button-card, auto-entities, stack-in-card, swipe-card, and more
- Custom card registry — register any card with your own config schema
- Raw fallback editor for any unsupported card type

### 📐 Templates
8 professional ready-made templates to get started fast:

| Template | Views | Description |
|---|---|---|
| 🏠 Modern Smart Home | 5 | Overview, Lights, Climate, Security, Media |
| ⚡ Energy Dashboard | 4 | Live KPIs, Solar, Appliances, History graphs |
| 🎵 Media Jukebox | 3 | Now Playing, Speakers, TV controls |
| 📱 Mobile First | 2 | Touch-optimized, full-width cards |
| 🖥️ Desktop Power User | 5 | Dense mixed layout, all card types |
| 🍄 Mushroom Modern | 3 | Mushroom HACS cards throughout |
| 🔒 Security Panel | 3 | Alarm, Cameras, Access control |
| 📟 Minimal Tablet | 2 | Clean wall panel layout |

### ✅ Validation
- Real-time YAML validation with plain English error messages
- Flags missing entities, invalid card types, and export risks
- Clear distinction between fully supported, preview-only, and unsupported cards

---

## 🚀 Quick Start

### Option 1 — Docker (Recommended)

No Node.js required. Just Docker.

```bash
# Clone the repo
git clone https://github.com/wikydtron/ha-ui-builder.git
cd ha-ui-builder

# Build and start
docker compose up -d --build

# Open your browser
open http://localhost:3080
```

To update later:

```bash
git pull
docker compose up -d --build
```

### Option 2 — Local Development

Requires Node.js 20+.

```bash
git clone https://github.com/wikydtron/ha-ui-builder.git
cd ha-ui-builder

npm install
npm run dev
# App runs at http://localhost:5173
```

---

## 📖 Documentation

### Connecting to Home Assistant

1. Click **Connect HA** in the toolbar
2. Enter your HA URL — e.g. `http://homeassistant.local:8123` or `https://your-ha.duckdns.org`
3. Generate a token in HA: **Profile → Security → Long-Lived Access Tokens → Create Token**
4. Paste the token and click **Connect**

Once connected:
- The **Entities** tab shows your real entities, grouped by domain
- The **HACS** tab shows your installed custom cards with an ✅ Installed badge

> 🔒 Your URL and token are stored in your browser's `localStorage` only. They are never transmitted anywhere except your own HA instance.

---

### Building a Dashboard

**Add a card**
- Drag a card type from the **Cards** tab in the sidebar onto the canvas
- Or click a card type to add it at the end of the current view

**Resize a card**
- Click a card to select it — a resize handle appears on the right edge
- Drag the handle to resize (snaps to column grid)
- Or use the **Width** control in the right panel: Full (12) / Half (6) / Third (4) / Quarter (3)

**Configure a card**
- Click a card to select it
- Use the **Config** tab in the right panel to set the entity, title, icon, and options
- Switch to the **YAML** tab to edit the card's raw config directly

**Manage views**
- Click **+** in the view tab bar to add a new view
- Click the ✏️ pencil icon on a tab to rename it, change the icon, or switch the view type

**View types**
| Type | Description |
|---|---|
| Masonry | Default — cards flow like a Pinterest grid |
| Sections | HA's newer structured sections layout |
| Panel | Single full-width card, no scrolling |

---

### Importing Existing YAML

1. Click **Import YAML** in the toolbar
2. Paste your existing Lovelace dashboard YAML
3. Click **Import**

The builder reconstructs your dashboard visually. Unknown or unsupported card types become raw blocks that are still editable and export correctly — nothing is ever dropped.

**Tip:** You can get your current dashboard YAML from HA via:  
Settings → Dashboards → your dashboard → Edit → Raw Config Editor

---

### Exporting to Home Assistant

**Export YAML file**
Click **Export YAML** in the toolbar to download a `.yaml` file.

**Copy to clipboard**
Click **Copy YAML** to copy directly — then paste into HA.

**Applying in Home Assistant**

Option A — Raw Config Editor:
1. Settings → Dashboards
2. Click the three-dot menu on your dashboard → Edit
3. Click the **Raw Config Editor** button (top right)
4. Replace the content with your exported YAML
5. Save

Option B — YAML mode file:
1. Add `lovelace: mode: yaml` to your `configuration.yaml`
2. Save the exported file as `ui-lovelace.yaml` in your `/config/` folder
3. Restart Home Assistant

---

### Adding Custom Cards

1. Go to the **HACS** tab in the sidebar
2. Click the **+** (Add Custom Card) button
3. Enter the card type (e.g. `custom:my-card`) and a display name
4. The card now appears in the card picker and exports with the correct `type:` field

To use cards installed via HACS — connect to your HA instance and the builder will auto-detect them.

---

## 🐳 Docker Reference

```yaml
# docker-compose.yml
services:
  ha-ui-builder:
    image: ha-ui-builder:latest
    build: .
    container_name: ha-ui-builder
    restart: unless-stopped
    ports:
      - "3080:80"
```

Change `3080` on the left to any available port on your host.

The app is a **pure static SPA** — no backend, no database, no server-side state. Everything lives in your browser's localStorage.

---

## 🛠️ Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

**Project structure:**

```
src/
├── components/
│   ├── canvas/        # Drag-and-drop canvas + card resize
│   ├── cards/         # Card preview renderers
│   ├── layout/        # AppShell, Toolbar, ViewTabs
│   ├── panels/        # Config panel, YAML panel, Import modal, Templates
│   └── sidebar/       # Card picker, Entity browser, Module library, HACS tab
├── data/
│   ├── fakeEntities.ts        # 1200+ mock entities (offline fallback)
│   ├── mockHAEnvironment.ts   # Mock HA state provider for previews
│   ├── haConnection.ts        # Live HA connection service
│   ├── customCardRegistry.ts  # HACS card definitions + user registry
│   └── templates/             # 8 ready-made dashboard templates (JSON)
├── store/
│   ├── dashboardStore.ts      # Main dashboard state (Zustand)
│   ├── uiStore.ts             # UI state (tabs, panels, search)
│   ├── moduleStore.ts         # Reusable card modules
│   └── haStore.ts             # Live HA connection state
├── yaml/
│   ├── generator.ts           # Dashboard → Lovelace YAML
│   ├── parser.ts              # Lovelace YAML → Dashboard model
│   └── validator.ts           # YAML validation + plain English errors
└── types/
    └── index.ts               # TypeScript type definitions
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: add something useful"`
4. Push: `git push origin feat/my-feature`
5. Open a pull request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

## ☕ Support

If this project saves you time and frustration, a coffee is always appreciated!

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%E2%98%95-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://paypal.me/theboss3dfactory/)

Made with ❤️ for the Home Assistant community.

</div>
