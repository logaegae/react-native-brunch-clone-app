import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DrawerHeader from '../Common/ContentHeader';
import ContentItem from './ContentItem';

class DrawerView extends React.Component {
  render() {
    return (
        <Container>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <DrawerHeader title="글관리"/>
            <Body>
                <ContentItem issued={true}/>
                <ContentItem issued={false}/>
                <ContentItem issued={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerView);