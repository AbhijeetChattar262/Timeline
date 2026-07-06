import type { ReactNode } from "react";
import { CarvedDivider } from "./CarvedDivider";

export function Hero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 pb-8">
      {eyebrow && (
        <p
          className="mb-3 text-[0.75rem] tracking-[0.14em] uppercase text-[var(--color-accent)]"
          style={{ fontFamily: "var(--font-utility)" }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className="text-4xl sm:text-5xl font-semibold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-4 max-w-[60ch] text-lg text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </p>
      )}
      {children}
      <CarvedDivider className="mt-8" />
    </header>
  );
}
