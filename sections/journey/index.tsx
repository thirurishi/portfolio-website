'use client';

import { motion, useReducedMotion, useScroll } from 'motion/react';
import { useRef } from 'react';
import { SectionContainer } from '@/components/shared';
import { FocusPull } from '@/components/fx/focus-pull';
import { timelineData } from '@/data/timeline';

const categoryLabel = { education: 'Education', internship: 'Internship', career: 'Experience' } as const;

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });

  return (
    <SectionContainer id="journey" scene="05" kicker="Journey" title="How I got here.">
      <ol ref={listRef} className="relative">
        {/* Timeline rule that draws as you scroll */}
        <span className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-ink-700 md:left-[calc(25%_+_43px)] md:block" />
        <motion.span
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-safelight-500 md:left-[calc(25%_+_43px)] md:block"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />

        {timelineData.map((item, i) => (
          <FocusPull as="li" key={`${item.year}-${item.title}`} delay={0.05} className="relative grid gap-4 pb-16 last:pb-0 md:grid-cols-[1fr_3fr] md:gap-12">
            <div className="md:pt-1 md:text-right">
              <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-paper-300">{item.year}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-700">
                {categoryLabel[item.category as keyof typeof categoryLabel]}
              </p>
            </div>
            <div className="relative md:pl-10">
              <span className="absolute -left-[1px] top-2 hidden h-[15px] w-[15px] border border-safelight-500 bg-ink-975 md:-left-[1px] md:block">
                <span className="absolute inset-[4px] bg-safelight-500" />
              </span>
              <span className="font-mono text-[11px] text-safelight-400">Take {String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-3xl leading-tight text-paper-50 sm:text-4xl">{item.title}</h3>
              <p className="mt-2 text-[15px] text-paper-400">{item.subtitle}</p>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-paper-500">{item.description}</p>
              <ul className="mt-5 space-y-2">
                {item.highlights.map((h: string) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-paper-400">
                    <span className="mt-[10px] h-px w-4 shrink-0 bg-paper-700" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </FocusPull>
        ))}
      </ol>
    </SectionContainer>
  );
}
