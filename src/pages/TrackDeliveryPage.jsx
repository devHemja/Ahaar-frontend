import { useMemo, useState } from 'react';
import { useTheme } from '../context/useTheme';
import { dummyListings } from '../data/dummyData';
import DeliveryCard from '../components/dashboard/DeliveryCard';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
];

export default function TrackDeliveryPage() {
  const { tokens } = useTheme();
  const [filter, setFilter] = useState('all');

  const filteredDeliveries = useMemo(() => {
    if (filter === 'delivered') return dummyListings.filter((d) => d.status === 'delivered');
    if (filter === 'active') return dummyListings.filter((d) => d.status !== 'delivered');
    return dummyListings;
  }, [filter]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Track Delivery
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        Live status for every listing you've posted.
      </p>

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

      {filteredDeliveries.length === 0 ? (
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