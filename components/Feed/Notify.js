import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import NotifyItem from './NotifyItem';
import Header from '../Common/ContentHeader';

export default class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      alarms : [],
      message : '로딩중'
    }
  }

  componentDidMount(){
    const obj = {
        id : this.props.login.id,
        includePublish : true
    };
    axios.post(domain+'/api/alarm/getUserAlarm', obj)
    .then((res) => {
        if(res.data.status === "ALARM_GET_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "ALARM_GET_SUCCESSED"){

            const alarms = res.data.data;

            let newState = {
                alarms
            }
            if(Object.keys(alarms).length === 0 ) {
                newState.message = "저장한 글이 없습니다.";
                newState.buttonShow = true;
            }else newState.message = "";

            this.setState(newState);
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
                : this._getArticleItems()
              }
              <NotifyItem />
              <NotifyItem />
              <NotifyItem />
              <NotifyItem />
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