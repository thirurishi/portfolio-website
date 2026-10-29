'use client';

import { useEffect, useState } from 'react';

/**
 * Tiny shared flag so the hero can wait for the developing intro to finish
 * before playing its own entrance.
 */
const EVENT = 'tk:intro-done';

declare global {
  interface Window {
    __tkIntroPlaying?: boolean;
  }
}

export function markIntroPlaying() {
  window.__tkIntroPlaying = true;
}

export function markIntroDone() {
  window.__tkIntroPlaying = false;
  window.dispatchEvent(new Event(EVENT));
}

/** Returns true once the page is ready for entrance animations. */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!window.__tkIntroPlaying) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener(EVENT, onDone);
    return () => window.removeEventListener(EVENT, onDone);
  }, []);
  return done;
}
