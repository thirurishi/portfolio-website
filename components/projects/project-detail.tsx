import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import type { ProjectData } from '@/lib/projects';
import { getAllProjects } from '@/lib/projects';
import { FrameArt } from '@/components/projects/frame-art';
import { FocusPull } from '@/components/fx/focus-pull';
import { CountUp } from '@/components/fx/count-up';

interface ProjectDetailProps {
  project: ProjectData;
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <FocusPull className="border-t border-ink-700 pt-6">
      <p className="camera-label">{label}</p>
      <div className="mt-4">{children}</div>
    </FocusPull>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all[(index + 1) % all.length];
  const links = project.links.filter((l) => l.href && l.href !== '#');
  const tint = project.tint ?? '#e8e2d6';
  const frameNo = String(index + 1).padStart(2, '0');

  return (
    <main className="relative px-6 pb-24 pt-8 sm:px-10 xl:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-ink-700 pb-5">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-400 hover:text-paper-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All projects
          </Link>
          <span className="camera-label tabular-nums">
            Frame {frameNo} / {String(all.length).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <FocusPull className="pt-14">
          <p className="camera-label !text-safelight-400">{project.context ?? 'Case study'}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-paper-50 sm:text-6xl lg:text-7xl">{project.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-paper-400">{project.description}</p>
          {links.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-11 items-center gap-2 px-6 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
                    link.label === 'Live demo'
                      ? 'bg-paper-100 text-ink-975 hover:bg-safelight-500 hover:text-paper-50'
                      : 'border border-paper-100/35 text-paper-100 hover:border-paper-100'
                  }`}
                >
                  {link.label === 'GitHub' ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </FocusPull>

        {/* Hero frame (fully developed here) */}
        <FocusPull className="film-base mt-14">
          <div className="sprockets" />
          <div className="px-4 py-3 sm:px-6">
            <div className="film-edge-text flex justify-between pb-2">
              <span>TK 400 · {frameNo}A</span>
              <span>{project.stack.join(' · ')}</span>
            </div>
            <div className="relative aspect-[16/8] overflow-hidden bg-ink-950">
              <div className="absolute inset-[6%]">{project.art ? <FrameArt art={project.art} tint={tint} /> : null}</div>
              <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: `radial-gradient(120% 90% at 85% 10%, ${tint}55, transparent 60%)` }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-975/90 to-transparent" />
              {project.metric ? (
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <CountUp
                    value={project.metric.value}
                    decimals={project.metric.decimals}
                    prefix={project.metric.prefix}
                    suffix={project.metric.suffix}
                    className="block font-display text-6xl leading-none text-paper-50 sm:text-7xl"
                  />
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-paper-300">{project.metric.label}</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="sprockets" />
        </FocusPull>

        {/* Story */}
        <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-12">
            <Block label="Overview">
              <p className="text-[17px] leading-relaxed text-paper-300">{project.overview}</p>
            </Block>
            <div className="grid gap-12 sm:grid-cols-2">
              <Block label="Problem">
                <p className="text-[15px] leading-relaxed text-paper-400">{project.problem}</p>
              </Block>
              <Block label="Objective">
                <p className="text-[15px] leading-relaxed text-paper-400">{project.objective}</p>
              </Block>
            </div>
            <Block label="How it works">
              <ol className="space-y-4">
                {project.workflow.map((step, i) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="font-mono text-[12px] text-safelight-400">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[15px] leading-relaxed text-paper-300">{step}</p>
                  </li>
                ))}
              </ol>
            </Block>
            <Block label="Results">
              <p className="font-display text-2xl leading-snug text-paper-50 sm:text-3xl">{project.results}</p>
            </Block>
            <Block label="Challenges">
              <p className="text-[15px] leading-relaxed text-paper-400">{project.challenges}</p>
            </Block>
          </div>

          <aside className="space-y-12">
            <Block label="Data">
              <p className="text-[15px] leading-relaxed text-paper-400">{project.input}</p>
            </Block>
            <Block label="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <li key={t} className="border border-ink-600 px-2.5 py-1 font-mono text-[11px] text-paper-300">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="Highlights">
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-paper-300">
                    <span className="mt-[10px] h-px w-4 shrink-0 bg-safelight-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="Impact">
              <p className="text-[15px] leading-relaxed text-paper-300">{project.impact}</p>
            </Block>
            <Block label="What I learned">
              <ul className="space-y-3">
                {project.learnings.map((l) => (
                  <li key={l} className="text-[15px] leading-relaxed text-paper-400">
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
          </aside>
        </div>

        {/* Next frame */}
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="Next"
          className="group mt-24 flex flex-col gap-4 border-t border-ink-700 pt-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="camera-label">Next frame</p>
            <p className="mt-3 font-display text-4xl text-paper-50 transition-colors group-hover:text-paper-300 sm:text-5xl">{next.title}</p>
          </div>
          <ArrowRight className="h-8 w-8 shrink-0 text-safelight-500 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    </main>
  );
}
