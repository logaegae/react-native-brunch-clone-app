import React, {Component} from 'react';
import {ScrollView, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';

const { height, width } = Dimensions.get("window");

const UnsignedContent = (props) => {
  return (
    <Center>
      <StartButtonTO onPress={()=>{props.navigation.navigate("SignIn")}}>
        <StartButton>Begin My Travel</StartButton>
      </StartButtonTO>
    </Center>
  );
}

const SignedContent = (props) => {
  return (
    <View>
      <ProfileBox onPressOut={() => {props.navigation.navigate('Mypage')}}>
        <ProfileImgBox source={require('../../assets/siba.jpg')}/>
        <UserNickname>siba</UserNickname>
      </ProfileBox>
      <BtnBox>
        <Button onPressOut={() => props.navigation.navigate('New')}>
          <BtnText>글 쓰기</BtnText>
        </Button>
        <Button onPressOut={() => props.navigation.navigate('Drawer')}>
          <BtnText>글 관리</BtnText>
        </Button>
      </BtnBox>
      <IconBox>
        <IconBtn onPressOut={() => props.navigation.navigate('Notify')}>
          <IconNew yellow></IconNew>
          <MaterialCommunityIcons name="bell-outline" color="#fff" size={30} />
        </IconBtn>
        <IconBtn onPressOut={() => props.navigation.navigate('Like')}>
          <IconNew pink></IconNew>
          <MaterialCommunityIcons name="heart-outline" color="#fff" size={30} style={{marginTop:5}}/>
        </IconBtn>
      </IconBox>
    </View>
  );
}

class SideMenu extends Component {
  render () {
    return (
      <Container>
        <ScrollView>
          <CloseBox>
            <TouchableOpacity onPress={this.props.navigation.closeDrawer}>
              <Ionicons size={50} name="md-close" color="#333"/>
            </TouchableOpacity>
          </CloseBox>
          <Title>Trable</Title>
          <TitleLineBox>
            <TitleLine></TitleLine>
          </TitleLineBox>
          <View>
            <UnsignedContent navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  padding : 40px 10px;
`;
const Center = styled.View`
  align-items : center;
`;
const CloseBox = styled.View`
  flex-direction : row;
  justify-content : flex-end;
`;
const Title = styled.Text`
  width : 100%;
  font-size : 50px;
  padding-left : 10px;
  font-family : NanumGothic-bold;
`;
const TitleLineBox = styled.View`
  padding-left : 50px;
  padding-top : 2px;
  margin-bottom : 30px;
`;
const TitleLine = styled.Text`
  background : ${Theme.mainColor};
  width : 100%;
  height : 3px;
  font-family : NanumGothic;
`;
const Menu = styled.Text`
  width : 100%;
  font-size : 25px;
  padding : 20px;
  border : 1px #333 solid;
  font-family : NanumGothic;
`;
const StartButtonTO = styled.TouchableOpacity`
  width : 220px
  padding : 15px 0;
  border-radius : 30px;
  border : 2px solid ${Theme.mainColor};
`
const StartButton = styled.Text`
  width : 100%;
  color : ${Theme.mainColor}
  text-align : center;
  font-size : 22px;
  font-family : NanumGothic;
`;
const ProfileBox = styled.TouchableOpacity`
  flex: 3;
  flex-direction: column;
  align-items:center;
`;

const ProfileImgBox = styled.Image`
  margin-bottom:10px;
  width : 150px;
  height : 150px;
  border-radius : 75px;
  background-color : transparent;
`;

const UserNickname = styled.Text`
  color:#333;
  font-size:25px;
  font-weight:500;
  font-family : NanumGothic;
`;

const BtnBox = styled.View`
  flex: 4;
  margin-top:20%;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom:15px;
  width:150px;
  height:44px;
  justify-content: center;
  align-items: center;
  border: 1px #ccc solid;
  border-radius: 22px;
`;

const IconBox = styled.View`
  margin-top : 20px;
  flex: 4;
  flex-direction:row;
  justify-content: center;

`;

const IconBtn = styled.TouchableOpacity`
  margin: 0 8px;
  width:60px;
  height:60px;
  border-radius:30px;
  justify-content: center;
  align-items: center;
  background: #ccc;
`;


const IconNew = styled.View`
  position: absolute;
  top:0; 
  right:0;
  width:18px;
  height:18px;
  border-radius:9px;
  background-color: ${props => {
        if(props.yellow){
          return `#FFCD19`
        } else if(props.pink){
          return `#EF3774`
        }
    }}
`;

const Logo = styled.Text`
  font-size: 30px;
  color:#999;
  font-family : NanumGothic;
`;

const BtnText = styled.Text`
  color:#333;
  font-size:15px;
  font-family : NanumGothic;
`;

export default withNavigation(SideMenu);