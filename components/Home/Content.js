import React from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import ContentItem from './ContentItem';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';

const { height, width } = Dimensions.get("window");

class Content extends React.Component {

    render() {
        return (
            <ContentContainer>
                <ContentBox>
                    <ContentItem token={this.props.login.token} nickname={this.props.login.name} setLikeIcon={this.props.setLikeIcon}/>
                </ContentBox>
                <ButtonBox>
                    <SimpleLineIcons
                        name="plus" 
                        size={40}
                        color={Theme.mainColor}
                        onPress={()=>{
                            if(this.props.login.logged && this.props.login.token) this.props.navigation.navigate('New');
                            else this.props.navigation.navigate('SignIn');
                        }}
                    />
                </ButtonBox>
            </ContentContainer>
        );
    }
}

const ContentContainer = styled.View`
    flex : 10;
    width : ${width-10}px;
`;
const ContentBox = styled.View`
    flex : 7;
    width : 100%;
    border-radius : 10px;
`;
const ButtonBox = styled.View`
    flex : 1;
    align-items : center;
    justify-content : flex-start;
    width : 100%;
    padding-top: 10px;
`;

const mapStateToProps = (state) => {
    return {
        login: state.redux.auth.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLikeIcon : (bool) => {
            return dispatch(setLikeIcon(bool));
        }
    };
};

const ContentWithNavi = withNavigation(Content);
export default connect(mapStateToProps, mapDispatchToProps)(ContentWithNavi);

