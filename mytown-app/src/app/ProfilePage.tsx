import { useState } from "react";
import imgLogo from "../imports/MainProfile/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import LogoutModal from "./LogoutModal";
import svgPaths from "../imports/MainProfile/svg-q7dv6j57oj";
import type { Account } from "./App";

type View = "main" | "history" | "profile" | "login";

interface Props {
  onNavigate: (v: View) => void;
  account: Account | null;
  onUpdateAccount: (updated: Account) => void;
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 47 46" className="shrink-0">
      <path d={svgPaths.p21f2b00} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function HistoryIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 51 48" className="shrink-0">
      <path d={svgPaths.p6ba800} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 47 45" className="shrink-0">
      <path d={svgPaths.p3f0f8680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 47 46" className="shrink-0">
      <path d={svgPaths.p26592080} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 50 50" className="shrink-0">
      <path d={svgPaths.p3f0b7f80} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 50 50" className="shrink-0">
      <path d={svgPaths.p146a9380} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 50 50" className="shrink-0">
      <path d={svgPaths.p19b1eb80} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 36 36" className="shrink-0">
      <path d={svgPaths.peb59600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function ProfilePage({ onNavigate, account, onUpdateAccount }: Props) {
  const [editing, setEditing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [form, setForm] = useState({
    firstName: account?.firstName ?? "",
    lastName: account?.lastName ?? "",
    email: account?.email ?? "",
    phone: account?.phone ?? "",
  });
  const [formError, setFormError] = useState("");

  // Keep form in sync if account prop changes
  const firstName = account?.firstName ?? "";
  const lastName = account?.lastName ?? "";
  const email = account?.email ?? "—";
  const phone = account?.phone ?? "—";

  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Guest";

  const now = new Date();
  const memberSince = now.toLocaleString("default", { month: "long", year: "numeric" });

  function startEdit() {
    setForm({
      firstName: account?.firstName ?? "",
      lastName: account?.lastName ?? "",
      email: account?.email ?? "",
      phone: account?.phone ?? "",
    });
    setFormError("");
    setEditing(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim()) { setFormError("First name is required."); return; }
    if (!form.email.trim()) { setFormError("Email is required."); return; }
    onUpdateAccount({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: account?.password ?? "",
    });
    setEditing(false);
    setFormError("");
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-[#e0eaf3] px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 overflow-hidden">
          <img src={imgLogo} alt="MyTown" className="w-full h-full object-contain" />
        </div>
        <nav className="hidden sm:flex items-center gap-2 ml-2">
          <button onClick={() => onNavigate("main")}
            className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors">
            <CalendarIcon /> Events
          </button>
          <button onClick={() => onNavigate("history")}
            className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors">
            <HistoryIcon /> History
          </button>
          <button className="flex items-center gap-2 bg-[#78AAD7] text-white px-4 py-2 rounded-[10px] text-sm font-medium">
            <ProfileIcon /> Profile
          </button>
        </nav>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-1">
          <button onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 text-[#5d5b5b] px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors">
            <LogoutIcon /> Logout
          </button>
        </div>
      </header>

      <div className="border-b border-[#5d5b5b]" />

      {/* Content */}
      <main className="px-4 sm:px-6 lg:px-10 py-6 max-w-[900px] mx-auto">
        <h1 className="text-[#78AAD7] font-extrabold text-4xl mb-0.5">Profile</h1>
        <p className="text-[#5d5b5b] text-sm mb-6">Account Information</p>

        {/* Profile card */}
        <div className="border border-[#5d5b5b] rounded-[20px]">

          {/* Gray banner */}
          <div className="bg-[#d9d9d9] rounded-t-[20px] h-36 relative">
            {!editing && (
              <button
                onClick={startEdit}
                className="absolute top-3 right-3 flex items-center gap-2 bg-[#78AAD7] text-white text-sm font-medium px-4 py-2 rounded-[10px] hover:bg-[#6299c6] transition-colors"
              >
                <PencilIcon /> Edit Profile
              </button>
            )}
            {/* Avatar */}
            <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full bg-[#78AAD7] flex items-center justify-center border-4 border-white shadow">
              <span className="text-white font-bold text-2xl select-none">{initials || "?"}</span>
            </div>
          </div>

          {/* Body */}
          <div className="pt-14 px-6 pb-6">
            {editing ? (
              /* ── Edit Form ── */
              <form onSubmit={handleSave}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#78AAD7] font-semibold text-xl">Edit Profile</h2>
                  <p className="text-[#5d5b5b] text-sm">Member since {memberSince}</p>
                </div>
                <hr className="border-black mb-5" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-5">
                  {[
                    { label: "First Name", field: "firstName" as const, type: "text" },
                    { label: "Last Name",  field: "lastName"  as const, type: "text" },
                    { label: "Email",      field: "email"     as const, type: "email" },
                    { label: "Phone Number", field: "phone"   as const, type: "tel" },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block text-[#5d5b5b] font-medium text-sm mb-1">{label}</label>
                      <input
                        type={type}
                        value={form[field]}
                        onChange={(e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setFormError(""); }}
                        className="w-full border border-black rounded-[10px] px-3 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
                        style={{ fontFamily: "'Poppins', sans-serif", color: "#5d5b5b" }}
                      />
                    </div>
                  ))}
                </div>

                {formError && <p className="text-red-500 text-xs mb-3 text-center">{formError}</p>}

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 rounded-[10px] border border-[#5d5b5b] text-[#5d5b5b] text-sm hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[10px] bg-[#78AAD7] text-white text-sm font-medium hover:bg-[#6299c6] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* ── View Mode ── */
              <>
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-[#78AAD7] font-semibold text-2xl">{fullName}</h2>
                  <p className="text-[#5d5b5b] text-sm mt-1">Member since {memberSince}</p>
                </div>
                <hr className="border-black mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  <div>
                    <p className="text-[#5d5b5b] font-medium text-sm mb-1">First Name</p>
                    <div className="flex items-center gap-2 text-black text-base"><UserIcon /><span>{firstName || "—"}</span></div>
                  </div>
                  <div>
                    <p className="text-[#5d5b5b] font-medium text-sm mb-1">Last Name</p>
                    <div className="flex items-center gap-2 text-black text-base"><UserIcon /><span>{lastName || "—"}</span></div>
                  </div>
                  <div>
                    <p className="text-[#5d5b5b] font-medium text-sm mb-1">Email</p>
                    <div className="flex items-center gap-2 text-black text-base"><MailIcon /><span>{email}</span></div>
                  </div>
                  <div>
                    <p className="text-[#5d5b5b] font-medium text-sm mb-1">Phone Number</p>
                    <div className="flex items-center gap-2 text-black text-base"><PhoneIcon /><span>{phone}</span></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {showLogout && (
        <LogoutModal
          onConfirm={() => { setShowLogout(false); onNavigate("login"); }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
