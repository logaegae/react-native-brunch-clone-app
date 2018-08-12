import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class ContentItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      conText: `봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐`,
      isPulished: false,
      writtenDate: "9시간 전",
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
  
  
  render(){
    const { isPulished, text, writtenDate, updatedDate, title, bgStyle, startDate, finishDate, weather } = this.props;
    
    return (
      <Wrap backgroundColor={!bgStyle.photoUrl ? bgStyle.backgroundColor : "transparent"}>  
        <ControlBox>
          <BtnPublishing onPressOut={() => this._handlePublishing(isPulished)} visual={isPulished}>
            <TextPublishing color={!bgStyle.photoUrl ? bgStyle.backgroundColor : "black"} visual={isPulished}>{!isPulished ? ("발행") : ("발행 취소")}</TextPublishing>
          </BtnPublishing>
          <BtnEdit>
            <Entypo name="dots-three-vertical" color="#fff" size={20} />
          </BtnEdit>
        </ControlBox>
        <FirstRow>
          <DateBox>
            <DateText>{startDate}{finishDate? ' - '+finishDate : ''}</DateText>
          </DateBox>
          <WeatherBox>
            <MaterialCommunityIcons name={weather ? weather : "weather-sunny"} color="#fff" size={34} style={{marginLeft:3}}/>
          </WeatherBox>
        </FirstRow>
        <TitBox>
          <TitText>{title}</TitText>
          <BorderBox></BorderBox>
        </TitBox>
        <TextBox>
          <ConText numberOfLines={3}>{text}</ConText>
        </TextBox>
        <WrittenDate>{updatedDate ? updatedDate.replace('T'," ").replace(".736Z","") : writtenDate.replace('T'," ").replace(".736Z","")}</WrittenDate>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  padding: 7% 10%;
  margin-bottom:7%;
  background-color:${prop=>prop.backgroundColor};
  border-radius: 10px;
`;


const ControlBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BtnPublishing = styled.TouchableOpacity`
  padding: 1px 10px 0;
  height:28px;
  align-items: center;
  justify-content: center;
  border:1px #fff solid;
  border-radius: 14px;
  background-color:transparent;
  ${props => { if(!props.visual) return `background-color:#fff;` } }
`
const TextPublishing = styled.Text`
  font-family: 'NanumGothic';
  color:${prop=>prop.color};
  font-size:14px;
`;

const BtnEdit = styled.TouchableOpacity`
  margin-right:-10px;
`

const FirstRow = styled.View`
  margin: 10% 0 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: 'NanumGothic';
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
  font-family: 'NanumGothic-bold';
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
`;

const ConText = styled.Text`
  font-family: 'NanumGothic';
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const WrittenDate = styled.Text`
  margin-top:15px;
  text-align:right;
  font-family: 'NanumGothic';
  color:#fff;
  font-size:12px;
  width:100%;
  height:20px;
`;