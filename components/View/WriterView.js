import React, { Component } from 'react';
import { Animated, Dimensions, StatusBar, View, ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions'  
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from 'axios';
import { domain } from '../../config';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

class WriterView extends Component {
  constructor(props){
    super(props);
    this.state = {
      writer : {},
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      message : '로딩중',
      init : false,
      scrollY : new Animated.Value(0)
    }
    
  }

  componentDidMount(){
    this.getList();
  }

  getList = () => {
    const { page, seed, data } = this.state;
    axios.post(domain + '/api/article/getUsersArticle', {_id : this.props.navigation.getParam('writer_id'), page, seed})
    .then((res) => {
        if(res.data.status === 'SUCCESS'){
          let newState = {
            data: page === 1 ? res.data.list : [...data, ...res.data.list],
            error: res.data.message || null,
            loading: false,
            refreshing: false,
            endYn : res.data.endYn,
            init : true,
            writer : res.data.writer
          }
          if(res.data.length == 0 ) {
            newState.init = false;
            newState.message = "게시물이 없습니다.";
          }else newState.message = "";
          this.setState(newState);
        }else{
          alert('ERROR');
        }
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  renderFooter = (
    <View
      style={{
        paddingTop: 20
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
      refreshing : true,
      endYn : false
    },()=>{
      this.getList();
    });
  }

  renderFixedHeader() {
    return(
      <FixedHeaderBox>
        <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
          <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
        </BtnIcon> 
      </FixedHeaderBox>
    )
  }

  renderSticky(){
    return(
      <StickyBox>
        <Nickname style={{marginTop: 5}}>{this.state.writer.name}</Nickname>
      </StickyBox>
    )
  }

  _keyExtractor = (item, index) => item._id;

  render(){  
    const { message, data, refreshing, loading, init, scrollY } = this.state;
    const { token, nickname } = this.props.login;
    const { setLikeIcon } = this.props;
    const scale = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange : [1, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange : [1, 0]
    });
    const _height = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange : [100, 0],
    });

    return(
        <Wrap>         
          <StatusBar hidden={false} />
            <View>
              <FixedHeaderBox>
                <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
                  <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
                </BtnIcon> 
              </FixedHeaderBox>
              <HeaderConBox>
                <ProfileBox>
                  <Animated.View style={{opacity, transform : [{scale}], height:_height, flex : opacity}}>
                    <ProfileImgBox source={{uri: this.state.writer.profileImg}}/>
                  </Animated.View>
                  <Nickname>{this.state.writer.name}</Nickname>
                  <Animated.View style={{opacity, transform : [{scale}]}}>
                    <ArticleNum>글수 {this.state.writer.articleLength}</ArticleNum>
                  </Animated.View>
                </ProfileBox> 
              </HeaderConBox>
              </View>
              <ConBox>
              {data.length === 0
                  ? (<Loading ><ActivityIndicator animating size="large" /></Loading>)
                  : <FlatList
                      style={{padding:'7%'}}
                      data={data} 
                      renderItem={({item}) => 
                        <WriterViewItem
                          {...item}
                          token={token}
                          nickname={nickname}
                          setLikeIcon={setLikeIcon} 
                          _handleLike={(_id) => {this.handleLike(_id)}} 
                        />
                      }
                      extraData={this.state}
                      keyExtractor={this._keyExtractor}
                      ListFooterComponent={loading ? this.renderFooter : null}
                      refreshing={refreshing}
                      onRefresh={this.handleRefresh}
                      onEndReached={this.handleLoadMore}
                      onEndReachedThreshold={0}
                      onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: scrollY } } },
                      ])}
                    />
                }
                {init ? <NoItemText>{message}</NoItemText> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(WriterView);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
  `;

const StickyBox = styled.View`
  position: relative;
  height:50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom-width:1px;
  border-bottom-color: #dedede;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.08);
`;

const FixedHeaderBox = styled.View`
  padding: 0 15px;
  position:absolute;
  left: 0;
  z-index:100;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;  
`;


const HeaderConBox = styled.View`
  position:relative;
  z-index:5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

const BtnIcon = styled.TouchableOpacity`  
`;

const ProfileBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;


const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : #ccc;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const Nickname = styled.Text`
  margin-top:15px;
  font-family: NanumGothic-bold;
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  margin-top:5px;  
  font-family: NanumGothic;
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
flex:1;
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