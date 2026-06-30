import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, UtensilsCrossed, Building2, Truck, Bell, UserCircle, ChevronRight, LogOut, Info, Mail } from 'lucide-react';
import AhaarLogo from '../AhaarLogo';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/useTheme';
import { dummyUser, dummyNotifications } from '../../data/dummyData';

export default function Sidebar() {
  const { tokens, mode } = useTheme();
  const navigate = useNavigate();
  const unreadCount = dummyNotifications.filter((n) => !n.isRead).length;

  const NAV_ITEMS = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/donate-food', label: 'Donate Food', icon: UtensilsCrossed },
    { to: '/nearby-ngos', label: 'Nearby NGOs', icon: Building2 },
    { to: '/track-delivery', label: 'Track Delivery', icon: Truck },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ];

  // Informational pages, kept visually separate from the core workflow
  // items above since they're not part of the donation flow itself.
  const SECONDARY_NAV_ITEMS = [
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact Us', icon: Mail },
  ];

  function handleSignOut() {
    // TODO: call POST /api/auth/logout once the API layer is wired up here.
    // For now this just drops the user back to the login screen.
    navigate('/login');
  }

  function renderNavItem(item) {
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors"
        style={({ isActive }) => ({
          backgroundColor: isActive ? tokens.bgActiveNav : 'transparent',
          color: isActive ? tokens.textPrimary : tokens.textSecondary,
        })}
      >
        {({ isActive }) => (
          <>
            <item.icon
              size={18}
              style={{ color: isActive ? tokens.brandPrimary : tokens.textMuted }}
              className="shrink-0"
            />
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0"
                style={{ backgroundColor: tokens.brandPrimary }}
              >
                {item.badge}
              </span>
            ) : null}
            {isActive && (
              <ChevronRight size={16} style={{ color: tokens.brandPrimary }} className="shrink-0" />
            )}
          </>
        )}
      </NavLink>
    );
  }

  return (
    <aside
      className="flex flex-col w-72 shrink-0 h-screen sticky top-0 border-r theme-transition"
      style={{ backgroundColor: tokens.bgSidebar, borderColor: tokens.borderColor }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <AhaarLogo size={40} variant={mode === 'dark' ? 'light' : 'dark'} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map(renderNavItem)}
        </div>

        <div
          className="mt-4 pt-4 border-t space-y-1"
          style={{ borderColor: tokens.borderSubtle }}
        >
          {SECONDARY_NAV_ITEMS.map(renderNavItem)}
        </div>
      </nav>

      {/* Footer: profile + theme toggle + sign out */}
      <div className="px-4 pb-5 pt-3 border-t" style={{ borderColor: tokens.borderColor }}>
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shrink-0"
              style={{ backgroundColor: tokens.brandPrimary }}
            >
              {dummyUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: tokens.textPrimary }}>
                {dummyUser.name}
              </p>
              <p className="text-xs" style={{ color: tokens.textMuted }}>
                {dummyUser.role}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-medium px-1 cursor-pointer transition-colors hover:opacity-75"
          style={{ color: tokens.textSecondary }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}