export function PeepalLeaf({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={(size * 34) / 24}
      viewBox="0 0 24 34"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2 C9 2 6 4 5 8 C4 12 6 15 9 17 C6 19 5 22 6 25 C7 29 10 32 12 33 C14 32 17 29 18 25 C19 22 18 19 15 17 C18 15 20 12 19 8 C18 4 15 2 12 2 Z"
        fill="currentColor"
      />
      <path
        d="M12 4 L12 30"
        stroke="var(--color-bg, #000)"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
    </svg>
  );
}
