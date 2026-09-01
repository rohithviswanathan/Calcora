import { NavLink } from "react-router-dom";
import { navigationSections } from "../../data/navigation";

interface NavigationProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

function Navigation({
  collapsed = false,
  onNavigate,
}: NavigationProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-5">
      {navigationSections.map((section) => (
        <div key={section.label} className="mb-6">
          {!collapsed && (
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {section.label}
            </p>
          )}

          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    [
                      "group relative flex h-10 items-center gap-3 rounded-lg px-2.5 text-sm",
                      "transition-all duration-150",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 h-5 w-0.5 rounded-full bg-[var(--foreground)]" />
                      )}

                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0"
                      />

                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default Navigation;