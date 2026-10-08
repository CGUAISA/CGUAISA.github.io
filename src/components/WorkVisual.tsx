import { useEffect, useRef } from 'react';
import { BookOpen, MessageCircle, Users } from 'lucide-react';

export default function WorkVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const scaleElement = scaleRef.current;
    if (!visual || !scaleElement) return;

    const desktop = window.matchMedia('(min-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    let frame: number | null = null;
    let inView = false;
    let enabled = false;

    const updateScale = () => {
      frame = null;
      if (!enabled || !inView) return;

      const bounds = visual.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (bounds.bottom <= 0 || bounds.top >= viewportHeight) return;

      const center = bounds.top + bounds.height / 2;
      const travel = (viewportHeight + bounds.height) / 2;
      const distance = Math.min(1, Math.abs(center - viewportHeight / 2) / travel);
      const scale = 0.94 + (1 - distance) * 0.115;
      scaleElement.style.setProperty('--scroll-scale', scale.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (enabled && inView && frame === null) {
        frame = window.requestAnimationFrame(updateScale);
      }
    };

    const stop = () => {
      enabled = false;
      observer?.disconnect();
      observer = null;
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      scaleElement.style.removeProperty('--scroll-scale');
    };

    const synchronizeMotion = () => {
      stop();
      if (!desktop.matches || reducedMotion.matches) return;

      enabled = true;
      const bounds = visual.getBoundingClientRect();
      inView = bounds.bottom > 0 && bounds.top < window.innerHeight;

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) scheduleUpdate();
        });
        observer.observe(visual);
      } else {
        // Without an observer, the throttled update checks viewport bounds itself.
        inView = true;
      }

      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      scheduleUpdate();
    };

    synchronizeMotion();
    desktop.addEventListener('change', synchronizeMotion);
    reducedMotion.addEventListener('change', synchronizeMotion);

    return () => {
      stop();
      desktop.removeEventListener('change', synchronizeMotion);
      reducedMotion.removeEventListener('change', synchronizeMotion);
    };
  }, []);

  return (
    <div className="work-visual" ref={visualRef} aria-hidden="true">
      <div className="work-visual-scale" ref={scaleRef}>
        <svg className="work-emblem" viewBox="0 0 320 320" fill="none">
          <circle className="work-emblem-ring" cx="160" cy="160" r="126" stroke="currentColor" />
          <circle className="work-emblem-ring" cx="160" cy="160" r="104" stroke="currentColor" />
          <ellipse
            className="work-emblem-orbit"
            cx="160"
            cy="160"
            rx="144"
            ry="67"
            transform="rotate(-34 160 160)"
            stroke="currentColor"
          />
          <ellipse
            className="work-emblem-orbit"
            cx="160"
            cy="160"
            rx="141"
            ry="66"
            transform="rotate(46 160 160)"
            stroke="currentColor"
          />
          <circle className="work-emblem-dot" cx="67" cy="75" r="5" fill="currentColor" />
          <circle className="work-emblem-dot" cx="277" cy="207" r="4" fill="currentColor" />
          <circle className="work-emblem-dot" cx="93" cy="267" r="3" fill="currentColor" />
          <text
            className="work-emblem-monogram"
            x="160"
            y="196"
            textAnchor="middle"
            fill="currentColor"
            fontSize="116"
            fontFamily="Georgia, serif"
          >
            A
          </text>
        </svg>
        <div className="work-orbit-card orbit-card-one">
          <Users size={19} strokeWidth={1.6} />
          <span>交流</span>
        </div>
        <div className="work-orbit-card orbit-card-two">
          <BookOpen size={19} strokeWidth={1.6} />
          <span>學習</span>
        </div>
        <div className="work-orbit-card orbit-card-three">
          <MessageCircle size={19} strokeWidth={1.6} />
          <span>回饋</span>
        </div>
        <span className="work-visual-caption">CGU AISA</span>
      </div>
    </div>
  );
}
