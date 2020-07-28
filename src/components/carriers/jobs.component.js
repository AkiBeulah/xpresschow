import React, { Component } from 'react'

import CarrierService from '../../services/carrier.service'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default class Jobs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: this.props.currentUser,
      jobs: null
    }
  }

  componentDidMount() {
    CarrierService.getJobs()
      .then(resp => {
        this.setState({
          jobs: resp.data
        })
      })
  }

  delivered = (orderId) => {
    CarrierService.delivered(orderId)
      .then(resp => {
        this.setState({
        jobs: resp.data
      })
    })
  }

  render() {
    return (
      <>
         {this.state.jobs !== null &&
          this.state.jobs.map((o, index) => {
            return (
              <Accordion key={index} className="mg-down">
                <Card border={o.delivered ? "success" : (o.dispatched ? "primary" : "danger")}>
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
                          <Col><div className={o.paid ? "mg-2 alert alert-success" : "mg-2 alert alert-danger"}>Paid: {o.paid ? "True" : "False"}</div></Col>
                          <Col><div className="mg-2">Vendor: {o.vendorname}</div></Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col>
                            <div className="mg-2">Payment Method: {o.payment_method}</div>
                          </Col>
                          <Col className={o.paid ? "" : "alert alert-danger"}>
                            <div className="mg-2">Price: {o.price}</div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                  {!o.delivered &&
                  <div onClick={() => this.delivered(o.id)} className="btn btn-outline-success btn-block">Delivered</div>
                  }
                </Card>
              </Accordion>
            )
          })
        }
      </>
    )
  }
}