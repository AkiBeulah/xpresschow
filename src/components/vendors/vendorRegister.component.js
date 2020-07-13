import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import AuthService from "../../services/auth.service";
import VendorService from "../../services/vendor.service";

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
      log: [],
      password: "",
      loading: false,
      message: "",
      email: "",
      companyName: "",
      companyBranch: "",
      vendorName: "",
      address: "",
      location: "Abuja",
      phoneNumber: ""
    };
  }
  
  onChangeLogo = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        logo: JSON.stringify(VendorService.vendorImageUpload(e.target.files[0]))
      })
    }
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCompanyName = (e) => {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangeCompanyBranch = (e) => {
    this.setState({
      companyBranch: e.target.value
    });
  }

  onChangeVendorname = (e) => {
    this.setState({
      vendorName: e.target.value
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
      AuthService.vendorRegister(
        this.state.email,
        this.state.password,
        this.state.companyName,
        this.state.companyBranch,
        this.state.phoneNumber,
        this.state.address,
        this.state.location,
        this.state.vendorName
      ).then(
        () => {
          window.location.reload()
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
          });
        }
      );

      this.setState({
        email: "",
        companyName: "",
        companyBranch: "",
        vendorName: "",
        address: "",
        location: "Abuja",
        phoneNumber: "",
        password: ""
      })
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
              type="file"
              className="form-control form-control-lg"
              name="logo"
              ref="file"
              placeholder="Logo"
              onChange={this.onChangeLogo}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="text"
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
              name="vendorname"
              placeholder="Vendorname"
              value={this.state.vendorName}
              onChange={this.onChangeVendorname}
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
              name="company name"
              placeholder="Company Name"
              value={this.state.companyName}
              onChange={this.onChangeCompanyName}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-6">
            <Input
              type="text"
              className="form-control form-control-lg"
              name="company branch"
              placeholder="Company Branch"
              value={this.state.companyBranch}
              onChange={this.onChangeCompanyBranch}
              validations={[required]}
            />
          </div>

          <div className="form-group col-md-12">
            <Input
              type="text"
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
              type="text"
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

          <div className="form-group col-md-12">
            <button className="btn btn-outline-primary btn-lg btn-block" disabled={this.state.loading} >
              {this.state.loading ?
                (<span className="spinner-border spinner-border-sm"></span>)
                :
                <span>Sign Up</span>
              }
            </button>
            <div className="btn btn-success disabled btn-lg btn-block">Sign Up With Google</div>
          </div>

          <CheckButton style={{ display: "none" }}
            ref={c => { this.checkBtn = c; }} readOnly
          />
        </Form>
      </div>
    );
  }
}