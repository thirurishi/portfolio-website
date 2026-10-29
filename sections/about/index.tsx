'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SectionContainer } from '@/components/shared';
import { FocusPull } from '@/components/fx/focus-pull';
import { CountUp } from '@/components/fx/count-up';
import { aboutContent } from '@/data/about';

const stats = [
  { value: 7, suffix: '+', label: 'Projects completed' },
  { value: 15, suffix: '+', label: 'Tools I work with' },
  { value: 4, label: 'Languages spoken' },
  { value: 93358, label: 'Customers in my largest analysis' }
];

export function About() {
  const printRef = useRef<HTMLDivElement>(null);
  const developed = useInView(printRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: printRef, offset: ['start end', 'end start'] });
  const printY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const printRotate = useTransform(scrollYProgress, [0, 1], [reduce ? -2 : -4, reduce ? -2 : 1]);

  return (
    <SectionContainer id="about" scene="02" kicker="About" title="Analytical rigour, a photographer's eye.">
      <div className="grid items-start gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* The print */}
        <motion.div ref={printRef} style={{ y: printY, rotate: printRotate }} className="mx-auto w-full max-w-[420px]">
          <div className={`bg-paper-100 p-3 pb-14 shadow-print ${developed ? 'develop-on' : ''}`}>
            <div className="develop relative aspect-[4/5] overflow-hidden bg-ink-900">
              <Image
                src="/about-me.jpeg"
                alt="Portrait of Thirumurugan Kumar"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
            <p className="mt-4 text-center font-display text-xl italic text-ink-900">Thirumurugan Kumar</p>
            <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">Fig. 01 · Portrait</p>
          </div>
        </motion.div>

        {/* Story */}
        <div>
          <div className="space-y-6">
            {aboutContent.overview.map((paragraph, i) => (
              <FocusPull key={i} delay={i * 0.05}>
                <p className={i === 0 ? 'font-display text-2xl leading-snug text-paper-50 sm:text-3xl' : 'text-[17px] leading-relaxed text-paper-400'}>
                  {paragraph}
                </p>
              </FocusPull>
            ))}
          </div>

          <FocusPull className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 border-y sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 border-ink-700 py-8">
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} className="block font-display text-4xl text-paper-50" />
                <span className="mt-2 block font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-paper-600">{s.label}</span>
              </div>
            ))}
          </FocusPull>

          <div className="mt-12 grid gap-px bg-ink-700 sm:grid-cols-2">
            {aboutContent.highlightCards.map((card, i) => (
              <FocusPull key={card.title} delay={i * 0.08} className="bg-ink-975 p-6">
                <span className="font-mono text-[11px] text-safelight-400">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl text-paper-50">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper-500">{card.description}</p>
              </FocusPull>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
