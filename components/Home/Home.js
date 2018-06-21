import React from 'react';
import { Text, View, Button, TouchableHighlight, StatusBar, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest, getUsersRequest } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import Search from './Search';
import Content from './Content';

const { height, width } = Dimensions.get("window");

class Home extends React.Component {
  render() {
    return (
        <Container>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <HomeHeader>
                <MenuButton>
                    <Ionicons name="md-menu" size={50}/>
                </MenuButton>
            </HomeHeader>
            <HomeBody>
                <Search/>
                <Content/>
            </HomeBody>
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
`;

const MenuButton = styled.TouchableHighlight`
    width : 50px;
    height : 50px;
    justify-content : center;
    align-items : center;
`;
const HomeHeader = styled.View`
    flex : 1;
    align-items : flex-start;
    justify-content : flex-end;
    padding : 0 20px;
`;
const HomeBody = styled.View`
    flex : 9;
    align-items : center;
`;

const mapStateToProps = (state) => {
    return {
        status: state.auth.login.status,
        users: state.auth.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersRequest: () => {
            return dispatch(getUsersRequest()); 
        },
        loginRequest: () => { 
            return dispatch(loginRequest()); 
        },
        logoutRequest: () => { 
            return dispatch(logoutRequest()); 
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);