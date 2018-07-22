import React, { Component } from 'react'
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import NotifyItem from './NotifyItem';
import Header from '../Common/ContentHeader';

const { height, width } = Dimensions.get("window");

export default class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(
        <Wrap>
          <Header title="알림" />
          <ScrollView>
            <ConBox>
              <NotifyItem />
              <NotifyItem />
              <NotifyItem />
              <NotifyItem />
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