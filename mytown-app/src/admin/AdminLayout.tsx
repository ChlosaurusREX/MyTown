import { useState } from "react";
import imgLogo from "../imports/Login/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import type { AdminAccount } from "./adminApi";

export type AdminView =
  | "dashboard"
  | "users"
  | "events"
  | "tickets"
  | "approvals"
  | "event_proposals"
  | "history"
  | "trash";

interface AdminLayoutProps {
  admin: AdminAccount;
  activeView: AdminView;
  onNavigate: (v: AdminView) => void;
  onLogout: () => void;
  pendingCount: number;
  pendingProposalsCount: number;
  children: React.ReactNode;
}

const NAV_ITEMS: { key: AdminView; label: string; icon: string; superAdminOnly?: boolean }[] = [
  { key: "dashboard",        label: "Dashboard",          icon: "📊" },
  { key: "users",            label: "Users",              icon: "👥" },
  { key: "events",           label: "Events",             icon: "🎪" },
  { key: "tickets",          label: "Tickets",            icon: "🎫" },
  { key: "approvals",        label: "Pending Approvals",  icon: "✅" },
  { key: "event_proposals",  label: "Event Proposals",    icon: "📋", superAdminOnly: false },
  { key: "history",          label: "History",            icon: "📜" },
  { key: "trash",            label: "Trash Bin",          icon: "🗑️" },
];

export default function AdminLayout({
  admin,
  activeView,
  onNavigate,
  onLogout,
  pendingCount,
  pendingProposalsCount,
  children,
}: AdminLayoutProps) {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7faFD] flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex w-[230px] shrink-0 flex-col border-r border-[#e0eaf3] bg-white">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#e0eaf3]">
          <div className="w-10 h-10 shrink-0 overflow-hidden">
            <img src={imgLogo} alt="MyTown" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-[#78AAD7] font-bold text-sm leading-tight">MyTown</p>
            <p className="text-[#5d5b5b] text-[11px] leading-tight">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = activeView === item.key;
            const badge =
              item.key === "approvals" && pendingCount > 0
                ? pendingCount
                : item.key === "event_proposals" && pendingProposalsCount > 0
                ? pendingProposalsCount
                : 0;

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="flex items-center justify-between px-3 py-2 rounded-[10px] text-sm font-medium transition-colors text-left w-full"
                style={{
                  background: active ? "#78AAD7" : "transparent",
                  color: active ? "#ffffff" : item.key === "trash" ? "#D78A78" : "#5d5b5b",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {badge > 0 && (
                  <span
                    className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold"
                    style={{
                      background: active ? "rgba(255,255,255,0.25)" : "#D78A78",
                      color: "#ffffff",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#e0eaf3]">
          <div className="px-3 py-2 mb-2">
            <p className="text-[#5d5b5b] text-xs font-semibold truncate">{admin.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                style={{ background: admin.role === "super_admin" ? "#A89FD7" : "#78AAD7" }}
              >
                {admin.role === "super_admin" ? "Super Admin" : "Admin"}
              </span>
            </div>
            <p className="text-[#5d5b5b] text-[11px] mt-1 truncate">{admin.email}</p>
          </div>
          <button
            onClick={() => setConfirmLogout(true)}
            className="w-full text-left px-3 py-2 rounded-[10px] text-sm font-medium text-[#D78A78] hover:bg-[#fdf0ee] transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-[#e0eaf3] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 shrink-0 overflow-hidden">
            <img src={imgLogo} alt="MyTown" className="w-full h-full object-contain" />
          </div>
          <p className="text-[#78AAD7] font-bold text-sm">Admin Panel</p>
        </div>
        <button onClick={() => setConfirmLogout(true)} className="text-[#D78A78] text-xs font-medium">
          Log out
        </button>
      </div>

      {/* ── Mobile nav (scrollable) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[#e0eaf3] flex overflow-x-auto py-1 gap-0">
        {NAV_ITEMS.map((item) => {
          const active = activeView === item.key;
          const badge =
            item.key === "approvals" && pendingCount > 0
              ? pendingCount
              : item.key === "event_proposals" && pendingProposalsCount > 0
              ? pendingProposalsCount
              : 0;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="relative flex flex-col items-center px-2 py-1 text-[9px] font-medium shrink-0 min-w-[56px]"
              style={{ color: active ? "#78AAD7" : item.key === "trash" ? "#D78A78" : "#5d5b5b" }}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span className="text-center leading-tight">{item.label.split(" ")[0]}</span>
              {badge > 0 && (
                <span
                  className="absolute top-0 right-1.5 inline-flex items-center justify-center min-w-[14px] h-3.5 px-0.5 rounded-full text-[8px] font-semibold text-white"
                  style={{ background: "#D78A78" }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 md:py-8 pt-20 pb-20 md:pt-8 md:pb-8 overflow-x-hidden">
        {children}
      </main>

      {/* ── Logout confirmation modal ── */}
      {confirmLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[360px] rounded-[20px] bg-white border border-[#5d5b5b] p-5">
            <h3 className="text-center font-semibold mb-1" style={{ color: "#78AAD7", fontSize: 18 }}>
              Log out?
            </h3>
            <p className="text-center text-[#5d5b5b] text-sm mb-4">
              You'll need to sign in again to access the admin panel.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 rounded-[12px] border border-[#5d5b5b] py-2 text-sm font-medium text-[#5d5b5b] hover:bg-[#f0f0f0] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 rounded-[12px] bg-[#D78A78] py-2 text-sm font-medium text-white hover:bg-[#c97862] transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
