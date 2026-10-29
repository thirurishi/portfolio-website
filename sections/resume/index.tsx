'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/shared';
import { Button } from '@/components/ui';
import { personalInfo } from '@/data/personal';
import { fadeInUp, sectionContainer } from '@/lib/motion';

const containerVariants = sectionContainer;

const cardVariants = fadeInUp;

export function Resume() {
  return (
    <SectionContainer
      id="resume"
      title="Resume"
      intro="Download a refined résumé preview that highlights my focus in analytics, ML, and deployed systems, along with selective internship interests."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="relative grid gap-8 xl:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div variants={cardVariants} className="royal-card rounded-[32px] border border-midnight-400/28 bg-navy-900 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)] transition duration-300 hover:-translate-y-1">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-midnight-400/80">Résumé preview</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Professional focus</h3>
            </div>
            <div className="rounded-full border border-navy-700/70 bg-navy-950/80 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-slate-300">
              Minimal • Modern
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 rounded-3xl border border-midnight-400/18 bg-navy-950/80 px-5 py-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Snapshot</p>
              <p className="text-body leading-7 text-slate-300">
                I design analytics systems and machine learning solutions that turn complex data into confident business decisions.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-midnight-400/18 bg-navy-950/80 p-5">
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-slate-400">Focus areas</p>
                <ul className="space-y-3 text-body leading-7 text-slate-300">
                  {personalInfo.resumeFocus.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-midnight-400/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-midnight-400/18 bg-navy-950/80 p-5">
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-slate-400">Internship interests</p>
                <ul className="space-y-3 text-body leading-7 text-slate-300">
                  {personalInfo.internshipInterests.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="royal-card flex flex-col justify-between rounded-[32px] border border-midnight-400/28 bg-navy-900 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)]">
          <div className="space-y-6 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Career narrative</p>
              <p className="mt-4 text-body leading-8 text-slate-300">
                I focus on analytics and AI product delivery, creating dashboards, predictive models, and deployed systems that move teams from insight to action.
              </p>
            </div>
            <div className="rounded-3xl border border-midnight-400/18 bg-navy-950/85 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Highlighted strengths</p>
              <ul className="space-y-3 text-body leading-7 text-slate-300">
                {personalInfo.strengths.map((strength) => (
                  <li key={strength} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              href={personalInfo.resumeLinks.en}
              variant="default"
              size="lg"
              className="w-full text-sm font-semibold"
              download
            >
              Download résumé — English (PDF)
            </Button>
            <Button
              href={personalInfo.resumeLinks.fr}
              variant="secondary"
              size="lg"
              className="w-full text-sm font-semibold"
              download
            >
              Télécharger le CV — Français (PDF)
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
