import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';

const { height, width } = Dimensions.get("window");

class ContentItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errors: [],
        };
        this.props = props;
        this._carousel = {};
        this.init();
    }

    init(){
        this.state = {
          cardCon: [
            {
              bgStyle : {
                backgroundColor: "#1adeb8",
              },
              weather: "weather-sunny",
              travelDate: "2018.01.01 - 2018.01.01",
              title: "45일동안 서유럽 한바퀴, 45days in Wetern Europe",
              isLiked: false,
              likeCount: 120,
              writtenDate: "9시간 전",
              profileImg: "https://image.fmkorea.com/files/attach/new/20180501/486616/909844983/1039257189/2761aa3169424351e01076f85b61ba45.jpeg",
              nickname: "bonobono"
            }, {
              bgStyle : {
                backgroundColor: "#5ED9FF",
              },
              weather: "weather-sunny",
              travelDate: "2018.01.01 - 2018.01.01",
              title: "자전거 여행의 매력, 느림보 제주 여행",
              isLiked: false,
              likeCount: 80,
              writtenDate: "12시간 전",
              profileImg: "http://t1.daumcdn.net/friends/prod/editor/fe1fbe7c-4c82-446e-bc5c-f571d90b0ba9.jpg",
              nickname: "어피치"
            }, {
              bgStyle : {
                backgroundColor: "#ffd021",
              },
              weather: "weather-cloudy",
              travelDate: "2018.01.01 - 2018.01.01",
              title: "단 기간 여행이 만족스러웠던 아담한 동네, 블라디보스톡",
              isLiked: false,
              likeCount: 102,
              writtenDate: "18시간 전",
              profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KYrEEV1hf0hBxY-N7XqOK-8Csx-z0Wa_oZ9WcJEp9xVKVsgx",
              nickname: "바바파파"
            }, 
          ]
        };
    }
    _renderItem = ( {item, index} ) => {
        return (
            <Content style={item.bgStyle}>
                <WeatherBox>
                    <MaterialCommunityIcons name={item.weather} size={50} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                </WeatherBox>
                <DateBox>
                    <DateText>{item.travelDate}</DateText>
                </DateBox>
                <TitleBox>
                    <TitleText onPress={()=>{this.props.navigation.navigate('View')}}>
                        {item.title}
                    </TitleText>
                    <HeartBox>
                        <HeartText>
                            {item.likeCount}
                        </HeartText>
                        <MaterialCommunityIcons name="heart-outline" size={25} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                    </HeartBox>
                    <WrittenDateWrap>
                        <WrittenDate> · {item.writtenDate}</WrittenDate>
                    </WrittenDateWrap>
                </TitleBox>
                <WriterBox>
                    <ProfileImgBox source={require('../../assets/siba.jpg')}/>
                    <WriterText>{item.nickname}</WriterText>
                </WriterBox>
            </Content>
        )
    }
    handleSnapToItem(index){
    }  
    render() {
        return (
            <Wrap>
                <Carousel
                    ref={ (c) => { this._carousel = c; } }
                    data={this.state.cardCon}
                    inactiveSlideOpacity={0.5}
                    inactiveSlideScale={0.9}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={this.handleSnapToItem.bind(this)}
                    sliderWidth={width-10}
                    itemWidth={width * 0.8}
                    layout={'default'}
                    firstItem={0}
                />
            </Wrap>
        );
    }
}
const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.View`
    height : ${height - 260}px;
    flex : 1;
    padding : 10px 20px;
    border-radius : 10px;
    background-color : #fdcb6e;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
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
    font-family : NanumGothic;
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
    font-family : NanumGothic;
`;
const TitleBox = styled.View`
    width : 100%;
    height : 60%;
`;
const TitleText = styled.Text`
    color : white;
    font-size : 30px;
    font-family : NanumGothic-bold;
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
    font-family : NanumGothic;
`;
const WrittenDateWrap = styled.View`
    align-items : flex-end;
    padding : 10px;
    width : 100%;
`;
const WrittenDate = styled.Text`
    font-family : NanumGothic-bold;
    font-size : 15px;
    font-weight : 600;
    color:#fff;
`;
export default withNavigation(ContentItem);