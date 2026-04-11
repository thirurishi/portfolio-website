import { projectsData, type ProjectData } from '@/data/projects';

export type { ProjectData } from '@/data/projects';

export function getProjectSlugs() {
  return projectsData.map((project) => project.slug);
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((project) => project.slug === slug);
}

export function getAllProjects(): ProjectData[] {
  return projectsData;
}
