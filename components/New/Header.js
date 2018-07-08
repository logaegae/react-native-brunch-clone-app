import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class NewHeader extends React.Component {
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
                    글쓰기
                </TitleText>
                <SaveText
                    onPress={()=>{this.props.navigation.navigate('Drawer')}}
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
`;
const TitleText = styled.Text`
    font-size : 24px;
    color : #333;
    font-weight : bold;
`;
const SaveText = styled.Text`
    font-size : 20px;
    text-decoration : underline;
    color : blue;
`;


export default withNavigation(NewHeader);