import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Navigation from "./Navigation";

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

function Sidebar({
  mobile = false,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const isCollapsed = mobile ? false : collapsed;

  return (
    <aside
      className={[
        "flex h-dvh min-h-0 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)]",
        mobile ? "w-full" : "hidden md:flex",
        !mobile && (collapsed ? "w-16" : "w-60"),
        !mobile ? "transition-[width] duration-200" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] px-3">
        <NavLink
          to="/"
          onClick={onNavigate}
          className={`flex items-center gap-2 ${
            isCollapsed ? "mx-auto" : "px-2"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--foreground)] text-sm font-bold text-[var(--background)]">
            C
          </div>

          {!isCollapsed && (
            <span className="text-sm font-semibold tracking-tight">
              Calcora
            </span>
          )}
        </NavLink>

        {!mobile && (
          <button
            type="button"
            onClick={() =>
              setCollapsed((value) => !value)
            }
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          >
            {collapsed ? (
              <ChevronRight size={17} />
            ) : (
              <ChevronLeft size={17} />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Navigation
          collapsed={isCollapsed}
          onNavigate={onNavigate}
        />
      </div>

    </aside>
  );
}

export default Sidebar;