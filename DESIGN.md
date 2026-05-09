# Radarsea · 出海雷达 Design System

> **Phase 12 · SaaS 2.0 / Data-tool aesthetic** — Linear / Vercel / Stripe leaning. Pure-black canvas, restrained fluorescent accents, military-grade radar reticle replacing the OS cursor.

This document is the canonical reference. When in doubt, prefer the patterns documented here. When you must deviate, write down why.

---

## 0. Identity in one sentence

> A data-SaaS tool that feels engineered, not designed. Cold, calm, technically precise — accents only ignite where data does.

**90% black / white / gray. 10% accent — and only on data anomalies, "Live" labels, and lock-state cursors.**

---

## 1. Tokens

### 1.1 Color

| Token | Value | When to use |
|---|---|---|
| `bg` | `#050505` | Page canvas. Pure-black SaaS 2.0. |
| `bg-subtle` | `#0F0F0F` | Slightly raised tier — alternating sections, table headers |
| `ink` | `rgba(255, 255, 255, 0.949)` | Primary text |
| `ink-muted` | `rgba(255, 255, 255, 0.722)` | Body / supporting copy |
| `ink-faint` | `rgba(255, 255, 255, 0.4)` | Mono labels, eyebrows, axis ticks |
| `line` | `rgba(255, 255, 255, 0.045)` | Hairline dividers, faint card borders, default cell borders |
| `line-strong` | `rgba(255, 255, 255, 0.16)` | Inputs, hovered card borders, glass card outlines |
| `brand` | `#0EA5E9` (sky-500) | Solid-fill button base — `bg-brand` only |
| **`brand-bright`** | **`#00E5FF`** (electric cyan) | **Hover, sweep arc, lock state, competitor data, focus ring** |
| `brand-deep` | `#0369A1` | Pressed states (rare) |
| `brand-hover` | `#0284C7` | `bg-brand` on hover |
| **`accent-bright`** | **`#00FF66`** (fluorescent green) | **Data anomaly metrics, Live status, success ping, captured ripple** |
| `highlight` | `#7DD3FC` | Code / mono callouts |

#### Color discipline (non-negotiable)

- **No third accent.** Only fluorescent green (`#00FF66`) or electric cyan (`#00E5FF`) — any other hue is a bug.
- **Accents are reserved for**:
  1. Live / online status indicators
  2. Data anomalies (e.g. `+300%`, `−15%`, `+218%`)
  3. Lock-state cursor + brackets
  4. Captured / success pings
  5. Hover ignition (link, CTA, card border)
- **Negative anomalies still use accent.** A `−15%` price drop uses cyan or green, never red. The "anomaly" semantic matters, not the direction.
- **No solid colored fills outside `bg-brand` (CTA) and `bg-bg/bg-subtle` (page).** Cards and surfaces use translucent white (`bg-white/[0.012]–[0.06]`) instead of opaque colors.
- **Avoid `bg-ink` for filled buttons** — it's near-white and reads as stark on dark. Use `bg-white text-bg` (the Hero CTA pattern) or ghost-style instead.

### 1.2 Radar product palette

Five legacy product hues (warm → violet) used **only** on the per-product card accent (status badges, dot indicators), never as global UI color:

| Product | Color |
|---|---|
| Detection | `#FF4D4F` |
| Discovery | `#52C41A` |
| Brand | `#722ED1` |
| Compliance | `#FA8C16` |
| Sentiment | `#13C2C2` |

These show up via `style={{ backgroundColor: product.color }}` on the comparison table dots and product detail accents — they are *data*, not *brand*.

### 1.3 Typography

- **Sans**: `Inter` via `next/font/google`, weights 300 / 400 / 500 / 600 / 700, exposed as `--font-inter`. Tailwind alias: `font-sans`.
- **Mono**: `JetBrains Mono`, weights 400 / 500, exposed as `--font-geist-mono` (the var is named for the original Geist Mono target — substituted because Geist Mono isn't yet in `next/font/google`). Tailwind alias: `font-mono`.
- **Chinese fallback**: `PingFang SC, Hiragino Sans GB, Microsoft YaHei`.

#### Type scale (semantic)

| Use | Class / size | Line height | Tracking |
|---|---|---|---|
| Hero H1 | `text-[44px] md:text-[52px] lg:text-[60px]` | `1.05` | `-0.025em` |
| Page H1 | `text-[44px] md:text-[56px] lg:text-[64px]` | `1.05` | `-0.02em` (`text-display`) |
| Section H2 | `text-[36px] md:text-[48px] lg:text-[56px]` | `1.1` | `-0.02em` |
| Sub-section H3 | `text-2xl` (24px) — `text-[30px] lg:text-[36px]` for emphasized | `1.3` | `-0.01em` (`tracking-tightish`) |
| Body large | `text-lg` (18px) | `1.65` | normal |
| Body | `text-base / text-[15px]` | `1.65` | normal |
| Mono eyebrow | `font-mono text-xs uppercase tracking-[0.2em]` | normal | `0.2em` |
| Mono label | `font-mono text-[10px–11px] uppercase tracking-[0.18em–0.22em]` | `1.5` | wide |
| Stats / numbers | `text-display ... tabular-nums tracking-tighter` | tight | `-0.02em` |
| **Anomaly metric** | `text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.04em] tabular-nums` | `none` | very tight |

#### Typography rules

- Use `font-mono` for: status pills, eyebrows, `01 / 04` indices, code-comment tags (`[ 研发中 ]`), date-time labels, comparison-table column headers, footer micro-copy.
- Use `tabular-nums` on any numeric display that animates or sits in tabular layouts (stats grid, count-ups, comparison tables).
- **Two-line H2 for visual anchor** — force a `<br />` between clauses on key section headers (Hero, Product Suite, Solutions, Bottom CTA). One-line headers feel airy; two-line forms a tighter information block.
- **No gradient text-clip on H1 by default.** The Hero H1 stays pure white. Gradient text-clip is reserved for *About* page mission and standalone callouts where decorative emphasis is intentional.

### 1.4 Spacing & rhythm

- **Container**: `.container-site` = `max-w-site (1280px) px-5 md:px-8`
- **Section vertical rhythm**:
  - Standard: `py-24 md:py-32 lg:py-40`
  - Tight: `py-16 md:py-20 lg:py-24` (legal pages, insights filter strip)
  - Hero: `pt-32 pb-20 lg:pt-40 lg:pb-28`
- **Inter-element gaps**: 4 (`gap-1`) / 6 (`gap-1.5`) / 8 (`gap-2`) / 12 (`gap-3`) / 16 (`gap-4`) / 20 (`gap-5`) / 24 (`gap-6`)
- **Card padding**: `p-5` (small satellite) → `p-7` (default) → `p-9 lg:p-10` (hero card)

---

## 2. Surfaces

### 2.1 Page backdrop

```jsx
<div className="absolute inset-0 -z-10 bg-data-grid" />
```

`.bg-data-grid` = 1px white-rgba-0.03 grid lines on a 56px cell, masked with a radial-gradient ellipse so the grid fades at the edges. Used on every page hero. Tight variant `.bg-data-grid-tight` (24px cells) for inset cards.

### 2.2 Bento glass card — `.bento-frame`

The hero-class surface used for: Hero Insight Lens, Hero Detection Card, Solutions detail panel, About in-page CTA, Insights featured card, Newsletter card.

```css
.bento-frame {
  position: relative;
  isolation: isolate;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%);
  backdrop-filter: blur(20px);
}
.bento-frame::before {
  /* 1px micro-glow gradient ring, masked to border only */
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(160deg,
    rgba(255,255,255,0.22) 0%,
    rgba(255,255,255,0.06) 22%,
    rgba(255,255,255,0.02) 55%,
    rgba(0,229,255,0.18) 100%);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Visual: a glassy dark surface with a 1px gradient border that's brightest top-left (specular highlight) and tinted cyan bottom-right (brand drift).

### 2.3 Subtle card

For non-hero cards (about values, satellite products, article tiles, contact channels):

```jsx
className="rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.025]"
```

Three states (default / hover / active) by varying the `bg-white/[N]` alpha.

### 2.4 Dividers

- **Hairline**: `border-line` or `bg-line` (rgba 0.045)
- **Visible**: `border-line-strong` or `bg-line-strong` (rgba 0.16)
- **Vertical separator**: `<span aria-hidden className="h-3 w-px bg-line" />` between mono trust-strip items

### 2.5 Section borders

Every below-the-fold section starts with `border-t border-line`. Hero is `border-b border-line` only at its bottom.

---

## 3. Components

### 3.1 Primary CTA — solid white

Used on Hero (申请 Demo), product detail (访问官网), and as the "primary action" everywhere.

```jsx
<a
  href="#demo"
  className="group relative inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-bg transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
>
  <span>申请 Demo</span>
  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
</a>
```

Variant: when on a `.bento-frame` background, use `.cta-inner-glow` instead — a radial white-to-cyan gradient ::before that fades in on hover from inside the button.

### 3.2 Ghost CTA — outlined, hover ignites cyan

Used as the secondary alongside primary, and as standalone "view full" links.

```jsx
<a
  className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
>
  <span>立即体验</span>
  <ArrowRight size={14} className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
</a>
```

Note the arrow trick: hidden + offset on rest, slides in + fades on hover.

### 3.3 Status pill — cyan or green pulse-dot

```jsx
<span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-1.5 backdrop-blur-sm" data-cursor="lock">
  <span className="relative flex h-1.5 w-1.5">
    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright opacity-75" />
    <span className="relative h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_rgba(0,255,102,0.7)]" />
  </span>
  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
    Live · 156 markets · 12.4k signals/min
  </span>
</span>
```

Variations: `bg-accent-bright` (green) for "Live", `bg-brand-bright` (cyan) for "Online" / data flow. Always carry `data-cursor="lock"`.

### 3.4 Mono index pill — `01 / 04`

Provides a "data point" cue on cells, sections, and detail cards.

```jsx
<div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
  0{index + 1}
  <span className="mx-1 text-line-strong">/</span>
  0{total}
</div>
```

### 3.5 Mono eyebrow with cyan dot

Used at the start of every page hero and major section header.

```jsx
<p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
  <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
  Product Suite
</p>
```

### 3.6 Code-comment status — `[ 研发中 ]`

For "coming soon" / dormant products. Replaces traditional status badges with a developer-tone affordance.

```jsx
<span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">
  [ 研发中 ]
</span>
```

### 3.7 Anomaly metric — ultra-large fluorescent

The hero card's data punch.

```jsx
<div
  className="text-display text-[40px] sm:text-[48px] md:text-[56px] font-semibold leading-none tracking-[-0.04em] tabular-nums"
  style={{
    color: "#00FF66", // or #00E5FF
    textShadow: "0 0 18px rgba(0,255,102,0.4), 0 0 38px rgba(0,255,102,0.2)",
  }}
  data-cursor="lock"
>
  +300%
</div>
```

Use minus sign U+2212 (`−`), never hyphen-minus, for negative deltas.

### 3.8 Inputs

```jsx
<input
  className="rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand-bright/60 focus:outline-none"
/>
```

For inline pill inputs (search, newsletter), wrap with `rounded-full` and use the focus-within glow pattern shown in `InsightsSearchForm`.

### 3.9 Comparison-table cell

Sticky leftmost column with mono row labels; horizontally-scrollable content.

```
<table className="w-full min-w-[860px] border-collapse">
  <thead>
    <tr className="border-b border-line bg-white/[0.018]">
      <th className="sticky left-0 bg-white/[0.018] px-5 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">属性</th>
      ...
    </tr>
  </thead>
  ...
</table>
```

---

## 4. Iconography

- **Library**: `lucide-react` exclusively. No custom SVG icons except brand marks (`RadarMark`, the topology graphic in Hero).
- **Sizes**: 12 (badges), 14 (inline links/CTAs), 16 (buttons), 18–22 (card icons), 32 (product hero scope).
- **Stroke width**: `1.5` for line-style cards (satellites, contact channels, careers benefits). `2` for inline CTAs and check marks (`strokeWidth={2.5}` for emphasized checks).
- **Color**: Default `text-ink-faint`, hover or active `text-brand-bright`, emerald `text-accent-bright` for success.
- **Icon container**: 32–48px square, `rounded-[10px]` or `rounded-[12px]`, `border border-line-strong bg-white/[0.04]` — never colored fills.

---

## 5. Motion

### 5.1 Easing — `cubic-bezier(0.16, 1, 0.3, 1)`

This is the project's signature curve. **Use it for all transitions and entrance animations** unless there's a specific reason not to. Quick out, slow settle. Same as Linear's signature.

```ts
const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
```

### 5.2 Spring presets

| Use | Stiffness | Damping | Mass |
|---|---|---|---|
| Snappy entrance (hero, cards, lens) | 200–220 | 22 | default |
| Mouse magnetic / cursor follow | 400–500 | 28–32 | 0.45–0.6 |
| Card 3D tilt (rotateX/Y) | 220 | 22 | default |
| Data-label cursor follow | 140 | 18 | default |

### 5.3 Standard durations

- Hover state shifts: **200 ms** (color), **300 ms** (transform)
- Section reveals (whileInView): **0.6 s** + small viewport margin (`{ once: true, margin: "-80px" }`)
- Phase loops (Insight Lens, Detection scan): **5 s** total cycle, broken into 2–3 phases
- Page entrance staggers: 0.05 / 0.12 / 0.22 / 0.32 / 0.5 s for [pill, h1, p, ctas, trust-strip]

### 5.4 Reveal pattern

Wrap below-the-fold sections in `<RevealSection className="...">` (which uses `whileInView`). The entrance is fade-in (`opacity 0 → 1`) + slide-up (`y: 24 → 0`), once per scroll, with margin `-80px` so it fires when the section is meaningfully visible.

### 5.5 Loop pattern (state machine)

For animations like the Insight Lens (5 s loop, 2 phases) or Detection scan UI (2.8 s loop, scan + 3 staggered badges), use:

1. A `phase` state (number) that increments through the timeline
2. `useEffect` driving `setTimeout` cycles, cancellable via cleanup
3. `useState cycleId` that increments per loop, used as `key` to remount draw animations
4. `useReducedMotion` short-circuiting to a static "completed" state
5. `hovering` flag to freeze the loop on the most informative phase when the user investigates

### 5.6 Count-up

For stats (`1 亿+ / 500+ / 24/7 / 1,000+`), use `useMotionValue` + `animate()` driven by `useInView({ amount: 0.3, once: true })`. Format strings handle units (`${n.toFixed(1)} 亿+`, `${n.toLocaleString()}+`). Always `tabular-nums` to prevent layout shift.

### 5.7 Marquee

For trust bars: track duplicated 2× (with second half `aria-hidden`), `translateX(0 → -50%)` over 38 s linear infinite, paused on hover via CSS, slowed to 110 s under `prefers-reduced-motion`.

### 5.8 What does **not** animate

- Body text never animates on hover (no underline slides, etc.)
- Section dividers don't pulse
- Backgrounds don't slowly drift (the data-grid is static)
- No parallax tied to scroll

The only persistent ambient motion is: trust marquee, Insight Lens 5 s loop, Detection scan UI 2.8 s loop, and per-section ping rings (live dots, captured pings).

---

## 6. Custom cursor — military reticle

Replaces the OS cursor across the site. Three states with smooth `cubic-bezier(0.16, 1, 0.3, 1)` transitions.

| State | Trigger | Visual |
|---|---|---|
| **default** | Anywhere not text/lock | 4-segment crosshair (8×1px each, 2px center gap), white at 92%, breathing halo (28px ring, 2.4 s sine), low-alpha radial spotlight |
| **lock** | `[data-cursor="lock"]` ancestor | Crosshair contracts (8 → 5px) and brightens to fluorescent green `#00FF66` with 6px glow shadow. Four `[ ]` corner brackets fade in (also fluorescent green). Halo pulses faster (1.2 s). |
| **text** | `h1–h6, input, textarea, [contenteditable], [data-cursor="text"]` ancestor | Crosshair fades, vertical 16×1px beam scales `0.6 → 1` |

Position-tracked via `useMotionValue + useSpring` (stiffness 500, damping 32, mass 0.45) — magnetic damping, no React re-renders for movement.

`mix-blend-mode: difference` applied to crosshair (default) and beam (text) — keeps them visible on any background, including the white primary CTA. Lock brackets keep their fluorescent green un-blended for semantic vivacity.

### 6.1 What to tag with `data-cursor`

- **`data-cursor="lock"`** — anomaly metrics (`+300%`), Live status pills, captured badges, price tags, statistical highlights
- **`data-cursor="text"`** — rare; usually unnecessary because heading detection is automatic. Use only when you have a non-heading text-rich element you want to feel "selectable"

### 6.2 Disabled when

- `(pointer: coarse)` — touch devices, iPad, mobile
- `prefers-reduced-motion: reduce` — halo animation off (cursor still functions)

---

## 7. Page anatomy

### 7.1 Page hero (top-nav pages: /products, /insights, /about, /contact, /careers)

```jsx
<section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
  <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
  <div aria-hidden className="absolute inset-0 -z-10" style={{
    background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0,229,255,0.08), transparent 70%)",
  }} />
  <Container>
    <div className="mx-auto max-w-3xl text-center">
      <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
        <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
        {EYEBROW}
      </p>
      <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
        {TITLE_LINE_1},
        <br />
        {TITLE_LINE_2}。
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
        {SUBTITLE}
      </p>
    </div>
  </Container>
</section>
```

Optional decorative gradient on hero for emphasis pages (About, Careers): wrap the second-line span in `bg-gradient-to-r from-brand-bright to-accent-bright bg-clip-text text-transparent`.

### 7.2 Section header (in-page sections)

Always: mono eyebrow with cyan dot → 2-line H2 → optional subtitle. Centered on full-width data sections; left-aligned on asymmetric layouts.

### 7.3 Bottom CTA

The closing call before the footer — see `components/home/bottom-cta.tsx`. Big centered H2 + paragraph + dual buttons (primary white + secondary ghost).

### 7.4 Stats grid (4-cell)

```jsx
<div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
  {/* each cell: bg-bg p-8 md:p-10 lg:p-12 text-center, with index pill + big number + label */}
</div>
```

The `gap-px` + `bg-line` parent creates 1px dividers between cells. Used on `/about`, `/data-foundation`.

### 7.5 1+4 asymmetric Bento (Product Suite pattern)

```jsx
<div className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr] xl:items-stretch">
  <HeroCard /> {/* uses .bento-frame */}
  <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:h-full xl:grid-rows-2">
    {/* 4 satellite cards, h-full, stripped content */}
  </div>
</div>
```

The hero takes 60% on `xl+`, satellites are a 2×2 stretching to match its height.

### 7.6 Tabs + detail panel (Solutions preview pattern)

Vertical tab list (lg+) / horizontal scroll pills (mobile) on the left, detail panel inside `.bento-frame` on the right. Active tab indicator is a `motion.span layoutId` for smooth spring-between-tabs animation. WAI-ARIA: `role="tablist" / role="tab" / role="tabpanel" / aria-selected / aria-controls / aria-labelledby` + roving `tabIndex`. Detail swap uses `<AnimatePresence mode="wait">`.

---

## 8. Restraint rules — what NOT to do

These are bug categories. If you find yourself doing one of these, stop and rethink.

| Don't | Why | Do instead |
|---|---|---|
| Use a third accent color (red/amber/purple in UI) | Breaks the cyan/green discipline | Use cyan for warnings (`!` patent flag uses cyan, not amber) |
| `bg-ink text-white` on filled buttons | Near-white on white-ish — invisible | `bg-white text-bg` or ghost outline |
| Add 3D illustrations or stock-photo people | Breaks the "engineered" tone | Use abstract data viz: scan lines, line charts, dot grids |
| Native blue links in body copy | Looks unstyled | `text-ink underline decoration-line-strong` with hover→cyan |
| Animate body paragraphs on hover | Distracting | Reserve hover motion for cards, links, buttons |
| Auto-playing audio / video / large carousels | Breaks the "calm" tone | Use the Insight Lens loop pattern instead |
| Emoji in UI copy | Reads as casual / consumer | Use lucide icons |
| Drop-shadows on cards | Reads as Material Design | Use 1px gradient ring (`.bento-frame`) or no shadow |
| Multiple CTAs per section | Dilutes the call | One primary + at most one ghost secondary |
| Solid colored backgrounds (red error states, green success states, etc.) | Breaks color discipline | Use 1px borders + tinted text/icon |
| Centered text everywhere | Looks templated | Center only hero / stats. Section content left-aligned by default. |
| Big illustrations in marketing sections | Eats real estate | A small SVG data viz (40-60px square) carries more weight |
| Forcing dark mode toggles | Brand IS dark | No toggle. Single canvas. |

---

## 9. Accessibility

- **Focus ring**: `1px solid var(--brand-bright)` with 2px offset, 4px border-radius. Defined in `:focus-visible`.
- **Selection**: `rgba(0, 229, 255, 0.28)` cyan-tinted highlight.
- **Reduced motion** (`prefers-reduced-motion: reduce`):
  - Count-ups: snap to final value
  - Trust marquee: slow to 110 s
  - Cursor halo: animation off (cursor still functions)
  - Detection scan / badges: animation off, badges pin to `opacity: 1`
- **Keyboard**:
  - All tab triggers use `role="tab"` with roving `tabIndex` (`isActive ? 0 : -1`)
  - Form inputs always paired with `<label>` (visible or `aria-label`)
  - `aria-hidden` on decorative SVGs and ambient glow divs
- **Screen readers**:
  - Marquee duplicate has `aria-hidden`
  - Cursor reticle has `aria-hidden`
  - Status pulse ring inner `aria-hidden`
- **Touch**:
  - Custom cursor disabled via `(pointer: coarse)` media query
  - Hover effects fall back to `:active` where critical (form focus rings)

---

## 10. File map — where things live

```
app/
  layout.tsx              # mounts <CustomCursor /> + fonts (Inter + JetBrains Mono)
  page.tsx                # home — composes section components in order
  globals.css             # tokens, .bg-data-grid, .bento-frame, .cta-inner-glow, custom cursor styles, scan-UI keyframes, marquee, reveal helpers
  products/
  insights/
    page.tsx              # server — metadata + hero + featured + InsightsClient + NewsletterForm
    insights-client.tsx   # client — filter state, AnimatePresence article grid
    insights-forms.tsx    # client — search + newsletter mock forms (server pages can't carry onSubmit)
  about/  contact/  careers/  privacy/  terms/  solutions/

components/
  ui/                     # primitives: Button, Container
  home/                   # home page sections
  legal-page.tsx          # shared TOC layout used by /privacy + /terms
  custom-cursor.tsx       # the radar reticle — mounted globally
  site-header.tsx         # sticky header + mega menus
  site-footer.tsx         # 4-col footer
  mega-menu.tsx           # Products mega menu
  solutions-mega-menu.tsx # Solutions mega menu
  product-card.tsx        # legacy (orphaned post Phase 12 ProductSuiteSection rebuild — safe to delete when convenient)
  radar-mark.tsx          # the radar logo svg
  radar-scope.tsx         # the radar dial icon used in legacy ProductCard

lib/
  site.ts                 # name, domain, emails, primary nav
  products.ts             # 5 radars data (canonical product source of truth)
  home-content.ts         # value props, data stats, trust brands
  insights-content.ts     # all articles + categories
  solutions-content.ts    # roles + industries + stages (canonical solutions source)
  solutions-types.ts      # type contracts
  utils.ts                # cn(), small helpers

tailwind.config.ts        # the source of truth for color tokens
```

---

## 11. Adding a new component checklist

Before merging a new component or page section:

- [ ] Background: `bg-bg` + optional `.bg-data-grid` for hero
- [ ] Color discipline: zero hex codes outside `lib/products.ts` (which has the legacy radar palette) and the cyan/green accents
- [ ] Mono eyebrow with leading cyan dot for major sections
- [ ] H2 forced to 2 lines via `<br />` if it's a major section header
- [ ] All anomaly numbers carry `data-cursor="lock"`
- [ ] All interactive elements show a meaningful hover state
- [ ] All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` unless documented otherwise
- [ ] Lucide icons only, `strokeWidth={1.5}` for line-style cards
- [ ] `tabular-nums` on any animated/aligned numbers
- [ ] WAI-ARIA where appropriate (`role`, `aria-selected`, etc. on tabs)
- [ ] Reduced-motion path verified — does this still work with animation disabled?
- [ ] Server vs client boundary correct — no event handlers in server components
- [ ] Responsive: works at `sm` (640) / `md` (768) / `lg` (1024) / `xl` (1280)
- [ ] Container max-width respected: `mx-auto max-w-site px-5 md:px-8`

---

## 12. History (why things look the way they do)

This system is the result of three brand pivots through 2025–2026:

1. **Phase 0–10** — Stripe / Atlassian-style B2B clean: white background, single brand blue (`#0066FF`), 7 design taboos (no gradients, no shadows, no color in global UI). *Discarded.*
2. **Phase 11** — Sansara wellness: black + magenta/violet aurora, Jost typography, decorative radial orbs, "poetic" copy. *Discarded — wrong tone for a B2B data tool.*
3. **Phase 12 (current)** — SaaS 2.0 / Linear-Vercel-leaning data SaaS: pure black, fluorescent cyan/green accents reserved for data anomalies, Inter + JetBrains Mono, military radar reticle cursor.

When in doubt about the future direction: ask "would this fit on Linear or Vercel's site?" — if yes, keep going. If it would feel at home on a wellness app, a consumer DTC brand, or a pre-2020 SaaS, reconsider.
