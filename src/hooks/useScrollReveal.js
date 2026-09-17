import { useEffect } from 'react';

export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    let observer = null;
    let animId = null;

    animId = requestAnimationFrame(() => {
      const items = document.querySelectorAll('.reveal:not(.visible)');
      if (!items.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '80px 0px 40px 0px' }
      );

      items.forEach((el) => observer.observe(el));
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
    };
  }, dependencies);
}
