import type { ReactNode } from "react";

export type MotifPlacement = {
  icon: ReactNode;
  /** CSS inset values, e.g. { top: "6%", left: "-3%" }. */
  position: { top?: string; bottom?: string; left?: string; right?: string };
  opacity?: number;
  rotate?: number;
};

/**
 * A faint, page-wide layer of the era's own iconography (weapons, wheels,
 * emblems) scattered behind the content — so the theme's motifs are present on
 * every screen, not confined to information sections. Purely decorative; sits
 * above the era's paper ground but below all content, and never intercepts
 * pointer events. Each era supplies its own placements (see eraMotifs registry).
 */
export function EraAmbientMotifs({ items }: { items: MotifPlacement[] }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute text-[var(--color-ink)]"
          style={{
            ...item.position,
            opacity: item.opacity ?? 0.05,
            transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
