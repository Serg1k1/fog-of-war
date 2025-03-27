import { ThemeProvider } from '@react-navigation/native';
import { isDarkModeSelector, useAppConfigStore } from '@/shared/lib/store';
import { NAVIGATION_COLORS_DARK, NAVIGATION_COLORS_LIGHT } from '@/shared/lib/theme';

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppConfigStore(isDarkModeSelector);
  return (
    <ThemeProvider value={isDarkMode ? NAVIGATION_COLORS_DARK : NAVIGATION_COLORS_LIGHT}>{children}</ThemeProvider>
  );
}
