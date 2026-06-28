import { Star, ChevronRight } from 'lucide-react';
import NGOAvatar from './NGOAvatar';

export default function NGOListItem({ ngo, tokens }) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 rounded-2xl border p-3.5 text-left cursor-pointer transition-colors theme-transition"
      style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
    >
      <NGOAvatar name={ngo.orgName} size={48} />

      <div className="flex-1 min-w-0">
        <p className="font-bold truncate" style={{ color: tokens.textPrimary }}>
          {ngo.orgName}
        </p>
        <p className="text-sm truncate" style={{ color: tokens.textSecondary }}>
          {ngo.category}
        </p>
        <div className="flex items-center gap-1.5 text-xs mt-0.5" style={{ color: tokens.textMuted }}>
          <span>{ngo.distanceKm} km</span>
          <span>·</span>
          <Star size={12} className="fill-current" style={{ color: tokens.brandPrimary }} />
          <span>{ngo.rating}</span>
        </div>
      </div>

      <ChevronRight size={18} style={{ color: tokens.textMuted }} className="shrink-0" />
    </button>
  );
}
