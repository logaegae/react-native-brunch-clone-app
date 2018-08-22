import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");
const width20per = (width - width * 0.14) / 5;
const colorBtnWidth = width20per - 14;

class RadioButton extends Component{
  render(){
    return(
      <RadioBtn 
        onPress = { this.props.onClick } activeOpacity = { 0.8 } >
          <ColorCircle style={{backgroundColor: this.props.button.color}}>
          {
            (this.props.button.id === this.props.selectedId || this.props.button.color === this.props.selectedColor) ?
              (<Feather name="check" color="#fff" size={30} />)
              :
                null
          }
          </ColorCircle>
      </RadioBtn>
    );
  }
}

export default class ModalBg extends Component {
  constructor(props){
    super(props);
    this.state = { 
      radioItems: [
        {
          id: 1,
          color: '#6B5ED1',
          selected: true
        }, 
        {
          id: 2,
          color: '#6093E3',
          selected: false,
        },
        {
          id: 3,
          color: '#5ED9FF',
          selected: false
        },
        {
          id: 4,
          color: '#53DEA3',
          selected: false
        },
        {
          id: 5,
          color: '#58DE5E',
          selected: false
        },
        {
          id: 6,
          color: '#FF753D',
          selected: false
        }, 
        {
          id: 7,
          color: '#F8A71E',
          selected: false,
        },
        {
          id: 8,
          color: '#FFC316',
          selected: false
        },
        {
          id: 9,
          color: '#FFE225',
          selected: false
        },
        {
          id: 10,
          color: '#C2E330',
          selected: false
        },
        {
          id: 11,
          color: '#F25A6E',
          selected: false
        }, 
        {
          id: 12,
          color: '#E86DB7',
          selected: false,
        },
        {
          id: 13,
          color: '#FF89E8',
          selected: false
        },
        {
          id: 14,
          color: '#BC61E3',
          selected: false
        },
        {
          id: 15,
          color: '#9964EF',
          selected: false
        },
        {
          id: 16,
          color: '#aaa',
          selected: false
        }, 
        {
          id: 17,
          color: '#888',
          selected: false,
        },
        {
          id: 18,
          color: '#666',
          selected: false
        },
        {
          id: 19,
          color: '#444',
          selected: false
        },
        {
          id: 20,
          color: '#222',
          selected: false
        }

      ], 
      selectedItem: '',
      selectedColor: '', 
    }
  }

  componentDidMount(){
    this.state.radioItems.map(( item ) =>
    {
      if( item.selected == true ){
        this.setState({ 
          selectedItem: item.id,
          selectedColor: item.color 
        });
      }
    });
  }
  
  changeActiveRadioButton(index){
      this.state.radioItems.map(( item ) => { 
        item.selected = false; 
      });

      this.state.radioItems[index].selected = true;

      this.setState({ radioItems: this.state.radioItems }, () => {
          this.setState({ 
            selectedItem: this.state.radioItems[index].id, 
            selectedColor: this.state.radioItems[index].color,
          });
      });
      this.props.handleBg({
        photo : null,
        color : {
          id: this.state.radioItems[index].id, 
          value: this.state.radioItems[index].color
        }
      });
  }

  
  render(){
    const parentState = this.props.parentState;
    
    return(
      <ModalWrap>
        <ModalRow>
          <Btn>
            <ModalLabel underline>Photo</ModalLabel>
          </Btn>
        </ModalRow>
        <ColorBox>
          <ModalLabel>Color</ModalLabel>
          <RadioBox>
            {this.state.radioItems.map(( item, key ) => (
              <RadioButton key = { key } button = { item } selectedColor={parentState.color.value} selectedId={parentState.color.id} onClick = { this.changeActiveRadioButton.bind( this, key ) }/>
            ))}
          </RadioBox>
          <Text style={{height:30}}>id: {this.state.selectedItem}, bgColor: {this.state.selectedColor}</Text>
        </ColorBox>
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalRow = styled.View`
  position: relative;
  padding: 0 7%;
  height:60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const Btn = styled.TouchableOpacity`
`;

const ModalLabel = styled.Text`
  color: #333;
  font-family: 'NanumGothic-bold';
  text-decoration: ${props => props.underline ? `underline` : `none`};
  font-size:17px;
`;

const ColorBox = styled.View`
  padding: 7%;
`;

const RadioBox = styled.View`
  margin: 5px -7px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RadioBtn = styled.TouchableOpacity`
  flex-direction: row;
  margin: 7px;
  align-items: center;
  justify-content: center;
`;

const ColorCircle = styled.View`
  width: ${colorBtnWidth};
  height: ${colorBtnWidth};
  align-items: center;
  justify-content: center;
  border-radius: ${colorBtnWidth / 2};
`;