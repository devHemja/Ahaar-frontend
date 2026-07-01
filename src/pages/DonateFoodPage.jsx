import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Carrot, Package, Box, Camera, X, Loader2 } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import Toast from '../components/Toast';
import { apiFetch } from '../lib/api';

const FOOD_TYPES = [
  { value: 'cooked', label: 'Cooked', icon: ChefHat },
  { value: 'raw', label: 'Raw', icon: Carrot },
  { value: 'packaged', label: 'Packaged', icon: Package },
  { value: 'other', label: 'Other', icon: Box },
];

export default function DonateFoodPage() {
  const { tokens } = useTheme();
  const navigate = useNavigate();

  const [foodType, setFoodType] = useState('cooked');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const formData = new FormData();
      formData.append('foodType', foodType);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('expiresAt', new Date(expiresAt).toISOString());
      if (photoFile) formData.append('photo', photoFile);

      await apiFetch('/api/food', { method: 'POST', body: formData });

      setToast({ message: 'Listing posted! Nearby NGOs have been notified.', variant: 'success' });
      setTimeout(() => navigate('/dashboard'), 1400);
    } catch (err) {
      setToast({ message: err.message || 'Failed to post listing.', variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldStyle = {
    backgroundColor: tokens.bgCard,
    borderColor: tokens.borderColor,
    color: tokens.textPrimary,
  };

  return (
    <div>
      {toast && <Toast message={toast.message} variant={toast.variant} />}

      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Donate Food
      </h1>
      <p className="text-sm mb-8" style={{ color: tokens.textSecondary }}>
        Tell us what you have — we'll alert every verified NGO nearby.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Food type */}
        <div>
          <label className="block text-sm font-semibold mb-2.5" style={{ color: tokens.textPrimary }}>
            Food Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {FOOD_TYPES.map((type) => {
              const isActive = foodType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFoodType(type.value)}
                  className="flex flex-col items-center gap-2 rounded-xl border py-4 px-2 cursor-pointer transition-all"
                  style={{
                    backgroundColor: isActive ? tokens.bgChipAmber : tokens.bgCard,
                    borderColor: isActive ? tokens.brandPrimary : tokens.borderColor,
                  }}
                >
                  <type.icon size={20} style={{ color: isActive ? tokens.brandPrimary : tokens.textMuted }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: isActive ? tokens.brandPrimary : tokens.textSecondary }}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Quantity
          </label>
          <input
            type="text"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 25 plates, 5 kg, 40 packets"
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            style={fieldStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Description{' '}
            <span className="font-normal" style={{ color: tokens.textMuted }}>
              (optional)
            </span>
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's included, how it was prepared or stored, anything pickup volunteers should know..."
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none"
            style={fieldStyle}
          />
        </div>

        {/* Expiry */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Best Before
          </label>
          <input
            type="datetime-local"
            required
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            style={fieldStyle}
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Photo{' '}
            <span className="font-normal" style={{ color: tokens.textMuted }}>
              (optional)
            </span>
          </label>

          {photoPreview ? (
            <div
              className="relative w-40 h-40 rounded-xl overflow-hidden border"
              style={{ borderColor: tokens.borderColor }}
            >
              <img src={photoPreview} alt="Food preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removePhoto}
                aria-label="Remove photo"
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <label
              className="w-40 h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{ borderColor: tokens.borderColor, color: tokens.textMuted }}
            >
              <Camera size={22} />
              <span className="text-xs font-medium">Add photo</span>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Posting...' : 'Post Listing'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-xl px-6 py-3 text-sm font-semibold border cursor-pointer transition-colors"
            style={{ borderColor: tokens.borderColor, color: tokens.textSecondary }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}