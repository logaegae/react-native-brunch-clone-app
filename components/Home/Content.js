import React from 'react';
import { Text, View, TouchableHighlight, TextInput, Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import ContentItem from './ContentItem';

const { height, width } = Dimensions.get("window");

class Content extends React.Component {
  render() {
    return (
        <ContentContainer>
            <ContentBox horizontal={true}>
                <ContentItem/>
                <ContentItem/>
            </ContentBox>
            <ButtonBox>
                <SimpleLineIcons name="plus" size={40} color={Theme.mainColor}/>
            </ButtonBox>
        </ContentContainer>
    );
  }
}

const ContentContainer = styled.View`
    flex : 10;
    width : ${width-20}px;
`;
const ContentBox = styled.ScrollView`
    flex : 7;
    width : 100%;
    background-color : #ddd;
    border-radius : 10px;
`;
const ButtonBox = styled.View`
    flex : 1;
    align-items : center;
    justify-content : flex-start;
    width : 100%;
    padding-top: 10px;
`;

export default Content;