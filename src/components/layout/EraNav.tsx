"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function EraNav({
  items,
}: {
  items: { href: string; label: string; exact?: boolean }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[var(--color-rule)]">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-x-7 gap-y-2 px-6 py-4">
        {items.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="relative pb-1 text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-utility)",
                color: isActive ? "var(--color-accent)" : "var(--color-muted)",
              }}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-[var(--color-accent)]"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
