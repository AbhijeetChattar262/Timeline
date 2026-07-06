import Link from "next/link";
import Image from "next/image";
import { ProvenanceTag, type ProvenanceTagValue } from "./ProvenanceTag";

export function FigureCard({
  eraSlug,
  slug,
  name,
  epithet,
  role,
  summary,
  provenanceTag,
  imageUrl,
}: {
  eraSlug: string;
  slug: string;
  name: string;
  epithet?: string | null;
  role?: string | null;
  summary: string;
  provenanceTag: ProvenanceTagValue;
  imageUrl?: string | null;
}) {
  return (
    <Link href={`/era/${eraSlug}/figures/${slug}`} className="leaf-card overflow-hidden">
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-xl font-semibold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </h3>
            {epithet && (
              <p className="text-sm italic text-[var(--color-muted)]">{epithet}</p>
            )}
          </div>
          <ProvenanceTag value={provenanceTag} />
        </div>
        {role && (
          <p
            className="mt-2 text-xs tracking-wide uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            {role}
          </p>
        )}
        <p className="mt-3 text-[var(--color-ink)] opacity-90 line-clamp-3">{summary}</p>
      </div>
    </Link>
  );
}
