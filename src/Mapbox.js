import React from "react"
import L from 'leaflet';


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
    if(newProps.roads.length > 0) {
      let lats = newProps.roads.map(c => c.latitude).reduce((previous, current) => current += previous, 0.0);
      let longs = newProps.roads.map(c => c.longitude).reduce((previous, current) => current += previous, 0.0);
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
    return (
      <div id="map" style={{height:'500px', width: '100%'}}>
      xx
      </div>
    )
  }
}

export default Mapbox;
