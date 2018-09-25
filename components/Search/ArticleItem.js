import React, { Component } from 'react';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import timeAgo from '../../lib/timeAgo';
import ToggleLike from '../Common/ToggleLike';
import { withNavigation } from 'react-navigation';

class ArticleItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    const { title, text, isLiked, __id, startDate, finishDate, writtenDate, updatedDate, weather, _id } = this.props;
    return (
      <Wrap onPressOut={() => this.props.navigation.navigate('ArticleView',{item : this.props})}>  
        <FirstRow>
          <DateBox>
            <DateText>{startDate ? startDate : ''}{finishDate? ' - '+finishDate : ''}</DateText>
          </DateBox>
          <WeatherBox>
            <MaterialCommunityIcons name={weather} color="#999" size={20} style={{marginLeft:3}}/>
          </WeatherBox>
        </FirstRow>
        <TitBox>
          <TitText>{title}</TitText>
        </TitBox>
        <TextBox>
          <ConText numberOfLines={3}>{text}</ConText>
        </TextBox>
        <LastRow>
          <WriterText>by. {__id.name}</WriterText>
          <RightBox>
            <ToggleLike heartSize={13} numSize={13} numColor="#666" isLiked={isLiked} _id={_id} likeColor="#EC4568" unlikeColor="#666"/>
            <Dot></Dot>
            <WrittenDateText>{updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</WrittenDateText>
          </RightBox>
        </LastRow>
      </Wrap>
    )
  }
}

export default withNavigation(ArticleItem);
    
const Wrap = styled.TouchableOpacity`
  padding: 10% 7%;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const FirstRow = styled.View`
  margin-bottom: 7%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: NanumGothic;
  color:#666;
  font-size:13px;
  font-weight:500;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TitBox = styled.View`
  position:relative;
`;

const TitText = styled.Text`
  font-family: NanumGothic;
  color:#333;
  font-size:18px;
  line-height:23px;
  font-weight:600;
`;

const TextBox = styled.View`
  margin-top:5%;
  height:46px;
`;

const ConText = styled.Text`
  font-family: NanumGothic;
  color:#333;
  font-size:15px;
  line-height:22px;
`;

const LastRow = styled.View`
  margin-top: 8%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WriterText = styled.Text`
  font-family: NanumGothic;
  color:#666;
  font-size:13px;
`;

const RightBox = styled.View`
  flex-direction: row;
  align-items:center;
  justify-content: flex-end;
`;

const BtnLike = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Dot = styled.View` 
  margin:0 7px;
  width:2px;
  height:2px;
  background:#ccc;
  border-radius:1px;
`;

const WrittenDateText = styled.Text`
  font-family: NanumGothic;
  color:#666;
  font-size:13px;
`;