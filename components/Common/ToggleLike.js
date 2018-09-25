import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

class ToggleLike extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLiked : this.props.isLiked
        };
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike(_id) {
        const header = {
            headers : {
                'x-access-token' : this.props.login.token
            }
        }
        if(!this.props.login.token) return alert('Please Login');

        axios.post(domain + '/api/article/toggleLike', {_id}, header)
        .then((res) => {
            if(res.data.status === 'SUCCESS'){
                if(res.data.addAction){
                    // this.props.setLikeIcon(true);
                }
                this.setState({
                    isLiked : res.data.like
                })
            }
        });
    }

    render(){
        const {isLiked} = this.state;
        const {heartSize, numSize, _id, login, likeColor="#EC4568", unlikeColor="#fff", numColor="#fff"} = this.props;
        return (
            <LikeBox>
                <BtnLike>
                {isLiked && isLiked.indexOf(login.name) != -1 ? (
                    <Ionicons name="md-heart" color={likeColor} size={heartSize} onPress={()=>{this.handleLike(_id)}}/>
                    ) : (
                    <Ionicons name="md-heart-outline" color={unlikeColor} size={heartSize} onPress={()=>{this.handleLike(_id)}}/>
                    )
                }
                <LikeNum color={numColor} size={numSize}>{isLiked.length}</LikeNum>
                </BtnLike>
            </LikeBox>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ToggleLike);

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
  color:${props=>props.color};
  font-size:${props=>props.size}px;
  font-weight:500;
`;

        