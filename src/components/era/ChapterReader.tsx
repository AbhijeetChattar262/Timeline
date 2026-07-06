import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProvenanceTag, type ProvenanceTagValue } from "./ProvenanceTag";
import { ArtworkCredit } from "./ArtworkCredit";
import { ConchShell, PeepalLeaf } from "./icons";

export function ChapterReader({
  chapterNumber,
  title,
  provenanceTag,
  bodyMarkdown,
  heroImage,
}: {
  chapterNumber: number;
  title: string;
  provenanceTag: ProvenanceTagValue;
  bodyMarkdown: string;
  heroImage?: {
    filePathOrUrl: string;
    caption?: string | null;
    credit?: string | null;
    license?: string | null;
  } | null;
}) {
  return (
    <article className="torn-leaf max-w-[70ch]">
      <PeepalLeaf
        size={260}
        className="pointer-events-none absolute -right-10 -bottom-6 z-0 text-[var(--color-ink)] opacity-[0.07]"
      />
      <div className="relative z-10">
        <p
          className="mb-2 flex items-center gap-2 text-sm tabular-nums tracking-[0.1em] uppercase text-[var(--color-accent)]"
          style={{ fontFamily: "var(--font-utility)" }}
        >
          <ConchShell size={16} />
          Chapter {chapterNumber}
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
        >
          {title}
        </h1>
        <div className="mt-3">
          <ProvenanceTag value={provenanceTag} />
        </div>

        {heroImage && (
          <div className="mt-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)]">
              <Image
                src={heroImage.filePathOrUrl}
                alt={heroImage.caption ?? title}
                fill
                sizes="70ch"
                className="object-cover"
                priority
              />
            </div>
            <ArtworkCredit
              caption={heroImage.caption}
              credit={heroImage.credit}
              license={heroImage.license}
            />
          </div>
        )}

        <div
          className="prose-chapter mt-8 leading-relaxed text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{bodyMarkdown}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
