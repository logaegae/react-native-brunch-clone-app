import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LikeItem from './LikeItem';
import Header from '../Common/ContentHeader';
import { setLikeIcon } from '../../actions';
import axiosRequest from '../../lib/axiosRequest';

class Like extends Component {
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

  intervalHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getAlarmList();
    this.intervalHandler = setInterval(()=>{
      this.getAlarmList();
    },10000);
  }

  getAlarmList () {
    const { page, seed, data } = this.state;
    //@ Boolean Fn ( path, obj, token ) / promise
    axiosRequest('/api/alarm/getUserAlarm', {type:'like', page, seed}, this.props.login.token)
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

  _getAlarmItems () {
    if(Object.keys(this.state.alarms).length === 0) return null;
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
    const { data, refreshing, loading, message, init } = this.state;
    return(
        <Wrap>
          <Header title="좋아요"/>
          <ConBox>
            {data.length !== 0
                ? <FlatList
                    data={data} 
                    renderItem={({item}) => <LikeItem data={item} key={item._id}/>}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={loading ? this.renderFooter : null}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                  />
                : init ? <NoItemText>{message}</NoItemText>  : null}
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
    setLikeIcon : (bool) => {
      return dispatch(setLikeIcon(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);