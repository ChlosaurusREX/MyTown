import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import { getActionLog, getRecords, type ActionLog, type TicketRecord } from "./adminApi";

const ACTION_LABELS: Record<string, { label: string; tone: "pending" | "approved" | "rejected" | "active" }> = {
  login:             { label: "Logged In",        tone: "active" },
  delete_requested:  { label: "Requested Delete",  tone: "pending" },
  delete_approved:   { label: "Approved Delete",   tone: "approved" },
  delete_rejected:   { label: "Rejected Delete",   tone: "rejected" },
};

export default function HistoryView() {
  const [tab, setTab] = useState<"actions" | "tickets">("actions");

  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [logsError, setLogsError] = useState("");

  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState("");

  useEffect(() => {
    (async () => {
      setLogsLoading(true);
      try {
        const res = await getActionLog();
        if (res.success) setLogs(res.logs);
        else setLogsError("Could not load action history.");
      } catch {
        setLogsError("Could not reach the server.");
      } finally {
        setLogsLoading(false);
      }
    })();

    (async () => {
      setTicketsLoading(true);
      try {
        const res = await getRecords<TicketRecord>("tickets");
        if (res.success) setTickets(res.records);
        else setTicketsError("Could not load ticket history.");
      } catch {
        setTicketsError("Could not reach the server.");
      } finally {
        setTicketsLoading(false);
      }
    })();
  }, []);

  const TABS: { key: typeof tab; label: string }[] = [
    { key: "actions", label: "Admin Actions" },
    { key: "tickets", label: "Ticket History" },
  ];

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>History</h1>
        <p className="text-[#5d5b5b] text-sm">A full record of admin actions and ticket purchases.</p>
      </div>

      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              background: tab === t.key ? "#78AAD7" : "#f0f6fb",
              color: tab === t.key ? "#ffffff" : "#5d5b5b",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "actions" ? (
        logsLoading ? (
          <p className="text-[#5d5b5b] text-center py-16 text-sm">Loading...</p>
        ) : logsError ? (
          <p className="text-red-500 text-center py-16 text-sm">{logsError}</p>
        ) : logs.length === 0 ? (
          <p className="text-[#5d5b5b] text-center py-16 text-sm">No admin actions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-[16px] border border-[#c8d8e8] bg-white">
            <table className="w-full text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <thead>
                <tr className="border-b border-[#e0eaf3] bg-[#f7faFD]">
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Log ID</th>
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Admin</th>
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Action</th>
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Target</th>
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Details</th>
                  <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">When</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const meta = ACTION_LABELS[log.action] || { label: log.action, tone: "active" as const };
                  return (
                    <tr key={log.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#f7faFD] transition-colors">
                      <td className="px-4 py-3 text-[#5d5b5b] font-semibold whitespace-nowrap">#{log.id}</td>
                      <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">
                        {log.admin_name} <span className="text-[10px] text-[#a0a0a0]">(#{log.admin_id})</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge label={meta.label} tone={meta.tone} />
                      </td>
                      <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">
                        {log.target_table ? `${log.target_table} #${log.target_id}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-[#5d5b5b] max-w-[280px] truncate">{log.details || "—"}</td>
                      <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : ticketsLoading ? (
        <p className="text-[#5d5b5b] text-center py-16 text-sm">Loading...</p>
      ) : ticketsError ? (
        <p className="text-red-500 text-center py-16 text-sm">{ticketsError}</p>
      ) : tickets.length === 0 ? (
        <p className="text-[#5d5b5b] text-center py-16 text-sm">No tickets purchased yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border border-[#c8d8e8] bg-white">
          <table className="w-full text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <thead>
              <tr className="border-b border-[#e0eaf3] bg-[#f7faFD]">
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Ticket ID</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Name</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Email</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Event</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Location</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Price</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Purchased</th>
                <th className="text-left px-4 py-3 text-[#5d5b5b] font-semibold text-xs whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#f7faFD] transition-colors">
                  <td className="px-4 py-3 text-[#5d5b5b] font-mono text-xs whitespace-nowrap">{t.ticket_code}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">{t.holder_name}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">{t.email}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">{t.event_name}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">{t.location}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">$ {Number(t.total_price).toFixed(2)}</td>
                  <td className="px-4 py-3 text-[#5d5b5b] whitespace-nowrap">{new Date(t.purchased_at).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {t.is_deleted ? <StatusBadge label="Deleted" tone="deleted" /> : <StatusBadge label="Active" tone="active" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
