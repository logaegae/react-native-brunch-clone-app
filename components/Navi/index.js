import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';

import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import { connect } from 'react-redux';
import { notifyIconReapeat, clearNotifyIconReapeat, likeIconReapeat, clearLikeIconReapeat } from '../../actions'

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
      <ProfileBox onPress={() => {props.navigation.navigate('MyPage')}}>
        <ProfileImgBox source={{uri:props.profileImg}}/>
        <UserNickname>{props.name}</UserNickname>
      </ProfileBox>
      <BtnBox>
        <Button onPress={() => props.navigation.navigate('New')}>
          <BtnText>글 쓰기</BtnText>
        </Button>
        <Button onPress={() => props.navigation.navigate('Drawer')}>
          <BtnText>글 관리</BtnText>
        </Button>
      </BtnBox>
      <IconBox>
        <IconBtn onPress={() => props.navigation.navigate('Notify')}>
          {props.notifyIcon ? <IconNew yellow></IconNew> : null}
          <MaterialCommunityIcons name="bell-outline" color="#fff" size={30} />
        </IconBtn>
        <IconBtn onPress={() => props.navigation.navigate('Like')}>
          {props.likeIcon ? <IconNew pink></IconNew> : null}
          <MaterialCommunityIcons name="heart-outline" color="#fff" size={30} style={{marginTop:5}}/>
        </IconBtn>
      </IconBox>
    </View>
  );
}

class SideMenu extends Component {

  componentDidUpdate(prevProps) {
    if(prevProps.login.logged !== this.props.login.logged && this.props.login.logged && this.props.login.token) {
      this.props.notifyIconReapeat(this.props.login.token);
      this.props.likeIconReapeat(this.props.login.token);
    }
    if(prevProps.alarm.notifyIcon !== this.props.alarm.notifyIcon && !this.props.alarm.notifyIcon) {
      this.props.notifyIconReapeat(this.props.login.token);
    }
    if(prevProps.alarm.notifyIcon !== this.props.alarm.notifyIcon && this.props.alarm.notifyIcon) {
      this.props.clearNotifyIconReapeat();
    }
    if(prevProps.alarm.likeIcon !== this.props.alarm.likeIcon && !this.props.alarm.likeIcon) {
      this.props.likeIconReapeat(this.props.login.token);
    }
    if(prevProps.alarm.likeIcon !== this.props.alarm.likeIcon && this.props.alarm.likeIcon) {
      this.props.clearLikeIconReapeat();
    }
  }

  render () {
    const { notifyIcon, likeIcon } = this.props.alarm;
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
            {this.props.login.logged ? <SignedContent navigation={this.props.navigation} profileImg={this.props.login.profileImg} name={this.props.login.name} notifyIcon={notifyIcon} likeIcon={likeIcon}/> : <UnsignedContent navigation={this.props.navigation} /> }
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  padding : 0 10px;
  background-color : #FFF;
`;
const Center = styled.View`
  align-items : center;
`;
const CloseBox = styled.View`
  margin-top : 30px;
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
  padding-top : 30px;
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

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    alarm : state.redux.alarm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    notifyIconReapeat : (token) => {
      return dispatch(notifyIconReapeat(token));
    },
    clearNotifyIconReapeat : () => {
      return dispatch(clearNotifyIconReapeat());
    },
    likeIconReapeat : (token) => {
      return dispatch(likeIconReapeat(token));
    },
    clearLikeIconReapeat : () => {
      return dispatch(clearLikeIconReapeat());
    }
  };
}

const SideMenuWithNavi = withNavigation(SideMenu);
export default connect(mapStateToProps, mapDispatchToProps)(SideMenuWithNavi);