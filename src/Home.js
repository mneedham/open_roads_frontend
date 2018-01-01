import React, { Component } from "react";
import Mapbox from './Mapbox';
import GenerateRoute from "./GenerateRoute"

const uuidv4 = require('uuid/v4');

class Home extends Component {
  constructor(props) {
    super(props);
    document.title = props.title;
    this.state = {
      id: uuidv4(),
      height: "500px"
    }
  }

  render() {
    const startLatitude = 51.357397146246264;
    const startLongitude = -0.20153965352074504;
    return (
      <div id="main-wrap">
        <div id="sidebar">
          <GenerateRoute startLatitude={startLatitude} startLongitude={startLongitude} />

        </div>
        <div id="content-wrap">
          <Mapbox id={this.state.id} height={this.state.height} roads={[]} centreOnHouse={true} />
        </div>
      </div>
    );
  }
}

export default Home;
