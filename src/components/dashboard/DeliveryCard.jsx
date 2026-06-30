import { Check, Clock, MapPin } from 'lucide-react';
import FoodThumbnail from './FoodThumbnail';

const STEPS = [
  { key: 'pending', label: 'Pending' },
  { key: 'matched', label: 'Matched' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'delivered', label: 'Delivered' },
];

const FOOD_TYPE_LABEL = {
  cooked: 'Cooked',
  packaged: 'Packaged',
  raw: 'Raw',
  other: 'Other',
};

function Stepper({ status, tokens }) {
  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-start">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isDone = index <= currentIndex;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 w-16">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: isDone ? tokens.brandPrimary : tokens.bgChipAmber,
                  color: isDone ? '#fff' : tokens.textMuted,
                }}
              >
                {isCompleted ? <Check size={14} /> : index + 1}
              </div>
              <span
                className="text-[11px] font-medium text-center leading-tight"
                style={{ color: isCurrent ? tokens.brandPrimary : isDone ? tokens.textPrimary : tokens.textMuted }}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className="flex-1 h-0.5 mb-5"
                style={{ backgroundColor: index < currentIndex ? tokens.brandPrimary : tokens.borderColor }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DeliveryCard({ delivery, tokens }) {
  return (
    <div
      className="rounded-2xl border p-5 theme-transition"
      style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
    >
      {/* Food summary */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
          <FoodThumbnail foodType={delivery.foodType} className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.brandPrimary }}>
            {FOOD_TYPE_LABEL[delivery.foodType] || 'Other'}
          </p>
          <p className="font-bold" style={{ color: tokens.textPrimary }}>
            {delivery.quantity}
          </p>
          <p className="text-sm mt-0.5" style={{ color: tokens.textSecondary }}>
            {delivery.description}
          </p>
        </div>
      </div>

      <Stepper status={delivery.status} tokens={tokens} />

      {/* Details */}
      <div className="mt-5 pt-4 border-t space-y-2" style={{ borderColor: tokens.borderSubtle }}>
        {delivery.claimedBy && (
          <div className="flex items-center gap-2 text-sm" style={{ color: tokens.textPrimary }}>
            <Check size={14} style={{ color: tokens.brandPrimary }} />
            Claimed by <span className="font-semibold">{delivery.claimedBy}</span>
          </div>
        )}
        {delivery.pickupAddress && (
          <div className="flex items-start gap-2 text-sm" style={{ color: tokens.textSecondary }}>
            <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: tokens.textMuted }} />
            <span>Pickup: {delivery.pickupAddress}</span>
          </div>
        )}
        {delivery.dropAddress && (
          <div className="flex items-start gap-2 text-sm" style={{ color: tokens.textSecondary }}>
            <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: tokens.textMuted }} />
            <span>Drop-off: {delivery.dropAddress}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs pt-1" style={{ color: tokens.textMuted }}>
          <Clock size={12} />
          {delivery.status === 'delivered'
            ? `Delivered ${delivery.deliveredAgo}`
            : `Posted ${delivery.postedAgo} · ${delivery.timeLeft}`}
        </div>
      </div>
    </div>
  );
}