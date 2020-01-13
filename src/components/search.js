import React, {Component} from 'react';

// import {Redirect} from 'react-router-dom';

import Movies from './movies';
import Navybar from './navbar';


export default class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:false,
            view: true,
            searched:"",
            paramsChange: false,
        }
    }

    componentDidMount(){
        const searched = this.props.match.params.search.split(' ').join('&');
        this.setState({searched: searched});
    }

    componentDidUpdate(){
        if(!this.state.loaded && this.state.view){
            this.setState({loaded:true})
        }else if(this.state.loaded && this.state.view){
            this.setState({view:false})
        }

        if (this.state.searched !== this.props.match.params.search){
            console.log("hello world");
            this.setState({
                paramsChange: true,
                searched: this.props.match.params.search,
            })
        }
    }

    render(){
        if(this.state.paramsChange){
            // return(
            //     <Redirect to={"/refresh/"+this.state.searched}/>
            // )
            this.setState({paramsChange: false})
            return null
        }else{
            if(this.state.loaded){
                return(
                    <div>
                        <Navybar/>
                        <Movies sliced="100"
                            cover="3"
                            url = {"https://api.themoviedb.org/3/search/multi?query="+this.state.searched+"&api_key="}
                            heading={"Searching Results For "+this.state.searched}/>
                    </div>
                )
            }else{
                return(
                    <h3>Loading... Please wait</h3>
                )
            }
        }
    }

}