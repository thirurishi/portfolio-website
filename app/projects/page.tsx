import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/shared';
import { getAllProjects } from '@/lib/projects';

export default function ProjectsOverviewPage() {
  const projects = getAllProjects();

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
      <SectionContainer title="Project Case Studies">
        <p className="mb-12 max-w-3xl text-slate-300">
          Detailed write-ups of each project: the problem, my approach, the results and what I learned.
        </p>

        <div className="grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug} className="royal-card group overflow-hidden border-midnight-400/28 bg-navy-900 p-6 transition hover:-translate-y-1 hover:border-midnight-400/30 hover:shadow-[0_30px_100px_-70px_rgba(212,175,55,0.18)]">
              <div className="flex flex-col gap-5">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-midnight-400/80">{project.context ?? 'Case study'}</p>
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="text-sm leading-7 text-slate-400">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full border border-navy-700/70 bg-navy-950/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1 text-sm text-slate-400">
                    <p>{project.highlights[0]}</p>
                    <p>{project.highlights[1]}</p>
                  </div>
                  <Button href={`/projects/${project.slug}`} variant="default" size="sm" className="h-12 px-5 text-sm font-semibold">
                    Read case study
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
