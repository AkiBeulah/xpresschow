import React, { Component } from 'react';

export default class NotFound extends Component {
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