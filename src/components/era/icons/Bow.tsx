export function Bow({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M7 3 C4 8 4 16 7 21" />
      <line x1="7" y1="3" x2="7" y2="21" opacity="0.6" />
      <line x1="3" y1="12" x2="19" y2="12" />
      <path d="M19 12 L15.5 10.3 M19 12 L15.5 13.7" />
    </svg>
  );
}
