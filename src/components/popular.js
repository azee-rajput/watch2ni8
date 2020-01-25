import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Popular extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies type="popular" heading="Popular Movies"/>
            </div>
        )
    }
}