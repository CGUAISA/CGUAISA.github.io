import { useEffect } from 'react';

/** Enable one-shot reveals while keeping the page usable without motion support. */
export function useScrollReveal(): void {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;

    const showAll = () => {
      observer?.disconnect();
      observer = null;
      elements.forEach((element) => element.classList.add('is-visible'));
      root.classList.remove('motion-ready');
    };

    const enableReveals = () => {
      observer?.disconnect();

      if (motionPreference.matches || !('IntersectionObserver' in window)) {
        showAll();
        return;
      }

      // Mark anything already on screen before enabling the hiding styles.
      // This also handles refreshes at a restored scroll position.
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (
          bounds.top < viewportHeight &&
          bounds.bottom > 0 &&
          bounds.left < viewportWidth &&
          bounds.right > 0
        ) {
          element.classList.add('is-visible');
        }
      });

      observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              activeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );

      elements.forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          observer?.observe(element);
        }
      });
      root.classList.add('motion-ready');
    };

    enableReveals();
    motionPreference.addEventListener('change', enableReveals);

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', enableReveals);
      root.classList.remove('motion-ready');
    };
  }, []);
}
