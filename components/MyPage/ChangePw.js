import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Header from '../Common/ContentHeader';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");
import { requestChangePw } from '../../actions';

const pwPattern = /((?=.*\d)(?=.*[a-zA-Z]).{6,20})/;

class ChangePw extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPw: "",
      newPw: "",
      confirmPw: "",
    }
  }

  componentDidMount() {
    if(!this.props.login.logged) this.props.navigation.navigate("Home");
  }
  
  render(){

    let userInfo = this.state;

    const checkValid = () => {

      initForm = (message) => {
        alert(message);
        this.setState({
          currentPw : "",
          newPw : "",
          confirmPw : ""
        });
      }

      if(!userInfo.newPw.match(pwPattern)) {
        initForm("비밀번호는 숫자와 문자를 혼합하여 6-20자만 가능합니다");
        return false;
      }
      
      if(userInfo.newPw !== userInfo.confirmPw) {
        initForm("비밀번호를 다시 확인해주세요");
        return false;
      }

      userInfo.id = this.props.login.id;
      const token = this.props.login.token;
      delete userInfo.confirmPw;
      this.props.requestChangePw(userInfo, token);

  }
  return(
      <Wrap>
        <Header title="비밀번호 변경" />
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
          <Button onPressOut={() => { checkValid() }}>
            <BtnText>Submit</BtnText>
          </Button>
        </InputBox>
      </Wrap>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestChangePw : (userInfo, token) => {
      return dispatch(requestChangePw(userInfo, token));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePw);

const Wrap = styled.View`
  flex: 1;
  padding-top: 5%;
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
  font-size: 16px;
  color:#fff;
`