import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminLayout, { type AdminView } from "./AdminLayout";
import DashboardView from "./DashboardView";
import UsersView from "./UsersView";
import EventsView from "./EventsView";
import TicketsView from "./TicketsView";
import ApprovalsView from "./ApprovalsView";
import EventProposalsView from "./EventProposalsView";
import HistoryView from "./HistoryView";
import TrashView from "./TrashView";
import { getDeleteRequests, getEventProposals, type AdminAccount } from "./adminApi";

export default function AdminApp() {
  const [admin, setAdmin] = useState<AdminAccount | null>(null);
  const [view, setView] = useState<AdminView>("dashboard");
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingProposalsCount, setPendingProposalsCount] = useState(0);

  async function refreshBadges() {
    try {
      const [delRes, propRes] = await Promise.all([
        getDeleteRequests("pending"),
        getEventProposals("pending"),
      ]);
      if (delRes.success) setPendingCount(delRes.requests.length);
      if (propRes.success) setPendingProposalsCount(propRes.proposals.length);
    } catch {
      // Non-critical — badges won't update this cycle
    }
  }

  useEffect(() => {
    if (admin) refreshBadges();
  }, [admin]);

  if (!admin) {
    return <AdminLogin onLogin={setAdmin} />;
  }

  return (
    <AdminLayout
      admin={admin}
      activeView={view}
      onNavigate={setView}
      onLogout={() => setAdmin(null)}
      pendingCount={pendingCount}
      pendingProposalsCount={pendingProposalsCount}
    >
      {view === "dashboard"       && <DashboardView onNavigate={setView} />}
      {view === "users"           && <UsersView admin={admin} onChanged={refreshBadges} />}
      {view === "events"          && <EventsView admin={admin} onChanged={refreshBadges} />}
      {view === "tickets"         && <TicketsView admin={admin} onChanged={refreshBadges} />}
      {view === "approvals"       && <ApprovalsView admin={admin} onChanged={refreshBadges} />}
      {view === "event_proposals" && <EventProposalsView admin={admin} onChanged={refreshBadges} />}
      {view === "history"         && <HistoryView />}
      {view === "trash"           && <TrashView admin={admin} onChanged={refreshBadges} />}
    </AdminLayout>
  );
}
