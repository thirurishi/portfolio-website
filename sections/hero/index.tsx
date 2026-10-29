'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { Viewfinder } from '@/components/fx/viewfinder';
import { heroContent } from '@/data/hero';
import { useIntroDone } from '@/lib/intro';

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay, ready, className }: { children: React.ReactNode; delay: number; ready: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={reduce ? false : { y: '110%' }}
        animate={ready ? { y: '0%' } : undefined}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);
  const mediaScale = useTransform(scrollY, [0, 800], [1, reduce ? 1 : 1.12]);

  const fade = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0, y: 14, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
    transition: { duration: 0.9, delay, ease }
  });

  return (
    <section id="home" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden !px-0 !py-0 text-paper-100">
      {/* Cinematic footage */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: mediaScale }}>
        <div className="fx-kenburns absolute inset-0">
          <video
            className="h-full w-full object-cover object-[55%_center]"
            src="/hero.mp4"
            poster="/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ filter: 'grayscale(0.35) sepia(0.12) contrast(1.12) brightness(0.62)' }}
          />
        </div>
      </motion.div>

      {/* Grade, leaks and letterbox */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(10,9,8,0.55)_0%,rgba(10,9,8,0.1)_35%,rgba(10,9,8,0.35)_70%,#0a0908_100%)]" />
      <div className="fx-leak fx-leak--a z-[2]" />
      <div className="fx-leak fx-leak--b z-[2]" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] bg-black motion-reduce:hidden"
        initial={{ height: reduce ? '0%' : '50%' }}
        animate={ready ? { height: '0%' } : undefined}
        transition={{ duration: 1.2, ease }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-black motion-reduce:hidden"
        initial={{ height: reduce ? '0%' : '50%' }}
        animate={ready ? { height: '0%' } : undefined}
        transition={{ duration: 1.2, ease }}
      />

      <Viewfinder />

      {/* Copy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mt-auto w-full px-6 pb-24 pt-40 sm:px-12 sm:pb-28 lg:px-20 xl:px-28"
      >
        <motion.div {...fade(0.5)} className="mb-8 inline-flex items-center gap-3 border border-paper-100/25 bg-ink-975/40 px-4 py-2 backdrop-blur-sm">
          <span className="fx-rec inline-block h-2 w-2 rounded-full bg-safelight-500" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper-100">
            Available now · 6-month internship
          </span>
        </motion.div>

        <motion.p {...fade(0.6)} className="camera-label mb-5 !text-paper-300">
          <span className="hidden sm:inline">Scene 01 — </span>Data science · Analytics · AI
        </motion.p>

        <h1 className="text-hero text-paper-50">
          <Line ready={ready} delay={0.25}>Thirumurugan</Line>
          <Line ready={ready} delay={0.4} className="italic text-paper-300">
            Kumar<span className="text-safelight-500">.</span>
          </Line>
        </h1>

        <motion.p {...fade(0.85)} className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-paper-200 sm:text-xl">
          I see patterns in light and in data. Master&apos;s student at EPITA turning raw data into SQL pipelines, Power BI
          dashboards, ML models and deployed NLP apps.
        </motion.p>

        <motion.div {...fade(1)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {heroContent.ctas.map((cta) => (
            <Button key={cta.label} href={cta.href} variant={cta.variant as 'default' | 'secondary' | 'ghost'} size="lg" className="w-full sm:w-auto">
              {cta.label}
            </Button>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        {...fade(1.3)}
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-300 md:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
