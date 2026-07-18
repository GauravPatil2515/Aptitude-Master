# Paperly — Frontend Design & Skill Guide

> **Read this file before designing any new page.** Every design decision — colour, type, spacing, motion, component — must follow the patterns documented here. Consistency is non-negotiable.

---

## 1. Stack & Tooling

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'`) |
| Component base | shadcn/ui (Radix UI primitives) |
| Animation | `tw-animate-css` + custom keyframes in `globals.css` |
| Variants | `class-variance-authority` (cva) |
| Icons | `lucide-react` exclusively |
| Fonts | `Inter` (sans) · `Playfair Display` (serif) · `Geist Mono` (mono) |

---

## 2. Colour System

### 2.1 Palette — Ivory · Espresso · Teal

The entire UI is built on three anchors:

| Name | Hex | Token | Usage |
|---|---|---|---|
| Ivory | `#f8f5f1` | `--background` | Page background (light) |
| Espresso | `#3a2f2a` | `--primary` | Primary text, logo, buttons |
| Teal | `#5ba6a6` | `--accent` | CTAs, icons, highlights, focus ring |
| Muted Warm | `#9b857a` | `--muted-foreground` | Secondary text, placeholders |
| Soft Border | `#e5ded6` | `--border` | All borders and dividers |
| Card | `#ffffff` | `--card` | Card surfaces |
| Destructive | `#d44d4d` | `--destructive` | Errors, delete actions |

### 2.2 Dark Mode

Dark theme shifts the base to near-black `#1a1614` with cards at `#2a2420`. Teal (`#5ba6a6`) stays identical in both modes — it is the brand constant.

```css
/* Light */
--background: #f8f5f1;
--foreground: #3a2f2a;
--accent:     #5ba6a6;

/* Dark */
--background: #1a1614;
--foreground: #f8f5f1;
--accent:     #5ba6a6;   /* unchanged */
```

### 2.3 Sidebar Tokens

The sidebar always uses the Espresso family regardless of theme:

```css
--sidebar:            #3a2f2a;
--sidebar-foreground: #f8f5f1;
--sidebar-primary:    #5ba6a6;   /* teal accent on dark sidebar */
--sidebar-accent:     #4a3f3a;
```

### 2.4 Gradient Text Utilities

```tsx
// Teal → Espresso  (primary brand gradient)
<span className="gradient-text">Paperly</span>

// Warm multi-stop (hero headings, large display text)
<span className="gradient-text-warm">Intelligent LaTeX</span>
```

**Never** hard-code arbitrary colours. Always use CSS variables or the utilities above.

---

## 3. Typography

### 3.1 Font Loading

Fonts are loaded in `app/layout.tsx` via `next/font/google`:

```tsx
const inter    = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

<body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
```

### 3.2 Type Scale Rules

| Element | Classes | Notes |
|---|---|---|
| Display / Hero H1 | `font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight` | Playfair Display |
| Section H2 | `font-serif text-3xl sm:text-4xl font-semibold tracking-tight` | Playfair Display |
| Card / Sub-section H3 | `text-xl font-semibold text-foreground` | Inter |
| Body Large | `text-lg text-muted-foreground leading-relaxed` | Inter |
| Body | `text-sm text-muted-foreground leading-relaxed` | Inter |
| Label | `text-sm font-medium text-foreground` | Inter |
| Caption / Meta | `text-xs text-muted-foreground` | Inter |
| Code / Mono | `font-mono text-sm` | Geist Mono |
| Category badge | `text-xs font-semibold uppercase tracking-widest text-muted-foreground` | Inter |

### 3.3 Rules

- **H1 always uses `font-serif`** (Playfair Display). H2 in marketing/landing sections also use `font-serif`. App/dashboard H2+ use Inter.
- Use `text-balance` on headings, `text-pretty` on paragraph body text.
- Brand name "Paperly" in the nav uses `font-serif text-xl font-semibold`.

---

## 4. Spacing & Layout

### 4.1 Max Widths

| Context | Class |
|---|---|
| Page content | `mx-auto max-w-7xl px-6 lg:px-8` |
| Narrow section (copy) | `mx-auto max-w-3xl` |
| Form / modal | `mx-auto max-w-2xl` |
| Feature grid | `mx-auto max-w-5xl` |

### 4.2 Section Padding

```tsx
// Landing sections
className="py-20 lg:py-32"

// Sections with muted background
className="py-20 lg:py-32 bg-muted/30"
```

### 4.3 Card Spacing

Cards use `rounded-xl border border-border bg-card shadow-sm`. Internal padding flows through `<CardHeader>` (`px-6`) and `<CardContent>` (`px-6`).

### 4.4 Grid Patterns

```tsx
// Stats row (4 equal cards)
"grid gap-4 md:grid-cols-2 lg:grid-cols-4"

// Feature grid
"grid gap-6 sm:grid-cols-2 lg:grid-cols-3"

// Dual column
"grid gap-6 md:grid-cols-2"

// Footer nav
"grid grid-cols-2 gap-8 md:grid-cols-5"
```

---

## 5. Border Radius

All radius values derive from `--radius: 0.5rem`:

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | `0.25rem` | Tiny chips |
| `rounded-md` | `0.375rem` | Inputs, buttons |
| `rounded-lg` / `rounded-xl` | `0.5rem` / `0.75rem` | Cards, modals |
| `rounded-2xl` | `1rem` | Hero feature cards, CTA blocks |
| `rounded-full` | pill | Avatars, status dots |

---

## 6. Shadows

Use these utility classes — do not write custom `box-shadow` inline:

```css
/* Multi-layered premium shadow (cards, editor preview) */
.shadow-premium

/* Hover lift — adds translateY(-4px) + deeper shadow on hover */
.hover-lift

/* Standard card shadow */
shadow-sm   (via Card component)
```

---

## 7. Animation & Motion

### 7.1 Available Keyframes

| Class | Effect | Duration |
|---|---|---|
| `animate-float` | Gentle vertical float | 6s infinite |
| `animate-pulse-glow` | Opacity + scale pulse | 4s infinite |
| `animate-fade-in-down` | Slide in from top | 0.5s ease-out |
| `animate-fade-in-up` | Slide in from bottom | 0.5s ease-out |
| `animate-shimmer` | Horizontal shimmer sweep | 2.5s infinite |
| `animate-pulse` (Tailwind) | Opacity pulse | Skeleton loaders |
| `animate-spin` (Tailwind) | Loading spinner | `Loader2` icon |

### 7.2 Staggered Animations (Hero / Feature grids)

Apply `animate-fade-in-up` with incremental `animation-delay` for staggered entrance:

```tsx
// Hero elements
<h1 className="animate-fade-in-down" />
<p  className="animate-fade-in-up [animation-delay:100ms]" />
<div className="animate-fade-in-up [animation-delay:200ms]" />

// Feature cards — delay by index
style={{ animationDelay: `${0.08 * index}s` }}
```

### 7.3 Transition Utilities

```css
/* All-purpose smooth cubic-bezier transition */
.transition-premium   → transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

/* Standard Tailwind */
transition-colors     → colour/border changes
transition-all duration-300
```

### 7.4 Hover Effects on Interactive Cards

```tsx
// Feature card pattern — gradient overlay + icon transform
<div className="group relative rounded-xl border border-border bg-card p-6
                hover:border-accent/50 shadow-premium hover-lift transition-all duration-300">

  {/* Gradient overlay appears on hover */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/10
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

  {/* Icon — scale + rotate on hover */}
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent
                  group-hover:bg-accent group-hover:text-accent-foreground
                  transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
    <Icon className="h-5 w-5" />
  </div>
</div>
```

---

## 8. Background Layers (Sections & Hero)

The hero uses a **5-layer depth stack** with negative z-index. Use this pattern for visually rich sections:

```tsx
{/* Layer 1: Warm gradient base */}
<div className="absolute inset-0 -z-30 bg-gradient-to-b from-background via-accent/10 to-accent/15" />

{/* Layer 2: Paper / noise texture */}
<div className="absolute inset-0 -z-29 opacity-[0.04]"
     style={{ backgroundImage: `url("data:image/svg+xml,...")` }} />

{/* Layer 3: Floating gradient orbs */}
<div className="absolute top-0 -left-40 w-[600px] h-[600px]
                bg-accent/15 rounded-full blur-3xl animate-float" />

{/* Layer 4: Grid dot pattern */}
<div className="absolute inset-0 -z-27
                bg-[linear-gradient(to_right,#5ba6a6_1px,transparent_1px),
                    linear-gradient(to_bottom,#5ba6a6_1px,transparent_1px)]
                bg-[size:4rem_4rem] opacity-[0.08]
                [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

{/* Layer 5: Vignette */}
<div className="absolute inset-0 -z-26
                bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(58,47,42,0.05)_100%)]" />
```

---

## 9. Glassmorphism

```css
/* Light glass card */
.glass {
  background: rgba(248, 245, 241, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 222, 214, 0.3);
}

/* Dark glass card */
.dark .glass {
  background: rgba(42, 36, 32, 0.7);
  border: 1px solid rgba(74, 63, 58, 0.3);
}
```

Use the `.glass` utility class on toolbar strips, nav headers, and floating panels.

### Gradient Border

```css
.border-gradient → linear-gradient teal (#5ba6a6) → espresso (#3a2f2a) border
```

---

## 10. Component Reference

### 10.1 Header / Navigation

```tsx
// Fixed, glass-blur nav
<header className="fixed top-0 left-0 right-0 z-50
                   bg-background/80 backdrop-blur-md border-b border-border">
  <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

    {/* Logo mark */}
    <div className="flex h-9 w-9 items-center justify-center rounded-lg
                    bg-primary text-primary-foreground font-serif font-bold text-lg">P</div>
    <span className="font-serif text-xl font-semibold text-foreground">Paperly</span>

    {/* Nav links */}
    <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" />

    {/* CTA buttons */}
    <AnimatedBorderButton variant="ghost">Sign In</AnimatedBorderButton>
    <AnimatedBorderButton className="bg-accent text-accent-foreground hover:bg-accent/90">
      Get Started
    </AnimatedBorderButton>
  </nav>
</header>

{/* Page top padding to clear fixed nav */}
<section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
```

### 10.2 Hero Section

- H1: `font-serif` + `gradient-text-warm` on the key phrase
- Subheading: `text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty`
- CTA group: `flex flex-col sm:flex-row items-center justify-center gap-4`
- Trust indicators: icon + count in `text-sm text-muted-foreground`, hover turns `text-accent`
- Orb decorations: `bg-accent/15 rounded-full blur-3xl animate-float`

### 10.3 Section Header Pattern

```tsx
<div className="mx-auto max-w-2xl text-center mb-16">
  <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
    Section Title
  </h2>
  <p className="mt-4 text-lg text-muted-foreground">
    Supporting description text.
  </p>
</div>
```

### 10.4 Feature Card

```tsx
<div className="group relative rounded-xl border border-border bg-card p-6
                hover:border-accent/50 shadow-premium hover-lift transition-all duration-300">

  {/* Hover gradient overlay */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/10
                  opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

  {/* Icon */}
  <div className="flex h-10 w-10 items-center justify-center rounded-lg
                  bg-accent/10 text-accent
                  group-hover:bg-accent group-hover:text-accent-foreground
                  transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
    <Icon className="h-5 w-5" />
  </div>

  <h3 className="mt-4 font-semibold text-foreground group-hover:text-accent transition-colors">
    Feature Name
  </h3>
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
    Description text.
  </p>
</div>
```

### 10.5 Buttons

| Variant | Import | Usage |
|---|---|---|
| `Button` | `@/components/ui/button` | Most actions |
| `AnimatedBorderButton` | `@/components/ui/animated-border-button` | CTA/nav primary |
| `GradientButton` | `@/components/ui/gradient-button` | Premium/success/danger actions |

**Button size map:**

```
sm  → h-8 px-3
default → h-9 px-4
lg  → h-10 px-6
icon → size-9
```

**Accent CTA pattern:**

```tsx
<Button className="bg-accent text-accent-foreground hover:bg-accent/90">
  Action
</Button>
```

### 10.6 Cards (shadcn)

```tsx
<Card>                          {/* rounded-xl border bg-card shadow-sm */}
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
    <CardAction>{/* top-right action */}</CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

**Stats card pattern** (dashboard):

```tsx
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-sm font-medium">Label</CardTitle>
  <Icon className="h-4 w-4 text-muted-foreground" />
</CardHeader>
<CardContent>
  <div className="text-2xl font-bold">42</div>
  <p className="text-xs text-muted-foreground">Sub-info</p>
</CardContent>
```

### 10.7 Badges

```tsx
<Badge variant="default">   {/* bg-primary */}
<Badge variant="secondary"> {/* bg-secondary */}
<Badge variant="outline">   {/* border only */}
<Badge variant="destructive">
```

### 10.8 CTA Accent Block (Pricing Nudge)

```tsx
<div className="rounded-xl border border-border bg-muted/40 px-6 py-5
                flex flex-col sm:flex-row items-center justify-between gap-4">
  <div>
    <p className="font-semibold text-foreground text-sm">Free plan — no card needed</p>
    <p className="text-xs text-muted-foreground mt-0.5">Description…</p>
  </div>
  <Button size="sm" className="shrink-0 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
    <Zap className="h-3.5 w-3.5" /> See pricing
  </Button>
</div>
```

### 10.9 Empty State

```tsx
<Empty>               {/* border-dashed, centered, p-12 */}
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>Nothing here yet</EmptyTitle>
    <EmptyDescription>Help text with optional <a>link</a>.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Primary Action</Button>
  </EmptyContent>
</Empty>
```

Inline empty state (no `<Empty>` wrapper):

```tsx
<div className="text-center py-8">
  <Icon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
  <p className="text-muted-foreground mb-4">No items yet</p>
  <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Create</Button>
</div>
```

### 10.10 Skeleton Loading States

Always show skeletons on async data. Never show blank space.

```tsx
{isLoading ? (
  <Skeleton className="h-8 w-16" />
) : (
  <div className="text-2xl font-bold">{value}</div>
)}

// Avatar skeleton
<Skeleton className="h-14 w-14 rounded-full" />

// Skeleton list
{[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
```

### 10.11 Avatar

```tsx
<Avatar className="h-14 w-14">
  <AvatarImage src={user.avatar} alt={name} />
  <AvatarFallback className="text-base">GP</AvatarFallback>
</Avatar>

// Nav initials circle
<span className="flex h-7 w-7 items-center justify-center rounded-full
                 bg-accent text-accent-foreground text-xs font-semibold">
  {initials}
</span>
```

### 10.12 Navigation Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabsList>         {/* bg-muted, rounded-lg */}
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">…</TabsContent>
</Tabs>
```

### 10.13 Input

```tsx
<Input placeholder="Search…" className="h-9 rounded-md border-input" />
```

Focus ring: `focus-visible:ring-ring/50 focus-visible:ring-[3px]` (teal ring, already in component).

### 10.14 Toast / Feedback

Use `useToast()` hook — never `alert()`.

```tsx
const { toast } = useToast()
toast({ title: "Saved", description: "Your changes are saved." })
toast({ title: "Error", description: "…", variant: "destructive" })
```

---

## 11. Icon System

**Only use `lucide-react`.** Standard sizes:

| Context | Size class |
|---|---|
| Button icon | `h-4 w-4` |
| Card / list icon | `h-4 w-4` or `h-5 w-5` |
| Feature icon (in icon box) | `h-5 w-5` |
| Empty state icon | `h-12 w-12` |
| Large hero icon | `h-16 w-16` |

**Icon box pattern** (teal bg, 40px):

```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
  <Icon className="h-5 w-5" />
</div>
```

---

## 12. Page Layout Template

Every new page follows this shell:

```tsx
// app/[route]/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Name',            // renders as "Page Name | Paperly"
  description: '…',
}

export default function PageName() {
  return (
    <main>
      <Header />

      {/* Hero or page header */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* background layers here */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* content */}
        </div>
      </section>

      {/* Content sections */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* section header */}
          {/* content grid */}
        </div>
      </section>

      <Footer />
    </main>
  )
}
```

---

## 13. Dark Mode Checklist

When adding new styles, verify both modes:

- [ ] Use `bg-background`, `text-foreground` (never hardcoded whites/blacks)
- [ ] Use `border-border` (never `border-gray-200`)
- [ ] Use `text-muted-foreground` for secondary text
- [ ] Shadows use `shadow-premium` (auto dark variant via CSS)
- [ ] Glass panels use `.glass` utility (auto dark variant)
- [ ] Any custom rgba colours need a `.dark` override

---

## 14. Responsive Breakpoints

| Prefix | Width | Common use |
|---|---|---|
| *(none)* | all | Mobile-first base |
| `sm:` | 640px | Stack → row layouts |
| `md:` | 768px | 2-column grids |
| `lg:` | 1024px | 3-column / larger type |

Standard responsive pattern:

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

---

## 15. "Do / Don't" Quick Reference

| ✅ Do | ❌ Don't |
|---|---|
| `text-muted-foreground` | `text-gray-500` |
| `bg-accent` for teal buttons | `bg-teal-500` |
| `font-serif` for display headings | `font-bold` alone on H1 |
| `shadow-premium` / `hover-lift` | Inline `box-shadow` |
| `animate-fade-in-up` + stagger | No entrance animation |
| `<Skeleton>` while loading | Blank white space |
| `<Empty>` for zero-state | Nothing / `null` |
| `lucide-react` icons | Other icon packs |
| CSS variable tokens | Hardcoded hex values |
| `transition-premium` / `transition-colors` | No transition on interactive elements |

---

## 16. File Structure Convention

```
app/
  [route]/
    page.tsx      ← metadata + layout shell
    layout.tsx    ← route-level layout if needed

components/
  landing/        ← marketing pages (Header, Hero, Features, Footer, CTA)
  dashboard/      ← authenticated app shell
  ui/             ← base shadcn primitives (don't modify unless extending)
  [feature]/      ← feature-specific components

app/globals.css   ← ALL design tokens + utility classes (source of truth)
```

---

*Last updated: 2026-06-28 — based on full inspection of `globals.css`, `layout.tsx`, `components/ui/`, `components/landing/`, and `components/dashboard/`.*
