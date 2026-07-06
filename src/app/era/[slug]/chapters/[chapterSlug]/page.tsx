import { notFound } from "next/navigation";
import Link from "next/link";
import { getChapterBySlug, getChapters } from "@/lib/content";
import { ChapterReader } from "@/components/era/ChapterReader";
import { CarvedDivider } from "@/components/era/CarvedDivider";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;
  const [chapter, chapters] = await Promise.all([
    getChapterBySlug(slug, chapterSlug),
    getChapters(slug),
  ]);

  if (!chapter) notFound();

  const index = chapters.findIndex((c) => c.slug === chapterSlug);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <div className="px-2 py-6 sm:px-4">
      <ChapterReader
        chapterNumber={chapter.chapterNumber}
        title={chapter.title}
        provenanceTag={chapter.provenanceTag}
        bodyMarkdown={chapter.bodyMarkdown}
        heroImage={
          chapter.heroMedia
            ? {
                filePathOrUrl: chapter.heroMedia.filePathOrUrl,
                caption: chapter.heroMedia.caption,
                credit: chapter.heroMedia.credit,
                license: chapter.heroMedia.license,
              }
            : null
        }
      />

      <CarvedDivider className="mt-16 mb-6 max-w-[70ch]" />
      <nav className="flex max-w-[70ch] justify-between text-sm">
        {prev ? (
          <Link
            href={`/era/${slug}/chapters/${prev.slug}`}
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
          >
            ← Chapter {prev.chapterNumber}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/era/${slug}/chapters/${next.slug}`}
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
          >
            Chapter {next.chapterNumber}: {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
