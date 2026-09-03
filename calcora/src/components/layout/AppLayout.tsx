import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MobileSidebar from "./MobileSideBar";

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("calcora-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );

    document.documentElement.classList.toggle(
      "light",
      theme === "light",
    );

    localStorage.setItem("calcora-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <SideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onMenuClick={() => setMobileMenuOpen(true)}
          onToggleTheme={handleToggleTheme}
          theme={theme}
        />

        <main className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}

export default AppLayout;