import React from 'react';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import UnAuthStackNavigator from './src/navigation/UnAuthStack.tsx';
import MainTabNavigator from './src/navigation/MainTabNavigation';
import useAuthStore from './src/store/authStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface AuthData {
  authToken: string | null;
}

const linking: LinkingOptions<{}> = {
  prefixes: ['MySocialMediaApp://'],
  config: {
    initialRouteName: 'Feed' as unknown as keyof {} | undefined,
    screens: {
      Feed: 'Feed',
      Compose: 'Compose',
      Profile: 'profile',
    },
  },
};

const App: React.FC = () => {
  const {authToken}: AuthData = useAuthStore() as AuthData;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          {authToken ? <MainTabNavigator /> : <UnAuthStackNavigator />}
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
