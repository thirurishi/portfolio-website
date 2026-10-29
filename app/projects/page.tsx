import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getAllProjects } from '@/lib/projects';

export const metadata = {
  title: 'Projects — Thirumurugan Kumar',
  description: 'Case studies in analytics, BI, machine learning and NLP.'
};

export default function ProjectsOverviewPage() {
  const projects = getAllProjects();

  return (
    <main className="px-6 pb-24 pt-8 sm:px-10 xl:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between border-b border-ink-700 pb-5">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-400 hover:text-paper-50">
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
          <span className="camera-label">Contact sheet</span>
        </div>

        <h1 className="mt-14 font-display text-6xl text-paper-50 sm:text-7xl">All case studies</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-400">
          The problem, the approach, the results and what I learned, for each project.
        </p>

        <ol className="mt-14 border-t border-ink-700">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="View"
                className="group grid gap-3 border-b border-ink-700 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-8"
              >
                <span className="font-mono text-[12px] text-safelight-400">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="camera-label">{project.context}</p>
                  <h2 className="mt-2 font-display text-3xl text-paper-50 transition-colors group-hover:text-paper-300 sm:text-4xl">{project.title}</h2>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-600">{project.stack.join(' · ')}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-paper-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-safelight-500" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
