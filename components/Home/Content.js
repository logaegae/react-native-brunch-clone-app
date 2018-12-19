import React from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';
import ContentItem from './ContentItem';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const { height, width } = Dimensions.get("window");

class Content extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        confirmVisible: false,
        }
    }

    handleGoWrite = () => {
        const login = this.props.login;
    
        if(login.logged){
        //   this.props.navigation.navigate("New");
          this.props.navigation.navigate("Editor");
        } else {
          this.setState({ confirmVisible: true })
        }
      }

    render() {

        const confirmMsg = `글쓰기는 로그인 후에 이용 가능합니다.` + String.fromCharCode(13) + `로그인 페이지로 이동하시겠습니까?`;

        return (
            <ContentContainer>
                <ContentBox>
                    <ContentItem token={this.props.login.token} nickname={this.props.login.name} setLikeIcon={this.props.setLikeIcon}/>
                </ContentBox>
                <HomeFooter>
                    <Button footerBtn onPress={() => this.handleGoWrite()}>
                        <SimpleLineIcons name="pencil" color="#fff" size={20} />
                    </Button>
                    <Button footerBtn onPress={() => this.props.navigation.navigate("List")}>
                        <SimpleLineIcons name="list" color="#fff" size={25} />
                    </Button>
                    <ConfirmDialog
                        // title=""
                        message={confirmMsg}
                        visible={this.state.confirmVisible}
                        // onTouchOutside={() => this.setState({backConfirmVisible: false})}
                        positiveButton={{
                            title: "네",
                            onPress: () => this.props.navigation.navigate("SignIn")
                        }}
                        negativeButton={{
                            title: "아니오",
                            onPress: () => this.setState({confirmVisible: false}) 
                        }}
                        />  
                </HomeFooter>
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
const HomeFooter = styled.View`
    flex : 1.5;
    flex-direction:row;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
  margin: 0 10px;
  ${prop => prop.footerBtn ? `
    align-items: center;
    justify-content: center;
    width: 50px; 
    height: 50px;
    border-radius: 25px;
    background:#bbb;
  ` : null}
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

