import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/projects/project-detail';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project not found',
      description: 'Project case study not found.'
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
