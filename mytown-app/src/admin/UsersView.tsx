import { useEffect, useState } from "react";
import DataTable, { type ColumnDef } from "./DataTable";
import RequestDeleteModal from "./RequestDeleteModal";
import { getRecords, requestDelete, type AdminAccount, type UserRecord } from "./adminApi";

interface UsersViewProps {
  admin: AdminAccount;
  onChanged: () => void; // tell parent to refresh pending count
}

export default function UsersView({ admin, onChanged }: UsersViewProps) {
  const [rows, setRows] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<UserRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getRecords<UserRecord>("users");
      if (res.success) setRows(res.records);
      else setError("Could not load users.");
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
      const res = await requestDelete(admin.id, "users", target.id, reason);
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
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  });

  const columns: ColumnDef<UserRecord>[] = [
    { key: "name", header: "Name", render: (r) => `${r.first_name} ${r.last_name}` },
    { key: "email", header: "Email", render: (r) => r.email },
    { key: "phone", header: "Phone", render: (r) => r.phone || "—" },
    { key: "created", header: "Joined", render: (r) => new Date(r.created_at).toLocaleDateString() },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Users</h1>
          <p className="text-[#5d5b5b] text-sm">All registered accounts ({filtered.length})</p>
        </div>
        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[260px] rounded-[12px] border border-[#5d5b5b] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
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
        emptyLabel="No users found."
      />

      {target && (
        <RequestDeleteModal
          recordLabel={`User #${target.id} — ${target.first_name} ${target.last_name}`}
          onCancel={() => setTarget(null)}
          onConfirm={handleConfirmDelete}
          submitting={submitting}
        />
      )}
    </div>
  );
}
