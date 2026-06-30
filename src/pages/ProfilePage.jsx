import { useState } from 'react';
import { MapPin, Calendar, Loader2, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { dummyUser, dummyStats } from '../data/dummyData';
import Toast from '../components/Toast';

export default function ProfilePage() {
  const { tokens } = useTheme();

  const [name, setName] = useState(dummyUser.name);
  const [location, setLocation] = useState(dummyUser.location);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const fieldStyle = {
    backgroundColor: tokens.bgCard,
    borderColor: tokens.borderColor,
    color: tokens.textPrimary,
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = { name, location };
    // TODO: wire this up to your profile-update endpoint, e.g.
    // await fetch('<YOUR_API_BASE_URL>/api/users/me', {
    //   method: 'PUT',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    console.log(payload);

    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate network delay

    setSaving(false);
    setToast({ message: 'Profile updated successfully.', variant: 'success' });
    setTimeout(() => setToast(null), 2000);
  }

  function handleDeleteAccount() {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    // TODO: wire this up to your account-deletion endpoint once it exists.
    // Deliberately not calling anything destructive yet — this is dummy data.
    setToast({ message: 'Account deletion is not yet connected to a backend.', variant: 'warning' });
    setConfirmingDelete(false);
    setTimeout(() => setToast(null), 2500);
  }

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
            {dummyUser.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold truncate" style={{ color: tokens.textPrimary }}>
              {dummyUser.name}
            </p>
            <span
              className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: tokens.bgChipAmber, color: tokens.brandPrimary }}
            >
              {dummyUser.role}
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: tokens.textMuted }}>
              <Calendar size={12} />
              Joined {dummyUser.joinedDate}
            </div>
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Meals Rescued', value: dummyStats.mealsRescued },
            { label: 'Donations', value: dummyStats.totalDonations },
            { label: 'NGOs Reached', value: dummyStats.ngosReached },
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
              Full Name
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
              value={dummyUser.email}
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
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                style={fieldStyle}
              />
            </div>
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