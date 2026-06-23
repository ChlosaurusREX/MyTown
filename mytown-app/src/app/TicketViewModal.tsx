import type { PurchasedTicket } from "./App";

interface Props {
  ticket: PurchasedTicket;
  onClose: () => void;
}

// ── QR Code (same deterministic renderer as PaymentModal) ─────────────────────
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

function CalendarIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 47 46" className="shrink-0">
      <path d="M15.6667 3.83333V11.5M31.3333 3.83333V11.5M5.875 19.1667H41.125M9.79167 7.66667H37.2083C39.3715 7.66667 41.125 9.38291 41.125 11.5V38.3333C41.125 40.4504 39.3715 42.1667 37.2083 42.1667H9.79167C7.62855 42.1667 5.875 40.4504 5.875 38.3333V11.5C5.875 9.38291 7.62855 7.66667 9.79167 7.66667Z"
        stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 32 30" className="shrink-0">
      <path d="M16.8013 26.3405C19.2813 24.3999 26.6667 18.1165 26.6667 12.0833C26.6667 9.51957 25.5429 7.06082 23.5425 5.24797C21.5421 3.43512 18.829 2.41667 16 2.41667C13.171 2.41667 10.4579 3.43512 8.45753 5.24797C6.45714 7.06082 5.33333 9.51957 5.33333 12.0833C5.33333 18.1165 12.7187 24.3999 15.1987 26.3405C15.4297 26.4979 15.7109 26.583 16 26.583C16.2891 26.583 16.5703 26.4979 16.8013 26.3405Z"
        stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16 15.7083C18.2091 15.7083 20 14.0854 20 12.0833C20 10.0813 18.2091 8.45833 16 8.45833C13.7909 8.45833 12 10.0813 12 12.0833C12 14.0854 13.7909 15.7083 16 15.7083Z"
        stroke="#5d5b5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function TicketViewModal({ ticket, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl border border-[#5d5b5b] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-black px-5 py-4">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" fill="none" viewBox="0 0 52 52">
              <path d="M18.9583 7.29167V10.2083M18.9583 24.7917V27.7083M18.9583 16.0417V18.9583M2.91667 13.125C4.07699 13.125 5.18979 13.5859 6.01026 14.4064C6.83073 15.2269 7.29167 16.3397 7.29167 17.5C7.29167 18.6603 6.83073 19.7731 6.01026 20.5936C5.18979 21.4141 4.07699 21.875 2.91667 21.875V24.7917C2.91667 25.5652 3.22396 26.3071 3.77094 26.8541C4.31792 27.401 5.05979 27.7083 5.83333 27.7083H29.1667C29.9402 27.7083 30.6821 27.401 31.2291 26.8541C31.776 26.3071 32.0833 25.5652 32.0833 24.7917V21.875C30.923 21.875 29.8102 21.4141 28.9897 20.5936C28.1693 19.7731 27.7083 18.6603 27.7083 17.5C27.7083 16.3397 28.1693 15.2269 28.9897 14.4064C29.8102 13.5859 30.923 13.125 32.0833 13.125V10.2083C32.0833 9.43479 31.776 8.69292 31.2291 8.14594C30.6821 7.59896 29.9402 7.29167 29.1667 7.29167H5.83333C5.05979 7.29167 4.31792 7.59896 3.77094 8.14594C3.22396 8.69292 2.91667 9.43479 2.91667 10.2083V13.125Z"
                stroke="#78AAD7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#78AAD7] font-semibold text-base">Virtual Ticket</span>
          </div>
          <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity text-xl leading-none">✕</button>
        </div>

        {/* Event info */}
        <div className="px-5 pt-4 pb-3">
          <p className="text-[#5d5b5b] text-xs">{ticket.category}</p>
          <p className="font-bold text-black text-lg leading-snug mt-0.5">{ticket.eventName}</p>
          <div className="mt-2 flex flex-col gap-1.5 text-sm text-[#5d5b5b]">
            <div className="flex items-center gap-2"><CalendarIcon />{ticket.date}</div>
            <div className="flex items-center gap-2"><MapPinIcon />{ticket.location}</div>
          </div>
        </div>

        {/* Details row */}
        <div className="grid grid-cols-3 gap-2 px-5 py-3 border-t border-[#5d5b5b]">
          <div>
            <p className="text-[#5d5b5b] text-xs">Holder</p>
            <p className="font-medium text-black text-xs mt-0.5 truncate">{ticket.holderName || "Guest"}</p>
          </div>
          <div>
            <p className="text-[#5d5b5b] text-xs">Qty</p>
            <p className="font-medium text-black text-xs mt-0.5">{ticket.quantity}</p>
          </div>
          <div>
            <p className="text-[#5d5b5b] text-xs">Total</p>
            <p className="font-medium text-black text-xs mt-0.5">{ticket.totalPrice}</p>
          </div>
        </div>

        {/* Tear line */}
        <div className="relative flex items-center">
          <div className="absolute -left-3 w-6 h-6 rounded-full bg-gray-200 border border-[#5d5b5b]" />
          <div className="flex-1 mx-4 border-t-2 border-dashed border-[#5d5b5b]" />
          <div className="absolute -right-3 w-6 h-6 rounded-full bg-gray-200 border border-[#5d5b5b]" />
        </div>

        {/* QR code */}
        <div className="flex justify-center py-5 border-t border-[#5d5b5b]">
          <QRCode code={ticket.ticketCode} />
        </div>

        {/* Close button */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-[#78AAD7] text-white font-semibold py-3 rounded-xl hover:bg-[#6299c6] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
