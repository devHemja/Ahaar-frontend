import { CheckCircle2, AlertTriangle } from 'lucide-react';

const VARIANTS = {
  success: {
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-950/90',
    iconColor: 'text-emerald-400',
    text: 'text-emerald-50',
    Icon: CheckCircle2,
  },
  warning: {
    border: 'border-amber-400/20',
    bg: 'bg-amber-950/90',
    iconColor: 'text-amber-400',
    text: 'text-amber-50',
    Icon: AlertTriangle,
  },
};

export default function Toast({ message, variant = 'success' }) {
  const { border, bg, iconColor, text, Icon } = VARIANTS[variant] || VARIANTS.success;

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl border ${border} ${bg} backdrop-blur-md shadow-2xl shadow-black/40 animate-toastIn max-w-[90vw]`}>
      <Icon size={18} className={`${iconColor} shrink-0`} />
      <span className={`text-sm font-medium ${text}`}>{message}</span>
    </div>
  );
}