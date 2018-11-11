import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class DrawerHeader extends React.Component {
  render() {
    return (
        <Header>
            <ButtonBox>
                <Ionicons 
                    name="ios-arrow-round-back" 
                    size={50} 
                    color="#333"
                    onPress={()=>{this.props.navigation.navigate('Home')}}
                />
                <TitleText>
                    {this.props.title}
                </TitleText>
            </ButtonBox>
        </Header>
    );
  }
}

const Header = styled.View`
    border-bottom-width : 1px;
    border-bottom-color : #333;
`;
const ButtonBox = styled.View`
    width : 100%;
    padding :  0 15px;
    justify-content : space-between;
    flex-direction : row;
    position : relative;
    height : 50px;
    align-items : center;
`;
const TitleText = styled.Text`
    font-size : 24px;
    color : #333;
    position : absolute;
    width : ${width};
    text-align :center;
    font-weight : bold;
    z-index : -1;
`;


export default withNavigation(DrawerHeader);