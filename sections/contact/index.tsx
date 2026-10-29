'use client';

import { ArrowUpRight } from 'lucide-react';
import { SectionContainer } from '@/components/shared';
import { FocusPull } from '@/components/fx/focus-pull';
import { ContactForm } from '@/components/ui';
import { contactInfo } from '@/data/contact';
import { socialLinks } from '@/data/social-links';

export function Contact() {
  return (
    <SectionContainer id="contact" scene="07" kicker="Contact" title="Let's work together.">
      <div className="grid gap-16 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <FocusPull>
            <p className="text-[17px] leading-relaxed text-paper-400">
              I&apos;m looking for a 6-month internship in data science, analytics or machine learning, and I&apos;m available to
              start immediately. Send me the role and I&apos;ll get back to you quickly.
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="group mt-8 inline-flex items-center gap-3 font-display text-3xl text-paper-50 sm:text-4xl"
            >
              <span className="underline decoration-ink-600 decoration-1 underline-offset-[10px] transition-colors group-hover:decoration-safelight-500">
                {contactInfo.email}
              </span>
              <ArrowUpRight className="h-6 w-6 text-safelight-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </FocusPull>

          <FocusPull delay={0.1} className="mt-12 grid gap-8 border-t border-ink-700 pt-8 sm:grid-cols-2">
            <div>
              <p className="camera-label">Location</p>
              <p className="mt-3 text-[15px] text-paper-200">{contactInfo.location}</p>
              <p className="camera-label mt-6">Availability</p>
              <p className="mt-3 flex items-start gap-2.5 text-[15px] text-paper-200">
                <span className="fx-rec mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full bg-safelight-500" />
                {contactInfo.availability}
              </p>
            </div>
            <div>
              <p className="camera-label">Languages</p>
              <ul className="mt-3 space-y-1.5">
                {contactInfo.languages.map((lang) => (
                  <li key={lang.name} className="text-[15px] text-paper-200">
                    {lang.name} <span className="text-paper-600">· {lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FocusPull>

          <FocusPull delay={0.15} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {socialLinks
              .filter((l) => l.label !== 'Email')
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-paper-300 underline decoration-ink-600 underline-offset-[6px] hover:text-paper-50 hover:decoration-safelight-500"
                >
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
          </FocusPull>
        </div>

        <FocusPull delay={0.1} className="border border-ink-700 bg-ink-950/60 p-6 sm:p-10">
          <p className="camera-label">Send a message</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </FocusPull>
      </div>
    </SectionContainer>
  );
}
