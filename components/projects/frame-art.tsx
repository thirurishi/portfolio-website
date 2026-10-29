'use client';

import { motion, type Variants } from 'motion/react';
import type { ProjectData } from '@/data/projects';

type Art = NonNullable<ProjectData['art']>;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.2, delay: 0.15 * i } }
  })
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.04 * i } })
};

/**
 * Abstract "photograph" for each project, drawn in SVG from what the project
 * actually does (cohort triangle, model ensemble, ATS gauge, pipeline, star
 * schema, sales trend). Rendered in the project's tint; the parent frame keeps
 * it black-and-white until it develops.
 */
export function FrameArt({ art, tint }: { art: Art; tint: string }) {
  return (
    <motion.svg
      viewBox="0 0 400 260"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      aria-hidden="true"
      style={{ color: tint }}
    >
      {art === 'cohort' && <Cohort />}
      {art === 'ensemble' && <Ensemble />}
      {art === 'gauge' && <Gauge />}
      {art === 'pipeline' && <Pipeline />}
      {art === 'schema' && <Schema />}
      {art === 'trend' && <Trend />}
    </motion.svg>
  );
}

function Cohort() {
  const n = 9;
  const cells = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n - r; c++) {
      const strength = c === 0 ? 1 : Math.max(0.06, 0.55 * Math.exp(-c * 0.55) + (r % 3 === 1 ? 0.04 : 0));
      cells.push(
        <motion.rect
          key={`${r}-${c}`}
          custom={r + c}
          variants={pop}
          x={70 + c * 29}
          y={14 + r * 26}
          width={26}
          height={23}
          fill="currentColor"
          fillOpacity={Math.round(strength * 1000) / 1000}
        />
      );
    }
  }
  return (
    <g>
      {cells}
      <motion.path custom={3} variants={draw} d="M70 245 C 120 120, 160 225, 330 238" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    </g>
  );
}

function Ensemble() {
  const waves = [
    'M90 40 C 140 10, 170 80, 220 55 S 280 95, 310 100',
    'M90 100 C 140 75, 170 125, 220 95 S 280 100, 310 100',
    'M90 160 C 140 190, 170 125, 220 150 S 280 110, 310 100'
  ];
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      {waves.map((d, i) => (
        <motion.path key={d} custom={i} variants={draw} d={d} strokeOpacity={0.55 + i * 0.15} />
      ))}
      <motion.circle custom={4} variants={pop} cx="310" cy="100" r="8" fill="currentColor" />
      <motion.path custom={4} variants={draw} d="M318 100 H 360" strokeWidth="2.5" />
      <motion.rect custom={6} variants={pop} x="360" y="82" width="30" height="36" fill="currentColor" fillOpacity="0.25" />
      {[44, 104, 164].map((y, i) => (
        <motion.text key={y} custom={i} variants={pop} x="20" y={y} fill="currentColor" stroke="none" fontSize="11" fontFamily="monospace" opacity="0.8">
          {['LSTM', 'GRU', 'TextCNN'][i]}
        </motion.text>
      ))}
    </g>
  );
}

function Gauge() {
  return (
    <g fill="none" stroke="currentColor">
      <motion.rect custom={0} variants={pop} x="40" y="30" width="140" height="200" strokeOpacity="0.7" strokeWidth="1.5" />
      {[60, 80, 100, 130, 150, 170, 195].map((y, i) => (
        <motion.path key={y} custom={i} variants={draw} d={`M58 ${y} H ${i % 3 === 2 ? 130 : 162}`} strokeOpacity="0.5" strokeWidth="3" />
      ))}
      <path d="M230 170 A 70 70 0 1 1 370 170" strokeOpacity="0.2" strokeWidth="14" />
      <motion.path custom={2} variants={draw} d="M230 170 A 70 70 0 1 1 352 120" strokeWidth="14" />
      <motion.text custom={5} variants={pop} x="300" y="168" textAnchor="middle" fill="currentColor" stroke="none" fontSize="34" fontFamily="Georgia, serif">
        82
      </motion.text>
      <motion.text custom={6} variants={pop} x="300" y="200" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11" fontFamily="monospace" opacity="0.8">
        ATS SCORE
      </motion.text>
    </g>
  );
}

function Pipeline() {
  const nodes = [
    { x: 20, y: 110, t: 'INGEST' },
    { x: 110, y: 110, t: 'VALIDATE' },
    { x: 200, y: 60, t: 'STORE' },
    { x: 200, y: 165, t: 'REJECT' },
    { x: 290, y: 60, t: 'PREDICT' },
    { x: 290, y: 165, t: 'MONITOR' }
  ];
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      {['M95 128 H 110', 'M185 128 C 192 128, 192 78, 200 78', 'M185 128 C 192 128, 192 183, 200 183', 'M275 78 H 290', 'M327 96 V 165'].map((d, i) => (
        <motion.path key={d} custom={i + 1} variants={draw} d={d} />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.t} custom={i * 2} variants={pop}>
          <rect x={n.x} y={n.y} width="75" height="36" fill="currentColor" fillOpacity={n.t === 'REJECT' ? 0.08 : 0.2} strokeDasharray={n.t === 'REJECT' ? '3 3' : undefined} />
          <text x={n.x + 37.5} y={n.y + 22} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontFamily="monospace">
            {n.t}
          </text>
        </motion.g>
      ))}
    </g>
  );
}

function Schema() {
  const dims = [
    { x: 30, y: 30, t: 'DimProduct' },
    { x: 270, y: 30, t: 'DimCustomer' },
    { x: 30, y: 190, t: 'DimDate' },
    { x: 270, y: 190, t: 'DimRegion' }
  ];
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      {['M130 58 L 160 105', 'M270 58 L 240 105', 'M130 205 L 160 158', 'M270 205 L 240 158'].map((d, i) => (
        <motion.path key={d} custom={i + 1} variants={draw} d={d} strokeOpacity="0.7" />
      ))}
      <motion.g custom={0} variants={pop}>
        <rect x="150" y="100" width="100" height="62" fill="currentColor" fillOpacity="0.28" strokeWidth="2" />
        <text x="200" y="136" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontFamily="monospace">
          FactSales
        </text>
      </motion.g>
      {dims.map((d, i) => (
        <motion.g key={d.t} custom={i + 3} variants={pop}>
          <rect x={d.x} y={d.y} width="100" height="40" fill="currentColor" fillOpacity="0.1" />
          <text x={d.x + 50} y={d.y + 24} textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontFamily="monospace">
            {d.t}
          </text>
        </motion.g>
      ))}
    </g>
  );
}

function Trend() {
  const bars = [60, 85, 70, 110, 95, 130, 120, 150, 140, 175];
  return (
    <g>
      {bars.map((h, i) => (
        <motion.rect key={i} custom={i} variants={pop} x={30 + i * 35} y={240 - h * 0.6} width="20" height={h * 0.6} fill="currentColor" fillOpacity="0.18" />
      ))}
      <motion.path
        custom={1}
        variants={draw}
        d="M40 190 L 75 160 L 110 175 L 145 120 L 180 135 L 215 95 L 250 105 L 285 70 L 320 82 L 355 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <motion.circle custom={9} variants={pop} cx="355" cy="40" r="6" fill="currentColor" />
      <motion.path custom={3} variants={draw} d="M30 240 H 380" stroke="currentColor" strokeOpacity="0.4" fill="none" />
    </g>
  );
}
