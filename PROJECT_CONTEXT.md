# PROJECT_CONTEXT.md

> Senior engineering handoff document. Read before touching anything.
> Last audited: 2026-04-09 against actual file contents — not assumptions.

---

## 1. What This Is

A personal portfolio website for **Thirumurugan Kumar**, a Data Science / ML professional pursuing a Master's at EPITA, Paris. The site presents his projects as case studies, displays skills and career timeline, and includes a contact form and resume download.

**Status: ~80% complete.** Core UI and all sections are built and visually polished. Several integration points remain unimplemented (form submission, GitHub links, missing PDF asset).

---

## 2. Tech Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 14.2.5 (App Router) | `app/` directory, no `pages/` |
| Language | TypeScript 5.6 (strict mode) | `@/*` path alias maps to repo root |
| Styling | Tailwind CSS 3.4 | Custom theme with navy/charcoal/midnight palette |
| Animation | `motion/react` | Framer Motion v11 — import path is `motion/react`, NOT `framer-motion` |
| Icons | lucide-react 0.484 | Used in navbar, project-card |
| Variants | class-variance-authority (CVA) 0.6 | Used only in `components/ui/button.tsx` |
| Fonts | Inter + JetBrains Mono | Loaded via Google Fonts in `globals.css` AND `app/layout.tsx` (dual load — see §9) |

---

## 3. Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, theme color
│   ├── page.tsx                # Homepage — renders all sections in order
│   ├── globals.css             # Global styles, custom keyframes, typography classes
│   └── projects/
│       ├── page.tsx            # /projects — static listing of all case studies
│       └── [slug]/page.tsx     # /projects/[slug] — individual case study (SSG)
├── components/
│   ├── layout/
│   │   └── navbar.tsx          # Fixed header, scroll detection, mobile sheet menu
│   ├── shared/
│   │   ├── section-container.tsx  # Wrapper for all content sections (id, title, intro)
│   │   └── section-title.tsx      # Standalone title component (used inside SectionContainer)
│   ├── projects/
│   │   └── project-detail.tsx  # Full case study layout (overview, results, challenges…)
│   └── ui/
│       ├── button.tsx          # Polymorphic button/anchor — 3 variants, 3 sizes (CVA)
│       ├── card.tsx            # Simple dark card wrapper
│       ├── badge.tsx           # Inline pill label (default/muted variants)
│       ├── input.tsx           # Text input (default/ghost variants)
│       ├── textarea.tsx        # Multi-line input, same styling as input
│       ├── sheet.tsx           # Slide-out panel for mobile nav (motion-animated)
│       ├── project-card.tsx    # Featured case study card (used in sections/projects)
│       ├── loading-screen.tsx  # Full-screen intro overlay — "TK" initials, 1200ms
│       └── contact-form.tsx    # Form UI only — submission is console.log (INCOMPLETE)
├── sections/
│   ├── hero/index.tsx          # Full-screen video hero, parallax, staggered text
│   ├── about/index.tsx         # Portrait + overview + skills grid + 4 highlight cards
│   ├── skills/index.tsx        # 8 skill category cards
│   ├── projects/index.tsx      # Grid of ProjectCard components
│   ├── journey/index.tsx       # Vertical timeline (reads from data/timeline.ts)
│   ├── resume/index.tsx        # Resume preview + download button
│   ├── contact/index.tsx       # Contact info panel + ContactForm
│   ├── footer/index.tsx        # Branding, back-to-top, copyright, social links
│   └── index.ts                # Re-exports all sections
├── data/
│   ├── personal.ts             # Core personal info — CONTAINS PLACEHOLDER EMAIL (see §9)
│   ├── contact.ts              # Contact details — uses REAL email
│   ├── hero.ts                 # Hero label, headline, CTA buttons
│   ├── about.ts                # Overview text, technical strengths, highlight cards
│   ├── skills.ts               # 8 skill categories with items
│   ├── education.ts            # Education records (not currently consumed by any section)
│   ├── projects.ts             # ProjectData interface + all 5 project records
│   ├── journey.ts              # JourneyEvent interface + journeyEvents array (UNUSED — see §9)
│   ├── timeline.ts             # timelineData array — this is what Journey section uses
│   └── social-links.ts         # LinkedIn, GitHub, Email links
├── lib/
│   ├── utils.ts                # cn() — minimal class merge (filter+join, NOT clsx/tailwind-merge)
│   ├── site-config.ts          # siteConfig — CONTAINS PLACEHOLDER URL AND EMAIL (see §9)
│   ├── projects.ts             # getProjectBySlug, getAllProjects, getProjectSlugs
│   └── motion.ts               # Shared Framer Motion variant presets
└── public/
    ├── hero-bg.mp4             # ✓ Present
    ├── about-me.jpeg           # ✓ Present
    └── resume.pdf              # ✗ MISSING — download button will 404
```

---

## 4. Data Flow

All content lives in `data/`. Sections import directly from their relevant data file. There is no CMS, API, or database. Updating content means editing the TypeScript files in `data/`.

```
data/personal.ts   → sections/resume
data/contact.ts    → sections/contact
data/social-links.ts → sections/contact, sections/footer
data/hero.ts       → sections/hero
data/about.ts      → sections/about
data/skills.ts     → sections/skills
data/projects.ts   → lib/projects.ts → sections/projects, app/projects/*
data/timeline.ts   → sections/journey    ← NOTE: not data/journey.ts
data/education.ts  → nothing            ← currently unused
```

---

## 5. Page Structure (Homepage)

`app/page.tsx` renders these in order, all stacked vertically:

```
LoadingScreen (overlay, auto-dismisses after ~1200ms)
Navbar (fixed, z-50)
<main id="home">
  ├── Hero        (id: none — scroll target is #home via navbar "Home" link)
  ├── About       (id: "about")
  ├── Skills      (id: "skills")
  ├── Projects    (id: "projects")
  ├── Journey     (id: "journey")
  ├── Resume      (id: "resume")
  ├── Contact     (id: "contact")
  └── Footer      (no id)
```

Global ambient effects (3 pulsing gradient blobs) are fixed behind all content in `page.tsx`.

---

## 6. Routing

| Route | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Client-rendered homepage |
| `/projects` | `app/projects/page.tsx` | Server component — lists all projects |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Statically generated (SSG) via `generateStaticParams` |

The 5 project slugs that get pre-generated:
- `sales-performance-dashboard`
- `employee-performance`
- `fake-news`
- `darknet-analysis`
- `traffic-yolov8`

---

## 7. Component Conventions

### `'use client'` directive
All sections and most UI components are client components. This is intentional because they use motion animations and scroll hooks. The only server components are `app/layout.tsx`, `app/projects/page.tsx`, and `app/projects/[slug]/page.tsx`.

### Animation pattern
Sections use this consistent pattern:
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={containerVariants}   // sectionContainer from lib/motion.ts
>
  <motion.div variants={itemVariants}>  // fadeInUp from lib/motion.ts
    ...
  </motion.div>
</motion.div>
```
Import animation variants from `lib/motion.ts`, not inline.

### `SectionContainer`
Every section except Hero wraps its content in `<SectionContainer id="..." title="..." intro="...">`. This provides consistent `id` anchors, title rendering, and spacing. Do not add sections without it.

### `cn()` utility
Located at `lib/utils.ts`. It is a minimal implementation: `classes.filter(Boolean).join(' ')`. It does **not** use `clsx` or `tailwind-merge`. Do not assume Tailwind class deduplication — conflicting classes will not be resolved.

### Button component
`components/ui/button.tsx` is polymorphic. Pass `href` to render an `<a>` tag; omit it for `<button>`. Variants: `default` (indigo gradient), `secondary` (navy/indigo), `ghost` (navy/ring). Sizes: `sm`, `default`, `lg`.

---

## 8. Design System

### Color palette
Custom Tailwind colors defined in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `navy-975` | `#000814` | Page background (deepest) |
| `navy-950` | `#020617` | Card backgrounds |
| `navy-900` | `#0f172a` | Secondary surfaces |
| `midnight-400` | `#818cf8` | Accent highlights |
| `midnight-500` | `#6366f1` | Primary accent (indigo) |
| `midnight-600` | `#4f46e5` | Button backgrounds |

`charcoal` and `slate` tokens are defined but map to identical hex values as `navy` and standard Tailwind `slate`. They exist for semantic naming clarity.

### Typography
Custom text classes defined in `globals.css`:

| Class | Use |
|---|---|
| `.text-hero` | H1 hero heading (6xl–9xl) |
| `.text-display` | Large section headers |
| `.text-heading` | Section card headers |
| `.text-subheading` | Hero descriptive text |
| `.text-body` | Standard body paragraphs |
| `.text-caption` | Mono uppercase labels |

### Custom animations (CSS, not Tailwind)
Defined in `globals.css`:
- `.animate-float` — 6s vertical float
- `.animate-float-delayed` — 7s float, 1s delay
- `.animate-float-delayed-2` — 8s float, 2s delay
- `.animate-shimmer` — opacity shimmer
- `.animate-glow-pulse` — indigo box-shadow pulse

---

## 9. Known Issues and Incomplete Areas

These are confirmed gaps based on actual code inspection.

### CRITICAL — Will break in production

**1. `resume.pdf` is missing**
- `public/resume.pdf` does not exist
- The Resume section download button (`sections/resume/index.tsx:101`) and hero CTA (`data/hero.ts`) both point to `/resume.pdf`
- Fix: place the actual PDF at `public/resume.pdf`

**2. Contact form does nothing**
- `components/ui/contact-form.tsx:9` — `handleSubmit` only runs `console.log('Form submitted')`
- No API route, no email service (Resend, Nodemailer, Formspree, etc.) is configured
- Fix: implement a form submission handler (API route or third-party service)

### DATA INCONSISTENCIES

**3. Email address split across files**
- `data/personal.ts` → `hello@example.com` (placeholder — not real)
- `lib/site-config.ts` → `hello@example.com` (placeholder — not real)
- `data/contact.ts` → `rishithiru1998@gmail.com` (real)
- `data/social-links.ts` → `rishithiru1998@gmail.com` (real)
- The Contact section correctly uses `data/contact.ts`. But `personal.ts` and `site-config.ts` are stale.
- Fix: update `personal.ts` and `site-config.ts` to use the real email

**4. `site-config.url` is a placeholder**
- `lib/site-config.ts:4` → `url: 'https://example.com'`
- This is used in `app/layout.tsx` metadata
- Fix: update to the actual deployed URL once known

**5. Duplicate journey data**
- `data/journey.ts` exports `JourneyEvent` interface and `journeyEvents` array
- `data/timeline.ts` exports `timelineData` — same 3 entries, same structure
- `sections/journey/index.tsx` imports from `data/timeline.ts`, not `data/journey.ts`
- `data/journey.ts` is effectively unused (only its interface is implicitly shared)
- Fix: either consolidate into one file, or have `timeline.ts` import the interface from `journey.ts`

**6. `data/timeline.ts` uses `JourneyEvent` type without importing it**
- `data/timeline.ts:1` → `export const timelineData: JourneyEvent[] = [`
- `JourneyEvent` is defined in `data/journey.ts` but is never imported in `timeline.ts`
- This is a TypeScript error waiting to surface (may be silently working due to structural typing inference in some configurations)
- Fix: add `import type { JourneyEvent } from './journey';` to `timeline.ts`

### PLACEHOLDER CONTENT

**7. All GitHub project links point to `#`**
- Every project in `data/projects.ts` has `links: [{ label: 'GitHub', href: '#', variant: 'ghost' }]`
- Fix: replace `#` with actual GitHub repository URLs

**8. All project screenshots are empty**
- Every project has `screenshots: []` in `data/projects.ts`
- `components/projects/project-detail.tsx` renders a screenshots section — it will render an empty grid
- Fix: add screenshot objects `{ title: string; description: string }` and place image files in `public/`

**9. `data/education.ts` is unused**
- Defines Master's and Bachelor's records but is not imported anywhere
- The Journey section uses inline data from `data/timeline.ts` instead
- Not a bug, but a dead file

### DEPENDENCY NOTE

**10. `tailwind-merge` installed but not used**
- `package.json` lists `tailwind-merge: ^1.14.0`
- `lib/utils.ts` does NOT use it — `cn()` is a plain filter+join
- If conflicting Tailwind classes become a problem, integrate `tailwind-merge` into `cn()`

---

## 10. How to Add or Edit Content

### Add a new project
1. Add a new object to the `projectsData` array in `data/projects.ts`
2. Follow the `ProjectData` interface exactly (all fields required, `screenshots` can be `[]`)
3. `slug` must be URL-safe (lowercase, hyphens only)
4. The `/projects/[slug]` page generates statically — no routing changes needed

### Edit personal info
- Resume focus areas / internship interests / strengths → `data/personal.ts`
- Email / location → `data/contact.ts` (and update `data/personal.ts` and `lib/site-config.ts` to match)
- Social links → `data/social-links.ts`
- Hero CTAs → `data/hero.ts`
- About text / technical strengths → `data/about.ts`

### Add a new timeline entry
1. Edit `data/timeline.ts` — add a new object following the same structure
2. `category` must be `'education' | 'internship' | 'career'`
3. `accent` must be `'sky' | 'cyan' | 'violet'`
4. Order in the array is the display order

### Add a new section
1. Create `sections/your-section/index.tsx` with `'use client'`
2. Wrap content in `<SectionContainer id="your-section" title="..." intro="...">`
3. Use `motion` + `sectionContainer` / `fadeInUp` variants from `lib/motion.ts`
4. Export from `sections/index.ts`
5. Import and add to `app/page.tsx` in the correct position
6. Add a nav link in `components/layout/navbar.tsx`

---

## 11. Public Assets

| File | Status | Used by |
|---|---|---|
| `public/hero-bg.mp4` | ✓ Present | `sections/hero/index.tsx` — full-screen background video |
| `public/about-me.jpeg` | ✓ Present | `sections/about/index.tsx` — portrait image |
| `public/resume.pdf` | ✗ MISSING | `sections/resume/index.tsx`, `data/hero.ts` CTA |

---

## 12. Navbar Navigation Links

Defined inline in `components/layout/navbar.tsx`. Each link maps to a section `id`:

| Label | href |
|---|---|
| Home | `#home` |
| About | `#about` |
| Skills | `#skills` |
| Projects | `#projects` |
| Journey | `#journey` |
| Resume | `#resume` |
| Contact | `#contact` |

The mobile nav uses `components/ui/sheet.tsx` (a motion-animated slide-out panel), triggered by a hamburger button visible below the `md` breakpoint.

---

## 13. What Is Confirmed Working (Visually)

Based on code inspection (not runtime testing):
- All sections render with correct layout and motion animations
- Hero video loads from `public/hero-bg.mp4`
- About portrait loads from `public/about-me.jpeg`
- Project cards link to `/projects/[slug]` detail pages
- Case study pages generate statically for all 5 slugs
- Contact section displays email, location, and social links correctly
- Loading screen animates and dismisses automatically
- Navbar scroll detection and mobile sheet menu are implemented
- Footer copyright year is hardcoded as `2026`

---

## 14. Pre-Launch Checklist

- [ ] Add `public/resume.pdf`
- [ ] Implement contact form submission (API route or third-party service)
- [ ] Replace all GitHub `href: '#'` in `data/projects.ts` with real URLs
- [ ] Update `data/personal.ts` email from `hello@example.com` to real email
- [ ] Update `lib/site-config.ts` url and email from placeholders to real values
- [ ] Add project screenshots to `data/projects.ts` and place images in `public/`
- [ ] Fix `data/timeline.ts` — add `import type { JourneyEvent } from './journey'`
- [ ] Decide on `data/journey.ts` vs `data/timeline.ts` — consolidate or document the split
- [ ] Verify fonts are not double-loaded (Google Fonts `@import` in `globals.css` + Next.js font in `layout.tsx`)
