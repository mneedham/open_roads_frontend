import React from "react"
import L from 'leaflet';


class Mapbox extends React.Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      map: null,
      roads: [],
      idPassedThrough: false,
      routeDrawn: false
    }
  }

  createMap() {
    let lats = this.state.roads.map(c => c.latitude).reduce((previous, current) => current += previous, 0.0);
    let longs = this.state.roads.map(c => c.longitude).reduce((previous, current) => current += previous, 0.0);
    let coordinates = this.state.roads.map(rawPoint => new L.LatLng(rawPoint["latitude"], rawPoint["longitude"]));

    const position = [lats / this.state.roads.length, longs / this.state.roads.length];
    var map = L.map(`map-${this.state.id}`, {drawControl: true}).setView(position, 14);

    this.setState({map: map});

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.polyline(
        coordinates,
        {
            color: 'blue',
            weight: 3,
            opacity: .7,
            lineJoin: 'round'
        }
    ).addTo(map);

    map.setView(position, 14);

    this.setState({
      routeDrawn: true,
      map: map
    })
  }

  componentWillReceiveProps(newProps) {
    if(newProps.id) {
      this.setState({
        id: newProps.id,
        roads: newProps.roads,
        idPassedThrough: true
      });
    }
  }

  componentDidUpdate() {
    if(this.state.idPassedThrough && !this.state.routeDrawn) {
      this.createMap();
      this.setState({
        routeDrawn: true
      });
    }
  }

  render() {
    if(!this.state.idPassedThrough) {
      return (
        <p>
          Loading...
        </p>
      )
    } else {
      return (
        <div id={`map-${this.state.id}`} style={{height:'500px', width: '100%'}}>
        xx
        </div>
      )
    }
  }
}

export default Mapbox;
