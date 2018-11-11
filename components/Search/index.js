import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

import ArticleTab from './ArticleTab';
import WriterTab from './WriterTab';

const { height, width } = Dimensions.get("window");

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading1: false,
      loading2: false,
      list : [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      init: false,
      tab: 1,
      on: true,
      inputValue: this.props.navigation.getParam('text') || null,
      result: null,
      count: null,
    } 
  }

  componentDidMount(){
    this._handleSearch();
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleTabChange(tab){
    this.setState({
      tab,
      on: tab === 1 ? true : false,
      page : 1,
      seed : 1,
      list : []
    },() => {
      this._handleSearch();
    })
  }

  _handleSearch(){
    const state = this.state;
    const { inputValue, page, seed} = this.state;

    if(inputValue === null || inputValue === "" ){
      alert("최소 1글자 이상 입력해 주세요.")
      return false;
    }

    if(inputValue){
      axios.post(domain+'/api/search/articleAndWriter', {text: inputValue, tab: state.tab, page, seed})
      .then((res) => {
        if(res.data.status === 'SUCCESS'){
          let obj = {
            ...state
          }
          obj["list"] = obj["page"] === 1 ? res.data.list : [...obj["list"], ...res.data.list]
          obj["endYn"] = res.data.endYn;
          obj["error"] = res.message || null;
          obj["loading"] = false;
          obj["refreshing"] = false;
          obj["count"] = res.data.count;
          obj["init"] = true;
          if(res.data.length == 0 ) {
            obj["init"] = false;
          }
          obj["result"] = inputValue;
          this.setState(obj);
        }
      }).catch((error) => {
        alert("ERROR\n"+error.message);
      });
    }

  }

  handleLoadMore = () => {
    if (!this.state.loading && !this.state.endYn){
      this.setState({
        page : this.state.page + 1,
        loading : true
      },() => {
        this._handleSearch();
      });
    }
  }

  handleRefresh = (tab) => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true,
      endYn: false,
    },()=>{
      this._handleSearch();
    });
  }

  render(){

    const { tab, on, inputValue, result, count, list, refreshing, loading, init } = this.state;
    
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <SearchBox>
              <InputSearch
                value={inputValue}
                onChangeText={this._handleTextChange}
                placeholder="Search"
              />
              <BtnIcon onPress={() => this._handleSearch()}>
                <Feather name="search" color="#afafaf" size={20}/>
              </BtnIcon>
            </SearchBox>
          </HeaderBox>
          <TabBox>
            <Tab visual={on} onPress={() => this._handleTabChange(1)}>
              <TabText visual={on}>글</TabText>
            </Tab>
            <Tab visual={!on} onPress={() => this._handleTabChange(2)}>
              <TabText visual={!on}>글쓴이</TabText>
            </Tab>
          </TabBox>
          <ConBox>
            {tab === 1 ? (
              <ArticleTab 
                result={result} 
                count={count}
                list={list} 
                refreshing={refreshing}
                loading={loading}
                init={init}
                handleLoadMore={this.handleLoadMore}
                handleRefresh={this.handleRefresh}
              />
              ) : (
              <WriterTab 
                result={result} 
                count={count}
                list={list} 
                refreshing={refreshing}
                loading={loading}
                init={init}
                handleLoadMore={this.handleLoadMore}
                handleRefresh={this.handleRefresh}
              />
            )}
            </ConBox>  
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
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
  font-family: 'NanumGothic-bold';
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
  font-family: ${props => props.visual ? "NanumGothic-bold;" : "NanumGothic;"}
  font-size:15px;
  color: ${props => props.visual ? "#5ED9FF;" : "#333;"}
`;

const ConBox = styled.View`
  min-height: ${height - 100}
  background:#f7f7f7;
`;
