"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type HeroVerse = {
  devanagari: string;
  translation: string;
  source?: string;
};

/**
 * Cinematic, full-bleed era hero: a period painting under a warm scrim, with the
 * era title and an opening verse laid over it. The background image parallaxes
 * slowly on scroll (disabled under prefers-reduced-motion). Text colours are
 * fixed warm-light because they sit over a dark image in either theme; accents
 * still come from the era's --color-accent token. Layout/scrim live in
 * globals.css under .era-hero.
 */
export function EraHero({
  cover,
  eyebrow,
  title,
  subtitle,
  ctaHref,
  ctaLabel = "Enter the story",
  verse,
}: {
  cover: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  verse?: HeroVerse;
}) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const el = layer.current;
      if (el) {
        const y = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.14)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="era-hero">
      <div ref={layer} className="era-hero__bg" aria-hidden>
        <Image src={cover} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="era-hero__scrim" aria-hidden />
      <div className="era-hero__inner">
        {eyebrow && <p className="era-hero__eyebrow">{eyebrow}</p>}
        <h1 className="era-hero__title">{title}</h1>
        {subtitle && <p className="era-hero__subtitle">{subtitle}</p>}
        {verse && (
          <div className="era-hero__verse">
            <p className="devanagari era-hero__verse-sa">
              {verse.devanagari.split("\n").map((line, i) => (
                <span key={i} className="shloka__line">
                  {line}
                </span>
              ))}
            </p>
            <p className="era-hero__verse-en">{`“${verse.translation}”`}</p>
            {verse.source && <p className="era-hero__verse-src">{verse.source}</p>}
          </div>
        )}
        {ctaHref && (
          <Link href={ctaHref} className="era-hero__cta">
            {ctaLabel}
            <span aria-hidden> →</span>
          </Link>
        )}
      </div>
    </section>
  );
}
