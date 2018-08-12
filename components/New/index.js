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
            article : {
                _id : null,
                isModalVisible: false,
                switchOneday : false,
                modalType: "",
                startDate: "",
                finishDate: "",
                title : null,
                text: null,
                weather : {
                    id : 1,
                    name : null
                },
                bg : {
                    photo : null,
                    color : {
                    id : 1,
                    value : "#6B5ED1"
                    }
                }
            }
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
                <ViewHeader article={this.state.article} handleState={this._handleState}/>
                <ConBox>
                    <WriteCon handleState={this._handleState} article={article}/>
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