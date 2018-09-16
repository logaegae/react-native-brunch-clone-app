import React, { Component } from 'react';
import { Dimensions, StatusBar, View, Image } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import ArticleHeaderCon from './ArticleHeaderCon'

const { height, width } = Dimensions.get("window");



export default class ArticleView extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...this.props.navigation.getParam('item')
    }
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
    const { isLiked, writtenDate, bgStyle, isScrolling } = this.state;

    return(
      <FixedHeaderBox 
        visual={isScrolling} 
        backgroundColor={
          bgStyle.photoUrl === null || bgStyle.photoUrl === "" ? (
            isScrolling ? ('#fff') : (bgStyle.backgroundColor)
          ) : (
            isScrolling ? ('#fff') : ('transparent')
          )
          }
        >
        <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
          <Ionicons name="ios-arrow-round-back" color={isScrolling ? ("#333") : ("#fff")} size={45}/>
        </BtnIcon>
        <Row>          
          <BtnLike onPressOut={() => this._handleLikeStatus(isLiked)}>
            {isLiked ? (
              <Ionicons name="md-heart" color="#EC4568" size={15} />
              ) : (
              <Ionicons name="md-heart-outline" color={isScrolling ? ("#333") : ("#fff")} size={15} />
              )
            }
            <LikeNum visual={isScrolling}>{this.state.lastScrollPos}</LikeNum>
          </BtnLike>
          <WrittenDate visual={isScrolling}> · {writtenDate}</WrittenDate>   
        </Row> 
      </FixedHeaderBox>
    )
  }

  renderHeaderContent(){

    const { title, startDate, finishDate, __id, weather } = this.state;

    return(
      <HeaderConBox>
        <ArticleHeaderCon title={title} startDate={startDate} finishDate={finishDate} writer={__id} weather={weather}/>
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
              {text}
            </ConText>
          </ParallaxScrollView>                
        </Wrap>
      )
  }
}

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

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: NanumGothic;
  margin-left:3px;
  font-size:15px;
  color: ${props => props.visual ? ('#333;') : ('#fff;')}
  font-weight:500;
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