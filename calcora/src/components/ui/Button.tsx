import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
    secondary:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
    ghost:
      "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
  };

  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--border)] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;