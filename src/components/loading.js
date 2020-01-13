import React, {Component} from'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    min-height:90vh;
    background:#222222;
    color:#45f3ff;
    text-align: center;

    & > *{
        margin-top: auto;
        margin-bottom: auto;
    }
`;


export default class Loading extends Component{

    render(){
        return (
            <Wrapper><h1>Loading.... Please Wait</h1></Wrapper>
        )
    }
}