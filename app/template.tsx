'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Shutter transition: every page change opens like a camera shutter
 * (two blades parting from the middle of the screen).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <>
      {children}
      {reduce ? null : (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] motion-reduce:hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink-975"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-975"
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
          />
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-safelight-500"
            initial={{ scaleX: 1, opacity: 1 }}
            animate={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          />
        </div>
      )}
    </>
  );
}
