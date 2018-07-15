import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import LikeItem from './LikeItem';

const { height, width } = Dimensions.get("window");

export default class Like extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>좋아요</H1>
          </HeaderBox>
          <ScrollView>
            <ConBox>
              <LikeItem />
              <LikeItem />
              <LikeItem />
              <LikeItem />
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
`;

const BtnIcon = styled.TouchableOpacity`
`;

const H1 = styled.Text`
  z-index:-1;
  position:absolute;
  width: ${width};
  align-items: center;
  text-align:center;
  font-size:20px;
  font-family : NanumGothic;
`;

const ConBox = styled.View`
  flex: 8.8;
`;