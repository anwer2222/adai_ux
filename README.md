# ADAI — Interactive 3D Operational Map Demo (`adai_ux_demo`)

Interactive Next.js + Three.js UX demo for **ALPHA Medical Solutions**, demonstrating AI-Powered Departmental Memory across 6 live scenes: Knowledge Extraction (Text/Voice simulation), Manager Governance & Approval, Approved-Only Retrieval, Single-Expert Risk & Verified Transfer, Knowledge-Driven Foresight (67% reserved-stock pattern), and Employee Knowledge Recognition.

---

## 1. Running the Demo Locally

```bash
cd adai_ux_demo
npm install
npm run dev
```

Open **http://localhost:3005** in your browser.

To run a production build:

```bash
npm run build
npm run start
```

---

## 2. How to Export the 3D Model from Blender (`.blend` → `.glb`)

Whenever you edit **`../asset/alpha_medical_ops_map.blend`** in Blender, re-export it to **`public/models/alpha_medical_ops_map.glb`** using any of the three methods below:

### Option A — One-Command NPM Script (Fastest, Recommended)

From inside `adai_ux_demo/`:

```bash
npm run export-model
```

This runs Blender headlessly in the background and exports `../asset/alpha_medical_ops_map.blend` directly to `public/models/alpha_medical_ops_map.glb` (and refreshes `../asset/alpha_medical_ops_map.glb`).

### Option B — Direct Blender CLI Command (macOS)

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b ../asset/alpha_medical_ops_map.blend \
  --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='public/models/alpha_medical_ops_map.glb', export_format='GLB', use_visible=True, export_cameras=True, export_lights=False, export_apply=True)"
```

### Option C — Manual Export Inside Blender UI

1. Open `asset/alpha_medical_ops_map.blend` in Blender.
2. Go to **File → Export → glTF 2.0 (.glb/.gltf)**.
3. Set destination to: `adai_ux_demo/public/models/alpha_medical_ops_map.glb`.
4. Use these exact export settings in the right sidebar:
   - **Format:** `glTF Binary (.glb)`
   - **Include:**
     - `[x]` Visible Objects
     - `[x]` Cameras
     - `[ ]` Punctual Lights *(leave unchecked — Three.js provides calibrated studio lighting)*
   - **Transform:**
     - `[x]` `+Y Up` *(default for glTF / Three.js)*
   - **Data → Mesh:**
     - `[x]` Apply Modifiers
     - `[x]` Vertex Colors *(required so Polyfork low-poly models keep their colors!)*
5. Click **Export glTF 2.0** and refresh the browser tab.

---

## 3. Naming Conventions Used by the 3D Web Scene

`src/components/IsometricMap3D.tsx` automatically binds live animations and glow effects to these object names inside the `.blend` file:

- **`RiskRing_Ahmed_Amber`** — Pulses **Amber/Red** when `KN-001` is undocumented or held by 1 expert, and smoothly turns **Emerald Green** once Khaled is certified.
- **`VerifiedRing_Khaled_Cyan`** — Glows **Cyan** while ready for retrieval and **Emerald Green** once certified.
- **`Flow_Cyan_*`** — Floor workflow strips paired with animated GLSL flowing data pipelines and moving glowing data packet beads connecting **Order Intake → Operations Floor → Warehouse → AI Server Core → Approval Chamber**.
- **Selection Glow** — Clicking any 3D zone on the floor or any floating zone badge activates an additive glowing floor halo + subtle emissive glow on objects inside that zone, and accelerates the connected workflow pipelines.

---

## 4. Simulated AI Conversation Flow (No External API Keys Needed)

Both **Add Knowledge (`أضف معرفة`)** and **Help Me Do My Job (`ساعدني في أداء عملي`)** simulate realistic AI interviews and retrieval strictly following `txt/use-case.md`:

- Supports **Text input**, **1-Click scripted demo replies**, and **Simulated Voice/Audio Recording** (click the microphone button to record a simulated voice note with live waveform & auto-transcription).
- All state persists in `localStorage` so you can switch personas seamlessly during a pitch, with a **Reset Demo** button in the top-right header.
