import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class Mypage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPw: "",
      newPw: "",
      confirmPw: "",
    }
  }
  
  render(){
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Mypage')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>비밀번호 변경</H1>
          </HeaderBox>
          <InputBox>
            <InputWrap>
               <InputText 
                value={this.state.currentPw}
                onChangeText={(currentPw) => this.setState({currentPw: currentPw})}
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
              />
            </InputWrap>
             <InputWrap>
               <InputText 
                value={this.state.newPw}
                onChangeText={(newPw) => this.setState({newPw: newPw})}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
              />
            </InputWrap>
             <InputWrap>
               <InputText 
                value={this.state.confirmPw}
                onChangeText={(confirmPw) => this.setState({confirmPw: confirmPw})}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
              />
            </InputWrap>
            <Button onPressOut={this.props.requestLogin}>
              <BtnText>Submit</BtnText>
            </Button>
          </InputBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-top: 5%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  flex: 1.2;
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
  font-family: 'hd-regular';
`;

const InputBox = styled.View`
  flex: 8.8;
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-top: 25px;
  width: ${width * 0.7};
  height:40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color:#666;
  border-bottom-width: 2px;
`;

const InputText = styled.TextInput`
  padding: 5px 0;
  width: ${width * 0.7};
  font-family: 'hd-regular';
  font-size: 15px;
  color:#333;
`;

const Button = styled.TouchableOpacity`
  margin-top:30px;
  width: ${width * 0.7};
  height: 60px;
  justify-content: center;
  align-items:center;
  border-radius:30px;
  background:#666;
`;

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: 16px;
  color:#fff;
`