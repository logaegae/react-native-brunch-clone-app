import React, { Component } from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

class WriterItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render(){
    const { name, articleLength, _id, profileImg } = this.props;
    
    return (
      <Wrap onPressOut={() => this.props.navigation.navigate('WriterView',{writer_id:_id})}>  
        <Row>
          <WriterBox>
            <ProfileImgBox source={{uri : profileImg}}/>
            <WriterText>{name}</WriterText>
          </WriterBox>
          <ArticleNumText>글수 {articleLength}</ArticleNumText>
        </Row>
      </Wrap>
    )
  }
}
    
const Wrap = styled.TouchableOpacity`
  padding: 5% 7%;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const Row = styled.View`
  margin-bottom: 7%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WriterBox = styled.View`  
  flex-direction: row;
  align-items: center;
`;

const ProfileImgBox = styled.Image`
  width : 40px;
  height : 40px;
  border-radius : 20px;
  margin-right : 7px;
  background-color : transparent;
`;

const WriterText = styled.Text`
  font-family: NanumGothic;
  color:#333;
  font-size:16px;
`;

const ArticleNumText = styled.Text`
  font-family: NanumGothic;
  color:#666;
  font-size:12px;
`;

export default withNavigation(WriterItem);