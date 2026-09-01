import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

function Badge({
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2.5 py-1 text-xs font-medium text-[var(--muted)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;