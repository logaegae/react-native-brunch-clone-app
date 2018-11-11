import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';
import ModalBg from './WriteModalBg';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this._toggleModal = this._toggleModal.bind(this);
    this._rednerModalType = this._rednerModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
    this._handleDate = this._handleDate.bind(this);
    this._handleBg = this._handleBg.bind(this);
    this._handleWeather = this._handleWeather.bind(this);
  }
  _handleDate = (startDate, finishDate, switchOneday) => {
    let obj = {
      ...this.props.article,
    };
    if(startDate){
      obj.startDate = startDate;
    }
    if(finishDate){
      obj.finishDate = finishDate;
    }
    if(finishDate === "remove"){
      obj.finishDate = null;
    }
    switchOneday 
    ? obj.switchOneday = true
    : obj.switchOneday = false
    this.props.handleState(obj);
  }
  _handleWeather = (value) => {
    const obj = {
      ...this.props.article,
      weather : {
        ...this.props.article.weather,
        ...value
      }
    }
    this.props.handleState(obj);
  }
  _handleBg = (value) => {
    const obj = {
      ...this.props.article,
      bg : {
        ...this.props.article.bg,
        ...value
      }
    }
    this.props.handleState(obj);
  }
  _toggleModal = (type) => {
    this.props.handleState({ 
      ...this.props.article,
      isModalVisible: !this.props.article.isModalVisible,
      modalType: type 
    });
  };

  _rednerModalType(date, weather, bg){
      switch (this.props.article.modalType) {
        case "date":   return date;
        case "weather": return weather;
        case "bg":  return bg;
    }
  }

  _renderModalContent = () => {
    const article = this.props.article;
    return (
      <View>
        <ModalHeader>
          <ModalTit>
            {this._rednerModalType("날짜", "날씨", "카드 배경")} 선택하기
          </ModalTit>
          <Button value="cancle" title="닫기" onPress={() => this._toggleModal('')}/>
        </ModalHeader>
        {this._rednerModalType(
          <ModalDate parentState={article} handleDate={this._handleDate}/>, 
          <ModalWeather parentState={article.weather} handleWeather={this._handleWeather} />,
          <ModalBg parentState={article.bg} handleBg={this._handleBg} handleModal={this.props.handleModal2}/>
        )} 
      </View>
    );
  }
  
  render(){
    const article = this.props.article;
    const { startDate, finishDate, weather, bg, title, text, isModalVisible } = this.props.article;
    return (
      <Wrap>
        
        <Modal 
          isVisible={isModalVisible}
          onBackdropPress={()=>{
            this._toggleModal('');
          }}
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent()}
        </Modal>
        
        <HeaderConBox bg={!bg.photo ? 
          ( "background-color:" + bg.color.value) : null }>
          {!bg.color.value ? (
            <BgBox>
              <BgImage source={{ uri: bg.photo }} />
              <BgMask></BgMask>
            </BgBox>
          ) : null }
          <DateBox>
            <Select onPress={() => this._toggleModal("date")}>
              <CommonText>날짜</CommonText>
              <CommonText>{startDate ? startDate.split('T')[0] : ''}{finishDate ? ' - ' + finishDate.split('T')[0] : ''}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Title> 
              <CommonText>제목</CommonText>
              <TitleInput
                color="white"
                underlineColorAndroid="transparent"
                placeholder={"45자 이내로 입력해주세요."}
                maxLength={45}
                value={title}
                onChangeText={(text) => this.props.handleState({...article, title: text})}
              />
             </Title> 
          </TitBox>
          <WeatherBox>
            <Select onPress={() => this._toggleModal("weather")}>
              <CommonText>날씨</CommonText>
              {weather.name ? <MaterialCommunityIcons name={weather.name} size={25} color={"white"} /> : null}
            </Select>
          </WeatherBox>
          <Row flexEnd>
            <Btn onPress={() => this._toggleModal("bg")}>
              <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
            </Btn>
          </Row>
        </HeaderConBox>
        <TextareaBox>
          <Textarea
            multiline={true}
            onChangeText={(text) => this.props.handleState({...article,text})}
            placeholder="당신의 여행은 어땠나요?"
            placeholderStyle={{color:"#999", fontSize:15}}
            value={text}/>
        </TextareaBox>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  flex: 1;
`;
const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  bottom: 0;
  left:0;
  right:0;
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

const HeaderConBox = styled.View`
  padding: 7%; 
  ${prop => prop.bg}
`;

const Select = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
const Title = styled.View`
  flex-direction: row;
  align-items: center;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.flexEnd ? "flex-end" : "flex-start"}
`;

const DateBox = styled.View`
`;

const CommonText = styled.Text`
  font-family: 'NanumGothic-bold';
  color:#fff;
  font-size:17px;
  font-weight:500;
  padding-right : 10px;
`;

const WeatherBox = styled.View`
  margin-bottom:25px;
`;

const TitBox = styled.View`
  margin: 25px 0;
`;

const TitText = styled.Text`
`;
const TitleInput = styled.TextInput`
  padding-left : 10px;
  padding-right : 10px;
  font-size : 17px;
  width : 90%;
`;
const Btn = styled.TouchableOpacity`
`;

const TextareaBox = styled.View`
  padding:7%;
`;

const Textarea = styled.TextInput`
  color: #333;
  font-size:20px;
  font-family: 'NanumGothic';
  height:100%;
`;

const ModalHeader = styled.View`
  padding: 10px 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  background: #fff;
`
const ModalTit = styled.Text`
  color:#999;
  font-family: 'NanumGothic';
  font-size:15px;
`;