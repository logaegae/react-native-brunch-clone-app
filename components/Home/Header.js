import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class Header extends React.Component {
  render() {
    return (
        <HomeHeader>
            <MenuButton onPress={() => { this.props.navigation.toggleDrawer(); }}>
                <Ionicons name="md-menu" size={50}/>
            </MenuButton>
        </HomeHeader>
    );
  }
}

const MenuButton = styled.TouchableOpacity`
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

export default withNavigation(Header);