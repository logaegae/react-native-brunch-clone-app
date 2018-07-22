import React, { Component } from 'react'
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';

import LikeItem from './LikeItem';
import Header from '../Common/ContentHeader';

const { height, width } = Dimensions.get("window");

export default class Like extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(
        <Wrap>
          <Header title="좋아요"/>
          <ScrollView>
            <ConBox>
              <LikeItem />
              <LikeItem />
              <LikeItem />
              <LikeItem />
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
const ConBox = styled.View`
  flex: 8.8;
`;