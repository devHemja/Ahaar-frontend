import { useEffect, useState } from 'react';
import { ThemeContext } from './themeContextInstance';
import { darkTokens, lightTokens } from '../theme/colors';

const STORAGE_KEY = 'ahaar-dashboard-theme';

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  const tokens = mode === 'dark' ? darkTokens : lightTokens;

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
}