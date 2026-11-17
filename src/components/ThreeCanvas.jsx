import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ isDark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let isVisible = true;
    let animId = null;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Helper to generate radial star sprites ──
    const createStarTexture = (innerColor, outerColor, size = 32) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const center = size / 2;
      const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, innerColor);
      grad.addColorStop(0.55, outerColor);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center, center, center, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    // Color definitions based on theme
    const innerGlow = isDark ? 'rgba(0, 242, 254, 0.95)' : 'rgba(245, 158, 11, 0.9)';
    const outerGlow = isDark ? 'rgba(139, 92, 246, 0.45)' : 'rgba(234, 88, 12, 0.4)';
    const bgInnerGlow = isDark ? 'rgba(167, 139, 250, 0.8)' : 'rgba(251, 191, 36, 0.75)';

    const fgTexture = createStarTexture(innerGlow, outerGlow, 32);
    const bgTexture = createStarTexture(bgInnerGlow, 'rgba(0, 0, 0, 0)', 24);

    // ── Layer 1: Foreground Interactive Stars (180 stars) ──
    const fgCount = 180;
    const fgGeometry = new THREE.BufferGeometry();
    const fgPositions = new Float32Array(fgCount * 3);
    const fgBase = [];

    for (let i = 0; i < fgCount; i++) {
      const x = (Math.random() - 0.5) * 54;
      const y = (Math.random() - 0.5) * 36;
      const z = (Math.random() - 0.5) * 22;
      fgPositions[i * 3] = x;
      fgPositions[i * 3 + 1] = y;
      fgPositions[i * 3 + 2] = z;
      fgBase.push({
        x,
        y,
        z,
        speed: 0.2 + Math.random() * 0.45,
        twinkleSpeed: 1.2 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    fgGeometry.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));

    const fgMaterial = new THREE.PointsMaterial({
      size: isDark ? 0.95 : 0.85,
      map: fgTexture,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const fgParticles = new THREE.Points(fgGeometry, fgMaterial);
    scene.add(fgParticles);

    // ── Layer 2: Deep Background Micro-Stars (120 stars) ──
    const bgCount = 120;
    const bgGeometry = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgCount * 3);
    const bgBase = [];

    for (let i = 0; i < bgCount; i++) {
      const x = (Math.random() - 0.5) * 68;
      const y = (Math.random() - 0.5) * 46;
      const z = (Math.random() - 0.5) * 32 - 4;
      bgPositions[i * 3] = x;
      bgPositions[i * 3 + 1] = y;
      bgPositions[i * 3 + 2] = z;
      bgBase.push({
        x,
        y,
        z,
        speed: 0.1 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

    const bgMaterial = new THREE.PointsMaterial({
      size: isDark ? 0.48 : 0.4,
      map: bgTexture,
      transparent: true,
      opacity: isDark ? 0.55 : 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgParticles);

    // Mouse tracking for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize, { passive: true });

    // IntersectionObserver to pause rendering when offscreen (0% GPU wasted)
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Subtle particle float for Layer 1 (Foreground)
      const fgArr = fgGeometry.attributes.position.array;
      for (let i = 0; i < fgCount; i++) {
        const bp = fgBase[i];
        fgArr[i * 3 + 1] = bp.y + Math.sin(elapsedTime * bp.speed + bp.phase) * 0.7;
        fgArr[i * 3] = bp.x + Math.cos(elapsedTime * (bp.speed * 0.5) + bp.phase) * 0.45;
      }
      fgGeometry.attributes.position.needsUpdate = true;

      // Gentle drift for Layer 2 (Deep Background)
      const bgArr = bgGeometry.attributes.position.array;
      for (let i = 0; i < bgCount; i++) {
        const bp = bgBase[i];
        bgArr[i * 3 + 1] = bp.y + Math.sin(elapsedTime * bp.speed + bp.phase) * 0.35;
      }
      bgGeometry.attributes.position.needsUpdate = true;

      // Subtle twinkling on foreground stars
      fgMaterial.opacity = (isDark ? 0.8 : 0.6) + Math.sin(elapsedTime * 1.8) * 0.12;

      // Camera parallax
      camera.position.x = targetX * 1.6;
      camera.position.y = targetY * 1.1;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries, materials and textures
      fgGeometry.dispose();
      fgMaterial.dispose();
      fgTexture.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      bgTexture.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="three-canvas-container"
      aria-hidden="true"
    />
  );
}
