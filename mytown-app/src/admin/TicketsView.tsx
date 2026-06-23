import { useEffect, useState } from "react";
import DataTable, { type ColumnDef } from "./DataTable";
import RequestDeleteModal from "./RequestDeleteModal";
import { getRecords, requestDelete, type AdminAccount, type TicketRecord } from "./adminApi";

interface TicketsViewProps {
  admin: AdminAccount;
  onChanged: () => void;
}

export default function TicketsView({ admin, onChanged }: TicketsViewProps) {
  const [rows, setRows] = useState<TicketRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<TicketRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getRecords<TicketRecord>("tickets");
      if (res.success) setRows(res.records);
      else setError("Could not load tickets.");
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
      const res = await requestDelete(admin.id, "tickets", target.id, reason);
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

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.ticket_code.toLowerCase().includes(q) ||
      r.holder_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.event_name.toLowerCase().includes(q)
    );
  });

  const columns: ColumnDef<TicketRecord>[] = [
    { key: "code", header: "Ticket ID", render: (r) => <span className="font-mono text-xs">{r.ticket_code}</span> },
    { key: "holder", header: "Name", render: (r) => r.holder_name },
    { key: "email", header: "Email", render: (r) => r.email },
    { key: "event", header: "Event", render: (r) => r.event_name },
    { key: "location", header: "Location", render: (r) => r.location },
    { key: "price", header: "Price Paid", render: (r) => `$ ${Number(r.total_price).toFixed(2)}` },
    { key: "qty", header: "Qty", render: (r) => r.quantity },
    { key: "purchased", header: "Purchased", render: (r) => new Date(r.purchased_at).toLocaleString() },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Tickets</h1>
          <p className="text-[#5d5b5b] text-sm">All ticket purchases ({filtered.length})</p>
        </div>
        <input
          type="text"
          placeholder="Search ticket ID, name, email, event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px] rounded-[12px] border border-[#5d5b5b] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
          style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
        />
      </div>

      <DataTable
        columns={columns}
        rows={filtered}
        loading={loading}
        error={error}
        onRequestDelete={(row) => setTarget(row)}
        canRequestDelete={true}
        emptyLabel="No tickets found."
      />

      {target && (
        <RequestDeleteModal
          recordLabel={`Ticket #${target.id} — ${target.ticket_code} (${target.holder_name})`}
          onCancel={() => setTarget(null)}
          onConfirm={handleConfirmDelete}
          submitting={submitting}
        />
      )}
    </div>
  );
}
