import { COLORS } from '../const/themeColors';

export type ThemeColorNames = keyof typeof COLORS.light & keyof typeof COLORS.dark;
