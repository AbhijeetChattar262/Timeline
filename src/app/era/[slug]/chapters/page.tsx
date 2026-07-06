import Link from "next/link";
import { getChapters } from "@/lib/content";
import { ProvenanceTag } from "@/components/era/ProvenanceTag";

export default async function ChaptersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapters = await getChapters(slug);

  return (
    <div>
      <h1
        className="mb-8 text-3xl font-semibold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Chapters
      </h1>
      <ol className="flex flex-col divide-y divide-[var(--color-rule)]">
        {chapters.map((chapter) => (
          <li key={chapter.slug} className="py-5">
            <Link
              href={`/era/${slug}/chapters/${chapter.slug}`}
              className="group flex items-baseline justify-between gap-4"
            >
              <span>
                <span
                  className="mr-3 text-sm tabular-nums text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-utility)" }}
                >
                  {String(chapter.chapterNumber).padStart(2, "0")}
                </span>
                <span
                  className="text-xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {chapter.title}
                </span>
              </span>
              <ProvenanceTag value={chapter.provenanceTag} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
