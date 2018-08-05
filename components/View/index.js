import React from 'react';
import { Text, View, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest, getUsersRequest } from '../../actions';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import ViewHeader from './Header';

const { height, width } = Dimensions.get("window");

class ContentView extends React.Component {
  render() {
    return (
        <Container>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <ViewHeader/>
            <Body>
                <Text>text....</Text>
            </Body>
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
`;
const Body = styled.View`
    width : 100%;
    padding : 30px;
`;

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentView);