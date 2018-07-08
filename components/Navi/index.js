import React, {Component} from 'react';
import {ScrollView, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';

const { height, width } = Dimensions.get("window");

class SideMenu extends Component {
  render () {
    return (
      <Container>
        <ScrollView>
          <CloseBox>
            <TouchableOpacity onPress={this.props.navigation.closeDrawer}>
              <Ionicons size={50} name="md-close" color="#333"/>
            </TouchableOpacity>
          </CloseBox>
          <Title>Trable</Title>
          <TitleLineBox>
            <TitleLine></TitleLine>
          </TitleLineBox>
          <View>
            <Center>
              <StartButtonTO>
                <StartButton>Begin My Travel</StartButton>
              </StartButtonTO>
            </Center>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const Container = styled.View`
  padding : 40px 10px;
`;
const Center = styled.View`
  align-items : center;
`;
const CloseBox = styled.View`
  flex-direction : row;
  justify-content : flex-end;
`;
const Title = styled.Text`
  width : 100%;
  font-size : 50px;
  padding-left : 10px;
`;
const TitleLineBox = styled.View`
  padding-left : 50px;
  padding-top : 2px;
  margin-bottom : 30px;
`;
const TitleLine = styled.Text`
  background : ${Theme.mainColor};
  width : 100%;
  height : 3px;
`;
const Menu = styled.Text`
  width : 100%;
  font-size : 25px;
  padding : 20px;
  border : 1px #333 solid;
`;
const StartButtonTO = styled.TouchableOpacity`
  width : 220px
  padding : 15px 0;
  border-radius : 30px;
  border : 2px solid ${Theme.mainColor};
`
const StartButton = styled.Text`
  width : 100%;
  color : ${Theme.mainColor}
  text-align : center;
  font-size : 22px;
`;
export default withNavigation(SideMenu);