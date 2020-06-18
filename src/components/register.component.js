import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      successful: false,
      message: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.email,
        this.state.password,
        this.state.first_name,
        this.state.last_name,
        this.state.phone_number,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      ).then(
        this.props.hideModel(),
        this.props.showModel()
      );
    }
  }

  render() {
    return (
      <div className="card xx">
        <div className="card-body xx">
          <div className="col-md-12">
            <div className="btn btn-success disabled btn-lg btn-block">Sign Up With Google</div>
          </div>
          <br />
          <div className="text-center">OR</div>
          <br />

          <Form onSubmit={this.handleRegister}
            ref={c => { this.form = c; }} >

            {this.state.message && (
              <div className="form-group col-md-12">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

            {!this.state.successful && (
              <div className="row container">
                <div className="form-group col-md-6">
                  <Input type="text" className="form-control form-control-lg" name="email" placeholder="First Name"
                    value={this.state.first_name} onChange={this.onChangeFirstName} validations={[required]} />
                </div>

                <div className="form-group col-md-6">
                  <Input type="text" className="form-control form-control-lg" name="email" placeholder="Last Name"
                    value={this.state.last_name} onChange={this.onChangeLastName} validations={[required]} />
                </div>

                <div className="form-group col-md-12">
                  <Input type="text" className="form-control form-control-lg" name="email" placeholder="Email"
                    value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]} />
                </div>

                <div className="form-group col-md-12">
                  <Input type="password" className="form-control form-control-lg" name="password" placeholder="Password"
                    value={this.state.password} onChange={this.onChangePassword} validations={[required, vpassword]} />
                </div>

                <div className="form-group col-md-12">
                  <Input type="text" className="form-control form-control-lg" name="email" placeholder="Phone Number"
                    value={this.state.phone_number} onChange={this.onChangePhoneNumber} validations={[required]} />
                </div>

                <div className="form-group col-md-12">
                  <button className="btn btn-outline-primary btn-lg btn-block">Sign Up</button>
                </div>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={c => { this.checkBtn = c; }} readOnly
            />
          </Form>
        </div>
      </div>
    );
  }
}