import React from "react"
import L from 'leaflet';
import 'leaflet-draw';

const uuidv4 = require('uuid/v4');


var MapState = {
  EMPTY: 1,
  MAP_DRAWN: 2,
  ROUTE_DRAWN: 3,
};

class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      map: null,
      roads: props.roads || [],
      mapState: MapState.EMPTY,
      centreOnHouse: props.centreOnHouse || false,
      height: props.height || "500px",
      zoom: props.zoom || false,
      drawShapes: props.drawShapes || false
    }
  }

  drawShapes(map) {
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;
      drawnItems.addLayer(layer);

       if ( event.layerType === "circle" )
       {
           document.getElementById( "shapeLatitude" ).value = layer._latlng.lat;
           document.getElementById( "shapeLongitude" ).value = layer._latlng.lng;
           document.getElementById( "shapeRadius" ).value = layer._mRadius;
       }
    });
  }

  drawRoute() {
    let coordinates = this.state.roads.map(rawPoint => new L.LatLng(rawPoint["latitude"], rawPoint["longitude"]));
    let map = this.state.map;

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
      map: map,
      mapState: MapState.ROUTE_DRAWN
    })
  }

  createMap() {
    var map = L.map(`map-${this.state.id}`, {drawControl: true, zoomControl:this.state.zoom});

    if(!this.state.zoom) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
    }

    if(this.state.centreOnHouse) {
      const position = [51.357397146246264, -0.20153965352074504];
      map.setView(position, 13);
    }

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if(this.state.drawShapes) {
      this.drawShapes(map);
    }

    this.setState({
      map: map,
      mapState: MapState.MAP_DRAWN
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      roads: newProps.roads,
    });
  }

  componentDidMount() {
    if(this.state.mapState === MapState.EMPTY) {
      this.createMap()
    }
  }

  componentDidUpdate() {
    if(this.state.mapState === MapState.EMPTY) {
      this.createMap();
    }

    if(this.state.mapState === MapState.MAP_DRAWN && this.state.roads.length > 0) {
      this.drawRoute();
    }
  }

  render() {
    if(!this.state.id) {
      return (
        <p>
          Loading...
        </p>
      )
    } else {
      return (
        <div id={`map-${this.state.id}`} style={{height:`${this.state.height}`, width: '100%'}}>

        </div>
      )
    }
  }
}

export default Mapbox;
