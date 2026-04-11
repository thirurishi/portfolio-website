'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/shared';
import { ProjectCard } from '@/components/ui';
import { projectsData } from '@/data/projects';
import { sectionContainer } from '@/lib/motion';

const gridVariants = sectionContainer;

export function Projects() {
  return (
    <SectionContainer id="projects" title="Featured Projects">
      
      <p className="mb-8 max-w-3xl text-body text-slate-300">
        A curated set of analytics, machine learning, and AI systems designed to solve real-world problems through data-driven approaches.
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={gridVariants}
        className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
      >
        {projectsData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </motion.div>

    </SectionContainer>
  );
}