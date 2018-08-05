import React from 'react';
import { StatusBar, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ViewHeader from './Header';
import WriteCon from './WriteCon';

class NewView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            article : null
        }
    }
    _handleState = (article) => {
        this.setState({
            article
        });
    }
    render() {
        const {article} = this.state;
        return (
            <Container>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <ViewHeader article={this.state.article}/>
                <ConBox>
                    <WriteCon handleState={this._handleState}/>
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

export default NewView;