import React from 'react';
import { Text, View, TouchableHighlight, TextInput, Dimensions, Image } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';

const { height, width } = Dimensions.get("window");

class ContentItem extends React.Component {
  render() {
    return (
        <Content>
            <WeatherBox>
                <MaterialCommunityIcons name="weather-cloudy" size={50} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                <MaterialCommunityIcons name="weather-sunny" size={50} style={{marginLeft : 5, marginRight : 5}} color="white"/>
            </WeatherBox>
            <DateBox>
                <DateText>2018.01.01 - 2018.01.01</DateText>
            </DateBox>
            <TitleBox>
                <TitleText>
                    We are going to tour in Europe 45days
                </TitleText>
                <HeartBox>
                    <HeartText>
                        120
                    </HeartText>
                    <MaterialCommunityIcons name="heart-outline" size={25} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                </HeartBox>
            </TitleBox>
            <WriterBox>
                <ProfileImgBox source={require('../../assets/siba.jpg')}/>
                <WriterText>nickname</WriterText>
            </WriterBox>
        </Content>
    );
  }
}

const Content = styled.View`
    width : ${width - 20}px;
    height : ${height - 260}px;
    flex : 1;
    margin-right : 30px;
    padding : 10px 20px;
    border-radius : 10px;
    background-color : #fdcb6e;
`;
const WeatherBox = styled.View`
    width : 100%;
    height : 15%;
    flex-direction : row;
    align-items : center;
    justify-content : center;
`;
const DateBox = styled.View`
    width : 100%;
    height : 10%;
    align-items : flex-start;
    justify-content : center;
`;
const DateText = styled.Text`
    color : white;
    font-size : 18px;
    font-weight : 600;
`;
const HeartBox = styled.View`
    width : 100%;
    flex-direction : row-reverse;
    padding-top : 30px;
`;
const HeartText = styled.Text`
    color : white;
    font-size : 25px;
    margin-top : -3px;
`;
const TitleBox = styled.View`
    width : 100%;
    height : 60%;
`;
const TitleText = styled.Text`
    color : white;
    font-size : 30px;
    font-weight : bold;
`;
const WriterBox = styled.View`
    width : 100%;
    height : 15%;
    flex-direction : row;
    align-items : center;
`;
const ProfileImgBox = styled.Image`
    width : 70px;
    height : 70px;
    border-radius : 35px;
    margin-right : 5px;
    background-color : gray;
`;
const WriterText = styled.Text`
    color : white;
    font-size : 28px;
    font-weight : 600;
`;
export default ContentItem;