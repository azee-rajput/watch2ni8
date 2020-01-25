import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Playing extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies type="now_playing" heading="Now Playing In Theaters"/>
            </div>
        )
    }
}