import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import timeAgo from '../../lib/timeAgo';
import ToggleLike from '../Common/ToggleLike';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class ArticleItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    const { _id, title, text, isLiked, __id, startDate, finishDate, writtenDate, updatedDate, weather } = this.props;
    const item = this.props;
    
    return (
      <Wrap>  
        <Wrapper>
          <FirstRow>
            <DateBox>
              <DateText>{startDate ? startDate : ''}{finishDate? ' - '+finishDate : ''}</DateText>
            </DateBox>
            <WeatherBox>
            <MaterialCommunityIcons name={weather} color="#999" size={20} style={{marginLeft:3}}/>
            </WeatherBox>
          </FirstRow>
          <Link onPress={() => this.props.navigation.navigate('ArticleView', {item})}>
            <TitBox>
              <TitText>{title}</TitText>
            </TitBox>
            <TextBox>
              <ConText numberOfLines={3}>{text}</ConText>
            </TextBox>
          </Link>
          <LastRow>
            <Link onPress={() => this.props.navigation.navigate('WriterView', {writer_id : __id._id})}>
              <WriterText>by. {__id.name}</WriterText>
            </Link>
            <RightBox>
              <ToggleLike 
                iconSize={14} iconColor="#666" numSize={13} textColor="#666" isLiked={isLiked} _id={_id} />
              <WrittenDateText> · {updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</WrittenDateText>
            </RightBox>
          </LastRow>  
        </Wrapper>  
      </Wrap>
    )
  }
}
    
export default withNavigation(ArticleItem);

const Wrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const Wrapper = styled.View`
  padding: 10% 7%;
`;

const Link = styled.TouchableOpacity`
`;

const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: 'NanumGothic';
  color:#666;
  font-size:13px;
  font-weight:500;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TitBox = styled.View`
  margin-top: 8%;
`;

const TitText = styled.Text`
  font-family: 'NanumGothic';
  color:#333;
  font-size:18px;
  line-height:23px;
  font-weight:600;
`;

const TextBox = styled.View`
  height:46px;
`;

const ConText = styled.Text`
  font-family: 'NanumGothic';
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
  font-family: 'NanumGothic';
  color:#666;
  font-size:13px;
`;

const RightBox = styled.View`
  flex-direction: row;
  align-items:center;
  justify-content: flex-end;
`;

const WrittenDateText = styled.Text`
  font-family: 'NanumGothic';
  color:#666;
  font-size:13px;
`;