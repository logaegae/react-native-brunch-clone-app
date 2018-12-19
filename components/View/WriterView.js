import React, { Component } from 'react';
import { Animated, Dimensions, StatusBar, View, Image, ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions'  
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

HEADER_MAX_HEIGHT = 200;
HEADER_MIN_HEIGHT = 50;
PROFILE_IMG_MAX_SIZE = 100;
PROFILE_IMG_MIN_SIZE = 0;
MARGIN_MAX_SIZE = 20;
MARGIN_MIN_SIZE = 0;

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
      message : '로딩 중...',
      refreshing: false,
      init : false,
      scrollY : new Animated.Value(0),
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
          if(res.data.list.length == 0 ) {
            newState.init = true;
            newState.loading = false;
            newState.message = "게시물이 없습니다.";
          }else newState.message = " ";
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

  _keyExtractor = (item, index) => item._id;

  render(){  
    const { message, data, refreshing, loading, init, scrollY } = this.state;
    const { token, name } = this.props.login;

    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",       
    });
    const propfileImgSize = scrollY.interpolate({
      inputRange: [0, PROFILE_IMG_MAX_SIZE - PROFILE_IMG_MIN_SIZE],
      outputRange: [PROFILE_IMG_MAX_SIZE, PROFILE_IMG_MIN_SIZE],
      extrapolate: "clamp",       
    });
    const marginVertical = scrollY.interpolate({
      inputRange: [0, MARGIN_MAX_SIZE - MARGIN_MIN_SIZE],
      outputRange: [MARGIN_MAX_SIZE, MARGIN_MIN_SIZE],
      extrapolate: "clamp",       
    });
    const scale = scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange : [1, 1, 0.9, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, 40, 50],
      outputRange : [1, 0.9, 0]
    });

    return(
        <Wrap>         
          <StatusBar hidden={false} />
          <FixedHeaderBox>
            <BtnIcon onPress={() => this.props.navigation.goBack(null)}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
            </BtnIcon> 
          </FixedHeaderBox>          
          <ProfileBox>
            <Animated.View style={{
              opacity,
              overflow: "hidden",
              marginTop: marginVertical,
              height: propfileImgSize,
              width : propfileImgSize,
              borderRadius : PROFILE_IMG_MAX_SIZE / 2,             
            }}>
              <Image style={{
                flex: 1, width: null, height: null,
                backgroundColor : "#ccc",
                borderWidth: 1,
                borderColor: "#e5e5e5",
              }} 
                source={{uri: this.state.writer.profileImg}}
              />
            </Animated.View>
            <NicknameBox>
              <Nickname>{this.state.writer.name}</Nickname>
            </NicknameBox>
            <Animated.View style={{
              opacity, 
              transform : [{scale:scale}],
              marginBottom: marginVertical,
            }}>
              <ArticleNum>글수 {this.state.writer.articleLength}</ArticleNum>
            </Animated.View>
          </ProfileBox> 
          <Contents>
            <Animated.View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: headerHeight,
            }}>           
            </Animated.View> 
            <ConBox>
            {data.length !== 0
                ? (
                  <FlatList
                    style={{flex:1, padding:'7%'}}
                    data={data} 
                    renderItem={({item}) => 
                      <WriterViewItem
                        {...item}
                        token={token}
                        name={name}
                      />
                    }
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={loading ? this.renderFooter : null}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                      { nativeEvent: { contentOffset: { y: scrollY } } },
                    ])}
                  />                  
                ) : init ? (
                  <NoDataBox><NoDataText>{message}</NoDataText></NoDataBox> 
                ) : null }   
                {!init ? 
                  <NoDataBox>
                    <Loading><ActivityIndicator animating size="large" /></Loading>
                    <NoDataText>{message}</NoDataText>
                  </NoDataBox>
                : null} 
            </ConBox>
          </Contents>  
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

const FixedHeaderBox = styled.View`
  position:absolute;
  left: 0;
  z-index:100;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;  
`;


// const HeaderConBox = styled.View`
//   position:relative;
//   z-index:5;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

const BtnIcon = styled.TouchableOpacity`  
`;

const ProfileBox = styled.View`
  z-index: 50;
  position: absolute;
  top:0; 
  left:0;
  right:0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const NicknameBox = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Nickname = styled.Text`
  font-family: NanumGothic-bold;
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  font-family: NanumGothic;
  font-size:13px;
  color:#999;
`;

const Contents = styled.View`
  flex: 1;
  background: #fff;
`;

const ConBox = styled.View`
  flex: 1;
  padding-bottom: 6%;
  background: #f7f7f7;  
`;

const Loading = styled.View`
  margin-top: 7%;
`;

const NoDataBox = styled.View`  
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  margin-top : 5%;
  color:#666;
  font-size:16px;
  font-family: NanumGothic;
`;