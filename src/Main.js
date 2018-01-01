import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Runs from "./Runs";
import RunningRoutes from "./RunningRoutes";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Where should I go running?</h1>
          <ul className="header">
            <li><NavLink exact to="/">Generate Route</NavLink></li>
            <li><NavLink to="/routes">Routes</NavLink></li>
            <li><NavLink to="/runs">Runs</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={props => <Home title="Generate a new route - Where should I go running?" {...props} />}/>
            <Route path="/routes" component={props => <RunningRoutes title="Generated routes - Where should I go running?" {...props}  />} />
            <Route path="/runs" component={Runs}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
