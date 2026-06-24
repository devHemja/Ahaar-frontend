import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCw } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Toast from '../components/Toast';

const RESEND_COOLDOWN = 30; // seconds

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'testuser@gmail.com';

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // No email means someone landed here directly — send them back to register
  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // Resend cooldown ticker
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleGenerateOtp() {
    setSending(true);
    const payload = { email };
    // TODO: wire this up to your generate-otp endpoint, e.g.
    // await fetch('<YOUR_API_BASE_URL>/api/auth/generate-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    console.log(payload);

    setSending(false);
    setOtpSent(true);
    setCooldown(RESEND_COOLDOWN);
  }

  async function handleVerify(e) {
    e.preventDefault();
    setVerifying(true);

    const payload = { email, otp };
    // TODO: wire this up to your verify-otp endpoint, e.g.
    // await fetch('<YOUR_API_BASE_URL>/api/auth/verify-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    console.log(payload);

    setVerifying(false);
    setToastMessage("You're verified! Redirecting you to your dashboard...");
    setShowToast(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  }

  if (!email) return null;

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
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

            {/* OTP */}
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

            {/* Verify */}
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

            {/* Resend */}
            <button
              type="button"
              onClick={handleGenerateOtp}
              disabled={cooldown > 0 || sending}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-amber-300/70 hover:text-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-amber-300/70 cursor-pointer"
            >
              <RotateCw size={12} className={sending ? 'animate-spin' : ''} />
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
          </form>
        )}

        {/* Route back to login */}
        <p className="text-center text-sm text-white/40 mt-6">
          Wrong email?{' '}
          <Link
            to="/register"
            className="text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            Go back
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}