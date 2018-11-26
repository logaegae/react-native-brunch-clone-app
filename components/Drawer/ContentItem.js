import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import timeAgo from '../../lib/timeAgo';

const { height, width } = Dimensions.get("window");

class EditItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  _handleUpdate(objToChange){
    const obj = {
      bgStyle : this.props.bgStyle,
      weather: this.props.weather,
      startDate : this.props.startDate,
      finishDate : this.props.finishDate,
      title: this.props.title,
      text : this.props.text,

      published: this.props.published,
      delYn : this.props.delYn,
      ...objToChange
    }
    this.props.handleUpdate(this.props._id, obj, Object.keys(objToChange)[0]);
  }
  
  render(){
    const { _id, text, updatedDate, title, bgStyle, startDate, finishDate, weather, published, handleModal } = this.props;

    // bgStyle.backgroundColor = ""
    // bgStyle.photoUrl = "http://holotrip.co.kr/wp-content/uploads/2017/05/%EC%97%90%ED%8E%A01.jpg";
    // bgStyle.backgroundColor = "#ccc"
    // bgStyle.photoUrl = ""

    return (
      <Wrap>
        <Wrapper bg={!bgStyle.photoUrl ? 
          ( "background-color:" + bgStyle.backgroundColor) : null }>
          {bgStyle.photoUrl ? (
            <BgBox>
              <BgImage source={{ uri: bgStyle.photoUrl }} />
              <BgMask></BgMask>
            </BgBox>
          ) : null }
          <ControlBox>
          <BtnPublishing onPress={() => this._handleUpdate({published : !published})} visual={published}>
              <TextPublishing visual={published} color={!bgStyle.photoUrl ? bgStyle.backgroundColor : "#444"}>{!published ? ("발행") : ("발행 취소")}</TextPublishing>
            </BtnPublishing>
            <BtnEdit onPress={() => handleModal(_id)}>
              <Entypo name="dots-three-vertical" color="#fff" size={20} />
            </BtnEdit>
          </ControlBox>
          <FirstRow>
            <DateBox>
              <DateText>{startDate ? startDate.split('T')[0] : ''}{finishDate? ' - '+finishDate.split('T')[0] : ''}</DateText>
            </DateBox>
            <WeatherBox>
              {weather ? 
                <MaterialCommunityIcons name={weather} color="#fff" size={20} style={{marginLeft:3}}/>
                :
                <MaterialCommunityIcons name="weather-sunny" color="transparent" size={20} style={{marginLeft:3}}/>
              }
            </WeatherBox>
          </FirstRow>
          <TitBox>
            <TitText>{title}</TitText>
            <BorderBox></BorderBox>
          </TitBox>
          <TextBox>
            <ConText numberOfLines={3} autoCorrect={false}>{text}</ConText>
          </TextBox>
          <WrittenDate>{updatedDate ? timeAgo(updatedDate, true) : timeAgo(writtenDate, true)}</WrittenDate>
        </Wrapper>
      </Wrap>
    )
  }
}

export default withNavigation(EditItem);


const Wrap = styled.View`  
  margin-bottom: ${width * 0.07};
  border-radius: 10px;  
`;

const Wrapper = styled.View`
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

const ControlBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BtnPublishing = styled.TouchableOpacity`
  padding: 1px 10px 0;
  height:28px;
  align-items: center;
  justify-content: center;
  border:1px #fff solid;
  border-radius: 14px;
  background-color:transparent;
  ${props => { if(!props.visual) return `background-color:#fff;` } }
`
const TextPublishing = styled.Text`
  font-family: 'NanumGothic';
  font-size:14px;
  color: ${props => props.visual ? "#fff" : props.color };
`;

const BtnEdit = styled.TouchableOpacity`
  margin-right:-10px;
`
const FirstRow = styled.View`
  margin: 10% 0 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: 'NanumGothic';
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
  font-family: 'NanumGothic-bold';
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
`;

const ConText = styled.Text`
  font-family: 'NanumGothic';
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const WrittenDate = styled.Text`
  margin-top:15px;
  text-align:right;
  font-family: 'NanumGothic';
  color:#fff;
  font-size:12px;
`;