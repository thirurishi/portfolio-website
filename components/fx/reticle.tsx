'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

type Mode = 'idle' | 'link' | 'view';

/**
 * Camera focus-reticle cursor. Only active on devices with a fine pointer
 * (mouse/trackpad) and when the visitor has not asked for reduced motion.
 */
export function Reticle() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');
  const [label, setLabel] = useState('');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add('has-reticle');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, [role="button"]');
      if (!target) {
        setMode('idle');
        return;
      }
      const custom = target.getAttribute('data-cursor');
      if (custom) {
        setMode('view');
        setLabel(custom);
      } else {
        setMode('link');
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-reticle');
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === 'view' ? 84 : mode === 'link' ? 26 : 40;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]" style={{ opacity: visible ? 1 : 0 }}>
      {/* Exact centre dot */}
      <motion.div
        className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-safelight-500"
        style={{ x, y }}
      />
      {/* Focus brackets */}
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{ width: size, height: size }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map(
            (c) => (
              <span
                key={c}
                className={`absolute h-2.5 w-2.5 ${c} ${mode === 'idle' ? 'border-paper-200/70' : 'border-safelight-400'}`}
              />
            )
          )}
          {mode === 'view' ? (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.25em] text-paper-100">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
