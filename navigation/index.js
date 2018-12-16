import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import Home from '../components/Home';
import ArticleView from '../components/View/ArticleView';
import WriterView from '../components/View/WriterView';
import New from '../components/New';
import List from '../components/List';
import DrawerList from '../components/Drawer';
import SideMenu from '../components/Navi';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Notify from '../components/Feed/Notify';
import Like from '../components/Feed/Like';
import MyPage from '../components/MyPage';
import ChangePw from '../components/MyPage/ChangePw';
import Search from '../components/Search';

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home
    }
},{
    contentComponent : SideMenu,
    drawerWidth: 300,
    initialRouteName: 'Home'
});

export const AppNavigator = createStackNavigator(
    {
        Home : {
            screen : DrawerNavigator
        },
        ArticleView : {
            screen : ArticleView
        },
        WriterView : {
            screen : WriterView
        },
        New : {
            screen : New,
            navigationOptions : () => ({
                gesturesEnabled : false
            })
        },
        List : {
            screen : List
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
        },
        Search : {
            screen : Search
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        cardStyle: {
            backgroundColor: 'white'
        }
    }
);