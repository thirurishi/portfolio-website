'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { markIntroDone, markIntroPlaying } from '@/lib/intro';

const SEEN_KEY = 'tk-intro-seen';
const DEVELOP_MS = 2100;
const TOTAL_MS = 2900;

type Phase = 'safelight' | 'developing' | 'lights';

// Decided once per page load (survives React's double effect run in development).
let decision: boolean | null = null;

/**
 * Opening sequence: a darkroom safelight comes on and a print of the
 * portrait and name develops in the tray, then the room lights switch on.
 * Shown once per browser session; skipped entirely for reduced motion.
 */
export function DevelopingIntro() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<Phase>('safelight');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (decision === null) {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === '1';
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* storage unavailable: just play the intro */
      }
      decision = !(reduce || seen);
    }
    if (!decision) {
      setShow(false);
      return;
    }

    markIntroPlaying();
    document.documentElement.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase('developing'), 250);
    const t2 = setTimeout(() => {
      setPhase('lights');
      markIntroDone();
    }, DEVELOP_MS);
    const t3 = setTimeout(() => setShow(false), TOTAL_MS);
    const tick = setInterval(() => setSeconds((s) => Math.min(s + 1, 45)), 45);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(tick);
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = '';
      if (window.__tkIntroPlaying) markIntroDone();
    }
  }, [show]);

  const developing = phase !== 'safelight';

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden motion-reduce:hidden"
          style={{ backgroundColor: '#120403' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Opening animation"
          role="presentation"
        >
          {/* Safelight glow */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 18%, rgba(226,53,43,0.38), rgba(120,15,10,0.18) 45%, rgba(18,4,3,0) 75%)'
            }}
          />

          {/* Developer tray */}
          <div className="relative flex flex-col items-center px-6">
            <div className="relative rounded-[6px] border border-safelight-900/80 p-5 sm:p-7" style={{ backgroundColor: 'rgba(40,8,6,0.65)' }}>
              {/* Ripples on the developer liquid */}
              <motion.div
                className="pointer-events-none absolute inset-2 rounded-[4px] border border-safelight-700/25"
                animate={{ scale: [1, 1.015, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* The print */}
              <div className="relative flex w-[min(78vw,340px)] flex-col bg-[#e9ddd2] p-3 pb-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e9ddd2]">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, filter: 'grayscale(1) contrast(0.6) brightness(1.8) blur(8px)' }}
                    animate={
                      developing
                        ? { opacity: 1, filter: 'grayscale(1) contrast(1.15) brightness(0.95) blur(0px)' }
                        : undefined
                    }
                    transition={{ duration: 1.7, ease: [0.3, 0, 0.2, 1] }}
                  >
                    <Image src="/about-me.jpeg" alt="" fill priority sizes="340px" className="object-cover object-[50%_25%]" />
                  </motion.div>
                </div>
                <motion.p
                  className="mt-3 text-center font-display text-2xl italic text-[#1a1210]"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={developing ? { opacity: 1, filter: 'blur(0px)' } : undefined}
                  transition={{ duration: 1.4, delay: 0.5 }}
                >
                  Thirumurugan Kumar
                </motion.p>
                {/* Safelight tint on the paper */}
                <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ backgroundColor: 'rgba(226,53,43,0.24)' }} />
              </div>
            </div>

            {/* Timer readout */}
            <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-safelight-300/80">
              <span className="fx-rec inline-block h-1.5 w-1.5 rounded-full bg-safelight-500" />
              <span>Developing</span>
              <span className="tabular-nums">00:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Room lights switch on */}
          <AnimatePresence>
            {phase === 'lights' ? (
              <motion.div
                key="lights"
                className="pointer-events-none absolute inset-0 bg-[#f4efe6]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.8, times: [0, 0.18, 1] }}
              />
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.3em] text-safelight-300/70 transition hover:text-safelight-100"
          >
            Skip intro
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
