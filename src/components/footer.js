import React,{Component} from 'react';

import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import tmdb from '../img/tmdb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';


const Wrapper = styled("div")`
background: #111111;
padding:0;
margin: auto;
text-align:center;
color: #555555;
`;

const RowCustom= styled(Row)`
display: flex;
align-items: center;
`;

// const StyledLink = styled(Link)`
//  font-size: 30pt;
//  color: #777777;
//  transition:0.5s;
//  &:hover{
//      text-decoration: none;
//      transition: 0.5s;
//      color:#45f3ff;
//  }
// `;

const StyledAnchor = styled("a")`
 font-size: 14pt;
 color: #777777;
 transition:0.5s;
 &:hover{
     text-decoration: none;
     transition: 0.5s;
     color:#45f3ff;
 }
`;

const Title = styled(Link)`
 font-size: 3em;
    color: #111111;
    transition: 0.5s;
    font-weight: bold;
    text-shadow: 1px 1px 0px #45f3ff,
                -1px -1px 0px #45f3ff,
                -1px 1px 0px #45f3ff;

    &:hover {
        transition: 0.5s;
        text-shadow: 1px 1px 12px,
        -1px -1px 12px;
        color: #45f3ff;
        text-decoration: none;
        color: #45f3ff;
    }
`;

const Powered = styled.h5`
color: #45f3ff;
`;

export default class Footer extends Component{
    render(){
        return(
            <Wrapper id="#about">
                <Container fluid>
                    <RowCustom>
                        <Col sm={4}>
                            <h5>Developed By: <b style={{color: "#45f3ff"}}>A.Zahir</b></h5>
                            <h5>Find me on</h5>
                            <StyledAnchor href="https://findazee.herokuapp.com" target="_blank"><FontAwesomeIcon icon='laptop-code'/> My Portfolio</StyledAnchor>
                            <br/>
                            <StyledAnchor href="https://github.com/azee-rajput" target="_blank"><FontAwesomeIcon icon={['fab','github']}/> My Github</StyledAnchor>
                            <br/>
                            <StyledAnchor href="https://www.linkedin.com/in/abdul-zahir-rajput-585898152/" target="_blank"><FontAwesomeIcon icon={['fab','linkedin']}/> My Linkedin</StyledAnchor>
                        </Col>
                    

                    
                        <Col sm={4}>
                            <Title to='/'>Watch2Ni8</Title><br/>
                            <StyledAnchor href="https://github.com/azee-rajput/watch2ni8" style={{fontSize:"30pt"}}><FontAwesomeIcon icon={['fab','github']}/></StyledAnchor>
                        </Col>
                    

                    
                        <Col sm={4}>
                            <Powered>Powered By</Powered>
                            <img src={tmdb} width="25%" alt="the movie db logo"/>
                            <p>Backend APIs are consumed from <StyledAnchor href="https://www.themoviedb.org/documentation/api" target="_blank">The Movie DB</StyledAnchor></p>
                        </Col>
                    </RowCustom>
                </Container>
            </Wrapper>
        )
    }
}