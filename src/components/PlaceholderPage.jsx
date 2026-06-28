import { useTheme } from '../context/useTheme';

export default function PlaceholderPage({ title, icon: Icon, message }) {
  const { tokens } = useTheme();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: tokens.textPrimary }}>
        {title}
      </h1>

      <div
        className="rounded-2xl border flex flex-col items-center justify-center text-center py-24 px-6 theme-transition"
        style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
      >
        {Icon && (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: tokens.bgChipAmber }}
          >
            <Icon size={28} style={{ color: tokens.brandPrimary }} />
          </div>
        )}
        <p className="text-lg font-semibold mb-1.5" style={{ color: tokens.textPrimary }}>
          {title} is coming soon
        </p>
        <p className="text-sm max-w-sm leading-relaxed" style={{ color: tokens.textSecondary }}>
          {message}
        </p>
      </div>
    </div>
  );
}
