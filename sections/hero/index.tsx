'use client';

import { Button } from '@/components/ui';
import { heroContent } from '@/data/hero';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  sectionContainer,
  heroBadge,
  heroHeading,
  heroContent as heroContentVariant,
  heroCTA
} from '@/lib/motion';
import { useRef } from 'react';

const buttonFade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export function Hero() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden text-white flex flex-col"
    >
      {/* Full-screen background video */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          className="block h-full w-full object-cover object-[62%_center]"
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>

      {/* Royal crosshatch texture over video */}
      <div className="absolute inset-0 z-[1] royal-texture opacity-50 pointer-events-none" />

      {/* Dark overlay — let video breathe */}
      <div className="absolute inset-0 bg-navy-975/58" />

      {/* Box-shadow vignette — no gradient, just shadow */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ boxShadow: 'inset 0 0 180px rgba(7,5,15,0.55)' }}
      />

      {/* Bottom warm glow — box-shadow only */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px"
        style={{ boxShadow: '0 0 80px 40px rgba(212,175,55,0.07)' }}
      />

      {/* Cinematic corner brackets */}
      <div className="pointer-events-none absolute inset-0 z-[6]">
        <div className="absolute top-6 left-6 h-12 w-12 border-t-2 border-l-2 border-midnight-400/45" />
        <div className="absolute top-6 right-6 h-12 w-12 border-t-2 border-r-2 border-midnight-400/45" />
        <div className="absolute bottom-16 left-6 h-12 w-12 border-b-2 border-l-2 border-midnight-400/45" />
        <div className="absolute bottom-16 right-6 h-12 w-12 border-b-2 border-r-2 border-midnight-400/45" />
      </div>


      {/* Main content */}
      <div className="relative z-10 flex min-h-screen w-full items-center py-14 md:py-16 lg:py-20">
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 sm:px-8 md:px-10 lg:px-12">
          <motion.div
            className="max-w-5xl space-y-11 md:space-y-12 lg:space-y-14"
            style={{ y: heroY }}
          >
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex"
            >
              <motion.div
                className="rounded-full border border-midnight-400/40 bg-navy-950/90 px-5 py-2 backdrop-blur-md shadow-midnight"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.25)' }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs font-bold tracking-[0.1em] text-midnight-300/95">
                 OPEN TO 6 MONTHS INTERNSHIP                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={heroContentVariant}
              initial="hidden"
              animate="visible"
              className="space-y-9 md:space-y-11 lg:space-y-13"
            >
              <div className="pt-1 md:pt-2">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400/85">
                  Data Science • Analytics • AI • Machine Learning
                </p>
              </div>

              <motion.div
                variants={heroHeading}
                initial="hidden"
                animate="visible"
                className="pt-1 md:pt-2 lg:pt-4"
              >
                <h1 className="text-hero font-bold leading-[0.85] tracking-[-0.025em] text-white">
                  Thirumurugan
                  <br />
                  <span className="text-shimmer italic font-bold">
                    Kumar
                  </span>
                </h1>
              </motion.div>

              <motion.div
                variants={heroContentVariant}
                initial="hidden"
                animate="visible"
                className="max-w-4xl pt-3 md:pt-5 lg:pt-6"
              >
                <p className="text-subheading font-light leading-relaxed tracking-[-0.005em] text-slate-200/95">
                  Designing data-driven systems, analytics solutions, and machine learning pipelines that deliver measurable business impact.
                </p>
                {/* Gold rule */}
                <motion.div
                  className="mt-7 h-px w-20 bg-midnight-400/55"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.1 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={heroCTA}
              initial="hidden"
              animate="visible"
              className="space-y-8 pt-8 md:space-y-9 md:pt-11 lg:pt-14"
            >
              <motion.div
                variants={sectionContainer}
                initial="hidden"
                animate="visible"
                className="relative pt-3"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  {heroContent.ctas.map((cta, index) => (
                    <motion.div
                      key={cta.label}
                      variants={buttonFade}
                      transition={{ delay: index * 0.15 }}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        href={cta.href}
                        variant={cta.variant as 'default' | 'secondary' | 'ghost'}
                        className="w-full text-base font-bold tracking-wide sm:w-auto"
                        size="lg"
                      >
                        {cta.label}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}