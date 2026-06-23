interface StatusBadgeProps {
  label: string;
  tone: "pending" | "approved" | "rejected" | "deleted" | "active";
}

const TONE_COLORS: Record<StatusBadgeProps["tone"], string> = {
  pending:  "#D7A878",
  approved: "#90C8A0",
  active:   "#90C8A0",
  rejected: "#5d5b5b",
  deleted:  "#D78A78",
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className="inline-flex items-center text-white text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: TONE_COLORS[tone], fontFamily: "'Poppins', sans-serif" }}
    >
      {label}
    </span>
  );
}
