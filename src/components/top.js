import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Top extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies type="top" heading="Top Rated Movies"/>
            </div>
        )
    }
}