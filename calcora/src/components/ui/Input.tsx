import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-zinc-500 ${className}`}
      {...props}
    />
  );
}

export default Input;