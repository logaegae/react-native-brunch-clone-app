import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import timeAgo from '../../lib/timeAgo';
import { withNavigation } from 'react-navigation';
import ToggleLike from '../Common/ToggleLike';

const { height, width } = Dimensions.get("window");

class WriterViewItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render(){
    const { _id, startDate, finishDate, weather, title, text, writtenDate, updatedDate, bgStyle, isLiked, __id } = this.props;
    return (
      <Wrap>  
        <Wrapper bg={!bgStyle.photoUrl ? 
          ( "background-color:" + bgStyle.backgroundColor) : null }>
          {!bgStyle.backgroundColor ? (
            <BgBox>
              <BgImage source={{ uri: bgStyle.photoUrl }} />
              <BgMask></BgMask>
            </BgBox>
          ) : null }
          <FirstRow>
            <DateBox>
            <DateText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</DateText>
            </DateBox>
            <WeatherBox>
              <MaterialCommunityIcons name={weather} color="#fff" size={20} style={{marginLeft:3}}/>
            </WeatherBox>
          </FirstRow>
          <TouchableOpacity onPress={() => this.props.navigation.push('ArticleView',{item : this.props})}>
            <TitBox>
              <TitText>{title}</TitText>
              <BorderBox></BorderBox>
            </TitBox>
            <TextBox>
              <ConText numberOfLines={2}>{text}</ConText>
            </TextBox>
          </TouchableOpacity>
          <LastRow>
            <ToggleLike heartSize={15} numSize={15} isLiked={isLiked} _id={_id}/>
            <UpdatedDate> · {updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</UpdatedDate>
          </LastRow>
        </Wrapper>  
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  margin-bottom:8%;
`;

const Wrapper = styled.View`
  position: relative;
  padding:7% 10%;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  ${prop => prop.bg}; 
`;

const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  border-radius: 10px;
`;

const BgImage = styled.Image`
  width: 100%;
  height:100%;
`;

const BgMask = styled.View`
  position:absolute;
  width: 100%;
  height:100%;
  backgroundColor: rgba(0,0,0,0.5);
`;

const FirstRow = styled.View`
  margin-bottom: 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
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
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const BorderBox = styled.View`
  position:absolute;
  width: ${width * 0.774};
  bottom: -10px;
  margin-top:5px;
  height:5px;
  border-bottom-width: 5px;
  border-bottom-color: #efefef;
`;

const TextBox = styled.View`
  margin-top:12%;
  height:46px;
`;

const ConText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const LastRow = styled.View`
  margin-top:15px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;


const LikeBox = styled.View`
  flex-direction: row;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: NanumGothic;
  margin-left:3px;
  color:#fff;
  font-size:12px;
  font-weight:500;
`;

const UpdatedDate = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:12px;
`;

export default withNavigation(WriterViewItem);