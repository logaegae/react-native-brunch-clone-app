import React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from 'react-navigation';

import Home from '../components/Home'

const DrawerNavi1 = createDrawerNavigator({
    Home : { 
        screen : Home
    },
},{
    drawerPosition : 'right',
    getCustomActionCreators: (route, stateKey) => {
        return {
          toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
        };
    },
});

export default SwitchNavi = createSwitchNavigator(
    {
      Home: Home,
    },
    {
      initialRouteName: 'Home',
    }
);