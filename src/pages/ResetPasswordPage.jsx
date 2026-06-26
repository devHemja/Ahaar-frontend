import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Grab safe context route variables from your state machine flow ──
  // Dev mode notice: Fallback variables remain enabled so you can manually preview this page via route paths
  const email = location.state?.email || 'devmode-test@gmail.com';
  const otpVerified = location.state?.otpVerified || true;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Security Guard: Kick unverified navigation back to start the flow over
  useEffect(() => {
    if (!location.state?.email && !window.location.hostname.includes('localhost')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [location.state, navigate]);

  // Comprehensive password safety strength calculator engine
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

    // Field Rule Guard Checks
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    const payload = { email, newPassword };
    console.log("Transmitting password transformation payload:", payload);

    // TODO: Wire up your actual API reset execution endpoint here
    // const res = await fetch('<YOUR_API_BASE_URL>/api/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    
    // Simulating instant database mutation acknowledgment 
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Navigate to login screen automatically after presentation delay
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    }, 1000);
  }

  if (!email) return null;

  return (
    <AuthLayout title="Create new password" subtitle={`Resetting for ${email}`}>
      {success ? (
        /* ── SUCCESS REDIRECT PRESENTATION BLOCK ── */
        <div className="text-center py-6 animate-fadeIn">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Check size={24} className="text-emerald-400" />
          </div>
          <p className="text-white font-semibold mb-1 text-base">Password updated successfully!</p>
          <p className="text-sm text-amber-200/60">Redirecting to login dashboard secure vault...</p>
        </div>
      ) : (
        /* ── PASSWORD MODIFICATION RESET ENTRY FORM ── */
        <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">

          {/* Error Message Bar Banner Row */}
          {error && (
            <div className="rounded-xl px-4 py-3 bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Field Slot 1: New Password Input Area */}
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
                Password security tracking: <span className="font-bold underline">{strength.label}</span>
              </p>
            )}
          </div>

          {/* Field Slot 2: Confirm Password Input Area */}
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

          {/* Submit Reset Button Trigger Action */}
          <button
            type="submit"
            disabled={submitting || !newPassword || newPassword !== confirmPassword}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide mt-2
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
              text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'Updating Database Records...' : 'Reset Password'}
          </button>

          {/* Explicit Back to Login Navigation link option fallback row */}
          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300/60 hover:text-amber-200 transition-colors"
            >
              <ArrowLeft size={13} />
              Return to login portal
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}