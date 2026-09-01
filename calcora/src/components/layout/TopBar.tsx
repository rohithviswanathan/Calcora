import {
  Command,
  History,
  Menu,
  Moon,
} from "lucide-react";
import IconButton from "../ui/IconButton";
import { Link } from "react-router-dom";

interface TopBarProps {
  onMenuClick: () => void;
}

function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] md:hidden"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition-colors hover:border-zinc-700 hover:text-[var(--foreground)]"
        >
          <Command size={15} className="shrink-0" />

          <span className="hidden sm:inline">
            Quick calculate
          </span>

          <kbd className="ml-1 hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] sm:inline">
            K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <Link to="/history">
          <IconButton label="History">
            <History size={17} />
          </IconButton>
        </Link>

        <IconButton label="Toggle theme">
          <Moon size={17} />
        </IconButton>
      </div>
    </header>
  );
}

export default TopBar;