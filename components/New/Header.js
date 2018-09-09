import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { requestSaveArticle, article_getInit } from '../../actions';
import { setAlarmIcon } from '../../actions';

class NewHeader extends React.Component {

    state = {
        showDialog : false,
        showDialog2 : false
    }
    componentDidUpdate(prevProps) {
        if(prevProps.http !== this.props.http) {
            if(this.props.http.status === "SUCCESSED" || "UPDATED") {
                
                this.props.handleState({
                    ...this.props.article,
                    _id : this.props.http.result
                });
                this.props.article_getInit();
                this.setState({
                    showDialog : true
                });
                this.props.setAlarmIcon(true);
            }else if(this.props.result === "FAILED"){
                alert("저장 실패");
            }
        }
    }
    _closeConfirm(){
        this.setState({
            showDialog2 : true
        });
    }
    
    render() {
        const token = this.props.login.token;
        const article = this.props.article;
        const goBack = this.props.goBack;
        return (
            <Header>
                <ButtonBox>
                    <Ionicons 
                        name="md-arrow-back" 
                        size={50} 
                        style={{fontWeight : 'bold'}} 
                        color="#333"
                        onPress={()=>{this._closeConfirm()}}
                        />
                    <TitleText>
                        글쓰기
                    </TitleText>
                    <SaveText
                        onPress={()=>{this.props.requestSaveArticle(article, token)}}
                    >
                        저장
                    </SaveText>
                </ButtonBox>
                <ConfirmDialog 
                    visible={this.state.showDialog} 
                    title="저장되었습니다."
                    message="글관리에서 목록을 확인할까요?"
                    onTouchOutside={() => this.setState({showDialog: false})}
                    positiveButton={{
                        title: "YES",
                        onPress: () => this.props.navigation.navigate("Drawer")
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({showDialog: false})
                    }}
                >
                </ConfirmDialog>
                <ConfirmDialog 
                    visible={this.state.showDialog2} 
                    title="나가기"
                    message={`작성 중인 내용을 ${String.fromCharCode(13)}저장하지 않고 나가시겠습니까?`}
                    onTouchOutside={() => this.setState({showDialog2: false})}
                    positiveButton={{
                        title: "YES",
                        onPress: () => this.props.navigation.navigate(goBack)
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({showDialog2: false})
                    }}
                >
                </ConfirmDialog>
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
      login: state.redux.auth.login,
      http : state.redux.article.http
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        requestSaveArticle : (article, token) => {
            if(article === null) {
                alert("아무 내용도 입력하지 않으셨네요?");
                return false;
            }
            return dispatch(requestSaveArticle(article, token));
        },
        article_getInit : () => {
            return dispatch(article_getInit());
        },
        setAlarmIcon : (bool) => {
            return dispatch(setAlarmIcon(bool));
        }
    };
};

const NewHeaderWithNavi = withNavigation(NewHeader);

export default connect(mapStateToProps, mapDispatchToProps)(NewHeaderWithNavi);