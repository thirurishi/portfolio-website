'use client';

import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { Download } from 'lucide-react';
import { useRef } from 'react';
import { SectionContainer } from '@/components/shared';
import { FocusPull } from '@/components/fx/focus-pull';
import { Button } from '@/components/ui';
import { personalInfo } from '@/data/personal';

export function Resume() {
  const printRef = useRef<HTMLDivElement>(null);
  const developed = useInView(printRef, { once: true, amount: 0.4 });

  return (
    <SectionContainer id="resume" scene="06" kicker="Résumé" title="The one-page version.">
      <div className="grid items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* Print of the résumé, pegged on a drying line */}
        <div ref={printRef} className="relative mx-auto w-full max-w-[400px]">
          <span className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-paper-700" />
          <span className="absolute -top-3 left-1/2 z-10 h-6 w-3 -translate-x-1/2 bg-paper-600" />
          <motion.a
            href={personalInfo.resumeLinks.en}
            download
            data-cursor="Save"
            className={`block origin-top bg-paper-100 p-2 shadow-print ${developed ? 'develop-on' : ''}`}
            initial={{ rotate: -6 }}
            whileInView={{ rotate: [-6, 3, -1.5, 0.5, 0] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            aria-label="Download résumé in English (PDF)"
          >
            <div className="develop relative aspect-[1/1.414] overflow-hidden">
              <Image src="/resume-preview.jpg" alt="Preview of Thirumurugan Kumar's résumé" fill sizes="400px" className="object-cover object-top" />
            </div>
          </motion.a>
        </div>

        <div>
          <FocusPull>
            <p className="font-display text-2xl leading-snug text-paper-50 sm:text-3xl">
              Education, projects, internship and skills on a single page, in English and in French.
            </p>
          </FocusPull>

          <FocusPull delay={0.1} className="mt-10 grid gap-8 border-y border-ink-700 py-8 sm:grid-cols-2">
            <div>
              <p className="camera-label">Focus</p>
              <ul className="mt-4 space-y-2">
                {personalInfo.resumeFocus.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-paper-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="camera-label">Looking for</p>
              <ul className="mt-4 space-y-2">
                {personalInfo.internshipInterests.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-paper-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FocusPull>

          <FocusPull delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={personalInfo.resumeLinks.en} download size="lg" className="w-full sm:w-auto">
              <Download className="h-4 w-4" /> Résumé · English
            </Button>
            <Button href={personalInfo.resumeLinks.fr} download variant="secondary" size="lg" className="w-full sm:w-auto">
              <Download className="h-4 w-4" /> CV · Français
            </Button>
          </FocusPull>
        </div>
      </div>
    </SectionContainer>
  );
}
