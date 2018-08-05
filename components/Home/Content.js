import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import ContentItem from './ContentItem';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class Content extends React.Component {
  render() {
    return (
        <ContentContainer>
            <ContentBox>
                <ContentItem/>
            </ContentBox>
            <ButtonBox>
                <SimpleLineIcons
                    name="plus" 
                    size={40}
                    color={Theme.mainColor}
                    onPress={()=>{this.props.navigation.navigate('New')}}
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

export default withNavigation(Content);