import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import RunningRoute from "./RunningRoute"
import Mapbox from "./Mapbox"

class RunningRoutes extends Component {
  constructor() {
    super();
    this.state = {
        routes: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/routes2`).then(results => results.json()).then(data => {
      this.setState({routes: data});
    })
  }

  render() {
    return (
      <div>
        <Route path={`${this.props.match.url}/:id`} render={props => (
            <RunningRoute {...props} key={this.props.match.id}  />
        )} />
        <Route exact path={this.props.match.url} render={() => (
          <div>
          <h2>Routes</h2>
          {this.state.routes.length === 0 && <p>Loading...</p>}
          <ul className="route">
          {this.state.routes.map((route) =>
            <li key={route.id} className="route">
              <div style={{width:"300px"}}>
                <NavLink exact to={`${this.props.match.url}/${route.id}`}>{(route.distance / 1.6 / 1000).toFixed(2)} miles</NavLink>
                <Mapbox key={route.id} id={route.id} roads={route.roads} height="200px" />
              </div>
            </li>
          )}
          </ul>
          </div>
        )}/>
      </div>
    );
  }
}



export default RunningRoutes;
