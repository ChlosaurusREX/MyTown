interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(4px)", background: "rgba(255,255,255,0.4)" }}
    >
      <div
        className="bg-white rounded-[20px] border border-[#c8d8e8] shadow-xl px-10 py-8 flex flex-col items-center gap-5 w-[320px]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <h2 className="text-[#78AAD7] font-bold text-2xl tracking-wide">LOG OUT</h2>
        <p className="text-[#5d5b5b] text-sm text-center">Are you sure you want to log out?</p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-[10px] bg-[#e0e0e0] text-[#5d5b5b] font-medium text-sm hover:bg-[#d0d0d0] transition-colors"
          >
            BACK
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-[10px] bg-[#78AAD7] text-white font-medium text-sm hover:bg-[#6299c6] transition-colors"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}
