import { useEffect, useMemo, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { apiFetch } from '../lib/api';
import NGOListItem from '../components/dashboard/NGOListItem';

export default function NearbyNGOsPage() {
  const { tokens } = useTheme();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('/api/ngos/nearby');
        if (!cancelled) setNgos(data.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load nearby NGOs.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(ngos.map((ngo) => ngo.category).filter(Boolean))].sort();
    return ['All', ...unique];
  }, [ngos]);

  const filteredNGOs = useMemo(() => {
    return ngos
      .filter((ngo) => category === 'All' || ngo.category === category)
      .filter((ngo) => ngo.orgName.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [ngos, search, category]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Nearby NGOs
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        {loading
          ? 'Finding verified organisations near you...'
          : `${filteredNGOs.length} verified organisation${filteredNGOs.length !== 1 ? 's' : ''} within 10 km${user?.address ? ` of ${user.address}` : ''}`}
      </p>

      {error && (
        <div className="mb-6 rounded-xl px-4 py-3 bg-red-500/10 border border-red-400/30 text-red-400 text-sm">
          {error}{' '}
          {error.toLowerCase().includes('location') && (
            <span>Set your location from the Profile page first.</span>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: tokens.textMuted }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search NGOs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
            style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor, color: tokens.textPrimary }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-medium border cursor-pointer transition-colors"
                style={{
                  backgroundColor: isActive ? tokens.brandPrimary : tokens.bgCard,
                  borderColor: isActive ? tokens.brandPrimary : tokens.borderColor,
                  color: isActive ? '#fff' : tokens.textSecondary,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: tokens.textMuted }}>
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : filteredNGOs.length === 0 ? (
        <div
          className="rounded-2xl border flex flex-col items-center justify-center text-center py-20 px-6"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <p className="font-semibold mb-1" style={{ color: tokens.textPrimary }}>
            No NGOs match your search
          </p>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Try a different name or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNGOs.map((ngo) => (
            <NGOListItem key={ngo._id} ngo={ngo} tokens={tokens} />
          ))}
        </div>
      )}
    </div>
  );
}
