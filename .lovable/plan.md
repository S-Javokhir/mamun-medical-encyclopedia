## Medical Knowledge Base & Digital Library

A read-only TanStack Start app for medical students. Three real routes (not tabs) with shared header, semantic teal/navy design tokens, static TypeScript dummy data, and Tailwind skeleton loaders for view transitions.

> Note: the project uses TanStack Start (not Next.js). Everything else from the brief — Tailwind, Lucide React, palette, layout, content — is honored exactly.

### Design system (`src/styles.css`)
- Palette in oklch tokens:
  - `--primary` deep teal-600 (≈ oklch(0.55 0.10 195))
  - `--primary-foreground` white
  - `--accent` soft teal tint for badges/hover
  - `--foreground` deep navy (≈ oklch(0.20 0.04 250))
  - `--muted` soft slate, `--muted-foreground` mid slate
  - `--background` clean white, `--card` white with subtle border
- Typography: system sans for UI, `prose-slate` styling for article body (base/lg sizes, bold for key terms).
- Crisp focus rings using `--ring` (teal).

### Routes
```
src/routes/
  __root.tsx          → shared header (logo, nav: Home / Departments / Professors), <Outlet/>, footer, head meta
  index.tsx           → Student Dashboard
  article.$id.tsx     → Medical Article reading view
  professor.$id.tsx   → Professor Profile
```
Each route defines its own `head()` with unique title + description + og tags.

### Dummy data (`src/data/library.ts`)
Typed fixtures exported as plain arrays:
- `departments`: 6 entries (Cardiology, Neurology, Anatomy, Pediatrics, Oncology, Radiology) — name, slug, Lucide icon name, articleCount, pdfCount.
- `professors`: 4 entries — id, fullName, title (e.g. "Prof. Dr. Alimov"), department, bio, avatar (UI Avatars URL or initials), researchInterests[], credentials[].
- `articles`: 6 entries — id, title (e.g. "Myocardial Infarction"), icd11 (e.g. "BA41"), departmentSlug, professorId, publishedAt, sections[] (Introduction, Pathophysiology, Clinical Manifestations, Treatment — each with heading + 2–3 paragraphs with `<strong>` on key terms), downloads[] (filename, type PDF/PPTX, sizeMB).
- Helper selectors: `getArticle(id)`, `getProfessor(id)`, `getProfessorArticles(id)`, `getLatestArticles(n)`.

### View 1 — Dashboard (`/`)
- Hero: centered headline + subheadline, large search input (Lucide `Search` icon, placeholder exactly: "Search by disease name, ICD-11 code, or professor..."). Input is decorative (no backend search) — filters the visible article list client-side as a nice touch.
- Department grid: responsive 2/3 columns. Each card → Lucide icon (Heart, Brain, Bone, Baby, Activity, ScanLine), department name, two badges ("12 articles", "8 PDFs"). Hover: subtle lift + teal border.
- Latest Updates: 3 most recent articles as horizontal cards → title (links to `/article/$id`), date, professor name (links to `/professor/$id`), ICD-11 badge.

### View 2 — Article (`/article/$id`)
3-column desktop grid (`lg:grid-cols-[220px_1fr_280px]`), stacks on mobile (TOC collapses into an accordion above content; sidebar moves below).
- Left (sticky TOC): list of section headings; active section highlighted via `IntersectionObserver` hook tracking `<section id>` anchors.
- Center: ICD-11 badge pill at top, H1 title, `prose prose-slate lg:prose-lg` body rendered from `sections[]`; each section gets `<section id={slug}>`.
- Right sidebar (sticky):
  - Author card: circular avatar, name, title, department, "View profile" link to `/professor/$id`.
  - Downloads card: each download is a button-styled `<a download>` with file-type icon (`FileText` for PDF, `Presentation` for PPTX), title, size on the right, hover state (teal bg tint, slight scale).
- No edit/delete/submit affordances anywhere.

### View 3 — Professor (`/professor/$id`)
- Header card: large avatar (left), full name + title + department, research interests as tag chips, credentials as bullet list.
- Contributions feed: chronological list (newest first) of that professor's articles → title (link), date, department badge, ICD-11 badge, short excerpt. Clean dividers, hover row tint.

### Shared components (`src/components/`)
- `Header.tsx` — logo (Lucide `Stethoscope` + wordmark), nav links with active state.
- `Footer.tsx` — minimal.
- `DepartmentCard.tsx`, `ArticleListItem.tsx`, `ProfessorCard.tsx`, `DownloadButton.tsx`, `Icd11Badge.tsx`.
- `Skeleton.tsx` — Tailwind `animate-pulse` block; used in route `pendingComponent`s for each route so navigation between views shows subtle skeleton loaders.
- `useActiveHeading.ts` hook for TOC.

### Accessibility
- Semantic landmarks (`header`, `main`, `nav`, `aside`, `footer`), single H1 per route, alt text on avatars, visible focus rings, sufficient contrast (navy on white, white on teal-600), keyboard-navigable download buttons.

### Out of scope (explicit guardrails)
- No auth, no database, no edit/delete/submit UI, no admin views.
- No real file downloads — buttons point to `#` with `download` attribute and a toast-free no-op; sizes/filenames are realistic dummy strings.
- No Next.js — implemented in the project's actual TanStack Start stack.
