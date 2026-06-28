import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const STATUS_META = {
  pending: { label: 'Pending', icon: Clock },
  matched: { label: 'Matched', icon: CheckCircle2 },
};

const FOOD_TYPE_LABEL = {
  cooked: 'Cooked',
  packaged: 'Packaged',
  raw: 'Raw',
  other: 'Other',
};

export default function ListingCard({ listing, tokens, ThumbnailComponent }) {
  const status = STATUS_META[listing.status] || STATUS_META.pending;
  const StatusIcon = status.icon;
  const isMatched = listing.status === 'matched';

  return (
    <div
      className="rounded-2xl overflow-hidden border theme-transition"
      style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
    >
      {/* Thumbnail + status badge */}
      <div className="relative h-36">
        <ThumbnailComponent foodType={listing.foodType} className="w-full h-full" />
        <span
          className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            backgroundColor: isMatched ? tokens.statusMatchedBg : tokens.statusPendingBg,
            color: isMatched ? tokens.statusMatchedText : tokens.statusPendingText,
          }}
        >
          <StatusIcon size={13} />
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: tokens.brandPrimary }}
        >
          {FOOD_TYPE_LABEL[listing.foodType] || 'Other'}
        </p>
        <p className="text-lg font-bold mb-1.5" style={{ color: tokens.textPrimary }}>
          {listing.quantity}
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: tokens.textSecondary }}>
          {listing.description}
        </p>

        <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: tokens.borderSubtle }}>
          <div className="text-xs" style={{ color: tokens.textMuted }}>
            <div>Posted {listing.postedAgo}</div>
            <div>{listing.timeLeft}</div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold cursor-pointer hover:opacity-75 transition-opacity"
            style={{ color: tokens.brandPrimary }}
          >
            Track
            <ArrowRight size={14} />
          </button>
        </div>

        {listing.claimedBy && (
          <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: tokens.statusMatchedText }}>
            <CheckCircle2 size={12} />
            Claimed by {listing.claimedBy}
          </div>
        )}
      </div>
    </div>
  );
}
