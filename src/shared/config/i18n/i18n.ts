import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TranslationArg } from './model/types/autocomplete';
import ar from '../../assets/locales/ar.json';
import en from '../../assets/locales/en.json';

const resources: Record<string, { translation: Record<string, unknown> }> = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  pluralSeparator: '_',
  compatibilityJSON: 'v4',
});

export const t = <Key extends TranslationArg>(
  key: Key,
  interpolationMap?: Record<string, string | number | undefined>
): string => {
  return i18n.t(key, interpolationMap);
};

export default i18n;
