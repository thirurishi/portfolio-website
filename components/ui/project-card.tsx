'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Button } from './button';
import { Card } from './card';
import { fadeInUp } from '@/lib/motion';

export interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  impact: string;
  links: {
    label: string;
    href: string;
    variant?: 'default' | 'secondary' | 'ghost';
  }[];
}

const resolveLinkVariant = (link: { label: string; variant?: 'default' | 'secondary' | 'ghost' }) => {
  if (link.variant) return link.variant;
  const label = link.label.toLowerCase();
  if (label.includes('live') || label.includes('demo') || label.includes('site')) return 'default';
  if (label.includes('github') || label.includes('code')) return 'ghost';
  return 'secondary';
};

export function ProjectCard({ title, description, stack, impact, links }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 400, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 400, damping: 28 });


  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
    >
      {/* Outer glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[34px] opacity-0 transition duration-500 group-hover:opacity-100 shadow-[0_0_50px_rgba(212,175,55,0.15),inset_0_0_0_1px_rgba(212,175,55,0.12)]" />

      <Card className="relative h-full overflow-hidden rounded-[32px] border-midnight-400/30 bg-navy-900 shadow-midnight transition-colors duration-300 hover:border-midnight-400/40">


        <div className="relative h-full p-6 md:p-7" style={{ transform: 'translateZ(20px)' }}>

          {/* Header */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.35em] text-midnight-400/80">Featured case study</p>
              <h3 className="max-w-xl text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
            </div>
            <span className="flex items-center rounded-full border border-navy-700/70 bg-navy-950/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.35em] text-slate-400">
              Premium
            </span>
          </div>

          {/* Description */}
          <p className="mb-6 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>

          {/* Impact box */}
          <div className="mb-6 rounded-3xl border border-midnight-400/18 bg-navy-950/70 p-5 shadow-inner shadow-navy-975/30">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Impact</p>
            <p className="text-sm leading-7 text-slate-200">{impact}</p>
          </div>

          {/* Stack pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-navy-700/70 bg-navy-950/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-slate-300 transition duration-300 group-hover:border-midnight-400/40 group-hover:bg-navy-900"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-auto flex flex-wrap gap-3 pt-3">
            {links.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant={resolveLinkVariant(link)}
                className="h-12 px-5 text-sm font-semibold"
                size="sm"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
