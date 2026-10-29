'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
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
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      let current = '';
      for (const link of links) {
        const el = document.getElementById(link.href.slice(1));
        if (el && y >= el.offsetTop - 200) current = link.href.slice(1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-ink-700/70 bg-ink-975/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4 sm:px-10 xl:px-16">
          <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="flex h-9 w-9 items-center justify-center border border-paper-100/40 font-display text-lg italic text-paper-50 transition group-hover:border-safelight-500">
              TK
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-paper-200 sm:inline">
              Thirumurugan Kumar
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((link, i) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-paper-50' : 'text-paper-500 hover:text-paper-100'
                  }`}
                >
                  <span className={`mr-1.5 ${isActive ? 'text-safelight-400' : 'text-paper-700'}`}>0{i + 2}</span>
                  {link.label}
                  {isActive ? (
                    <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-px bg-safelight-500" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 border border-paper-100/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" /> Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink-975 px-6 py-5 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="camera-label">Index</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 border border-paper-100/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-100"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>
            <nav className="mt-12 flex flex-col" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-baseline gap-4 border-b border-ink-700 py-4"
                >
                  <span className="font-mono text-xs text-safelight-400">0{i + 2}</span>
                  <span className="font-display text-4xl text-paper-50">{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
