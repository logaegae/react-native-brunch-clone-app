import React from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DrawerHeader from '../Common/ContentHeader';
import ContentItem from './ContentItem';
import Modal from "react-native-modal";
import axios from 'axios';
import Theme from '../../style/theme';
import { domain } from '../../config';


class DrawerView extends React.Component {

    constructor(props){
        super(props);
        this._handleUpdate = this._handleUpdate.bind(this);
        this._handleModal = this._handleModal.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
    }

    state = {
        articles : {},
        message : "로딩중...",
        buttonShow : false,
        isModalVisible : false,
        _id : null
    }

    componentDidMount(){
        const obj = {
            id : this.props.login.id,
            includePublish : true
        };
        axios.post(domain+'/api/article/getUserArticle', obj)
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
            _id,
            changed : target
        };
        const header = {
            headers : {
                'x-access-token' : token
            }
        }
        axios.post(domain+'/api/article/write', objToUpdate, header)
        .then((res) => {
            if(res.data.status === "ARTICLE_UPDATE_FAILED"){
                alert("ERROR\n"+res.data.message);
            }else if(res.data.status === "ARTICLE_UPDATE_SUCCESSED"){

                let newArticles = Object.assign({}, this.state.articles);
                let newState = {};
                
                if(target === "published"){
                    newArticles[res.data.article._id].published = res.data.article.published;
                }
                else if(target === "delYn"){
                    delete newArticles[res.data.article._id];
                    if(Object.keys(newArticles).length === 0){
                        newState.message = "저장한 글이 없습니다.";
                        newState.buttonShow = true;
                    }
                }

                this.setState({
                    ...this.state,
                    articles : newArticles,
                    ...newState
                });
            }
        }).catch((error) => {
            alert("ERROR\n"+error.message);
        });
    }

    _renderModalContent = () => {
        const _id = this.state._id;
        return (
            <ModalWrap>    
                <ModalSelect>
                    <ModalOption first onPress={() => this.props.navigation.navigate("New", {'_id': _id})}>
                    <ModalBtnText>수정</ModalBtnText>
                    </ModalOption>
                    <ModalOption onPress={() => {
                    this._handleUpdate(_id, {delYn : true}, "delYn");
                    this.setState({ isModalVisible: false });
                    }}>
                    <ModalBtnText red>삭제</ModalBtnText>
                    </ModalOption>        
                </ModalSelect>
                <ModalCancle onPress={() => this.setState({ isModalVisible: false })}>  
                    <ModalBtnText>취소</ModalBtnText>
                </ModalCancle>
            </ModalWrap>
        );
    }

    _handleModal = (_id) => {
        this.setState({
            ...this.state,
            _id,
            isModalVisible : !this.state.isModalVisible
        });
    }

    _getArticleItems () {
        if(Object.keys(this.state.articles).length === 0) return '';
        let indents = [];
        Object.values(this.state.articles).forEach((e,i)=>{
            indents.push(<ContentItem key={i} {...e} handleUpdate={this._handleUpdate} handleModal={this._handleModal}/>);
        });
        return indents;
    }

    render() {
        const { articles, message, buttonShow, isModalVisible, _id } = this.state;
        return (
            <Container>
                <Modal 
                isVisible={isModalVisible} 
                style={{ justifyContent: 'flex-end', margin:0 }}
                onBackdropPress={()=>{
                    this.setState({isModalVisible : false})
                }}
                >
                    {this._renderModalContent()}
                </Modal>
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

const ModalWrap = styled.View`
  padding: 30px;
`;

const ModalSelect = styled.View`
  background: #fff;
  border-radius:15px;
`;

const ModalCancle = styled.TouchableOpacity`
  margin-top:15px;
  padding: 20px 0;
  align-items: center;
  background: #fff;
  border-radius:15px;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 20px 0;
  align-items: center;
  border-top-color:#ccc;
  border-top-width: ${props => props.first ? "0" : "1px"}
`;

const ModalBtnText = styled.Text`
  font-size:18px;
  color: ${props => props.red ? "red" : "blue"}
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