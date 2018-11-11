import React from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';
import { domain } from '../../config';
import timeAgo from '../../lib/timeAgo';
import ToggleLike from '../Common/ToggleLike';

const { height, width } = Dimensions.get("window");

class ContentItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errors: [],
            cardCon : [],
            activeSlide: 0,
        };
        this.props = props;
        this._carousel = {};
        this.getList = this.getList.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        axios.get(domain+'/api/article/getMainList')
        .then((res)=>{
            if(res.data.status === 'SUCCESS'){
              let arr = res.data.list;
              arr.push({});
              this.setState({
                  ...this.state,
                  cardCon : res.data.list
              });
            }
        }).catch((err)=>{});
    }

    _renderItem = ( {item, index} ) => {
        const lastText = `더 다양한 Travel을\n만나보세요.`;
        if(this.state.cardCon.length -1 == index){
          return (
            <ItemBox last>
              <LastBox onPress={() => this.props.navigation.navigate("List")}>
                <EvilIcons name="plus" size={90} color="#fff" />
                <LastTextBox>
                  {/* <Ionicons name="ios-quote-outline" size={30} color="#fff" style={{marginRight:5}}/> */}
                  <LastText>{lastText}</LastText>
                </LastTextBox>
              </LastBox>
            </ItemBox>
          )
        }else{
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
                <ViewLinkBox onPress={() => this.props.navigation.navigate('ArticleView',{item})}>
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
                  <ToggleLike heartSize={20} numSize={20} isLiked={item.isLiked} _id={item._id}/>
                  <UpdatedDate> · {item.updatedDate ? timeAgo(item.updatedDate, true) : timeAgo(item.writtenDate, true)}</UpdatedDate>
                </Row>
              </FlexBox>
              <FlexBox flexEnd>
                <WriterBox onPress={() => this.props.navigation.navigate('WriterView',{writer_id : item.__id._id})}>
                  <ProfileImgBox source={{ uri: item.__id.profileImg }} />
                  <WriterNickname>{item.__id.name}</WriterNickname>
                </WriterBox>
              </FlexBox>
            </ItemBox>
          );
      }
    }
    get pagination () {
      const { cardCon, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={cardCon.length}
            activeDotIndex={activeSlide}
            containerStyle={{ 
              position: 'absolute',
              bottom: -30,
              backgroundColor: 'transparent' 
            }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(155, 155, 155, 0.92)'
            }}
            // inactiveDotStyle={{}}
            inactiveDotOpacity={0.3}
            inactiveDotScale={0.5}
          />
      );
    }

    render() {
        return (
            <Wrap>
                <Carousel
                    ref={ (c) => { this._carousel = c; } }
                    data={this.state.cardCon}
                    inactiveSlideOpacity={0.3}
                    inactiveSlideScale={0.75}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={this.handleSnapToItem.bind(this)}
                    sliderWidth={width-10}
                    itemWidth={width * 0.8}
                    layout={'default'}
                    firstItem={0}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
              { this.pagination }
            </Wrap>
        );
    }
    handleSnapToItem(index){
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    ${prop => prop.bg}
    ${prop => prop.last ? "background: #ccc; align-items: center" : null}
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

const LastBox = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LastTextBox = styled.View`
  margin:15px 0;
`;

const LastText = styled.Text`  
  font-family: 'NanumGothic-bold';
  color:#fff;
  font-size:20px;
  font-weight:400;
  text-align:center;
  line-height: 28px;
`;
export default withNavigation(ContentItem);