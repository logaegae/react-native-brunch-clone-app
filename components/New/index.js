import React from 'react';
import { View, Button } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import ViewHeader from './Header';
import WriteCon from './WriteCon';
import { domain } from '../../config';
import CameraRoll from '../CameraRoll';

class NewView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article : {
                _id : null,
                isModalVisible: false,
                isModal2Visible: false,
                switchOneday : false,
                modalType: "",
                startDate: "",
                finishDate: "",
                title : null,
                text: null,
                weather : {
                    id : 1,
                    name : null
                },
                bg : {
                    photo : null,
                    color : {
                    id : 1,
                    value : "#6B5ED1"
                    }
                },
                delYn : false,
                published : false,
                isLiked : []
            },
            goBack : "Home"
        }
        this._toggleModal = this._toggleModal.bind(this);
    }

    componentDidMount() {
        const _id = this.props.navigation.getParam("_id");
        if(!_id) return false;

        axios.post(domain+'/api/article/getOneArticle',{_id})
        .then((res) => {
            if(res.data.status === "ARTICLE_GET_FAILED"){
                alert("ERROR\n"+res.data.message);
            }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){
                const article = res.data.data;
                this.setState({
                    article : {
                        _id : article._id,
                        startDate: article.startDate,
                        finishDate: article.finishDate,
                        title : article.title,
                        text: article.text,
                        weather : {
                            id : null,
                            name : article.weather
                        },
                        bg : {
                            photo : article.bgStyle.photoUrl,
                            color : {
                            id : null,
                            value : article.bgStyle.backgroundColor
                            }
                        },
                        delYn : article.delYn,
                        published : article.published
                    },
                    goBack : "Drawer"
                })
            }
        }).catch((error) => {
            alert("ERROR\n"+error.message);
        });
    }

    _handleState = (article) => {
        this.setState({
            ...this.state,
            article
        });
    }

    _toggleModal = () => {
        this.setState({ 
          ...this.state,
          article : {
              ...this.state.article,
              isModalVisible : false,
              modalType : '',
              isModal2Visible : !this.state.article.isModal2Visible
          }
        });
    };
    
    render() {
        const { article, goBack } = this.state;
        const { isModal2Visible } = article;
        return (
            <Container>
                {isModal2Visible ? 
                <Container>
                    <ModalHeader>
                    <ModalTit>
                        사진을 선택해주세요
                    </ModalTit>
                    <Button value="cancle" title="닫기" onPress={() => this._toggleModal()}/>
                    </ModalHeader>
                    <CameraRoll />
                </Container>
                :
                <Container>
                    <ViewHeader article={article} handleState={this._handleState} goBack={goBack}/>
                    <ConBox>
                        <WriteCon handleState={this._handleState} article={article} handleModal2={this._toggleModal}/>
                    </ConBox>
                </Container>
                }
            </Container>
        );
    }
}

const Container = styled.View`
    flex : 1;
`;
const ConBox = styled.View`
  flex:10;
`;
const ModalHeader = styled.View`
  padding: 10px 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  background: #fff;
`
const ModalTit = styled.Text`
  color:#999;
  font-family: 'NanumGothic';
  font-size:15px;
`;

export default NewView;