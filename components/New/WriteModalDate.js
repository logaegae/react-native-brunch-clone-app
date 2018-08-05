import React, { Component } from 'react';
import { Switch, Dimensions } from 'react-native';
import styled from 'styled-components';
import DatePicker from 'react-native-datepicker';

export default class ModalDate extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      switchOneday: false,
      startDate: this.props.parentState.startDate,
      finishDate: this.props.parentState.finishDate,
    }
  }

  // _toggleModal = () => {
  //   this.setState({ isModalVisible: !this.state.isModalVisible });
  // }

  render(){
    const parentState = this.props.parentState;

    return(
      <ModalWrap>
        <ModalRow>
          <ModalLabel>One Day Trip</ModalLabel>
          <Switch 
            value={this.state.switchOneday}
            onValueChange={(value) => this.setState({switchOneday: value})}
            />
        </ModalRow>
        <ModalRow>
          <ModalLabel>Start</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={this.state.startDate}
            mode="date"
            placeholder="2018.08.01"
            format="YYYY.MM.DD"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={false}
            customStyles={{
              dateInput: {
                alignItems: 'flex-end',
                borderColor: '#fff',
              },
              dateText: {
                color:'#333',
                fontSize: 19,
                fontFamily: 'hd-bold',
              },
              placeholderText: {
                color:'#bbb',
                fontSize: 19,
                fontFamily: 'hd-bold',
              }
            }}
            onDateChange={(date) => {this.setState({startDate: date})}}
          />
        </ModalRow>
        <ModalRow>
          <ModalLabel>Finish</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={this.state.finishDate}
            mode="date"
            placeholder="2018.08.01"
            format="YYYY.MM.DD"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={false}
            customStyles={{
              dateInput: {
                alignItems: 'flex-end',
                borderColor: '#fff',
              },
              dateText: {
                color:'#333',
                fontSize: 19,
                fontFamily: 'hd-bold',
              },
              placeholderText: {
                color:'#bbb',
                fontSize: 19,
                fontFamily: 'hd-bold',
              }
            }}
            onDateChange={(date) => {this.setState({finishDate: date})}}
          />
        </ModalRow>
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalRow = styled.View`
  padding: 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const ModalLabel = styled.Text`
  color:#333;
  font-family: 'hd-regular';
  font-size:17px;
`;