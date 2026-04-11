interface SectionContainerProps {
  id?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
}

export function SectionContainer({ id, title, intro, children }: SectionContainerProps) {
  return (
    <section id={id} className="relative royal-texture">
      {/* Gold separator rule at top of every section */}
      <div className="absolute inset-x-0 top-0 h-px bg-midnight-400/35" />

      {title ? (
        <div className="mb-12">
          {/* Label row with gold ornament */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-midnight-400/70" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.45em] text-midnight-400">
              ✦ Portfolio
            </span>
            <span className="h-px flex-1 bg-midnight-400/20" />
          </div>
          {/* Main heading */}
          <h2 className="text-shimmer text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
          {/* Gold underline */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px w-14 bg-midnight-400/60" />
            <div className="h-px w-4 bg-midnight-400/30" />
          </div>
        </div>
      ) : null}

      {intro ? <p className="mb-10 max-w-3xl text-slate-400 leading-7">{intro}</p> : null}
      {children}
    </section>
  );
}
