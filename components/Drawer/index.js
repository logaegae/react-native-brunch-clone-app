import React from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DrawerHeader from '../Common/ContentHeader';
import ContentItem from './ContentItem';
import axios from 'axios';
import Theme from '../../style/theme';

class DrawerView extends React.Component {

    constructor(props){
        super(props);
        this._handleUpdate = this._handleUpdate.bind(this);
    }

    state = {
        articles : new Map(),
        message : "로딩중...",
        buttonShow : false
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

                const articles = res.data.data;

                let newState = {
                    articles
                }
                if(Object.keys(articles).length === 0 ) {
                    newState.message = "저장한 글이 없습니다.";
                    newState.buttonShow = true;
                }else newState.message = "";

                this.setState(newState);
            }
        }).catch((error) => {
            alert("ERROR\n"+error.message);
        });
    }

    _handleUpdate(_id, obj, target) {
        const token = this.props.login.token;
        const objToUpdate = {
            ...obj,
            _id
        };
        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        axios.post('http://localhost:9000/api/article/write', objToUpdate, header)
        .then((res) => {
            if(res.data.status === "ARTICLE_SAVE_FAILED"){
                alert("ERROR\n"+res.data.message);
            }else if(res.data.status === "ARTICLE_SAVE_SUCCESSED"){

                let newArticles = Object.assign({}, this.state.articles);
                
                if(target === "published"){
                    newArticles[res.data.article._id].published = res.data.article.published;
                }
                else if(target === "delYn"){
                    delete newArticles[res.data.article._id];
                }

                this.setState({
                    ...this.state,
                    articles : newArticles
                });
            }
        }).catch((error) => {
            alert("ERROR\n"+error.message);
        });
    }
    _getArticleItems () {
        var indents = [];
        Object.values(this.state.articles).forEach((e,i)=>{
            indents.push(<ContentItem key={i} {...e} handleUpdate={this._handleUpdate}/>);
        });
        return indents;
    }

    render() {
        const { articles, message, buttonShow } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <DrawerHeader title="글관리"/>
                <ScrollView>
                    <ConBox>
                        {Object.keys(articles).length === 0 
                            ? (<NoItemText>{message}</NoItemText>)
                            : this._getArticleItems()
                        }
                        {buttonShow ? <WriteArticleButton
                            title="글 쓰러 가기"
                            color={Theme.mainColor}
                            onPress={()=>{
                                this.props.navigation.navigate("New");
                            }}/> 
                        : ''}
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
const NoItemText = styled.Text`
    width : 100%;
    padding : 7%;
    font-family : NanumGothic;
    font-size : 22px;
    text-align : center;
`;
const WriteArticleButton = styled.Button`
    font-size : 18px;
    font-family : NanumGothic;
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