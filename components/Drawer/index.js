import React from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DrawerHeader from '../Common/ContentHeader';
import ContentItem from './ContentItem';
import axios from 'axios';

class DrawerView extends React.Component {

    state = {
        articles : []
    }

    componentDidMount(){
        const obj = {
            id : this.props.login.id,
            includePublish : true
        };
        axios.post('http://localhost:9000/api/article/getUserArticle', obj)
        .then((res) => {
            if(res.data.status === "ARTICLE_GET_FAILED"){
                alert("ERROR\n"+res.data.message);
            }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){
                this.setState({
                    articles : res.data.data
                });
            }
        }).catch((error) => {
            alert("ERROR\n"+error.message);
        });
    }

    render() {
        const { articles } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <DrawerHeader title="글관리"/>
                <ScrollView>
                    <Text>{JSON.stringify(articles[0],0,2)}</Text>
                    <ConBox>
                        {articles.map((item, index)=>
                        (<ContentItem key={index} {...item} />))}
                    </ConBox>
                </ScrollView>
            </Container>
        );
    }
}

const Container = styled.View`
    flex : 1;
`;
const ConBox = styled.View`
  padding: 7%;
`;

const mapStateToProps = (state) => {
    return {
        myArticle : state.redux.myArticle,
        login: state.redux.auth.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerView);