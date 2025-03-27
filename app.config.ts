import { ConfigContext, ExpoConfig } from 'expo/config';
import applePrivacyManifest from './apple-privacy-manifest.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    owner: 'kindrat',
    name: process.env.APP_NAME ?? 'Boilerplate',
    slug: 'Boilerplate-dev',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    platforms: ['ios', 'android'],
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash-icon.png',
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
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE', 'NOTIFICATIONS'],
      blockedPermissions: ['android.permission.RECORD_AUDIO'],
      package: process.env.ANDROID_PACKAGE ?? 'myapp',
    },
    plugins: [
      'expo-router',
      ['expo-secure-store'],
      [
        'expo-font',
        {
          fonts: ['src/assets/fonts/Inter-VariableFont_slnt,wght.ttf', 'src/assets/fonts/SF-arabic.ttf'],
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
      //   eas: {
      //     projectId: '9fdb5fc4-a108-47f5-aaa6-65efb122f694',
      //   },
      //   IOS_BUNDLE_IDENTIFIER: process.env.IOS_BUNDLE_IDENTIFIER,
      //   ANDROID_PACKAGE: process.env.ANDROID_PACKAGE,
      //   CERTIFICATE_HASH: process.env.CERTIFICATE_HASH ?? '',
      //   APP_TEAM_ID: process.env.APP_TEAM_ID ?? '',
      //   WATCHER_MAIL: process.env.WATCHER_MAIL ?? '',
      //   IS_PROD: Boolean(process.env.IS_PROD) ?? true,
    },
    // runtimeVersion: {
    //   policy: 'appVersion', // https://docs.expo.dev/versions/latest/sdk/updates/#runtime-version
    // },
    // updates: {
    //   url: `https://u.expo.dev/9fdb5fc4-a108-47f5-aaa6-65efb122f694`,
    // },
    // notification: {
    //   iosDisplayInForeground: true,
    // },
  };
};
