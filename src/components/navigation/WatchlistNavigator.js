import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BuySellScreen from '../../screens/BuySellScreen';
import SearchScreen from '../../screens/SearchScreen';
import WatchScreen from '../../screens/WatchScreen';
import MenuIcon from './MenuIcon';
import { Platform } from 'react-native';

const WatchlistStack = createStackNavigator();

export default function WatchlistNavigator() {
  return (
    <WatchlistStack.Navigator
      initialRouteName="WatchScreen"
      screenOptions={{
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: '#22343C',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerLeft: null,
      }}
    >
      <WatchlistStack.Screen
        name="WatchScreen"
        component={WatchScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'Watchlist',
              }
        }
      />
      <WatchlistStack.Screen
        name="BuySellScreen"
        component={BuySellScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTItle: 'Buy & Sell',
              }
        }
      />
      <WatchlistStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'Search',
              }
        }
      />
    </WatchlistStack.Navigator>
  );
}
