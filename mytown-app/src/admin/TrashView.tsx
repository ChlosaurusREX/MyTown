import { useEffect, useState } from "react";
import { getTrash, restoreRecord, type AdminAccount, type UserRecord, type EventRecord, type TicketRecord } from "./adminApi";

type TrashTab = "users" | "events" | "tickets";

interface TrashViewProps {
  admin: AdminAccount;
  onChanged: () => void;
}

function ConfirmRestoreModal({
  label,
  onCancel,
  onConfirm,
  submitting,
}: {
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
  submitting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-[360px] rounded-[20px] bg-white border border-[#e0eaf3] p-5">
        <h3 className="text-center font-semibold mb-1" style={{ color: "#78D7A8", fontSize: 18 }}>Restore Record?</h3>
        <p className="text-center text-[#5d5b5b] text-sm mb-1">This will make the record active again.</p>
        <p className="text-center text-[#5d5b5b] text-sm font-semibold mb-4">{label}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 rounded-[12px] border border-[#5d5b5b] py-2 text-sm font-medium text-[#5d5b5b] hover:bg-[#f0f0f0] transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="flex-1 rounded-[12px] py-2 text-sm font-medium text-white transition-colors disabled:opacity-60"
            style={{ background: "#78D7A8" }}
          >
            {submitting ? "Restoring…" : "Restore"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrashView({ admin, onChanged }: TrashViewProps) {
  const [activeTab, setActiveTab] = useState<TrashTab>("users");
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restoreTarget, setRestoreTarget] = useState<{ table: TrashTab; id: number; label: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSuperAdmin = admin.role === "super_admin";

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getTrash("all");
      if (res.success) {
        setUsers((res.trash.users ?? []) as UserRecord[]);
        setEvents((res.trash.events ?? []) as EventRecord[]);
        setTickets((res.trash.tickets ?? []) as TicketRecord[]);
      } else {
        setError("Could not load trash.");
      }
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleRestore() {
    if (!restoreTarget) return;
    setSubmitting(true);
    try {
      const res = await restoreRecord(admin.id, restoreTarget.table, restoreTarget.id);
      if (res.success) {
        setRestoreTarget(null);
        await load();
        onChanged();
      } else {
        setError(res.message || "Failed to restore.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  const totalCount = users.length + events.length + tickets.length;
  const tabCount = { users: users.length, events: events.length, tickets: tickets.length };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="mb-5">
        <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Trash Bin</h1>
        <p className="text-[#5d5b5b] text-sm">
          {totalCount > 0
            ? `${totalCount} deleted record${totalCount !== 1 ? "s" : ""}${isSuperAdmin ? " — you can restore them" : ""}`
            : "Trash bin is empty"}
        </p>
        {!isSuperAdmin && (
          <p className="text-[#D78A78] text-xs mt-1">Only Super Admins can restore records.</p>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-[12px] bg-[#fdf0ee] border border-[#D78A78] px-4 py-3 text-sm text-[#D78A78]">{error}</div>
      )}

      {/* Tab bar */}
      <div className="flex gap-1 mb-4 bg-[#f0f4f8] rounded-[12px] p-1 w-fit">
        {(["users", "events", "tickets"] as TrashTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-3 py-1.5 rounded-[9px] text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{
              background: activeTab === t ? "#fff" : "transparent",
              color: activeTab === t ? "#78AAD7" : "#5d5b5b",
              boxShadow: activeTab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {tabCount[t] > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full text-[10px] font-semibold text-white"
                style={{ background: activeTab === t ? "#D78A78" : "#9ca3af" }}
              >
                {tabCount[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 rounded-full border-2 border-[#78AAD7] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {/* Users trash */}
          {activeTab === "users" && (
            <div className="overflow-x-auto rounded-[16px] border border-[#e0eaf3] bg-white">
              {users.length === 0 ? (
                <p className="text-[#5d5b5b] text-sm text-center py-10">No deleted users.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e0eaf3]">
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Name</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Email</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Phone</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Joined</th>
                      {isSuperAdmin && <th className="px-4 py-3" />}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-[#f0f4f8] last:border-0 hover:bg-[#fafcff]">
                        <td className="px-4 py-3 text-[#5d5b5b]">{u.first_name} {u.last_name}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{u.email}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{u.phone || "—"}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{new Date(u.created_at).toLocaleDateString()}</td>
                        {isSuperAdmin && (
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => setRestoreTarget({ table: "users", id: u.id, label: `User #${u.id} — ${u.first_name} ${u.last_name}` })}
                              className="px-3 py-1 rounded-[8px] text-xs font-medium text-white transition-colors hover:opacity-80"
                              style={{ background: "#78D7A8" }}
                            >
                              Restore
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Events trash */}
          {activeTab === "events" && (
            <div className="overflow-x-auto rounded-[16px] border border-[#e0eaf3] bg-white">
              {events.length === 0 ? (
                <p className="text-[#5d5b5b] text-sm text-center py-10">No deleted events.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e0eaf3]">
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Event</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Category</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Date</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Price</th>
                      {isSuperAdmin && <th className="px-4 py-3" />}
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev.id} className="border-b border-[#f0f4f8] last:border-0 hover:bg-[#fafcff]">
                        <td className="px-4 py-3 text-[#5d5b5b] font-medium">{ev.name}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{ev.category}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{ev.event_date}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">₱{Number(ev.price).toFixed(2)}</td>
                        {isSuperAdmin && (
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => setRestoreTarget({ table: "events", id: ev.id, label: `Event #${ev.id} — ${ev.name}` })}
                              className="px-3 py-1 rounded-[8px] text-xs font-medium text-white transition-colors hover:opacity-80"
                              style={{ background: "#78D7A8" }}
                            >
                              Restore
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Tickets trash */}
          {activeTab === "tickets" && (
            <div className="overflow-x-auto rounded-[16px] border border-[#e0eaf3] bg-white">
              {tickets.length === 0 ? (
                <p className="text-[#5d5b5b] text-sm text-center py-10">No deleted tickets.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e0eaf3]">
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Ticket Code</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Holder</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Event</th>
                      <th className="text-left px-4 py-3 text-[#5d5b5b] text-xs font-semibold">Price Paid</th>
                      {isSuperAdmin && <th className="px-4 py-3" />}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id} className="border-b border-[#f0f4f8] last:border-0 hover:bg-[#fafcff]">
                        <td className="px-4 py-3 font-mono text-xs text-[#5d5b5b]">{t.ticket_code}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{t.holder_name}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">{t.event_name}</td>
                        <td className="px-4 py-3 text-[#5d5b5b]">₱{Number(t.total_price).toFixed(2)}</td>
                        {isSuperAdmin && (
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => setRestoreTarget({ table: "tickets", id: t.id, label: `Ticket #${t.id} — ${t.ticket_code}` })}
                              className="px-3 py-1 rounded-[8px] text-xs font-medium text-white transition-colors hover:opacity-80"
                              style={{ background: "#78D7A8" }}
                            >
                              Restore
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}

      {restoreTarget && (
        <ConfirmRestoreModal
          label={restoreTarget.label}
          onCancel={() => setRestoreTarget(null)}
          onConfirm={handleRestore}
          submitting={submitting}
        />
      )}
    </div>
  );
}
