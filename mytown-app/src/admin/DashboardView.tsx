import { useEffect, useState } from "react";
import { getDashboard, type DashboardStats } from "./adminApi";

const CATEGORY_COLORS: Record<string, string> = {
  Community:     "#78AAD7",
  Educational:   "#A89FD7",
  Entertainment: "#D7A878",
  Sports:        "#78D7A8",
  Government:    "#D78A78",
};

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="rounded-[16px] bg-white border border-[#e0eaf3] p-5 flex flex-col gap-1">
      <p className="text-[#5d5b5b] text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="font-bold text-2xl" style={{ color }}>{value}</p>
      {sub && <p className="text-[#5d5b5b] text-xs">{sub}</p>}
    </div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-2 w-full rounded-full bg-[#f0f4f8] overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// Inline mini bar-chart for ticket trend
function TrendChart({ trend }: { trend: DashboardStats["ticket_trend"] }) {
  if (!trend || trend.length === 0) {
    return <p className="text-[#5d5b5b] text-xs text-center py-4">No ticket data in the last 7 days.</p>;
  }
  const max = Math.max(...trend.map((t) => t.sold), 1);
  return (
    <div className="flex items-end gap-2 h-24">
      {trend.map((t) => {
        const heightPct = max > 0 ? (t.sold / max) * 100 : 0;
        const label = new Date(t.day + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
        return (
          <div key={t.day} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full flex flex-col justify-end" style={{ height: 72 }}>
              <div
                className="w-full rounded-t-[4px] transition-all"
                style={{ height: `${heightPct}%`, minHeight: t.sold > 0 ? 4 : 0, background: "#78AAD7" }}
                title={`${t.sold} tickets`}
              />
            </div>
            <span className="text-[9px] text-[#5d5b5b] whitespace-nowrap">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

interface DashboardViewProps {
  onNavigate: (v: any) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getDashboard();
      if (res.success) {
        setStats(res as any as DashboardStats);
      } else {
        setError("Could not load dashboard data.");
      }
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 rounded-full border-2 border-[#78AAD7] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[12px] bg-[#fdf0ee] border border-[#D78A78] px-4 py-3 text-sm text-[#D78A78]">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  const categoryMax = Math.max(...(stats.events_by_category?.map((c) => c.count) ?? [1]), 1);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Dashboard</h1>
        <p className="text-[#5d5b5b] text-sm">Overview of your MyTown platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Revenue"
          value={`₱${stats.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          sub="from all ticket sales"
          color="#78AAD7"
        />
        <StatCard
          label="Tickets Sold"
          value={stats.total_tickets_sold.toLocaleString()}
          sub="across all events"
          color="#A89FD7"
        />
        <StatCard
          label="Registered Users"
          value={stats.total_users.toLocaleString()}
          sub="active accounts"
          color="#78D7A8"
        />
        <StatCard
          label="Active Events"
          value={stats.total_events.toLocaleString()}
          sub={stats.pending_proposals > 0 ? `${stats.pending_proposals} pending proposal${stats.pending_proposals > 1 ? "s" : ""}` : "no pending proposals"}
          color="#D7A878"
        />
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Ticket trend */}
        <div className="rounded-[16px] bg-white border border-[#e0eaf3] p-5">
          <p className="font-semibold text-sm mb-4" style={{ color: "#78AAD7" }}>Ticket Sales — Last 7 Days</p>
          <TrendChart trend={stats.ticket_trend} />
        </div>

        {/* Events by category */}
        <div className="rounded-[16px] bg-white border border-[#e0eaf3] p-5">
          <p className="font-semibold text-sm mb-4" style={{ color: "#78AAD7" }}>Events by Category</p>
          {stats.events_by_category && stats.events_by_category.length > 0 ? (
            <div className="flex flex-col gap-3">
              {stats.events_by_category.map((cat) => (
                <div key={cat.category} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-[#5d5b5b]">{cat.category}</span>
                    <span className="text-xs font-semibold" style={{ color: CATEGORY_COLORS[cat.category] ?? "#78AAD7" }}>
                      {cat.count} event{cat.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <MiniBar value={cat.count} max={categoryMax} color={CATEGORY_COLORS[cat.category] ?? "#78AAD7"} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5d5b5b] text-xs">No events yet.</p>
          )}
        </div>
      </div>

      {/* Top events */}
      <div className="rounded-[16px] bg-white border border-[#e0eaf3] p-5">
        <p className="font-semibold text-sm mb-4" style={{ color: "#78AAD7" }}>Top Events by Tickets Sold</p>
        {stats.top_events && stats.top_events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0eaf3]">
                  <th className="text-left py-2 pr-4 text-[#5d5b5b] text-xs font-semibold">Event</th>
                  <th className="text-right py-2 pr-4 text-[#5d5b5b] text-xs font-semibold">Tickets Sold</th>
                  <th className="text-right py-2 text-[#5d5b5b] text-xs font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats.top_events.map((ev, i) => (
                  <tr key={i} className="border-b border-[#f0f4f8] last:border-0">
                    <td className="py-2.5 pr-4 text-[#5d5b5b] font-medium">{ev.name}</td>
                    <td className="py-2.5 pr-4 text-right font-semibold" style={{ color: "#78AAD7" }}>
                      {ev.sold.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#5d5b5b]">
                      ₱{ev.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#5d5b5b] text-xs">No ticket sales recorded yet.</p>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Manage Users", view: "users", color: "#78D7A8" },
          { label: "Manage Events", view: "events", color: "#78AAD7" },
          { label: "View Tickets", view: "tickets", color: "#A89FD7" },
          { label: "Pending Approvals", view: "approvals", color: "#D78A78" },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className="rounded-[12px] border py-3 px-4 text-sm font-medium transition-colors hover:opacity-80 text-left"
            style={{ borderColor: item.color, color: item.color, background: `${item.color}15` }}
          >
            {item.label} →
          </button>
        ))}
      </div>
    </div>
  );
}
