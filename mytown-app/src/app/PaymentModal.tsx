import { useState, useEffect } from "react";
import { toast } from "sonner";
import svgPaths from "../imports/EventsPayments-1/svg-r85kiof0cp";

// ── Icons ─────────────────────────────────────────────────────────────────────
function XIcon({ dark }: { dark?: boolean }) {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 39 39">
      <path d={svgPaths.p1bc47fc0} stroke={dark ? "black" : "white"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 39 41">
      <path d={svgPaths.p14da8300} stroke="#5d5b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg width="19" height="19" fill="none" viewBox="0 0 51 51">
      <path d={svgPaths.p21644500} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CreditCardIcon() {
  return (
    <svg width="19" height="19" fill="none" viewBox="0 0 51 51">
      <path d={svgPaths.p25ee7800} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 49 49">
      <path d={svgPaths.p33ecb580} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronUp() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 49 49" style={{ transform: "rotate(180deg)" }}>
      <path d={svgPaths.p33ecb580} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 34 30">
      <path d={svgPaths.p36f71c80} stroke="#5d5b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 32 29">
      <path d={svgPaths.pd86ce00} stroke="#5d5b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.pef2b900} stroke="#5d5b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 45 45">
      <path d={svgPaths.pbbe3900} stroke="#5d5b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TicketBadge() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 52 52">
      <path d={svgPaths.p10194080} stroke="#78AAD7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 45 45">
      <path d={svgPaths.p2d798700} stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PayArrowIcon() {
  return (
    <svg width="17" height="17" fill="none" viewBox="0 0 44 44">
      <path d={svgPaths.pc2a7000} stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 45 45">
      <path d={svgPaths.p2095e3e0} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 45 45">
      <path d={svgPaths.p2095e3e0} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── QR Code ───────────────────────────────────────────────────────────────────
function QRCode({ code }: { code: string }) {
  const size = 21;
  const pixels: boolean[][] = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => {
      const inTL = r < 7 && c < 7;
      const inTR = r < 7 && c >= size - 7;
      const inBL = r >= size - 7 && c < 7;
      if (inTL || inTR || inBL) {
        const lr = inTL ? r : inBL ? r - (size - 7) : r;
        const lc = inTL || inBL ? c : c - (size - 7);
        if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
        if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
        return false;
      }
      const h = code.charCodeAt((r * size + c) % code.length);
      return (h + r * 5 + c * 3) % 2 === 0;
    })
  );
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-2.5 bg-white border border-[#c8d8e8] rounded-lg">
        <svg width="150" height="150" viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
          {pixels.map((row, r) =>
            row.map((on, c) =>
              on ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="black" /> : null
            )
          )}
        </svg>
      </div>
      <p className="text-[10px] text-[#5d5b5b] font-mono tracking-wider text-center px-2">{code}</p>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PaymentEvent {
  name: string;
  category: string;
  date: string;
  location: string;
  price: string;
  image?: string;
}

interface Props {
  event: PaymentEvent;
  holderName: string;
  onClose: () => void;
  onConfirm: (qty: number, totalPrice: string) => void;
}

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

function formatTotal(unitPrice: number, qty: number): string {
  const total = unitPrice * qty;
  return total === 0 ? "$ 0" : `$ ${total.toFixed(2)}`;
}

type Step = "card" | "payment" | "ticket";

const EWALLET = ["GCash", "Maya", "ShopeePay", "GrabPay", "PayMongo"];
const CARDS   = ["Mastercard Virtual", "Visa Virtual", "UnionPay Virtual"];

const EVENT_DESCRIPTIONS: Record<string, string> = {
  "Shanghai Festival":      "Join us at the Shanghai Festival for an unforgettable day featuring vibrant costumes, energetic dances, and spectacular parades.",
  "Career Seminar":         "Learn about career paths that fit your skills and talents. Well known professionals like Henry Sy, Micheal Jackson, Pope Francis, and Albert Einstein will visit and give their insights about the industry! Dont miss this once-in-a-lifetime opportunity!",
  "Mozart Concert":         "Come and watch an spectacular performance of Balyena Orchestra and the one and only Nighting Gale of the Philippines, Shintunado Ramirez!",
  "Basketball Tournament":  "Watch our municipal team, The Cobras, defend their titles as basketball champions at the Nawindang Court!",
  "Town Hall Meeting":      "This meeting will discuss the new laws regarding curfew hours of children due to the kidnapping incidents happening in our town. We hope to see every parent so we can discuss the best options for our children's safety.",
  "Founding Anniversary":   "Feast, watch performances, and party at the founding anniversary of our beloved municipality.",
  "Arts & Craft Workshop":  "Enjoy fun activities like sculpting, painting, and drawing at our Arts and Craft workshop. Enjoy, make friends, and even have free meals while learning art!",
  "Talent Show":            "Watch kids, teens, and adults showcase their talent at Tanghalan ng Tanghalian! But that's not all, food booths are stationed right outside for easy access. Dont miss it!",
  "Fun Run Marathon":       "Stay Fit, Stay Healthy! Join our Fun Run for healthy yet enjoying moment. There will be free breakfast, free water every stop point, and a medal at the very end.",
  "Tree Planting":          "Help save our local mountain! Plant tress, have free meals, hike, make friends, and save our biodiversity.",
  "Kulturang Maganda":      "Come and watch cultural performances from all over the Philippines! Cultural dances, Folk songs, and a peek of Philippine History made into a Musical!",
  "Pambatang Panglaro":     "Come and have a family day with your kids! Fun activities like racing, tug of war, arts and crafts, and many more experiences for you and your kids.",
  "Free Checkups":          "Get a free checkup at Sumalangit Hospital! Dental, Optometry, Physical Examination and Laboratory included. Note: First come, First Serve.",
  "Green City":             "Come and join us in cleaning up and painting murals in our beloved city! With free breakfast, lunch, snacks, and drinks, all while helping mother earth.",
};

function isFree(price: string) {
  return price === "$ 0" || price === "$0" || price === "Free" || price === "$ 0.00";
}

// ── Black modal header ────────────────────────────────────────────────────────
function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between bg-black rounded-t-2xl px-5 py-4">
      <div className="flex items-center gap-3">
        <TicketBadge />
        <span className="text-[#78AAD7] font-semibold text-base">{title}</span>
      </div>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity">
        <XIcon />
      </button>
    </div>
  );
}

// ── Step 1: Event Card ────────────────────────────────────────────────────────
function EventCardStep({ event, qty, setQty, onClose, onNext }: {
  event: PaymentEvent; qty: number; setQty: (q: number) => void; onClose: () => void; onNext: () => void;
}) {
  const free = isFree(event.price);
  const unitPrice = parsePrice(event.price);
  const total = formatTotal(unitPrice, qty);

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-[#5d5b5b] bg-white">
      {/* Image header */}
      <div className="relative h-56 bg-[#d9d9d9]">
        {event.image && (
          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg">
          {event.category}
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#d9d9d9] hover:bg-gray-300 transition-colors p-2 rounded-xl"
        >
          <XIcon dark />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[#78AAD7] font-bold text-2xl leading-snug">{event.name}</p>

        <div className="mt-3 flex flex-col gap-2 text-sm text-[#5d5b5b]">
          <div className="flex items-center gap-2"><CalendarIcon />{event.date}</div>
          <div className="flex items-center gap-2"><ClockIcon />08:00 AM – 06:00 PM</div>
          <div className="flex items-center gap-2"><MapPinIcon />{event.location}</div>
        </div>
      </div>

      {/* About */}
      <div className="mx-5 my-3 border-t border-black pt-3 pb-3 border-b border-b-black">
        <p className="text-[#78AAD7] font-medium text-base mb-1.5">About this event</p>
        <p className="text-black text-sm leading-relaxed">
          {EVENT_DESCRIPTIONS[event.name] ?? `Join us for ${event.name}! An exciting ${event.category.toLowerCase()} event in our city. Open to all residents. Come and be part of our community!`}
        </p>
      </div>

      {/* Price + Qty + Buy */}
      <div className="px-5 pt-3 pb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[#7391ac] text-xs font-medium">Price per Ticket</p>
          <p className="text-black font-semibold text-base">{free ? "Free" : event.price}</p>
          {!free && qty > 1 && (
            <p className="text-[#78AAD7] text-xs font-medium mt-0.5">Total: {total}</p>
          )}
        </div>
        {/* Quantity */}
        <div className="flex items-center gap-3 bg-[#d9d9d9] rounded-xl px-4 py-2">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-black font-bold text-lg w-6 text-center">−</button>
          <span className="text-black font-medium text-base w-6 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="text-black font-bold text-lg w-6 text-center">+</button>
        </div>
        <button
          onClick={onNext}
          className="bg-[#78AAD7] text-white text-base font-semibold px-6 py-3 rounded-xl hover:bg-[#6299c6] transition-colors"
        >
          {free ? "Get Ticket" : "Buy"}
        </button>
      </div>
    </div>
  );
}

// ── Input helpers ─────────────────────────────────────────────────────────────
function formatCardNo(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}
function isValidExpiry(val: string) {
  const m = val.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = parseInt(m[1]);
  return month >= 1 && month <= 12;
}

// ── Step 2: Payment (paid only) ───────────────────────────────────────────────
function PaymentStep({ event, qty, holderName, onClose, onPay }: {
  event: PaymentEvent; qty: number; holderName: string; onClose: () => void; onPay: () => void;
}) {
  const [tab, setTab]             = useState<"ewallet" | "card">("ewallet");
  const [eProvider, setEProvider] = useState(EWALLET[0]);
  const [cardOpt, setCardOpt]     = useState(CARDS[0]);
  const [eOpen, setEOpen]         = useState(false);
  const [cardOpen, setCardOpen]   = useState(false);
  const holder = holderName; // always use the logged-in user's name
  const [cardNo, setCardNo]       = useState("");
  const [expiry, setExpiry]       = useState("");
  const [cvv, setCvv]             = useState("");
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const provider = tab === "ewallet" ? eProvider : cardOpt;
  const total = formatTotal(parsePrice(event.price), qty);
  const payLabel = `Pay ${total} via ${provider}`;

  // Per-field validation
  const holderOk  = holder.trim().length >= 1; // always valid — comes from account
  const cardNoOk  = cardNo.replace(/\s/g, "").length === 16;
  const expiryOk  = isValidExpiry(expiry);
  const cvvOk     = /^\d{3,4}$/.test(cvv);
  const cardReady = tab === "card" ? holderOk && cardNoOk && expiryOk && cvvOk : true;


  function handleCardNo(val: string) {
    setCardNo(formatCardNo(val));
    setErrors((e) => ({ ...e, cardNo: "" }));
  }
  function handleExpiry(val: string) {
    const formatted = formatExpiry(val);
    setExpiry(formatted);
    setErrors((e) => ({ ...e, expiry: "" }));
  }
  function handleCvv(val: string) {
    if (/^\d{0,4}$/.test(val)) {
      setCvv(val);
      setErrors((e) => ({ ...e, cvv: "" }));
    }
  }

  function validate() {
    const e: Record<string, string> = {};
    if (tab === "card") {
      if (!cardNoOk) e.cardNo = "Enter a valid 16-digit card number.";
      if (!expiryOk) e.expiry = expiry.length < 5 ? "Enter expiry (MM/YY)." : "Month must be 01–12.";
      if (!cvvOk)    e.cvv    = "CVV must be 3 or 4 digits.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const inp = (hasErr: boolean) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${
      hasErr
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-[#d9d9d9] bg-[#d9d9d9] focus:border-[#78AAD7] focus:bg-white"
    }`;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-[#5d5b5b]">
      <ModalHeader title="Secure Payment" onClose={onClose} />

      <div className="px-5 py-4 bg-white flex flex-col gap-4">
        {/* Event summary */}
        <div>
          <p className="font-bold text-black text-base leading-snug">{event.name}</p>
          <p className="text-[#5d5b5b] text-sm">{event.category}</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-[#5d5b5b]">
            <div className="flex items-center gap-2"><CalendarIcon />{event.date}</div>
            <div className="flex items-center gap-2"><MapPinIcon />{event.location}</div>
          </div>
        </div>

        <hr className="border-[#e0eaf3]" />

        {/* Lock notice */}
        <div className="flex items-center gap-2 text-sm text-[#5d5b5b]">
          <LockIcon />
          <span>Secured and Encrypted Payment</span>
        </div>

        {/* Tabs */}
        <div className="bg-[#d9d9d9] rounded-xl flex p-1.5">
          {(["ewallet", "card"] as const).map((key) => (
            <button
              key={key}
              onClick={() => { setTab(key); setEOpen(false); setCardOpen(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === key ? "bg-white shadow text-black" : "text-[#5d5b5b]"
              }`}
            >
              {key === "ewallet" ? <WalletIcon /> : <CreditCardIcon />}
              {key === "ewallet" ? "eWallet" : "Virtual Card"}
            </button>
          ))}
        </div>

        {/* eWallet — inline dropdown (no clipping) */}
        {tab === "ewallet" && (
          <div>
            <p className="text-sm font-medium text-black mb-2">eWallet Provider</p>
            <button
              onClick={() => setEOpen((v) => !v)}
              className="w-full flex items-center justify-between border border-black rounded-xl px-4 py-3 bg-white text-sm hover:border-[#78AAD7] transition-colors"
            >
              <span>{eProvider}</span>
              {eOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {eOpen && (
              <div className="mt-1 border border-[#c8d8e8] rounded-xl overflow-hidden bg-white">
                {EWALLET.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setEProvider(opt); setEOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f0f6fb] transition-colors border-b border-[#f0f0f0] last:border-0 ${
                      opt === eProvider ? "text-[#78AAD7] font-medium bg-[#f7fafd]" : "text-black"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Virtual Card — inline dropdown */}
        {tab === "card" && (
          <div className="flex flex-col gap-3">
            {/* Card option dropdown */}
            <div>
              <p className="text-sm font-medium text-black mb-2">Card Option</p>
              <button
                onClick={() => setCardOpen((v) => !v)}
                className="w-full flex items-center justify-between border border-black rounded-xl px-4 py-3 bg-white text-sm hover:border-[#78AAD7] transition-colors"
              >
                <span>{cardOpt}</span>
                {cardOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {cardOpen && (
                <div className="mt-1 border border-[#c8d8e8] rounded-xl overflow-hidden bg-white">
                  {CARDS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setCardOpt(opt); setCardOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f0f6fb] transition-colors border-b border-[#f0f0f0] last:border-0 ${
                        opt === cardOpt ? "text-[#78AAD7] font-medium bg-[#f7fafd]" : "text-black"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Card Holder Name — locked to account name */}
            <div>
              <p className="text-sm font-medium text-black mb-1">Card Holder Name</p>
              <input
                value={holder}
                readOnly
                className="w-full border border-[#d9d9d9] bg-[#f0f0f0] rounded-xl px-3 py-2.5 text-sm text-[#5d5b5b] cursor-not-allowed"
                autoComplete="cc-name"
              />
            </div>

            {/* Card Number — digits only, auto-spaces */}
            <div>
              <p className="text-sm font-medium text-black mb-1">Virtual Card Number</p>
              <input
                value={cardNo}
                onChange={(e) => handleCardNo(e.target.value)}
                onBlur={() => !cardNoOk && cardNo && setErrors((e) => ({ ...e, cardNo: "Enter a valid 16-digit card number." }))}
                className={inp(!!errors.cardNo) + " font-mono tracking-wider"}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={19}
              />
              {errors.cardNo && <p className="text-red-500 text-xs mt-1">{errors.cardNo}</p>}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-black mb-1">Expiry</p>
                <input
                  value={expiry}
                  onChange={(e) => handleExpiry(e.target.value)}
                  onBlur={() => !expiryOk && expiry && setErrors((e) => ({ ...e, expiry: expiry.length < 5 ? "Enter MM/YY." : "Month must be 01–12." }))}
                  className={inp(!!errors.expiry)}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  maxLength={5}
                />
                {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <p className="text-sm font-medium text-black mb-1">CVV</p>
                <input
                  value={cvv}
                  onChange={(e) => handleCvv(e.target.value)}
                  onBlur={() => !cvvOk && cvv && setErrors((e) => ({ ...e, cvv: "CVV must be 3 or 4 digits." }))}
                  className={inp(!!errors.cvv)}
                  placeholder="•••"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  type="password"
                />
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={() => { if (validate()) onPay(); }}
          disabled={tab === "card" && !cardReady}
          className={`w-full font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm ${
            tab === "card" && !cardReady
              ? "bg-[#b0cfe8] text-white cursor-not-allowed"
              : "bg-[#78AAD7] text-white hover:bg-[#6299c6]"
          }`}
        >
          <PayArrowIcon />{payLabel}
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Ticket ────────────────────────────────────────────────────────────
function TicketStep({ event, qty, holderName, onClose }: {
  event: PaymentEvent; qty: number; holderName: string; onClose: () => void;
}) {
  const slug = event.name.replace(/\s+/g, "").substring(0, 6).toUpperCase();
  const [code] = useState(`TKT-${slug}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-[#5d5b5b]">
      <ModalHeader title="Virtual Ticket" onClose={onClose} />

      <div className="bg-white">
        <div className="px-5 pt-4 pb-3">
          <p className="text-[#5d5b5b] text-sm">{event.category}</p>
          <p className="font-bold text-black text-xl leading-snug mt-1">{event.name}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#5d5b5b]">
            <div className="flex items-center gap-2"><CalendarIcon />{event.date}</div>
            <div className="flex items-center gap-2"><ClockIcon />08:00 AM – 06:00 PM</div>
            <div className="flex items-center gap-2"><MapPinIcon />{event.location}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 py-3 border-t border-[#5d5b5b]">
          <div>
            <p className="text-[#5d5b5b] text-xs">Ticket Holder</p>
            <p className="font-medium text-black text-sm mt-0.5">{holderName || "Guest"}</p>
          </div>
          <div>
            <p className="text-[#5d5b5b] text-xs">Quantity</p>
            <p className="font-medium text-black text-sm mt-0.5">{qty}</p>
          </div>
        </div>

        {/* Tear line */}
        <div className="relative flex items-center">
          <div className="absolute -left-3 w-6 h-6 rounded-full bg-gray-200 border border-[#5d5b5b]" />
          <div className="flex-1 mx-4 border-t-2 border-dashed border-[#5d5b5b]" />
          <div className="absolute -right-3 w-6 h-6 rounded-full bg-gray-200 border border-[#5d5b5b]" />
        </div>

        <div className="flex justify-center py-6 border-t border-[#5d5b5b]">
          <QRCode code={code} />
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={() => {
              toast.success("Ticket downloaded!", {
                description: `Your ticket for ${event.name} has been saved.`,
                duration: 4000,
              });
              onClose();
            }}
            className="w-full bg-[#78AAD7] text-white font-semibold py-3.5 rounded-xl hover:bg-[#6299c6] transition-colors flex items-center justify-center gap-2 text-base"
          >
            <DownloadIcon /> Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function PaymentModal({ event, holderName, onClose, onConfirm }: Props) {
  const free = isFree(event.price);
  const [step, setStep] = useState<Step>("card");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (step === "ticket") {
      const total = formatTotal(parsePrice(event.price), qty);
      onConfirm(qty, total);
      toast.success("Payment successful!", {
        description: `Your ticket for ${event.name} has been confirmed.`,
        duration: 4000,
      });
    }
  }, [step]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg shadow-2xl overflow-y-auto rounded-2xl"
        style={{ maxHeight: "calc(100vh - 48px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {step === "card" && (
          <EventCardStep
            event={event}
            qty={qty}
            setQty={setQty}
            onClose={onClose}
            onNext={() => setStep(free ? "ticket" : "payment")}
          />
        )}
        {step === "payment" && (
          <PaymentStep
            event={event}
            qty={qty}
            holderName={holderName}
            onClose={onClose}
            onPay={() => setStep("ticket")}
          />
        )}
        {step === "ticket" && (
          <TicketStep event={event} qty={qty} holderName={holderName} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
