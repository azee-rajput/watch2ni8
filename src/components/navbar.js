import React, {Component} from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

 
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledNav = styled(Navbar)`
    background: #111111;
    text-align: center;
    // justify-content: space-evenly;
    


    .toggle{
        transition:0.5s;
    }
    .toggle:hover{
        transition: 0.5s;
        border:1px solid #45f3ff;
        box-shadow: 0px 0px 12px #45f3ff;
    }

    .formArea{
        display: block;
    }
`;


const StyledLink = styled(Link)`
color: #777777;
padding: 5px;
border: none;
transition: 0.5s;

&:hover{
    color: #45f3ff;
    text-decoration: none;
    transition:0.5s;
}

& h3{
    color: #111111;
    transition: 0.5s;
    font-weight: bold;
    text-shadow: 1px 1px 0px #45f3ff,
                -1px -1px 0px #45f3ff,
                -1px 1px 0px #45f3ff;
}

&:hover h3{
    transition: 0.5s;
    text-shadow: 1px 1px 12px,
    -1px -1px 12px;
    color: #45f3ff;
}
`;

const ContainLinks = styled(Nav)`
 justify-content: center;
 margin: auto;
 text-align: center;
 width: 100%;
//  background: red;
 justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
margin : auto;
border-radius: 0;
border:1px solid #45f3ff;
background: #45f3ff;
color: black;
transition: 0.5s;

&:hover{
    transition:0.5s;
    background: #000000;
    color: #45f3ff;
    border: 1px solid #45f3ff
}
`;

const SearchBox = styled(FormControl)`
background transparent;
color: #45f3ff;
border: none;
border: 1px solid #45f3ff;
box-shadow: none;
transition: 0.5s;
border-radius: 0;

&::placeholder{
color : #45f3ff;
}

&:focus::placeholder{
color: black;
font-weight: bold;
}

&:focus{
    background: #45f3ff;
    color: black;
    transition: 0.5s;
    border-radius: 0;
    box-shadow: none;
}
`;


export default class Navybar extends Component{

    constructor(props){
        super(props);
        this.entering=this.entering.bind(this);
        this.state={
            search: "",
            change: false,
            clicked: false,
            entered: false,
            params: window.location.pathname,
            paramsChange: false,
        }
    }

    changed(e){
        this.setState({
          search : e.target.value,
        })
    
        if(e.target.value===null||e.target.value===""||e.target.value===undefined){
          this.setState({
            change : false
          })
        }else{
            this.setState({
              change : true
            })
        }
      }

      clicked(){
          if(this.state.change){
            this.setState({
                clicked: true
            })
          }
      }

      entering(e){
        if(e.charCode===13){
            e.preventDefault();
            this.clicked();
          }
      }

    render(){

        if(this.state.clicked){
            return <Redirect to={"/search/"+this.state.search}/>
        }

        return(
                <StyledNav variant="dark" expand="lg" sticky="top">
                    {/* <Navbar.Brand href={"/"}>Watch-2ni8</Navbar.Brand> */}
                    <StyledLink to="/" className="title"><h3>Watch2Ni8</h3></StyledLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <ContainLinks>
                            <StyledLink to="/trending">Trending</StyledLink>
                            <StyledLink to="/popular">Popular</StyledLink>
                            <StyledLink to="/top">Top Rated</StyledLink>
                            <StyledLink to="/playing">In Theaters</StyledLink>
                            <Form inline className="formArea">
                                <SearchBox type="text" placeholder="Search" value={this.state.search} onChange={(e)=>this.changed(e)} onKeyPress={this.entering}/>
                                <StyledButton type="button" onClick={()=>this.clicked()} variant="outline-light">Search</StyledButton>
                            </Form>
                        </ContainLinks>
                    </Navbar.Collapse>
                </StyledNav>
        )
    }
}