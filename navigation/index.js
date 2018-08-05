import React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation'

import Home from '../components/Home';
import View from '../components/View';
import New from '../components/New';
import DrawerList from '../components/Drawer';
import SideMenu from '../components/Navi';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Notify from '../components/Feed/Notify';
import Like from '../components/Feed/Like';
import MyPage from '../components/MyPage';
import ChangePw from '../components/MyPage/ChangePw';

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
        },
        SignIn : {
            screen : SignIn
        },
        SignUp : {
            screen : SignUp
        },
        Notify : {
            screen : Notify
        },
        Like : {
            screen : Like
        },
        MyPage : {
            screen : MyPage
        },
        ChangePw : {
            screen : ChangePw
        }
    },
    {
      initialRouteName: 'Home',
    }
);