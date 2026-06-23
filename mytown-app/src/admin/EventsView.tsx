import { useEffect, useState } from "react";
import DataTable, { type ColumnDef } from "./DataTable";
import RequestDeleteModal from "./RequestDeleteModal";
import AddEventModal from "./AddEventModal";
import { getRecords, requestDelete, type AdminAccount, type EventRecord } from "./adminApi";

interface EventsViewProps {
  admin: AdminAccount;
  onChanged: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Community:     "#78AAD7",
  Educational:   "#A89FD7",
  Entertainment: "#D7A878",
  Sports:        "#78D7A8",
  Government:    "#D78A78",
};

export default function EventsView({ admin, onChanged }: EventsViewProps) {
  const [rows, setRows] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<EventRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [tab, setTab] = useState<"list" | "report">("list");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getRecords<EventRecord>("events");
      if (res.success) setRows(res.records.filter((r) => !r.is_deleted));
      else setError("Could not load events.");
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleConfirmDelete(reason: string) {
    if (!target) return;
    setSubmitting(true);
    try {
      const res = await requestDelete(admin.id, "events", target.id, reason);
      if (res.success) {
        setTarget(null);
        await load();
        onChanged();
      } else {
        setError(res.message || "Failed to submit delete request.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  // Build category report
  const categoryReport = rows.reduce<Record<string, { count: number; totalTickets: number; revenue: number }>>((acc, ev) => {
    if (!acc[ev.category]) acc[ev.category] = { count: 0, totalTickets: 0, revenue: 0 };
    acc[ev.category].count++;
    acc[ev.category].totalTickets += ev.tickets_total;
    // revenue estimate: sold tickets * price
    const sold = ev.tickets_total - ev.tickets_remaining;
    acc[ev.category].revenue += sold * Number(ev.price);
    return acc;
  }, {});

  const columns: ColumnDef<EventRecord>[] = [
    { key: "name",      header: "Event Name",   render: (r) => r.name },
    {
      key: "category", header: "Category",
      render: (r) => (
        <span
          className="inline-block px-2 py-0.5 rounded-full text-white text-[11px] font-medium"
          style={{ background: CATEGORY_COLORS[r.category] ?? "#78AAD7" }}
        >
          {r.category}
        </span>
      ),
    },
    { key: "date",      header: "Date",          render: (r) => r.event_date },
    { key: "location",  header: "Location",      render: (r) => r.location },
    { key: "price",     header: "Price",         render: (r) => `₱${Number(r.price).toFixed(2)}` },
    { key: "remaining", header: "Tickets Left",  render: (r) => `${r.tickets_remaining} / ${r.tickets_total}` },
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Events</h1>
          <p className="text-[#5d5b5b] text-sm">
            {rows.length} active event{rows.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex rounded-[10px] border border-[#e0eaf3] overflow-hidden">
            <button
              onClick={() => setTab("list")}
              className="px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: tab === "list" ? "#78AAD7" : "transparent",
                color: tab === "list" ? "#fff" : "#5d5b5b",
              }}
            >
              All Events
            </button>
            <button
              onClick={() => setTab("report")}
              className="px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: tab === "report" ? "#78AAD7" : "transparent",
                color: tab === "report" ? "#fff" : "#5d5b5b",
              }}
            >
              By Category
            </button>
          </div>
          {/* Add Event button */}
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-[10px] text-sm font-medium text-white transition-colors hover:opacity-80"
            style={{ background: "#78AAD7" }}
          >
            + Add Event
          </button>
        </div>
      </div>

      {tab === "list" ? (
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          error={error}
          onRequestDelete={(row) => setTarget(row)}
          canRequestDelete={true}
          emptyLabel="No events found."
        />
      ) : (
        /* Category Report */
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-7 h-7 rounded-full border-2 border-[#78AAD7] border-t-transparent animate-spin" />
            </div>
          ) : Object.keys(categoryReport).length === 0 ? (
            <p className="text-[#5d5b5b] text-sm text-center py-8">No events found.</p>
          ) : (
            <>
              {/* Summary bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                <div className="rounded-[14px] bg-white border border-[#e0eaf3] p-4">
                  <p className="text-[#5d5b5b] text-xs">Total Events</p>
                  <p className="font-bold text-xl" style={{ color: "#78AAD7" }}>{rows.length}</p>
                </div>
                <div className="rounded-[14px] bg-white border border-[#e0eaf3] p-4">
                  <p className="text-[#5d5b5b] text-xs">Categories</p>
                  <p className="font-bold text-xl" style={{ color: "#A89FD7" }}>{Object.keys(categoryReport).length}</p>
                </div>
                <div className="rounded-[14px] bg-white border border-[#e0eaf3] p-4 col-span-2 sm:col-span-1">
                  <p className="text-[#5d5b5b] text-xs">Total Capacity</p>
                  <p className="font-bold text-xl" style={{ color: "#78D7A8" }}>
                    {rows.reduce((s, r) => s + r.tickets_total, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Per-category cards */}
              {Object.entries(categoryReport)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([cat, data]) => {
                  const color = CATEGORY_COLORS[cat] ?? "#78AAD7";
                  const eventsInCat = rows.filter((r) => r.category === cat);
                  return (
                    <div key={cat} className="rounded-[16px] bg-white border border-[#e0eaf3] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ background: color }}
                          />
                          <span className="font-semibold text-sm" style={{ color }}>{cat}</span>
                        </div>
                        <span className="text-xs font-medium text-[#5d5b5b]">
                          {data.count} event{data.count !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-[#5d5b5b] text-xs">Total Capacity</p>
                          <p className="font-semibold text-sm" style={{ color }}>{data.totalTickets.toLocaleString()} tickets</p>
                        </div>
                        <div>
                          <p className="text-[#5d5b5b] text-xs">Est. Revenue</p>
                          <p className="font-semibold text-sm" style={{ color }}>
                            ₱{data.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {eventsInCat.map((ev) => (
                          <div key={ev.id} className="flex justify-between text-xs text-[#5d5b5b] py-1 border-t border-[#f0f4f8]">
                            <span>{ev.name}</span>
                            <span className="text-right">{ev.event_date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      )}

      {target && (
        <RequestDeleteModal
          recordLabel={`Event #${target.id} — ${target.name}`}
          onCancel={() => setTarget(null)}
          onConfirm={handleConfirmDelete}
          submitting={submitting}
        />
      )}

      {showAdd && (
        <AddEventModal
          admin={admin}
          onClose={() => setShowAdd(false)}
          onSuccess={() => { load(); onChanged(); }}
        />
      )}
    </div>
  );
}
