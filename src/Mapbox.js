import React from "react"
import L from 'leaflet';


class Mapbox extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      height: "500px",
      roads: [],
      idPassedThrough: false,
      routeDrawn: false
    }
  }

  createMap() {
    if(this.state.roads.length > 0) {
      let coordinates = this.state.roads.map(rawPoint => new L.LatLng(rawPoint["latitude"], rawPoint["longitude"]));

      var map = L.map(`map-${this.state.id}`, {drawControl: true, zoomControl:false});
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      let polyline = L.polyline(
          coordinates,
          {
              color: 'blue',
              weight: 3,
              opacity: .7,
              lineJoin: 'round'
          }
      )

      polyline.addTo(map);

      map.fitBounds(polyline.getBounds());

      this.setState({
        routeDrawn: true,
        map: map
      })
    }
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

  drawMap() {
    this.createMap();
    this.setState({
      routeDrawn: true
    });
  }

  componentWillMount() {
    if(this.props.id) {
      this.setState({
        id: this.props.id,
        roads: this.props.roads,
        height: this.props.height,
        idPassedThrough: true
      }, () => this.drawMap());
    }
  }

  componentDidUpdate() {
    if(this.state.idPassedThrough && !this.state.routeDrawn) {
      this.drawMap();
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
        <div id={`map-${this.state.id}`} style={{height:`${this.state.height}`, width: '100%'}}>
        xx
        </div>
      )
    }
  }
}

export default Mapbox;
