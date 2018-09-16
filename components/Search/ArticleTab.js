import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components';

import ArticleItem  from './ArticleItem';

const { height, width } = Dimensions.get("window");

export default class ArticleTab extends Component {
  constructor(props){
    super(props);
    this.state = {
    } 
  }

  render(){
    
    const list = this.props.list;

    return(
      <Wrap>
        {list.length === 0 ? (
          <ResultBox>
            <ResultText>검색 결과가 없습니다.</ResultText>
          </ResultBox>
          ) : (
          <View>
            <ResultBox>
              <ResultText>글 검색결과 {list.length}건</ResultText>
            </ResultBox>
            <ArticleItem {...list} />
          </View>
          )}       
      </Wrap>
    )  
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-bottom:7%;
`;

const ResultBox = styled.View`
  padding: 0 7%;
  height:45px;
  justify-content:center;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const ResultText= styled.Text`
  font-size:13px;
  font-family: NanumGothic;
  color:#999;
`;