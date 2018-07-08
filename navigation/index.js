import React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from 'react-navigation';

import Home from '../components/Home';
import View from '../components/View';
import New from '../components/New';
import DrawerList from '../components/Drawer';
import SideMenu from '../components/Navi'

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home
    }
},{
    contentComponent : SideMenu,
    drawerWidth: 300,
    initialRouteName: 'Home'
});

export const AppNavigator = createSwitchNavigator(
    {
        Home : {
            screen : DrawerNavigator
        },
        View : {
            screen : View
        },
        New : {
            screen : New
        },
        Drawer : {
            screen : DrawerList
        }
    },
    {
      initialRouteName: 'Home',
    }
);