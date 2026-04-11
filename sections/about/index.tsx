'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionContainer } from '@/components/shared';
import { Card } from '@/components/ui';
import { aboutContent } from '@/data/about';
import { fadeInUp, sectionContainer } from '@/lib/motion';

const reveal = fadeInUp;

export function About() {
  return (
    <SectionContainer id="about" title="About">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionContainer}
        className="relative space-y-8"
      >
        {/* Label badge */}
        <motion.div variants={reveal} className="inline-flex">
          <div className="rounded-full border border-midnight-400/30 bg-navy-950/90 px-4 py-2 shadow-midnight">
            <span className="text-caption text-midnight-300">Analytics x AI x Business</span>
          </div>
        </motion.div>

        {/* Single outer grid — columns stay locked across both rows */}
        <div className="grid items-start gap-8 xl:grid-cols-[5fr_7fr]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-8">

            {/* Portrait */}
            <motion.div variants={reveal}>
              <div className="royal-card group relative overflow-hidden rounded-[32px] border border-midnight-400/28 bg-navy-950/95 shadow-midnight">
                <Image
                  src="/about-me.jpeg"
                  alt="Thirumurugan Kumar"
                  width={900}
                  height={1200}
                  className="w-full object-contain max-h-[580px] transition-transform duration-700 group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>
            </motion.div>

            {/* 4 highlight cards — 2×2 grid */}
            <motion.div variants={reveal}>
              <div className="grid gap-4 sm:grid-cols-2">
                {aboutContent.highlightCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    variants={fadeInUp}
                    transition={{ delay: 0.08 * index }}
                    className="rounded-3xl border border-midnight-400/22 bg-navy-950/90 p-6 shadow-midnight transition duration-300 hover:-translate-y-1 hover:border-midnight-400/30"
                  >
                    <p className="text-caption text-midnight-400/80">{card.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-8">

            {/* About info */}
            <motion.div variants={reveal}>
              <div className="royal-card rounded-[32px] border border-midnight-400/28 bg-navy-900 p-8 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)]">
                <p className="text-xs uppercase tracking-[0.35em] text-midnight-400/80">Overview</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Who I am
                </h3>
                <div className="mt-6 space-y-5">
                  {aboutContent.overview.map((paragraph, index) => (
                    <p key={index} className="text-body leading-8 text-slate-300 sm:text-[1.05rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Technical strength */}
            <motion.div variants={reveal}>
              <Card className="border-midnight-400/28 bg-navy-950/90 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-midnight-400/80">Toolkit</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Technical strength</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  A practical stack for analytics, engineering, and AI delivery.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {aboutContent.strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-navy-800/90 bg-navy-975/90 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:border-midnight-400/30 hover:text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
