import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ProjectData } from '@/lib/projects';

interface ProjectDetailProps {
  project: ProjectData;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">

      {/* ── HEADER ── */}
      <div className="royal-card mb-10 rounded-[2rem] border border-midnight-400/25 bg-navy-900 p-8 shadow-deep backdrop-blur-xl">

        {/* Back link */}
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <span className="text-xs">←</span> All projects
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3 max-w-3xl">
            <p className="inline-flex rounded-full border border-midnight-400/30 bg-midnight-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-midnight-400">
              Case Study
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              {project.description}
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            {project.links
              .filter((link) => link.label !== 'Case Study')
              .map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  variant={link.variant ?? 'secondary'}
                  size="sm"
                  className="h-11 px-5 text-sm font-semibold"
                >
                  {link.label}
                </Button>
              ))}
          </div>
        </div>

        {/* Tech stack badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-navy-700/70 bg-navy-900/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW + PROBLEM / OBJECTIVE ── */}
      <div className="mb-6 grid gap-6 xl:grid-cols-[1.3fr_0.8fr]">

        <Card className="space-y-6 border-midnight-400/25 bg-navy-900 p-7">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-midnight-400/80">Overview</p>
            <p className="text-sm leading-8 text-slate-200 sm:text-base">{project.overview}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-midnight-400/25 bg-navy-975/80 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Problem</p>
              <p className="text-sm leading-7 text-slate-300">{project.problem}</p>
            </div>
            <div className="rounded-3xl border border-midnight-400/25 bg-navy-975/80 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Objective</p>
              <p className="text-sm leading-7 text-slate-300">{project.objective}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-midnight-400/25 bg-navy-900 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Dataset / Input</p>
            <p className="text-sm leading-7 text-slate-300">{project.input}</p>
          </Card>

          {/* Impact */}
          <Card className="border-midnight-400/35 bg-navy-900 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-midnight-300">Business Impact</p>
            <p className="text-sm leading-7 text-slate-200">{project.impact}</p>
          </Card>
        </div>
      </div>

      {/* ── WORKFLOW ── */}
      <div className="mb-6">
        <Card className="border-midnight-400/25 bg-navy-900 p-7">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-midnight-400/80">Workflow & Architecture</p>
          <ol className="space-y-4">
            {project.workflow.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-midnight-400/40 bg-midnight-950/80 text-xs font-bold text-midnight-300">
                  {i + 1}
                </span>
                <p className="text-sm leading-7 text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* ── RESULTS + HIGHLIGHTS ── */}
      <div className="mb-6">
        <Card className="border-midnight-400/25 bg-navy-900 p-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-midnight-400/80">Results & Insights</p>
          <p className="mb-6 text-sm leading-8 text-slate-200 sm:text-base">{project.results}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-midnight-400/25 bg-navy-975/80 p-4 text-sm font-medium leading-6 text-slate-100"
              >
                {highlight}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── CHALLENGES + LEARNINGS ── */}
      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <Card className="border-midnight-400/25 bg-navy-900 p-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Challenges</p>
          <p className="text-sm leading-8 text-slate-300">{project.challenges}</p>
        </Card>

        <Card className="border-midnight-400/25 bg-navy-900 p-7">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Key Learnings</p>
          <ul className="space-y-4">
            {project.learnings.map((learning) => (
              <li key={learning} className="flex gap-3">
                <span className="mt-1.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-rose-400/80" />
                <span className="text-sm leading-7 text-slate-300">{learning}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── SCREENSHOTS ── */}
      {project.screenshots.length > 0 && (
        <section className="rounded-[2rem] border border-midnight-400/25 bg-navy-900 p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Screenshots & Visuals</p>
          <p className="mb-8 text-sm leading-7 text-slate-400">
            Visual summaries of dashboards, architecture, and results from this project.
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {project.screenshots.map((screen) => (
              <div
                key={screen.title}
                className="rounded-[28px] border border-midnight-400/25 bg-navy-975/80 p-5"
              >
                <div className="mb-4 h-40 overflow-hidden rounded-3xl border border-navy-800/60 bg-navy-900">
                  <div className="relative h-full w-full bg-midnight-500/5" />
                </div>
                <p className="mb-1 text-sm font-semibold text-white">{screen.title}</p>
                <p className="text-sm leading-7 text-slate-400">{screen.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER NAV ── */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/projects"
          className="text-sm font-semibold text-slate-400 underline-offset-4 transition hover:text-white hover:underline"
        >
          ← Back to all projects
        </Link>
        <div className="flex flex-wrap gap-3">
          {project.links
            .filter((link) => link.label !== 'Case Study')
            .map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant={link.variant ?? 'ghost'}
                size="sm"
                className="h-10 px-4 text-sm"
              >
                {link.label}
              </Button>
            ))}
        </div>
      </div>
    </main>
  );
}
