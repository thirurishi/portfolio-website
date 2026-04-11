'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 3.5;
      });
    }, 40);

    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-975"
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Royal dot-grid texture */}
          <div className="pointer-events-none absolute inset-0 royal-texture opacity-60" />

          {/* Scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-10 h-px"
            style={{
              background: 'rgba(212,175,55,0.9)',
              boxShadow: '0 0 12px rgba(212,175,55,0.6)',
            }}
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, ease: 'linear', repeat: Infinity, repeatDelay: 0.3 }}
          />

          {/* Corner brackets — cinematic framing */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute h-8 w-8 border-midnight-400/50 ${cls}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center select-none">

            {/* TK initials */}
            <div className="relative mb-5 flex items-end gap-3">
              {['T', 'K'].map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-black text-white"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(5rem, 14vw, 9rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                  }}
                  initial={{ opacity: 0, y: 48, filter: 'blur(16px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}

            </div>

            {/* Name */}
            <motion.p
              className="mb-10 font-mono text-[11px] uppercase tracking-[0.55em] text-slate-400"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Thirumurugan Kumar
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="relative h-[2px] w-52 overflow-hidden rounded-full bg-navy-800"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-midnight-400"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 8px rgba(212,175,55,0.7)',
                }}
              />
            </motion.div>

            {/* Progress number */}
            <motion.p
              className="mt-3 font-mono text-[10px] tabular-nums text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.min(Math.round(progress), 100).toString().padStart(3, '0')}
            </motion.p>
          </div>

          {/* Bottom label */}
          <motion.p
            className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.45em] text-navy-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Portfolio · Data Science · AI
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
