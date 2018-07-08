import React from 'react';
import { Text, View, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest, getUsersRequest } from '../../actions';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import ViewHeader from './Header';
import ViewMiddle from './Middle';

const { height, width } = Dimensions.get("window");

class NewView extends React.Component {
  render() {
    return (
        <Container>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <ViewHeader/>
            <ViewMiddle/>
            <Body>
                <BodyText>텍스트편집기 입력....</BodyText>
            </Body>
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
`;
const Body = styled.ScrollView`
    width : 100%;
    padding : 30px;
`;
const BodyText = styled.Text`
    font-size : 23px;
`;

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewView);