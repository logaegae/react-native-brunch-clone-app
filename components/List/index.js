import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

import ListItem from './ListItem';

const { height, width } = Dimensions.get("window");

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: {},
      loading: true,
      message: "로딩 중..."
    }
  }

  componentDidMount(){
    this.setState({
      loading: false,
    })
    this.getList();
  }

  getList() {
    const _this = this;
    axios.get(domain + '/api/article/getAllList')
    .then((res)=>{
        if(res.data.status === 'SUCCESS'){
            this.setState({
                ...this.state,
                items : res.data.list
            },()=>{
              // alert(JSON.stringify(_this.state.items))
            });
        }
    })
    .catch((err)=>{})
  }

  handleLike(_id) {
    const header = {
        headers : {
            'x-access-token' : this.props.login.token
        }
    }
    axios.post(domain + '/api/article/toggleLike', {_id}, header)
    .then((res) => {
        if(res.data.status === 'SUCCESS'){
            let list = this.state.items;
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
                items : list
            })
        }
    });
  }

  _getItemList () {
    if(Object.keys(this.state.items).length === 0) return '';
    var indents = [];
    Object.values(this.state.items).forEach((e, i) => {
      indents.push(
      <ListItem 
        key={i} {...e} 
        token={this.props.login.token} 
        nickname={this.props.login.nickname} 
        setLikeIcon={this.props.setLikeIcon} 
        _handleLike={(_id)=>{this.handleLike(_id)}}
        />);
    })

    return indents;
  }

  render(){
    const { items, message } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnBox>
              <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
              </BtnIcon>
            </BtnBox>
            <LogoBox>
              <Logo>Travel</Logo>
            </LogoBox>
          </HeaderBox>
          <ScrollView>
            <ConBox>
              {Object.keys(items).length === 0 
                ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
                : this._getItemList()
              }
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeIcon : (bool) => {
        return dispatch(setLikeIcon(bool));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:1;
  position: relative;
  flex-direction: row;
  align-items: center;
  height:85px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background:#fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.06);
`;

const BtnBox = styled.View`
  position:absolute;
  top:0;
  left:0;
  z-index: 5;
  padding: 0 15px;
  height:85px;
  align-items: center;
  justify-content : center;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const LogoBox = styled.View`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Text`
  font-family: NanumGothic-bold;
  font-size: 45px;
  color:#999;
`;

const ConBox = styled.View`
  flex:10;
  padding: 7%;
`;

const NoDataBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  color:#666;
  font-size:16px;
  font-family: NanumGothic;
`;