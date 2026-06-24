export default function AhaarLogo({ size = 56, variant = 'light' }) {
  const textColor = variant === 'light' ? '#fff' : '#1a0a00';
  const accentColor = '#F59E0B';
  const bowlColor = variant === 'light' ? '#fff' : '#92400E';
  const steamColor = variant === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(245,158,11,0.6)';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow ring */}
        <circle cx="28" cy="28" r="27" fill={accentColor} fillOpacity="0.15" />

        {/* Bowl body */}
        <path
          d="M12 26C12 26 12 40 28 40C44 40 44 26 44 26H12Z"
          fill={bowlColor}
          fillOpacity="0.95"
        />

        {/* Bowl rim */}
        <rect x="10" y="23" width="36" height="4" rx="2" fill={accentColor} />

        {/* Bowl base pedestal */}
        <rect x="22" y="40" width="12" height="3" rx="1.5" fill={bowlColor} fillOpacity="0.7" />
        <rect x="19" y="43" width="18" height="2.5" rx="1.25" fill={accentColor} fillOpacity="0.6" />

        {/* Steam lines */}
        <path
          d="M22 20C22 20 21 17 22.5 15C24 13 23 11 23 11"
          stroke={steamColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M28 19C28 19 27 16 28.5 14C30 12 29 10 29 10"
          stroke={steamColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M34 20C34 20 33 17 34.5 15C36 13 35 11 35 11"
          stroke={steamColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Leaf accent on bowl */}
        <path
          d="M19 31C19 31 21 28 24 29C27 30 27 33 24 33C21 33 19 31 19 31Z"
          fill={accentColor}
          fillOpacity="0.5"
        />

        {/* Inner bowl shine */}
        <ellipse cx="28" cy="30" rx="7" ry="3" fill={accentColor} fillOpacity="0.12" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          style={{
            color: textColor,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: size * 0.57,
            letterSpacing: '0.08em',
            lineHeight: 1,
          }}
        >
          Ahaar
        </span>
        <span
          style={{
            color: accentColor,
            fontFamily: "'Georgia', serif",
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: size * 0.22,
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}
        >
          Where leftover food finds a purpose
        </span>
      </div>
    </div>
  );
}
