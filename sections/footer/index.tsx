'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { personalInfo } from '@/data/personal';
import { socialLinks } from '@/data/social-links';
import { fadeInUp, sectionContainer } from '@/lib/motion';

const itemVariants = fadeInUp;

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative border-t border-midnight-400/30 bg-navy-950/95 py-10"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="relative w-full flex flex-col gap-8 px-6 md:px-12 lg:px-16 xl:px-24 text-slate-300">
        <motion.div variants={itemVariants} className="royal-card flex flex-col gap-4 border border-midnight-400/28 bg-navy-900 rounded-[32px] p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.08),_0_32px_80px_rgba(7,5,15,0.9)] sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-midnight-400/80">Thirumurugan Kumar</p>
            <p className="text-body font-semibold text-white sm:text-xl">Building data-driven systems, analytics products, and intelligent ML solutions.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#home" className="rounded-full border border-navy-700/80 bg-navy-950/90 px-4 py-3 text-body font-medium text-slate-200 transition hover:border-midnight-400/40 hover:bg-navy-950 hover:text-white">
              Back to top
            </Link>
            <span className="rounded-full bg-slate-800/80 px-3 py-2 text-xs uppercase tracking-[0.35em] text-slate-400">2026</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-6 border-t border-navy-800/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-body text-slate-400">
            <p>© {new Date().getFullYear()} {personalInfo.name}. Crafted for high-impact analytics and AI delivery.</p>
            <p>Minimal, modern, and recruiter-friendly.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                whileHover={{ y: -2 }}
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-midnight-400/20 bg-navy-900 px-4 py-2 text-sm text-slate-200 transition hover:border-midnight-400/40 hover:bg-navy-900 hover:text-white"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
