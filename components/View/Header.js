import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class ViewHeader extends React.Component {
  render() {
    return (
        <Header>
            <ButtonBox>
                <Ionicons 
                    name="md-arrow-back" 
                    size={50} 
                    style={{fontWeight : 'bold'}} 
                    color="white"
                    onPress={()=>{this.props.navigation.navigate('Home')}}
                />
                <Text>
                    <MaterialCommunityIcons name="heart-outline" size={20} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                    <HeartText>
                        120
                    </HeartText>
                </Text>
            </ButtonBox>
            <WeatherBox>
                <MaterialCommunityIcons name="weather-cloudy" size={40} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                <MaterialCommunityIcons name="weather-sunny" size={40} style={{marginLeft : 5, marginRight : 5}} color="white"/>
            </WeatherBox>
            <DateBox>
                <DateText>2018.01.01 - 2018.01.01</DateText>
            </DateBox>
            <TitleBox>
                <TitleText>
                    We are going to tour in Europe 45days
                </TitleText>
            </TitleBox>
            <LineBox>
                <Line></Line>
            </LineBox>
            <WriterBox>
                <ProfileImgBox source={require('../../assets/siba.jpg')}/>
                <WriterText>nickname</WriterText>
            </WriterBox>
        </Header>
    );
  }
}

const Header = styled.View`
    background-color : ${Theme.mainColor}
`;
const ButtonBox = styled.View`
    width : 100%;
    padding : 35px 10px 0;
    justify-content:space-between;
    align-items : center;
    flex-direction : row;
`;
const HeartText = styled.Text`
    color : white;
    font-size : 20px;
    margin-top : -3px;
    font-family : NanumGothic;
`;
const WeatherBox = styled.View`
    padding : 0 10px;
    width : 100%;
    flex-direction : row;
    justify-content : center;
`;
const DateBox = styled.View`
    width : 100%;
    padding : 20px 30px 0;
    align-items : flex-start;
    justify-content : center;
`;
const DateText = styled.Text`
    color : white;
    font-size : 18px;
    font-weight : 600;
    font-family : NanumGothic;
`;
const TitleBox = styled.View`
    width : 100%;
    padding : 10px 30px;
`;
const TitleText = styled.Text`
    color : white;
    font-size : 30px;
    font-family : NanumGothic-bold;
`;
const LineBox = styled.View`
    padding-top : 15px;
    align-items : flex-end;
`;
const Line = styled.View`
    width : ${width - 100}px;
    border-bottom-width : 6px;
    border-bottom-color : white;
`;
const WriterBox = styled.View`
    width : 100%;
    padding : 30px 30px 20px;
    flex-direction : row;
    align-items : center;
`;
const ProfileImgBox = styled.Image`
    width : 60px;
    height : 60px;
    border-radius : 30px;
    margin-right : 5px;
    background-color : gray;
`;
const WriterText = styled.Text`
    color : white;
    font-size : 25px;
    font-family : NanumGothic;
`;

export default withNavigation(ViewHeader);