import React, { Component } from "react";

class Stuff extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    fetch(`https://randomuser.me/api/?results=this.props.id`).then(results => results.json()).then(data => {
      let pictures = data.results;
      this.setState({pictures: pictures});
    })
  }

  render() {
    console.log(this.props.id);
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
        {this.state.pictures.map(pic =>
          <div key={pic.results}>
            <img src={pic.picture.medium} />
          </div>
        )}
      </div>
    );
  }
}

export default Stuff;
