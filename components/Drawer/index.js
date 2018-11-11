import React, { Component } from 'react';
import { Dimensions, ScrollView, FlatList, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setNotifyIcon } from '../../actions';
import axios from 'axios';
import Modal from "react-native-modal";
import { domain } from '../../config';

import ContentItem from './ContentItem';

const { height, width } = Dimensions.get("window");

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      init: false,
      data: [],
      page: 1, 
      seed: 1, 
      endYn: false,
      error: null,
      refreshing: false,
      message: "로딩 중...",
      buttonShow: false,
      isModalVisible: false,
      _id: null,
    };
    this.getEditList = this.getEditList.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleModal = this._handleModal.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
  }

  componentDidMount(){
    this.getEditList();
  }

  getEditList(){
    const { page, seed, data } = this.state;

    const obj = {
      id: this.props.login.id,
      includePublish: true
    };

    this.setState({loading: true},()=>{
      setTimeout(() => {
        axios.post(domain + '/api/article/getUserArticle', {page, seed, ...obj})
          .then((res) => {
              if(res.data.status === "FAIL"){
                  alert("ERROR\n"+res.data.message);
              }else if(res.data.status === "SUCCESS"){  
                let newState = {
                  data: page === 1 ? res.data.list : [...data, ...res.data.list],
                  error: res.message || null,
                  loading: false,
                  refreshing: false,
                  endYn : res.data.endYn,
                  init : true
                }
                if(res.data.list.length == 0 ) {
                    newState.init = true;
                    newState.loading = false;
                    newState.message = "저장한 글이 없습니다.";
                }else newState.message = " ";
          
                this.setState(newState);
              }
          }).catch((error) => {
            alert("ERROR\n"+res.data.message);
          });
        }, 0)
      })      
  }

  _handleUpdate(_id, obj, target){
    const token = this.props.login.token;  
    const objToUpdate = {
      ...obj,
      _id,
      changed: target,
    }

    const header = {
      headers : {
          'x-access-token' : token
      }
    }

    axios.post(domain + '/api/article/write', objToUpdate, header)
      .then((res) => {
          if(res.data.status === "ARTICLE_UPDATE_FAILED"){
              alert("ERROR\n"+"세이브 실패");
          }else if(res.data.status === "ARTICLE_UPDATE_SUCCESSED"){ 
            
            let newArticle = this.state.data;
            let newState = [];

            if (target === "published"){
              for(index in newArticle){
                if(newArticle[index]["_id"] === res.data.article._id) newArticle[index].published = res.data.article.published;
              }
              this.props.setNotifyIcon(true);

            } else if(target === "delYn"){
              for(index in newArticle){
                if(newArticle[index]["_id"] === res.data.article._id) newArticle.splice(index, 1);                
              }

              if(newArticle.length === 0){
                newState.message = "저장한 글이 없습니다.";
                newState.init = true;
                newState.loading = false;
              }
              this.props.setNotifyIcon(true);
            } 

            this.setState({
              ...this.state,
              data: newArticle,
              ...newState,
            })
          }
      }).catch((error) => {
        alert("ERROR\n"+"캐치에러");
      });
  }

  _renderModalContent = (_id) => (
    <ModalWrap>    
      <ModalSelect>
        <ModalOption first onPress={() => {this.props.navigation.navigate("New", {_id})}}>
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

  _handleModal = (_id) => {
    this.setState({
        ...this.state,
        _id,
        isModalVisible : !this.state.isModalVisible
    });
  }

  renderFooter = (
    <View
      style={{
        paddingVertical: 20,
        // borderTopWidth: 1,
        // borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  handleLoadMore = () => {
    if (!this.state.loading && !this.state.endYn){
      this.setState({
        page : this.state.page + 1,
        loading : true
      },() => {
        this.getEditList();
      });
    }
  }

  handleRefresh = () => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true,
      endYn: false,
    },()=>{
      this.getEditList();
    });
  }

  _keyExtractor = (item, index) => item._id;

  render(){
    const { _id, isModalVisible} = this.state;
    const { message, data, refreshing, loading, init } = this.state;
 
    return(
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent(_id)}
        </Modal>

        <HeaderBox>
          <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
          </BtnIcon>
          <H1>글 관리</H1>
        </HeaderBox>
          <ConBox>
          {data.length !== 0
            ? <FlatList
                style={{padding: "7%"}}
                data={data} 
                renderItem={({item}) => <ContentItem 
                  {...item}
                  handleUpdate={this._handleUpdate} 
                  handleModal={this._handleModal}
                />}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                ListFooterComponent={loading ? this.renderFooter : null}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
              />
          : init ? (
            <NoDataBox>                
              <NoDataText>{message}</NoDataText>
              <BtnText noData onPress={() => this.props.navigation.navigate('New')}>
                <LinkText>글 쓰러 가기</LinkText>
                <Ionicons name="ios-arrow-round-forward" color="#6093E3" size={24} style={{marginLeft:10}}/>
              </BtnText>
            </NoDataBox>
          ): null}
          {!init ? 
          <NoDataBox>
            <Loading><ActivityIndicator animating size="large" /></Loading>
            <NoDataText>{message}</NoDataText>
          </NoDataBox>
          : null} 
        </ConBox>
      </Wrap>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    items: state.redux.article.items,
    http: state.redux.article.http,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNotifyIcon : (bool) => {
      return dispatch(setNotifyIcon(bool));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);


const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:1;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
  background:#fff;
  `;
  // box-shadow: 0px 3px 2px rgba(0,0,0,0.05);


const BtnIcon = styled.TouchableOpacity`
`;

const H1 = styled.Text`
  z-index:-1;
  position:absolute;
  width: ${width};
  align-items: center;
  text-align:center;
  font-size:20px;
  font-family: 'NanumGothic';
`;

const ConBox = styled.View`
  flex:1;
  padding-bottom: 7%;
`;

const Loading = styled.View`
  margin-top: 7%;
`;

const NoDataBox = styled.View`  
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  margin-top : 7%;
  color:#666;
  font-size:16px;
  font-family: 'NanumGothic';
`;

const BtnText = styled.TouchableOpacity`
  margin-top:20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #6093E3;
`;

const LinkText = styled.Text`
  font-size:14px;
  color:#6093E3;
  font-family: 'NanumGothic';
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