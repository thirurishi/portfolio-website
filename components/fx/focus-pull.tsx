'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface FocusPullProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** How far the element is out of focus before it enters the view (px of blur). */
  blur?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/**
 * Lens "focus pull": content starts blurred and slightly zoomed, then snaps
 * sharp as it enters the viewport.
 */
export function FocusPull({ children, className, delay = 0, blur = 14, as = 'div' }: FocusPullProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur}px)`, scale: 1.03 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
