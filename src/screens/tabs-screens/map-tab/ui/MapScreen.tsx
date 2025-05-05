import Mapbox, { MapView } from '@rnmapbox/maps';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as Location from 'expo-location';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '');

export function MapScreen() {
  useEffect(() => {
    async function getCurrentLocation() {
      let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

      if (foregroundStatus !== 'granted') {
        console.log('Permission to access location was denied');
      }

      if (backgroundStatus !== 'granted') {
        console.log('Permission to access background location was denied');
      }
    }

    getCurrentLocation();
  }, []);
  return (
    <View style={styles.container}>
      {process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN && (
        <MapView style={styles.map} styleURL={Mapbox.StyleURL.TrafficNight} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
