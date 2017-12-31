import React, { Component } from "react";
import Mapbox from './Mapbox';

const uuidv4 = require('uuid/v4');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      id: uuidv4(),
      height: "500px"
    }
  }

  render() {
    return (
      <div id="main-wrap">
        <div id="sidebar">
          <p>...</p>

        </div>
        <div id="content-wrap">
          <Mapbox id={this.state.id} height={this.state.height} roads={[]} />
        </div>
      </div>
    );
  }
}

export default Home;
