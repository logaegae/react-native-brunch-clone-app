import React from 'react';
import { Text, View, Button } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions';

class Home extends React.Component {
  render() {
    return (
        <Container>
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
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;

const mapStateToProps = (state) => {
    return {
        status: state.auth.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: () => { 
            return dispatch(loginRequest()); 
        },
        logoutRequest: () => { 
            return dispatch(logoutRequest()); 
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);