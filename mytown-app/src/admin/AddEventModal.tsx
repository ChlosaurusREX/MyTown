import { useState } from "react";
import { proposeEvent, type AdminAccount } from "./adminApi";

const CATEGORIES = ["Community", "Educational", "Entertainment", "Sports", "Government"];

interface AddEventModalProps {
  admin: AdminAccount;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEventModal({ admin, onClose, onSuccess }: AddEventModalProps) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    event_date: "",
    location: "",
    price: "",
    tickets_total: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isSuperAdmin = admin.role === "super_admin";

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    if (!form.name.trim() || !form.category || !form.event_date || !form.location.trim() || !form.tickets_total) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await proposeEvent(admin.id, {
        name: form.name.trim(),
        category: form.category,
        event_date: form.event_date,
        location: form.location.trim(),
        price: parseFloat(form.price) || 0,
        tickets_total: parseInt(form.tickets_total) || 0,
        notes: form.notes.trim(),
      });
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(res.message || "Failed to submit.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-[500px] rounded-[20px] bg-white border border-[#e0eaf3] p-6 overflow-y-auto max-h-[90vh]">
        <h3 className="font-semibold mb-1 text-center" style={{ color: "#78AAD7", fontSize: 18 }}>
          {isSuperAdmin ? "Add New Event" : "Propose New Event"}
        </h3>
        <p className="text-center text-[#5d5b5b] text-xs mb-5">
          {isSuperAdmin
            ? "As a Super Admin, the event will be published immediately."
            : "Your proposal will be reviewed by a Super Admin before publishing."}
        </p>

        {error && (
          <div className="mb-4 rounded-[10px] bg-[#fdf0ee] border border-[#D78A78] px-3 py-2 text-sm text-[#D78A78]">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-[10px] bg-[#edf7f2] border border-[#78D7A8] px-3 py-2 text-sm text-[#2a8c5c]">
            {successMsg}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {/* Event Name */}
          <div>
            <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Event Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Summer Festival"
              className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
              style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors bg-white"
              style={{ color: form.category ? "#5d5b5b" : "#9ca3af", fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Event Date *</label>
            <input
              type="text"
              value={form.event_date}
              onChange={(e) => set("event_date", e.target.value)}
              placeholder="e.g. July 20, 2026"
              className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
              style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. Municipal Plaza"
              className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
              style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Price + Tickets */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Price (₱)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0.00"
                className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
                style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Total Tickets *</label>
              <input
                type="number"
                min="1"
                value={form.tickets_total}
                onChange={(e) => set("tickets_total", e.target.value)}
                placeholder="e.g. 500"
                className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
                style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
          </div>

          {/* Notes (only for regular admin) */}
          {!isSuperAdmin && (
            <div>
              <label className="text-xs font-medium text-[#5d5b5b] block mb-1">Notes for reviewer (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Any additional context for the Super Admin…"
                rows={3}
                className="w-full rounded-[10px] border border-[#e0eaf3] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors resize-none"
                style={{ color: "#5d5b5b", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 rounded-[12px] border border-[#5d5b5b] py-2.5 text-sm font-medium text-[#5d5b5b] hover:bg-[#f0f0f0] transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !!successMsg}
            className="flex-1 rounded-[12px] py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60"
            style={{ background: "#78AAD7" }}
          >
            {submitting ? "Submitting…" : isSuperAdmin ? "Publish Event" : "Submit Proposal"}
          </button>
        </div>
      </div>
    </div>
  );
}
