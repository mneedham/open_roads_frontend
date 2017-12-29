import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"

class StuffList extends Component {
  render() {
    return (
      <div>
        <h2>STUFF</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
        rhoncus eget sapien:</p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>

        <Route path={`${this.props.match.url}/:id`} component={Stuff} />
        <Route exact path={this.props.match.url} render={() => (
          <ul>
          {[1,2,3,4,5].map(value =>
            <li key={value}><NavLink exact to={`${this.props.match.url}/${value}`}>{value}</NavLink></li>
          )}
          </ul>
        )}/>
      </div>
    );
  }
}

class Stuff extends Component {
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

        {this.state.pictures.map(pic =>
          <div key={pic.results}>
            <img src={pic.picture.medium} />
          </div>
        )}

      </div>
    );
  }
}

export default StuffList;
