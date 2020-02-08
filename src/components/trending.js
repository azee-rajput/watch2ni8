import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class trending extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies type="trending" heading="Trending Movies"/>
            </div>
        )
    }
}