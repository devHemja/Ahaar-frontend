import { useEffect, useState } from 'react';
import { MapPin, Calendar, Loader2, AlertTriangle, LocateFixed } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { useAuth } from '../context/useAuth';
import { apiFetch } from '../lib/api';
import Toast from '../components/Toast';

export default function ProfilePage() {
  const { tokens } = useTheme();
  const { user, refetch, logout } = useAuth();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [stats, setStats] = useState(null);
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAddress(user.address || '');
    }
  }, [user]);

  useEffect(() => {
    if (user?.role !== 'donor') return;
    apiFetch('/api/users/me/stats')
      .then((data) => setStats(data.stats))
      .catch(() => setStats(null));
  }, [user]);

  const fieldStyle = {
    backgroundColor: tokens.bgCard,
    borderColor: tokens.borderColor,
    color: tokens.textPrimary,
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await apiFetch('/api/users/me', { method: 'PUT', body: { name, address } });
      await refetch();
      setToast({ message: 'Profile updated successfully.', variant: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Failed to update profile.', variant: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  function handleDetectLocation() {
    if (!navigator.geolocation) {
      setToast({ message: 'Geolocation is not supported by this browser.', variant: 'error' });
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await apiFetch('/api/auth/location', {
            method: 'PUT',
            body: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          await refetch();
          setToast({ message: 'Location updated! You\'ll now see nearby matches.', variant: 'success' });
        } catch (err) {
          setToast({ message: err.message || 'Failed to save location.', variant: 'error' });
        } finally {
          setLocating(false);
          setTimeout(() => setToast(null), 2500);
        }
      },
      () => {
        setLocating(false);
        setToast({ message: 'Location permission denied.', variant: 'error' });
        setTimeout(() => setToast(null), 2500);
      }
    );
  }

  function handleDeleteAccount() {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    setToast({ message: 'Account deletion is not yet available. Contact support to close your account.', variant: 'warning' });
    setConfirmingDelete(false);
    setTimeout(() => setToast(null), 2500);
  }

  if (!user) return null;

  const hasCoordinates = user.location?.coordinates?.length === 2;

  return (
    <div>
      {toast && <Toast message={toast.message} variant={toast.variant} />}

      <h1 className="text-3xl font-bold mb-8" style={{ color: tokens.textPrimary }}>
        Profile
      </h1>

      <div className="max-w-2xl space-y-6">
        {/* Header card */}
        <div
          className="rounded-2xl border p-6 flex items-center gap-5 theme-transition"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
          >
            {(user.name || '?').charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold truncate" style={{ color: tokens.textPrimary }}>
              {user.name}
            </p>
            <span
              className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
              style={{ backgroundColor: tokens.bgChipAmber, color: tokens.brandPrimary }}
            >
              {user.role}
            </span>
            {user.createdAt && (
              <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: tokens.textMuted }}>
                <Calendar size={12} />
                Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>

        {/* Stats summary (donors only) */}
        {stats && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Meals Rescued', value: stats.mealsRescued },
              { label: 'Donations', value: stats.totalDonations },
              { label: 'NGOs Reached', value: stats.ngosReached },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border p-4 text-center theme-transition"
                style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
              >
                <p className="text-xl font-bold" style={{ color: tokens.textPrimary }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Account details form */}
        <form
          onSubmit={handleSave}
          className="rounded-2xl border p-6 space-y-5 theme-transition"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <h2 className="font-bold" style={{ color: tokens.textPrimary }}>
            Account Details
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
              {user.role === 'ngo' ? 'Organization Name' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none opacity-60 cursor-not-allowed"
              style={fieldStyle}
            />
            <p className="text-xs mt-1.5" style={{ color: tokens.textMuted }}>
              Email can't be changed here yet.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
              Location
            </label>
            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: tokens.textMuted }}
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Connaught Place, New Delhi"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                style={fieldStyle}
              />
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={locating}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:opacity-75 transition-opacity disabled:opacity-50"
              style={{ color: tokens.brandPrimary }}
            >
              {locating ? <Loader2 size={13} className="animate-spin" /> : <LocateFixed size={13} />}
              {hasCoordinates ? 'Update precise location' : 'Detect my precise location'}
            </button>
            <p className="text-xs mt-1.5" style={{ color: tokens.textMuted }}>
              {hasCoordinates
                ? 'Precise coordinates are set — this powers nearby matching.'
                : 'Set your precise coordinates so NGOs and listings near you can match correctly.'}
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {/* Sign out */}
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-xl px-6 py-3 text-sm font-semibold border cursor-pointer transition-colors"
          style={{ borderColor: tokens.borderColor, color: tokens.textSecondary }}
        >
          Sign Out
        </button>

        {/* Danger zone */}
        <div
          className="rounded-2xl border p-6"
          style={{ backgroundColor: tokens.dangerBg, borderColor: tokens.dangerBorder }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <AlertTriangle size={16} style={{ color: tokens.dangerText }} />
            <h2 className="font-bold" style={{ color: tokens.dangerText }}>
              Danger Zone
            </h2>
          </div>
          <p className="text-sm mb-4" style={{ color: tokens.textSecondary }}>
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold border cursor-pointer transition-colors"
            style={{ borderColor: tokens.dangerBorder, color: tokens.dangerText }}
          >
            {confirmingDelete ? 'Click again to confirm deletion' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
