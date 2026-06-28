export default function StatCard({ icon: Icon, iconColor, chipBg, value, label, tokens }) {
  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4 border theme-transition"
      style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: chipBg }}
      >
        <Icon size={22} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-2xl font-bold leading-tight" style={{ color: tokens.textPrimary }}>
          {value}
        </div>
        <div className="text-sm" style={{ color: tokens.textSecondary }}>
          {label}
        </div>
      </div>
    </div>
  );
}
