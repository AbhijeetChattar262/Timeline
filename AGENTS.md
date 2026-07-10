<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project overview

This is a multi-era history website: the entire appearance and design language change with the selected era, each era being a self-contained "skin" on a shared era engine. Eras ship in order — **Mahabharat** (built first) → **Chhatrapati Shivaji Maharaj** → **India's freedom struggle** (British rule and the war of independence) → **modern / space-gen India**. Each future era gets its own content and theme; no component or route should hardcode era-specific values.

Per-era **theme** values (palette, typography, motifs) live in `src/content/<era>/theme.ts` and are consumed only through CSS custom properties (`THEME_CSS_VARS` in `src/types/era.ts`) — never a hardcoded color or font in a component.

# Content pipeline

Per-era content is authored as plain TypeScript seed data in `src/content/<era>/*.ts`, then loaded into two databases by the seed scripts:

- `scripts/seed-mysql.ts` → **MySQL via Prisma**: era, locations, figures, timeline events, sources, citations.
- `scripts/seed-mongo.ts` → **MongoDB via Mongoose**: era theme, chapters, media, science tie-ins.

Run `npm run seed` (needs `.env.local` with both DBs reachable) after editing content — the running app reads from the databases, not from the `.ts` files directly. Cross-references are by slug: a chapter's `relatedFigureSlugs` / `relatedEventSlugs`, and an event's `figures[].slug`, must match slugs that exist in the corresponding content files.
