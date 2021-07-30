import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import firebaseConfig from './src/api/firebase';
import firebase from 'firebase/app';
import BottomTabNav from './src/components/navigation/BottomTabNav';
import DrawerNav from './src/components/navigation/DrawerNav';

const Stack = createStackNavigator();

const PlatformSpecificNavigator = Platform.select({
  ios: () => BottomTabNav,
  android: () => DrawerNav,
})();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Root' component={PlatformSpecificNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    // <BuySellScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});
