import Link from "next/link";

export function Logo({
  collapsed = false,
  href = "/",
}: {
  collapsed?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        fill="none"
        className="h-8 w-8 shrink-0"
      >
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#3B82F6" }} />
            <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#brandGrad)" />
        <path
          d="M12 28L20 12L28 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M15 22H25"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="12" r="2" fill="white" />
      </svg>
      {!collapsed && (
        <span className="text-xl font-bold tracking-tight brand-gradient-text">
          Adalyzer
        </span>
      )}
    </Link>
  );
}
