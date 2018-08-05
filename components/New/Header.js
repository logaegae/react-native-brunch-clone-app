import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { requestSaveArticle } from '../../actions';

class NewHeader extends React.Component {
    
    render() {
        const token = this.props.login.token;
        return (
            <Header>
                <ButtonBox>
                    <Ionicons 
                        name="md-arrow-back" 
                        size={50} 
                        style={{fontWeight : 'bold'}} 
                        color="#333"
                        onPress={()=>{this.props.navigation.navigate('Home')}}
                    />
                    <TitleText>
                        글쓰기
                    </TitleText>
                    <SaveText
                        onPress={()=>{this.props.requestSaveArticle(this.props.article, token)}}
                    >
                        저장
                    </SaveText>
                </ButtonBox>
            </Header>
        );
    }
}

const Header = styled.View`
    padding : 10px 0;
`;
const ButtonBox = styled.View`
    width : 100%;
    padding : 35px 10px 0;
    justify-content:space-between;
    align-items : center;
    flex-direction : row;
`;
const HeartText = styled.Text`
    color : white;
    font-size : 20px;
    margin-top : -3px;
    font-family : NanumGothic;
`;
const TitleText = styled.Text`
    font-size : 24px;
    color : #333;
    font-weight : bold;
    font-family : NanumGothic-bold;
`;
const SaveText = styled.Text`
    font-size : 20px;
    text-decoration : underline;
    color : blue;
    font-family : NanumGothic;
`;

const mapStateToProps = (state) => {
    return {
      login: state.redux.auth.login
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        requestSaveArticle : (article, token) => {
            return dispatch(requestSaveArticle(article, token));
        }
    };
};

const NewHeaderWithNavi = withNavigation(NewHeader);

export default connect(mapStateToProps, mapDispatchToProps)(NewHeaderWithNavi);