import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Top extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" heading="Top Rated Movies"/>
            </div>
        )
    }
}