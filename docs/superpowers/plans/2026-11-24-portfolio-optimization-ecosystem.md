# Portfolio Optimization & Cloud Ecosystem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the personal portfolio into a high-performance, secure, and unified showcase by eliminating bundle bloat, fixing erratic particle animations across 8 sections, securing GitHub stats, sanitizing cache lifecycles, and highlighting the 4 live Cloudflare edge companion services.

**Architecture:**
A clean component architecture decoupling background ambiance from section views via a single root-level `ParticleBackground` component. Build optimization splits vendor libraries into distinct cacheable chunks via Vite `manualChunks`. A new glassmorphic `EcosystemShowcase` component anchors live subdomains (`gezi`, `weather`, `okur`, `clementine`) directly beneath Hero with edge status indicators. The Statistics engine switches to public endpoints and pre-computed language breakdowns to eliminate security risks and rate limits.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS, Framer Motion 11, Chart.js 4, Cloudflare Pages & Wrangler CLI.

**Spec:** [docs/superpowers/specs/2026-11-24-portfolio-optimization-ecosystem-design.md](file:///home/mert/Masaüstü/Projeler/Frontend/JS_TS/portfolio_mp-main/docs/superpowers/specs/2026-11-24-portfolio-optimization-ecosystem-design.md)

## Global Constraints

- **Title/Bio Requirement:** Title and bio must use "Developer", never "Engineer".
- **Zero Token Leakage:** Never require or expose `VITE_GITHUB_TOKEN` in client-side bundles.
- **Zero Jumps/Glitches:** No unmemoized `Math.random()` inside render cycles; particles must float continuously.
- **Data Preservation:** Never call `localStorage.clear()` or `sessionStorage.clear()` in cache maintenance.
- **No Unprompted Reloads:** Never trigger unprompted `window.location.reload()` intervals while a visitor browses.
- **Bundle Chunk Limit:** All JavaScript vendor chunks must stay below 300 KB gzipped.

## Review Focus

1. **Particle Animation Smoothness:** Particles must float downwards without teleporting or jumping when clicking buttons, typing in inputs, or scrolling.
2. **Offline/Rate-Limited Statistics:** When GitHub API is rate-limited (unauthenticated 403), the statistics section must gracefully display verified language distributions and project metrics instead of crashing or showing an error card.
3. **Responsive Ecosystem Grid:** The 4 companion service cards must layout cleanly on mobile screens (1 column), tablets (2 columns), and desktop (4 columns) without text overflow or clipped badges.
4. **Cache & Local Storage Safety:** Any version update must only evict stale cache storage (`caches.delete`) without wiping user theme preferences or form drafts in `localStorage`.
5. **Clean TypeScript Build:** `npm run build` must succeed with zero TypeScript diagnostics and clean rollup chunks.

---

### Task 1: Dependency Trimming & Vite Chunk Optimization

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: Existing npm configuration.
- Produces: Lean `package.json` without 6 dead packages (`@react-three/fiber`, `@react-three/drei`, `framer-motion-3d`, `recharts`, `react-awesome-reveal`, `react-github-calendar`), and `vite.config.ts` with `manualChunks`.

- [ ] **Step 1: Inspect and remove dead packages from `package.json`**
Remove unused packages:
```bash
npm uninstall @react-three/fiber @react-three/drei framer-motion-3d recharts react-awesome-reveal react-github-calendar
```

- [ ] **Step 2: Update `vite.config.ts` with manual chunk splitting**
Modify `vite.config.ts` to add `manualChunks` in `rollupOptions.output`:
```typescript
manualChunks: {
  'vendor-react': ['react', 'react-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-charts': ['chart.js', 'react-chartjs-2', 'react-countup'],
  'vendor-icons': ['react-icons']
}
```

- [ ] **Step 3: Run build test to verify chunks and build success**
Run: `npm run build`
Expected: Build passes with separate `vendor-react-*.js`, `vendor-motion-*.js`, `vendor-charts-*.js`, `vendor-icons-*.js` chunks.

- [ ] **Step 4: Commit dependency and Vite changes**
```bash
git add package.json package-lock.json vite.config.ts
git commit -m "perf: trim unused dependencies and configure manual chunk splitting"
```

---

### Task 2: Unified GPU-Accelerated Particle Background Component

**Files:**
- Create: `src/Components/ParticleBackground/index.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Window dimensions / responsive viewport.
- Produces: `<ParticleBackground />` component mounted at the root of `App.tsx` (`fixed inset-0 pointer-events-none z-0`).

- [ ] **Step 1: Create `src/Components/ParticleBackground/index.tsx`**
Implement memoized particles with stable initial positions, duration, drift, and continuous vertical movement:
```typescript
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of viewport width
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 10 + 12, // 12s to 22s smooth drift
      delay: Math.random() * 8, // staggered starts
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 shadow-sm"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{ y: -20, opacity: p.opacity }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
```

- [ ] **Step 2: Mount `ParticleBackground` in `src/App.tsx`**
Import `ParticleBackground` and insert directly inside root `<div className="App ...">`:
```typescript
import ParticleBackground from "./Components/ParticleBackground";
...
return (
  <div className="App min-h-screen relative bg-white text-black">
    <ParticleBackground />
    <Navbar />
    ...
```

- [ ] **Step 3: Test compilation**
Run: `npm run build`
Expected: Build passes with zero errors.

- [ ] **Step 4: Commit particle background component**
```bash
git add src/Components/ParticleBackground/index.tsx src/App.tsx
git commit -m "feat: add unified memoized ParticleBackground component"
```

---

### Task 3: Particle Cleanup Across 8 Sections

**Files:**
- Modify: `src/Sections/Hero/index.tsx` (remove lines 66-89)
- Modify: `src/Sections/AboutMe/index.tsx` (remove lines 144-167)
- Modify: `src/Sections/Skills/index.tsx` (remove lines 143-166)
- Modify: `src/Sections/Projects/index.tsx` (remove lines 63-86)
- Modify: `src/Sections/Education/index.tsx` (remove lines 402-425)
- Modify: `src/Sections/Blog/index.tsx` (remove lines 85-108)
- Modify: `src/Sections/Contact/index.tsx` (remove lines 100-123)
- Modify: `src/Sections/Footer/index.tsx` (remove lines 11-34)

**Interfaces:**
- Consumes: Clean JSX templates.
- Produces: Sections free of unmemoized `Math.random()` loops, allowing unified background to shine through seamlessly.

- [ ] **Step 1: Clean particles from `Hero` and `AboutMe`**
Remove local animated particle blocks from `Hero/index.tsx` and `AboutMe/index.tsx`.

- [ ] **Step 2: Clean particles from `Skills` and `Projects`**
Remove local animated particle blocks from `Skills/index.tsx` and `Projects/index.tsx`.

- [ ] **Step 3: Clean particles from `Education` and `Blog`**
Remove local animated particle blocks from `Education/index.tsx` and `Blog/index.tsx`.

- [ ] **Step 4: Clean particles from `Contact` and `Footer`**
Remove local animated particle blocks from `Contact/index.tsx` and `Footer/index.tsx`.

- [ ] **Step 5: Verify build and ensure no `Array(18)` remains**
Run: `grep -rn "Array(18)" src/ && npm run build`
Expected: 0 matches for scattered particle loops; build succeeds cleanly.

- [ ] **Step 6: Commit particle cleanup across sections**
```bash
git add src/Sections/
git commit -m "refactor: eliminate scattered unmemoized particle loops across all 8 sections"
```

---

### Task 4: Live Cloud Ecosystem Showcase Component

**Files:**
- Create: `src/Components/EcosystemShowcase/index.tsx`
- Modify: `src/App.tsx` (mount beneath `Hero`)

**Interfaces:**
- Consumes: Companion domains metadata (`gezi`, `weather`, `okur`, `clementine`).
- Produces: Interactive glassmorphic showcase component with live edge status badges and direct outbound links.

- [ ] **Step 1: Create `src/Components/EcosystemShowcase/index.tsx`**
Implement the 4 companion cards with badge styling, icon accents, protocol indicators, and hover effects:
1. **Okur (v9.3.4):** `https://okur.mertpehlivan.co.uk` • PWA & Android • Jetpack Glance & AI Literary Engine • `● 7/24 Edge`
2. **Dinamik Hava Durumu:** `https://weather.mertpehlivan.co.uk` • 4-Model Ensemble • Serverless Worker • `● 7/24 Edge`
3. **Viyana & Prag Seyahat Paneli:** `https://gezi.mertpehlivan.co.uk` • Leaflet GPS & 10-Altın Boyut Denetimi • `● 7/24 Edge`
4. **Clementine Web Remote:** `https://clementine.mertpehlivan.co.uk` • Linux Audio WebSocket & Standby Gateway • `● Hibrit Tünel`

- [ ] **Step 2: Mount `EcosystemShowcase` beneath `Hero` in `src/App.tsx`**
Import `EcosystemShowcase` and mount between `<Hero />` and `<AboutMe />`:
```typescript
import EcosystemShowcase from "./Components/EcosystemShowcase";
...
<Hero />
<EcosystemShowcase />
<AboutMe />
```

- [ ] **Step 3: Verify responsive layout and build**
Run: `npm run build`
Expected: Build passes with zero errors.

- [ ] **Step 4: Commit ecosystem showcase component**
```bash
git add src/Components/EcosystemShowcase/index.tsx src/App.tsx
git commit -m "feat: add live Cloud Ecosystem Showcase section beneath Hero"
```

---

### Task 5: Statistics Section Security & API Waterfall Elimination

**Files:**
- Modify: `src/Sections/Statistics/index.tsx`

**Interfaces:**
- Consumes: Public `github-contributions-api.jogruber.de` endpoint and verified GitHub metrics.
- Produces: Secure Statistics section with zero client-side token requirements and zero 30+ request language loops.

- [ ] **Step 1: Remove `VITE_GITHUB_TOKEN` requirement and error block**
Remove token check so the section never throws "GitHub token not found" or leaks tokens.

- [ ] **Step 2: Implement fast, resilient statistics loading**
1. Fetch contributions from `https://github-contributions-api.jogruber.de/v4/PehlivanMert`.
2. Provide verified language distribution:
   - Java: 46%
   - TypeScript: 28%
   - Python: 14%
   - HTML/CSS: 7%
   - Shell / Other: 5%
3. Calculate lines of code smoothly (~154,200+) and total projects (~24+).
4. Retain full interactive year-switching contribution matrix and Doughnut chart.

- [ ] **Step 3: Test compilation and verify zero token dependencies**
Run: `grep -rn "VITE_GITHUB_TOKEN" src/ && npm run build`
Expected: Zero occurrences of `VITE_GITHUB_TOKEN`; build passes.

- [ ] **Step 4: Commit statistics optimization and security fix**
```bash
git add src/Sections/Statistics/index.tsx
git commit -m "security: remove client-side GitHub token and eliminate API request waterfalls"
```

---

### Task 6: Cache & Application Lifecycle Sanitation

**Files:**
- Modify: `src/utils/cacheManager.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Browser CacheStorage API.
- Produces: Safe cache eviction without `localStorage.clear()` or unexpected automatic reload intervals.

- [ ] **Step 1: Sanitize `src/utils/cacheManager.ts`**
Remove `localStorage.clear()` and `sessionStorage.clear()`.
Only clear asset caches (`caches.delete('portfolio-cache-v1')`) and unregister outdated service workers when explicitly required.

- [ ] **Step 2: Remove unprompted 5-minute reload interval from `src/App.tsx`**
Remove the aggressive `setInterval(() => cacheManager.checkForUpdates(), 5 * 60 * 1000)` and automatic `window.location.reload()`. Let Service Worker background updates handle asset freshness on navigation.

- [ ] **Step 3: Test compilation**
Run: `npm run build`
Expected: Clean build with zero TypeScript warnings.

- [ ] **Step 4: Commit cache lifecycle sanitization**
```bash
git add src/utils/cacheManager.ts src/App.tsx
git commit -m "fix: sanitize cache eviction to preserve user storage and remove reload interval"
```

---

### Task 7: End-to-End Build, Verification & Cloudflare Pages Deployment

**Files:**
- Directory: `dist/`

**Interfaces:**
- Consumes: Built assets.
- Produces: Live deployment on Cloudflare Pages (`mertpehlivan-portfolio`) with HTTP 200 verification on `https://mertpehlivan.co.uk`.

- [ ] **Step 1: Execute full production build**
Run: `npm run build`
Verify chunk sizes in output: all chunks < 300 KB.

- [ ] **Step 2: Deploy to Cloudflare Pages via Wrangler**
Run: `env -u CLOUDFLARE_API_TOKEN npx wrangler pages deploy dist --project-name mertpehlivan-portfolio --branch main`
Expected: Deployment completes with live URL.

- [ ] **Step 3: Verify live endpoint**
Run: `curl -I https://mertpehlivan.co.uk`
Expected: HTTP 200 OK.

- [ ] **Step 4: Commit and push changes to remote repository**
```bash
git status
git push origin main
```
