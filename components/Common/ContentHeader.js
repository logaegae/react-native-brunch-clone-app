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
                    name="md-arrow-back" 
                    size={50} 
                    style={{fontWeight : 'bold'}} 
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
    padding : 10px 0;
    border-bottom-width : 1px;
    border-bottom-color : #333;
`;
const ButtonBox = styled.View`
    width : 100%;
    padding : 35px 10px 0;
    justify-content:space-between;
    flex-direction : row;
    position : relative;
`;
const TitleText = styled.Text`
    font-size : 24px;
    color : #333;
    position : absolute;
    width : ${width};
    text-align :center;
    font-weight : bold;
    top: 50px;
    z-index : -1;
`;
const SaveText = styled.Text`
    font-size : 20px;
    text-decoration : underline;
`;


export default withNavigation(DrawerHeader);