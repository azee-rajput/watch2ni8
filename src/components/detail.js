import React,{Component} from 'react';
// import {Redirect} from 'react-router-dom';

import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';

import Movies from './movies';
import Navybar from './navbar';
import Loading from './loading';

const Wrapper = styled.div`
background: #12151A;
min-height:100vh;
color: white;

& > *{
    width: 100%;
}


.movieRow{
    padding: 30px;
    min-height:100vh;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.leftArea{
    margin-top: auto;
    margin-bottom: auto;
    vertical-align: middle;
    align-items:center;
}

.mainArea > *{
    padding-top: 30px;
    padding-bottom: 30px
}


.poster img{
    width:100%;
    height: auto;
}

.rightArea{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}

.scrollable{
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding:5px;
}

.cast{
    padding-top: 20px;
    vertical-align: middle;
    align-items:center;
}

.cast h5, .cast h6{
    text-align: left !important;
}

.cast img{
    height: auto;
    width:80%;
}

.trailer{
    padding-top: 30px;
    height: 250px;
}

.trailer iframe{
    height:100%;
    width:100%;
}

`;


class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            text: "",
            data:[],
            genres:[],
            cast:[],
            video:[],
            baseURI:"https://api.themoviedb.org/3/movie/",
            apiKey:"?api_key=73e58e5716904b8f0c8e5d54c3dc79f1",
            imageBaseURI:"http://image.tmdb.org/t/p/original",
            movieId:"",
            paramsChange: false,
            mounted:false,

        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        const movieId = this.props.match.params.idmovie;
        this.setState({movieId:this.props.match.params.idmovie});
        fetch(this.state.baseURI+movieId+this.state.apiKey)
        .then(response=>response.json())
        .then(data=>{
            if(data.genres===undefined){
                this.setState({data:data})
            }else{
                this.setState({data:data, genres:data.genres})
            }
        })

        fetch(this.state.baseURI+movieId+"/credits"+this.state.apiKey)
        .then(response=>response.json())
        .then(data=>{
            if(data.cast===undefined){
                this.setState({cast:undefined})
            }
            else{
                this.setState({cast:data.cast})
            }
        })

        fetch(this.state.baseURI+movieId+"/videos"+this.state.apiKey)
        .then(response=>response.json())
        .then(data=>{
            if(data.status_code===34){
                // console.log(data);
                this.setState({mounted:true})
            }else{
                console.log(data.length);
                // console.log(data);
                data.results.filter(res=>res.type==="Trailer").map(item=>this.setState({video: item.key, mounted:true}))
            }
            
        })
        
        
    }


    componentDidUpdate(){
        if (this.state.movieId !== this.props.match.params.idmovie){
            window.scrollTo(0, 0);
            this.setState({
                paramsChange: true,
                movieId: this.props.match.params.idmovie,
            })
        }
    }
    

    render(){
        // console.log(this.state.cast.length)
        if(!this.state.mounted){
            return ( <Loading/>)
        }

        if( this.state.cast=== undefined || this.state.cast.length === 0){
            console.log(this.state.cast)
            return(
                <div style={{minHeight:"80vh", color:"#45f3ff", textAlign:"center"}}>
                    <h1>Something's not right. Sorry for inconvenience. <br/> Please try again later</h1>
                </div>
            )
        }

        if(this.state.paramsChange){
            // return(
            //     <Redirect to={"/refresh/"+this.state.movieId}/>
            // )

            fetch(this.state.baseURI+this.state.movieId+this.state.apiKey)
            .then(response=>response.json())
            .then(data=>this.setState({data:data, genres:data.genres, paramsChange: false}))

            fetch(this.state.baseURI+this.state.movieId+"/credits"+this.state.apiKey)
            .then(response=>response.json())
            .then(data=>this.setState({cast:data.cast}))

            fetch(this.state.baseURI+this.state.movieId+"/videos"+this.state.apiKey)
            .then(response=>response.json())
            .then(data=>{
                data.results.filter(res=>res.type==="Trailer")
                .map(item=>this.setState({video: item.key, mounted: true}))
            })
            return <Loading/>
        }else{

            return(
                <Wrapper>
                    <Navybar/>
                    <Container fluid>                        
                        <Row                     
                        className="movieRow"
                        style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${this.state.imageBaseURI+this.state.data.backdrop_path})`}}>

                            <Col className="leftArea" sm={9}>
                                <Row className="heading">
                                    <Col sm={12}><h3><b>{this.state.data.title}</b></h3></Col>
                                    <Col sm={12}>{(this.state.data.tagline==="" ? "" :<h5 className="tagline"><i>{this.state.data.tagline}</i></h5>)}</Col>
                                </Row>

                                <Row className="mainArea">
                                    <Col sm={12}><h5><b>Overview: </b>{this.state.data.overview}</h5></Col>
                                    <Col sm={6}><h5><b>Genres: </b>{this.state.genres.map((tag, index)=>(<span>{tag.name+(index===this.state.genres.length-1 ? "." : ",")} </span>))}</h5></Col>
                                    <Col sm={6}><h5><b>Runtime: </b>{this.state.data.runtime}(mins)</h5></Col>
                                    <Col sm={6}><h5><b>Rating: </b>{this.state.data.vote_average}/10</h5></Col>
                                    <Col sm={6}><h5><b>Release Date: </b>{this.state.data.release_date}</h5></Col>
                                    {(this.state.data.homepage==="" ? "" :<Col sm={6}><a href={this.state.data.homepage} rel="noopener noreferrer" target="_blank">{this.state.data.title}</a></Col>)}
                                    <Col sm={6}><a href={"https://www.imdb.com/title/"+this.state.data.imdb_id} rel="noopener noreferrer" target="_blank">IMDB Link</a></Col>
                                </Row>
                            </Col>

                            <Col className="rightArea" sm={3}>
                                <Row className="scrollable" >
                                    <h3 className="castHeading"><b>Cast</b></h3>
                                    {this.state.cast===undefined ? null : this.state.cast.map((char)=>(
                                        <Row className="cast">
                                            <Col><img src={this.state.imageBaseURI+char.profile_path} alt={char.name+" Image not available"}/></Col>
                                            <Col><h5>{char.character}</h5> <h6>{char.name}</h6></Col>
                                        </Row>
                                    ))}
                                </Row>  

                                <Row className="trailer">
                                    <h3><b>Trailer</b></h3>
                                    {(this.state.video.length > 0 ? <iframe title="trailer" src={"https://www.youtube.com/embed/"+this.state.video} frameBorder="0"  allowFullScreen></iframe> : <h5>Trailer not Available</h5>)}
                                </Row>
                            </Col>                              
                        </Row>

                        <Row>
                            <Movies sliced="4"
                                cover="3"
                                type = "recommend"
                                heading="Recommended"/>
                        </Row>

                    </Container>
                </Wrapper>
            )
        }
    }
}

export default Detail;