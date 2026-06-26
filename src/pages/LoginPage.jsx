import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Toast from '../components/Toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, variant }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    const payload = { email, password };
    // TODO: wire this up to your login endpoint, e.g.
    // const res = await fetch('<YOUR_API_BASE_URL>/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    // const data = await res.json();
    console.log(payload);

    // TEMP placeholder response — replace with the real API response above.
    // Expecting the backend to tell us whether this account's email is verified.
    const data = { verified: true };

    setSubmitting(false);

    if (!data.verified) {
      setToast({ message: 'Please verify your account first, then log in.', variant: 'warning' });
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1500);
      return;
    }

    navigate('/dashboard');
  }

  return (
    <>
      {toast && <Toast message={toast.message} variant={toast.variant} />}
      <AuthLayout title="Welcome back" subtitle="Sign in to continue your journey">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/50 hover:text-amber-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end -mt-1">
          <button
            type="button"
            className="text-xs text-amber-300/60 hover:text-amber-200 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide mt-1
            bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
            text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Signing In...' : 'Sign In'}
          <ArrowRight size={15} />
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/25">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Route to register */}
      <p className="text-center text-sm text-white/40">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-amber-300 hover:text-amber-200 font-medium transition-colors"
        >
          Sign up
        </Link>
      </p>
      </AuthLayout>
    </>
  );
}