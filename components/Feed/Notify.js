import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NotifyItem from './NotifyItem';
import Header from '../Common/ContentHeader';
import { setNotifyIcon } from '../../actions';
import axiosRequest from '../../lib/axiosRequest';

class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      message : '로딩중',
      init : false
    }
  }

  inverterHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getAlarmList();
  }

  getAlarmList () {
    const { page, seed, data } = this.state;

    //@ Boolean Fn ( path, obj, token ) / promise
    axiosRequest('/api/alarm/getUserAlarm', {type:'notify', page, seed}, this.props.login.token)
    .then((res)=>{
      let newState = {
        data: page === 1 ? res.data.list : [...data, ...res.data.list],
        error: res.message || null,
        loading: false,
        refreshing: false,
        endYn : res.data.endYn,
        init : true
      }
      if(res.data.list.length == 0 ) {
          newState.init = true;
          newState.loading = false;
          newState.message = "알려드릴 게 없네요.";
      }else newState.message = " ";

      this.setState(newState);

    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  componentWillUnmount () {
    clearInterval(this.inverterHandler);
    
    axiosRequest('/api/alarm/confirmAlarm', {type:'notify'}, this.props.login.token)
    .then((res)=>{
      this.props.setNotifyIcon(false);
    }).catch((err) => {
      alert(JSON.stringify(err.status));
    });
  }

  handleRefresh = () => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true,
      endYn : false
    },()=>{
      this.getAlarmList();
    });
  }

  handleLoadMore = () => {
    if (!this.state.loading && !this.state.endYn){
      this.setState({
        page : this.state.page + 1,
        loading : true
      },() => {
        this.getAlarmList();
      });
    }
  }

  renderFooter = (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  _keyExtractor = (item, index) => item._id;
  
  render(){
    const { data, refreshing, loading, init, message } = this.state;
    return(
        <Wrap>
          <Header title="알림" />
          <ConBox>
            {data.length !== 0
              ? <FlatList
                  data={data} 
                  renderItem={({item}) => <NotifyItem data={item} key={item._id}/>}
                  keyExtractor={this._keyExtractor}
                  ListFooterComponent={loading ? this.renderFooter : null}
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                /> :
                init ? <NoItemText>{message}</NoItemText> : null}
                {!init ? <Loading ><ActivityIndicator animating size="large" /></Loading> : null}
          </ConBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
  background-color : #FFF;
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
const Loading = styled.View`
  margin-top : 10%;
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
