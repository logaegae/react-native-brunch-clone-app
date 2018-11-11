import React, { Component } from 'react'
import { CameraRoll, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, Foundation } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logoutRequest, authInit, changeNameRequest } from '../../actions';
import Header from '../Common/ContentHeader';

const { height, width } = Dimensions.get("window");

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing : false,
      nickname : this.props.login.name
    }
  }

  componentDidMount() {
    if(!this.props.login.logged) this.props.navigation.navigate("Home");
  }

  componentDidUpdate(prevProps) {
    if(prevProps.login !== this.props.login) {
      
      if( !this.props.login.logged ) {
        this.props.authInit();
        this.props.navigation.navigate("Home");

      }else if( this.props.http.status === 'FAILED' || this.props.http.result === 'FAILED' ){
        this.props.authInit();
      }
    }
  }

  _handleCameraRoll = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };

   _handleChangeNickname(isEditing){
    
    const data = {
      id : this.props.login.id,
      _id : this.props.login._id,
      name : this.state.nickname
    }
    const token = this.props.login.token;
    this.setState(function(prevState){
      if(isEditing) {
        if(data.name !== this.props.login.name) this.props.changeNameRequest(data, token);
        return {isEditing:false}
      } else {
        return {isEditing:true}
      }
    });
  }

  render(){

    const { isEditing } = this.state;
    const token = this.props.login.token;
    
    return(
        <Wrap>
          <Header title="MY PAGE"/>
          <Contents>
            <ProfileBox>
              <ImgBox>
                <ProfileImgBox source={require('../../assets/siba.jpg')}/>
                <PhotoEditBtn onPress={this._handleCameraRoll}>
                  <Feather name="camera" color="#fff" size={20}/>
                </PhotoEditBtn>
              </ImgBox>
              <NicknameBox>
               {!isEditing ? (
                   <UserNickname ref={ref => {
                    this.nameInput = ref;
                  }}>{this.props.login.name}</UserNickname>
                   ) : (
                    <Input 
                      inputRef="NicknameInput"
                      value={this.props.login.name}
                      placeholder={this.props.login.name}
                      placeholderTextColor="#999"
                      autoFocus = {true}
                      onChangeText={(nickname) => this.setState({nickname: nickname})}
                    />
                   )
                }
              </NicknameBox>
              <BtnEdit onPress={() => this._handleChangeNickname(isEditing)}>
                <Foundation name="pencil" color="#666" size={20} />
              </BtnEdit>
            </ProfileBox>
            <BorderBox></BorderBox>
            <BtnBox>
              <Button borderType onPress={() => this.props.navigation.navigate('ChangePw')}>
                <BtnText borderType>비밀번호 변경</BtnText>
              </Button>
              <Button onPress={this.props.logoutRequest}>
                <BtnText>Sign Out</BtnText>
              </Button>
            </BtnBox>
          </Contents>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    http : state.redux.auth.http
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest : () => {
      return dispatch(logoutRequest());
    },
    changeNameRequest : (userInfo, token) => {
      return dispatch(changeNameRequest(userInfo, token));
    },
    authInit : () => {
      return dispatch(authInit());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);

const Wrap = styled.View`
  flex: 1;
  padding-top: 5%;
`;

const Contents = styled.View`
  flex: 8.8;
`;

const ProfileBox = styled.View`
  margin-top:10%;
  flex-direction: column;
  align-items:center;
`;

const BorderBox = styled.View`
  margin-left:15%;
  margin-top:10px;
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const ImgBox = styled.View`
  flex-direction:row;
  position:relative;
`
const PhotoEditBtn = styled.TouchableOpacity`
  position:absolute;
  right:0;
  bottom:0;
  justify-content: center;
  align-items:center;
  width:40px;
  height:40px;
  border-radius:20px;
  background:#18B0A3;
`

const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : transparent;
`;

const NicknameBox  = styled.View`
  margin-top:35px;
  flex-direction: row;
  align-items: center;
`
const UserNickname = styled.Text`
  color:#333;
  font-size:17px;
  font-weight:500;
`;

const Input = styled.TextInput`
  color:#333;
  font-size:17px;
`;

const BtnEdit = styled.TouchableOpacity`
  position:absolute;
  right:15px; 
  bottom:0;
`;

const BtnBox = styled.View`
  margin-top:20%;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom:15px;
  width: ${width * 0.7};
  height: 50px;
  justify-content: center;
  align-items:center;
  border-radius:25px;
  background:#bbb;
  ${props =>{
    if(props.borderType){
      return `border: 1px #ccc solid; background-color:transparent;`
    }
  }}
`;

const BtnText = styled.Text`
  font-size: 16px;
  color:#fff;
  ${props =>{
    if(props.borderType){
      return `color:#999;`
    }
  }}
`;