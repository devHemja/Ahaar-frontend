import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Toast from '../components/Toast';

const API = import.meta.env.VITE_API_URL || 'https://ahaarbackendv0.internal.delightfulrock-7a533812.southeastasia.azurecontainerapps.io';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [regNumber, setRegNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, variant }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, ...(role === 'ngo' ? { regNumber } : {}) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.message || 'Registration failed.', variant: 'error' });
        return;
      }

      setToast({
        message:
          role === 'ngo'
            ? 'Account created! Verify your email first, then complete NGO verification.'
            : 'Account created! Verify your email to continue.',
        variant: 'success',
      });
      setTimeout(() => navigate('/verify-otp', { state: { email, role } }), 1500);
    } catch {
      setToast({ message: 'Network error. Please try again.', variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} variant={toast.variant} />}
      <AuthLayout title="Create account" subtitle="Join the Ahaar community today">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50 text-sm font-medium select-none">
              A
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
            />
          </div>
        </div>

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

        {/* Role */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'donor', label: 'Donor' },
              { value: 'ngo', label: 'NGO' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  role === opt.value
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg shadow-amber-900/30'
                    : 'text-amber-100/60 border-white/10 bg-white/5 hover:bg-white/8'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* NGO Registration Number — only required for NGO accounts */}
        {role === 'ngo' && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
              NGO Registration Number
            </label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
              placeholder="e.g. NGO-IND-2026-991"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-amber-400/50 bg-white/5 focus:bg-white/8"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide mt-1
            bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
            text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Creating Account...' : 'Create Account'}
          <ArrowRight size={15} />
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/25">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <p className="text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link to="/login" className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
          Sign in
        </Link>
      </p>
      </AuthLayout>
    </>
  );
}