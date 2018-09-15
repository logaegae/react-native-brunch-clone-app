import React from 'react';
import { Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../../style/theme';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class Search extends React.Component {
    render() {
        return (
            <SearchContainer>
                <SearchBox>
                    <SearchInput
                        underlineColorAndroid="transparent"
                        placeholder={"검색..."}
                        placeholderTextColor={"#999"}
                    />
                    <SearchButton onPressOut={() => this.props.navigation.navigate('Search')}>
                        <Ionicons name="ios-search" size={40} color={Theme.mainColor}/>
                    </SearchButton>
                </SearchBox>
            </SearchContainer>
        );
  }
}

const SearchContainer = styled.View`
    align-items : flex-end;
    justify-content : center;
    width:${width}px;
    margin-top : 20px;
    margin-bottom : 20px;
`;
const SearchBox = styled.View`
    width : ${width - 100}px;
    border-bottom-width : 4px;
    border-bottom-color : ${Theme.mainColor};
    flex-direction : row;
    padding-right : 20px;
`;
const SearchInput = styled.TextInput`
    width : ${width - 170}px;
    padding : 10px;
    font-size : 30px;
    text-align : right;
`;
const SearchButton = styled.TouchableHighlight`
    width : 56px;
    height : 56px;
    justify-content : center;
    align-items : center;
`;

export default withNavigation(Search);