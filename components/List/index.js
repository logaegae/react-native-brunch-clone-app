import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ListItem from './ListItem';

const { height, width } = Dimensions.get("window");

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      loading: true,
      message: "로딩 중..."
    }
  }

  componentDidMount(){
    this.setState({
      items: this.props.article.items,
      loading: false,
    })
  }

  render(){
    const { loading, message } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnBox>
              <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color="#333" size={50}/>
              </BtnIcon>
            </BtnBox>
            <LogoBox>
              <Logo>Travel</Logo>
            </LogoBox>
          </HeaderBox>
          <ScrollView>
            <ConBox>
              {/* <NoDataBox><NoDataText>{message}</NoDataText></NoDataBox> */}
              <ListItem />
              <ListItem />
              <ListItem />
              <ListItem />
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    article : state.redux.article,
  };
}

export default connect(mapStateToProps)(List);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:1;
  position: relative;
  flex-direction: row;
  align-items: center;
  height:85px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background:#fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.06);
`;

const BtnBox = styled.View`
  position:absolute;
  top:0;
  left:0;
  z-index: 5;
  padding: 0 15px;
  height:85px;
  align-items: center;
  justify-content : center;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const LogoBox = styled.View`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Text`
  font-family: NanumGothic-bold;
  font-size: 45px;
  color:#999;
`;

const ConBox = styled.View`
  flex:10;
  padding: 7%;
`;

const NoDataBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  color:#666;
  font-size:16px;
  font-family: NanumGothic;
`;