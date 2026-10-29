'use client';

import { MotionConfig } from 'motion/react';

/** Honour the visitor's "reduce motion" system setting for all animations. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
