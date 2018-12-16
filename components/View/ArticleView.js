import React, { Component } from 'react';
import { Dimensions, StatusBar, View, Image } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import timeAgo from '../../lib/timeAgo';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import axios from 'axios';
import { domain } from '../../config';
import ToggleLike from '../Common/ToggleLike';

import ArticleHeaderCon from './ArticleHeaderCon';

const { height, width } = Dimensions.get("window");

class ArticleView extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...this.props.navigation.getParam('item')
    };
    this.handleLike = this.handleLike.bind(this);
  }

  handleScrolling(bool){
    this.setState(function(prevState){
      if(!bool) {
        return {isScrolling:true}
      } else {
        return {isScrolling:false}
      }
    });
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
            let list = this.state;
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
                isLiked: res.data.like,
            })
        }
    });
  }

  renderBg(){
    const { bgStyle } = this.state;
    return (
      <View key="background">
        {!bgStyle.photoUrl ? (
          <View style={{
            width: width,
            height: 320,
            backgroundColor: bgStyle.backgroundColor}}/>
        ) : (
          <View>
            <Image source={{
              uri: bgStyle.photoUrl,
              width: width,
              height: 320}}/>
            <View style={{
              position: 'absolute',
              top: 0,
              width: width,
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 320}}/>
          </View>
        )}
      </View>
    )
  }

  renderFixedHeader(){
    const { _id, __id, isLiked, writtenDate, updatedDate, bgStyle, isScrolling } = this.state;

    return(
      <FixedHeaderBox 
        visual={isScrolling} 
        backgroundColor={
          !bgStyle.photoUrl ? (
            isScrolling ? ('#fff') : (bgStyle.backgroundColor)
          ) : (
            isScrolling ? ('#fff') : ('transparent')
          )}>
        <BtnIcon onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" color={isScrolling ? ("#333") : ("#fff")} size={45}/>
        </BtnIcon>
        <Row>    
          <ToggleLike 
            iconSize={15} 
            iconColor={isScrolling ? "#333" : "#fff"}
            numSize={15} 
            textColor={isScrolling ? "#333" : "#fff"} 
            isLiked={isLiked} 
            _id={_id} 
            visual={isScrolling} />
          <WrittenDate visual={isScrolling}> · {updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</WrittenDate>   
        </Row> 
      </FixedHeaderBox>
    )
  }

  renderHeaderContent(){
    return(
      <HeaderConBox>
        <ArticleHeaderCon state={this.state}/>
      </HeaderConBox>
    )
  }

  render(){
    
    const { text } = this.state;

    return(
      <Wrap>
        <StatusBar hidden={true} />

        <ParallaxScrollView
          style={{ flex: 1}}
          // backgroundColor={bgStyle.backgroundColor}
          renderBackground={() => this.renderBg()}
          contentBackgroundColor="#fff"
          parallaxHeaderHeight={320}
          stickyHeaderHeight={90}
          fadeOutForeground={true}
          onChangeHeaderVisibility={(bool)=> this.handleScrolling(bool)}
          renderFixedHeader={() => this.renderFixedHeader()}
          renderForeground={() => this.renderHeaderContent()}
          >
          <ConText>
            {/* {JSON.stringify(this.state.isLiked)} */}
            {text}
          </ConText>
        </ParallaxScrollView>                
      </Wrap>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      login: state.redux.auth.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeIcon : (bool) => {
          return dispatch(setLikeIcon(bool));
      }
  };
};

const ArticleViewWithNavi = withNavigation(ArticleView);
export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewWithNavi);

const Wrap = styled.View`
  flex: 1;
  position:relative;
`;

const FixedHeaderBox = styled.View`
  z-index:100;
  padding: 20px 15px 0;
  height:70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: transparent;
  backgroundColor:${prop => prop.backgroundColor}; 
  ${props => {
    if(props.visual){
      return `
      border-bottom-color: #dedede;
      box-shadow: 0px 3px 2px rgba(0,0,0,0.08);
      `
    }
  }}
  `;

const BtnIcon = styled.TouchableOpacity`
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:10px;
`;

const WrittenDate = styled.Text`
  font-family: NanumGothic;
  color: ${props => props.visual ? ('#333;') : ('#fff;')}
  font-size:15px;
`;

const HeaderConBox = styled.View`
  flex: 1;
  margin-top:70px;
`;

const ConText = styled.Text`
  padding: 7%;
  flex-wrap: wrap;
  font-family: NanumGothic;
  color:#333;
  font-size:15px;
  line-height:25px;
`;