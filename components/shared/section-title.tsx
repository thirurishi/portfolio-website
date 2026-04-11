interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.4em] text-midnight-400">Section</p>
      <h3 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">{children}</h3>
    </div>
  );
}
