import { getSources, getAllMedia } from "@/lib/content";
import { SourceFootnote } from "@/components/era/SourceFootnote";
import { CarvedDivider } from "@/components/era/CarvedDivider";

export default async function SourcesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [sources, media] = await Promise.all([getSources(slug), getAllMedia(slug)]);

  return (
    <div className="max-w-[70ch]">
      <h1
        className="mb-3 text-3xl font-semibold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Sources
      </h1>
      <p className="mb-8 text-[var(--color-muted)]">
        Every figure and event on this site cites back to something in this list.
      </p>
      <div className="flex flex-col">
        {sources.map((source) => (
          <SourceFootnote
            key={source.id}
            title={source.title}
            author={source.author}
            sourceType={source.sourceType}
            url={source.url}
            note={source.note}
          />
        ))}
      </div>

      {media.length > 0 && (
        <section className="mt-12">
          <CarvedDivider className="mb-8" />
          <h2
            className="mb-2 text-3xl font-semibold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Images &amp; textures
          </h2>
          <p className="mb-6 text-[var(--color-muted)]">
            Every image, artifact photograph, and surface texture used here, with its source and
            license.
          </p>
          <ul className="flex flex-col">
            {media.map((asset) => (
              <li
                key={asset.filePathOrUrl}
                className="border-b border-[var(--color-rule)] py-3 last:border-none"
              >
                <p className="text-[var(--color-ink)]">{asset.caption}</p>
                <p
                  className="text-sm text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-utility)" }}
                >
                  {asset.credit}
                  {asset.license ? ` · ${asset.license}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
