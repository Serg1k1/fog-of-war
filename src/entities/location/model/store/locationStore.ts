import { createStore } from 'zustand';
import { LocationStore } from '../types/locationStore-types';

export const locationStore = createStore<LocationStore>((set) => ({
  currentLocation: null,
  setCurrentLocation: (coords) => set({ currentLocation: coords }),
}));
