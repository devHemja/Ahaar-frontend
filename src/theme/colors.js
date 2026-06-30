// Single source of truth for dashboard colors. The auth pages (Login,
// Register, etc.) are intentionally NOT touched by this — they stay
// dark-only as already built. This theme system only powers the
// dashboard/app shell (Sidebar + dashboard pages).

const palette = {
  amber500: '#F59E0B',
  amber600: '#D97706',
  orange500: '#F97316',
  orange600: '#EA580C',
  emerald500: '#10B981',
  emerald600: '#059669',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  red500: '#EF4444',
  red600: '#DC2626',
};

export const darkTokens = {
  mode: 'dark',

  // Surfaces
  bgBase: '#0C0A09',
  bgSidebar: '#0C0A09',
  bgCard: '#17130F',
  bgCardHover: '#1E1812',
  bgChipAmber: 'rgba(245, 158, 11, 0.15)',
  bgChipGreen: 'rgba(16, 185, 129, 0.15)',
  bgChipBlue: 'rgba(59, 130, 246, 0.15)',
  bgActiveNav: 'rgba(245, 158, 11, 0.12)',

  // Borders
  borderColor: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.55)',
  textMuted: 'rgba(255, 255, 255, 0.35)',

  // Brand
  brandPrimary: palette.amber500,
  brandSecondary: palette.orange500,

  // Status icon colors
  iconAmber: palette.amber500,
  iconGreen: palette.emerald500,
  iconBlue: palette.blue500,

  // Listing status badges
  statusPendingBg: 'rgba(245, 158, 11, 0.18)',
  statusPendingText: '#FBBF24',
  statusMatchedBg: 'rgba(59, 130, 246, 0.18)',
  statusMatchedText: '#60A5FA',

  // Danger / destructive actions
  dangerBg: 'rgba(239, 68, 68, 0.12)',
  dangerText: '#F87171',
  dangerBorder: 'rgba(239, 68, 68, 0.3)',

  shadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
};

export const lightTokens = {
  mode: 'light',

  // Surfaces — warm off-white instead of stark/cold white, to stay in
  // the same family as the amber brand rather than reading as generic.
  bgBase: '#FAF8F5',
  bgSidebar: '#FFFFFF',
  bgCard: '#FFFFFF',
  bgCardHover: '#FBF7F0',
  bgChipAmber: 'rgba(217, 119, 6, 0.10)',
  bgChipGreen: 'rgba(5, 150, 105, 0.10)',
  bgChipBlue: 'rgba(37, 99, 235, 0.10)',
  bgActiveNav: 'rgba(217, 119, 6, 0.08)',

  // Borders
  borderColor: 'rgba(28, 20, 16, 0.08)',
  borderSubtle: 'rgba(28, 20, 16, 0.06)',

  // Text
  textPrimary: '#1C1411',
  textSecondary: 'rgba(28, 20, 17, 0.6)',
  textMuted: 'rgba(28, 20, 17, 0.4)',

  // Brand — one shade darker than dark mode for AA contrast on white
  brandPrimary: palette.amber600,
  brandSecondary: palette.orange600,

  iconAmber: palette.amber600,
  iconGreen: palette.emerald600,
  iconBlue: palette.blue600,

  statusPendingBg: 'rgba(217, 119, 6, 0.12)',
  statusPendingText: '#B45309',
  statusMatchedBg: 'rgba(37, 99, 235, 0.12)',
  statusMatchedText: '#1D4ED8',

  dangerBg: 'rgba(220, 38, 38, 0.08)',
  dangerText: '#DC2626',
  dangerBorder: 'rgba(220, 38, 38, 0.25)',

  shadow: '0 4px 16px rgba(28, 20, 16, 0.07)',
};