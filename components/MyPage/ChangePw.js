import React, { Component } from 'react'
import { Dimensions, TextInput, findNodeHandle } from 'react-native';
import styled from 'styled-components';
import Header from '../Common/ContentHeader';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");
import { requestChangePw, authInit } from '../../actions';
import { ScrollViewSmart } from 'react-native-scrollview-smart';

const pwPattern = /((?=.*\d)(?=.*[a-zA-Z]).{6,20})/;

class ChangePw extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.auth.login.id,
      currentPw: "",
      newPw: "",
      confirmPw: "",
      profileImg : this.props.login.profileImg
    };
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }
  
  scrollOnFocus = inputName => () => {
    this.scroll.inputFocused(
      findNodeHandle(this[inputName]),
    );
  }

  componentDidMount() {
    if(!this.props.auth.login.logged) this.props.navigation.navigate("Home");
  }

  componentDidUpdate(prevProps) {
    if(prevProps.auth !== this.props.auth) {
      const { http } = this.props.auth;
      if( http.result === 'SUCCESS' && http.status === 'SUCCESS') {
        this.props.authInit();
        this.props.navigation.navigate("Home");
      }
      this.setState({
        currentPw : "",
        newPw : "",
        confirmPw : ""
      });
    }
  }

  render(){
    let UserInfo = this.state;
    const Token = this.props.auth.login.token;
    const checkValid = () => {

      initForm = (message) => {
        alert(message);
        this.setState({
          currentPw : "",
          newPw : "",
          confirmPw : ""
        });
      }
      if(UserInfo.currentPw === UserInfo.newPw){
        initForm("같은 비밀번호로 변경할 수 없습니다");
        return false;
      }
      if(!UserInfo.newPw.match(pwPattern)) {
        initForm("비밀번호는 숫자와 문자를 혼합하여 6-20자만 가능합니다");
        return false;
      }
      if(UserInfo.newPw !== UserInfo.confirmPw) {
        initForm("비밀번호를 다시 확인해주세요");
        return false;
      }
      UserInfo.id = this.props.auth.login.id;
      delete UserInfo.confirmPw;
      this.props.requestChangePw(UserInfo, Token);
    }
    return(
      <ScrollViewSmart
        ref={e => (this.scroll = e)}
        style={{flex: 1}}
        keyboardShouldPersistTaps={'never'}
      >
        <Wrap>
          <Header title="비밀번호 변경" />
          <InputBox>
            <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.currentPw}
                onChangeText={(currentPw) => this.setState({currentPw: currentPw})}
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCorrect={false}
                autoFocus={true}
                returnKeyType={'next'}
                ref={e => (this.input1 = e)}
                onFocus={this.scrollOnFocus('input1')}
                onSubmitEditing={() => { this.input2.focus(); }}
              />
            </InputWrap>
            <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.newPw}
                onChangeText={(newPw) => this.setState({newPw: newPw})}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
                returnKeyType={'next'}
                ref={e => (this.input2 = e)}
                onFocus={this.scrollOnFocus('input2')}
                onSubmitEditing={() => { this.input3.focus(); }}
              />
            </InputWrap>
            <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.confirmPw}
                onChangeText={(confirmPw) => this.setState({confirmPw: confirmPw})}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
                returnKeyType={'done'}
                ref={e => (this.input3 = e)}
                onFocus={this.scrollOnFocus('input3')}
              />
            </InputWrap>
            <Button onPress={() => { checkValid() }}>
              <BtnText>Submit</BtnText>
            </Button>
          </InputBox>
        </Wrap>
      </ScrollViewSmart>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestChangePw : (userInfo, token) => {
      return dispatch(requestChangePw(userInfo, token));
    },
    authInit : () => {
      return dispatch(authInit());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePw);

const Wrap = styled.View`
  flex: 1;
  margin-top: 8%;
  height: ${height - (height * 0.08)};
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
  font-family: NanumGothic;
`;

const InputBox = styled.View`
  height: ${height - 50 - (height * 0.08)};
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
  font-family: NanumGothic;
  font-size: 15px;
  color:#333;
`;

const InputTextStyle = {
  paddingVertical: 5,
  width: width * 0.7,
  fontFamily: 'NanumGothic',
  fontSize: 15,
  color: "#333"
}

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
  font-family: NanumGothic-bold;
  font-size: 16px;
  color:#fff;
`