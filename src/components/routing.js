import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './landing';
// import Movies from './movies';
import Detail from './detail';
import Search from './search';
import Popular from './popular';
import Trending from './trending';
import Top from './top';
import Playing from './playing';


class Routing extends Component{
    render(){
        return(
            
            <Switch>
                <Route exact path={'/'} component={Landing}/>
                <Route path={'/playing'} component={Playing}/>
                <Route path={'/top'} component={Top}/>
                <Route path={'/popular'} component={Popular}/>
                <Route path={'/trending'} component={Trending}/>
                <Route path={'/movie/:idmovie'} component={Detail}/>
                <Route path={'/search/:search'} component={Search}/>
            </Switch>
        )
    }
}

export default Routing;