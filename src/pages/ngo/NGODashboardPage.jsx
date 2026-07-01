import { Link } from 'react-router-dom';
import { Search, ClipboardList, CheckCircle2, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import { dummyUser } from '../../data/dummyData';
import StatCard from '../../components/dashboard/StatCard';

const ngoStats = {
  activeClaims: 3,
  mealsHelped: 540,
  donorsConnected: 18,
};

export default function NGODashboardPage() {
  const { tokens } = useTheme();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.textPrimary }}>
            Good day, <span style={{ color: tokens.brandPrimary }}>{dummyUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Find available food donations near you and claim them for your community.
          </p>
        </div>
        <Link
          to="/browse-food"
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
        >
          <Search size={16} />
          Browse Food
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={ClipboardList}
          iconColor={tokens.iconAmber}
          chipBg={tokens.bgChipAmber}
          value={ngoStats.activeClaims}
          label="Active Claims"
          tokens={tokens}
        />
        <StatCard
          icon={UtensilsCrossed}
          iconColor={tokens.iconGreen}
          chipBg={tokens.bgChipGreen}
          value={ngoStats.mealsHelped}
          label="Meals Helped"
          tokens={tokens}
        />
        <StatCard
          icon={CheckCircle2}
          iconColor={tokens.iconBlue}
          chipBg={tokens.bgChipBlue}
          value={ngoStats.donorsConnected}
          label="Donors Connected"
          tokens={tokens}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            to: '/ngo/browse-food',
            icon: Search,
            title: 'Browse Available Food',
            description: 'See all pending listings from donors near your location.',
          },
          {
            to: '/ngo/active-claims',
            icon: ClipboardList,
            title: 'My Active Claims',
            description: 'Track the listings you have claimed and their delivery status.',
          },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-2xl border p-5 flex items-start gap-4 hover:opacity-80 transition-opacity theme-transition"
            style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: tokens.bgChipAmber }}
            >
              <item.icon size={20} style={{ color: tokens.brandPrimary }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold" style={{ color: tokens.textPrimary }}>
                {item.title}
              </p>
              <p className="text-sm mt-0.5" style={{ color: tokens.textSecondary }}>
                {item.description}
              </p>
            </div>
            <ArrowRight size={16} style={{ color: tokens.textMuted }} className="shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}