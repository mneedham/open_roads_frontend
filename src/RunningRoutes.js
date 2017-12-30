import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"

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
              <NavLink exact to={`${this.props.match.url}/${route.id}`}>{route.id}</NavLink> {route.distance}
            </li>
          )}
          </ul>
          </div>
        )}/>
      </div>
    );
  }
}

class RunningRoute extends Component {
  constructor() {
    super();
    this.state = {
      roads: []
    };
  }

  fetchData(id) {
    fetch(`http://localhost:5000/routes2/${id}`).then(results => results.json()).then(data => {
      this.setState({roads: data});
    })
  }

  componentWillReceiveProps(newProps) {
    this.fetchData(newProps.match.params.id);
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {this.state.roads.map((road, index) =>
          <div key={index}>
            {road.latitude}, {road.longitude}
          </div>
        )}

      </div>
    );
  }
}

export default RunningRoutes;
