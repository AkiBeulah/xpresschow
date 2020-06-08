import React, { Component } from 'react'
import Carousel from './pages/Carousel'
import Instructions from './pages/Instructions'

export default class Home extends Component {
    render() {
    return (
      <>
        <Carousel />
        <Instructions />
      </>
    );
  }
}