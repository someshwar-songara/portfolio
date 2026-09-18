import { useState, useEffect, useRef } from 'react';

export default function PencilCursor() {
  const penRef = useRef(null);
  const badgeTextRef = useRef(null);
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
    let writingTimer = null;

    const interactive =
      'a, button, input, textarea, .nav-link, .nav-toggle, .theme-toggle, .project-card, .skill-chip, .info-card, .social-link, .btn-primary, .btn-outline, .contact-submit, .bring-card, .timeline-note, .hero-info-note, .tech-badge, .avatar-frame';

    function isInteractiveTarget(target) {
      if (!target || target === document.body || target === document.documentElement) return false;
      const tag = target.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return true;
      return Boolean(target.closest && target.closest(interactive));
    }

    function setWritingText(text) {
      if (badgeTextRef.current && badgeTextRef.current.textContent !== text) {
        badgeTextRef.current.textContent = text;
      }
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

      // Trigger writing animation wiggle
      penCursor.classList.add('is-writing');
      clearTimeout(writingTimer);
      writingTimer = setTimeout(() => {
        penCursor.classList.remove('is-writing');
      }, 160);

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
      const target = e.target;
      if (isInteractiveTarget(target)) {
        penCursor.classList.add('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.add('is-hovering'));

        // Dynamic contextual writing text
        if (target.closest('#projects')) {
          setWritingText('sketching project 📐');
        } else if (target.closest('#skills')) {
          setWritingText('sharpening skills ⚡');
        } else if (target.closest('#contact')) {
          setWritingText('writing a note 💌');
        } else if (target.closest('.theme-toggle')) {
          setWritingText('flipping page 🌓');
        } else if (target.closest('input, textarea')) {
          setWritingText('typing thoughts ✍️');
        } else if (target.closest('a, button')) {
          setWritingText('click! ✦');
        } else {
          setWritingText('writing... ✍️');
        }
      }
    }

    function onElementLeave(e) {
      if (isInteractiveTarget(e.target)) {
        penCursor.classList.remove('is-hovering');
        dotsRef.current.forEach((d) => d && d.classList.remove('is-hovering'));
        setWritingText('drafting... ✍️');
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
      clearTimeout(writingTimer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
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

        {/* Floating handwritten tag attached to the pencil */}
        <div className="pencil-writing-badge" aria-hidden="true">
          <span ref={badgeTextRef}>drafting... ✍️</span>
        </div>
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
