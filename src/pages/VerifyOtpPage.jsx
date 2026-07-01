import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCw } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Toast from '../components/Toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const RESEND_COOLDOWN = 30; // seconds

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const role = location.state?.role; 

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [toast, setToast] = useState(null); // { message, variant }

  useEffect(() => {
    if (!email) navigate('/register', { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleGenerateOtp() {
    setSending(true);
    setToast(null);
    try {
      const res = await fetch(`${API}/api/auth/generate-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.message || 'Failed to send OTP.', variant: 'error' });
        return;
      }

      setOtpSent(true);
      setCooldown(RESEND_COOLDOWN);
      setToast({ message: 'OTP sent! Check your email.', variant: 'success' });
    } catch {
      setToast({ message: 'Network error. Please try again.', variant: 'error' });
    } finally {
      setSending(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setVerifying(true);
    setToast(null);
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.message || 'Verification failed.', variant: 'error' });
        return;
      }
      const destination = role === 'ngo' ? '/ngo-verify' : '/dashboard';
      const successMsg =
        role === 'ngo'
          ? "Email verified! Now let's confirm your NGO registration."
          : "You're verified! Redirecting to dashboard...";

      setToast({ message: successMsg, variant: 'success' });
      setTimeout(() => navigate(destination, { state: { email } }), 1500);
    } catch {
      setToast({ message: 'Network error. Please try again.', variant: 'error' });
    } finally {
      setVerifying(false);
    }
  }

  if (!email) return null;

  return (
    <>
      {toast && <Toast message={toast.message} variant={toast.variant} />}
      <AuthLayout
        title="Verify your email"
        subtitle={
          otpSent
            ? `Enter the code we sent to ${email}`
            : `We'll send a verification code to ${email}`
        }
      >
        {!otpSent ? (
          <button
            type="button"
            onClick={handleGenerateOtp}
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
              text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {sending ? 'Sending...' : 'Send OTP'}
            <ArrowRight size={15} />
          </button>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
                Verification Code
              </label>
              <div className="relative">
                <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/25 text-sm tracking-[0.3em] outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifying || otp.length !== 6}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide
                bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
                text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {verifying ? 'Verifying...' : 'Verify'}
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={handleGenerateOtp}
              disabled={cooldown > 0 || sending}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-amber-300/70 hover:text-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCw size={12} className={sending ? 'animate-spin' : ''} />
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-white/40 mt-6">
          Wrong email?{' '}
          <Link to="/register" className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
            Go back
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
