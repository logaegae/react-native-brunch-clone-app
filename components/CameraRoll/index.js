import React, { Component } from 'react';
import { CameraRoll, StatusBar, ScrollView, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from './Camera';

const { height, width } = Dimensions.get("window");
const width30per = width / 3;

class CameraRollScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      cameraVisible : false
    }
    this._toggleCamera = this._toggleCamera.bind(this);
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }
  componentWillUnmount(){

  }

  _toggleCamera = () => {
    this.setState({ 
      ...this.state,
      cameraVisible : !this.state.cameraVisible
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 30 });
    this.setState({ photos });
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
          <ImgBox>
            <Img source={photo.image} resizeMode="cover" />        
          </ImgBox>
      );
    }
    return images;
  }

  getSelectedImages = (image) => {
    if(image.length != 0) this.props.handleImage(image[0].uri);
  }

  render() {
    let { photos, cameraVisible } = this.state;
    return (
      <Container>
        {cameraVisible ? 
        <Camera handleClose={this._toggleCamera}/>
        :
        <Wrap>
          <StatusBar hidden={false} />
          <HeaderBox>
            <BtnIcon onPress={() => this.props.handleClose()}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>앨범</H1>
            <BtnIcon onPress={() => this._toggleCamera()}>
              <SimpleLineIcons name="camera" color="#333" size={29}/>
            </BtnIcon>
          </HeaderBox>
          <ConBox>
            <CameraRollPicker
              // callback={this.getSelectedImages} 
              callback={this.getSelectedImages} 
              selectSingleItem={true}
              imageMargin={2}
              containerWidth={width + 4}
              removeClippedSubViews={true}
              selected={[]}
              />
          </ConBox>
        </Wrap>}
      </Container>
    );
  }
}
const Container = styled.View`
  flex : 1;
`;
const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
`;

const BtnIcon = styled.TouchableOpacity`
`;

const H1 = styled.Text`
  z-index:-1;
  position:absolute;
  width: ${width};
  align-items: center;
  text-align:center;
  font-size:20px;
  font-family: 'NanumGothic-bold';
`;

const Loading = styled.View`
  margin-top: 8%;
`;

const ConBox = styled.View`
  flex:1;
  margin: -2px;
`;

const ImgBox = styled.View`
  overflow:hidden;
  position:relative;
  padding: 1px;
  width: ${width30per};
  height: ${width30per};
  background: #fff;
`;

const Img = styled.Image`
  position: absolute;
  top:0; 
  left:0;
  width: 100%;
  height:100%;
`;

export default CameraRollScreen;