import { useState } from 'react';
import { Mail, Phone, Send, Loader2, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { dummyUser } from '../data/dummyData';
import Toast from '../components/Toast';

const SUBJECTS = ['General Question', 'Report a Problem', 'NGO Verification', 'Feedback / Suggestion', 'Other'];

export default function ContactPage() {
  const { tokens } = useTheme();

  const [name, setName] = useState(dummyUser.name);
  const [email, setEmail] = useState(dummyUser.email);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const fieldStyle = {
    backgroundColor: tokens.bgCard,
    borderColor: tokens.borderColor,
    color: tokens.textPrimary,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const payload = { name, email, subject, message };
    // TODO: wire this up to your contact/support endpoint, e.g.
    // await fetch('<YOUR_API_BASE_URL>/api/support/contact', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    console.log(payload);

    await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network delay

    setSubmitting(false);
    setMessage('');
    setToast({ message: "Message sent! We'll get back to you soon.", variant: 'success' });
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="max-w-3xl">
      {toast && <Toast message={toast.message} variant={toast.variant} />}

      <h1 className="text-3xl font-bold mb-1" style={{ color: tokens.textPrimary }}>
        Contact Us
      </h1>
      <p className="text-sm mb-8" style={{ color: tokens.textSecondary }}>
        Have a question, an issue, or feedback? Send it straight to the Ahaar team.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div
          className="rounded-2xl border p-5 flex items-center gap-3.5 theme-transition"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: tokens.bgChipAmber }}
          >
            <Mail size={18} style={{ color: tokens.brandPrimary }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs" style={{ color: tokens.textMuted }}>
              Email us
            </p>
            <p className="text-sm font-semibold truncate" style={{ color: tokens.textPrimary }}>
              support@ahaar.app
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl border p-5 flex items-center gap-3.5 theme-transition"
          style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: tokens.bgChipBlue }}
          >
            <Phone size={18} style={{ color: tokens.iconBlue }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs" style={{ color: tokens.textMuted }}>
              Call us
            </p>
            <p className="text-sm font-semibold truncate" style={{ color: tokens.textPrimary }}>
              +91 98765 43210
            </p>
          </div>
        </div>
      </div>

      {/* Message form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border p-6 space-y-5 theme-transition"
        style={{ backgroundColor: tokens.bgCard, borderColor: tokens.borderColor }}
      >
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare size={17} style={{ color: tokens.brandPrimary }} />
          <h2 className="font-bold" style={{ color: tokens.textPrimary }}>
            Send a Message
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
              Your Name
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
              Your Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none cursor-pointer"
            style={fieldStyle}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: tokens.textPrimary }}>
            Message
          </label>
          <textarea
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's on your mind..."
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none"
            style={fieldStyle}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${tokens.brandPrimary}, ${tokens.brandSecondary})` }}
        >
          {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}