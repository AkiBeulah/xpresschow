import React, { Component } from 'react';

export default class Instructions extends Component {
  render() {
    return (
      <>
        <div className="container">
                <div className="section-title-font display-2">
                    How it works?
                </div>
                <div className="d-flex flex-row">
                    <div className="col text-center bg-danger instruction instruction-1">
                        <i className="instruction-icon fas fa-concierge-bell"></i> Choose meal
                    </div>
                    <div className="col text-center bg-warning instruction instruction-2">
                        <i className="instruction-icon fas fa-handshake"></i>Place order
                    </div>
                    <div className="col text-center bg-success  instruction instruction-3">
                        <i className="instruction-icon fas fa-money-bill-wave"></i>Pay
                    </div>
                </div>
                <div className="col text-center instruction instruction-4 rainbow-bg">
                    <i className="instruction-icon fas fa-truck"></i>
                    Then we bring the food to you to enjoy...
                </div>
        </div>
      </>
    );
  }
}