'use client';

import Link from 'next/link';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projectsData, type ProjectData } from '@/data/projects';
import { FrameArt } from '@/components/projects/frame-art';
import { CountUp } from '@/components/fx/count-up';
import { FocusPull } from '@/components/fx/focus-pull';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function Frame({ project, index, total }: { project: ProjectData; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  // On touch screens there is no hover, so frames develop when they reach the middle of the screen.
  const centred = useInView(ref, { amount: 0.6 });
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(window.matchMedia('(hover: none)').matches), []);

  const frameNo = String(index + 1).padStart(2, '0');
  const links = project.links.filter((l) => l.href && l.href !== '#');
  const tint = project.tint ?? '#e8e2d6';

  return (
    <article
      ref={ref}
      className={`group relative flex w-full shrink-0 flex-col lg:w-[min(640px,62vw)] ${touch && centred ? 'develop-on' : ''}`}
    >
      {/* Edge markings, like the printed edge of a negative */}
      <div className="film-edge-text flex items-center justify-between px-1 pb-2">
        <span>TK 400 · {frameNo}A</span>
        <span className="hidden sm:inline">▸ {frameNo}</span>
        <span>
          {frameNo} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* The exposure */}
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="View"
        className="develop relative block aspect-[16/10] overflow-hidden bg-ink-950 outline-none ring-safelight-500 focus-visible:ring-2 lg:aspect-auto lg:h-[min(38vh,400px)]"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="absolute inset-0 opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-[8%]">{project.art ? <FrameArt art={project.art} tint={tint} /> : null}</div>
        </div>
        {/* Colour wash that appears as the print develops */}
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: `radial-gradient(120% 90% at 85% 10%, ${tint}55, transparent 60%)` }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-975/90 via-ink-975/50 to-transparent" />
        {project.metric ? (
          <div className="absolute bottom-0 left-0 p-5 sm:p-6">
            <CountUp
              value={project.metric.value}
              decimals={project.metric.decimals}
              prefix={project.metric.prefix}
              suffix={project.metric.suffix}
              className="fx-rgb block font-display text-5xl leading-none text-paper-50 sm:text-6xl"
            />
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-paper-300">{project.metric.label}</span>
          </div>
        ) : null}
        <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-300">{project.context}</span>
      </Link>

      {/* Caption, written on the film base */}
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-3xl leading-tight text-paper-50 lg:text-[1.75rem] xl:text-[2rem]">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-paper-500 lg:line-clamp-2">{project.description}</p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-600">{project.stack.join(' · ')}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-100 underline decoration-safelight-500/70 underline-offset-[6px] hover:text-safelight-300"
          >
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-500 hover:text-paper-100"
            >
              {link.label === 'GitHub' ? <Github className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [frame, setFrame] = useState(1);
  const total = projectsData.length;

  useIsoLayoutEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia('(min-width: 1024px)').matches && !reduce;
      setPinned(desktop);
      if (desktop && stripRef.current && viewportRef.current) {
        setDistance(Math.max(0, stripRef.current.scrollWidth - viewportRef.current.clientWidth));
      } else {
        setDistance(0);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!pinned) return;
    setFrame(Math.min(total, Math.max(1, Math.round(v * (total - 1)) + 1)));
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative !px-0 !py-0"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col overflow-hidden pt-20' : 'py-24'}>
        {/* Header */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 xl:px-16">
          <FocusPull>
            <div className="mb-5 flex items-center gap-4">
              <span className="camera-label !text-safelight-400">Scene 04</span>
              <span className="h-px flex-1 bg-ink-700" />
              <span className="camera-label tabular-nums">
                {pinned ? `Frame ${String(frame).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : `${total} frames`}
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-display text-paper-50">Selected work</h2>
              <p className="max-w-md text-[15px] leading-relaxed text-paper-500">
                SQL pipelines, BI reports, ML systems and deployed NLP apps.{' '}
                <span className="hidden lg:inline">Hover a frame to develop it.</span>
                <span className="lg:hidden">Each frame develops as you scroll.</span>
              </p>
            </div>
          </FocusPull>
        </div>

        {/* Film strip */}
        <div ref={viewportRef} className={`relative mt-6 w-full ${pinned ? 'flex-1 overflow-hidden' : ''}`}>
          <motion.div
            ref={stripRef}
            style={{ x }}
            className={`film-base relative ${pinned ? 'flex h-full w-max flex-col' : 'mx-auto max-w-3xl'}`}
          >
            <div className="sprockets" />
            <div className={`flex gap-10 px-6 py-6 sm:px-10 ${pinned ? 'flex-1 flex-row items-center gap-14 py-4 pl-[max(2.5rem,calc((100vw_-_80rem)/2_+_4rem))] pr-[20vw]' : 'flex-col'}`}>
              {projectsData.map((project, i) => (
                <Frame key={project.slug} project={project} index={i} total={total} />
              ))}
              <div className={`flex shrink-0 flex-col justify-center ${pinned ? 'w-[360px]' : 'py-6'}`}>
                <p className="camera-label">End of roll</p>
                <p className="mt-3 font-display text-4xl text-paper-50">More on GitHub</p>
                <a
                  href="https://github.com/thirurishi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-200 underline decoration-safelight-500 underline-offset-[6px]"
                >
                  github.com/thirurishi <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="sprockets" />
          </motion.div>
        </div>

        {/* Progress along the roll */}
        {pinned ? (
          <div className="mx-auto mb-5 mt-4 h-px w-[calc(100%-3rem)] max-w-7xl bg-ink-700">
            <motion.div className="h-px bg-safelight-500" style={{ width: progressWidth }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
