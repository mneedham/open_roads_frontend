import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import RunningRoute from "./RunningRoute"

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
          <ul>
          {this.state.routes.map((route) =>
            <li key={route.id}>
              <NavLink exact to={`${this.props.match.url}/${route.id}`}>{route.id}</NavLink> {(route.distance / 1.6 / 1000).toFixed(2)} miles
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
