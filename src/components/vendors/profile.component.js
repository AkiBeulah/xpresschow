import React, { Component } from "react"

import ScrollspyNav from "react-scrollspy-nav";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Dropdown from 'react-bootstrap/Dropdown'

import Badge from '@material-ui/core/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import Form from "react-validation/build/form";

import AuthService from "../../services/auth.service"
import VendorService from "../../services/vendor.service"

export default class Profile extends Component {
  constructor(props) {
    super(props);

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())
    this.state = {
      currentUser: user,
      consumer: localStorage.getItem("consumer"),
      vendor: this.props.vendor,
      logo: "",
      companyName: "",
      companyBranch: "",
      vendorName: "",
      email: "",
      phoneNumber: "",
      address: "",
      location: ""
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
      vendorname: e.target.value
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

  handleUpdate = () => {
    VendorService.updateVendorDetails(
      this.state.companyName,
      this.state.companyBranch,
      this.state.email,
      this.state.phoneNumber,
      this.state.address,
      this.state.location,
      this.state.currentUser.vendorname
    ).then(window.location.reload)
  }

  componentDidMount() {
    VendorService.getVendorProfile(this.state.currentUser.vendorname)
      .then(resp => {
        this.setState({
          vendor: resp.data,
          logo: resp.data.logo,
          companyName: resp.data.company_name,
          companyBranch: resp.data.company_branch,
          vendorname: resp.data.vendorname,
          email: resp.data.email,
          phoneNumber: resp.data.phone_number,
          address: resp.data.address,
          location: resp.data.location
        })
      })
  }

  render() {
    const vendorHeader = { background: `url(${this.state.vendor.logo}) center/cover no-repeat` }
    const vendor = this.state.vendor
    let close = () => this.setState({ show: false });

    return (
      <>
        <Modal show={this.state.show} onHide={close} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Form onSubmit={this.handleUpdate}>
            <div className="d-flex flex-row justify-content-start" style={{ padding: "12px" }}>
              <Image className="vendor-man-image col" src={this.state.logo} thumbnail />
              <div className="col">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="vendorname"
                    value={this.state.vendorname}
                    onChange={this.onChangeVendorname}
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="companyname"
                    value={this.state.companyName}
                    onChange={this.onChangeCompanyName}
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    name="companybranch"
                    value={this.state.companyBranch}
                    onChange={this.onChangeCompanyBranch}
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={this.state.email}
                    placeholder="email"
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
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
                      Covenant
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    name="tel"
                    value={this.state.phoneNumber}
                    onChange={this.onChangePhoneNumber}
                  />
                </div>
              </div>
            </div>
            <Modal.Footer>
              <button className="btn btn-outline-primary btn-lg btn-block" disabled={this.state.loading} >
                {this.state.loading ?
                  (<span className="spinner-border spinner-border-sm"></span>)
                  :
                  <span>Update</span>
                }
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <div className="vendor-header" style={vendorHeader}>
        </div>
        <Card>
          <Card.Body>
            <Card.Text>
              <div className="section-title-font">
                <div className="d-flex flex-row justify-content-between">
                  <span style={{ fontSize: "2rem" }}>{vendor.company_name + ", " + vendor.company_branch}</span>
                  <span>
                    {vendor.rating}
                    <span style={{ color: "#ffd700" }}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  </span>
                </div>
                <div style={{ fontSize: "1.5rem" }}>{vendor.vendorname}</div>
              </div>
              <div>Email: {vendor.email}</div>
              <div>Phone Number: {vendor.phone_number}</div>
              <div>Address: {vendor.address}</div>
              <div>Location: {vendor.location}</div>
              <div>Number of Orders: {vendor === undefined || vendor === "" ? "" : vendor.orders.length}</div>
              <div>Number of Meal Groups: {vendor === undefined || vendor === "" ? "" : vendor.tags.length}</div>
              <div>Number of Meals: {vendor === undefined || vendor === "" ? "" : vendor.meals.length}</div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div onClick={() => this.setState({show: true})} className="btn btn-lg btn-block btn-outline-primary">Edit</div>
          </Card.Footer>
        </Card>
      </>
    );
  }
}