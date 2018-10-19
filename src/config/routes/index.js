import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import * as Screens from '../../screens'

const Routes = () => (
    <Router>
      <div>
        <Route exact path="/" component={Screens.Login} />
        <Route exact path="/setProfile" component={Screens.SetProfile} />
        <Route exact path="/setLocation" component={Screens.Map} />
      </div>  
    </Router>
);

export default Routes;  