import * as SecureStore from 'expo-secure-store';
import { PersistStorage } from 'zustand/middleware';

export const secureStatePresistorWrapper: PersistStorage<unknown> = {
  getItem: async (name: string) => {
    const item = await SecureStore.getItemAsync(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name: string, value: unknown) => {
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};
