import { useEffect, useRef } from 'react';

/**
 * useTilt3D — Physics-based interactive 3D card tilt & dynamic specular glare
 * @param {Object} options
 * @param {number} options.max - Maximum tilt angle in degrees (default: 10)
 * @param {number} options.perspective - 3D perspective in px (default: 1000)
 * @param {number} options.scale - Scale factor on hover (default: 1.025)
 * @param {boolean} options.glare - Whether to render dynamic light glare (default: true)
 */
export function useTilt3D(options = {}) {
  const ref = useRef(null);
  const { max = 8, perspective = 1000, scale = 1.025, glare = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch/mobile devices or reduced motion to preserve battery and performance
    if (window.matchMedia && (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )) {
      return;
    }

    let rect = el.getBoundingClientRect();
    let animId = null;

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    const onMouseEnter = () => {
      rect = el.getBoundingClientRect();
      el.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
    };

    const onMouseMove = (e) => {
      if (animId) cancelAnimationFrame(animId);

      animId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const rotateX = -(percentY * max).toFixed(2);
        const rotateY = (percentX * max).toFixed(2);

        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

        if (glare) {
          const glareX = ((x / rect.width) * 100).toFixed(1);
          const glareY = ((y / rect.height) * 100).toFixed(1);
          el.style.setProperty('--glare-x', `${glareX}%`);
          el.style.setProperty('--glare-y', `${glareY}%`);
          el.style.setProperty('--glare-opacity', '0.22');
        }
      });
    };

    const onMouseLeave = () => {
      if (animId) cancelAnimationFrame(animId);
      el.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.45s ease-out';
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) rotate(var(--card-rotate, 0deg))`;

      if (glare) {
        el.style.setProperty('--glare-opacity', '0');
      }
    };

    el.addEventListener('mouseenter', onMouseEnter, { passive: true });
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.style.transform = '';
      el.style.transition = '';
    };
  }, [max, perspective, scale, glare]);

  return ref;
}
