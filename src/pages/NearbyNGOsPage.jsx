import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { dummyNGOs, dummyUser } from '../data/dummyData';
import NGOListItem from '../components/dashboard/NGOListItem';

export default function NearbyNGOsPage() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Built from whatever categories actually exist in the data, not a fixed
  // guess at what they might be — a new NGO registering with any category
  // (Old Age Home, Disaster Relief, anything) just shows up as a new chip
  // automatically, no code change needed.
  const categories = useMemo(() => {
    const unique = [...new Set(dummyNGOs.map((ngo) => ngo.category))].sort();
    return ['All', ...unique];
  }, []);

  const filteredNGOs = useMemo(() => {
    return dummyNGOs
      .filter((ngo) => category === 'All' || ngo.category === category)
      .filter((ngo) => ngo.orgName.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [search, category]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Nearby NGOs
      </h1>
      <p className="text-sm mb-6" style={{ color: tokens.textSecondary }}>
        {filteredNGOs.length} verified organisation{filteredNGOs.length !== 1 ? 's' : ''} within 10 km of {dummyUser.location}
      </p>

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
      {filteredNGOs.length === 0 ? (
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
            <NGOListItem key={ngo.id} ngo={ngo} tokens={tokens} />
          ))}
        </div>
      )}
    </div>
  );
}