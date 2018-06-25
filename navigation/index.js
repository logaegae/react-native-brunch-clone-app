import React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from 'react-navigation';

import Home from '../components/Home/Home';
import View from '../components/View/View';

export const AppNavigator = createSwitchNavigator(
    {
        Home : {
            screen : Home
        },
        View : {
            screen : View
        },
    },
    {
      initialRouteName: 'Home',
    }
);