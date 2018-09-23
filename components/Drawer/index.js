import React from 'react';
import { StatusBar, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DrawerHeader from '../Common/ContentHeader';
import ContentItem from './ContentItem';
import Modal from "react-native-modal";
import axios from 'axios';
import Theme from '../../style/theme';
import { domain } from '../../config';
import { setNotifyIcon } from '../../actions';
import { debounce } from "debounce";


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
        _id : null,
        endYn : false,
        listCount : 1
    }

    getUserArticles(){
        const obj = {
            id : this.props.login.id,
            includePublish : true,
            listCount : ++this.state.listCount
        };
        axios.post(domain+'/api/article/getUserArticle', obj)
        .then((res) => {
            if(res.data.status === "ARTICLE_GET_FAILED"){
                alert("ERROR\n"+res.data.message);
            }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){

                const articles = res.data.data;

                let newState = {
                    ...this.state,
                    articles,
                    listCount : obj.listCount,
                    endYn : res.data.endYn
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

    componentDidMount(){
        this.getUserArticles();
    }

    _onEndReached(){
        if(!this.state.endYn)(debounce(()=>{
          const listCount = ++this.state.listCount;
          this.setState({
            ...this.state,
            listCount
          },()=>{
            this.getUserArticles();
          })
        },1000))();
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
                    this.props.setNotifyIcon(true);
                }
                else if(target === "delYn"){
                    delete newArticles[res.data.article._id];
                    if(Object.keys(newArticles).length === 0){
                        newState.message = "저장한 글이 없습니다.";
                        newState.buttonShow = true;
                    }
                    this.props.setNotifyIcon(true);
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
    objectToArray(obj) {
        let arr = [];
        Object.keys(obj).forEach(e => {
            arr.push(obj[e])
        });
        return arr;
    }

    _keyExtractor = (item, index) => item._id;

    render() {
        const { articles, message, buttonShow, isModalVisible, _id } = this.state;
        let articlesArr = this.objectToArray(articles);
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
                            : <FlatList
                                data={articlesArr}
                                renderItem={({item}) => <ContentItem {...item} key={item._id} handleUpdate={this._handleUpdate} handleModal={this._handleModal}/>}
                                onEndReached = {()=>{this._onEndReached()}}
                                onEndReachedThreshold = {0.5}
                                keyExtractor={this._keyExtractor}
                            />
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
        setNotifyIcon : (bool) => {
            return dispatch(setNotifyIcon(bool));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerView);