import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

export default class WriterView extends Component {
  constructor(props){
    super(props);
    this.state = {
      writerNickname: "bonobono 보노보노",
      articleNum: 3,
    }
  }

  renderFixedHeader() {
    return(
      <FixedHeaderBox>
        <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
          <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
        </BtnIcon> 
      </FixedHeaderBox>
    )
  }

  renderSticky(){
    return(
      <StickyBox>
        <Nickname style={{marginTop: 5}}>{this.state.writerNickname}</Nickname>
      </StickyBox>
    )
  }

  renderHeaderContent(){
    return(
      <HeaderConBox>
        <ProfileBox>
          <ProfileImgBox source={require('../../assets/siba.jpg')}/>
          <Nickname>{this.state.writerNickname}</Nickname>
          <ArticleNum>글수 {this.state.articleNum}</ArticleNum>
        </ProfileBox> 
      </HeaderConBox>
    )
  }

 

  render(){    
    return(
        <Wrap>         
          <StatusBar hidden={false} />
          <ParallaxScrollView
            style={{ flex: 1}}
            backgroundColor="transparent"
            contentBackgroundColor="#f7f7f7"
            stickyHeaderHeight={60}
            parallaxHeaderHeight={220}
            fadeOutForeground={true}
            // onChangeHeaderVisibility={() => {this.setState({headerVisibility})}}
            renderFixedHeader={() => this.renderFixedHeader()}
            renderStickyHeader={() => this.renderSticky()}
            renderForeground={() => this.renderHeaderContent()}
            >
            <ConBox>
              <WriterViewItem />
              <WriterViewItem />
              <WriterViewItem />
            </ConBox>
          </ParallaxScrollView> 
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom: -7%;
`;

const StickyBox = styled.View`
  position: relative;
  height:50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom-width:1px;
  border-bottom-color: #dedede;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.08);
`;

const FixedHeaderBox = styled.View`
  position:absolute;
  left: 0;
  z-index:100;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;  
`;


const HeaderConBox = styled.View`
  position:relative;
  z-index:5;
  padding: 30px 0 20px;
  height:220px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const ProfileBox = styled.View`
  width: ${width};
  align-items: center;
  justify-content: center;
`;


const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : #ccc;
`;

const Nickname = styled.Text`
  margin-top:15px;
  font-family: NanumGothic-bold;
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  margin-top:5px;  
  font-family: NanumGothic;
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
  padding:7%;
`;