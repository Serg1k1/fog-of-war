import { LocationObjectCoords } from 'expo-location';

export interface LocationStore {
  currentLocation: LocationObjectCoords | null;
  setCurrentLocation: (location: LocationObjectCoords) => void;
}
