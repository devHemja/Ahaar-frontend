import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, UtensilsCrossed, CheckCircle2, Building2, ArrowRight, Loader2 } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { apiFetch } from '../lib/api';
import { timeAgo, timeLeft } from '../lib/time';
import StatCard from '../components/dashboard/StatCard';
import ListingCard from '../components/dashboard/ListingCard';
import NGOListItem from '../components/dashboard/NGOListItem';
import FoodThumbnail from '../components/dashboard/FoodThumbnail';

export default function DashboardPage() {
  const { tokens } = useTheme();
  const { user } = useAuth();

  const [stats, setStats] = useState({ mealsRescued: 0, totalDonations: 0, ngosReached: 0 });
  const [listings, setListings] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [statsResult, listingsResult, ngosResult] = await Promise.allSettled([
        apiFetch('/api/users/me/stats'),
        apiFetch('/api/food/mine'),
        apiFetch('/api/ngos/nearby'),
      ]);

      if (cancelled) return;

      if (statsResult.status === 'fulfilled') setStats(statsResult.value.stats);
      if (listingsResult.status === 'fulfilled') setListings(listingsResult.value.data || []);
      if (ngosResult.status === 'fulfilled') setNgos(ngosResult.value.data || []);

      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const firstName = (user?.name || '').split(' ')[0];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.textPrimary }}>
            Good day, <span style={{ color: tokens.brandPrimary }}>{firstName || 'there'}</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: tokens.textSecondary }}>
            <MapPin size={15} style={{ color: tokens.brandPrimary }} />
            {user?.address || 'Location not set — add one from Profile'}
          </div>
        </div>

        <Link
          to="/donate-food"
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
        >
          <Plus size={16} />
          Donate Food
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={UtensilsCrossed}
          iconColor={tokens.iconAmber}
          chipBg={tokens.bgChipAmber}
          value={stats.mealsRescued}
          label="Meals Rescued"
          tokens={tokens}
        />
        <StatCard
          icon={CheckCircle2}
          iconColor={tokens.iconGreen}
          chipBg={tokens.bgChipGreen}
          value={stats.totalDonations}
          label="Total Donations"
          tokens={tokens}
        />
        <StatCard
          icon={Building2}
          iconColor={tokens.iconBlue}
          chipBg={tokens.bgChipBlue}
          value={stats.ngosReached}
          label="NGOs Reached"
          tokens={tokens}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16" style={{ color: tokens.textMuted }}>
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* My Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: tokens.textPrimary }}>
                My Listings
              </h2>
              <Link
                to="/track-delivery"
                className="flex items-center gap-1 text-sm font-semibold hover:opacity-75 transition-opacity"
                style={{ color: tokens.brandPrimary }}
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            {listings.length === 0 ? (
              <div
                className="rounded-2xl border flex flex-col items-center justify-center text-center py-14 px-6"
                style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
              >
                <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>
                  No listings yet
                </p>
                <p className="text-sm" style={{ color: tokens.textSecondary }}>
                  Post your first surplus food listing to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listings.slice(0, 2).map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={{
                      id: listing._id,
                      foodType: listing.foodType,
                      quantity: listing.quantity,
                      description: listing.description,
                      status: listing.status,
                      photoUrl: listing.photoUrl,
                      postedAgo: timeAgo(listing.createdAt),
                      timeLeft: listing.status === 'delivered' ? 'Completed' : timeLeft(listing.expiresAt),
                      claimedBy: listing.acceptedNgoId?.orgName || null,
                    }}
                    tokens={tokens}
                    ThumbnailComponent={FoodThumbnail}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Nearby NGOs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: tokens.textPrimary }}>
                Nearby NGOs
              </h2>
              <Link
                to="/nearby-ngos"
                className="flex items-center gap-1 text-sm font-semibold hover:opacity-75 transition-opacity"
                style={{ color: tokens.brandPrimary }}
              >
                See all
                <ArrowRight size={14} />
              </Link>
            </div>

            {ngos.length === 0 ? (
              <p className="text-sm" style={{ color: tokens.textSecondary }}>
                No verified NGOs found nearby yet.
              </p>
            ) : (
              <div className="space-y-3">
                {ngos.slice(0, 3).map((ngo) => (
                  <NGOListItem key={ngo._id} ngo={ngo} tokens={tokens} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
