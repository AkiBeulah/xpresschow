import React, { Component } from "react"

import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"

import AuthService from "../../services/auth.service"
import UserService from "../../services/user.service"

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: JSON.parse(AuthService.getCurrentUser()),
      vendor: "",
      cart: this.props.cart === [] ? this.props.cart : JSON.parse(localStorage.getItem("cartTemp")),
      total: 0,
      itemCount: 0,
      paymentMethod: "po",
      location1: "",
      location2: "",
      price: 0,
      placeOrderData: []
    }
  }


  componentDidMount() {
    if (this.state.cart === []) this.props.history.push('')

    UserService.getVendor(this.props.match.params.vendorname)
      .then(
        response => {
          this.setState({
            vendor: response.data
          })
        })
      .catch(error => {
        this.setState({
          message: error.response.data.errors
        })
      })
    this.getTotal()
  }

  getTotal = () => {
    let a = 0, b = 0
    for (let i = 0; i < this.props.cart.length; i++) {
      a = a + parseInt(this.props.cart[i][2])
      b = b + parseFloat(this.props.cart[i][3])
    }

    this.setState({
      itemCount: a,
      price: b
    })
  }

  placeOrder = () => {
    if (this.state.currentUser === null) {
      this.props.showModal()
    } else {
      // this.setState({loading: true})
      let cart = this.state.cart
      UserService.placeOrder(
        this.state.currentUser.id,
        this.state.vendor.id,
        (this.state.location1 + " " + this.state.location2),
        this.state.paymentMethod,
        this.state.price,
        false,
        cart,
        this.state.vendor.location
      ).then(
        resp => {
          this.props.placeOrderData(resp.data)
          this.props.history.push('/profile')
        })
        .catch(error => {
          this.setState({
            message: error.response.data.errors
          })
        })
    }
  }

  onChangeLocation1 = (e) => {
    this.setState({
      location1: e.target.value
    })
  }

  onChangeLocation2 = (e) => {
    this.setState({
      location2: e.target.value
    })
  }

  onChangePaymentMethod = (e) => {
    this.setState({
      paymentMethod: e.target.value
    })
  }

  render() {
    // const vendor = this.state.vendor
    // const order = []
    // const vendorHeader = {
    //   background: `url(${vendor.logo}) center/cover no-repeat`
    // }
    return (
      <div className="container">
        {/* <div className="vendor-header" style={vendorHeader}>
        </div> */}
        <br />
        <Row>
          <Col>
            <div className="logo-font">
              Your Order
            </div>
            {
              this.state.cart.map(m => {
                return (
                  <>
                    <Row className="d-flex flex-row align-items-center">
                      <Col xs={1}>{m[2]}</Col>
                      <Col style={{ maxWidth: "70px" }} className="xx xxx"><Image className="checkout-order-thumbnail" src={m[4]} thumbnail /></Col>
                      <Col >{m[1]}</Col>
                      <Col>{parseFloat(m[3]).toFixed(2)}</Col>
                    </Row>
                  </>
                )
              })
            }
          </Col>
          <Col>
            <Card border={(this.state.location1 === "") ? "danger" : "success"}>
              <Accordion defaultActiveKey="0">
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
                <div>
                  <Accordion.Toggle as={Card.Header} eventKey="0" className="logo-font">Location</Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form>
                        <div className="form-group col-md-12">
                          <Input
                            type="address-line1"
                            className="form-control form-control-lg"
                            name="locationLine1"
                            placeholder="Address Line 1"
                            value={this.state.location1}
                            autoComplete="home street-address"
                            onChange={this.onChangeLocation1}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <Input
                            type="address-line2"
                            className="form-control form-control-lg"
                            name="locationLine2"
                            placeholder="Address Line 2"
                            value={this.state.location2}
                            onChange={this.onChangeLocation2}
                          />
                        </div>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
                <div>
                  <Accordion.Toggle as={Card.Header} eventKey="1" className="logo-font">Payment Options</Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Form>
                        <div className="container d-flex flex-row flex-wrap justify-content-between">
                          <div>
                            <input
                              type="radio"
                              className="checkout-radio-button"
                              value="po"
                              id="po"
                              checked={this.state.paymentMethod === "po"}
                              onChange={this.onChangePaymentMethod}
                            />
                            <label htmlFor="po" className="checkout-radio-label">
                              Pay Onine
                            </label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              className="checkout-radio-button"
                              value="pod"
                              id="pod"
                              checked={this.state.paymentMethod === "pod"}
                              onChange={this.onChangePaymentMethod}
                            />
                            <label htmlFor="pod" className="checkout-radio-label">
                              Pay on Delivery
                            </label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              className="checkout-radio-button"
                              value="cod"
                              id="cod"
                              checked={this.state.paymentMethod === "cod"}
                              onChange={this.onChangePaymentMethod}
                            />
                            <label htmlFor="cod" className="checkout-radio-label">
                              Card on Delivery
                            </label>
                          </div>
                        </div>

                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
                <div>
                  <Accordion.Toggle as={Card.Header} eventKey="2" className="logo-font">Bill</Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <Card.Text>
                        <div className="container">
                          <Row>
                            <Col>Subtotal</Col>
                            <Col className="text-right">₦{parseFloat(this.state.price).toFixed(2)}</Col>
                          </Row>
                          <Row>
                            <Col>Delivery Fee</Col>
                            <Col className="text-right">₦450.00</Col>
                          </Row>
                          <Row>
                            <Col>Container Charges</Col>
                            <Col className="text-right">₦0.00</Col>
                          </Row>
                          <Row>
                            <Col>Total</Col>
                            <Col className="text-right">₦{parseFloat(this.state.price + 450).toFixed(2)}</Col>
                          </Row>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Card.Footer>
                <Button size="lg" variant="success" onClick={() => this.placeOrder()} block disabled={this.state.location1 === ""}>Place Order</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}