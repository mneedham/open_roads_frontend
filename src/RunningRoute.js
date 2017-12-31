import React, { Component } from "react"
import Mapbox from './Mapbox'

class RunningRoute extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      roads: [],
      distance: 0
    };
  }

  fetchData(id) {
    fetch(`http://localhost:5000/routes2/${id}`).then(results => results.json()).then(data => {
      this.setState({
        id: id,
        roads: data.roads,
        distance: data.distance
      });
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
      <div id="main-wrap">
        <div id="sidebar">
          <p>Distance: {(this.state.distance / 1.6 / 1000).toFixed(2)} miles</p>
          <p>
            <a href={`http://localhost:5000/routes/${this.props.match.params.id}?type=gpx`} download>Download as GPX</a>
          </p>
        </div>
        <div id="content-wrap">
          <Mapbox id={this.state.id} roads={this.state.roads} />
        </div>
      </div>
    );
  }
}

export default RunningRoute;
