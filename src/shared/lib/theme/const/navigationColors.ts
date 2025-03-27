import { COLORS } from './themeColors';

export const NAVIGATION_COLORS_DARK = {
  dark: true,
  colors: {
    primary: COLORS.dark.primary,
    background: COLORS.dark.background,
    card: COLORS.dark.card,
    text: COLORS.dark.text,
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'normal',
    },
  },
} as const;
export const NAVIGATION_COLORS_LIGHT = {
  dark: false,
  colors: {
    primary: COLORS.light.primary,
    background: COLORS.light.background,
    card: COLORS.light.card,
    text: COLORS.light.text,
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: '',
      fontWeight: 'normal',
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'normal',
    },
  },
} as const;
