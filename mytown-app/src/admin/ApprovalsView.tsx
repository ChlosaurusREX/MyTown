import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import { getDeleteRequests, resolveDeleteRequest, type AdminAccount, type DeleteRequest } from "./adminApi";

interface ApprovalsViewProps {
  admin: AdminAccount;
  onChanged: () => void;
}

function ConfirmResolveModal({
  request,
  decision,
  onCancel,
  onConfirm,
  submitting,
}: {
  request: DeleteRequest;
  decision: "approve" | "reject";
  onCancel: () => void;
  onConfirm: () => void;
  submitting: boolean;
}) {
  const isApprove = decision === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-[400px] rounded-[20px] bg-white border border-[#5d5b5b] p-5">
        <h3 className="text-center font-semibold mb-1" style={{ color: isApprove ? "#D78A78" : "#5d5b5b", fontSize: 18 }}>
          {isApprove ? "Confirm Delete" : "Reject Request"}
        </h3>
        <p className="text-center text-[#5d5b5b] text-sm mb-1">
          {isApprove
            ? "This will permanently mark the record as deleted."
            : "The record will stay exactly as it is."}
        </p>
        <p className="text-center text-[#5d5b5b] text-sm font-semibold mb-4">
          {request.target_table} #{request.target_id}
        </p>
        <p className="text-[#5d5b5b] text-xs mb-4">
          Requested by {request.requested_by_name} (Admin #{request.requested_by})
          {request.reason && <> — reason: "{request.reason}"</>}
        </p>
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
            style={{ background: isApprove ? "#D78A78" : "#78AAD7" }}
          >
            {submitting ? "Processing..." : isApprove ? "Confirm Delete" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ApprovalsView({ admin, onChanged }: ApprovalsViewProps) {
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [requests, setRequests] = useState<DeleteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionTarget, setActionTarget] = useState<{ request: DeleteRequest; decision: "approve" | "reject" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSuperAdmin = admin.role === "super_admin";

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getDeleteRequests(tab);
      if (res.success) setRequests(res.requests);
      else setError("Could not load delete requests.");
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [tab]);

  async function handleConfirmResolve() {
    if (!actionTarget) return;
    setSubmitting(true);
    try {
      const res = await resolveDeleteRequest(admin.id, actionTarget.request.id, actionTarget.decision);
      if (res.success) {
        setActionTarget(null);
        await load();
        onChanged();
      } else {
        setError(res.message || "Failed to resolve request.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  const TABS: { key: typeof tab; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Pending Approvals</h1>
        <p className="text-[#5d5b5b] text-sm">
          {isSuperAdmin
            ? "Review delete requests submitted by Admins."
            : "Track the status of delete requests you've submitted."}
        </p>
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

      {loading ? (
        <p className="text-[#5d5b5b] text-center py-16 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-16 text-sm">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-[#5d5b5b] text-center py-16 text-sm">No {tab} requests.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-[16px] border border-[#c8d8e8] bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#5d5b5b] font-semibold text-sm">
                    Request #{req.id} — {req.target_table} #{req.target_id}
                  </span>
                  <StatusBadge
                    label={req.status[0].toUpperCase() + req.status.slice(1)}
                    tone={req.status}
                  />
                </div>
                <p className="text-[#5d5b5b] text-xs">
                  Requested by {req.requested_by_name} (Admin #{req.requested_by}) on{" "}
                  {new Date(req.requested_at).toLocaleString()}
                </p>
                {req.reason && (
                  <p className="text-[#5d5b5b] text-xs italic mt-0.5">Reason: "{req.reason}"</p>
                )}
                {req.status !== "pending" && req.resolved_by_name && (
                  <p className="text-[#5d5b5b] text-xs mt-0.5">
                    {req.status === "approved" ? "Approved" : "Rejected"} by {req.resolved_by_name} (Admin #{req.resolved_by}) on{" "}
                    {req.resolved_at && new Date(req.resolved_at).toLocaleString()}
                  </p>
                )}
              </div>

              {req.status === "pending" && isSuperAdmin && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setActionTarget({ request: req, decision: "reject" })}
                    className="px-3 py-1.5 rounded-[10px] border border-[#5d5b5b] text-xs font-medium text-[#5d5b5b] hover:bg-[#f0f0f0] transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setActionTarget({ request: req, decision: "approve" })}
                    className="px-3 py-1.5 rounded-[10px] bg-[#D78A78] text-xs font-medium text-white hover:bg-[#c97862] transition-colors"
                  >
                    Approve
                  </button>
                </div>
              )}
              {req.status === "pending" && !isSuperAdmin && (
                <span className="text-[#5d5b5b] text-xs italic shrink-0">Awaiting Super Admin review</span>
              )}
            </div>
          ))}
        </div>
      )}

      {actionTarget && (
        <ConfirmResolveModal
          request={actionTarget.request}
          decision={actionTarget.decision}
          onCancel={() => setActionTarget(null)}
          onConfirm={handleConfirmResolve}
          submitting={submitting}
        />
      )}
    </div>
  );
}
