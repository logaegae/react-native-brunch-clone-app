import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';
import styled, { css } from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';
import ModalBg from './WriteModalBg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      modalType: "",
      startDate: "",
      finishDate: "",
      switchOneday : false,
      title : null,
      text: null,
      weather : {
        id : 1,
        name : null
      },
      bg : {
        photo : null,
        color : {
          id : 1,
          value : "#6B5ED1"
        }
      }
    };
    this._toggleModal = this._toggleModal.bind(this);
    this._rednerModalType = this._rednerModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
  }
  _handleDate = (startDate, finishDate, switchOneday) => {
    if(startDate){
      this.setState({
        startDate
      });
    }
    if(finishDate){
      this.setState({
        finishDate
      });
    }
    if(finishDate === "remove"){
      this.setState({
        finishDate : null
      });
    }
    switchOneday ? 
    this.setState({
      switchOneday : true
    })
    :this.setState({
      switchOneday : false
    });
  }
  _handleWeather = (value) => {
    this.setState({
      weather : value
    });
  }
  _handleBg = (value) => {
    this.setState({
      bg : value
    });
  }
  _toggleModal = (type) => {
    this.setState({ 
      isModalVisible: !this.state.isModalVisible, 
      modalType: type 
    });
  };

  _rednerModalType(date, weather, bg){
      switch (this.state.modalType) {
        case "date":   return date;
        case "weather": return weather;
        case "bg":  return bg;
    }
  }

  _renderModalContent = () => (
    <View>    
      <ModalHeader>
        <ModalTit>
          {this._rednerModalType("날짜", "날씨", "카드 배경")} 선택하기
        </ModalTit>
        <Button value="cancle" title="닫기" onPress={() => this._toggleModal('')}/>
      </ModalHeader>
      {this._rednerModalType(
        <ModalDate parentState={this.state} handleDate={this._handleDate}/>, 
        <ModalWeather parentState={this.state.weather} handleWeather={this._handleWeather} />,
        <ModalBg parentState={this.state.bg} handleBg={this._handleBg}/>
      )} 
    </View>
  );
  
  render(){
    const { isModalVisible, startDate, finishDate, weather, bg } = this.state;

    return (
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent()}
        </Modal>


        <HeaderConBox background={!bg.photo ? bg.color.value : "transparent"}>
          <DateBox>
            <Select onPress={() => this._toggleModal("date")}>
              <CommonText>날짜</CommonText>
              <CommonText>{startDate ? startDate : ''} {finishDate ? '-' + finishDate : ''}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Title> 
              <CommonText>제목</CommonText>
              <TitleInput
                underlineColorAndroid="transparent"
                placeholder={"입력해주세요."}
                onChangeText={(text) => this.setState({title: text})}
              />
             </Title> 
          </TitBox>
          <WeatherBox>
            <Select onPress={() => this._toggleModal("weather")}>
              <CommonText>날씨</CommonText>
              {weather.name ? <MaterialCommunityIcons name={weather.name} size={25} color={"white"} /> : ''}
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
            onChangeText={(text) => this.setState({text})}
            placeholder="당신의 여행은 어땠나요?"
            placeholderStyle={{color:"#999", fontSize:15}}
            value={this.state.text}/>
        </TextareaBox>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  flex: 1;
`;


const HeaderConBox = styled.View`
  padding: 7%; 
  background: ${prop => prop.background};
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
  font-size : 17px;
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