import React, { Component } from 'react'
import { CameraRoll, Dimensions, Text, View, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { Camera, Permissions, ImageManipulator, DangerZone, ScreenOrientation } from 'expo';

const { height, width } = Dimensions.get("window");

class CameraScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
      cameraRollUri: null,
      imageResult: null,
      orientation : 0
    }
    this.listner = this.listner.bind(this);
  }
  async componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    DangerZone.DeviceMotion.addListener(this.listner);
  }

  listner (e){
    if(this.state.orientation != e.orientation){
        this.setState({
            ...this.state,
            orientation : e.orientation
        },()=>{
            alert(e.orientation);
        });
    }
  }
  componentWillUnmount(){
    DangerZone.DeviceMotion.removeAllListeners()
  }

  snapAsync = async () => {
    if (this.camera){
        let result = await this.camera.takePictureAsync({
          exif:true,
          quality : 1
        });
        alert(result.exif.Orientation);
      
        this.setState({ imageResult: result, cameraRollUri: result.uri });
    }   
  };

  saveToCameraRollAsync = async () => {
    // await this.rotate90(this.state.imageResult);
    await CameraRoll.saveToCameraRoll(this.state.cameraRollUri, 'photo');
    this.props.handleClose();
  }

  rotate90 = async (result) => {
    let photo = await ImageManipulator.manipulate(result.uri, [{
        rotate: -result.exif.Orientation
    }, {
        resize: {
            width: result.width,
            height: result.height
        }
    }], {
        compress: 1
    });
    await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
  }

  render() {
    const { hasCameraPermission, type, flashMode, cameraRollUri } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Wrap>
          <StatusBar hidden={true} />
          <Camera 
            style={{ flex: 1 }} 
            ref={ref => { this.camera = ref; }}
            {...{type, flashMode}}
            >
            <CameraBox>
              {cameraRollUri &&
                <SnapImg
                  source={{ uri: cameraRollUri }}
                />
              }
              <HeaderBox>  
                {type === Camera.Constants.Type.back ? (
                  <BtnIcon 
                    onPress={() => {
                      this.setState({
                        flashMode: flashMode === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.on
                          : Camera.Constants.FlashMode.off,
                      });
                    }}>
                    {flashMode === Camera.Constants.FlashMode.off ? (
                      <MaterialIcons name="flash-off" color="#fff" size={26} style={{marginTop: 10}} />                  
                    ) : (
                      <MaterialIcons name="flash-on" color="#f5d315" size={26} style={{marginTop: 10}} />                  
                    )}
                  </BtnIcon>             
                ) : null}              
              </HeaderBox>
              {!cameraRollUri ? (
                <FooterBox>
                  <BtnIcon onPress={() => this.props.handleClose()}>
                    <BtnTxt>취소</BtnTxt>
                  </BtnIcon>
                  <BtnSnap onPress={this.snapAsync}>
                    <BtnSnapCircle></BtnSnapCircle>
                  </BtnSnap>
                  <BtnIcon
                    onPress={() => {
                      this.setState({
                        type: type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                      });
                    }}>
                    <Feather name="refresh-cw" color="#fff" size={25} />                  
                  </BtnIcon>
                </FooterBox> 
              ) : (
                <FooterBox>
                  <BtnIcon onPress={() => this.setState({cameraRollUri: null})}>
                    <BtnTxt>다시 찍기</BtnTxt>
                  </BtnIcon>
                  <BtnIcon onPress={this.saveToCameraRollAsync}>
                    <BtnTxt>사진 사용</BtnTxt>
                  </BtnIcon>
                </FooterBox>                 
              )}
                           
            </CameraBox>
          </Camera>
        </Wrap>
      );
    }
  }

  
}

export default CameraScreen;

const Wrap = styled.View`
  flex: 1;
`;

const CameraBox = styled.View`
  position: relative;
  flex: 1;
  padding: 0 5%;
  flex-direction: column;
  justify-content: space-between;
`;

const SnapImg = styled.Image`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  width: ${width};
  height: 100%;
`;

const HeaderBox = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BtnIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: ${prop => prop.alignFlexEnd ? "flex-end" : "center"};
`;

const BtnTxt = styled.Text`
  font-family: 'NanumGothic';
  color: #fff;
  font-size: 18px;
  text-decoration-line: underline;
  text-decoration-color: #fff;
`;

const FooterBox = styled.SafeAreaView`
  z-index: 10;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 8%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: #000;
`;

const BtnSnap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px; 
  border-radius: 28px;
  border: 2px #fff solid;
`;

const BtnSnapCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #fff;
`;