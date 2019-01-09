import React, { Component } from 'react';
import { View, Button, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Entypo, FontAwesome, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';
import ModalBg from './WriteModalBg';
import Editor from "../Editor";

export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {      
      loaded : false,
      textOpt: null,
      textAlign: 0,     
      editorReq: null, 
      fontColor: '#333',
      keyboardUp : false,
      titleFocus : false,
      optionShow : false,
      format : {bold : true}
    };
    this._toggleModal = this._toggleModal.bind(this);
    this._rednerModalType = this._rednerModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
    this._handleDate = this._handleDate.bind(this);
    this._handleBg = this._handleBg.bind(this);
    this._handleWeather = this._handleWeather.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this._handleFormat = this._handleFormat.bind(this);
    this.sendToEditor = this.sendToEditor.bind(this);
  }
  componentWillMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }
  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  componentDidUpdate (prevProps, prevState) {
    if(this.state.keyboardUp != prevState.keyboardUp || this.state.titleFocus != prevState.titleFocus){
      if(this.state.keyboardUp && !this.state.titleFocus) this.setState({...this.state, optionShow : true})
      else this.setState({...this.state, optionShow : false})
    }
  }
  _keyboardWillShow () {
    this.setState({...this.state, keyboardUp : true});
  }

  _keyboardWillHide () {
    this.setState({...this.state, keyboardUp : false});
  }
  _handleFormat (format = {}) {
    this.setState({...this.state, format})
  }
  sendToEditor(type, value) {
    var req = JSON.stringify({type, value});
    this.setState({ editorReq: req })

    if(type === 'color'){
      this.setState({ fontColor: value })
    }
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
      ...value
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
          <ModalBg article={article} handleBg={this._handleBg} handleModal={this.props.handleModal2}/>
        )} 
      </View>
    );
  }

  _renderTextOption = () => {
    const {format} = this.state;
    switch (this.state.textOpt) {
      case 1: return (
          <TextOpt>
            <BtnOpt fs onPress={() => this.sendToEditor('size','small')}>
              <OptSize on={format.size == 'small'} style={{fontSize: 13}}>작게</OptSize>
            </BtnOpt>
            <BtnOpt fs onPress={() => this.sendToEditor('size','normal')}>
              <OptSize on={format.size == undefined} style={{fontSize: 15}}>보통</OptSize>
            </BtnOpt>
            <BtnOpt fs onPress={() => this.sendToEditor('size','large')}>
              <OptSize on={format.size == 'large'} style={{fontSize: 18}}>크게</OptSize>
            </BtnOpt>
            <BtnOpt fs onPress={() => this.sendToEditor('size','huge')}>
              <OptSize on={format.size == 'huge'} style={{fontSize: 20}}>아주 크게</OptSize>
            </BtnOpt>
          </TextOpt>
        );
      case 2: return (
        <TextOpt color>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{padding: 0}}>
          <BtnOpt onPress={() => this.sendToEditor('color','#333')}>
            <OptColor style={{backgroundColor: '#333'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#999')}>
            <OptColor style={{backgroundColor: '#999'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#ec4c6a')}>
            <OptColor style={{backgroundColor: '#ec4c6a'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#f6665b')}>
            <OptColor style={{backgroundColor: '#f6665b'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#f4c216')}>
            <OptColor style={{backgroundColor: '#f4c216'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#15b06c')}>
            <OptColor style={{backgroundColor: '#15b06c'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#00c4bd')}>
            <OptColor style={{backgroundColor: '#00c4bd'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#2e84b6')}>
            <OptColor style={{backgroundColor: '#2e84b6'}}></OptColor>
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('color','#5b5bb2')}>
            <OptColor style={{backgroundColor: '#5b5bb2'}}></OptColor>
          </BtnOpt>
          </ScrollView>
        </TextOpt>
      );
      case 3:  return (
        <TextOpt>
          <BtnOpt onPress={() => this.sendToEditor('align','left')}>
            <MaterialIcons name="format-align-left" color="#666" size={22} />
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('align','center')}>
            <MaterialIcons name="format-align-center" color="#666" size={22} />
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('align','right')}>
            <MaterialIcons name="format-align-right" color="#666" size={22} />
          </BtnOpt>
          <BtnOpt onPress={() => this.sendToEditor('align','justify')}>
            <MaterialIcons name="format-align-justify" color="#666" size={22} />
          </BtnOpt>
        </TextOpt>
      );
    }     
  }

  render(){
    const active = '#06c';
    const { editorReq, fontColor, keyboardUp, titleFocus, optionShow, format } = this.state;
    const article = this.props.article;
    const { startDate, finishDate, weather, bg, title, text, isModalVisible, selectedImg } = this.props.article;
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
          <ScrollView style={{flex:1}}>
          { !optionShow ?
          <HeaderConBox bg={!selectedImg ? ( "background-color:" + bg.color.value) : null }>
            <HeaderConInner>
              {selectedImg ? (
                <BgBox>
                  <BgImage source={{uri : selectedImg[0].uri}} />
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
                <Row>
                  <CommonText>제목{JSON.stringify(format)}</CommonText>
                  <TitInput
                    color="white"
                    underlineColorAndroid="transparent"
                    placeholder={"45자 이내로 입력해주세요."}
                    maxLength={45}
                    value={title}
                    onFocus={()=>{this.setState({...this.state, titleFocus : true})}}
                    onBlur={()=>{this.setState({...this.state, titleFocus : false})}}
                    onChangeText={(text) => this.props.handleState({...article, title: text})}
                  />
                </Row>
              </TitBox>
              <WeatherBox>
                <Select onPress={() => this._toggleModal("weather")}>
                  <CommonText>날씨</CommonText>
                  {weather.name ? <MaterialCommunityIcons name={weather.name} size={25} color={"white"} /> : null}
                </Select>
              </WeatherBox>
              <Row justifyEnd>
                <Btn onPress={() => this._toggleModal("bg")}>
                  <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
                </Btn>
              </Row>
            </HeaderConInner>
          </HeaderConBox>
          : null}
          <EditorBox>
            <Editor _editorReq={editorReq} _handleFormat={this._handleFormat}></Editor>
          </EditorBox>
        </ScrollView>

        <KeyboardAvoidingView 
          behavior={"padding"}
          keyboardVerticalOffset={80}
          style={{position:'absolute', bottom:0, width: '100%', borderTopWidth: 1, borderTopColor: '#dfdfdf'}}
          >
          {optionShow ?
            <EditorOptions>
              {this._renderTextOption()}
              <View style={{flexDirection:'row'}}>
                <BtnOpt onPress={() => this.sendToEditor('image')}>
                  <SimpleLineIcons name="picture" color="#333" size={22} />
                </BtnOpt>
                <VerticalLine></VerticalLine>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <OptRow>
                  <BtnOpt onPress={() => this.setState({textOpt: 1})}>
                    <MaterialIcons name="format-size" color="#333" size={22} />
                  </BtnOpt>
                  <BtnOpt onPress={() => this.setState({textOpt: 2})}>
                    <MaterialCommunityIcons name="format-color-text" color="#333" size={25} style={{marginTop:5}}/>
                    <MaterialCommunityIcons name="water" size={16} color={fontColor}
                      style={{position: 'absolute', top: 10, right: 5}}
                      />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('bold'); this.setState({textOpt: null}); }}>
                    <MaterialIcons name="format-bold" color={format.bold ? active : '#333'} size={26} />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('strike'); this.setState({textOpt: null}); }}>
                    <MaterialIcons name="strikethrough-s" color="#333" size={22} />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('underline'); this.setState({textOpt: null}); }}>
                    <MaterialIcons name="format-underlined" color="#333" size={22} />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('blockquote'); this.setState({textOpt: null}); }}>
                    <FontAwesome name="quote-right" color="#333" size={18} />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('bullet'); this.setState({textOpt: null}); }}>
                    <MaterialIcons name="format-list-bulleted" color="#333" size={24} />
                  </BtnOpt>
                  <BtnOpt onPress={() => { this.sendToEditor('ordered'); this.setState({textOpt: null}); }}>
                    <MaterialIcons name="format-list-numbered" color="#333" size={24} />
                  </BtnOpt>
                  <BtnOpt onPress={() => this.setState({textOpt: 3})}>
                    <MaterialIcons name="format-align-left" color="#333" size={22} />
                  </BtnOpt>
                </OptRow>
                </ScrollView>
              </View>
            </EditorOptions>
            :null}
        </KeyboardAvoidingView>

      </Wrap>
    )
  }
}
const Wrap = styled.View`
  position:relative;
  flex: 1;
`;


const HeaderConBox = styled.View`
  flex:1;
  ${prop => prop.bg}
`;
  
const HeaderConInner = styled.View`
  flex: 1;
  padding: 7%; 
`

const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
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

const Select = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Row = styled.View`
  flex:1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${props => props.justifyEnd ? "flex-end" : "flex-start"};
`;

const DateBox = styled.View`
  flex:1;
`;

const CommonText = styled.Text`
  margin-right:10px;
  font-family: 'NanumGothic-bold';
  color:#fff;
  font-size:17px;
  font-weight:500;
`;


const WeatherBox = styled.View`
  flex:1;
  margin-bottom:25px;
`;

const TitBox = styled.View`
  flex:1;
  margin: 25px 0;
`;

const TitInput = styled.TextInput`
  padding:0;
  width: 90%;
  color: #fff;
  font-size:17px;
  font-family: 'NanumGothic';
`;

const Btn = styled.TouchableOpacity`
`;

const EditorBox = styled.View`
  flex: 1;
  width:100%;
  min-height:600px;
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

const EditorOptions = styled.View`
  width: 100%;
  background: #fff;
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 100%;
  background: #dfdfdf;
`

const OptRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
  width: auto;
  background: #fff;
`;

const TextOpt = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  background:#f7f7f7;
  border-bottom-width: 1px;
  border-bottom-color: #dfdfdf;
  ${props => props.color ? `
    padding:0;
  ` : null}
`;

const BtnOpt = styled.TouchableOpacity`
  width:50px; 
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${props => props.fs ? `
    width: auto;
    padding:0 15px;
  ` : null}
`;

const OptSize = styled.Text`
  color: ${props => props.on ? '#06c' : '#666'}  
`;

const OptColor = styled.View`
  width:28px; 
  height:28px;
  border-radius: 14px;
`;