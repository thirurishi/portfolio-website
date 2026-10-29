'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { socialLinks } from '@/data/social-links';

const credits = [
  ['Directed by', 'Thirumurugan Kumar'],
  ['Data', 'SQL · Python · Power BI'],
  ['Models', 'scikit-learn · PyTorch · TensorFlow'],
  ['Shot at', 'EPITA, Paris']
];

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-ink-700 px-6 pb-10 pt-24 sm:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="font-display text-[18vw] leading-[0.85] text-paper-50 sm:text-[12vw] lg:text-[10rem]"
          initial={reduce ? undefined : { opacity: 0, filter: 'blur(16px)', y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          That&apos;s a <span className="italic text-paper-300">wrap</span>
          <span className="text-safelight-500">.</span>
        </motion.p>

        <dl className="mt-16 grid gap-6 border-t border-ink-700 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {credits.map(([k, v]) => (
            <div key={k}>
              <dt className="camera-label">{k}</dt>
              <dd className="mt-2 text-[15px] text-paper-300">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-700">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-500 hover:text-paper-50"
              >
                {link.label}
              </a>
            ))}
            <a href="#home" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-300 hover:text-safelight-400">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
