import { useMemo, useState } from 'react';
import { Search, MapPin, Clock, ArrowRight, ChefHat, Package, Carrot, Box } from 'lucide-react';
import { useTheme } from '../../context/useTheme';
import { dummyListings } from '../../data/dummyData';
import Toast from '../../components/Toast';

const FOOD_TYPE_META = {
  cooked: { label: 'Cooked', icon: ChefHat, from: '#F59E0B', to: '#EA580C' },
  packaged: { label: 'Packaged', icon: Package, from: '#3B82F6', to: '#6366F1' },
  raw: { label: 'Raw', icon: Carrot, from: '#10B981', to: '#059669' },
  other: { label: 'Other', icon: Box, from: '#6B7280', to: '#4B5563' },
};

const availableListings = dummyListings.filter((l) => l.status === 'pending');

export default function BrowseFoodPage() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [claimedId, setClaimedId] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    return availableListings.filter((l) =>
      l.quantity.toLowerCase().includes(search.toLowerCase()) ||
      (l.description || '').toLowerCase().includes(search.toLowerCase()) ||
      l.foodType.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function handleClaim(listing) {
    // TODO: POST /api/requests/:id/claim once API is wired up
    setClaimedId(listing.id);
    setToast({ message: `You claimed "${listing.quantity}"! Check Active Claims for next steps.`, variant: 'success' });
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div>
      {toast && <Toast message={toast.message} variant={toast.variant} />}

      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Browse Food
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        {filtered.length} listing{filtered.length !== 1 ? 's' : ''} available near you — first to claim wins.
      </p>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: tokens.textMuted }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by food type or quantity..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor, color: tokens.textPrimary }}
        />
      </div>

      {filtered.length === 0 ? (
        <div
          className="rounded-2xl border text-center py-20 px-6"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>No listings match your search</p>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>Try a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((listing) => {
            const meta = FOOD_TYPE_META[listing.foodType] || FOOD_TYPE_META.other;
            const Icon = meta.icon;
            const isClaimed = claimedId === listing.id;

            return (
              <div
                key={listing.id}
                className="rounded-2xl border overflow-hidden theme-transition"
                style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
              >
                <div
                  className="h-28 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}
                >
                  <Icon size={36} color="#fff" strokeWidth={1.5} />
                </div>

                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: tokens.brandPrimary }}>
                    {meta.label}
                  </p>
                  <p className="font-bold text-lg mb-1" style={{ color: tokens.textPrimary }}>
                    {listing.quantity}
                  </p>
                  <p className="text-sm mb-4" style={{ color: tokens.textSecondary }}>
                    {listing.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t" style={{ borderColor: tokens.borderSubtle }}>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: tokens.textMuted }}>
                        <Clock size={12} />
                        Posted {listing.postedAgo}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: tokens.textMuted }}>
                        <MapPin size={12} />
                        {listing.timeLeft}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isClaimed}
                      onClick={() => handleClaim(listing)}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
                    >
                      {isClaimed ? 'Claimed!' : 'Claim'}
                      {!isClaimed && <ArrowRight size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}