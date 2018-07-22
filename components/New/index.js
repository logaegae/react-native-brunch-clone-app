import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ViewHeader from './Header';
import ViewMiddle from './Middle';

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
    font-family : NanumGothic;
`;

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewView);