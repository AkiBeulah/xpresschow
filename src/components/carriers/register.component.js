import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWalking, faBiking, faCar } from '@fortawesome/free-solid-svg-icons'

import AuthService from "../../services/auth.service";
import CarrierService from "../../services/carrier.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class VendorRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      loading: false,
      message: "",
      email: "",
      firstname: "",
      lastname: "",
      carriername: "",
      address: "",
      location: "Abuja",
      phoneNumber: "",
      vType: "foot"
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangeFirstName = (e) => {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastName = (e) => {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeCarrierName = (e) => {
    this.setState({
      carriername: e.target.value
    });
  }

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value
    });
  }

  onChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  onChangeVehicleType = (e) => {
    this.setState({
      vType: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  onChangePhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.carrierRegister(
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        this.state.phoneNumber,
        this.state.address,
        this.state.location,
        this.state.carriername
      ).then(
        () => {
          window.location.reload()
          this.setState({
            loading: false
          }, () => {
            this.setState({
              email: "",
              firstname: "",
              lastname: "",
              address: "",
              location: "Abuja",
              phoneNumber: "",
              password: "",
              carriername: ""
            })
          })
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          }, () => {
            this.setState({
              email: "",
              firstname: "",
              lastname: "",
              address: "",
              location: "Abuja",
              phoneNumber: "",
              password: "",
              carriername: ""
            })
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="card-body xx">
        <Form onSubmit={this.handleRegister}
          className="row"
          ref={c => {
            this.form = c;
          }}
        >
          {this.state.message && (
            <div className="form-group col-md-12">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
          <div className="form-group col-md-12">
            <Input
              type="email"
              className="form-control form-control-lg"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="text"
              className="form-control form-control-lg"
              name="carriername"
              placeholder="Username"
              value={this.state.carriername}
              onChange={this.onChangeCarrierName}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="password"
              className="form-control form-control-lg"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-6">
            <Input
              type="text"
              className="form-control form-control-lg"
              name="name"
              placeholder="First Name"
              value={this.state.companyName}
              onChange={this.onChangeFirstName}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-6">
            <Input
              type="text"
              className="form-control form-control-lg"
              name="surname"
              placeholder="Last Name"
              value={this.state.companyBranch}
              onChange={this.onChangeLastName}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="address"
              className="form-control form-control-lg"
              name="address"
              placeholder="Address"
              value={this.state.address}
              onChange={this.onChangeAddress}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="tel"
              className="form-control form-control-lg"
              name="tel"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.onChangePhoneNumber}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12 d-flex flex-row justify-content-between">
            <div className="w-50">
              <input
                type="radio"
                className="vendor-radio-button"
                value="Abuja"
                id="Abuja"
                checked={this.state.location === "Abuja"}
                onChange={this.onChangeLocation}
              />
              <label htmlFor="Abuja" className="vendor-radio-label w-100 text-center">
                Abuja
              </label>
            </div>

            <div className="w-50">
              <input
                type="radio"
                className="vendor-radio-button"
                value="Covenant University"
                id="covenantUniversity"
                checked={this.state.location === "Covenant University"}
                onChange={this.onChangeLocation}
              />
              <label htmlFor="covenantUniversity" className="vendor-radio-label w-100 text-center">
                Covenant University
              </label>
            </div>
          </div>

          <div className="form-group col-md-12 d-flex flex-row justify-content-between">
            <div className="w-33">
              <input
                type="radio"
                className="vendor-radio-button"
                value="foot"
                id="foot"
                checked={this.state.vType === "foot"}
                onChange={this.onChangeVehicleType}
              />
              <label htmlFor="foot" className="vendor-radio-label w-100 text-center" style={{fontSize: "1.2rem"}}>
                <FontAwesomeIcon icon={faWalking} />
              </label>
            </div>

            <div className="w-33">
              <input
                type="radio"
                className="vendor-radio-button"
                value="bike"
                id="bike"
                checked={this.state.vType === "bike"}
                onChange={this.onChangeVehicleType}
              />
              <label htmlFor="bike" className="vendor-radio-label w-100 text-center" style={{fontSize: "1.2rem"}}>
                <FontAwesomeIcon icon={faBiking} />
              </label>
            </div>

            <div className="w-33">
              <input
                type="radio"
                className="vendor-radio-button"
                value="car"
                id="car"
                checked={this.state.vType === "car"}
                onChange={this.onChangeVehicleType}
              />
              <label htmlFor="car" className="vendor-radio-label w-100 text-center" style={{fontSize: "1.2rem"}}>
                <FontAwesomeIcon icon={faCar} />
              </label>
            </div>
          </div>

          <div className="form-group col-md-12">
            <button className="btn btn-outline-primary btn-lg btn-block" disabled={this.state.loading} >
              {this.state.loading ?
                (<span className="spinner-border spinner-border-sm"></span>)
                :
                <span>Sign Up</span>
              }
            </button>
          </div>

          <CheckButton style={{ display: "none" }}
            ref={c => { this.checkBtn = c; }} readOnly
          />
        </Form>
      </div>
    );
  }
}