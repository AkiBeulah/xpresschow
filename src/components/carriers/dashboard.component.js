import React, { Component } from 'react'

import CarrierService from '../../services/carrier.service'

// import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class DashBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jobs: null
    }
  }

  componentDidMount() {
    CarrierService.dashBoard()
      .then(resp => {
        this.setState({
          jobs: resp.data
        })
      })
  }

  registerJob = (orderID, id) => {
    CarrierService.registerJob(orderID, id)
      .then(resp => {
        console.log(resp.data)
        this.setState({
          jobs: resp.data
        })
      })
  }


  render() {
    return (
      <>
        {/* <Navbar className="nav" expand="lg" bg="white" sticky="top" variant="light" style={{ height: "70px" }}>
          <div className="container text-capitalize d-flex flex-row justify-content-between">
            Filters
            <div className="btn" onClick={this.toggleFilter}>
              {this.state.filter === 1 ? "dispatched not Delivered" : this.state.filter === 2 ? "not dispatched" : "All"}
            </div>
          </div>
        </Navbar> */}

        {this.state.jobs !== null &&
          this.state.jobs.map((o, index) => {
            return (
              <Accordion className="mg-down">
                <Card key={index} border={o.delivered ? "success" : (o.dispatched ? "primary" : "danger")}>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    <Row>
                      <Col className="d-flex flex-row">
                        <div className="">Pickup Address: {o.vendor_address}</div>
                      </Col>
                      <Col className="d-flex flex-row">
                        <div className="">Delivery Address: {o.address}</div>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse as={Card.Body} eventKey={index}>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <Row>
                          <Col><div className="mg-2">Paid: {o.paid ? "True" : "False"}</div></Col>
                          <Col><div className="mg-2">Vendor: {o.vendorname}</div></Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>
                            <div className="mg-2">Payment Method: {o.payment_method}</div>
                          </Col>
                          <Col>
                            <div className="mg-2">Price: {o.price}</div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                  <div onClick={() => this.registerJob(o.id, this.props.currentUser)} className="btn btn-outline-danger btn-block">Accept Job</div>
                </Card>
              </Accordion>
            )
          })
        }
      </>
    )
  }
} 