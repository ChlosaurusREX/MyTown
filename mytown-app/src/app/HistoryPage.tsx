import { useState } from "react";
import imgLogo from "../imports/MainHistory/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import LogoutModal from "./LogoutModal";
import TicketViewModal from "./TicketViewModal";
import { isUpcoming } from "./utils";
import svgPaths from "../imports/MainHistory/svg-t7uw9naiol";
import type { PurchasedTicket } from "./App";

type View = "main" | "history" | "profile" | "login";

interface HistoryPageProps {
  onNavigate: (v: View) => void;
  tickets: PurchasedTicket[];
  holderName: string;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 47 46" className="shrink-0">
      <path d={svgPaths.p21f2b00} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function HistoryNavIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 51 48" className="shrink-0">
      <path d={svgPaths.p6ba800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function HistoryIconGray() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 51 48" className="shrink-0">
      <path d={svgPaths.p6ba800} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 47 45" className="shrink-0">
      <path d={svgPaths.p3f0f8680} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
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
function MapPinIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 40 40" className="shrink-0">
      <path d={svgPaths.p3cbd2300} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.pdd0b300} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 35 35" className="shrink-0">
      <path d={svgPaths.p3af21080} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

// ── Ticket Card ───────────────────────────────────────────────────────────────

function TicketCard({ ticket }: { ticket: PurchasedTicket }) {
  const [viewing, setViewing] = useState(false);

  return (
    <>
      <div className="border border-[#5d5b5b] rounded-[16px] bg-white px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[#78AAD7] font-semibold text-base leading-tight">{ticket.eventName}</h3>
          <button
            onClick={() => setViewing(true)}
            className="shrink-0 bg-[#78AAD7] text-white text-xs font-semibold px-4 py-1.5 rounded-[8px] hover:bg-[#6299c6] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            View Ticket
          </button>
        </div>

        <div className="flex flex-col gap-1 text-[#5d5b5b] text-xs mb-2">
          <div className="flex items-center gap-1.5"><CalendarIcon /><span>{ticket.date}</span></div>
          <div className="flex items-center gap-1.5"><MapPinIcon /><span>{ticket.location}</span></div>
          <div className="flex items-center gap-1.5"><TicketIcon /><span>{ticket.quantity} ticket{ticket.quantity > 1 ? "s" : ""} · {ticket.totalPrice} in total</span></div>
        </div>

        <p className="text-[#5d5b5b] text-[11px]">{ticket.purchasedOn}</p>
      </div>

      {viewing && <TicketViewModal ticket={ticket} onClose={() => setViewing(false)} />}
    </>
  );
}

// ── History Page ──────────────────────────────────────────────────────────────

export default function HistoryPage({ onNavigate, tickets, holderName }: HistoryPageProps) {
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const q = search.toLowerCase();
  // Recalculate dynamically so tickets auto-move to Previous once event date passes
  const current  = tickets.filter((t) =>  isUpcoming(t.date) && (t.eventName.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)));
  const realPrev = tickets.filter((t) => !isUpcoming(t.date) && (t.eventName.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)));
  // Always show at least a demo previous ticket so the section is visible
  const demoPrevious: PurchasedTicket = {
    eventName:   "Araw ng Bayan Festival",
    category:    "Community",
    date:        "May 20, 2026",
    location:    "Municipal Plaza",
    price:       "$ 0",
    totalPrice:  "$ 0",
    quantity:    2,
    purchasedOn: "Purchased in May 15, 2026",
    isUpcoming:  false,
    ticketCode:  "TKT-ARAWB-DEMO00-001",
    holderName,
  };
  const previous = realPrev.length > 0 ? realPrev
    : (!q || demoPrevious.eventName.toLowerCase().includes(q) || demoPrevious.location.toLowerCase().includes(q))
      ? [demoPrevious]
      : [];
  const noResults = search && current.length === 0 && previous.length === 0;

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
          <button className="flex items-center gap-2 bg-[#78AAD7] text-white px-4 py-2 rounded-[10px] text-sm font-medium">
            <HistoryNavIcon /> History
          </button>
        </nav>

        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 border border-[#5d5b5b] rounded-[10px] px-4 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#5d5b5b" }}
        />

        <div className="hidden sm:flex items-center gap-1">
          <button onClick={() => onNavigate("profile")}
            className="flex items-center gap-2 text-[#5d5b5b] px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors">
            <ProfileIcon /> Profile
          </button>
          <button onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 text-[#5d5b5b] px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors">
            <LogoutIcon /> Logout
          </button>
        </div>
      </header>

      <div className="border-b border-[#5d5b5b]" />

      {/* Content */}
      <main className="px-4 sm:px-6 lg:px-10 py-6 max-w-[1200px] mx-auto">
        <h1 className="text-[#78AAD7] font-extrabold text-4xl mb-8">History</h1>

        {noResults ? (
          <p className="text-[#5d5b5b] text-center py-16">No tickets found.</p>
        ) : (
          <>
            {current.length > 0 && (
              <section className="mb-10">
                <h2 className="text-[#5d5b5b] font-semibold text-2xl mb-4">Current</h2>
                <div className="flex flex-col gap-4">
                  {current.map((t, i) => <TicketCard key={i} ticket={t} />)}
                </div>
              </section>
            )}
            {previous.length > 0 && (
              <section className={current.length > 0 ? "" : ""}>
                <h2 className="text-[#5d5b5b] font-semibold text-2xl mb-4">Previous</h2>
                <div className="flex flex-col gap-4">
                  {previous.map((t, i) => <TicketCard key={i} ticket={t} />)}
                </div>
              </section>
            )}
            {current.length === 0 && tickets.length === 0 && (
              <p className="text-[#5d5b5b] text-xs text-center mt-6">No current tickets. Buy a ticket from the Events page!</p>
            )}
          </>
        )}
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
