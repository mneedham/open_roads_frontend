import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import L from 'leaflet';

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
      roads: [],
      mapLoaded: false
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
    // how do I get the map DOM element before trying to render into it?
    return (
      <div>
        <Mapbox roads={this.state.roads} />
      </div>
    );
  }
}

class Mapbox extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null
    }
  }

  componentDidMount() {
    this.createMap();
  }

  componentWillReceiveProps(newProps) {
    let lats = newProps.roads.map(c => c.latitude).reduce((previous, current) => current += previous);
    let longs = newProps.roads.map(c => c.longitude).reduce((previous, current) => current += previous);
    let coordinates = newProps.roads.map(rawPoint => new L.LatLng(rawPoint["latitude"], rawPoint["longitude"]));

    L.polyline(
        coordinates,
        {
            color: 'blue',
            weight: 3,
            opacity: .7,
            lineJoin: 'round'
        }
    ).addTo(this.state.map);

    const position = [lats / newProps.roads.length, longs / newProps.roads.length];
    this.state.map.setView(position, 14);
  }

  createMap() {
    const position = [51.505, -0.09]
    var map = L.map('map', {drawControl: true}).setView(position, 14);

    this.setState({map: map});

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  render() {
    return <div id="map" style={{height:'500px', width: '100%'}}>xx</div>
  }
}

export default RunningRoutes;
