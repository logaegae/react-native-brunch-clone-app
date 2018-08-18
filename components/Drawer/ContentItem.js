import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class ContentItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible : false
    }
    this._renderModalContent = this._renderModalContent.bind(this);
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
  
  _renderModalContent = (_id) => (
    <ModalWrap>    
      <ModalSelect>
        <ModalOption first onPress={() => this.props.navigation.navigate("New", {'_id': _id})}>
          <ModalBtnText>수정</ModalBtnText>
        </ModalOption>
        <ModalOption onPress={() => {
          this._handleUpdate({delYn : !this.props.delYn});
          this.setState({ isModalVisible: false });
        }}>
          <ModalBtnText red>삭제</ModalBtnText>
        </ModalOption>        
      </ModalSelect>
      <ModalCancle onPress={() => this.setState({ isModalVisible: false })}>  
        <ModalBtnText>취소</ModalBtnText>
      </ModalCancle>
    </ModalWrap>
  );
  
  render(){
    const { published, text, writtenDate, updatedDate, title, bgStyle, startDate, finishDate, weather, _id } = this.props;
    const {isModalVisible} = this.state;
    return (
      <Wrap1>
         <Modal 
          isVisible={isModalVisible} 
          style={{ justifyContent: 'flex-end', margin:0 }}
          onBackdropPress={()=>{
            this.setState({isModalVisible : false})
          }}
        >
          {this._renderModalContent(_id)}
        </Modal>

        <Wrap2 backgroundColor={!bgStyle.photoUrl ? bgStyle.backgroundColor ? bgStyle.backgroundColor : "transparent" : "transparent"}>  
          <ControlBox>
            <BtnPublishing onPressOut={() => this._handleUpdate({published : !published})} visual={published}>
              <TextPublishing color={!published ? bgStyle.backgroundColor ? bgStyle.backgroundColor : "black" : "white"} visual={published}>{!published ? ("발행하기") : ("발행취소")}</TextPublishing>
            </BtnPublishing>
            <BtnEdit onPress={() => this.setState({ isModalVisible: true })}>
              <Entypo name="dots-three-vertical" color="#fff" size={20} />
            </BtnEdit>
          </ControlBox>
          <FirstRow>
            <DateBox>
              <DateText>{startDate}{finishDate? ' - '+finishDate : ''}</DateText>
            </DateBox>
            <WeatherBox>
              <MaterialCommunityIcons name={weather ? weather : "weather-sunny"} color="#fff" size={34} style={{marginLeft:3}}/>
            </WeatherBox>
          </FirstRow>
          <TitBox>
            <TitText>{title}</TitText>
            <BorderBox></BorderBox>
          </TitBox>
          <TextBox>
            <ConText numberOfLines={3}>{text}</ConText>
          </TextBox>
          <WrittenDate>{updatedDate ? updatedDate.substring(0,19).replace('T',' ') : writtenDate.substring(0,19).replace('T',' ')}</WrittenDate>
        </Wrap2>
      </Wrap1>
    )
  }
}

export default withNavigation(ContentItem);

const Wrap1 = styled.View`
  margin-bottom: 7%;
`;    
const Wrap2 = styled.View`
  padding: 7% 10%;
  background-color:${prop=>prop.backgroundColor};
  border-radius: 10px;
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
  color:${prop=>prop.color};
  font-size:14px;
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
  width:100%;
  height:20px;
`;

const ModalWrap = styled.View`
  padding: 30px;
`;

const ModalSelect = styled.View`
  background: #fff;
  border-radius:15px;
`;

const ModalCancle = styled.TouchableOpacity`
  margin-top:15px;
  padding: 20px 0;
  align-items: center;
  background: #fff;
  border-radius:15px;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 20px 0;
  align-items: center;
  border-top-color:#ccc;
  border-top-width: ${props => props.first ? "0" : "1px"}
`;

const ModalBtnText = styled.Text`
  font-size:18px;
  color: ${props => props.red ? "red" : "blue"}
`;