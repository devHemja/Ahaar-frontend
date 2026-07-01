import { useTheme } from '../../context/useTheme';
import { dummyListings } from '../../data/dummyData';
import DeliveryCard from '../../components/dashboard/DeliveryCard';

const activeClaims = dummyListings.filter((l) =>
  l.status === 'matched' || l.status === 'in_transit'
);

export default function ActiveClaimsPage() {
  const { tokens } = useTheme();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Active Claims
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        {activeClaims.length} active claim{activeClaims.length !== 1 ? 's' : ''} — listings you've claimed and are managing.
      </p>

      {activeClaims.length === 0 ? (
        <div
          className="rounded-2xl border text-center py-20 px-6"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>
            No active claims yet
          </p>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Go to Browse Food and claim a listing to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeClaims.map((claim) => (
            <DeliveryCard key={claim.id} delivery={claim} tokens={tokens} />
          ))}
        </div>
      )}
    </div>
  );
}