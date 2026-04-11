'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Badge, Card } from '@/components/ui';
import { SectionContainer } from '@/components/shared';
import { skillsData } from '@/data/skills';
import { fadeInUp, sectionContainer } from '@/lib/motion';

/* ── 3D tilt card ──────────────────────────────────────────────── */
function SkillCard({ group }: { group: typeof skillsData[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 28 });


  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      variants={fadeInUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition duration-500 group-hover:opacity-100 shadow-[0_0_40px_rgba(212,175,55,0.18),inset_0_0_0_1px_rgba(212,175,55,0.15)]" />

      <Card className="relative h-full overflow-hidden border-midnight-400/28 bg-navy-900 shadow-midnight transition-colors duration-300 hover:border-midnight-400/40">


        <div className="relative" style={{ transform: 'translateZ(16px)' }}>
          {/* Header */}
          <div className="rounded-[inherit] border-b border-navy-800/60 bg-navy-950/60 px-6 py-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">{group.category}</h3>
              <Badge className="bg-navy-950/90 text-midnight-400">{group.items.length}</Badge>
            </div>
            <p className="text-sm leading-6 text-slate-400">{group.description}</p>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2.5 px-6 py-5">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-midnight-400/15 bg-navy-975/90 px-3 py-1.5 text-sm font-medium text-slate-300 transition duration-200 group-hover:border-midnight-400/40 group-hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export function Skills() {
  return (
    <SectionContainer id="skills" title="Skills">

      <div className="mb-8 max-w-3xl text-slate-300">
        <p className="text-body leading-8 sm:text-lg">
          I design and deliver high-impact data systems by combining analytics, machine learning, and scalable engineering practices.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionContainer}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {skillsData.map((group) => (
          <SkillCard key={group.category} group={group} />
        ))}
      </motion.div>

    </SectionContainer>
  );
}
