import { useState, useEffect, useRef } from 'react';

export default function PencilCursor() {
  const penRef = useRef(null);
  const dotsRef = useRef([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const timer = setTimeout(() => {
      setEnabled(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const penCursor = penRef.current;
    if (!penCursor) return;

    const TRAIL_COUNT = 6;
    const trailFactors = [0.35, 0.26, 0.18, 0.12, 0.08, 0.05];
    const trailPoints = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));
    const mouse = { x: -100, y: -100 };
    let isVisible = false;
    let animId = null;
    let idleTimer = null;

    const interactive =
      'a, button, input, textarea, .nav-link, .nav-toggle, .theme-toggle, .project-card, .skill-chip, .info-card, .social-link, .btn-primary, .btn-outline, .contact-submit, .bring-card, .timeline-note, .hero-info-note, .tech-badge, .avatar-frame';

    function isInteractiveTarget(target) {
      if (!target || target === document.body || target === document.documentElement) return false;
      const tag = target.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return true;
      return Boolean(target.closest && target.closest(interactive));
    }

    function render() {
      penCursor.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;

      let maxDelta = 0;
      for (let j = 0; j < TRAIL_COUNT; j++) {
        const targetX = j === 0 ? mouse.x : trailPoints[j - 1].x;
        const targetY = j === 0 ? mouse.y : trailPoints[j - 1].y;
        const factor = trailFactors[j];

        trailPoints[j].x += (targetX - trailPoints[j].x) * factor;
        trailPoints[j].y += (targetY - trailPoints[j].y) * factor;

        const dot = dotsRef.current[j];
        if (dot) {
          dot.style.transform = `translate3d(${trailPoints[j].x}px, ${trailPoints[j].y}px, 0)`;
        }

        const delta = Math.abs(targetX - trailPoints[j].x) + Math.abs(targetY - trailPoints[j].y);
        if (delta > maxDelta) maxDelta = delta;
      }

      if (maxDelta > 0.08) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    }

    function startAnimation() {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        for (let k = 0; k < TRAIL_COUNT; k++) {
          trailPoints[k].x = mouse.x;
          trailPoints[k].y = mouse.y;
        }
        penCursor.style.opacity = '1';
        dotsRef.current.forEach((d) => {
          if (d) d.style.opacity = '1';
        });
        isVisible = true;
      }

      startAnimation();

      clearTimeout(idleTimer);
      penCursor.classList.remove('is-idle');
      idleTimer = setTimeout(() => {
        penCursor.classList.add('is-idle');
      }, 1600);
    }

    function onMouseLeave() {
      penCursor.style.opacity = '0';
      dotsRef.current.forEach((d) => {
        if (d) d.style.opacity = '0';
      });
      isVisible = false;
    }

    function onPointerDown(e) {
      if (!isVisible) return;
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      penCursor.classList.add('is-clicking');

      setTimeout(() => {
        ripple.remove();
      }, 550);
    }

    function onPointerUp() {
      penCursor.classList.remove('is-clicking');
    }

    function onElementEnter(e) {
      if (isInteractiveTarget(e.target)) {
        penCursor.classList.add('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.add('is-hovering'));
      }
    }

    function onElementLeave(e) {
      if (isInteractiveTarget(e.target)) {
        penCursor.classList.remove('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.remove('is-hovering'));
      }
    }

    // Attach listeners after micro-delay to not block hydration/initial paint
    const initTimer = setTimeout(() => {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('mouseover', onElementEnter, { passive: true });
      document.addEventListener('mouseout', onElementLeave, { passive: true });
    }, 300);

    return () => {
      clearTimeout(initTimer);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseover', onElementEnter);
      document.removeEventListener('mouseout', onElementLeave);
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={penRef} className="pencil-cursor">
        <svg className="pencil-nib-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M1 1L6.5 2.8L18.5 14.8L14.8 18.5L2.8 6.5L1 1Z"
            fill="url(#pencilTipGrad)"
            stroke="#1c1917"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M14 10.5L10.5 14" stroke="#1c1917" strokeWidth="1.2" />
          <circle cx="1.8" cy="1.8" r="1.2" fill="#dc2626" />
          <defs>
            <linearGradient id="pencilTipGrad" x1="1" y1="1" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.5" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {[1, 2, 3, 4, 5, 6].map((num, i) => (
        <div
          key={num}
          ref={(el) => (dotsRef.current[i] = el)}
          className={`cursor-trail-dot cursor-trail-dot--${num}`}
        />
      ))}
    </>
  );
}
