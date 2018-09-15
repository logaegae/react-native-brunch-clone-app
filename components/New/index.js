import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import ViewHeader from './Header';
import WriteCon from './WriteCon';
import { domain } from '../../config';

class NewView extends React.Component {

    state = {
        article : {
            _id : null,
            isModalVisible: false,
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
                            photo : article.bgStyle.photo,
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
            article
        });
    }
    render() {
        const {article, goBack} = this.state;
        return (
            <Container>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <ViewHeader article={article} handleState={this._handleState} goBack={goBack}/>
                <ConBox>
                    <WriteCon handleState={this._handleState} article={article}/>
                </ConBox>
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

export default NewView;