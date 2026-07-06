import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getEra, getEraTheme } from "@/lib/content";
import { EraNav } from "@/components/layout/EraNav";
import { EraAmbientMotifs } from "@/components/era/EraAmbientMotifs";
import { getEraMotifs } from "@/content/eraMotifs";

export default async function EraLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [era, theme] = await Promise.all([getEra(slug), getEraTheme(slug)]);

  if (!era || !theme) notFound();

  const { light, dark } = theme.palette;
  const { display, body, utility } = theme.typography;
  const { texture, paperLight, paperDark, cover } = theme.motif;

  const glow = texture ?? "none";
  const paperL = paperLight ? `url("${paperLight}")` : "none";
  const paperD = paperDark ? `url("${paperDark}")` : "none";
  const coverImg = cover ? `url("${cover}")` : "none";

  const themeCss = `
[data-era="${slug}"] {
  --color-bg: ${light.bg};
  --color-bg-raised: ${light.bgRaised};
  --color-ink: ${light.ink};
  --color-muted: ${light.muted};
  --color-accent: ${light.accent};
  --color-rule: ${light.rule};
  --font-display: ${display};
  --font-body: ${body};
  --font-utility: ${utility};
  --motif-glow: ${glow};
  --motif-paper: ${paperL};
  --motif-cover: ${coverImg};
  /* Ink for content sitting on the always-light parchment card, so text stays
     dark-on-parchment in BOTH themes. Theme-independent (always the light set). */
  --ink-on-paper: ${light.ink};
  --muted-on-paper: ${light.muted};
  --accent-on-paper: ${light.accent};
  --rule-on-paper: ${light.rule};
}
@media (prefers-color-scheme: dark) {
  [data-era="${slug}"] {
    --color-bg: ${dark.bg};
    --color-bg-raised: ${dark.bgRaised};
    --color-ink: ${dark.ink};
    --color-muted: ${dark.muted};
    --color-accent: ${dark.accent};
    --color-rule: ${dark.rule};
    --motif-paper: ${paperD};
  }
}
[data-era="${slug}"][data-theme="dark"] {
  --color-bg: ${dark.bg};
  --color-bg-raised: ${dark.bgRaised};
  --color-ink: ${dark.ink};
  --color-muted: ${dark.muted};
  --color-accent: ${dark.accent};
  --color-rule: ${dark.rule};
  --motif-paper: ${paperD};
}
[data-era="${slug}"][data-theme="light"] {
  --color-bg: ${light.bg};
  --color-bg-raised: ${light.bgRaised};
  --color-ink: ${light.ink};
  --color-muted: ${light.muted};
  --color-accent: ${light.accent};
  --color-rule: ${light.rule};
  --motif-paper: ${paperL};
}
`;

  const navItems = [
    { href: `/era/${slug}`, label: era.name, exact: true },
    { href: `/era/${slug}/chapters`, label: "Chapters" },
    { href: `/era/${slug}/figures`, label: "Figures" },
    { href: `/era/${slug}/timeline`, label: "Timeline" },
    { href: `/era/${slug}/sources`, label: "Sources" },
  ];

  const motifs = getEraMotifs(slug);

  return (
    <div data-era={slug} className="relative isolate">
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      <EraAmbientMotifs items={motifs} />
      <div className="relative z-10">
        <EraNav items={navItems} />
        <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
      </div>
    </div>
  );
}
