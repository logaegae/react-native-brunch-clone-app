import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { domain } from '../../config';
import timeAgo from '../../lib/timeAgo';

const { height, width } = Dimensions.get("window");

class ContentItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errors: [],
            cardCon : []
        };
        this.props = props;
        this._carousel = {};
        this.getList();
        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    handleLike(_id) {
        const header = {
            headers : {
                'x-access-token' : this.props.token
            }
        }
        axios.post(domain + '/api/article/toggleLike', {_id}, header)
        .then((res) => {
            if(res.data.status === 'SUCCESS'){
                let list = this.state.cardCon;
                for(i=0;i<list.length;i++){
                    if(list[i]._id === _id){ 
                        list[i].isLiked = res.data.like;
                        break;
                    }
                }
                if(res.data.addAction){
                    this.props.setLikeIcon(true);
                }
                this.setState({
                    ...this.state,
                    cardCon : list
                })
            }
        });
    }

    getList() {
        axios.get(domain+'/api/article/getMainList')
        .then((res)=>{
            if(res.data.status === 'SUCCESS'){
                this.setState({
                    ...this.state,
                    cardCon : res.data.list
                });
            }
        })
    }

    _renderItem = ( {item, index} ) => {
        const { nickname } = this.props;
        return (
            <Content bgStyle={item.bgStyle}>
                <WeatherBox>
                    <MaterialCommunityIcons name={item.weather} size={50} style={{marginLeft : 5, marginRight : 5}} color="white"/>
                </WeatherBox>
                <DateBox>
                    <DateText>{item.startDate ? item.startDate : ''}{item.finishDate? ' - '+item.finishDate : ''}</DateText>
                </DateBox>
                <TitleBox>
                    <TitleText onPress={()=>{this.props.navigation.navigate('ArticleView')}}>
                        {item.title}
                    </TitleText>
                    <LikeBox>
                        <BtnLike>
                            {item.isLiked && item.isLiked.indexOf(nickname) != -1 ? (
                            <Ionicons name="md-heart" color="#EC4568" size={25} onPress={()=>{this.handleLike(item._id)}}/>
                            ) : (
                            <Ionicons name="md-heart-outline" color="#fff" size={20} onPress={()=>{this.handleLike(item._id)}} />
                            )
                            }
                            <LikeNum>{item.isLiked.length}</LikeNum>
                        </BtnLike>
                    </LikeBox>
                    <WrittenDateWrap>
                        <WrittenDate> · {item.updatedDate ? timeAgo(item.updatedDate, true) : timeAgo(item.writtenDate, true)}</WrittenDate>
                    </WrittenDateWrap>
                </TitleBox>
                <WriterBox onPress={()=>{this.props.navigation.navigate('WriterView')}}>
                    <ProfileImgBox source={require('../../assets/siba.jpg')}/>
                    <WriterText>{item.__id.name}</WriterText>
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
    background-color : ${props => props.bgStyle.photoUrl ? "transparent" : props.bgStyle.backgroundColor};
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

const TitleBox = styled.View`
    width : 100%;
    height : 60%;
`;
const TitleText = styled.Text`
    color : white;
    font-size : 30px;
    font-family : NanumGothic-bold;
`;
const WriterBox = styled.TouchableOpacity`
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
const LikeBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: NanumGothic-bold;
  margin-left:3px;
  color:#fff;
  font-size:25px;
  font-weight:500;
`;
export default withNavigation(ContentItem);