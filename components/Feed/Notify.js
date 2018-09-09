import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { domain } from '../../config';
import NotifyItem from './NotifyItem';
import Header from '../Common/ContentHeader';
import { setAlarmIcon } from '../../actions';

class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      alarms : [],
      message : '로딩중'
    }
  }

  inverterHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getAlarmList();
    this.inverterHandler = setInterval(()=>{
      this.getAlarmList();
    },10000);
  }

  getAlarmList (obj) {
    const token = this.props.login.token;
    const header = {
      headers : {
          'x-access-token' : token
      }
    }
    axios.post(domain+'/api/alarm/getUserAlarm', obj, header)
    .then((res) => {
        if(res.data.status === "ALARM_GET_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "ALARM_GET_SUCCESSED"){

            const alarms = res.data.data;

            let newState = {
                alarms
            }
            if(Object.keys(alarms).length === 0 ) {
                newState.message = "알려드릴 게 없네요.";
            }else newState.message = "";

            this.setState(newState);
        }
    }).catch((error) => {
        alert("ERROR\n"+error.message);
    });
  }

  _getAlarmItems () {
    if(Object.keys(this.state.alarms).length === 0) return '';
    let indents = [];
    Object.values(this.state.alarms).forEach((e,i)=>{
        indents.push(<NotifyItem key={i} {...e} />);
    });
    return indents;
  }

  componentWillUnmount() {
    clearInterval(this.inverterHandler);

    const token = this.props.login.token;
    const header = {
      headers : {
          'x-access-token' : token
      }
    }
    axios.post(domain+'/api/alarm/confirmAlarm', {}, header)
    .then((res) => {
        if(res.data.status === "ALARM_SET_FAILED"){
          // alert('false');
        }else if(res.data.status === "ALARM_SET_SUCCESSED"){
          // alert('true');
          this.props.setAlarmIcon(false);
        }
    }).catch((error) => {
        alert("ERROR\n"+error.message);
    });
  }
  
  render(){
    const { alarms, message } = this.state;
    return(
        <Wrap>
          <Header title="알림" />
          <ScrollView>
            <ConBox>
              {Object.keys(alarms).length === 0
                ? (<NoItemText>{message}</NoItemText>)
                : this._getAlarmItems()
              }
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
const ConBox = styled.View`
  flex: 8.8;
`;
const NoItemText = styled.Text`
    width : 100%;
    padding : 7%;
    font-family : NanumGothic;
    font-size : 22px;
    text-align : center;
`;

const mapStateToProps = (state) => {
  return {
      login: state.redux.auth.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlarmIcon : (bool) => {
      return dispatch(setAlarmIcon(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);