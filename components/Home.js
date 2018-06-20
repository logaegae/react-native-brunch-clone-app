import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest, getUsersRequest } from '../actions';
import { Ionicons } from '@expo/vector-icons'

class Home extends React.Component {
  render() {
    return (
        <Container>
            <MenuButton>
                <Ionicons name="md-menu" size={24}/>
            </MenuButton>
            <Text>{this.props.status}</Text>
            <Button
                onPress={this.props.loginRequest}
                title="Login"
                color="tomato"
            />
            <Button
                onPress={this.props.logoutRequest}
                title="Logout"
                color="skyblue"
            />
            <Button
                onPress={this.props.getUsersRequest}
                title="getUsers"
                color="green"
            />
            <Text>{this.props.users}</Text>
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;

const MenuButton = styled.TouchableOpacity`
    border : 1px #aaa solid;
    padding : 10px 15px;
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