import { FocusPull } from '@/components/fx/focus-pull';

interface SectionContainerProps {
  id?: string;
  title?: string;
  intro?: string;
  /** Scene number shown above the title, like a film slate. */
  scene?: string;
  /** Small label after the scene number. */
  kicker?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({ id, title, intro, scene, kicker, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={`relative ${className ?? ''}`}>
      <div className="mx-auto w-full max-w-7xl">
        {title ? (
          <FocusPull className="mb-14">
            <div className="mb-6 flex items-center gap-4">
              {scene ? <span className="camera-label !text-safelight-400">Scene {scene}</span> : null}
              <span className="h-px flex-1 bg-ink-700" />
              {kicker ? <span className="camera-label hidden sm:inline">{kicker}</span> : null}
            </div>
            <h2 className="text-display text-paper-50">{title}</h2>
            {intro ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper-500">{intro}</p> : null}
          </FocusPull>
        ) : null}
        {children}
      </div>
    </section>
  );
}
