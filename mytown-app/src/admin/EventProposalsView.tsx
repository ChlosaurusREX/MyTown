import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import { getEventProposals, resolveEventProposal, type AdminAccount, type EventProposal } from "./adminApi";

interface EventProposalsViewProps {
  admin: AdminAccount;
  onChanged: () => void;
}

function ConfirmModal({
  proposal,
  decision,
  onCancel,
  onConfirm,
  submitting,
}: {
  proposal: EventProposal;
  decision: "approve" | "reject";
  onCancel: () => void;
  onConfirm: () => void;
  submitting: boolean;
}) {
  const isApprove = decision === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-[400px] rounded-[20px] bg-white border border-[#e0eaf3] p-5">
        <h3 className="text-center font-semibold mb-1" style={{ color: isApprove ? "#78AAD7" : "#D78A78", fontSize: 18 }}>
          {isApprove ? "Approve & Publish Event?" : "Reject Proposal?"}
        </h3>
        <p className="text-center text-[#5d5b5b] text-sm mb-1">
          {isApprove
            ? "The event will be published and available to users immediately."
            : "The proposal will be closed. No event will be created."}
        </p>
        <p className="text-center text-[#5d5b5b] text-sm font-semibold mb-3">"{proposal.name}"</p>
        <p className="text-[#5d5b5b] text-xs mb-4">
          Proposed by {proposal.proposed_by_name}
          {proposal.notes && <> — notes: "{proposal.notes}"</>}
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
            style={{ background: isApprove ? "#78AAD7" : "#D78A78" }}
          >
            {submitting ? "Processing…" : isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventProposalsView({ admin, onChanged }: EventProposalsViewProps) {
  const [proposals, setProposals] = useState<EventProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"pending" | "all">("pending");
  const [selected, setSelected] = useState<EventProposal | null>(null);
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await getEventProposals(filter === "all" ? "all" : "pending");
      if (res.success) setProposals(res.proposals);
      else setError("Could not load proposals.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [filter]);

  async function handleResolve() {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await resolveEventProposal(admin.id, selected.id, decision);
      if (res.success) {
        setSelected(null);
        await load();
        onChanged();
      } else {
        setError(res.message || "Failed to resolve.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  const pendingCount = proposals.filter((p) => p.status === "pending").length;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-semibold" style={{ color: "#78AAD7", fontSize: 24 }}>Event Proposals</h1>
          <p className="text-[#5d5b5b] text-sm">
            {pendingCount > 0 ? `${pendingCount} pending proposal${pendingCount > 1 ? "s" : ""} awaiting review` : "No pending proposals"}
          </p>
        </div>
        <div className="flex rounded-[10px] border border-[#e0eaf3] overflow-hidden">
          <button
            onClick={() => setFilter("pending")}
            className="px-3 py-1.5 text-xs font-medium transition-colors"
            style={{ background: filter === "pending" ? "#78AAD7" : "transparent", color: filter === "pending" ? "#fff" : "#5d5b5b" }}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("all")}
            className="px-3 py-1.5 text-xs font-medium transition-colors"
            style={{ background: filter === "all" ? "#78AAD7" : "transparent", color: filter === "all" ? "#fff" : "#5d5b5b" }}
          >
            All
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-[12px] bg-[#fdf0ee] border border-[#D78A78] px-4 py-3 text-sm text-[#D78A78]">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 rounded-full border-2 border-[#78AAD7] border-t-transparent animate-spin" />
        </div>
      ) : proposals.length === 0 ? (
        <div className="rounded-[16px] bg-white border border-[#e0eaf3] px-6 py-10 text-center text-[#5d5b5b] text-sm">
          {filter === "pending" ? "No pending proposals right now." : "No proposals found."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {proposals.map((p) => (
            <div key={p.id} className="rounded-[16px] bg-white border border-[#e0eaf3] p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-[#5d5b5b]">{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-2">
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Category</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">{p.category}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Date</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">{p.event_date}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Location</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">{p.location}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Price</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">₱{p.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Tickets</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">{p.tickets_total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">Proposed by</p>
                      <p className="text-[#5d5b5b] text-xs font-medium">{p.proposed_by_name}</p>
                    </div>
                  </div>
                  {p.notes && (
                    <p className="text-[#5d5b5b] text-xs mt-2 italic">Notes: "{p.notes}"</p>
                  )}
                  {p.reviewed_by_name && (
                    <p className="text-[#9ca3af] text-xs mt-1">
                      Reviewed by {p.reviewed_by_name} on {new Date(p.reviewed_at!).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {p.status === "pending" && admin.role === "super_admin" && (
                  <div className="flex gap-2 sm:flex-col shrink-0">
                    <button
                      onClick={() => { setSelected(p); setDecision("approve"); }}
                      className="px-3 py-1.5 rounded-[8px] text-xs font-medium text-white transition-colors hover:opacity-80"
                      style={{ background: "#78AAD7" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => { setSelected(p); setDecision("reject"); }}
                      className="px-3 py-1.5 rounded-[8px] text-xs font-medium text-white transition-colors hover:opacity-80"
                      style={{ background: "#D78A78" }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <ConfirmModal
          proposal={selected}
          decision={decision}
          onCancel={() => setSelected(null)}
          onConfirm={handleResolve}
          submitting={submitting}
        />
      )}
    </div>
  );
}
