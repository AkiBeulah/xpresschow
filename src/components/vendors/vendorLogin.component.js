import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class VendorLogin extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeCredential = this.onChangeCredential.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      credential: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeCredential = (e) => {
    this.setState({
      credential: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.vendorLogin(this.state.credential, this.state.password).then(
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="card-body xx">
        <Form onSubmit={this.handleLogin}
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
              type="text"
              className="form-control form-control-lg"
              name="credential"
              placeholder="Email or Vendorname"
              value={this.state.credential}
              onChange={this.onChangeCredential}
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

          <div className="form-group col-md-12">
            <button className="btn btn-outline-primary btn-lg btn-block" disabled={this.state.loading} >
              {this.state.loading ? (<span className="spinner-border spinner-border-sm"></span>)
                :
                <span>Sign In</span>
              }
            </button>
            <div className="btn btn-success disabled btn-lg btn-block">Sign In With Google</div>
          </div>

          <CheckButton style={{ display: "none" }}
            ref={c => { this.checkBtn = c; }} readOnly
          />
        </Form>
      </div>
    );
  }
}