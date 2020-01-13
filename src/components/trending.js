import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class trending extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies url = "https://api.themoviedb.org/3/trending/all/day?api_key=" heading="Trending Movies"/>
            </div>
        )
    }
}