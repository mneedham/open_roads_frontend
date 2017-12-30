import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import ReactDOM from 'react-dom'

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

const position = [51.505, -0.09]
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
    if(!this.state.mapLoaded) {
      var mapDiv = document.createElement("div");
      mapDiv.id = "map";
      document.getElementById("root").appendChild(mapDiv);
      this.setState({mapLoaded: true});
    }

    // If necessary, trigger nested updates in componentDidUpdate.
    // Need to do this instead of rendering the map in render

    this.fetchData(this.props.match.params.id);
  }

  render() {
    if(this.state.mapLoaded) {
      console.log("rendering map")
      ReactDOM.render(<Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup.<br />Easily customizable.
            </span>
          </Popup>
        </Marker>
      </Map>, document.getElementById('map'))
    }
    // how do I get the map DOM element before trying to render into it?

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
