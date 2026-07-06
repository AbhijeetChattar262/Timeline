export function CrossedSwords({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* two blades crossing, hilts at the bottom */}
      <path d="M4 3 L15 18" />
      <path d="M20 3 L9 18" />
      {/* hilts / guards */}
      <path d="M13.5 16 L17 19.5 M15.2 17.7 L13.5 19.4" />
      <path d="M10.5 16 L7 19.5 M8.8 17.7 L10.5 19.4" />
      {/* blade tips */}
      <path d="M4 3 L6.4 3.2 L4.2 5.4 Z" fill="currentColor" />
      <path d="M20 3 L17.6 3.2 L19.8 5.4 Z" fill="currentColor" />
    </svg>
  );
}
