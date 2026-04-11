'use client';

import { useEffect, useState } from 'react';
import { Button, Sheet } from '@/components/ui';
import { Menu } from 'lucide-react';
import { personalInfo } from '@/data/personal';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 36);

      const offset = 160;
      let currentSection = 'home';

      for (const link of links) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);

        if (element) {
          const top = element.offsetTop;
          if (scrollTop >= top - offset) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href.substring(1));
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-navy-950/80 backdrop-blur-xl'
            : 'border-white/5 bg-navy-950/45 backdrop-blur-md'
        }`}
        style={{
          boxShadow: scrolled
            ? '0 12px 40px rgba(0, 8, 20, 0.28), 0 0 0 1px rgba(99, 102, 241, 0.10)'
            : '0 4px 20px rgba(0, 8, 20, 0.12)'
        }}
      >
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-10 lg:px-16 xl:px-24">
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="group flex-shrink-0 space-y-1 transition-transform duration-300 hover:translate-y-[-1px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.38em] text-midnight-200 transition-colors duration-300 group-hover:text-white">
              {personalInfo.name}
            </p>
            <p className="max-w-[420px] text-[12px] font-medium leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
              {personalInfo.title}
            </p>
          </a>

          <nav className="ml-10 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white/8 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-midnight-300 opacity-100'
                        : 'bg-midnight-300 opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <Button
            variant="secondary"
            className="ml-auto border-navy-700/60 bg-navy-950/80 backdrop-blur-sm transition-all duration-300 hover:border-midnight-400/50 hover:bg-navy-950 md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="mr-2 h-4 w-4" />
            Menu
          </Button>
        </div>
      </header>

      <Sheet
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title="Navigation"
        description="Quick links to every section."
      >
        <div className="space-y-4">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block rounded-2xl border px-6 py-4 text-base font-medium transition-all duration-300 ${
                  isActive
                    ? 'border-midnight-400/60 bg-navy-950/90 text-midnight-300 shadow-midnight'
                    : 'border-navy-800/80 bg-navy-950/80 text-slate-100 hover:border-midnight-400/50 hover:bg-navy-950 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </Sheet>
    </>
  );
}