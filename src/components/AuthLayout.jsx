import AhaarLogo from '/src/components/AhaarLogo';
import ahaarBg from '/src/assets/AhaarBg.jpg';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <img
        src={ahaarBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-950/50 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AhaarLogo size={52} variant="light" />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl px-8 py-10 shadow-2xl border border-white/10"
          style={{
            background: 'rgba(10, 5, 0, 0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white tracking-wide">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-amber-200/60">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/25 tracking-wide">
          Nourishing communities · Reducing waste · Building bonds
        </p>
      </div>
    </div>
  );
}