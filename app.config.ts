import { ConfigContext, ExpoConfig } from 'expo/config';
import applePrivacyManifest from './apple-privacy-manifest.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    owner: 'k1ndrat',
    name: process.env.APP_NAME ?? 'FOG_OF_WAR',
    slug: 'Fog-of-war',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/shared/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    platforms: ['ios', 'android'],
    newArchEnabled: true,
    splash: {
      image: './src/shared/assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER ?? 'myapp',
      privacyManifests: applePrivacyManifest,
      infoPlist: {
        LSApplicationQueriesSchemes: ['comgooglemaps', 'https'],
        UIBackgroundModes: ['fetch', 'remote-notification', 'audio'],
        NSCameraUsageDescription:
          'This app requires camera access to capture and upload photos. Your photos may be used to update your avatar or to upload images of a new drone for identification and incident reporting.',
        NSPhotoLibraryUsageDescription: 'This app needs access to your photo library to select and upload photos.',
        NSPhotoLibraryAddUsageDescription: 'This app needs access to add photos to your photo library.',
        NSLocationWhenInUseUsageDescription:
          'We need your precise location to show you nearby flying zones, direction to flying zones, to allow you make flights and to notify you if flight become prohibited in your zone.',
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'We need your precise location to show you nearby flying zones, direction to flying zones, to allow you make flights and to notify you if flight become prohibited in your zone.',
        CFBundleAllowMixedLocalizations: true,
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            [process.env.EXPO_PUBLIC_SERB_DOMAIN || 'flyserb.com']: {
              NSIncludesSubdomains: true,
              NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
              NSTemporaryExceptionMinimumTLSVersion: 'TLSv1.1',
            },
          },
        },
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      //   googleServicesFile: 'google-services.json',
      adaptiveIcon: {
        foregroundImage: './src/shared/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE', 'NOTIFICATIONS'],
      blockedPermissions: ['android.permission.RECORD_AUDIO'],
      package: process.env.ANDROID_PACKAGE ?? 'com.k1ndrat.fogofwar',
    },
    plugins: [
      'expo-router',
      ['expo-secure-store'],
      [
        'expo-font',
        {
          fonts: ['src/shared/assets/fonts/SpaceMono-Regular.ttf'],
        },
      ],
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN,
          RNMapboxMapsVersion: '11.0.0',
        },
      ],
      [
        'expo-location',
        {
          locationWhenInUsePermission: 'Show current location on map.',
        },
      ],
    ],
    locales: {
      en: './src/languages/english.json',
      ar: './src/languages/arabic.json',
    },
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '439c7ab3-8186-44d5-a751-0088eece1ffd',
      },
      //   IOS_BUNDLE_IDENTIFIER: process.env.IOS_BUNDLE_IDENTIFIER,
      //   ANDROID_PACKAGE: process.env.ANDROID_PACKAGE,
      //   CERTIFICATE_HASH: process.env.CERTIFICATE_HASH ?? '',
      //   APP_TEAM_ID: process.env.APP_TEAM_ID ?? '',
      //   WATCHER_MAIL: process.env.WATCHER_MAIL ?? '',
      //   IS_PROD: Boolean(process.env.IS_PROD) ?? true,
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/439c7ab3-8186-44d5-a751-0088eece1ffd',
      enabled: true,
      fallbackToCacheTimeout: 0,
    },
    // notification: {
    //   iosDisplayInForeground: true,
    // },
  };
};
