import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { useTheme } from '../../context/useTheme';
import NGOSidebar from './NGOSidebar';

function NGODashboardShell() {
  const { tokens } = useTheme();

  return (
    <div className="flex w-full min-h-screen theme-transition" style={{ backgroundColor: tokens.bgBase }}>
      <NGOSidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function NGODashboardLayout() {
  return (
    <ThemeProvider>
      <NGODashboardShell />
    </ThemeProvider>
  );
}