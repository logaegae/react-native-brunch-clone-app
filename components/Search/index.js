import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons, Feather } from '@expo/vector-icons';

import ArticleTab from './ArticleTab';
import WriterTab from './WriterTab';

const { height, width } = Dimensions.get("window");

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 1,
      on: true,
      inputValue: ""
    } 
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleTabChange1(tab){
    this.setState({
      tab: 1,
      on: true,
    })
  }

  _handleTabChange2(tab){
    this.setState({
      tab: 2,
      on: false,
    })
  }

  render(){

    const { tab, on, inputValue } = this.state;
    
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <SearchBox>
              <InputSearch
                value={inputValue}
                onChangeText={this._handleTextChange}
                placeholder="Search"
              />
              <Feather name="search" color="#afafaf" size={20} />
            </SearchBox>
          </HeaderBox>
          <TabBox>
            <Tab visual={on} onPressOut={() => this._handleTabChange1(tab)}>
              <TabText visual={on}>글</TabText>
            </Tab>
            <Tab visual={!on} onPressOut={() => this._handleTabChange2(tab)}>
              <TabText visual={!on}>글쓴이</TabText>
            </Tab>
          </TabBox>
          <ScrollView>
          <ConBox>
              {tab === 1 ? <ArticleTab /> : <WriterTab />}
            </ConBox>  
          </ScrollView>           
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
`;

const HeaderBox = styled.View`
  z-index:100;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background: #fff;
`;

const BtnIcon = styled.TouchableOpacity`
`;

const SearchBox = styled.View`
  margin-left:15px;
  width:${width - 70};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputSearch = styled.TextInput`
  width: ${width * 0.65};
  font-family: NanumGothic-bold;
  font-size:18px;
  color:#333;
`;


const TabBox = styled.View`
  z-index:100;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background: #fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.05);
`;

const Tab = styled.TouchableOpacity`
  width: ${width * 0.5};
  height:50px;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${props => props.visual ? "2px;" : "1px;"}
  border-bottom-color: ${props => props.visual ? "#5ED9FF;" : "transparent;"}
`;

const TabText = styled.Text`
  font-family: ${props => props.visual ? "NanumGothic-bold" : "NanumGothic"}
  font-size:15px;
  color: ${props => props.visual ? "#5ED9FF;" : "#333;"}
`;

const ConBox = styled.View`
  min-height: ${height - 100}
  background:#f7f7f7;
`;