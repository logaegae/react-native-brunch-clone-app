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
      conText: `봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상`,
      isScrolling: false,
      isLiked: false,
      likeCount: 120,
      lastScrollPos: 0,
      writtenDate: "9시간 전",
      bgStyle : {
            backgroundColor : "#5ED9FF",
            // photoUrl : "http://img.insight.co.kr/static/2018/04/26/700/2mj61hb3b5kz181s70qd.jpg",
            // photoUrl : null,
            photoUrl: "http://image.yes24.com/momo/TopCate1899/MidCate004/122998193.jpg",
      },
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
        {bgStyle.photoUrl === null || bgStyle.photoUrl === "" ? (
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
    return(
      <HeaderConBox>
        <ArticleHeaderCon />
      </HeaderConBox>
    )
  }

  render(){
    
    const { conText, bgStyle } = this.state;

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
              {JSON.stringify(this.state.isScrolling)}
              {conText}
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