import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path={`${this.props.match.url}/:id`} render={props => (
            <SingleRoute {...props} key={this.props.match.id}  />
        )} />
        <Route exact path={this.props.match.url} render={() => (
          <div>
          <h2>Routes</h2>
          <ul>
          {Array.from(new Array(20), (x,i) => i).map(value =>
            <li key={value}>
              <NavLink exact to={`${this.props.match.url}/${value}`}>{value}</NavLink>
            </li>
          )}
          </ul>
          </div>
        )}/>
      </div>
    );
  }
}

class SingleRoute extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }

  fetchData(id) {
    fetch(`https://randomuser.me/api/?results=${id}`).then(results => results.json()).then(data => {
      let pictures = data.results;
      this.setState({pictures: pictures});
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
      <div>
        {this.state.pictures.map((pic, index) =>
          <div key={index}>
            <img alt="" src={pic.picture.medium} />
          </div>
        )}

      </div>
    );
  }
}

export default Routes;
