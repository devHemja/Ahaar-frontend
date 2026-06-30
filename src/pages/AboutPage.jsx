import { Heart, MapPin, Users, Clock, ShieldCheck, Bell } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import AhaarLogo from '../components/AhaarLogo';

const STEPS = [
  {
    title: 'Post your surplus',
    description: 'Tell us what food you have — cooked, raw, or packaged — along with quantity and expiry.',
  },
  {
    title: 'We alert nearby NGOs',
    description: 'Every verified NGO within 10 km is notified the moment your listing goes live.',
  },
  {
    title: 'First response wins',
    description: 'The fastest NGO to respond claims the pickup — no waiting, no back-and-forth.',
  },
  {
    title: 'Track until delivered',
    description: 'Follow your donation from pickup to drop-off, right from your dashboard.',
  },
];

const FEATURES = [
  { icon: MapPin, title: 'Location-aware matching', description: 'Donations are matched with NGOs by real distance, not guesswork.' },
  { icon: Clock, title: 'Built for speed', description: 'Surplus food has a short window — Ahaar is designed to close that gap fast.' },
  { icon: ShieldCheck, title: 'Verified NGOs only', description: 'Every organisation on Ahaar is manually verified before it can claim a listing.' },
  { icon: Bell, title: 'Live status tracking', description: 'Know exactly where your donation is — pending, matched, in transit, or delivered.' },
];

export default function AboutPage() {
  const { tokens, mode } = useTheme();

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <AhaarLogo size={44} variant={mode === 'dark' ? 'light' : 'dark'} />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.textPrimary }}>
            About Ahaar
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Where leftover food finds a purpose
          </p>
        </div>
      </div>

      {/* Mission */}
      <div
        className="rounded-2xl border p-6 mt-6 theme-transition"
        style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart size={18} style={{ color: tokens.brandPrimary }} />
          <h2 className="font-bold" style={{ color: tokens.textPrimary }}>
            Our Mission
          </h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: tokens.textSecondary }}>
          Every year, millions of tonnes of edible food are discarded while people go hungry.
          Ahaar — meaning "food" in Hindi — exists to close that gap. We connect anyone with
          surplus food, from a home kitchen to a wedding caterer, with verified NGOs nearby who
          can put it to use immediately. The goal is simple: make donating food as fast and
          frictionless as throwing it away.
        </p>
      </div>

      {/* How it works */}
      <div className="mt-8">
        <h2 className="font-bold mb-4" style={{ color: tokens.textPrimary }}>
          How It Works
        </h2>
        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border p-5 flex items-start gap-4 theme-transition"
              style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ backgroundColor: tokens.bgChipAmber, color: tokens.brandPrimary }}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-semibold" style={{ color: tokens.textPrimary }}>
                  {step.title}
                </p>
                <p className="text-sm mt-0.5" style={{ color: tokens.textSecondary }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8">
        <h2 className="font-bold mb-4" style={{ color: tokens.textPrimary }}>
          What Makes Ahaar Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border p-5 theme-transition"
              style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: tokens.bgChipAmber }}
              >
                <feature.icon size={18} style={{ color: tokens.brandPrimary }} />
              </div>
              <p className="font-semibold" style={{ color: tokens.textPrimary }}>
                {feature.title}
              </p>
              <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community note */}
      <div
        className="rounded-2xl border p-6 mt-8 flex items-start gap-4 theme-transition"
        style={{ backgroundColor: tokens.bgChipAmber, borderColor: tokens.brandPrimary }}
      >
        <Users size={20} style={{ color: tokens.brandPrimary }} className="shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed" style={{ color: tokens.textPrimary }}>
          Ahaar is built on the belief that reducing food waste shouldn't depend on luck or
          timing — it should be a system anyone can rely on. Thank you for being part of it.
        </p>
      </div>
    </div>
  );
}