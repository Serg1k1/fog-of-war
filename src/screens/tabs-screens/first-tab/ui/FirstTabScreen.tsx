import { EditScreenInfo } from '@/widgets/edit-screen-info';
import Mapbox, { MapView } from '@rnmapbox/maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '');

export function FirstTabScreen() {
  useEffect(() => {
    console.log('FirstTabScreen mounted');
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
