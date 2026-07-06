export function ConchShell({ size = 20, className }: { size?: number; className?: string }) {
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
      <path d="M8 4 C4 6 3 10 5 14 C6.5 17 10 19.5 15 20" />
      <path d="M9 6.5 C6.5 8 6 10.5 7.5 13 C8.7 15 11 16.7 14 17.3" opacity="0.7" />
      <path d="M10.5 9 C9.3 10 9.2 11.5 10.3 12.8" opacity="0.5" />
      <path d="M15 20 C18 18.5 19.5 15.5 18.5 12.5" />
    </svg>
  );
}
