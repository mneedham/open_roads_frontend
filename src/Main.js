import React, {Component} from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Activities from "./Runs";
import RunningRoutes from "./RunningRoutes";
import Segments from "./Segments";

class Main extends Component {
    render()
    {
        return (
            <BrowserRouter>
                <div>
                    <h1>Where should I go running?</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Generate Route</NavLink></li>
                        <li><NavLink to="/routes">Routes</NavLink></li>
                        <li><NavLink to="/activities">Activities</NavLink></li>
                        <li><NavLink to="/segments">Segments</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={props => <Home
                            title="Generate a new route - Where should I go running?" {...props} />}/>
                        <Route path="/routes" component={props => <RunningRoutes
                            title="Generated routes - Where should I go running?" {...props}  />}/>
                        <Route path="/segments" component={props => <Segments
                            title="Segments - Where should I go running?" {...props}  />}/>
                        <Route path="/activities" component={Activities}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;
