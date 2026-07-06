export function ChariotWheel({ size = 20, className }: { size?: number; className?: string }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="2" />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="12"
          y1="12"
          x2="12"
          y2="2.5"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}
