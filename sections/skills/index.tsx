'use client';

import { SectionContainer } from '@/components/shared';
import { FocusPull } from '@/components/fx/focus-pull';
import { skillsData } from '@/data/skills';

export function Skills() {
  return (
    <SectionContainer
      id="skills"
      scene="03"
      kicker="Kit"
      title="The kit."
      intro="The tools I reach for, grouped the way I use them: from the first SQL query to a deployed, monitored system."
    >
      <div className="grid gap-px bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
        {skillsData.map((group, i) => (
          <FocusPull key={group.category} delay={(i % 4) * 0.08} className="group relative bg-ink-975 p-6 transition-colors duration-500 hover:bg-ink-900">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-safelight-400">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-700">{group.items.length} tools</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-paper-50">{group.category}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-paper-600">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="border border-ink-600 px-2.5 py-1 font-mono text-[11px] text-paper-300 transition-colors duration-300 group-hover:border-paper-100/25"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-safelight-500 transition-transform duration-700 group-hover:scale-x-100" />
          </FocusPull>
        ))}
      </div>
    </SectionContainer>
  );
}
