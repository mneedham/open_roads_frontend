import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import RunningRoute from "./RunningRoute"
import Mapbox from "./Mapbox"

class RunningRoutes extends Component {
  constructor(props) {
    super(props);
    document.title = props.title;
    this.state = {
        counter: 1,
        routes: []
    };
    this.showMore = this.showMore.bind(this);
  }

  fetchRoads() {
    fetch(`http://localhost:5000/routes2`).then(results => results.json()).then(data => {
      this.setState({routes: data});
    })
  }

  componentDidMount() {
    this.fetchRoads();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.counter > prevState.counter) {
      this.fetchRoads();
    }
  }

  componentWillReceiveProps(nextProps) {
    document.title = nextProps.title;
  }

  showMore(event) {
    this.setState((prevState, props) => {
      return {counter: prevState.counter + 1};
    });
  }

  render() {
    return (
      <div>
        <Route path={`${this.props.match.url}/:id`} render={props => (
            <RunningRoute {...props} key={props.match.params.id}  title={`Route ${props.match.params.id}  - Where should I go running?`} />
        )} />
        <Route exact path={this.props.match.url} render={() => (
          <div>
          <div>
            <h2 style={{display: 'inline'}}>Routes</h2>
            <div style={{float: 'right'}} onClick={this.showMore}><a href="#">Show more</a></div>
          </div>

          {this.state.routes.length === 0 && <p>Loading...</p>}
          <ul className="route">
          {this.state.routes.map((route) =>
            <li key={route.id} className="route">
              <div style={{width:"300px"}}>
                <NavLink exact to={`${this.props.match.url}/${route.id}`}>{(route.distance / 1.6 / 1000).toFixed(2)} miles</NavLink>
                <Mapbox key={route.id} id={route.id} roads={route.roads} height="150px" />
              </div>
            </li>
          )}
          </ul>
          </div>
        )}/>
      </div>
    );
  }
}



export default RunningRoutes;
