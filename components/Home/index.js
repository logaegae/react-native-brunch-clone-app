import React from 'react';
import { StatusBar, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getStorage } from '../../actions';

import Header from './Header';
import Search from './Search';
import Content from './Content';

class Home extends React.Component {

    componentDidMount() {
        if(!this.props.login.logged) this.props.getUsersRequest();
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <Header/>
                <HomeBody>
                    <Search/>
                    <Content/>
                </HomeBody>
            </Container>
        );
    }
}

const Container = styled.View`
    flex : 1;
`;

const MenuButton = styled.TouchableHighlight`
    width : 50px;
    height : 50px;
    justify-content : center;
    align-items : center;
`;
const HomeHeader = styled.View`
    flex : 1;
    align-items : flex-start;
    justify-content : flex-end;
    padding : 0 20px;
`;
const HomeBody = styled.View`
    flex : 9;
    align-items : center;
`;

const mapStateToProps = (state) => {
    return {
        login: state.redux.auth.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersRequest: () => {
            return dispatch(getStorage()); 
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);