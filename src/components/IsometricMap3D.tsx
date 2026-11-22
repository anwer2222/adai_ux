"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  DemoState,
  Lang,
  ZoneId,
  ZONES,
} from "@/data/demoData";
import { RotateCcw, Layers, ShieldAlert, CheckCircle2, Clock } from "lucide-react";

interface IsometricMap3DProps {
  lang: Lang;
  demoState: DemoState;
  selectedZone: ZoneId | null;
  onSelectZone: (zone: ZoneId | null) => void;
  focusZoneTrigger: { zone: ZoneId | null; seq: number };
  viewMode: "3d" | "2d";
  onToggleViewMode: (mode: "3d" | "2d") => void;
}

interface PipelineDef {
  id: string;
  zones: ZoneId[];
  points: [number, number, number][];
  baseColor: number;
}

const PIPELINE_DEFS: PipelineDef[] = [
  {
    id: "intake_to_ops",
    zones: ["order_intake", "ops_ahmed", "ops_khaled"],
    points: [
      [-5.0, 0.06, 3.5],
      [-3.0, 0.06, 3.5],
      [-3.0, 0.06, -0.2],
      [0.8, 0.06, -0.2],
    ],
    baseColor: 0x22d3ee,
  },
  {
    id: "ops_to_warehouse",
    zones: ["warehouse", "ops_ahmed", "order_intake"],
    points: [
      [-3.0, 0.06, -0.2],
      [-5.2, 0.06, -0.2],
      [-5.2, 0.06, -2.2],
    ],
    baseColor: 0xf59e0b,
  },
  {
    id: "ops_to_server",
    zones: ["ops_ahmed", "server_core"],
    points: [
      [0.8, 0.06, -0.2],
      [0.8, 0.06, -4.8],
      [3.2, 0.06, -4.8],
    ],
    baseColor: 0x06b6d4,
  },
  {
    id: "ops_to_approval",
    zones: ["ops_ahmed", "ops_khaled", "approval_chamber"],
    points: [
      [0.8, 0.06, -0.2],
      [0.8, 0.06, 1.6],
      [6.5, 0.06, 1.6],
    ],
    baseColor: 0x10b981,
  },
];

const ZONE_BOUNDS: Record<
  ZoneId,
  { cx: number; cz: number; radius: number; minX: number; maxX: number; minZ: number; maxZ: number }
> = {
  warehouse:        { cx: -5.5, cz: -3.2, radius: 3.0, minX: -8.9, maxX: -2.1, minZ: -6.9, maxZ: 0.9 },
  ops_ahmed:        { cx: 0.65, cz: -0.8, radius: 1.9, minX: -1.9, maxX: 4.3,  minZ: -2.9, maxZ: 1.1 },
  ops_khaled:       { cx: 0.65, cz: 3.4,  radius: 1.9, minX: -1.9, maxX: 4.3,  minZ: 1.2,  maxZ: 6.8 },
  server_core:      { cx: 5.2,  cz: -5.0, radius: 2.7, minX: 1.6,  maxX: 8.8,  minZ: -6.9, maxZ: -3.1 },
  approval_chamber: { cx: 6.75, cz: 1.6,  radius: 2.5, minX: 4.6,  maxX: 8.8,  minZ: -2.8, maxZ: 6.8 },
  order_intake:     { cx: -5.5, cz: 4.0,  radius: 2.7, minX: -8.9, maxX: -2.1, minZ: 1.1,  maxZ: 6.8 },
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
  "VerifiedRing_",
];

function isStructuralMesh(name: string): boolean {
  return STRUCTURAL_PREFIXES.some((p) => name.startsWith(p));
}

function pointToZone(x: number, z: number): ZoneId | null {
  for (const [id, b] of Object.entries(ZONE_BOUNDS) as [
    ZoneId,
    (typeof ZONE_BOUNDS)[ZoneId]
  ][]) {
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

export default function IsometricMap3D({
  lang,
  demoState,
  selectedZone,
  onSelectZone,
  focusZoneTrigger,
  viewMode,
  onToggleViewMode,
}: IsometricMap3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeElsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const demoStateRef = useRef(demoState);
  demoStateRef.current = demoState;

  const selectedZoneRef = useRef<ZoneId | null>(selectedZone);
  selectedZoneRef.current = selectedZone;

  const onSelectZoneRef = useRef(onSelectZone);
  onSelectZoneRef.current = onSelectZone;

  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetGoalRef = useRef<{
    target: THREE.Vector3;
    zoom: number;
    active: boolean;
  }>({
    target: new THREE.Vector3(-1.5, 0.8, -0.3),
    zoom: 1.0,
    active: false,
  });

  const ahmedRingMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const khaledRingMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const flowMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const zoneMeshesRef = useRef<
    Map<
      ZoneId,
      {
        mesh: THREE.Mesh;
        mat: THREE.MeshStandardMaterial;
        baseEmissive: THREE.Color;
        baseIntensity: number;
      }[]
    >
  >(new Map());

  const kn001 = demoState.knowledgeCards.find((k) => k.id === "KN-001");
  const isApproved = kn001?.status === "approved";
  const isVerified = demoState.transferStatus === "verified";

  const riskScore = isVerified ? 22 : isApproved ? 54 : 84;
  const riskLabel = isVerified
    ? lang === "ar"
      ? "مخاطر منخفضة (موظفان مؤهلان)"
      : "Low Risk (2 Qualified)"
    : isApproved
    ? lang === "ar"
      ? "مخاطر متوسطة (اعتماد على خبير واحد)"
      : "Medium Risk (Single Expert)"
    : lang === "ar"
    ? "مخاطر مرتفعة (خبرة غير موثقة)"
    : "High Risk (Undocumented Tacit)";

  const flyToZone = useCallback((zoneId: ZoneId | null) => {
    if (!zoneId) {
      targetGoalRef.current = {
        target: new THREE.Vector3(-1.5, 0.8, -0.3),
        zoom: 1.0,
        active: true,
      };
      return;
    }
    const z = ZONES.find((item) => item.id === zoneId);
    if (z) {
      targetGoalRef.current = {
        target: new THREE.Vector3(...z.cameraTarget),
        zoom: z.cameraZoom,
        active: true,
      };
    }
  }, []);

  useEffect(() => {
    if (focusZoneTrigger.seq > 0) {
      flyToZone(focusZoneTrigger.zone);
    }
  }, [focusZoneTrigger, flyToZone]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guard against React 19 StrictMode double-mount adding duplicate GLB models!
    let disposed = false;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f1f5f9");

    const aspect = width / height;
    const frustumSize = 19.5;
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      -50,
      120
    );
    camera.position.set(22, 20.5, 23.5);
    camera.lookAt(-1.5, 0.8, -0.3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-1.5, 0.8, -0.3);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minZoom = 0.65;
    controls.maxZoom = 2.6;
    controls.maxPolarAngle = Math.PI / 2.25;
    controls.minPolarAngle = Math.PI / 6;
    controls.update();
    controlsRef.current = controls;

    const onUserInteract = () => {
      targetGoalRef.current.active = false;
    };
    controls.addEventListener("start", onUserInteract);

    // Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xf8fbff, 0xcbd5e1, 1.35);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.55);
    keyLight.position.set(16, 26, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -18;
    keyLight.shadow.camera.right = 18;
    keyLight.shadow.camera.top = 18;
    keyLight.shadow.camera.bottom = -18;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.65);
    fillLight.position.set(-18, 14, -12);
    scene.add(fillLight);

    // 1. Selection Glow Halo Ring + Beacon Disc
    const selHaloMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const selHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.84, 1.0, 96),
      selHaloMat
    );
    selHalo.rotation.x = -Math.PI / 2;
    selHalo.position.y = 0.07;
    selHalo.visible = false;
    scene.add(selHalo);

    const selDiscMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const selDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.84, 64),
      selDiscMat
    );
    selDisc.rotation.x = -Math.PI / 2;
    selDisc.position.y = 0.065;
    selDisc.visible = false;
    scene.add(selDisc);

    // 2. Flowing Data Pipelines + Moving Glowing Data Beads
    interface PipeRuntime {
      def: PipelineDef;
      curve: THREE.CatmullRomCurve3;
      len: number;
      flowMat: THREE.ShaderMaterial;
      shellMat: THREE.MeshStandardMaterial;
      active: number;
      beads: { mesh: THREE.Mesh; glowMesh: THREE.Mesh; offset: number; speed: number }[];
    }

    const pipeRuntimes: PipeRuntime[] = [];
    const beadGeo = new THREE.SphereGeometry(0.11, 16, 12);
    const beadHaloGeo = new THREE.SphereGeometry(0.21, 14, 10);

    for (const def of PIPELINE_DEFS) {
      const pts = def.points.map((p) => new THREE.Vector3(...p));
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.08);
      const len = curve.getLength();
      const color = new THREE.Color(def.baseColor);

      const shellMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: 0.35,
        emissive: color,
        emissiveIntensity: 0.35,
      });
      const shell = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 120, 0.055, 10, false),
        shellMat
      );

      const flowMat = new THREE.ShaderMaterial({
        vertexShader: FLOW_VERT,
        fragmentShader: FLOW_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uActive: { value: 0.35 },
          uLen: { value: len },
          uColor: { value: color.clone() },
        },
      });
      const flowTube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 120, 0.095, 10, false),
        flowMat
      );

      scene.add(shell, flowTube);

      const beads: PipeRuntime["beads"] = [];
      const beadCount = Math.max(2, Math.round(len / 2.8));
      for (let i = 0; i < beadCount; i++) {
        const coreMat = new THREE.MeshBasicMaterial({
          color: color.clone().multiplyScalar(2.6),
          toneMapped: false,
        });
        const glowMat = new THREE.MeshBasicMaterial({
          color: color.clone(),
          transparent: true,
          opacity: 0.42,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(beadGeo, coreMat);
        const glowMesh = new THREE.Mesh(beadHaloGeo, glowMat);
        scene.add(mesh, glowMesh);
        beads.push({
          mesh,
          glowMesh,
          offset: i / beadCount,
          speed: 0.18 + (i % 2) * 0.03,
        });
      }

      pipeRuntimes.push({
        def,
        curve,
        len,
        flowMat,
        shellMat,
        active: 0.35,
        beads,
      });
    }

    // 3. Load Single Clean Blender GLB Model
    let loadedRoot: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      "/models/alpha_medical_ops_map.glb",
      (gltf) => {
        if (disposed) return; // Prevents duplicate models under StrictMode!
        const model = gltf.scene;
        loadedRoot = model;
        flowMatsRef.current = [];
        zoneMeshesRef.current.clear();

        model.updateMatrixWorld(true);
        const tmpBox = new THREE.Box3();
        const tmpCenter = new THREE.Vector3();

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const mat = child.material as THREE.MeshStandardMaterial;
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
            } else if (
              mat &&
              mat.isMeshStandardMaterial &&
              !isStructuralMesh(child.name)
            ) {
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
                  baseIntensity: cloned.emissiveIntensity ?? 1,
                });
                zoneMeshesRef.current.set(zid, list);
              }
            }
          }
        });

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        if (disposed) return;
        console.error("Failed to load GLB:", err);
        setLoadError("Could not load 3D model /models/alpha_medical_ops_map.glb");
        setLoading(false);
      }
    );

    // 4. Direct 3D Click Raycasting
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let pointerDownPos: { x: number; y: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!pointerDownPos || !loadedRoot) return;
      const dist = Math.hypot(
        e.clientX - pointerDownPos.x,
        e.clientY - pointerDownPos.y
      );
      pointerDownPos = null;
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObject(loadedRoot, true);
      if (hits.length > 0) {
        const pt = hits[0].point;
        const zid = pointToZone(pt.x, pt.z);
        if (zid) {
          onSelectZoneRef.current(zid);
          const meta = ZONES.find((z) => z.id === zid);
          if (meta) {
            targetGoalRef.current = {
              target: new THREE.Vector3(...meta.cameraTarget),
              zoom: meta.cameraZoom,
              active: true,
            };
          }
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      const asp = w / h;
      camera.left = (-frustumSize * asp) / 2;
      camera.right = (frustumSize * asp) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Animation Loop (Direct DOM transforms for 0-lag, 0-ghosting department badges!)
    let rafId = 0;
    const clock = new THREE.Clock();
    const projVec = new THREE.Vector3();
    const tmpPos = new THREE.Vector3();
    let prevSelected: ZoneId | null = null;

    const animate = () => {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (targetGoalRef.current.active) {
        controls.target.lerp(targetGoalRef.current.target, 0.08);
        camera.zoom = THREE.MathUtils.lerp(
          camera.zoom,
          targetGoalRef.current.zoom,
          0.08
        );
        camera.updateProjectionMatrix();
        if (
          controls.target.distanceTo(targetGoalRef.current.target) < 0.03 &&
          Math.abs(camera.zoom - targetGoalRef.current.zoom) < 0.01
        ) {
          targetGoalRef.current.active = false;
        }
      }

      controls.update();

      const st = demoStateRef.current;
      const sel = selectedZoneRef.current;
      const kn = st.knowledgeCards.find((k) => k.id === "KN-001");
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
          for (const item of prevList) {
            item.mat.emissive.copy(item.baseEmissive);
            item.mat.emissiveIntensity = item.baseIntensity;
          }
        }
        prevSelected = sel;
      }

      if (sel) {
        const zb = ZONE_BOUNDS[sel];
        const selColorHex =
          sel === "ops_ahmed" && !verified
            ? 0xf59e0b
            : sel === "warehouse" && !st.orderSO10482Resolved
            ? 0xf59e0b
            : verified
            ? 0x10b981
            : 0x0ea5e9;

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
        const glowColor = new THREE.Color(selColorHex);
        for (const item of curList) {
          item.mat.emissive.copy(glowColor);
          item.mat.emissiveIntensity = 0.2 + 0.14 * breathe;
        }
      } else {
        selHalo.visible = false;
        selDisc.visible = false;
      }

      // 3. Flowing Department Data Pipelines & Moving Data Beads
      for (const pr of pipeRuntimes) {
        const isConnected = sel ? pr.def.zones.includes(sel) : false;
        const targetAct = isConnected ? 1.0 : approved ? 0.55 : 0.3;
        pr.active = THREE.MathUtils.lerp(pr.active, targetAct, dt * 4);

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
        for (const b of pr.beads) {
          const u = (b.offset + t * b.speed * speedMult) % 1.0;
          pr.curve.getPointAt(u, tmpPos);
          b.mesh.position.copy(tmpPos);
          b.glowMesh.position.copy(tmpPos);

          const bScale = 0.85 + 0.35 * pr.active;
          b.mesh.scale.setScalar(bScale);
          b.glowMesh.scale.setScalar(
            bScale * (1.1 + 0.25 * Math.sin(t * 6 + b.offset * 10))
          );

          (b.mesh.material as THREE.MeshBasicMaterial).color
            .setHex(pipeHex)
            .multiplyScalar(2.4 + pr.active * 1.4);
          (b.glowMesh.material as THREE.MeshBasicMaterial).color.setHex(pipeHex);
        }
      }

      const baseStripGlow = 0.75 + 0.25 * Math.sin(t * 2.4);
      for (const fm of flowMatsRef.current) {
        fm.emissiveIntensity = baseStripGlow;
      }

      renderer.render(scene, camera);

      // 4. Sync floating department badges directly to DOM at 60fps (no CSS transition lag / ghosting!)
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      for (const z of ZONES) {
        const el = badgeElsRef.current[z.id];
        if (!el) continue;
        projVec.set(z.worldPos[0], z.worldPos[1], z.worldPos[2]);
        projVec.project(camera);
        const x = Math.round((projVec.x * 0.5 + 0.5) * cw);
        const y = Math.round((-projVec.y * 0.5 + 0.5) * ch);
        const visible =
          projVec.z < 1 && x > 40 && x < cw - 40 && y > 35 && y < ch - 35;
        if (visible) {
          el.style.visibility = "visible";
          el.style.transform = `translate(-50%, -100%) translate3d(${x}px, ${y}px, 0)`;
        } else {
          el.style.visibility = "hidden";
        }
      }
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      controls.removeEventListener("start", onUserInteract);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  const getZoneStatusBadge = (zoneId: ZoneId) => {
    if (zoneId === "ops_ahmed") {
      if (isVerified)
        return {
          text: lang === "ar" ? "موثقة ومؤمّنة" : "Secured • 2 Qualified",
          dot: "bg-emerald-500",
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      if (isApproved)
        return {
          text: lang === "ar" ? "خبير واحد • مخاطر" : "Single Expert Risk",
          dot: "bg-amber-500",
          pill: "bg-amber-50 text-amber-700 border-amber-200",
        };
      return {
        text: lang === "ar" ? "معرفة حرجة غير موثقة" : "Undocumented Risk",
        dot: "bg-rose-500",
        pill: "bg-rose-50 text-rose-700 border-rose-200 pulse-amber",
      };
    }
    if (zoneId === "ops_khaled") {
      if (isVerified)
        return {
          text: lang === "ar" ? "مؤهل ومعتمد ✓" : "Certified Ready ✓",
          dot: "bg-emerald-500",
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      if (demoState.transferStatus === "assigned")
        return {
          text: lang === "ar" ? "مسار نقل المعرفة" : "Transfer Assigned",
          dot: "bg-sky-500",
          pill: "bg-sky-50 text-sky-700 border-sky-200",
        };
      return {
        text: lang === "ar" ? "جاهز للاسترجاع" : "Retrieval Ready",
        dot: "bg-sky-500",
        pill: "bg-sky-50 text-sky-700 border-sky-200",
      };
    }
    if (zoneId === "warehouse") {
      return demoState.orderSO10482Resolved
        ? {
            text: lang === "ar" ? "تسليم جزئي مجدول" : "Partial Delivery Set",
            dot: "bg-emerald-500",
            pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
          }
        : {
            text: lang === "ar" ? "20 محجوز / 4 متاح" : "20 Reserved / 4 Avail",
            dot: "bg-amber-500",
            pill: "bg-amber-50 text-amber-700 border-amber-200",
          };
    }
    if (zoneId === "approval_chamber") {
      const pending = demoState.knowledgeCards.filter(
        (k) => k.status === "pending_approval"
      ).length;
      if (pending > 0)
        return {
          text:
            lang === "ar"
              ? `${pending} بانتظار الاعتماد`
              : `${pending} Pending Approval`,
          dot: "bg-amber-500",
          pill: "bg-amber-50 text-amber-700 border-amber-200 pulse-amber",
        };
      return {
        text: lang === "ar" ? "الحوكمة والاستشراف" : "Governance & Foresight",
        dot: "bg-emerald-500",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }
    if (zoneId === "server_core") {
      const approvedCount = demoState.knowledgeCards.filter(
        (k) => k.status === "approved"
      ).length;
      return {
        text:
          lang === "ar"
            ? `نشط • ${approvedCount} بطاقة معتمدة`
            : `Active • ${approvedCount} Approved`,
        dot: "bg-teal-500",
        pill: "bg-teal-50 text-teal-700 border-teal-200",
      };
    }
    return {
      text: demoState.orderSO10482Resolved
        ? lang === "ar"
          ? "تمت المعالجة ✓"
          : "Resolved ✓"
        : lang === "ar"
        ? "طلب متأخر SO-10482"
        : "Delayed SO-10482",
      dot: demoState.orderSO10482Resolved ? "bg-emerald-500" : "bg-amber-500",
      pill: demoState.orderSO10482Resolved
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  return (
    <div className="relative w-full h-full bg-[#f1f5f9] overflow-hidden select-none">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-600">
            {lang === "ar"
              ? "جاري تحميل الخريطة التشغيلية ثلاثية الأبعاد..."
              : "Loading 3D Operational Command Deck..."}
          </p>
        </div>
      )}

      {loadError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {loadError}
          </div>
        </div>
      )}

      {/* Floating 3D-Projected Zone Cards (Direct 60fps DOM positioning — NO transform transition ghosting!) */}
      {!loading &&
        ZONES.map((zone) => {
          const status = getZoneStatusBadge(zone.id);
          const isSelected = selectedZone === zone.id;
          return (
            <button
              key={zone.id}
              ref={(el) => {
                badgeElsRef.current[zone.id] = el;
              }}
              onClick={() => {
                onSelectZone(zone.id);
                flyToZone(zone.id);
              }}
              style={{ visibility: "hidden" }}
              className={`absolute top-0 left-0 z-10 text-start rounded-xl border bg-white/95 px-2.5 py-1.5 shadow-md hover:shadow-lg transition-shadow cursor-pointer will-change-transform ${
                isSelected
                  ? "border-teal-500 ring-2 ring-teal-400/50 shadow-[0_0_20px_rgba(14,165,164,0.35)]"
                  : "border-slate-200/90"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-400">
                  {zone.code}
                </span>
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                  {lang === "ar" ? zone.titleAr : zone.titleEn}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${status.pill}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.text}
                </span>
              </div>
            </button>
          );
        })}

      {/* Top-Start Floating HUD: Department Risk Score */}
      <div className="absolute top-4 start-4 z-20 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2.5 bg-white/95 border border-slate-200/90 rounded-2xl px-3.5 py-2 shadow-sm">
          {isVerified ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : isApproved ? (
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
          )}
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {lang === "ar"
                ? "مؤشر مخاطر فقدان المعرفة (الإدارة)"
                : "Department Knowledge Risk Score"}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${
                  isVerified
                    ? "text-emerald-600"
                    : isApproved
                    ? "text-amber-600"
                    : "text-rose-600"
                }`}
              >
                {riskScore}%
              </span>
              <span className="text-xs text-slate-700 font-medium">
                {riskLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top-End Map Controls */}
      <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
        <button
          onClick={() => onToggleViewMode(viewMode === "3d" ? "2d" : "3d")}
          className="flex items-center gap-1.5 bg-white/95 hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          {lang === "ar" ? "خريطة المعرفة 2D" : "2D Knowledge Map"}
        </button>
        <button
          onClick={() => {
            onSelectZone(null);
            flyToZone(null);
          }}
          title={lang === "ar" ? "إعادة ضبط الكاميرا" : "Reset Camera"}
          className="flex items-center gap-1 bg-white/95 hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold shadow-sm transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 start-4 z-10 hidden sm:flex items-center gap-3 bg-white/90 border border-slate-200/80 rounded-xl px-3 py-1.5 text-[11px] text-slate-600 shadow-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          {lang === "ar" ? "مخاطر خبير واحد / محجوز" : "Single-Expert / Reserved"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          {lang === "ar" ? "تدفق بيانات الأقسام" : "Live Workflow Data"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          {lang === "ar" ? "معرفة منقولة ومعتمدة" : "Verified & Secured"}
        </span>
      </div>
    </div>
  );
}
