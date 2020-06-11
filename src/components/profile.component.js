import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: JSON.parse(AuthService.getCurrentUser())
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container">
        <br/>
        <div className="row">
          <div className="row col-md-12">
            <div className="profile-image">
              {currentUser.last_name.charAt(0)}
              {currentUser.first_name.charAt(0)}
            </div>
            <div className="col-md-6 display-4 d-flex flex-column justify-content-center">
              {currentUser.last_name + " " + currentUser.first_name}
            </div>
          </div>
        </div>
        <div className="col-md-12">

        </div>
      </div>
    );
  }
}