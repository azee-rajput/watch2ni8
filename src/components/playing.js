import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Playing extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" heading="Now Playing In Theaters"/>
            </div>
        )
    }
}