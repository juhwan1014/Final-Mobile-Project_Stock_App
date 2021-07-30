import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import WatchScreen from '../../screens/WatchScreen';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator'

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        goBack: 'history',
        style: {
          backgroundColor: '#30444E',
          height: '10%',
          //borderRadius: '30%',
        },
      }}
    >
      <BottomTab.Screen
        name='Watch'
        component={WatchScreen}
        options={{
          tabBarIcon: () => <FontAwesome name='bell' size={30} color='white' />,
        }}
      />
      <BottomTab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name='comment-dollar' size={30} color='white' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={SearchNavigator}
        options={{
          tabBarIcon: () => (
            <FontAwesome name='search' size={30} color='white' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;
