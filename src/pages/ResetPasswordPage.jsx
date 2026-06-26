import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otpVerified = location.state?.otpVerified;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Guard: kick users who didn't come through the proper flow
  useEffect(() => {
    if (!email || !otpVerified) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, otpVerified, navigate]);

  function passwordStrength(pwd) {
    if (pwd.length === 0) return { label: '', color: '' };
    if (pwd.length < 6) return { label: 'Weak', color: 'text-red-400' };
    if (pwd.length < 8) return { label: 'Fair', color: 'text-amber-400' };
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    const score = [hasUpper, hasLower, hasNum, hasSpecial].filter(Boolean).length;
    if (score >= 3 && pwd.length >= 8) return { label: 'Strong', color: 'text-emerald-400' };
    return { label: 'Good', color: 'text-amber-300' };
  }

  const strength = passwordStrength(newPassword);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The backend only needs email + newPassword.
        // The OTP was already validated in the previous step.
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to reset password. Please start over.');
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 1800);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!email) return null;

  return (
    <AuthLayout title="Create new password" subtitle={`Resetting for ${email}`}>
      {success ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Check size={24} className="text-emerald-400" />
          </div>
          <p className="text-white font-semibold mb-1 text-base">Password updated successfully!</p>
          <p className="text-sm text-amber-200/60">Redirecting to login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl px-4 py-3 bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
              New Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/50 hover:text-amber-300 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {strength.label && (
              <p className={`text-xs font-medium ${strength.color} pt-0.5`}>
                Strength: <span className="font-bold underline">{strength.label}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/50 hover:text-amber-300 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs font-semibold text-red-400 pt-0.5">✕ Passwords do not match yet.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !newPassword || newPassword !== confirmPassword}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide mt-2
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
              text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'Updating...' : 'Reset Password'}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300/60 hover:text-amber-200 transition-colors"
            >
              <ArrowLeft size={13} />
              Return to login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
