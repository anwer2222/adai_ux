(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/IsometricMap3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IsometricMap3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$demoData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/demoData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const PIPELINE_DEFS = [
    {
        id: "intake_to_ops",
        zones: [
            "order_intake",
            "ops_ahmed",
            "ops_khaled"
        ],
        points: [
            [
                -5.0,
                0.06,
                3.5
            ],
            [
                -3.0,
                0.06,
                3.5
            ],
            [
                -3.0,
                0.06,
                -0.2
            ],
            [
                0.8,
                0.06,
                -0.2
            ]
        ],
        baseColor: 0x22d3ee
    },
    {
        id: "ops_to_warehouse",
        zones: [
            "warehouse",
            "ops_ahmed",
            "order_intake"
        ],
        points: [
            [
                -3.0,
                0.06,
                -0.2
            ],
            [
                -5.2,
                0.06,
                -0.2
            ],
            [
                -5.2,
                0.06,
                -2.2
            ]
        ],
        baseColor: 0xf59e0b
    },
    {
        id: "ops_to_server",
        zones: [
            "ops_ahmed",
            "server_core"
        ],
        points: [
            [
                0.8,
                0.06,
                -0.2
            ],
            [
                0.8,
                0.06,
                -4.8
            ],
            [
                3.2,
                0.06,
                -4.8
            ]
        ],
        baseColor: 0x06b6d4
    },
    {
        id: "ops_to_approval",
        zones: [
            "ops_ahmed",
            "ops_khaled",
            "approval_chamber"
        ],
        points: [
            [
                0.8,
                0.06,
                -0.2
            ],
            [
                0.8,
                0.06,
                1.6
            ],
            [
                6.5,
                0.06,
                1.6
            ]
        ],
        baseColor: 0x10b981
    }
];
const ZONE_BOUNDS = {
    warehouse: {
        cx: -5.5,
        cz: -3.2,
        radius: 3.0,
        minX: -8.9,
        maxX: -2.1,
        minZ: -6.9,
        maxZ: 0.9
    },
    ops_ahmed: {
        cx: 0.65,
        cz: -0.8,
        radius: 1.9,
        minX: -1.9,
        maxX: 4.3,
        minZ: -2.9,
        maxZ: 1.1
    },
    ops_khaled: {
        cx: 0.65,
        cz: 3.4,
        radius: 1.9,
        minX: -1.9,
        maxX: 4.3,
        minZ: 1.2,
        maxZ: 6.8
    },
    server_core: {
        cx: 5.2,
        cz: -5.0,
        radius: 2.7,
        minX: 1.6,
        maxX: 8.8,
        minZ: -6.9,
        maxZ: -3.1
    },
    approval_chamber: {
        cx: 6.75,
        cz: 1.6,
        radius: 2.5,
        minX: 4.6,
        maxX: 8.8,
        minZ: -2.8,
        maxZ: 6.8
    },
    order_intake: {
        cx: -5.5,
        cz: 4.0,
        radius: 2.7,
        minX: -8.9,
        maxX: -2.1,
        minZ: 1.1,
        maxZ: 6.8
    }
};
// Structural/architectural mesh prefixes that must NEVER glow on zone selection
const STRUCTURAL_PREFIXES = [
    "Base_Plinth",
    "Wall_",
    "Part_",
    "Dock_",
    "Approval_",
    "Cutaway_",
    "Apron_",
    "Floor_",
    "Reserved_Zone_",
    "Flow_Cyan",
    "RiskRing_",
    "VerifiedRing_"
];
function isStructuralMesh(name) {
    return STRUCTURAL_PREFIXES.some((p)=>name.startsWith(p));
}
function pointToZone(x, z) {
    for (const [id, b] of Object.entries(ZONE_BOUNDS)){
        if (x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ) {
            return id;
        }
    }
    return null;
}
const FLOW_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const FLOW_FRAG = `
  uniform float uTime;
  uniform float uActive;
  uniform float uLen;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float x = vUv.x * uLen;
    float speed = 1.2 + 2.4 * uActive;
    float d = fract((x - uTime * speed) / 1.35);
    float dash = smoothstep(0.0, 0.14, d) * smoothstep(0.55, 0.22, d);
    float alpha = 0.20 + dash * (0.38 + 0.62 * uActive);
    gl_FragColor = vec4(uColor * (0.85 + 2.2 * uActive * dash), alpha);
  }
`;
function IsometricMap3D({ lang, demoState, selectedZone, onSelectZone, focusZoneTrigger, viewMode, onToggleViewMode }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const badgeElsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const demoStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(demoState);
    demoStateRef.current = demoState;
    const selectedZoneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selectedZone);
    selectedZoneRef.current = selectedZone;
    const onSelectZoneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onSelectZone);
    onSelectZoneRef.current = onSelectZone;
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const targetGoalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-1.5, 0.8, -0.3),
        zoom: 1.0,
        active: false
    });
    const ahmedRingMatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const khaledRingMatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const flowMatsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const zoneMeshesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const kn001 = demoState.knowledgeCards.find((k)=>k.id === "KN-001");
    const isApproved = kn001?.status === "approved";
    const isVerified = demoState.transferStatus === "verified";
    const riskScore = isVerified ? 22 : isApproved ? 54 : 84;
    const riskLabel = isVerified ? lang === "ar" ? "مخاطر منخفضة (موظفان مؤهلان)" : "Low Risk (2 Qualified)" : isApproved ? lang === "ar" ? "مخاطر متوسطة (اعتماد على خبير واحد)" : "Medium Risk (Single Expert)" : lang === "ar" ? "مخاطر مرتفعة (خبرة غير موثقة)" : "High Risk (Undocumented Tacit)";
    const flyToZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IsometricMap3D.useCallback[flyToZone]": (zoneId)=>{
            if (!zoneId) {
                targetGoalRef.current = {
                    target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-1.5, 0.8, -0.3),
                    zoom: 1.0,
                    active: true
                };
                return;
            }
            const z = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$demoData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONES"].find({
                "IsometricMap3D.useCallback[flyToZone].z": (item)=>item.id === zoneId
            }["IsometricMap3D.useCallback[flyToZone].z"]);
            if (z) {
                targetGoalRef.current = {
                    target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...z.cameraTarget),
                    zoom: z.cameraZoom,
                    active: true
                };
            }
        }
    }["IsometricMap3D.useCallback[flyToZone]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IsometricMap3D.useEffect": ()=>{
            if (focusZoneTrigger.seq > 0) {
                flyToZone(focusZoneTrigger.zone);
            }
        }
    }["IsometricMap3D.useEffect"], [
        focusZoneTrigger,
        flyToZone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IsometricMap3D.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            // Guard against React 19 StrictMode double-mount adding duplicate GLB models!
            let disposed = false;
            const width = container.clientWidth || 900;
            const height = container.clientHeight || 650;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#f1f5f9");
            const aspect = width / height;
            const frustumSize = 19.5;
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, -50, 120);
            camera.position.set(22, 20.5, 23.5);
            camera.lookAt(-1.5, 0.8, -0.3);
            cameraRef.current = camera;
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoToneMapping"];
            renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
            container.innerHTML = "";
            container.appendChild(renderer.domElement);
            const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
            controls.target.set(-1.5, 0.8, -0.3);
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.minZoom = 0.65;
            controls.maxZoom = 2.6;
            controls.maxPolarAngle = Math.PI / 2.25;
            controls.minPolarAngle = Math.PI / 6;
            controls.update();
            controlsRef.current = controls;
            const onUserInteract = {
                "IsometricMap3D.useEffect.onUserInteract": ()=>{
                    targetGoalRef.current.active = false;
                }
            }["IsometricMap3D.useEffect.onUserInteract"];
            controls.addEventListener("start", onUserInteract);
            // Studio Lighting
            const hemiLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HemisphereLight"](0xf8fbff, 0xcbd5e1, 1.35);
            scene.add(hemiLight);
            const keyLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xfffaf0, 1.55);
            keyLight.position.set(16, 26, 14);
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.set(2048, 2048);
            keyLight.shadow.camera.left = -18;
            keyLight.shadow.camera.right = 18;
            keyLight.shadow.camera.top = 18;
            keyLight.shadow.camera.bottom = -18;
            keyLight.shadow.bias = -0.0005;
            scene.add(keyLight);
            const fillLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xdbeafe, 0.65);
            fillLight.position.set(-18, 14, -12);
            scene.add(fillLight);
            // 1. Selection Glow Halo Ring + Beacon Disc
            const selHaloMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x0ea5e9,
                transparent: true,
                opacity: 0,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const selHalo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingGeometry"](0.84, 1.0, 96), selHaloMat);
            selHalo.rotation.x = -Math.PI / 2;
            selHalo.position.y = 0.07;
            selHalo.visible = false;
            scene.add(selHalo);
            const selDiscMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const selDisc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](0.84, 64), selDiscMat);
            selDisc.rotation.x = -Math.PI / 2;
            selDisc.position.y = 0.065;
            selDisc.visible = false;
            scene.add(selDisc);
            const pipeRuntimes = [];
            const beadGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.11, 16, 12);
            const beadHaloGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.21, 14, 10);
            for (const def of PIPELINE_DEFS){
                const pts = def.points.map({
                    "IsometricMap3D.useEffect.pts": (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...p)
                }["IsometricMap3D.useEffect.pts"]);
                const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](pts, false, "catmullrom", 0.08);
                const len = curve.getLength();
                const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](def.baseColor);
                const shellMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color,
                    roughness: 0.25,
                    metalness: 0.1,
                    transparent: true,
                    opacity: 0.35,
                    emissive: color,
                    emissiveIntensity: 0.35
                });
                const shell = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](curve, 120, 0.055, 10, false), shellMat);
                const flowMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                    vertexShader: FLOW_VERT,
                    fragmentShader: FLOW_FRAG,
                    transparent: true,
                    depthWrite: false,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    uniforms: {
                        uTime: {
                            value: 0
                        },
                        uActive: {
                            value: 0.35
                        },
                        uLen: {
                            value: len
                        },
                        uColor: {
                            value: color.clone()
                        }
                    }
                });
                const flowTube = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](curve, 120, 0.095, 10, false), flowMat);
                scene.add(shell, flowTube);
                const beads = [];
                const beadCount = Math.max(2, Math.round(len / 2.8));
                for(let i = 0; i < beadCount; i++){
                    const coreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: color.clone().multiplyScalar(2.6),
                        toneMapped: false
                    });
                    const glowMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: color.clone(),
                        transparent: true,
                        opacity: 0.42,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        depthWrite: false
                    });
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](beadGeo, coreMat);
                    const glowMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](beadHaloGeo, glowMat);
                    scene.add(mesh, glowMesh);
                    beads.push({
                        mesh,
                        glowMesh,
                        offset: i / beadCount,
                        speed: 0.18 + i % 2 * 0.03
                    });
                }
                pipeRuntimes.push({
                    def,
                    curve,
                    len,
                    flowMat,
                    shellMat,
                    active: 0.35,
                    beads
                });
            }
            // 3. Load Single Clean Blender GLB Model
            let loadedRoot = null;
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"]();
            loader.load("/models/alpha_medical_ops_map.glb", {
                "IsometricMap3D.useEffect": (gltf)=>{
                    if (disposed) return; // Prevents duplicate models under StrictMode!
                    const model = gltf.scene;
                    loadedRoot = model;
                    flowMatsRef.current = [];
                    zoneMeshesRef.current.clear();
                    model.updateMatrixWorld(true);
                    const tmpBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
                    const tmpCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    model.traverse({
                        "IsometricMap3D.useEffect": (child)=>{
                            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mat = child.material;
                                if (child.geometry.attributes.color && mat) {
                                    mat.vertexColors = true;
                                    mat.needsUpdate = true;
                                }
                                if (child.name.includes("RiskRing_Ahmed")) {
                                    const cloned = mat.clone();
                                    child.material = cloned;
                                    ahmedRingMatRef.current = cloned;
                                } else if (child.name.includes("VerifiedRing_Khaled")) {
                                    const cloned = mat.clone();
                                    child.material = cloned;
                                    khaledRingMatRef.current = cloned;
                                } else if (child.name.includes("Flow_Cyan")) {
                                    const cloned = mat.clone();
                                    child.material = cloned;
                                    flowMatsRef.current.push(cloned);
                                } else if (mat && mat.isMeshStandardMaterial && !isStructuralMesh(child.name)) {
                                    // Only interior operational equipment/props glow gently on zone selection — never walls/partitions/docks!
                                    tmpBox.setFromObject(child);
                                    tmpBox.getCenter(tmpCenter);
                                    const zid = pointToZone(tmpCenter.x, tmpCenter.z);
                                    if (zid) {
                                        const cloned = mat.clone();
                                        child.material = cloned;
                                        const list = zoneMeshesRef.current.get(zid) ?? [];
                                        list.push({
                                            mesh: child,
                                            mat: cloned,
                                            baseEmissive: cloned.emissive.clone(),
                                            baseIntensity: cloned.emissiveIntensity ?? 1
                                        });
                                        zoneMeshesRef.current.set(zid, list);
                                    }
                                }
                            }
                        }
                    }["IsometricMap3D.useEffect"]);
                    scene.add(model);
                    setLoading(false);
                }
            }["IsometricMap3D.useEffect"], undefined, {
                "IsometricMap3D.useEffect": (err)=>{
                    if (disposed) return;
                    console.error("Failed to load GLB:", err);
                    setLoadError("Could not load 3D model /models/alpha_medical_ops_map.glb");
                    setLoading(false);
                }
            }["IsometricMap3D.useEffect"]);
            // 4. Direct 3D Click Raycasting
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const pointerNdc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            let pointerDownPos = null;
            const onPointerDown = {
                "IsometricMap3D.useEffect.onPointerDown": (e)=>{
                    pointerDownPos = {
                        x: e.clientX,
                        y: e.clientY
                    };
                }
            }["IsometricMap3D.useEffect.onPointerDown"];
            const onPointerUp = {
                "IsometricMap3D.useEffect.onPointerUp": (e)=>{
                    if (!pointerDownPos || !loadedRoot) return;
                    const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
                    pointerDownPos = null;
                    if (dist > 6) return;
                    const rect = renderer.domElement.getBoundingClientRect();
                    pointerNdc.set((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
                    raycaster.setFromCamera(pointerNdc, camera);
                    const hits = raycaster.intersectObject(loadedRoot, true);
                    if (hits.length > 0) {
                        const pt = hits[0].point;
                        const zid = pointToZone(pt.x, pt.z);
                        if (zid) {
                            onSelectZoneRef.current(zid);
                            const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$demoData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONES"].find({
                                "IsometricMap3D.useEffect.onPointerUp.meta": (z)=>z.id === zid
                            }["IsometricMap3D.useEffect.onPointerUp.meta"]);
                            if (meta) {
                                targetGoalRef.current = {
                                    target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...meta.cameraTarget),
                                    zoom: meta.cameraZoom,
                                    active: true
                                };
                            }
                        }
                    }
                }
            }["IsometricMap3D.useEffect.onPointerUp"];
            renderer.domElement.addEventListener("pointerdown", onPointerDown);
            renderer.domElement.addEventListener("pointerup", onPointerUp);
            const handleResize = {
                "IsometricMap3D.useEffect.handleResize": ()=>{
                    if (!container) return;
                    const w = container.clientWidth;
                    const h = container.clientHeight;
                    if (!w || !h) return;
                    const asp = w / h;
                    camera.left = -frustumSize * asp / 2;
                    camera.right = frustumSize * asp / 2;
                    camera.top = frustumSize / 2;
                    camera.bottom = -frustumSize / 2;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            }["IsometricMap3D.useEffect.handleResize"];
            const ro = new ResizeObserver(handleResize);
            ro.observe(container);
            // Animation Loop (Direct DOM transforms for 0-lag, 0-ghosting department badges!)
            let rafId = 0;
            const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
            const projVec = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const tmpPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            let prevSelected = null;
            const animate = {
                "IsometricMap3D.useEffect.animate": ()=>{
                    if (disposed) return;
                    rafId = requestAnimationFrame(animate);
                    const dt = Math.min(clock.getDelta(), 0.05);
                    const t = clock.elapsedTime;
                    if (targetGoalRef.current.active) {
                        controls.target.lerp(targetGoalRef.current.target, 0.08);
                        camera.zoom = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(camera.zoom, targetGoalRef.current.zoom, 0.08);
                        camera.updateProjectionMatrix();
                        if (controls.target.distanceTo(targetGoalRef.current.target) < 0.03 && Math.abs(camera.zoom - targetGoalRef.current.zoom) < 0.01) {
                            targetGoalRef.current.active = false;
                        }
                    }
                    controls.update();
                    const st = demoStateRef.current;
                    const sel = selectedZoneRef.current;
                    const kn = st.knowledgeCards.find({
                        "IsometricMap3D.useEffect.animate.kn": (k)=>k.id === "KN-001"
                    }["IsometricMap3D.useEffect.animate.kn"]);
                    const approved = kn?.status === "approved";
                    const verified = st.transferStatus === "verified";
                    // 1. Live Bus-Factor Rings
                    if (ahmedRingMatRef.current) {
                        const pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
                        if (verified) {
                            ahmedRingMatRef.current.color.setHex(0x10b981);
                            ahmedRingMatRef.current.emissive.setHex(0x10b981);
                            ahmedRingMatRef.current.emissiveIntensity = 1.1 + pulse * 0.45;
                        } else if (approved) {
                            ahmedRingMatRef.current.color.setHex(0xf59e0b);
                            ahmedRingMatRef.current.emissive.setHex(0xf59e0b);
                            ahmedRingMatRef.current.emissiveIntensity = 1.2 + pulse * 0.6;
                        } else {
                            ahmedRingMatRef.current.color.setHex(0xf97316);
                            ahmedRingMatRef.current.emissive.setHex(0xef4444);
                            ahmedRingMatRef.current.emissiveIntensity = 1.4 + pulse * 1.1;
                        }
                    }
                    if (khaledRingMatRef.current) {
                        const pulse = 0.5 + 0.5 * Math.sin(t * 2.5 + 1.2);
                        if (verified) {
                            khaledRingMatRef.current.color.setHex(0x10b981);
                            khaledRingMatRef.current.emissive.setHex(0x10b981);
                            khaledRingMatRef.current.emissiveIntensity = 1.4 + pulse * 0.5;
                        } else {
                            khaledRingMatRef.current.color.setHex(0x38bdf8);
                            khaledRingMatRef.current.emissive.setHex(0x0ea5e9);
                            khaledRingMatRef.current.emissiveIntensity = 0.9 + pulse * 0.4;
                        }
                    }
                    // 2. Selection Glow Halo + Interior Props Emissive Boost
                    if (sel !== prevSelected) {
                        if (prevSelected) {
                            const prevList = zoneMeshesRef.current.get(prevSelected) ?? [];
                            for (const item of prevList){
                                item.mat.emissive.copy(item.baseEmissive);
                                item.mat.emissiveIntensity = item.baseIntensity;
                            }
                        }
                        prevSelected = sel;
                    }
                    if (sel) {
                        const zb = ZONE_BOUNDS[sel];
                        const selColorHex = sel === "ops_ahmed" && !verified ? 0xf59e0b : sel === "warehouse" && !st.orderSO10482Resolved ? 0xf59e0b : verified ? 0x10b981 : 0x0ea5e9;
                        const breathe = 0.5 + 0.5 * Math.sin(t * 3.6);
                        selHalo.visible = true;
                        selDisc.visible = true;
                        selHalo.position.set(zb.cx, 0.075, zb.cz);
                        selDisc.position.set(zb.cx, 0.07, zb.cz);
                        const s = zb.radius * (0.96 + 0.06 * breathe);
                        selHalo.scale.setScalar(s);
                        selDisc.scale.setScalar(s);
                        selHaloMat.color.setHex(selColorHex);
                        selHaloMat.opacity = 0.45 + 0.35 * breathe;
                        selDiscMat.color.setHex(selColorHex);
                        selDiscMat.opacity = 0.07 + 0.07 * breathe;
                        const curList = zoneMeshesRef.current.get(sel) ?? [];
                        const glowColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](selColorHex);
                        for (const item of curList){
                            item.mat.emissive.copy(glowColor);
                            item.mat.emissiveIntensity = 0.2 + 0.14 * breathe;
                        }
                    } else {
                        selHalo.visible = false;
                        selDisc.visible = false;
                    }
                    // 3. Flowing Department Data Pipelines & Moving Data Beads
                    for (const pr of pipeRuntimes){
                        const isConnected = sel ? pr.def.zones.includes(sel) : false;
                        const targetAct = isConnected ? 1.0 : approved ? 0.55 : 0.3;
                        pr.active = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(pr.active, targetAct, dt * 4);
                        let pipeHex = pr.def.baseColor;
                        if (pr.def.id === "ops_to_warehouse" && st.orderSO10482Resolved) {
                            pipeHex = 0x10b981;
                        } else if (pr.def.id === "ops_to_server" && verified) {
                            pipeHex = 0x10b981;
                        }
                        pr.flowMat.uniforms.uColor.value.setHex(pipeHex);
                        pr.flowMat.uniforms.uTime.value = t;
                        pr.flowMat.uniforms.uActive.value = pr.active;
                        pr.shellMat.color.setHex(pipeHex);
                        pr.shellMat.emissive.setHex(pipeHex);
                        pr.shellMat.emissiveIntensity = 0.3 + pr.active * 0.7;
                        const speedMult = 1.0 + pr.active * 1.15;
                        for (const b of pr.beads){
                            const u = (b.offset + t * b.speed * speedMult) % 1.0;
                            pr.curve.getPointAt(u, tmpPos);
                            b.mesh.position.copy(tmpPos);
                            b.glowMesh.position.copy(tmpPos);
                            const bScale = 0.85 + 0.35 * pr.active;
                            b.mesh.scale.setScalar(bScale);
                            b.glowMesh.scale.setScalar(bScale * (1.1 + 0.25 * Math.sin(t * 6 + b.offset * 10)));
                            b.mesh.material.color.setHex(pipeHex).multiplyScalar(2.4 + pr.active * 1.4);
                            b.glowMesh.material.color.setHex(pipeHex);
                        }
                    }
                    const baseStripGlow = 0.75 + 0.25 * Math.sin(t * 2.4);
                    for (const fm of flowMatsRef.current){
                        fm.emissiveIntensity = baseStripGlow;
                    }
                    renderer.render(scene, camera);
                    // 4. Sync floating department badges directly to DOM at 60fps (no CSS transition lag / ghosting!)
                    const cw = container.clientWidth;
                    const ch = container.clientHeight;
                    for (const z of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$demoData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONES"]){
                        const el = badgeElsRef.current[z.id];
                        if (!el) continue;
                        projVec.set(z.worldPos[0], z.worldPos[1], z.worldPos[2]);
                        projVec.project(camera);
                        const x = Math.round((projVec.x * 0.5 + 0.5) * cw);
                        const y = Math.round((-projVec.y * 0.5 + 0.5) * ch);
                        const visible = projVec.z < 1 && x > 40 && x < cw - 40 && y > 35 && y < ch - 35;
                        if (visible) {
                            el.style.visibility = "visible";
                            el.style.transform = `translate(-50%, -100%) translate3d(${x}px, ${y}px, 0)`;
                        } else {
                            el.style.visibility = "hidden";
                        }
                    }
                }
            }["IsometricMap3D.useEffect.animate"];
            animate();
            return ({
                "IsometricMap3D.useEffect": ()=>{
                    disposed = true;
                    cancelAnimationFrame(rafId);
                    ro.disconnect();
                    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
                    renderer.domElement.removeEventListener("pointerup", onPointerUp);
                    controls.removeEventListener("start", onUserInteract);
                    controls.dispose();
                    renderer.dispose();
                }
            })["IsometricMap3D.useEffect"];
        }
    }["IsometricMap3D.useEffect"], []);
    const getZoneStatusBadge = (zoneId)=>{
        if (zoneId === "ops_ahmed") {
            if (isVerified) return {
                text: lang === "ar" ? "موثقة ومؤمّنة" : "Secured • 2 Qualified",
                dot: "bg-emerald-500",
                pill: "bg-emerald-50 text-emerald-700 border-emerald-200"
            };
            if (isApproved) return {
                text: lang === "ar" ? "خبير واحد • مخاطر" : "Single Expert Risk",
                dot: "bg-amber-500",
                pill: "bg-amber-50 text-amber-700 border-amber-200"
            };
            return {
                text: lang === "ar" ? "معرفة حرجة غير موثقة" : "Undocumented Risk",
                dot: "bg-rose-500",
                pill: "bg-rose-50 text-rose-700 border-rose-200 pulse-amber"
            };
        }
        if (zoneId === "ops_khaled") {
            if (isVerified) return {
                text: lang === "ar" ? "مؤهل ومعتمد ✓" : "Certified Ready ✓",
                dot: "bg-emerald-500",
                pill: "bg-emerald-50 text-emerald-700 border-emerald-200"
            };
            if (demoState.transferStatus === "assigned") return {
                text: lang === "ar" ? "مسار نقل المعرفة" : "Transfer Assigned",
                dot: "bg-sky-500",
                pill: "bg-sky-50 text-sky-700 border-sky-200"
            };
            return {
                text: lang === "ar" ? "جاهز للاسترجاع" : "Retrieval Ready",
                dot: "bg-sky-500",
                pill: "bg-sky-50 text-sky-700 border-sky-200"
            };
        }
        if (zoneId === "warehouse") {
            return demoState.orderSO10482Resolved ? {
                text: lang === "ar" ? "تسليم جزئي مجدول" : "Partial Delivery Set",
                dot: "bg-emerald-500",
                pill: "bg-emerald-50 text-emerald-700 border-emerald-200"
            } : {
                text: lang === "ar" ? "20 محجوز / 4 متاح" : "20 Reserved / 4 Avail",
                dot: "bg-amber-500",
                pill: "bg-amber-50 text-amber-700 border-amber-200"
            };
        }
        if (zoneId === "approval_chamber") {
            const pending = demoState.knowledgeCards.filter((k)=>k.status === "pending_approval").length;
            if (pending > 0) return {
                text: lang === "ar" ? `${pending} بانتظار الاعتماد` : `${pending} Pending Approval`,
                dot: "bg-amber-500",
                pill: "bg-amber-50 text-amber-700 border-amber-200 pulse-amber"
            };
            return {
                text: lang === "ar" ? "الحوكمة والاستشراف" : "Governance & Foresight",
                dot: "bg-emerald-500",
                pill: "bg-emerald-50 text-emerald-700 border-emerald-200"
            };
        }
        if (zoneId === "server_core") {
            const approvedCount = demoState.knowledgeCards.filter((k)=>k.status === "approved").length;
            return {
                text: lang === "ar" ? `نشط • ${approvedCount} بطاقة معتمدة` : `Active • ${approvedCount} Approved`,
                dot: "bg-teal-500",
                pill: "bg-teal-50 text-teal-700 border-teal-200"
            };
        }
        return {
            text: demoState.orderSO10482Resolved ? lang === "ar" ? "تمت المعالجة ✓" : "Resolved ✓" : lang === "ar" ? "طلب متأخر SO-10482" : "Delayed SO-10482",
            dot: demoState.orderSO10482Resolved ? "bg-emerald-500" : "bg-amber-500",
            pill: demoState.orderSO10482Resolved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full bg-[#f1f5f9] overflow-hidden select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "w-full h-full cursor-grab active:cursor-grabbing"
            }, void 0, false, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 869,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 876,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-slate-600",
                        children: lang === "ar" ? "جاري تحميل الخريطة التشغيلية ثلاثية الأبعاد..." : "Loading 3D Operational Command Deck..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 877,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 875,
                columnNumber: 9
            }, this),
            loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-20 flex items-center justify-center bg-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm",
                    children: loadError
                }, void 0, false, {
                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                    lineNumber: 887,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 886,
                columnNumber: 9
            }, this),
            !loading && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$demoData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZONES"].map((zone)=>{
                const status = getZoneStatusBadge(zone.id);
                const isSelected = selectedZone === zone.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    ref: (el)=>{
                        badgeElsRef.current[zone.id] = el;
                    },
                    onClick: ()=>{
                        onSelectZone(zone.id);
                        flyToZone(zone.id);
                    },
                    style: {
                        visibility: "hidden"
                    },
                    className: `absolute top-0 left-0 z-10 text-start rounded-xl border bg-white/95 px-2.5 py-1.5 shadow-md hover:shadow-lg transition-shadow cursor-pointer will-change-transform ${isSelected ? "border-teal-500 ring-2 ring-teal-400/50 shadow-[0_0_20px_rgba(14,165,164,0.35)]" : "border-slate-200/90"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold tracking-wider text-slate-400",
                                    children: zone.code
                                }, void 0, false, {
                                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                                    lineNumber: 916,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-slate-800 whitespace-nowrap",
                                    children: lang === "ar" ? zone.titleAr : zone.titleEn
                                }, void 0, false, {
                                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                                    lineNumber: 919,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 915,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-1 flex items-center gap-1.5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${status.pill}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `w-1.5 h-1.5 rounded-full ${status.dot}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                                        lineNumber: 927,
                                        columnNumber: 19
                                    }, this),
                                    status.text
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/IsometricMap3D.tsx",
                                lineNumber: 924,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 923,
                            columnNumber: 15
                        }, this)
                    ]
                }, zone.id, true, {
                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                    lineNumber: 899,
                    columnNumber: 13
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 start-4 z-20 flex flex-wrap items-center gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2.5 bg-white/95 border border-slate-200/90 rounded-2xl px-3.5 py-2 shadow-sm",
                    children: [
                        isVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-5 h-5 text-emerald-500 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 939,
                            columnNumber: 13
                        }, this) : isApproved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "w-5 h-5 text-amber-500 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 941,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                            className: "w-5 h-5 text-rose-500 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 943,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[11px] text-slate-500 font-medium",
                                    children: lang === "ar" ? "مؤشر مخاطر فقدان المعرفة (الإدارة)" : "Department Knowledge Risk Score"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                                    lineNumber: 946,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-bold ${isVerified ? "text-emerald-600" : isApproved ? "text-amber-600" : "text-rose-600"}`,
                                            children: [
                                                riskScore,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                                            lineNumber: 952,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-slate-700 font-medium",
                                            children: riskLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                                            lineNumber: 963,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                                    lineNumber: 951,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 945,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/IsometricMap3D.tsx",
                    lineNumber: 937,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 936,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 end-4 z-20 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onToggleViewMode(viewMode === "3d" ? "2d" : "3d"),
                        className: "flex items-center gap-1.5 bg-white/95 hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                className: "w-3.5 h-3.5 text-teal-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/IsometricMap3D.tsx",
                                lineNumber: 977,
                                columnNumber: 11
                            }, this),
                            lang === "ar" ? "خريطة المعرفة 2D" : "2D Knowledge Map"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 973,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelectZone(null);
                            flyToZone(null);
                        },
                        title: lang === "ar" ? "إعادة ضبط الكاميرا" : "Reset Camera",
                        className: "flex items-center gap-1 bg-white/95 hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold shadow-sm transition cursor-pointer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/IsometricMap3D.tsx",
                            lineNumber: 988,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 980,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 972,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 start-4 z-10 hidden sm:flex items-center gap-3 bg-white/90 border border-slate-200/80 rounded-xl px-3 py-1.5 text-[11px] text-slate-600 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2.5 h-2.5 rounded-full bg-amber-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/IsometricMap3D.tsx",
                                lineNumber: 995,
                                columnNumber: 11
                            }, this),
                            lang === "ar" ? "مخاطر خبير واحد / محجوز" : "Single-Expert / Reserved"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 994,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2.5 h-2.5 rounded-full bg-cyan-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/IsometricMap3D.tsx",
                                lineNumber: 999,
                                columnNumber: 11
                            }, this),
                            lang === "ar" ? "تدفق بيانات الأقسام" : "Live Workflow Data"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 998,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2.5 h-2.5 rounded-full bg-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/IsometricMap3D.tsx",
                                lineNumber: 1003,
                                columnNumber: 11
                            }, this),
                            lang === "ar" ? "معرفة منقولة ومعتمدة" : "Verified & Secured"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IsometricMap3D.tsx",
                        lineNumber: 1002,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IsometricMap3D.tsx",
                lineNumber: 993,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/IsometricMap3D.tsx",
        lineNumber: 868,
        columnNumber: 5
    }, this);
}
_s(IsometricMap3D, "683gHiH8yEAcQSlTC+SlDboFldU=");
_c = IsometricMap3D;
var _c;
__turbopack_context__.k.register(_c, "IsometricMap3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/IsometricMap3D.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/IsometricMap3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_IsometricMap3D_tsx_19d42pdv245xo._.js.map