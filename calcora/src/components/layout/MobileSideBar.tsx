import { X } from "lucide-react";
import SideBar from "./SideBar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-dvh w-full bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="relative z-10 h-dvh w-[min(20rem,85vw)]">
        <SideBar mobile onNavigate={onClose} />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default MobileSidebar;