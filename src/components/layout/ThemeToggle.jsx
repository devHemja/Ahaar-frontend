import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/useTheme';

export default function ThemeToggle() {
  const { mode, toggleMode, tokens } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label="Toggle dashboard theme"
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 cursor-pointer transition-colors hover:opacity-80"
      style={{ backgroundColor: tokens.bgChipAmber, color: tokens.brandPrimary }}
    >
      {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
