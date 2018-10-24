import React, { Component } from 'react';
import { Dimensions, TextInput, findNodeHandle } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { userSignUp, authInit } from '../../actions';
import { ScrollViewSmart } from 'react-native-scrollview-smart';

const { height, width } = Dimensions.get("window");

const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const pwPattern = /((?=.*\d)(?=.*[a-zA-Z]).{6,20})/;

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      pw: "",
      cpw: "",
      nickname: "",
    };
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  scrollOnFocus = inputName => () => {
    this.scroll.inputFocused(
      findNodeHandle(this[inputName]),
    );
  }

  componentDidUpdate(prevProps) {
    if(prevProps.result !== this.props.result) {

      if(this.props.result === "SUCCESSED") {

        this.props.authInit();
        alert("회원가입이 완료되었습니다.");
        this.props.navigation.navigate("SignIn");

      }else if(this.props.result === "FAILED"){
        this.props.authInit();
      }
    }
  }
  
  render() {
    const userInfo = this.state;
    const checkValid = () => {

        initForm = (message) => {
          alert(message);
          this.setState({
            ...userInfo,
            pw : "",
            cpw : ""
          });
        }
        if(!userInfo.id.match(emailPattern)) {
          initForm("잘못된 이메일 형식입니다");
          return false;
        }
        if(!userInfo.pw.match(pwPattern)) {
          initForm("비밀번호는 숫자와 문자를 혼합하여 6-20자만 가능합니다");
          return false;
        }
        if(userInfo.pw !== userInfo.cpw) {
          initForm("비밀번호를 다시 확인해주세요");
          return false;
        }
        if(userInfo.nickname.length < 2 || userInfo.nickname.length > 10) {
          initForm("닉네임은 2자 이상 10자 이하로 입력해주세요");
          return false;
        }

        this.props.userSignUp(userInfo);

    }
    
    return (
      <ScrollViewSmart
        ref={e => (this.scroll = e)}
        style={{flex: 1, backgroundColor: "#9FA3A8"}}
        keyboardShouldPersistTaps={'never'}
      >
      <Wrap>
        <BtnBox>
          <BtnBack onPressOut={() => this.props.navigation.navigate('SignIn')}>
            <Ionicons name="ios-arrow-round-back" color="#fff" size={60} style={{marginLeft:15}}/>
          </BtnBack>
        </BtnBox>
         <LogoBox>
          <Logo>New Travel</Logo>
          <BorderBox></BorderBox>
        </LogoBox>
        <InputBox>          
          <InputWrap>
            <TextInput 
              style={InputTextStyle}
              onChangeText={(id) => this.setState({id: id.toLowerCase()})}
              placeholder="Email Address"
              placeholderTextColor="#fff"
              autoCorrect={false}
              autoFocus={true}
              returnKeyType={'next'}
              onFocus={this.scrollOnFocus('input1')}
              ref={e => {this.input1 = e}}
              onSubmitEditing={() => { this.input2.focus(); }}
            />
          </InputWrap>
          <InputWrap>
             <TextInput 
              style={InputTextStyle}
              value={this.state.pw}
              onChangeText={(pw) => this.setState({pw: pw})}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              autoCorrect={false}
              returnKeyType={'next'}
              ref={e => {this.input2 = e}}
              onFocus={this.scrollOnFocus('input2')}
              onSubmitEditing={() => { this.input3.focus(); }}
            />
          </InputWrap>
           <InputWrap>
            <TextInput 
              style={InputTextStyle}
              onChangeText={(cpw) => this.setState({cpw: cpw})}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry
              autoCorrect={false}
              returnKeyType={'next'}
              ref={e => (this.input3 = e)}
              onFocus={this.scrollOnFocus('input3')}
              onSubmitEditing={() => { this.input4.focus(); }}
            />
          </InputWrap>
           <InputWrap>
            <TextInput 
              style={InputTextStyle}
              onChangeText={(nickname) => this.setState({nickname: nickname})}
              placeholder="Nickname"
              placeholderTextColor="#fff"
              returnKeyType={"done"}
              autoCorrect={false}
              ref={e => (this.input4 = e)}
              onFocus={this.scrollOnFocus('input4')}
            />
          </InputWrap>
          <P>* 닉네임은 마이페이지에서 변경할 수 있어요.</P>
          <Button onPressOut={()=>{checkValid()}} >
            <BtnText>Sign Up</BtnText>
          </Button>
        </InputBox>
      </Wrap> 
      </ScrollViewSmart>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.redux.auth.http.status,
    result: state.redux.auth.http.result,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp: (userInfo) => {
      return dispatch(userSignUp(userInfo));
    },
    authInit: () => {
      return dispatch(authInit());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const Wrap = styled.View`
  flex: 1;
  height: ${height};
`;

const BtnBox = styled.View`
  height: ${height * 0.15};
  align-items: flex-end; 
  flex-direction: row;
  justify-content: flex-start;
`;

const BtnBack = styled.TouchableOpacity`
  align-items: flex-end; 
`;

const Button = styled.TouchableOpacity`
  width: ${width * 0.7};
  height: 60px;
  justify-content: center;
  align-items:center;
  border-radius:30px;
  background:#333;
  ${props => {
      if(props.small){
          return `height:40px; border: 1px #fff solid; border-radius: 20px; background-color: transparent;`
      }
  }}
`;

const LogoBox = styled.View`  
  margin-left:18%;
  height: ${height * 0.10};
  justify-content: flex-end;
`;

const BorderBox = styled.View`
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const InputBox = styled.View`
  height: ${height * 0.75};
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-top: 15px;
  width: ${width * 0.7};
  height:40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color:#fff;
  border-bottom-width: 2px;
`;

const InputTextStyle = {
  paddingVertical: 5,
  width: width * 0.7,
  fontFamily: 'NanumGothic',
  fontSize: 18,
  color: "#fff"
};

const Logo = styled.Text`
  font-family: NanumGothic;
  font-size: 40px;
  color:#fff;
`;

const BtnText = styled.Text`
  font-family: NanumGothic-bold;
  font-size: ${props => props.fs14 ? ("14px;") : ("16px;")}
  color:#fff;
`

const P = styled.Text`
  width: ${width * 0.7};
  margin: 10px 0 40px;
  font-family: NanumGothic;
  font-size:14px;
  color:#fff;
`