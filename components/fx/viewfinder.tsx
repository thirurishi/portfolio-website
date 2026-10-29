'use client';

import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const ISO = [100, 200, 400, 800, 1600, 3200];
const APERTURE = ['1.4', '2', '2.8', '4', '5.6', '8'];
const SHUTTER = ['1/50', '1/125', '1/250', '1/500', '1/1000', '1/2000'];

/** Camera viewfinder HUD: corner brackets, REC + running timecode, live exposure readouts. */
export function Viewfinder() {
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [stop, setStop] = useState(2);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(ISO.length - 1, Math.max(0, Math.round(2 + v * 6)));
    setStop((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (reduce) {
      if (timecodeRef.current) timecodeRef.current.textContent = '00:00:00:00';
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const frames = Math.floor((t % 1) * 24);
      const secs = Math.floor(t) % 60;
      const mins = Math.floor(t / 60) % 60;
      const hrs = Math.floor(t / 3600);
      if (timecodeRef.current) {
        timecodeRef.current.textContent = [hrs, mins, secs, frames].map((n) => String(n).padStart(2, '0')).join(':');
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const corner = 'absolute h-8 w-8 border-paper-100/60 sm:h-12 sm:w-12';

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] font-mono text-[10px] uppercase tracking-[0.22em] text-paper-100/80 sm:text-[11px]">
      <div className="absolute inset-x-4 bottom-4 top-20 sm:inset-x-8 sm:bottom-8 sm:top-24">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />

        {/* Top-left: REC and timecode */}
        <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
          <span className="fx-rec inline-block h-2 w-2 rounded-full bg-safelight-500" />
          <span className="text-safelight-300">Rec</span>
          <span ref={timecodeRef} className="tabular-nums text-paper-100/80">
            00:00:00:00
          </span>
        </div>

        {/* Top-right: format */}
        <div className="absolute right-4 top-4 hidden items-center gap-4 sm:right-6 sm:top-6 sm:flex">
          <span>4K</span>
          <span>24 fps</span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-5 border border-paper-100/70 p-[1px]">
              <span className="block h-full w-3/4 bg-paper-100/70" />
            </span>
          </span>
        </div>

        {/* Centre focus mark */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-paper-100/30" />
          <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-y-1/2 bg-paper-100/30" />
        </div>

        {/* Bottom: exposure readouts change with scroll */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="flex items-center gap-4 tabular-nums sm:gap-6">
            <span>ISO {ISO[stop]}</span>
            <span>f/{APERTURE[stop]}</span>
            <span className="hidden sm:inline">{SHUTTER[stop]}</span>
          </div>
          <div className="hidden items-end gap-[3px] sm:flex">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={`w-[2px] ${i === 4 ? 'h-3 bg-safelight-400' : 'h-2 bg-paper-100/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
