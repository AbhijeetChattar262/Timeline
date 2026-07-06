export function Shield({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 2.5 L20 5.5 V11.5 C20 17 16.5 20.2 12 21.5 C7.5 20.2 4 17 4 11.5 V5.5 Z" />
      <path d="M12 6.5 V17.5" opacity="0.6" />
    </svg>
  );
}
