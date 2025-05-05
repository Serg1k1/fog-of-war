import * as Location from 'expo-location';

export const getBackgroundLocation = async () => {
  await Location.startLocationUpdatesAsync('background-location-task', {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 5000,
    distanceInterval: 10,
    foregroundService: {
      notificationTitle: 'Location tracking',
      notificationBody: 'We are tracking your location',
    },
    showsBackgroundLocationIndicator: true,
  });
};

export const getCurrentLocation = async (updateLocation: (coords: Location.LocationObjectCoords) => void) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
  }

  const location = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      distanceInterval: 10,
    },
    (newLocation) => {
      updateLocation(newLocation.coords);
    }
  );
  return location;
};
