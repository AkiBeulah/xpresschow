import React, { Component } from 'react';
import Car from 'react-bootstrap/Carousel'

export default class Carousel extends Component {
  render() {
    const objectFit = { objectFit: 'cover' }
    return (
      <>
        <div className="carousel-height w-100 car-overlay">
          <div className="w-50 car-form-title">
            Where are you?
          </div>
          <div className="w-50">
            <div className="location-buttons">
              <div className="location-button">
                <input className="location-button-radio" type="radio" name="location" id="location-1" value="abuja" checked />
                <label className="for-location-button-radio" htmlFor="location-1">
                  <span data-hover="Abuja">Abuja</span>
                </label>
              </div>

              <div className="location-button">
                <input className="location-button-radio" type="radio" name="location" value="covenant-university" id="location-2" />
                <label className="for-location-button-radio" htmlFor="location-2">
                  <span data-hover="Covenant University">Covenant University</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Car>
          <Car.Item>
            <img
              className="d-block carousel-height w-100"
              src="https://i.ibb.co/cLwRBdD/img1.jpg"
              alt="First slide"
              style={objectFit}
            />
          </Car.Item>
          <Car.Item>
            <img
              className="d-block carousel-height w-100"
              src="https://i.ibb.co/FsTNSrF/img2.jpg"
              alt="Third slide"
              style={objectFit}
            />
          </Car.Item>
          <Car.Item>
            <img
              className="d-block carousel-height w-100"
              src="https://i.ibb.co/rKjh4h3/img3.jpg"
              alt="Third slide"
              style={objectFit}
            />
          </Car.Item>
        </Car>
      </>
    );
  }
}