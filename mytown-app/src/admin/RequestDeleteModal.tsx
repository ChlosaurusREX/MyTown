import { useState } from "react";

interface RequestDeleteModalProps {
  recordLabel: string;   // e.g. "User #14 — Juan Dela Cruz"
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  submitting: boolean;
}

export default function RequestDeleteModal({ recordLabel, onCancel, onConfirm, submitting }: RequestDeleteModalProps) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-[400px] rounded-[20px] bg-white border border-[#5d5b5b] p-5">
        <h3 className="text-center font-semibold mb-1" style={{ color: "#D78A78", fontSize: 18 }}>
          Request Deletion
        </h3>
        <p className="text-center text-[#5d5b5b] text-sm mb-1">
          You're requesting deletion of:
        </p>
        <p className="text-center text-[#5d5b5b] text-sm font-semibold mb-4">{recordLabel}</p>

        <p className="text-[#5d5b5b] text-xs mb-3">
          This won't delete anything yet — a Super Admin will need to
          approve this request first. Your name and the record's ID
          will be recorded with this request.
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for deletion (optional)"
          rows={3}
          className="w-full rounded-[12px] border border-[#5d5b5b] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors resize-none mb-4"
          style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
        />

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 rounded-[12px] border border-[#5d5b5b] py-2 text-sm font-medium text-[#5d5b5b] hover:bg-[#f0f0f0] transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason.trim())}
            disabled={submitting}
            className="flex-1 rounded-[12px] bg-[#D78A78] py-2 text-sm font-medium text-white hover:bg-[#c97862] transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
