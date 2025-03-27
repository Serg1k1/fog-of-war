import { COLORS } from '../const/themeColors';
import useAppConfigStore, { isDarkModeSelector } from '@/shared/lib/store/appConfigStore';
import { ThemeColorNames } from '../types/colorNames';

export function useThemeColor() {
  const isDarkMode = useAppConfigStore(isDarkModeSelector);

  const theme = isDarkMode ? 'dark' : 'light';
  return (colorName: ThemeColorNames) => {
    return COLORS[theme][colorName];
  };
}
