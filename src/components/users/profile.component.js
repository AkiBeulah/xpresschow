import React, { Component } from "react";

import ScrollspyNav from "react-scrollspy-nav";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'

import UserService from "../../services/user.service"
import AuthService from "../../services/auth.service"

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: JSON.parse(AuthService.getCurrentUser()),
      content: "",
      lastOrder: [],
      orders: [],
      scrollOffset: 0
    };
  }

  componentDidMount() {
    // localStorage.removeItem("cartTemp")

    UserService.getUserProfile(this.state.currentUser.id)
      .then(response =>
        this.setState({
          orders: response.data.orders,
          lastOrder: response.data.last_order,
          orderRecords: response.data.order_records
        })
      )
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollTop = window.scrollY

    this.setState({
      scrollOffset: scrollTop
    });
  }

  render() {
    const orders = this.state.orders
    const lastOrder = Object.values(this.state.lastOrder)
    let scrollSpyClass = "profile-scrollspy"
    if (this.state.orderRecords !== null && this.state.orderRecords !== undefined) {
      var orderRecords = Object.values(this.state.orderRecords)
    }
    if (this.state.scrollOffset > 1600) { }

    return (
      <div className="container">
        <div className={scrollSpyClass}>
          <ScrollspyNav
            scrollTargetIds={["lastOrder", /*"timeline",*/ "orderHistory", "vendorHistory", "favourites"]}
            offset={100}
            activeNavClass="scroll-active"
            scrollDuration="1000"
            headerBackground="true">
            <div className="d-flex flex-column justify-content-start">
              <a href="#lastOrder" style={{ fontSize: "1.5rem" }} className="section-title-font scroll-inactive">Last Order</a>
              {/* <a href="#timeline" style={{ fontSize: "1.5rem" }} className="section-title-font scroll-inactive">Timeline</a> */}
              <a href="#orderHistory" style={{ fontSize: "1.5rem" }} className="section-title-font scroll-inactive">Order History</a>
              <a href="#vendorHistory" style={{ fontSize: "1.5rem" }} className="section-title-font scroll-inactive">Vendor History</a>
              <a href="#favourites" style={{ fontSize: "1.5rem" }} className="section-title-font scroll-inactive">Favourites</a>
              Scroll: {this.state.scrollOffset}
            </div>
          </ScrollspyNav>
        </div>
        <div className="d-flex flex-column align-items-end">
          <br />
          <div className="profile-sections" id="lastOrder">
            Your last order:
                   <ListGroup>
              {lastOrder === undefined && lastOrder === null && lastOrder === [] ? <></> :
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <div>Vendor: {orderRecords !== undefined && orderRecords[orderRecords.length - 1][orderRecords[orderRecords.length - 1].length - 1]}</div>
                        <div>Payment Method: {lastOrder[4]}</div>
                        <div>Status: {lastOrder[6] === true ? "Dispatched" : "Preparing"}</div>
                        <div>Time: {lastOrder[8]}</div>
                      </Col>
                      <Col md={6}>
                        <div>Paid: {lastOrder[5] !== undefined && lastOrder[5].toString()}</div>
                        <div>Delivered: {lastOrder[7] !== undefined && lastOrder[7].toString()}</div>
                        <div>Location: {lastOrder[3]}</div>
                        <div>Price: {lastOrder[10]}</div>
                      </Col>
                    </Row>
                    <br />
                    <ListGroup className="d-flex flex-row flex-wrap justify-content-start">
                      {orderRecords === undefined ? <></> :
                        orderRecords[orderRecords.length - 1].slice(0, orderRecords[orderRecords.length - 1].length - 1).map(o => {
                          return (
                            <>
                              <ListGroup.Item className="profile-order-list">
                                <Row>
                                  <Col md={6}>
                                    <div>{o.name}</div>
                                    ₦{parseFloat(o.price).toFixed(2)}
                                  </Col>
                                  <Col md={5}><Image className="xxx profile-order-list-image" src={o.sample} thumbnail /></Col>
                                </Row>
                              </ListGroup.Item>
                            </>
                          )
                        })
                      }
                    </ListGroup>
                  </ListGroup.Item>
                </ListGroup>
              }
            </ListGroup>
          </div>
          <br />
          {/* <div className="fake-height profile-sections" id="timeline">
            Timeline
            </div> */}
          <br />
          <div className="fake-height profile-sections" id="orderHistory">
            Order History
            <ListGroup>
              {orders.slice(0, orders.length - 1)
                .map((o, i) => {
                  return (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col md={6}>
                            <div>Vendor: {orderRecords[i][orderRecords[i].length - 1]}</div>
                            <div>Payment Method: {o.payment_method}</div>
                            <div>Status: {o.dispatched === true ? "Dispatched" : "Preparing"}</div>
                            <div>Time: {orderRecords[i][0].created_at}</div>
                          </Col>
                          <Col md={6}>
                            <div>Paid: {o.paid !== undefined && o.paid.toString()}</div>
                            <div>Delivered: {o.delivered !== undefined && o.delivered.toString()}</div>
                            <div>Location: {o.location}</div>
                            <div>Price: {o.price}</div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )
                })}
            </ListGroup>
          </div>
          <br />
          <div className="fake-height profile-sections" id="vendorHistory">
            Recently Visited Vendors
            </div>
          <br />
          <div className="fake-height profile-sections" id="favourites">
            Favourites
            </div>
        </div>
      </div >
    );
  }
}