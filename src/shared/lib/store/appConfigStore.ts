import { statePersistWrapper } from '@/shared/lib/persistWrappers';
import { I18nManager } from 'react-native';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { i18n } from '@/shared/config/i18n';
import * as Updates from 'expo-updates';

interface AppConfigState {
  language: string;
  isDarkMode: boolean;
  setLanguage: (language: string) => void;
  setDarkMode: (theme: boolean) => void;
}

const useAppConfigStore = create<AppConfigState>()(
  persist(
    (set) => {
      return {
        language: 'en',

        isDarkMode: true,
        setLanguage: (language: string) => {
          i18n.changeLanguage(language).then(async () => {
            I18nManager.forceRTL(language === 'ar');
            await Updates.reloadAsync();
          });
          set({ language });
        },
        setDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
      };
    },
    {
      name: 'app-config',
      storage: statePersistWrapper,
    }
  )
);
export default useAppConfigStore;

export const languageSelector = (state: AppConfigState) => state.language;
export const isDarkModeSelector = (state: AppConfigState) => state.isDarkMode;
export const setLanguageSelector = (state: AppConfigState) => state.setLanguage;
export const setDarkModeSelector = (state: AppConfigState) => state.setDarkMode;
