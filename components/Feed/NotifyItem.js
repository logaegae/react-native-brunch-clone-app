import React, { Component } from 'react'
import styled from 'styled-components';
import timeAgo from '../../lib/timeAgo';

export default class NotifyItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    const { title, confirmed, registedDate, alarmType } = this.props.data;
    const typeMessage = {
      publish : "을 발행하였습니다.",
      unpublish : "이 발행취소되었습니다.",
      delete : "이 삭제되었습니다.",
      new : "이 만들어졌습니다.",
      update : "이 수정되었습니다.",
    }
    return(
        <Wrap>
          <ConBox>
            <Tit>{title}</Tit>
            <Con>{typeMessage[alarmType]}</Con>
            <TimeBox>
              {!confirmed ? <New></New> : null}
              <Time>{timeAgo(registedDate)}</Time>
            </TimeBox>
          </ConBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
`;

const ConBox = styled.View`
  padding: 7% 5%;
  border-bottom-color:#ddd;
  border-bottom-width: 1px;
`;

const TimeBox = styled.View`
  margin-top:20px;
  flex-direction:row;
  justify-content: flex-end;
`;

const New = styled.View`
  width:14px;
  height:14px;
  margin-right:5px;
  border-radius: 7px;
  background:#FFCD19;
`;

const Tit = styled.Text`
  font-size:18px;
  color: #333;
  font-family : NanumGothic;
`;

const Con = styled.Text`
  margin-top:4px;
  font-size:14px;
  color:#666;
  font-family : NanumGothic;
`;

const Strong = styled.Text`
  font-size:14px;
  color:#666;
  font-family : NanumGothic;
`;

const Time = styled.Text`
  font-size:14px;
  color:#999;
  font-family : NanumGothic;
`;