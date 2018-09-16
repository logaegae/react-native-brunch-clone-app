import React from 'react';
import { Dimensions, Text } from 'react-native';
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
        }).catch((err)=>{});
    }

    _renderItem = ( {item, index} ) => {
        item.bgStyle.photoUrl = "http://holotrip.co.kr/wp-content/uploads/2017/05/%EC%97%90%ED%8E%A01.jpg";
        item.__id.profileImg = "http://t1.daumcdn.net/friends/prod/editor/fe1fbe7c-4c82-446e-bc5c-f571d90b0ba9.jpg";
        return (
          <ItemBox bg={!item.bgStyle.photoUrl ? 
            ( "background-color:" + item.bgStyle.backgroundColor) : null
            }>
            {item.bgStyle.photoUrl ? (
              <BgBox>
                <BgImage source={{ uri: item.bgStyle.photoUrl }} />
                <BgMask></BgMask>
              </BgBox>
            ) : null }
            <FlexBox flex2>
              <ViewLinkBox onPressOut={() => this.props.navigation.navigate('ArticleView',{item})}>
                <WeatherBox>
                  <MaterialCommunityIcons name={item.weather} color="#fff" size={24} style={{marginLeft:3, marginRight:3}}/>
                </WeatherBox>
                <DateBox>
                  <DateText>{item.startDate ? item.startDate : ''}{item.finishDate? ' - '+item.finishDate : ''}</DateText>
                </DateBox>
                <TxtBox>
                  <TitText>{item.title}</TitText>
                  <Border></Border>
                  <ConText numberOfLines={2}>{item.text}</ConText>
                </TxtBox>
              </ViewLinkBox>
              <Row>
                <LikeBox>
                  <BtnLike>
                    {item.isLiked && item.isLiked.indexOf(item.__id.name) != -1 ? (
                      <Ionicons name="md-heart" color="#EC4568" size={30}  onPress={()=>{this.handleLike(item._id)}}/>
                      ) : (
                      <Ionicons name="md-heart-outline" color="#fff" size={30}  onPress={()=>{this.handleLike(item._id)}}/>
                      )
                    }
                    <LikeNum>{item.isLiked.length}</LikeNum>
                  </BtnLike>
                </LikeBox>
                <UpdatedDate> · {item.updatedDate ? timeAgo(item.updatedDate, true) : timeAgo(item.writtenDate, true)}</UpdatedDate>
              </Row>
            </FlexBox>
            <FlexBox flexEnd>
              <WriterBox onPressOut={() => this.props.navigation.navigate('WriterView',{name : item.__id.name})}>
                <ProfileImgBox source={{ uri: item.__id.profileImg }} />
                <WriterNickname>{item.__id.name}</WriterNickname>
              </WriterBox>
            </FlexBox>
          </ItemBox>
        );
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

const ItemBox = styled.View`
    position:relative;
    flex-direction: column;
    justify-content: space-between;
    margin-top:15px;
    padding:20px 15px;
    flex: 0.95;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16)
${prop => prop.bg}
`;

const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  bottom: 0;
  width: ${width * 0.8};
  border-radius: 10px;
`;

const BgImage = styled.Image`
  width: 100%;
  height:100%;
`;

const BgMask = styled.View`
  position:absolute;
  width: 100%;
  height:100%;
  backgroundColor: rgba(0,0,0,0.5);
`;

const FlexBox = styled.View`
  flex: ${props => props.flex2 ? "2" : "1"}
  flex-direction: column;
  justify-content: ${props => props.flexEnd ? "flex-end" : "flex-start"}
`;

const ViewLinkBox = styled.TouchableOpacity`
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DateBox = styled.View`
  margin: 10% 0 5%;
`;

const DateText = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const TxtBox = styled.View`
`;

const Border = styled.View`
  margin: 6% 0;
  width:20px;
  height:5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TitText = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const ConText = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:15px;
  line-height:18px;
`;

const Row = styled.View`
  margin-top:30px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
  font-family: NanumGothic;
  margin-left:3px;
  color:#fff;
  font-size:14px;
  font-weight:500;
`;

const UpdatedDate = styled.Text`
  font-family: NanumGothic;
  color:#fff;
  font-size:14px;
`;

const WriterBox = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: NanumGothic-bold;
  color:#fff;
  font-size:16px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 40px;
    height : 40px;
    border-radius : 20px;
    margin-right : 7px;
    background-color : transparent;
`;

export default withNavigation(ContentItem);