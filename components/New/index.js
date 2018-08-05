import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ViewHeader from './Header';
import WriteCon from './WriteCon';

class NewView extends React.Component {
  render() {
    return (
        <Container>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <ViewHeader/>
            <ViewMiddle/>
            <ConBox>
                <WriteCon />
            </ConBox>
        </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
`;
const ConBox = styled.View`
  flex:10;
`;

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewView);