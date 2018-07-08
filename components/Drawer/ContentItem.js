import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class ContentItem extends React.Component {

    state ={
        issued : this.props.issued
    }
    render() {
    
        const { issued } = this.state;
        return (
            <Content last={this.props.last}>
                <StatusBox>
                    {issued ? <StatusButton issued={issued}><StatusText issued={issued}>발행취소</StatusText></StatusButton> : <StatusButton issued={issued}><StatusText issued={issued}>발행</StatusText></StatusButton>}
                    <MaterialCommunityIcons name="dots-vertical" size={30} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                </StatusBox>
                <WeatherBox>
                    <MaterialCommunityIcons name="weather-cloudy" size={30} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                    <MaterialCommunityIcons name="weather-sunny" size={30} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                </WeatherBox>
                <DateBox>
                    <DateText>2018.01.01 - 2018.01.01</DateText>
                </DateBox>
                <TitleBox>
                    <TitleText onPress={()=>{this.props.navigation.navigate('View')}}>
                        We are going to tour in Europe 45days
                    </TitleText>
                </TitleBox>
            </Content>
        );
    }
}

const Content = styled.View`
    width : 100%;
    flex : 1;
    margin-right : ${props => props.last ? 0 : 30}px;
    padding : 20px 20px;
    border-radius : 10px;
    background-color : #6c5ce7;
    margin-bottom : 20px;
`;
const WeatherBox = styled.View`
    width : 100%;
    flex-direction : row;
    align-items : center;
    justify-content : center;
    margin-bottom : 10px;
`;
const DateBox = styled.View`
    width : 100%;
    height : 10%;
    align-items : flex-start;
    justify-content : center;
    margin-bottom : 10px;
`;
const DateText = styled.Text`
    color : white;
    font-size : 18px;
    font-weight : 600;
`;
const StatusBox = styled.View`
    width : 100%;
    margin-bottom : 20px;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
`;
const StatusButton = styled.TouchableOpacity`
    background: ${props => props.issued ? '#6c5ce7' : 'white'};
    border : 2px solid white;
    border-radius : 15px;
    width : 100px;
`;
const StatusText = styled.Text`
    color: ${props => props.issued ? 'white' : '#6c5ce7'};
    font-size : 20px;
    font-weight : 600;
    padding: 10px;
    width : 100%;
    text-align : center;
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

export default withNavigation(ContentItem);