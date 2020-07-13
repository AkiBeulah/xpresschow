import React, { Component } from "react"

import ScrollspyNav from "react-scrollspy-nav";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'

import Badge from '@material-ui/core/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../../services/auth.service"
import VendorService from "../../services/vendor.service"
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())
    this.state = {
      currentUser: user,
      filter: 0,
      orders: []
    };
  }

  componentDidMount() {
    VendorService.getVendorOrders(this.state.currentUser.vendorname)
      .then(resp => {
        this.setState({
          orders: resp.data
        })
      })
  }

  toggleFilter = () => {
    this.setState({
      filter: this.state.filter === 2 ? 0 : this.state.filter + 1
    })
  }

  toggleAvailability = (m) => {
    VendorService.dispatchToggle(
      this.state.currentUser.vendorname,
      m.id
    ).then(resp => {
      this.setState({
        orders: resp.data
      })
    })
  }

  render() {
    const orders = this.state.orders
    return (
      <>
        <Navbar className="nav" expand="lg" bg="white" sticky="top" variant="light" style={{ height: "70px" }}>
          <div className="container text-capitalize d-flex flex-row justify-content-between">
            Filters
            <div className="btn" onClick={this.toggleFilter}>
              {this.state.filter === 1 ? "dispatched not Delivered" : this.state.filter === 2 ? "not dispatched" : "All"}
            </div>
          </div>
        </Navbar>
        <Accordion>
          {orders.length !== 0 &&
            orders.map((o, index) => {
              return (
                <div className="position-relative">
                  <div onClick={() => this.toggleAvailability(o)}>
                    <FontAwesomeIcon icon={faCircle} className={o.dispatched === true ? "floating-available glowing-green" : "floating-available glowing-red"} />
                  </div>
                  <Card border={o.delivered ? "success" : (o.dispatched ? "primary" : "danger")} key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={"" + index}>
                      <div className="d-flex flex-row">
                        <div className="">Price: {o.price}</div>
                        <div className="mg-2">Payment Method: {o.payment_method}</div>
                        <div className="mg-2">Paid: {o.paid ? "True" : "False"}</div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="">Location: {o.location}</div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse as={Card.Body} eventKey={"" + index}>
                      <ListGroup classNAme="list-group-flush">
                        {o.order_records.map(or => {
                          return (
                            <ListGroupItem>
                              <Row><Col xs={1}>{or[0]}</Col>
                                <Col >{or[1]}</Col>
                                <Col>{parseFloat(or[2]).toFixed(2)}</Col>
                              </Row>
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </Accordion.Collapse>
                  </Card>
                </div>
              )
            })
          }
        </Accordion>
      </>
    );
  }
}