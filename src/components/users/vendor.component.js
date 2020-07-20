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
import { faPlus, faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'

import AuthService from "../../services/auth.service"
import UserService from "../../services/user.service"

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: JSON.parse(AuthService.getCurrentUser()),
      content: "",
      width: window.innerWidth,
      height: window.innerHeight,
      show: props.modal,
      order: "",
      target: "",
      targetNumber: 0,
      cart: [],
      price: 0,
      itemCount: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.modal) {
      this.setState({ show: nextProps.modal })
    }
  }

  componentDidMount() {
    UserService.getVendor(this.props.match.params.vendorname)
      .then(
        response => {
          this.setState({
            content: response.data,
            meals: response.data.meals,
            tags: response.data.tags
          });
        },
        error => {
          this.setState({
            content:
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          });
        }
      );
  }

  setModalShow(b) {
    this.setState({
      modalShow: b
    })
  }

  toCheckout() {
    this.props.updateCart(this.state.cart)
    localStorage.setItem("cartTemp", JSON.stringify(this.state.cart))
    this.props.history.push(`${this.props.match.params.vendorname}/checkout`)
  }

  getTotal = () => {
    let a = 0, b = 0
    for (let i = 0; i < this.state.cart.length; i++) {
      a = a + parseInt(this.state.cart[i][2])
      b = b + parseFloat(this.state.cart[i][3])
    }

    this.setState({
      itemCount: a,
      price: b
    })
  }

  addToCart = (meal) => {
    let arr = [meal.id, meal.name, this.state.targetNumber, (meal.price * this.state.targetNumber), meal.sample]
    this.setState({
      cart: this.state.cart.concat([arr])
    })
    this.close()
  }

  targetIncrement = () => {
    this.setState({
      targetNumber: this.state.targetNumber + 1
    })
  }

  targetDecrement = () => {
    this.setState({
      targetNumber: this.state.targetNumber - 1
    })
  }

  close = () => this.setState({ show: false, targetNumber: 0 });

  render() {
    const vendorCard = { width: "22rem", maxWidth: "352px !important", maxHeight: "158px !important", minWidth: "22rem" }
    const content = this.state.content
    var meals = content.meals
    var tags = content.tags
    const vendorHeader = {
      background: `url(${content.logo}) center/cover no-repeat`
    }
    return (
      <>
        <Modal show={this.state.show} onHide={this.close} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <div className="container">
            <br />
            {this.state.target.available ? <br></br> : "Item not available"}
            <Row>
              <Col md={7} className="d-flex flex-row align-items-start"><div className="section-title-font display-4">{this.state.target.name}</div></Col>
              <Col md={5}><Image className="vendor-img" src={this.state.target.sample} thumbnail /></Col>
            </Row>
            <br />
            <p>{this.state.target.desc}</p>
          </div>
          <Modal.Footer>
            <div className="container d-flex flex-row">
              <Button onClick={this.targetDecrement} className="order-button" variant="light"><FontAwesomeIcon icon={faMinus} /></Button>
              <div className="order-box">{this.state.targetNumber}</div>
              <Button onClick={this.targetIncrement} className="order-button" variant="light"><FontAwesomeIcon icon={faPlus} /></Button>
              <div className="order-price-box">₦{(this.state.target.price * this.state.targetNumber) === 0 ? parseFloat(this.state.target.price).toFixed(2) : (this.state.target.price * this.state.targetNumber).toFixed(2)}</div>
              {this.state.targetNumber === 0
                ?
                <Button variant="outline-dark" disabled>Add To Cart</Button>
                :
                <Button variant="outline-dark" onClick={() => this.addToCart(this.state.target)}>Add To Cart</Button>
              }
            </div>
          </Modal.Footer>
        </Modal>

        <div className="vendor-header" style={vendorHeader}>
        </div>

        <Navbar className="nav" expand="lg" bg="white" sticky="top" variant="light" style={{ height: "70px" }}>
          <div className="container text-capitalize">
            {tags ?
              <>
                <ScrollspyNav
                  scrollTargetIds={tags}
                  offset={-50}
                  activeNavClass="scroll-active"
                  scrollDuration="1000"
                  headerBackground="true">
                  <div className="d-flex flex-row justify-content-start">
                    {
                      tags.map(t => {
                        return (
                          <>
                            <div className="btn">
                              <a href={"#" + t} className="scroll-inactive">{t}</a>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </ScrollspyNav>
                <Dropdown onClick={this.getTotal} alignRight>
                  <Dropdown.Toggle variant="">
                    <Badge badgeContent={this.state.cart.length} color="primary">
                      {<FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "1.2rem" }} />}
                    </Badge>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="order-dropdown">
                    <div className="section-title-font display-4">Your Order</div>
                    <Dropdown.Header>From {content.company_name}</Dropdown.Header>
                    <Dropdown.Divider />
                    <ListGroup className="order-list">
                      {
                        this.state.cart.map(m => {
                          return (
                            <ListGroup.Item>
                              <Row>
                                <Col xs={1}>{m[2]}</Col>
                                <Col>{m[1]}</Col>
                                <Col xs={3}>₦{m[3].toFixed(2)}</Col>
                                {/* <Col xs={1}><FontAwesomeIcon icon={faTimes} /> </Col> */}
                              </Row>
                            </ListGroup.Item>
                          )
                        })
                      }
                    </ListGroup>
                    {
                      this.state.cart.length === 0 || this.state.cart === [] ?
                        <Button onClick={() => this.toCheckout()} className="order-dropdown-button" variant="dark" block disabled>
                          <Row>
                            <Col xs={1}>{this.state.itemCount}</Col>
                            <Col className="text-center">Proceed to Checkout</Col>
                            <Col className="text-left" xs={3}>₦{(this.state.price).toFixed(2)}</Col>
                          </Row>
                        </Button>
                        :
                        <Button onClick={() => this.toCheckout()} className="order-dropdown-button" variant="dark" block>
                          <Row>
                            <Col xs={1}>{this.state.itemCount}</Col>
                            <Col className="text-center">Proceed to Checkout</Col>
                            <Col className="text-left" xs={3}>₦{(this.state.price).toFixed(2)}</Col>
                          </Row>
                        </Button>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </>
              :
              <>
                Featured
              </>
            }
          </div>
        </Navbar>
        <br />
        <br />
        <div className="container d-flex flex-column flex-wrap justify-content-start">
          {
            tags ?
              <>
                {
                  tags.map(t => {
                    return (
                      <div id={t} style={{ marginBottom: "2.5rem" }}>
                        <div className="home-location text-capitalize" style={{ marginLeft: "8px" }}>
                          {t}
                        </div>
                        <div className="d-flex flex-row flex-wrap justify-content-start">
                          {meals ?
                            <>
                              {
                                meals.map(m => {
                                  return (
                                    <>
                                      {(m.tag === t) ?
                                        <Card className="vendor-card pointer" onClick={() => this.setState({ show: true, target: m })}
                                          border={m.available === true ? "secondary" : "danger"}
                                          style={vendorCard}>
                                          <div className="d-flex flex-row">
                                            <Col md={7} className="vendor-card-col">
                                              <Card.Body className="vendor-card-body">
                                                <Card.Title className="vendor-card-title">{m.name}</Card.Title>
                                                <Card.Text className="vendor-card-text" >
                                                  {m.desc}
                                                </Card.Text>
                                                <Card.Text className="vendor-card-text" >
                                                  ₦{parseFloat(m.price).toFixed(2)}
                                                </Card.Text>
                                              </Card.Body>
                                            </Col>
                                            <Col md={5} className="vendor-card-image d-flex flex-column justify-content-center">
                                              <Image className="vendor-img" src={m.sample} thumbnail />
                                            </Col>
                                          </div>
                                        </Card>
                                        :
                                        <>
                                        </>
                                      }
                                    </>
                                  );
                                })
                              }
                            </>
                            :
                            <>
                            </>
                          }
                        </div>
                      </div>
                    );
                  })
                }
              </>
              :
              <>
              </>
          }
        </div>
      </>
    );
  }
}