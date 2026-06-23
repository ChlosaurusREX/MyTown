import { useEffect, useState } from "react";
import imgLogo from "../imports/MainEventsAllEvents-2/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import svgPaths from "../imports/MainEventsAllEvents-2/svg-evnk7nuerj";
import LogoutModal from "./LogoutModal";
import PaymentModal from "./PaymentModal";
import { isUpcoming } from "./utils";
import { apiGet } from "./api";

// Event images (mapped by event id)
import img14 from "../imports/EventsPayments-1/6fce33ae6e80a11d69ffa0ed7f767355ed184195.png";
import img13 from "../imports/EventsPayments-1/4acc21b30754e0920a4d5409f72637233eb98b57.png";
import img12 from "../imports/EventsPayments-1/994ed0ddb9f02abdbbb9291cadfc37ed6e0cc445.png";
import img11 from "../imports/EventsPayments-1/ee608acb2718dac76c1f9cead8bd792c2d71c6d3.png";
import img10 from "../imports/EventsPayments-1/4ff19ba480c197d98c25f3200f03aadc34ee0eed.png";
import img9  from "../imports/EventsPayments-1/aa3efa72e0ac31d263104098a1a3da8e580e8240.png";
import img8  from "../imports/EventsPayments-1/ab0a13511b7feb38608643c53c3855ed25517054.png";
import img7  from "../imports/EventsPayments-1/2869880e9ec2073d38d108d5a22edcd35c4fa7fd.png";
import img6  from "../imports/EventsPayments-1/cc2ef69b28dbfff89d55783baf12efa8eb65721b.png";
import img5  from "../imports/EventsPayments-1/68015bd1f53bad1624f9eec79e26aa64948a3290.png";
import img4  from "../imports/EventsPayments-1/720a850b435ea24b2a8c953ee3f85e74a3cabe37.png";
import img3  from "../imports/EventsPayments-1/ad675e972b728150bb8540ccb47588417b601802.png";
import img2  from "../imports/EventsPayments-1/7c0bf580412372aded08158fb68c3b9f6e81a500.png";
import img1  from "../imports/EventsPayments-1/2dca76a87e9c8ee2629f5db4142027d5f404569c.png";

const EVENT_IMAGES: Record<number, string> = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7,
  8: img8, 9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14,
};

type View = "main" | "history" | "profile" | "login";

interface MainPageProps {
  onNavigate: (v: View) => void;
  onBuy: (eventId: number, holderName: string, quantity: number) => void | Promise<void>;
  holderName?: string;
}

// Event shape as returned by api/get_events.php
interface Event {
  id: number;
  name: string;
  category: "Community" | "Educational" | "Entertainment" | "Government" | "Sports";
  date: string;
  location: string;
  price: string;
  ticketsTotal: number;
  ticketsRemaining: number;
}

type Category = "All Events" | Event["category"];

// ── Icons ─────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 47 47" className="shrink-0">
      <path d={svgPaths.p21f2b00} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 28 26" className="shrink-0">
      <path d={svgPaths.p32977f00} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 32 30" className="shrink-0">
      <path d={svgPaths.pd86ce00} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.pef2b900} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 51 47" className="shrink-0">
      <path d={svgPaths.p6ba800} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 47 45" className="shrink-0">
      <path d={svgPaths.p3f0f8680} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 47 46" className="shrink-0">
      <path d={svgPaths.p26592080} stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function EventsNavIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 34 32" className="shrink-0">
      <path d={svgPaths.p36f71c80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<Event["category"], string> = {
  Community:     "#78AAD7",
  Educational:   "#90C8A0",
  Entertainment: "#A89FD7",
  Government:    "#D7A878",
  Sports:        "#D78A78",
};

// ── Event Card ────────────────────────────────────────────────────────────────

function EventCard({ event, onBuy, holderName }: { event: Event; onBuy: (eventId: number, holderName: string, quantity: number) => void | Promise<void>; holderName: string }) {
  const badgeColor = CATEGORY_COLORS[event.category];
  const [showPayment, setShowPayment] = useState(false);
  const eventActive = isUpcoming(event.date);
  const remaining = event.ticketsRemaining;
  const soldOut = remaining === 0;

  function handleConfirm(qty: number) {
    // The database generates the ticket code and writes the payment
    // record (api/purchase_ticket.php), so we just hand off event id,
    // buyer name, and quantity.
    onBuy(event.id, holderName, qty);
  }
  return (
    <div
      className="flex flex-col justify-between rounded-[16px] border border-[#c8d8e8] bg-white p-4 gap-3"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-bold text-[#78AAD7] text-base leading-tight">{event.name}</h3>
        <span
          className="shrink-0 text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: badgeColor, fontFamily: "'Poppins', sans-serif" }}
        >
          {event.category}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-[#5d5b5b] text-xs">
        <div className="flex items-center gap-1.5">
          <CalendarIcon />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPinIcon />
          <span>{event.location}</span>

        </div>
        <div className="flex items-center gap-1.5">
          <TicketIcon />
          <span>{remaining.toLocaleString()} tickets available</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#e8eef4]">
        <span className="text-[#5d5b5b] text-sm font-medium">{event.price}</span>
        <button
          onClick={() => eventActive && !soldOut && setShowPayment(true)}
          disabled={!eventActive || soldOut}
          className={`text-white text-sm font-medium px-5 py-1.5 rounded-[8px] transition-colors ${
            !eventActive || soldOut
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#78AAD7] hover:bg-[#6299c6] active:bg-[#5888b5] cursor-pointer"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          title={!eventActive ? "This event has already ended" : soldOut ? "Tickets are sold out" : undefined}
        >
          {!eventActive ? "Ended" : soldOut ? "Sold Out" : "Buy"}
        </button>

        {showPayment && (
          <PaymentModal
            event={{ name: event.name, category: event.category, date: event.date, location: event.location, price: event.price, image: EVENT_IMAGES[event.id] }}
            holderName={holderName}
            onClose={() => setShowPayment(false)}
            onConfirm={(qty) => handleConfirm(qty)}
          />
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["All Events", "Community", "Educational", "Entertainment", "Government", "Sports"];

export default function MainPage({ onNavigate, onBuy, holderName = "" }: MainPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All Events");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Load events (with live ticket availability) from the database
  // via api/get_events.php whenever this page mounts or a purchase
  // completes, so "tickets remaining" always reflects MySQL.
  async function refreshEvents() {
    try {
      const res = await apiGet<{ success: boolean; events: Event[] }>("get_events.php");
      if (res.success) setEvents(res.events);
      else setLoadError("Could not load events from the server.");
    } catch {
      setLoadError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshEvents();
  }, []);

  async function handleBuyAndRefresh(eventId: number, name: string, qty: number) {
    await onBuy(eventId, name, qty);
    refreshEvents(); // pull updated tickets_remaining after the purchase
  }

  const filtered = events.filter((e) => {
    const matchCat = activeCategory === "All Events" || e.category === activeCategory;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── Header ── */}
      <header className="border-b border-[#e0eaf3] px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 overflow-hidden">
          <img src={imgLogo} alt="MyTown" className="w-full h-full object-contain" />
        </div>

        <nav className="hidden sm:flex items-center gap-2 ml-2">
          <button
            className="flex items-center gap-2 bg-[#78AAD7] text-white px-4 py-2 rounded-[10px] text-sm font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <EventsNavIcon />
            Events
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <HistoryIcon />
            History
          </button>
        </nav>

        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 border border-[#c8d8e8] rounded-[10px] px-4 py-2 text-sm outline-none focus:border-[#78AAD7] transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#5d5b5b" }}
        />

        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-2 text-[#5d5b5b] px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ProfileIcon />
            Profile
          </button>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 text-[#5d5b5b] px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <LogoutIcon />
            Logout
          </button>
        </div>

        <button
          className="sm:hidden p-2 text-[#5d5b5b]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {menuOpen && (
        <div className="sm:hidden border-b border-[#e0eaf3] bg-white px-4 py-3 flex flex-col gap-2">
          <button className="flex items-center gap-2 bg-[#78AAD7] text-white px-4 py-2 rounded-[10px] text-sm font-medium w-full">
            <EventsNavIcon />Events
          </button>
          <button onClick={() => onNavigate("history")} className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] w-full">
            <HistoryIcon />History
          </button>
          <button onClick={() => onNavigate("profile")} className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] w-full">
            <ProfileIcon />Profile
          </button>
          <button onClick={() => setShowLogout(true)} className="flex items-center gap-2 text-[#5d5b5b] px-4 py-2 rounded-[10px] text-sm font-medium hover:bg-[#f0f6fb] w-full">
            <LogoutIcon />Logout
          </button>
        </div>
      )}

      {/* ── Content ── */}
      <main className="px-4 sm:px-6 lg:px-10 py-6 max-w-[1200px] mx-auto">
        <h1 className="text-[#78AAD7] font-extrabold text-3xl sm:text-4xl mb-1">Events</h1>
        <p className="text-[#5d5b5b] text-sm mb-6">Book tickets for upcoming municipal events and activities</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#78AAD7] text-white border-[#78AAD7]"
                  : "bg-white text-[#5d5b5b] border-[#c8d8e8] hover:border-[#78AAD7] hover:text-[#78AAD7]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-[#5d5b5b] text-center py-16">Loading events...</p>
        ) : loadError ? (
          <p className="text-red-500 text-center py-16">{loadError}</p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onBuy={handleBuyAndRefresh} holderName={holderName} />
            ))}
          </div>
        ) : (
          <p className="text-[#5d5b5b] text-center py-16">No events found.</p>
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
