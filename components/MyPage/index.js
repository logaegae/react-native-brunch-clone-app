import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, Foundation } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logoutRequest, authInit, changeNameRequest, changeProfilePictureRequest } from '../../actions';
import Header from '../Common/ContentHeader';
import CameraRoll from '../CameraRoll';
import { newBgPhoto } from '../../lib/postPicture'

const { height, width } = Dimensions.get("window");

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing : false,
      nickname : this.props.login.name,
      isCameraRollVisible : false,
      selectedImg : null,
      profileImg : this.props.login.profileImg
    }
    this._handleImage = this._handleImage.bind(this);
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

  _toggleModal = () => {
    this.setState({ 
      ...this.state,
      isCameraRollVisible : !this.state.isCameraRollVisible
    });
  };

  _handleImage = (selectedImg) => {
    const { token, name, id, _id } = this.props.login;
    this.setState({
        ...this.state,
        selectedImg
    },()=>{
      if(selectedImg && selectedImg[0]){
        const post = newBgPhoto(selectedImg[0], token);
        post.then(res => res.json())
        .then(data => {
          if(data.result !== 'SUCCESS'){
            alert("File upload Error");
            return false;
          }
          const toUploadObj = {
            ...this.props.login,
            name : name,
            profileImg : data.url
          };
          this.props.changeProfilePictureRequest(toUploadObj, token);
          this.setState({
            ...this.state,
            isCameraRollVisible : false
          })
        });
      }
    });
  }
    
   _handleChangeNickname(isEditing){
    
    const data = {
      ...this.props.login,
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

    const { isEditing, isCameraRollVisible } = this.state;
    const { token, profileImg } = this.props.login;

    return(
      <Container>
        {isCameraRollVisible ?
        <CameraRoll handleClose={this._toggleModal} handleImage={this._handleImage}/>
        :
        <Wrap>
          <Header title="MY PAGE"/>
          <Contents>
            <ProfileBox>
              <ImgBox>
                <ProfileImgBox source={{uri : profileImg}}/>
                <PhotoEditBtn onPress={this._toggleModal}>
                  <Feather name="camera" color="#fff" size={20}/>
                </PhotoEditBtn>
              </ImgBox>
                <NicknameBox>
                {!isEditing ? (
                    <UserNickname>{this.props.login.name}</UserNickname>
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
                  {!isEditing ? (
                    <Foundation name="pencil" color="#666" size={20} />
                  ) : (
                    <Feather name="check" color="#666" size={23} />
                  )}
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
      }
      </Container>
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
    changeProfilePictureRequest : (userInfo, token) => {
      return dispatch(changeProfilePictureRequest(userInfo, token));
    },
    authInit : () => {
      return dispatch(authInit());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);

const Container = styled.View`
  background-color : #FFF;
  flex : 1;
`;

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