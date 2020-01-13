import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Movies from './movies';
import Navybar from './navbar';
import Loading from './loading';

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-top:20px;
`;

const Wrapper = styled.div`
background: #222222;

color:white;

.posters img{
    max-height:100vh;
}

.leftSide{
    text-align: center;
}
 
`;

const StyledLink = styled(Link)`
padding: 5px;
margin: auto;
margin-bottom: 20px;
 color: #45f3ff;
 transition:0.5s;
 border: 1px solid #45f3ff;
 background: black;
 &:hover{
     border: none;
     text-decoration: none;
     transition: 0.5s;
     color:black;
     background: #45f3ff;
 }
`;


class Landing extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            apiKey:"73e58e5716904b8f0c8e5d54c3dc79f1",
            loaded:false,
            view: true,
            imageBaseURI:"http://image.tmdb.org/t/p/original",
            id:"",
            go:false,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key="+this.state.apiKey)
        .then(response=>response.json())
        .then(data=>this.setState({data:data.results}))
    }

    componentDidUpdate(){
        console.log(this.state.data);
        if(!this.state.loaded && this.state.view){
            this.setState({loaded:true})
        }else if(this.state.loaded && this.state.view){
            this.setState({view:false})
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

        if(this.state.loaded){
            return(
                <Wrapper>
                    <Navybar/>
                    <Container fluid>
                        <Row>
                            <Col className="leftSide" sm={4}>
                                <Row>
                                   <Movies sliced="4"
                                    cover="6"
                                    url = "https://api.themoviedb.org/3/movie/now_playing?api_key="
                                    heading="Now Playing In Theaters"/>
                                </Row>
                                <Row><StyledLink to="/playing">See More...</StyledLink></Row>                         
                            </Col>

                            <Col className="midSide" sm={4}>
                                <Title>Trending</Title>
                                <Carousel className="posters" autoPlay={true} showIndicators={false} infiniteLoop={true} transitionTime={300}>
                                    {this.state.data.map((slide)=>
                                        <div key={slide.poster_path}>
                                            <img src={this.state.imageBaseURI+slide.poster_path} alt={slide.poster_path}/>
                                            <button className="legend" onClick={()=>this.find(slide.id)}>More About {slide.title || slide.name}</button>
                                        </div>
                                    )}
                                </Carousel>
                            </Col>
                            <Col className="rightSide" sm={4}>
                                <Row>
                                   <Movies sliced="9"
                                    cover="4"
                                    url = "https://api.themoviedb.org/3/movie/popular?api_key="
                                    heading="Popular Movies"/>
                                </Row>
                                <Row><StyledLink to="/popular">See More...</StyledLink></Row>
                            </Col>
                        </Row>
                    </Container>
                </Wrapper>
            )
        }else{
            return(
                <Loading/>
            )
        }
    }
}

export default Landing;