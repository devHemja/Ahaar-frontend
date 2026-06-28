import { ChefHat, Package, Carrot, Box } from 'lucide-react';

const FOOD_TYPE_META = {
  cooked: { icon: ChefHat, from: '#F59E0B', to: '#EA580C' },
  packaged: { icon: Package, from: '#3B82F6', to: '#6366F1' },
  raw: { icon: Carrot, from: '#10B981', to: '#059669' },
  other: { icon: Box, from: '#6B7280', to: '#4B5563' },
};

export default function FoodThumbnail({ foodType = 'other', className = '' }) {
  const meta = FOOD_TYPE_META[foodType] || FOOD_TYPE_META.other;
  const Icon = meta.icon;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}
    >
      <Icon size={32} color="#fff" strokeWidth={1.6} />
    </div>
  );
}
