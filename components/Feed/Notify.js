import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect, } from 'react-redux';
import styled from 'styled-components';
import NotifyItem from './NotifyItem';
import Header from '../Common/ContentHeader';
import { setNotifyIcon } from '../../actions';
import axiosRequest from '../../lib/axiosRequest';
import { debounce } from "debounce";

class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      listCount : 1,
      message : '로딩중',
      dataSource: [],
      endYn : false
    }
  }

  inverterHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getAlarmList();
    this.inverterHandler = setInterval(()=>{
      this.getAlarmList();
    },10000);
  }

  getAlarmList () {
    //@ Boolean Fn ( path, obj, token ) / promise
    axiosRequest('/api/alarm/getUserAlarm', {type:'notify', listCount:this.state.listCount}, this.props.login.token)
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
      if(res.data.status){}
      else
        alert(err);
    });
  }

  componentWillUnmount () {
    clearInterval(this.inverterHandler);
    
    axiosRequest('/api/alarm/confirmAlarm', {type:'notify'}, this.props.login.token)
    .then((res)=>{
      this.props.setNotifyIcon(false);
    }).catch((err) => {
      if(res.data.status){}
      else
        alert(err);
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
    },1000))();
  }

  _keyExtractor = (item, index) => item._id;
  
  render(){
    const { dataSource, message } = this.state;
    return(
        <Wrap>
          <Header title="알림" />
          <ConBox>
            {Object.keys(dataSource).length === 0
              ? (<NoItemText>{message}</NoItemText>)
              : 
              <FlatList
                data={dataSource}
                renderItem={({item}) => <NotifyItem data={item} key={item._id}/>}
                onEndReached = {()=>{this._onEndReached()}}
                onEndReachedThreshold = {0.5}
                keyExtractor={this._keyExtractor}
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
  flex : 1;
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
    setNotifyIcon : (bool) => {
      return dispatch(setNotifyIcon(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);