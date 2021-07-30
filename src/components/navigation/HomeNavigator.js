import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Login from '../../screens/Login';
import HomeScreen from '../../screens/HomeScreen';
import Register from '../../screens/Register';
import PortfolioListScreen from '../../screens/PortfolioListScreen';
import PortfolioDetailScreen from '../../screens/PortfolioDetailScreen'

const HomeStack = createStackNavigator();

// options={{
//   title: '',
//   headerStyle: {
//     backgroundColor: '#22343C',
//     shadowOpacity: 0,
//     elevation: 0,
//   },
// }}

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: '#22343C',
          shadowOpacity: 0,
          elevation: 0,
        },
        //headerLeft: null,
      }}
    >
      <HomeStack.Screen
        name='LoginScreen'
        component={Login}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'User Dashboard',
              }
        }
      />
      <HomeStack.Screen
        name='PortfolioListScreen'
        component={PortfolioListScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'User Dashboard',
              }
        }
      />
      <HomeStack.Screen
        name='PortfolioDetailScreen'
        component={PortfolioDetailScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'User Dashboard',
              }
        }
      />
      <HomeStack.Screen
        name='RegisterScreen'
        component={Register}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
