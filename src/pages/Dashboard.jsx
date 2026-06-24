import AhaarLogo from '../components/AhaarLogo';

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a0a00]">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <AhaarLogo size={56} variant="dark" />
        </div>
        <h1 className="text-xl font-semibold text-white/90 mb-2">
          Your dashboard is on its way
        </h1>
        <p className="text-sm text-white/40 max-w-sm mx-auto">
          You're verified and signed in. This page is just a placeholder —
          swap it out once the real dashboard is built.
        </p>
      </div>
    </div>
  );
}