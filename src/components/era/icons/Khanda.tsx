export function Khanda({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* broad straight double-edged blade */}
      <path d="M12 2 L13.4 5 L13.4 16 L12 17.6 L10.6 16 L10.6 5 Z" />
      {/* cross-guard */}
      <line x1="7.5" y1="17.6" x2="16.5" y2="17.6" />
      {/* grip and pommel disc */}
      <line x1="12" y1="17.6" x2="12" y2="21" />
      <circle cx="12" cy="21.6" r="1" />
    </svg>
  );
}
