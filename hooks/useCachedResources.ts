import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
          'inter-semiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
          'inter-regular': require('../assets/fonts/Inter-Regular.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
          'open-semi-bold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
          'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
          'lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
          'inter-font-bold': require('../assets/fonts/Inter-Bold.ttf'),
          'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
