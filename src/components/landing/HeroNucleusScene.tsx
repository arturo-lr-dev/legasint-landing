'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { Locale } from '@/i18n/home-copy';

type ProcessVisual = { sources: string[]; results: string[] };

type HeroNucleusSceneProps = {
  processIndex: number;
  processes: ProcessVisual[];
  active: boolean;
  locale: Locale;
  onReady: () => void;
};

const DURATION = 16;
const SEED = 240519;
const TAU = Math.PI * 2;
const accents = [0x60a5fa, 0x8b5cf6, 0x22d3ee];

const textureLabels: Record<Locale, { input: string; output: string }> = {
  es: { input: 'ENTRADA', output: 'RESULTADO' },
  en: { input: 'INPUT', output: 'OUTPUT' },
};

type SceneContext2D = CanvasRenderingContext2D & { letterSpacing: string };

function mulberry32(seed: number) {
  return function () {
    const a = (seed += 0x6d2b79f5);
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function HeroNucleusScene({ processIndex, processes, active, locale, onReady }: HeroNucleusSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<{
    setProcess: (index: number) => void;
    setActive: (value: boolean) => void;
  } | null>(null);
  const latestRef = useRef({ processIndex, processes, active, locale });
  const onReadyRef = useRef(onReady);
  latestRef.current = { processIndex, processes, active, locale };
  onReadyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mountEl: HTMLDivElement = mount;

    let cancelled = false;
    let disposeScene: (() => void) | undefined;

    (async () => {
      try {
        await Promise.all([
          document.fonts.load('500 30px Montserrat'),
          document.fonts.load('600 60px Barlow'),
        ]);
      } catch {
        // Las tarjetas caen a Arial si las fuentes no cargan.
      }
      if (cancelled || !mountEl.isConnected) return;

      const { processes: initialProcesses, processIndex: initialProcess, locale: initialLocale } = latestRef.current;
      const labels = textureLabels[initialLocale];

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return; // El fallback estático de HeroProcessVisual sigue visible.
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setClearColor(0x111831, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = false;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.setAttribute('role', 'presentation');
      mountEl.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x111831, 0.022);
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 180);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, -0.15, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.enablePan = false;
      controls.minDistance = 11;
      controls.maxDistance = 30;
      controls.minPolarAngle = Math.PI * 0.25;
      controls.maxPolarAngle = Math.PI * 0.62;
      controls.rotateSpeed = 0.48;
      controls.zoomSpeed = 0.6;
      renderer.domElement.style.touchAction = 'pan-y';

      scene.add(new THREE.HemisphereLight(0xc7dcff, 0x151126, 1.35));
      const key = new THREE.DirectionalLight(0xe6efff, 3.2);
      key.position.set(-6, 10, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -9;
      key.shadow.camera.right = 9;
      key.shadow.camera.top = 8;
      key.shadow.camera.bottom = -8;
      key.shadow.bias = -0.0004;
      scene.add(key);
      const blueLight = new THREE.PointLight(0x3b82f6, 36, 18, 2);
      blueLight.position.set(-4, 2, 4);
      scene.add(blueLight);
      const violetLight = new THREE.PointLight(0x8b5cf6, 42, 18, 2);
      violetLight.position.set(4, 0, -2);
      scene.add(violetLight);
      const rimLight = new THREE.DirectionalLight(0x22d3ee, 2.1);
      rimLight.position.set(3, 5, -7);
      scene.add(rimLight);

      const world = new THREE.Group();
      world.rotation.y = -0.08;
      scene.add(world);

      const materials = {
        darkMetal: new THREE.MeshStandardMaterial({ color: 0x17223b, metalness: 0.84, roughness: 0.3 }),
        midMetal: new THREE.MeshStandardMaterial({ color: 0x334563, metalness: 0.88, roughness: 0.24 }),
        black: new THREE.MeshStandardMaterial({ color: 0x0d1428, metalness: 0.6, roughness: 0.42 }),
        blueGlow: new THREE.MeshStandardMaterial({ color: 0x5c8dff, emissive: 0x2563eb, emissiveIntensity: 2.4, metalness: 0.35, roughness: 0.24 }),
        cyanGlow: new THREE.MeshBasicMaterial({ color: 0x67e8f9, toneMapped: false }),
      };

      function makeGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.CanvasTexture(canvas);
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.14, 'rgba(255,255,255,.75)');
        gradient.addColorStop(0.45, 'rgba(255,255,255,.16)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(canvas);
      }
      const glowTexture = makeGlowTexture();
      function glowSprite(color: number, scale: number, opacity = 0.5) {
        const material = new THREE.SpriteMaterial({ map: glowTexture, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
        const sprite = new THREE.Sprite(material);
        sprite.scale.setScalar(scale);
        return sprite;
      }

      function roundedRect(ctx: SceneContext2D, x: number, y: number, w: number, h: number, r: number) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
      }

      function cardTexture(text: string, type: 'input' | 'output', index: number) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 360;
        const ctx = canvas.getContext('2d') as SceneContext2D | null;
        if (!ctx) return new THREE.CanvasTexture(canvas);
        const accent = `#${accents[index].toString(16).padStart(6, '0')}`;
        roundedRect(ctx, 8, 8, 1008, 344, 42);
        const bg = ctx.createLinearGradient(0, 0, 1024, 360);
        bg.addColorStop(0, 'rgba(29,43,72,.97)');
        bg.addColorStop(1, 'rgba(14,22,43,.97)');
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.strokeStyle = `${accent}88`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = accent;
        roundedRect(ctx, 42, 52, 9, 256, 5);
        ctx.fill();
        ctx.font = '500 30px Montserrat, Arial';
        ctx.fillStyle = 'rgba(190,204,229,.72)';
        ctx.letterSpacing = '4px';
        ctx.fillText(`${type === 'input' ? labels.input : labels.output}  0${index + 1}`, 94, 92);
        ctx.font = '600 57px Barlow, Arial';
        ctx.fillStyle = '#f5f7fa';
        ctx.fillText(text, 94, 214, 830);
        if (type === 'output') {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(908, 256, 32, 0, TAU);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(893, 256);
          ctx.lineTo(904, 267);
          ctx.lineTo(925, 242);
          ctx.stroke();
        } else {
          ctx.fillStyle = `${accent}22`;
          roundedRect(ctx, 875, 220, 66, 66, 14);
          ctx.fill();
          ctx.strokeStyle = accent;
          ctx.lineWidth = 4;
          ctx.strokeRect(896, 239, 25, 27);
          ctx.beginPath();
          ctx.moveTo(896, 248);
          ctx.lineTo(921, 248);
          ctx.moveTo(908, 239);
          ctx.lineTo(908, 266);
          ctx.stroke();
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        return texture;
      }

      function createCard(text: string, type: 'input' | 'output', index: number, position: THREE.Vector3) {
        const group = new THREE.Group();
        group.position.copy(position);
        const shell = new THREE.Mesh(new RoundedBoxGeometry(1.92, 0.69, 0.14, 3, 0.08), materials.darkMetal);
        shell.castShadow = true;
        group.add(shell);
        const faceMaterial = new THREE.MeshBasicMaterial({ map: cardTexture(text, type, index), transparent: true, toneMapped: false, depthWrite: false });
        const face = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.67), faceMaterial);
        face.position.z = 0.076;
        face.renderOrder = 5;
        group.add(face);
        const port = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.16, 12), materials.blueGlow);
        port.rotation.z = Math.PI / 2;
        port.position.x = type === 'input' ? 1.01 : -1.01;
        group.add(port);
        group.userData.faceMaterial = faceMaterial;
        group.userData.type = type;
        group.userData.index = index;
        return group;
      }

      // Núcleo de automatización: procesador interior dentro de una carcasa de cristal y metal.
      const core = new THREE.Group();
      core.position.y = 0.05;
      world.add(core);

      const innerGeometry = new THREE.OctahedronGeometry(0.9, 2);
      const innerColors: number[] = [];
      const innerPositions = innerGeometry.getAttribute('position');
      const lowColor = new THREE.Color(0x2563eb);
      const highColor = new THREE.Color(0xa78bfa);
      for (let i = 0; i < innerPositions.count; i++) {
        const mix = THREE.MathUtils.clamp((innerPositions.getY(i) + 0.9) / 1.8, 0, 1);
        const color = lowColor.clone().lerp(highColor, mix);
        innerColors.push(color.r, color.g, color.b);
      }
      innerGeometry.setAttribute('color', new THREE.Float32BufferAttribute(innerColors, 3));
      const innerCore = new THREE.Mesh(innerGeometry, new THREE.MeshStandardMaterial({
        vertexColors: true, emissive: 0x3730a3, emissiveIntensity: 1.6, metalness: 0.5, roughness: 0.2, flatShading: true,
      }));
      innerCore.castShadow = true;
      core.add(innerCore);
      const innerWire = new THREE.Mesh(innerGeometry, new THREE.MeshBasicMaterial({ color: 0xbfdbfe, wireframe: true, transparent: true, opacity: 0.22, toneMapped: false }));
      innerWire.scale.setScalar(1.025);
      core.add(innerWire);
      const coreGlow = glowSprite(0x5577ff, 4.8, 0.24);
      coreGlow.position.z = -0.7;
      core.add(coreGlow);

      const glass = new THREE.Mesh(new RoundedBoxGeometry(2.32, 2.32, 2.32, 5, 0.2), new THREE.MeshPhysicalMaterial({
        color: 0x829ee8, metalness: 0.08, roughness: 0.13, transmission: 0, thickness: 0.9,
        transparent: true, opacity: 0.28, clearcoat: 1, clearcoatRoughness: 0.12,
        side: THREE.DoubleSide, depthWrite: false,
      }));
      glass.renderOrder = 3;
      core.add(glass);
      const coreEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new RoundedBoxGeometry(2.34, 2.34, 2.34, 3, 0.2), 24),
        new THREE.LineBasicMaterial({ color: 0x7da9ff, transparent: true, opacity: 0.62, toneMapped: false }),
      );
      core.add(coreEdges);

      const frameGeometry = new RoundedBoxGeometry(0.12, 0.12, 0.12, 2, 0.025);
      const joints = new THREE.InstancedMesh(frameGeometry, materials.midMetal, 8);
      const jointTransform = new THREE.Object3D();
      let jointIndex = 0;
      for (const x of [-1, 1]) {
        for (const y of [-1, 1]) {
          for (const z of [-1, 1]) {
            jointTransform.position.set(x * 1.05, y * 1.05, z * 1.05);
            jointTransform.updateMatrix();
            joints.setMatrixAt(jointIndex++, jointTransform.matrix);
          }
        }
      }
      core.add(joints);

      const brandMark = new THREE.Group();
      const markMaterial = new THREE.MeshStandardMaterial({ color: 0xe8f2ff, emissive: 0x60a5fa, emissiveIntensity: 1.8, metalness: 0.2, roughness: 0.25 });
      const markStem = new THREE.Mesh(new RoundedBoxGeometry(0.15, 0.76, 0.07, 2, 0.03), markMaterial);
      const markFoot = new THREE.Mesh(new RoundedBoxGeometry(0.53, 0.15, 0.07, 2, 0.03), markMaterial);
      markFoot.position.set(0.19, -0.305, 0);
      brandMark.add(markStem, markFoot);
      brandMark.position.set(-0.1, 0.02, 1.19);
      core.add(brandMark);

      const rings: THREE.Group[] = [];
      function createOrbit(radius: number, color: number, rotation: [number, number, number], speed: number, nodeOffset: number) {
        const orbit = new THREE.Group();
        orbit.rotation.set(...rotation);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 6, 128), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.48, toneMapped: false }));
        orbit.add(ring);
        const arc = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.035, 6, 32, Math.PI * 0.42), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, toneMapped: false }));
        arc.rotation.z = nodeOffset;
        orbit.add(arc);
        const nodePositions: number[] = [];
        for (let i = 0; i < 3; i++) {
          const angle = nodeOffset + (i * TAU) / 3;
          nodePositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        }
        const nodeGeometry = new THREE.BufferGeometry();
        nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
        const nodes = new THREE.Points(nodeGeometry, new THREE.PointsMaterial({
          map: glowTexture, color, size: 0.34, transparent: true, opacity: 0.9,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        }));
        orbit.add(nodes);
        orbit.userData.speed = speed;
        core.add(orbit);
        rings.push(orbit);
      }
      createOrbit(1.6, 0x60a5fa, [1.12, 0.12, 0.22], 1, 0.3);
      createOrbit(1.82, 0x8b5cf6, [0.38, 1.06, -0.35], -1, 2.1);

      // Base hexagonal escalonada y sombra de contacto: anclan el núcleo flotante.
      const base = new THREE.Group();
      base.position.y = -1.82;
      world.add(base);
      const baseMain = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.38, 0.2, 64), materials.darkMetal);
      baseMain.castShadow = true;
      baseMain.receiveShadow = true;
      base.add(baseMain);
      const baseInset = new THREE.Mesh(new THREE.CylinderGeometry(1.68, 1.85, 0.12, 64), materials.black);
      baseInset.position.y = 0.14;
      base.add(baseInset);
      for (const radius of [1.75, 2.16]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 6, 128), new THREE.MeshBasicMaterial({ color: radius < 2 ? 0x8b5cf6 : 0x60a5fa, transparent: true, opacity: 0.65, toneMapped: false }));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.13;
        base.add(ring);
      }
      const ticks = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), materials.midMetal, 24);
      const tickTransform = new THREE.Object3D();
      for (let i = 0; i < 24; i++) {
        const angle = (i * TAU) / 24;
        tickTransform.position.set(Math.cos(angle) * 2.28, 0.02, Math.sin(angle) * 2.28);
        tickTransform.rotation.set(0, -angle, 0);
        tickTransform.scale.set(i % 3 === 0 ? 0.14 : 0.07, 0.035, 0.018);
        tickTransform.updateMatrix();
        ticks.setMatrixAt(i, tickTransform.matrix);
      }
      base.add(ticks);
      const shadowTexture = (() => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.CanvasTexture(canvas);
        const gradient = ctx.createRadialGradient(128, 128, 15, 128, 128, 126);
        gradient.addColorStop(0, 'rgba(0,0,0,.72)');
        gradient.addColorStop(0.5, 'rgba(0,0,0,.32)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(canvas);
      })();
      const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 6.2), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, opacity: 0.7 }));
      contactShadow.rotation.x = -Math.PI / 2;
      contactShadow.position.y = -1.96;
      world.add(contactShadow);

      const inputCards: THREE.Group[] = [];
      const outputCards: THREE.Group[] = [];
      const yLevels = [1.14, 0, -1.14];
      for (let i = 0; i < 3; i++) {
        const input = createCard(initialProcesses[initialProcess].sources[i], 'input', i, new THREE.Vector3(-3.65, yLevels[i], 0.12 - i * 0.08));
        const output = createCard(initialProcesses[initialProcess].results[i], 'output', i, new THREE.Vector3(3.65, yLevels[i], 0.12 - i * 0.08));
        input.rotation.y = 0.08;
        output.rotation.y = -0.08;
        inputCards.push(input);
        outputCards.push(output);
        world.add(input, output);
      }

      const flows: { curve: THREE.CatmullRomCurve3; direction: string }[] = [];
      const packetData: { flowIndex: number; offset: number }[] = [];
      function createFlow(start: THREE.Vector3, end: THREE.Vector3, index: number, direction: string) {
        const side = direction === 'input' ? -1 : 1;
        const midpoint = new THREE.Vector3(side * 2.1, (start.y + end.y) * 0.5 + (index - 1) * 0.08, 0.35 + index * 0.06);
        const curve = new THREE.CatmullRomCurve3([start, midpoint, end]);
        const color = accents[index];
        const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.018, 5, false), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.36, toneMapped: false }));
        world.add(rail);
        const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.065, 5, false), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.055, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
        world.add(halo);
        for (let j = 0; j < 3; j++) packetData.push({ flowIndex: flows.length, offset: j / 3 + index * 0.07 });
        flows.push({ curve, direction });
      }
      for (let i = 0; i < 3; i++) {
        createFlow(new THREE.Vector3(-2.66, yLevels[i], 0.16), new THREE.Vector3(-1.17, yLevels[i] * 0.55, 0.18), i, 'input');
        createFlow(new THREE.Vector3(1.17, yLevels[i] * 0.55, 0.18), new THREE.Vector3(2.66, yLevels[i], 0.16), i, 'output');
      }
      const packetPositions = new Float32Array(packetData.length * 3);
      const packetColors: number[] = [];
      for (const packet of packetData) {
        const color = new THREE.Color(accents[Math.floor(packet.flowIndex / 2)]);
        packetColors.push(color.r, color.g, color.b);
      }
      const packetGeometry = new THREE.BufferGeometry();
      packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
      packetGeometry.setAttribute('color', new THREE.Float32BufferAttribute(packetColors, 3));
      const packetPoints = new THREE.Points(packetGeometry, new THREE.PointsMaterial({
        map: glowTexture, vertexColors: true, size: 0.38, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
      }));
      packetPoints.frustumCulled = false;
      world.add(packetPoints);

      // Contexto espacial: suelo técnico, bloques lejanos y polvo determinista.
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), new THREE.MeshStandardMaterial({ color: 0x111831, transparent: true, opacity: 0.18, roughness: 1, depthWrite: false }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2.04;
      floor.receiveShadow = true;
      scene.add(floor);
      const grid = new THREE.GridHelper(90, 90, 0x31517c, 0x233554);
      grid.position.y = -2.025;
      const gridMaterial = grid.material as THREE.Material;
      gridMaterial.transparent = true;
      gridMaterial.opacity = 0.15;
      gridMaterial.depthWrite = false;
      scene.add(grid);

      const rand = mulberry32(SEED);
      const distantMaterial = new THREE.MeshStandardMaterial({ color: 0x1c2948, metalness: 0.4, roughness: 0.8, transparent: true, opacity: 0.34 });
      const distantBlocks = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), distantMaterial, 18);
      const distantTransform = new THREE.Object3D();
      for (let i = 0; i < 18; i++) {
        const h = 0.4 + rand() * 2.2;
        distantTransform.position.set((rand() - 0.5) * 34, -2 + h / 2, -10 - rand() * 22);
        distantTransform.scale.set(0.5 + rand() * 1.1, h, 0.5 + rand());
        distantTransform.updateMatrix();
        distantBlocks.setMatrixAt(i, distantTransform.matrix);
      }
      scene.add(distantBlocks);
      const dustPositions: number[] = [];
      for (let i = 0; i < 100; i++) {
        dustPositions.push((rand() - 0.5) * 22, rand() * 8 - 2, (rand() - 0.5) * 12 - 2);
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3));
      const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x93b4ff, size: 0.026, transparent: true, opacity: 0.42, depthWrite: false, toneMapped: false }));
      scene.add(dust);

      function updateProcess(index: number) {
        const process = latestProcessesSafe(index);
        for (let i = 0; i < 3; i++) {
          for (const [card, text] of [[inputCards[i], process.sources[i]], [outputCards[i], process.results[i]]] as const) {
            const material = card.userData.faceMaterial as THREE.MeshBasicMaterial;
            const previous = material.map;
            material.map = cardTexture(text, card.userData.type as 'input' | 'output', card.userData.index as number);
            material.needsUpdate = true;
            previous?.dispose();
          }
        }
      }

      function latestProcessesSafe(index: number) {
        const list = latestRef.current.processes;
        return list[index] ?? list[0];
      }

      function sample(t: number) {
        const loop = ((t % DURATION) + DURATION) % DURATION;
        const progress = loop / DURATION;
        const phase = progress * TAU;
        core.position.y = 0.05 + Math.sin(phase) * 0.1;
        innerCore.rotation.set(phase * 0.5, phase, Math.sin(phase) * 0.15);
        innerWire.rotation.copy(innerCore.rotation);
        rings[0].rotation.z = 0.22 + phase;
        rings[1].rotation.z = -0.35 - phase;
        brandMark.position.y = 0.02 + Math.sin(phase * 2) * 0.025;
        dust.rotation.y = Math.sin(phase) * 0.025;
        for (let i = 0; i < packetData.length; i++) {
          const packet = packetData[i];
          const point = flows[packet.flowIndex].curve.getPointAt((progress + packet.offset) % 1);
          packetPositions[i * 3] = point.x;
          packetPositions[i * 3 + 1] = point.y;
          packetPositions[i * 3 + 2] = point.z;
        }
        packetGeometry.getAttribute('position').needsUpdate = true;
      }

      function resetCamera() {
        const width = Math.max(1, mountEl.clientWidth);
        const height = Math.max(1, mountEl.clientHeight);
        const aspect = width / height;
        renderer.setSize(width, height, false);
        camera.aspect = aspect;
        const distance = aspect < 0.82 ? 23 : aspect < 1.15 ? 19.2 : 12.8;
        const direction = new THREE.Vector3(0.32, 0.24, 1).normalize();
        camera.position.copy(controls.target).addScaledVector(direction, distance);
        camera.lookAt(controls.target);
        camera.updateProjectionMatrix();
        controls.update();
      }

      function draw() {
        controls.update();
        renderer.render(scene, camera);
      }

      let simT = 0;
      let accumulator = 0;
      const clock = new THREE.Clock();
      const STEP = 1 / 60;

      function start() {
        accumulator = 0;
        clock.getDelta();
        renderer.setAnimationLoop(() => {
          const delta = Math.min(clock.getDelta(), 0.1);
          if (!document.hidden) {
            accumulator += delta;
            while (accumulator >= STEP) {
              accumulator -= STEP;
              simT += STEP;
            }
            sample(simT);
          }
          draw();
        });
      }

      function stop() {
        renderer.setAnimationLoop(null);
      }

      const onVisibilityChange = () => {
        clock.getDelta();
        accumulator = 0;
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      const resizeObserver = new ResizeObserver(() => {
        resetCamera();
        draw();
      });
      resizeObserver.observe(mountEl);

      engineRef.current = {
        setProcess(index: number) {
          updateProcess(index);
          draw();
        },
        setActive(value: boolean) {
          if (value) start();
          else stop();
        },
      };

      disposeScene = () => {
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        engineRef.current = null;
        stop();
        controls.dispose();
        scene.traverse((object) => {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
          if (Array.isArray(material)) {
            material.forEach((entry) => {
              (entry as THREE.Material & { map?: THREE.Texture | null }).map?.dispose();
              entry.dispose();
            });
          } else if (material) {
            (material as THREE.Material & { map?: THREE.Texture | null }).map?.dispose();
            material.dispose();
          }
        });
        glowTexture.dispose();
        shadowTexture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };

      resetCamera();
      updateProcess(latestRef.current.processIndex);
      sample(0);
      draw();
      onReadyRef.current();
      if (latestRef.current.active) start();
    })();

    return () => {
      cancelled = true;
      disposeScene?.();
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setProcess(processIndex);
  }, [processIndex]);

  useEffect(() => {
    engineRef.current?.setActive(active);
  }, [active]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
