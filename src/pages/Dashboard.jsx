import { Link } from 'react-router-dom';
import { Plus, MapPin, UtensilsCrossed, CheckCircle2, Building2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { dummyUser, dummyStats, dummyListings, dummyNGOs } from '../data/dummyData';
import StatCard from '../components/dashboard/StatCard';
import ListingCard from '../components/dashboard/ListingCard';
import NGOListItem from '../components/dashboard/NGOListItem';
import FoodThumbnail from '../components/dashboard/FoodThumbnail';

export default function DashboardPage() {
  const { tokens } = useTheme();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: tokens.textPrimary }}>
            Good day, <span style={{ color: tokens.brandPrimary }}>{dummyUser.name.split(' ')[0]}</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: tokens.textSecondary }}>
            <MapPin size={15} style={{ color: tokens.brandPrimary }} />
            {dummyUser.location}
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
          value={dummyStats.mealsRescued}
          label="Meals Rescued"
          tokens={tokens}
        />
        <StatCard
          icon={CheckCircle2}
          iconColor={tokens.iconGreen}
          chipBg={tokens.bgChipGreen}
          value={dummyStats.totalDonations}
          label="Total Donations"
          tokens={tokens}
        />
        <StatCard
          icon={Building2}
          iconColor={tokens.iconBlue}
          chipBg={tokens.bgChipBlue}
          value={dummyStats.ngosReached}
          label="NGOs Reached"
          tokens={tokens}
        />
      </div>

      {/* My Listings + Nearby NGOs */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dummyListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                tokens={tokens}
                ThumbnailComponent={FoodThumbnail}
              />
            ))}
          </div>
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

          <div className="space-y-3">
            {dummyNGOs.map((ngo) => (
              <NGOListItem key={ngo.id} ngo={ngo} tokens={tokens} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
