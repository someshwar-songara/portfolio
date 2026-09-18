import { useState, useEffect, useRef } from 'react';

export default function PencilCursor() {
  const penRef = useRef(null);
  const dotsRef = useRef([]);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastDrawPos = useRef({ x: 0, y: 0 });

  const [enabled, setEnabled] = useState(false);
  const [hasDrawings, setHasDrawings] = useState(false);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const timer = setTimeout(() => {
      setEnabled(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Canvas size and DPR scaling
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [enabled]);

  // Main Cursor and Left-click Drawing
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
    let writingTimer = null;

    const interactive =
      'a, button, input, textarea, .nav-link, .nav-toggle, .theme-toggle, .project-card, .skill-chip, .info-card, .social-link, .btn-primary, .btn-outline, .contact-submit, .bring-card, .timeline-note, .hero-info-note, .tech-badge, .avatar-frame, .pencil-clear-btn';

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

      // Left-click Drawing on canvas
      if (isDrawingRef.current && (e.buttons & 1)) {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
            ctx.strokeStyle = isDarkTheme ? '#fef08a' : '#292524';
            ctx.lineWidth = 2.4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = isDarkTheme ? 'rgba(254, 240, 138, 0.4)' : 'rgba(41, 37, 36, 0.25)';
            ctx.shadowBlur = 1.5;

            ctx.beginPath();
            ctx.moveTo(lastDrawPos.current.x, lastDrawPos.current.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();

            lastDrawPos.current = { x: e.clientX, y: e.clientY };
          }
        }
      } else if (isDrawingRef.current && !(e.buttons & 1)) {
        isDrawingRef.current = false;
        document.body.classList.remove('is-pencil-drawing');
        penCursor.classList.remove('is-drawing');
      }

      // Natural pencil wiggle while moving
      if (!isDrawingRef.current) {
        penCursor.classList.add('is-writing');
        clearTimeout(writingTimer);
        writingTimer = setTimeout(() => {
          penCursor.classList.remove('is-writing');
        }, 160);
      }

      clearTimeout(idleTimer);
      penCursor.classList.remove('is-idle');
      idleTimer = setTimeout(() => {
        penCursor.classList.add('is-idle');
        penCursor.classList.remove('is-writing');
      }, 1400);
    }

    function onMouseLeave() {
      penCursor.style.opacity = '0';
      dotsRef.current.forEach((d) => {
        if (d) d.style.opacity = '0';
      });
      isVisible = false;
      if (isDrawingRef.current) {
        isDrawingRef.current = false;
        document.body.classList.remove('is-pencil-drawing');
        penCursor.classList.remove('is-drawing');
      }
    }

    function onPointerDown(e) {
      if (!isVisible) return;

      // Left click (button 0): Start pencil writing on screen
      if (e.button === 0) {
        const tag = e.target ? e.target.tagName : '';
        // If clicking directly in text input or textarea, let user type normally
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        isDrawingRef.current = true;
        lastDrawPos.current = { x: e.clientX, y: e.clientY };
        document.body.classList.add('is-pencil-drawing');
        penCursor.classList.add('is-drawing');
        setHasDrawings(true);
      }

      // Normal click ripple
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

    function onPointerUp(e) {
      if (e.button === 0 || isDrawingRef.current) {
        isDrawingRef.current = false;
        document.body.classList.remove('is-pencil-drawing');
        penCursor.classList.remove('is-drawing');
      }
      penCursor.classList.remove('is-clicking');
    }

    // Disable text selection while drawing so text does not turn blue
    function onSelectStart(e) {
      if (isDrawingRef.current) {
        e.preventDefault();
      }
    }

    function onElementEnter(e) {
      if (isDrawingRef.current) return;
      if (isInteractiveTarget(e.target)) {
        penCursor.classList.add('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.add('is-hovering'));
      }
    }

    function onElementLeave(e) {
      if (isDrawingRef.current) return;
      if (isInteractiveTarget(e.target)) {
        penCursor.classList.remove('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.remove('is-hovering'));
      }
    }

    // Attach listeners
    const initTimer = setTimeout(() => {
      document.addEventListener('mousemove', onMouseMove, { passive: false });
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('selectstart', onSelectStart);
      document.addEventListener('mouseover', onElementEnter, { passive: true });
      document.addEventListener('mouseout', onElementLeave, { passive: true });
    }, 300);

    return () => {
      clearTimeout(initTimer);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseover', onElementEnter);
      document.removeEventListener('mouseout', onElementLeave);
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
      clearTimeout(writingTimer);
      document.body.classList.remove('is-pencil-drawing');
    };
  }, [enabled]);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setHasDrawings(false);
  };

  if (!enabled) return null;

  return (
    <>
      {/* Real Full-Screen Pencil Sketch Canvas */}
      <canvas
        ref={canvasRef}
        className="pencil-drawing-canvas"
        aria-hidden="true"
      />

      {/* Floating Clear Sketch Button */}
      {hasDrawings && (
        <button
          type="button"
          className="pencil-clear-btn"
          onClick={handleClearCanvas}
          title="Clear screen drawings"
          aria-label="Clear screen drawings"
        >
          🧹 Clear sketch
        </button>
      )}

      {/* Clean Pencil Cursor without floating tags */}
      <div ref={penRef} className="pencil-cursor">
        <svg className="pencil-nib-svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          {/* Sharp graphite tip pointing precisely at (1.5, 1.5) */}
          <polygon points="1.5,1.5 6.5,2.5 2.5,6.5" fill="#1c1917" />
          {/* Sharpened wooden cone */}
          <polygon points="2.5,6.5 6.5,2.5 12,8 8,12" fill="#fed7aa" stroke="#d97706" strokeWidth="0.6" strokeLinejoin="round" />
          {/* Classic yellow hexagonal pencil body */}
          <polygon points="8,12 12,8 20,16 16,20" fill="#facc15" stroke="#ca8a04" strokeWidth="0.6" strokeLinejoin="round" />
          {/* Pencil core highlight line */}
          <line x1="10" y1="10" x2="18" y2="18" stroke="#fef08a" strokeWidth="0.8" opacity="0.8" />
          {/* Silver ferrule metal band */}
          <polygon points="16,20 20,16 22.5,18.5 18.5,22.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" strokeLinejoin="round" />
          {/* Coral pink eraser */}
          <polygon points="18.5,22.5 22.5,18.5 25.5,21.5 21.5,25.5" fill="#fb7185" stroke="#e11d48" strokeWidth="0.6" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 6-dot Ink Trail */}
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
