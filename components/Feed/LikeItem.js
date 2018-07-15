import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class LikeItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(
        <Wrap>
          <ConBox>
            <Tit>45days in Western Europe</Tit>
            <Con>을 <Strong>Nickname2</Strong> 회원님 <Strong>외 7명</Strong>이 좋아합니다.</Con>
            <TimeBox>
              <New></New>
              <Time>10분 전</Time>
            </TimeBox>
          </ConBox>
          <ConBox>
            <Tit>45days in Western Europe</Tit>
            <Con>을 <Strong>Nickname2</Strong> 회원님이 좋아합니다.</Con>
            <TimeBox>
              <Time>5시간 전</Time>
            </TimeBox>
          </ConBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
`;

const ConBox = styled.View`
  padding: 7% 5%;
  border-bottom-color:#ddd;
  border-bottom-width: 1px;
`;

const TimeBox = styled.View`
  margin-top:20px;
  flex-direction:row;
  justify-content: flex-end;
`;

const New = styled.View`
  width:14px;
  height:14px;
  margin-right:5px;
  border-radius: 7px;
  background:#EF3774;
`;

const Tit = styled.Text`
  font-size:18px;
  color: #333;
  font-family : NanumGothic;
`;

const Con = styled.Text`
  margin-top:4px;
  font-size:14px;
  color:#666;
  font-family : NanumGothic;
`;

const Strong = styled.Text`
  font-size:14px;
  color:#666;
  font-family : NanumGothic;
`;

const Time = styled.Text`
  font-size:14px;
  color:#999;
  font-family : NanumGothic;
`;