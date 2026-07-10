/**
 * A Sanskrit verse, rendered as Devanagari + IAST transliteration + an English
 * reading + its source. Colours come entirely from era tokens, so it reads
 * correctly on parchment in both light and dark themes. `align="center"` is used
 * for the full-width verse bands on the era landing page.
 */
export function Shloka({
  devanagari,
  transliteration,
  translation,
  source,
  align = "left",
}: {
  devanagari: string;
  transliteration?: string;
  translation?: string;
  source?: string;
  align?: "left" | "center";
}) {
  return (
    <figure className={`shloka ${align === "center" ? "shloka--center" : ""}`}>
      <p className="shloka__sa devanagari">
        {devanagari.split("\n").map((line, i) => (
          <span key={i} className="shloka__line">
            {line}
          </span>
        ))}
      </p>
      {transliteration && (
        <p className="shloka__iast">
          {transliteration.split("\n").map((line, i) => (
            <span key={i} className="shloka__line">
              {line}
            </span>
          ))}
        </p>
      )}
      {translation && <blockquote className="shloka__en">{`“${translation}”`}</blockquote>}
      {source && <figcaption className="shloka__src">{source}</figcaption>}
    </figure>
  );
}
