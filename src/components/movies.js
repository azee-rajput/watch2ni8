import React, {Component} from 'react';

import api from '../api';

import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Loading from './loading';


const Wrapper=styled.div`

    background: #222222;

    text-align:center;
    position: relative;
    padding:10px;
    color: white;
    min-height: 100vh;


    .cardParent{
        visibility: hidden;;
    }

    .cardParent > *{
        visibility: visible;;
        margin-top:25px;
        background:transparent;
        border:none;
        transform: scale(1);
        transition: 0.5s;

        img{
            width:100%;
            height: auto;
        }
    }

    .cardParent:hover > * { 
        opacity: 0.4; 
        transform: scale(0.95);
     }


    .cardParent> *:hover { 
        opacity: 1; 
        transform: scale(1.05);  
        cursor: pointer;
        transition: 0.5s;
    }
`;

const ResultsHead = styled.h1`

  
`;


class Movies extends Component{
    constructor(props){
        super(props);
        this.state={
            text:"bello",
            baseURI: props.url,
            apiKey:"73e58e5716904b8f0c8e5d54c3dc79f1",
            imageBaseURI:"http://image.tmdb.org/t/p/original",
            data:[],
            sliced: parseInt(props.sliced) || 20,
            cover: parseInt(props.cover) || 3,
            mounted:false,
            id:"",
            go:false,
        }
    }
   
    url(){
        
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        if(this.props.type === "now_playing"){
            api.nowPlaying(data=>this.setState({data:data.results, mounted:true}));
        }else if(this.props.type === "popular"){
            api.popular(data=>this.setState({data:data.results, mounted:true}));
        }else if(this.props.type === "top"){
            api.top(data=>this.setState({data:data.results, mounted:true}));
        }else if(this.props.type === "trending"){
            api.popular(data=>this.setState({data:data.results, mounted:true}));
        }else if(this.props.type === "search"){
            api.search(data=>this.setState({data:data.results, mounted:true}));
        }else if(this.props.type === "recommend"){
            api.recommend(data=>this.setState({data:data.results, mounted:true}));
        }
    }

    find(id){
        this.setState({go:true, id:id});
    }

    render(){
        if(this.state.go){
            return(
                <Redirect to={'/movie/'+this.state.id}/>
            )
        }

        if(!this.state.mounted){
            return(
                <Loading/>
            )
        }

        if(this.state.data === undefined){
            return (<Wrapper>
                <ResultsHead><h1>No Results Found</h1></ResultsHead>
            </Wrapper>) 
        }
        
        if(this.state.data.length < 1 && this.state.mounted){
            return (<Wrapper>
                <ResultsHead><h1>No Results Found</h1></ResultsHead>
            </Wrapper>)
        }

        return(
            <Wrapper>
                <Container fluid>
                <h3>{this.props.heading}</h3>
                    <Row className="cardParent">
                        {this.state.data.slice(0,parseInt(this.state.sliced)).map((item)=>(
                            
                            (item.media_type === "person" || item.overview=== "In Development" || item.poster_path === null  ? ""
                             : <Col md={this.state.cover} key={item.id} onClick={()=>this.find(item.id)}>
                                <img key={item.id} src={this.state.imageBaseURI+item.poster_path} 
                                alt={item.title||item.name}/>
                                {/* <h5>{item.title || item.name}</h5> */}
                             </Col>)
                        ))}
                    </Row>
                </Container>
            </Wrapper>
        )
    }
}

export default Movies;