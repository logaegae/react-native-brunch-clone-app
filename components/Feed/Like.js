import React, { Component } from 'react'
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LikeItem from './LikeItem';
import Header from '../Common/ContentHeader';
import { setLikeIcon } from '../../actions';
import axiosRequest from '../../lib/axiosRequest';
import { debounce } from "debounce";

class Like extends Component {
  constructor(props){
    super(props);
    this.state = {
      listCount : 1,
      message : '로딩중',
      dataSource: [],
      endYn : false
    }
  }

  intervalHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getAlarmList();
    this.intervalHandler = setInterval(()=>{
      this.getAlarmList();
    },10000);
  }

  getAlarmList () {
    //@ Boolean Fn ( path, obj, token ) / promise
    axiosRequest('/api/alarm/getUserAlarm', {type:'like', listCount : this.state.listCount}, this.props.login.token)
    .then((res)=>{
      const alarms = res.data.data;
      const endYn = res.data.endYn;
      let newState = {...this.state}
      if(Object.keys(alarms).length === 0 ) {
          newState.message = "알려드릴 게 없네요.";
      }else newState.message = "";
      newState.dataSource = alarms;
      newState.endYn = endYn;
      this.setState(newState);
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _getAlarmItems () {
    if(Object.keys(this.state.alarms).length === 0) return '';
    let indents = [];
    Object.values(this.state.alarms).forEach((e,i)=>{
        indents.push(<LikeItem key={i} {...e} />);
    });
    return indents;
  }

  componentWillUnmount () {
    clearInterval(this.intervalHandler);
    
    axiosRequest('/api/alarm/confirmAlarm', {type:'like'}, this.props.login.token)
    .then((res)=>{
      this.props.setLikeIcon(false);
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _onEndReached(){
    if(!this.state.endYn)(debounce(()=>{
      const listCount = ++this.state.listCount;
      this.setState({
        ...this.state,
        listCount
      },()=>{
        this.getAlarmList();
      })
    },2000))();
  }
  
  _keyExtractor = (item, index) => item._id;

  render(){
    const { alarms, message, dataSource, endYn } = this.state;
    return(
        <Wrap>
          <Header title="좋아요"/>
          <ConBox>
              {Object.keys(dataSource).length === 0
                ? (<NoItemText>{message}</NoItemText>)
                : <FlatList
                    data={dataSource}
                    renderItem={({item}) => <LikeItem data={item} key={item._id}/>}
                    onEndReachedThreshold = {0.5}
                    keyExtractor={this._keyExtractor}
                    onMomentumScrollEnd={()=>{
                      if(!endYn){
                         //load datas
                        this._onEndReached();
                      }
                    }}
                  />
              }
          </ConBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
`;
const ConBox = styled.View`
  flex: 1;
`;
const NoItemText = styled.Text`
    width : 100%;
    padding : 7%;
    font-family : NanumGothic;
    font-size : 22px;
    text-align : center;
`;

const mapStateToProps = (state) => {
  return {
      login: state.redux.auth.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLikeIcon : (bool) => {
      return dispatch(setLikeIcon(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);