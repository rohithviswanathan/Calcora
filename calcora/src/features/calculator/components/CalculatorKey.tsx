import type { ReactNode } from "react";

interface CalculatorKeyProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "number" | "operator" | "action" | "equals";
  className?: string;
  ariaLabel?: string;
}

function CalculatorKey({
  children,
  onClick,
  variant = "number",
  className = "",
  ariaLabel,
}: CalculatorKeyProps) {
  const variants = {
    number:
      "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
    operator:
      "bg-[var(--surface-hover)] text-[var(--foreground)] hover:brightness-110",
    action:
      "bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)]",
    equals:
      "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "flex h-14 items-center justify-center rounded-xl",
        "border border-[var(--border)]",
        "text-base font-medium",
        "transition-all duration-100",
        "active:scale-[0.97]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border)]",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default CalculatorKey;