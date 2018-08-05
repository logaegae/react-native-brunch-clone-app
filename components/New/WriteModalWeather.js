import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

class Option extends Component{
  render(){
    return(
      <ModalRow 
        onPress = { this.props.onClick } activeOpacity = { 0.8 } >
        <ModalIconBox>
          <MaterialCommunityIcons name={this.props.select.iconName} size={25} color={this.props.select.iconColor} />
        </ModalIconBox>
        <ModalLabel>{this.props.select.label}</ModalLabel>
        <ModalCheckBox>
          {this.props.select.id === this.props.selectedId ? <Feather name="check" color="#666" size={30} /> : ``}              
        </ModalCheckBox>
      </ModalRow>
    );
  }
}

export default class ModalWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      weatherOpt: [
        {
          id: 1,
          label: "선택 안 함",
          iconName: "cloud-off-outline",
          iconColor: "transparent",
          isChecked: false,
        },
        {
          id: 2,
          label: "Sunny",
          iconName: "weather-sunny",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 3,
          label: "Cloudy",
          iconName: "weather-cloudy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 4,
          label: "Sunny & Cloudy",
          iconName: "weather-partlycloudy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 5,
          label: "Rainy",
          iconName: "weather-pouring",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 6,
          label: "Windy",
          iconName: "weather-windy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 7,
          label: "Snowy",
          iconName: "weather-snowy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 8,
          label: "fog",
          iconName: "weather-fog",
          iconColor: "#333",
          isChecked: false,
        },
      ],
      selectedOpt: this.props.parentState.id,
    };  
  }

  componentDidMount(){
    this.state.weatherOpt.map(( item ) =>
    {
      if( item.isChecked == true ){
        this.setState({ 
          selectedOpt: item.id,
        });
      }
    });
  }
  
  changeActiveOption(index){
      const id = this.state.weatherOpt[index].id
      const obj = id !== 1 ? {
        id : id,
        name : this.state.weatherOpt[index].iconName
      } : {
        id : 1,
        name : null
      };

      this.state.weatherOpt.map(( opt ) => {
        opt.isChecked = false; 
      });

      this.state.weatherOpt[index].isChecked = true;

      this.setState({ weatherOpt: this.state.weatherOpt }, () => {
          this.setState({ 
            selectedOpt: id, 
          });
      });
      this.props.handleWeather(obj);
  }

  render(){
    const state = this.state;

    return(
      <ModalWrap>
        {this.state.weatherOpt.map(( item, key ) => (
          <Option key = { key } select = { item } selectedId={state.selectedOpt} onClick = { this.changeActiveOption.bind( this, key ) }/>
        ))}
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalRow = styled.TouchableOpacity`
  position: relative;
  padding: 0 7%;
  height:60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const ModalIconBox = styled.View`
  width: 70px;
`;

const ModalLabel = styled.Text`
  color:#333;
  font-family: 'NanumGothic';
  font-size:17px;
`;

const ModalCheckBox = styled.View`
  width: 30px;
  height: 30px;
  position:absolute;
  right:11%;
`;