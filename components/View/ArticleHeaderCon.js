import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class ArticleHeaderCon extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){

    const { writtenDate, title, startDate, finishDate, writer } = this.state;

    return(
        <Wrap>
          <ConBox>
            <WeatherBox>
              <MaterialCommunityIcons name="weather-sunny" color="#fff" size={22} style={{marginLeft:3, marginRight:3}}/>
              <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={22} style={{marginLeft:3, marginRight:3}} />
            </WeatherBox>
            <DateBox>
              <DateText>{startDate ? startDate : ''}{finishDate? ' - '+finishDate : ''}</DateText>
            </DateBox>
            <TitBox>
              <TitText>{title}</TitText>
              <BorderBox></BorderBox>
            </TitBox>
          </ConBox>
          <Row>
            <WriterBox>
              <ProfileImgBox source={require('../../assets/siba.jpg')}/>
              <WriterNickname>{writer.name}</WriterNickname>
            </WriterBox>              
          </Row>       
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  background-color: transparent;
`;

const ConBox = styled.View`
  padding: 3% 7% 0;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DateBox = styled.View`
  margin: 7% 0 5%;
`;

const DateText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:13px;
  font-weight:500;
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
  width: ${width};
  bottom: -10px;
  margin-top:5px;
  height:5px;
  border-bottom-width: 5px;
  border-bottom-color: #efefef;
`;

const Row = styled.View`
  padding: 12% 7% 8%;
  flex-direction: row;
  align-items: center;
`;

const WriterBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:17px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 40px;
    height : 40px;
    border-radius : 20px;
    margin-right : 7px;
    background-color : transparent;
`;

const WrittenDate = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:12px;
`;