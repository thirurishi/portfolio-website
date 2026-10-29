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
        Analytics, machine learning and AI projects, from SQL pipelines and Power BI dashboards to deployed NLP apps. Open any case study for the full approach and results.
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