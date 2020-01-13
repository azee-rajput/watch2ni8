import React, {Component} from 'react';
import Movies from './movies';
import Navybar from './navbar';



export default class Popular extends Component{
    render(){
        return(
            <div>
                <Navybar/>
                <Movies url = "https://api.themoviedb.org/3/movie/popular?api_key=" heading="Popular Movies"/>
            </div>
        )
    }
}