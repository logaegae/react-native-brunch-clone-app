import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import { withNavigation } from 'react-navigation';

class ViewMiddle extends React.Component {
  render() {
    return (
        <MiddleBox>
            <ConfigBox>
                <MaterialCommunityIcons
                    name="calendar"
                    color="white"
                    size={30}
                />
                <ConfigText>날짜</ConfigText>
            </ConfigBox>
            <ConfigBox>
                <MaterialCommunityIcons
                    name="format-title"
                    color="white"
                    size={30}
                />
                <ConfigText>제목</ConfigText>
            </ConfigBox>
            <ConfigBox>
                <MaterialCommunityIcons
                    name="weather-sunny"
                    color="white"
                    size={30}
                />
                <ConfigText>날씨</ConfigText>
            </ConfigBox>
        </MiddleBox>
    );
  }
}
const MiddleBox = styled.View`
    width : 100%;
    justify-content:center;
    flex-direction : column;
    background-color : ${Theme.mainColor}
`;
const ConfigBox = styled.View`
    flex-direction : row;
    align-items : center;
    padding : 20px 30px;
    border-bottom-color : white;
    border-bottom-width : 1px;
`;
const ConfigText = styled.Text`
    color : white;
    font-size : 23px;
    margin-left : 5px;
    margin-top : -2px;
`;

export default withNavigation(ViewMiddle);