import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  
  // App Workflow States: 1 = Email Input, 2 = OTP Verification
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1: Request OTP from backend
  async function handleSendOtp(e) {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const payload = { email };
    console.log("Requesting OTP for password reset:", payload);

    // TODO: Wire to your backend endpoint
    // const res = await fetch('<YOUR_API_BASE_URL>/api/auth/forgot-password-send-otp', { ... });
    
    // Simulate successful backend response check
    const data = { success: true }; 

    setSubmitting(false);

    if (data.success) {
      setStep(2); // Progress cleanly to the OTP entry block
    } else {
      setErrorMsg('No account found with this email or server error.');
    }
  }

  // Step 2: Submit OTP for validation
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const payload = { email, otp };
    console.log("Verifying OTP for reset:", payload);

    // TODO: Wire to your backend validation endpoint
    // const res = await fetch('<YOUR_API_BASE_URL>/api/auth/forgot-password-verify-otp', { ... });
    
    // Simulate validation pass
    const data = { verified: true }; 

    setSubmitting(false);

    if (data.verified) {
      // ✅ SUCCESSFUL: Transition directly to the reset password page with email context state
      navigate('/reset-password', { state: { email, otpVerified: true } });
    } else {
      setErrorMsg('Invalid or expired verification code. Please try again.');
    }
  }

  return (
    <AuthLayout 
      title={step === 1 ? "Reset password" : "Verify your email"} 
      subtitle={step === 1 ? "Enter your email and we'll send you a verification code" : `Enter the 6-digit code sent to ${email}`}
    >
      {/* Global Error Banner */}
      {errorMsg && (
        <div className="mb-4 rounded-lg px-4 py-3 bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center">
          {errorMsg}
        </div>
      )}

      {step === 1 ? (
        /* ── STEP 1: EMAIL INPUT FORM ── */
        <form onSubmit={handleSendOtp} className="space-y-5">
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide mt-1
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
              text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'Sending...' : 'Send OTP'}
            <Send size={15} />
          </button>
        </form>
      ) : (
        /* ── STEP 2: OTP INPUT FORM (Replaces email layout fluidly) ── */
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-amber-100/70 uppercase tracking-wider">
              Verification Code
            </label>
            <div className="relative">
              <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/50" />
              <input
                type="text"
                inputMode="numeric"
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
            disabled={submitting || otp.length !== 6}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
              text-white shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'Verifying...' : 'Verify & Continue'}
            <ArrowRight size={15} />
          </button>

          {/* Back button to go back to email input if typed wrong */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-amber-300/60 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} /> Use a different email
          </button>
        </form>
      )}

      {/* Footer link back to standard login screen */}
      <p className="text-center text-sm text-white/40 mt-6">
        Remembered your password?{' '}
        <Link to="/login" className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}