# Portfolio Optimization & Cloud Ecosystem Showcase — Design Document

- **Date:** 2026-11-24
- **Project:** Personal Portfolio (`portfolio_mp-main`)
- **Domain:** `mertpehlivan.co.uk`
- **Status:** Proposed (Under Review)

---

## 1. Intent & Context

Mert Pehlivan's personal portfolio (`mertpehlivan.co.uk`) is deployed on Cloudflare Pages. Over recent iterations, four new companion services were launched across the `mertpehlivan.co.uk` domain:
1. `gezi.mertpehlivan.co.uk` (Central European Travel & Interactive GPS Route Panel)
2. `weather.mertpehlivan.co.uk` (Universal Dynamic Weather PWA with 4-Model Consensus)
3. `okur.mertpehlivan.co.uk` (Okur Book Tracking PWA v9.3.4 with AI Literary Engine)
4. `clementine.mertpehlivan.co.uk` (Clementine Web Remote with WebSocket + Standby Gateway)

A deep architectural and code audit of `portfolio_mp-main` revealed key issues that need resolution:
- **Jumping / Glitching Falling Animation ("Kar Taneleri"):** 144 unmemoized Framer Motion particle elements are copied across 8 different sections, recalculating `Math.random()` on every render and snapping erratically.
- **Dead Dependencies & Monolithic Bundle (732 KB):** 6 unused packages exist in `package.json` (`@react-three/fiber`, `@react-three/drei`, `framer-motion-3d`, `recharts`, `react-awesome-reveal`, `react-github-calendar`), and Vite has no vendor chunk splitting.
- **Client-Side GitHub Token Security Risk:** `Statistics/index.tsx` reads `import.meta.env.VITE_GITHUB_TOKEN`, compiling a private GitHub token directly into the browser JS bundle.
- **API Waterfall Latency:** The Statistics section executes a sequential `for (const repo of repos) fetch(languages_url)` loop on every page load, causing rate-limiting and delays.
- **Destructive Cache Clearing & Unprompted Reloads:** `cacheManager.ts` calls `localStorage.clear()`, wiping user data, and a 5-minute interval calls `window.location.reload()`.
- **Missing Cloud Ecosystem Showcase:** The four live production services are buried as ordinary text cards instead of being showcased as live edge systems.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **G1 — High-Performance Particle Background:** Replace the 144 scattered particle nodes across 8 sections with a single, memoized, GPU-accelerated `ParticleBackground` component that provides smooth, continuous 60 FPS floating ambiance without jumping.
- **G2 — Dependency Trimming:** Safely uninstall the 6 unused libraries, reducing `node_modules` weight and eliminating Vite build warnings.
- **G3 — Vite Chunk Optimization:** Implement `rollupOptions.output.manualChunks` in `vite.config.ts` to split `vendor-react`, `vendor-framer`, `vendor-charts`, and `vendor-icons`, reducing main entry size below 200 KB.
- **G4 — Secure & Fast GitHub Statistics:** Remove `VITE_GITHUB_TOKEN` requirement from client JS; render instant language breakdown metrics and use public jogruber contributions API.
- **G5 — Safe Cache & Session Lifecycle:** Remove `localStorage.clear()` from `cacheManager.ts`, preserving local preferences; remove aggressive interval-based page reloads.
- **G6 — Live Ecosystem Showcase:** Add a sleek, glassmorphic `EcosystemShowcase` component positioned right below Hero to highlight all 4 live subdomains with `200 OK` edge status badges, architecture tags, and one-click access.

### Non-Goals
- Changing core section designs (Hero, AboutMe, Education, Projects).
- Changing styling framework (Tailwind CSS + Framer Motion remain).
- Rewriting the Medium blog parser.

### Anti-Goals
- Never leak API tokens or keys into client bundles.
- Never cause layout shifts (CLS) when particles or statistics load.
- Never force unexpected browser reloads while a visitor is reading or using the contact form.

---

## 3. Approaches Considered

### Approach 1: Comprehensive Architecture, Performance, Security & Ecosystem Showcase *(Selected)*
- Remove all 6 unused libraries and configure Vite `manualChunks`.
- Remove unmemoized particle loops from all 8 sections and mount a single, performant `ParticleBackground` in `App.tsx`.
- Secure `Statistics/index.tsx` by eliminating client-side GitHub token exposure and removing sequential language request waterfalls.
- Sanitize `cacheManager.ts` to prevent data wipe and unexpected reloads.
- Add `EcosystemShowcase.tsx` below Hero showcasing the live edge services.
- **Tradeoffs:** Touches multiple section files to clean up particle copy-paste, but permanently resolves technical debt, performance, and security.

### Approach 2: Minimal Patching
- Keep all unused dependencies and monolithic 732 KB bundle.
- Wrap `Math.random()` in `useMemo` within each of the 8 individual sections rather than unifying.
- Suppress token error in Statistics and comment out `localStorage.clear()`.
- Keep ecosystem links buried inside Projects.
- **Tradeoffs:** Leaves bundle size bloated, keeps 8 duplicated particle loops, and misses the opportunity to showcase live production systems to recruiters.

**Decision:** The user selected **Approach 1**.

---

## 4. Technical Specifications & File Changes

### 4.1 Dependency Clean-up (`package.json`)
Remove:
- `@react-three/fiber`
- `@react-three/drei`
- `framer-motion-3d`
- `recharts`
- `react-awesome-reveal`
- `react-github-calendar`

Keep only active packages:
- `react`, `react-dom`, `framer-motion`, `react-icons`, `react-markdown`, `chart.js`, `react-chartjs-2`, `react-countup`, `@emailjs/browser`.

### 4.2 Vite Build Optimization (`vite.config.ts`)
Add `manualChunks` in `rollupOptions`:
```ts
manualChunks: {
  'vendor-react': ['react', 'react-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-charts': ['chart.js', 'react-chartjs-2', 'react-countup'],
  'vendor-icons': ['react-icons']
}
```

### 4.3 Unified Particle Background (`src/components/ParticleBackground.tsx`)
- Single component rendered at root of `App.tsx` (`position: fixed; inset: 0; pointer-events: none; z-index: 0`).
- Generates 25 stable particles via `useMemo` (stable coordinates, size, drift, and duration).
- Uses CSS keyframes or stable Framer Motion loop (`y: [-20, windowHeight + 20]`, `x: [0, drift, 0]`) with `linear` ease and staggered delays.
- Zero re-calculation on state changes; zero particle jumping.
- Clean up duplicate particle JSX from:
  - `Hero/index.tsx`
  - `AboutMe/index.tsx`
  - `Skills/index.tsx`
  - `Projects/index.tsx`
  - `Education/index.tsx`
  - `Blog/index.tsx`
  - `Contact/index.tsx`
  - `Footer/index.tsx`

### 4.4 Live Ecosystem Showcase (`src/Components/Ecosystem/EcosystemShowcase.tsx`)
- Renders 4 interactive glassmorphic cards:
  1. **Okur (v9.3.4):** `okur.mertpehlivan.co.uk` • PWA / Android • Jetpack Glance & AI Literary Engine • `● 7/24 Edge`
  2. **Dinamik Hava Durumu:** `weather.mertpehlivan.co.uk` • 4-Model ECMWF/ICON Consensus • Serverless Worker • `● 7/24 Edge`
  3. **Viyana & Prag Canlı Rota:** `gezi.mertpehlivan.co.uk` • Leaflet GPS & 10-Altın Boyut Denetimli Seyahat • `● 7/24 Edge`
  4. **Clementine Web Remote:** `clementine.mertpehlivan.co.uk` • Linux Audio WebSocket & Standby Gateway • `● Hibrit Tünel`
- Displays live protocol badges (HTTP/3, TLS 1.3, Argo Tunnel, Zero Trust).
- Placed directly beneath `Hero` in `App.tsx`.

### 4.5 Security & Performance in Statistics (`src/Sections/Statistics/index.tsx`)
- Remove `const token = import.meta.env.VITE_GITHUB_TOKEN;` and token dependency.
- Fetch contributions using the public endpoint `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`.
- Provide pre-computed and cached language metrics (Java ~46%, TypeScript ~28%, Python ~14%, Shell/Other ~12%) with graceful fallback so the chart never stalls or throws 403 rate-limit errors.
- Ensure total projects count defaults safely to active repos.

### 4.6 Cache & Lifecycle Sanitation (`src/utils/cacheManager.ts` & `src/App.tsx`)
- In `clearAllCaches()`: remove `localStorage.clear()` and `sessionStorage.clear()`.
- Only delete specific caches matching `caches.delete('portfolio-cache-v1')` and PWA caches.
- In `src/App.tsx`: remove the 5-minute interval that triggers unprompted reloads. Updates are checked silently by the Service Worker on new navigation.

---

## 5. Verification & Testing Gates
1. `npm run build`: Must compile cleanly with 0 TypeScript errors and bundle chunks under 300 KB.
2. Particle inspection: Particles must float continuously from top to bottom without jumping when interacting with tabs, forms, or resizing.
3. Statistics section: Must load instantly without requiring `VITE_GITHUB_TOKEN` or causing network rate limits.
4. Ecosystem showcase: All 4 subdomains must render with correct badges, working links, and responsive grid layout.
5. Cloudflare Pages deployment: `wrangler pages deploy` to `mertpehlivan-portfolio` with HTTP 200 verification on `https://mertpehlivan.co.uk`.
