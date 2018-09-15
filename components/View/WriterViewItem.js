import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class WriterViewItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      conText: `봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐`,
      isPulished: false,
      writtenDate: "9시간 전",
      isLiked: false,
      likeCount: 120,
    }
  }

  _handlePublishing(isPulished){
    this.setState(function(prevState){
      if(isPulished) {
        return {isPulished:false}
      } else {
        return {isPulished:true}
      }
    });
  }

  _handleLikeStatus(isLiked){
    this.setState(function(prevState){
      if(isLiked) {
        return {isLiked:false, likeCount: prevState.likeCount -1}
      } else {
        return {isLiked:true, likeCount: prevState.likeCount +1}
      }
    });
  }

  render(){
    const { isPulished, conText, writtenDate, isLiked, likeCount  } = this.state;
    
    return (
      <Wrap>  
        <FirstRow>
          <DateBox>
            <DateText>2018.01.01 - 2018.01.01</DateText>
          </DateBox>
          <WeatherBox>
            <MaterialCommunityIcons name="weather-sunny" color="#fff" size={20} style={{marginLeft:3}}/>
            <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={20} style={{marginLeft:3}} />
          </WeatherBox>
        </FirstRow>
        <TitBox>
          <TitText>45일동안 서유럽 한바퀴, 45days in Wetern Europe</TitText>
          <BorderBox></BorderBox>
        </TitBox>
        <TextBox>
          <ConText numberOfLines={3}>{conText}</ConText>
        </TextBox>
        <LastRow>
          <LikeBox>
              <BtnLike onPressOut={() => this._handleLikeStatus(isLiked)}>
                {isLiked ? (
                  <Ionicons name="md-heart" color="#EC4568" size={13} />
                  ) : (
                  <Ionicons name="md-heart-outline" color="#fff" size={13} />
                  )
                }
                <LikeNum>{likeCount}</LikeNum>
              </BtnLike>
            </LikeBox>
          <WrittenDate> · {writtenDate}</WrittenDate>
        </LastRow>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  padding: 7% 10%;
  margin-bottom:7%;
  background:#5ED9FF;
  border-radius: 10px;
`;

const FirstRow = styled.View`
  margin-bottom: 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TitBox = styled.View`
  position:relative;
`;

const TitText = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const BorderBox = styled.View`
  position:absolute;
  width: ${width * 0.774};
  bottom: -10px;
  margin-top:5px;
  height:5px;
  border-bottom-width: 5px;
  border-bottom-color: #efefef;
`;

const TextBox = styled.View`
  margin-top:12%;
  height:46px;
`;

const ConText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const LastRow = styled.View`
  margin-top:15px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;


const LikeBox = styled.View`
  flex-direction: row;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: NanumGothic;
  margin-left:3px;
  color:#fff;
  font-size:12px;
  font-weight:500;
`;

const WrittenDate = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:12px;
`;