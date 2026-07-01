import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { apiFetch } from '../lib/api';
import { timeAgo, timeLeft } from '../lib/time';
import DeliveryCard from '../components/dashboard/DeliveryCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
];

export default function TrackDeliveryPage() {
  const { tokens } = useTheme();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/api/food/mine');
        if (!cancelled) setListings(data.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load your listings.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const deliveries = useMemo(
    () =>
      listings.map((l) => ({
        id: l._id,
        foodType: l.foodType,
        quantity: l.quantity,
        description: l.description,
        status: l.status,
        claimedBy: l.acceptedNgoId?.orgName || null,
        pickupAddress: l.status === 'pending' ? null : user?.address || null,
        dropAddress: l.acceptedNgoId?.address || null,
        postedAgo: timeAgo(l.createdAt),
        timeLeft: timeLeft(l.expiresAt),
        deliveredAgo: l.status === 'delivered' ? timeAgo(l.updatedAt) : null,
      })),
    [listings, user]
  );

  const filteredDeliveries = useMemo(() => {
    if (filter === 'delivered') return deliveries.filter((d) => d.status === 'delivered');
    if (filter === 'active') return deliveries.filter((d) => d.status !== 'delivered');
    return deliveries;
  }, [deliveries, filter]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Track Delivery
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        Live status for every listing you've posted.
      </p>

      {error && (
        <div className="mb-6 rounded-xl px-4 py-3 bg-red-500/10 border border-red-400/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className="rounded-full px-4 py-2 text-sm font-medium border cursor-pointer transition-colors"
              style={{
                backgroundColor: isActive ? tokens.brandPrimary : tokens.bgCard,
                borderColor: isActive ? tokens.brandPrimary : tokens.borderColor,
                color: isActive ? '#fff' : tokens.textSecondary,
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: tokens.textMuted }}>
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : filteredDeliveries.length === 0 ? (
        <div
          className="rounded-2xl border flex flex-col items-center justify-center text-center py-20 px-6"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>
            Nothing here yet
          </p>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Listings you post will show their delivery status here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredDeliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} tokens={tokens} />
          ))}
        </div>
      )}
    </div>
  );
}
