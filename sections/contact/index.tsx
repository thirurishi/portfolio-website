'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/shared';
import { contactInfo } from '@/data/contact';
import { socialLinks } from '@/data/social-links';
import { fadeInUp, sectionContainer } from '@/lib/motion';
import { ContactForm } from '@/components/ui';

const containerVariants = sectionContainer;

const panelVariants = fadeInUp;

export function Contact() {
  return (
    <SectionContainer
      id="contact"
      title="Contact"
      intro="Reach out to discuss analytics programs, AI product strategy, or data-driven transformation initiatives."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div variants={panelVariants} className="royal-card rounded-[32px] border border-midnight-400/28 bg-navy-900 p-8 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)]">
          <div className="mb-8 rounded-[28px] bg-navy-950/90 p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
            <p className="text-xs uppercase tracking-[0.35em] text-midnight-400/80">Trusted contact</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">A premium recruiter-friendly touchpoint</h3>
            <p className="mt-4 max-w-2xl text-body leading-7 text-slate-300">
              I’m available for internships, analytics roles, and AI product discussions. Share the project scope, and I’ll respond with clarity and speed.
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-midnight-400/18 bg-navy-950/85 p-6 shadow-midnight">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Email</p>
              <a href={`mailto:${contactInfo.email}`} className="text-body font-medium text-white transition hover:text-midnight-400">
                {contactInfo.email}
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Location</p>
              <p className="text-body font-medium text-white">{contactInfo.location}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-midnight-400/18 bg-navy-950/90 px-4 py-3 text-body font-medium text-slate-200 transition hover:border-midnight-400/40 hover:bg-navy-950 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={panelVariants} className="royal-card rounded-[32px] border border-midnight-400/28 bg-navy-900 p-8 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)]">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-midnight-400/80">Send a message</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Let’s start a conversation</h3>
            </div>
            <span className="rounded-full border border-navy-700/70 bg-navy-950/80 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-slate-300">
              Professional</span>
          </div>

          <ContactForm />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
