import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl border border-emerald-400/20 bg-emerald-950/90 backdrop-blur-md shadow-2xl shadow-black/40 animate-toastIn max-w-[90vw]">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      <span className="text-sm font-medium text-emerald-50">{message}</span>
    </div>
  );
}