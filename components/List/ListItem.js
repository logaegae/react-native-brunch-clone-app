import React, { Component } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import timeAgo from '../../lib/timeAgo';

const { height, width } = Dimensions.get("window");

class ListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    const { _id, title, text, startDate, finishDate, weather, bgStyle, updatedDate, __id, isLiked } = this.props;
    
    // bgStyle.backgroundColor = ""
    // bgStyle.photoUrl = "http://holotrip.co.kr/wp-content/uploads/2017/05/%EC%97%90%ED%8E%A01.jpg";
    // bgStyle.backgroundColor = "#ccc"
    //bgStyle.photoUrl = ""
    //__id.profileImg = "http://t1.daumcdn.net/friends/prod/editor/fe1fbe7c-4c82-446e-bc5c-f571d90b0ba9.jpg";

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
          <WriterBox onPress={() => this.props.navigation.navigate('WriterView',{writer_id : __id._id})}>
            <ProfileImgBox source={{ uri: __id.profileImg }} />
            <WriterNickname>{__id.name}</WriterNickname>  
          </WriterBox> 
          <FirstRow>
            <DateBox>
              <DateText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</DateText>
            </DateBox>
            <WeatherBox>
              <MaterialCommunityIcons name={weather} color="#fff" size={20} style={{marginLeft:3}}/>
            </WeatherBox>
          </FirstRow>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleView',{item : this.props})}>
            <TitBox>
              <TitText>{title}</TitText>
              <BorderBox></BorderBox>
            </TitBox>
            <TextBox>
              <ConText numberOfLines={2}>{text}</ConText>
            </TextBox>
          </TouchableOpacity>
          <Row>
            <LikeBox>
              {isLiked && isLiked.indexOf(__id.name) != -1 ? (
                <BtnLike onPress={()=>{this.props._handleLike(_id)}}>
                  <Ionicons name="md-heart" color="#EC4568" size={13} />
                  <LikeNum>{isLiked.length}</LikeNum>
                </BtnLike>
                ) : (
                <BtnLike onPress={()=>{this.props._handleLike(_id)}}>
                  <Ionicons name="md-heart-outline" color="#fff" size={13}/>
                  <LikeNum>{isLiked.length}</LikeNum>
                </BtnLike>
              )}
            </LikeBox>
            <UpdatedDate> · {updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</UpdatedDate>
          </Row>
        </Wrapper>
      </Wrap>
    )
  }
}

export default withNavigation(ListItem);
    
const Wrap = styled.View`
  margin-bottom:7%;
  border-radius: 10px;
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

const WriterBox = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:15px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 30px;
    height : 30px;
    border-radius : 15px;
    margin-right : 7px;
    background-color : transparent;
`;
const FirstRow = styled.View`
  margin: 3% 0 10%;
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
  overflow:hidden;
  margin-top:12%;
  height:46px;
`;

const ConText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const Row = styled.View`
  margin-top:15px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LikeBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: NanumGothic;
  margin-left:3px;
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const UpdatedDate = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:13px;
`;