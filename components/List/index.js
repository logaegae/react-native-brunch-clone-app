import React, { Component } from 'react';
import { Dimensions, View, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';
import { debounce } from "debounce";

import ListItem from './ListItem';

const { height, width } = Dimensions.get("window");

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      message : '로딩중',
      init : false
    }
  }

  componentDidMount(){
    this.getList();
  }

  _onEndReached(){
    if(!this.state.endYn)(debounce(()=>{
      const listCount = ++this.state.listCount;
      this.setState({
        ...this.state,
        listCount
      },()=>{
        this.getList();
      })
    },1000))();
  }

  getList() {
    const { page, seed } = this.state;
    axios.post(domain + '/api/article/getAllList', {page, seed})
    .then((res)=>{
      let newState = {
        data: page === 1 ? res.data.list : [...data, ...res.data.list],
        error: res.message || null,
        loading: false,
        refreshing: false,
        endYn : res.data.endYn,
        init : true
      }
      if(res.data.length == 0 ) {
          newState.init = false;
          newState.message = "게시물이 없습니다.";
      }else newState.message = "";

      this.setState(newState);

    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  renderFooter = (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
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
        this.getList();
      });
    }
  }

  handleLike(_id) {
    const header = {
        headers : {
            'x-access-token' : this.props.login.token
        }
    }
    axios.post(domain + '/api/article/toggleLike', {_id}, header)
    .then((res) => {
        if(res.data.status === 'SUCCESS'){
            let list = this.state.data;
            for(i=0;i<list.length;i++){
                if(list[i]._id === _id){ 
                    list[i].isLiked = res.data.like;
                    break;
                }
            }
            if(res.data.addAction){
                this.props.setLikeIcon(true);
            }
            this.setState({
                ...this.state,
                data : list
            });
        }
    });
  }

  handleRefresh = () => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true
    },()=>{
      this.getList();
    });
  }

  _keyExtractor = (item, index) => item._id;

  render(){
    const { message, data, refreshing, loading, init } = this.state;
    const { token, nickname } = this.props.login;
    const { setLikeIcon } = this.props;
    return(
        <Wrap>
          <HeaderBox>
            <BtnBox>
              <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
              </BtnIcon>
            </BtnBox>
            <LogoBox>
              <Logo>Travel</Logo>
            </LogoBox>
          </HeaderBox>
            <ConBox>
            {data.length === 0
                ? (<Loading ><ActivityIndicator animating size="large" /></Loading>)
                : <FlatList
                    data={data} 
                    renderItem={({item}) => <ListItem 
                      {...item}
                      token={token} 
                      nickname={nickname} 
                      setLikeIcon={setLikeIcon} 
                      _handleLike={(_id)=>{this.handleLike(_id)}}
                    />}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={loading ? this.renderFooter : null}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                  />
              }
              {!init ? <NoItemText>{message}</NoItemText> : null}
          </ConBox>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeIcon : (bool) => {
        return dispatch(setLikeIcon(bool));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:1;
  position: relative;
  flex-direction: row;
  align-items: center;
  height:85px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background:#fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.06);
`;

const BtnBox = styled.View`
  position:absolute;
  top:0;
  left:0;
  z-index: 5;
  padding: 0 15px;
  height:85px;
  align-items: center;
  justify-content : center;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const LogoBox = styled.View`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Text`
  font-family: NanumGothic-bold;
  font-size: 45px;
  color:#999;
`;

const ConBox = styled.View`
  flex:1;
  padding: 7%;
`;

const Loading = styled.View`
  margin-top : 10%;
`;

const NoItemText = styled.Text`
    width : 100%;
    padding : 7%;
    font-family : NanumGothic;
    font-size : 22px;
    text-align : center;
`;