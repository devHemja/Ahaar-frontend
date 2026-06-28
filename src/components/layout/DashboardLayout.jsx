import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import { useTheme } from '../../context/useTheme';
import Sidebar from './Sidebar';

function DashboardShell() {
  const { tokens } = useTheme();

  return (
    <div className="flex w-full min-h-screen theme-transition" style={{ backgroundColor: tokens.bgBase }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <DashboardShell />
    </ThemeProvider>
  );
}