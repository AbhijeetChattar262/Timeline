import { getFigures } from "@/lib/content";
import { FigureCard } from "@/components/era/FigureCard";

export default async function FiguresPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figures = await getFigures(slug);

  return (
    <div>
      <h1
        className="mb-8 text-3xl font-semibold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Figures
      </h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {figures.map((figure) => (
          <FigureCard
            key={figure.slug}
            eraSlug={slug}
            slug={figure.slug}
            name={figure.name}
            epithet={figure.epithet}
            role={figure.role}
            summary={figure.summary}
            provenanceTag={figure.provenanceTag}
            imageUrl={figure.image?.filePathOrUrl}
          />
        ))}
      </div>
    </div>
  );
}
