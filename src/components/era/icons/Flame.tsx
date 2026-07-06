export function Flame({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 2.5 C9 7 7 10 7 13.5 C7 17.6 9.7 20.5 12 20.5 C14.3 20.5 17 17.6 17 13.5 C17 11.5 16 9.5 14.5 8 C14.7 10 13.7 11 12.5 11.3 C13.3 8.5 12.5 5 12 2.5 Z" />
    </svg>
  );
}
