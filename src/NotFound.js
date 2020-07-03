import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'

export default class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  updatedLocation = (loc) => {
    this.props.upStateLoc(loc)
  }

  render() {
    return (
      <>
        <div className="container text-center error404">
          <div className="error404-text">The page you're hungry for isn't here...</div>
       </div>
      </>
    );
  }
}