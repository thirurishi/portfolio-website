'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/shared';
import { timelineData } from '@/data/timeline';
import { fadeInUp, sectionContainer } from '@/lib/motion';

const containerVariants = sectionContainer;
const itemVariants = fadeInUp;

const accentMap = {
  education: 'bg-midnight-400',
  internship: 'bg-rose-500',
  career: 'bg-fuchsia-500'
} as const;

type CategoryKey = keyof typeof accentMap;

export function Journey() {
  return (
    <SectionContainer
      id="journey"
      title="Career Journey"
      intro="A focused progression from software and IT foundations to data science, analytics, machine learning, and production-ready systems."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="royal-card relative overflow-hidden rounded-[36px] border border-midnight-400/28 bg-navy-900 p-5 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-midnight-400/20" />
        <div className="pointer-events-none absolute left-10 top-16 hidden h-[calc(100%-4rem)] w-px rounded-full bg-navy-700/70 md:block" />

        <div className="space-y-6">
          {timelineData.map((item) => (
            <motion.article
              key={`${item.year}-${item.title}`}
              variants={itemVariants}
              className="relative overflow-hidden rounded-[28px] border border-midnight-400/25 bg-navy-900 p-6 shadow-midnight transition duration-300 hover:-translate-y-1 hover:border-midnight-400/50 animate-glow-border"
            >
              <div className="absolute -left-2 top-10 h-6 w-6 rounded-full border border-navy-700/80 bg-navy-950 shadow-[0_0_0_6px_rgba(15,23,42,0.25)] md:left-10">
                <div
                  className={`mx-auto mt-1 h-2.5 w-2.5 rounded-full ${
                    accentMap[item.category as CategoryKey]
                  }`}
                />
              </div>

              <div className="md:pl-20">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      {item.year}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-slate-300">
                    {item.category === 'education'
                      ? 'Education'
                      : item.category === 'internship'
                      ? 'Internship'
                      : 'Professional growth'}
                  </span>
                </div>

                <p className="mb-5 text-sm font-medium leading-7 text-slate-400 sm:text-base">
                  {item.subtitle}
                </p>

                <p className="mb-6 max-w-3xl text-body leading-7 text-slate-300 sm:text-base">
                  {item.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {item.highlights.map((highlight: string) => (
                    <div
                      key={highlight}
                      className="rounded-3xl border border-midnight-400/15 bg-navy-950/90 px-4 py-3 text-body text-slate-300 shadow-midnight"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}