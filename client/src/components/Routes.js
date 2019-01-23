import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from './AppBar';
import Homepage from './Homepage';
import Admin from './Admin';
import Callback from './Callback';
import NotFound from './NotFound';

import SK from './SKBranch/patients';
//import MH from './MHBranch/tests'


class Routes extends Component {
    render(){
        return(
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/patient" component={SK} />
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route path='/callback' component={Callback} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }

}
export default (Routes);
