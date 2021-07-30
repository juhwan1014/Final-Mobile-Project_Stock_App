import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import SearchScreen from '../../screens/SearchScreen';
import BuySellScreen from '../../screens/BuySellScreen';
import WatchScreen from '../../screens/WatchScreen';

const SearchStack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator
    initialRouteName="SearchScreen"
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
      <SearchStack.Screen
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
      <SearchStack.Screen
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
      <SearchStack.Screen
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
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
