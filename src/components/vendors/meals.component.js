import React, { Component } from "react"

import ScrollspyNav from "react-scrollspy-nav";

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'

import Form from "react-validation/build/form";

import AuthService from "../../services/auth.service";
import VendorService from "../../services/vendor.service";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default class Meals extends Component {
  constructor(props) {
    super(props);

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())
    this.state = {
      currentUser: user,
      meals: "",
      editShow: false,
      newShow: false,
      id: 0,
      tags: "",
      target: "",
      sample: "",
      name: "",
      price: 0,
      sampleAlt: "",
      tag: "",
      discount: 0,
      desc: "",
      available: "",
      error: ""
    };
  }

  componentDidMount() {
    VendorService.getVendorProfile(this.state.currentUser.vendorname)
      .then(resp => {
        this.setState({
          vendor: resp.data,
          tags: resp.data.tags,
          meals: resp.data.meals
        })
      }
      )
  }

  toggleAvailability = (m) => {
    VendorService.availabilityToggle(
      this.state.currentUser.vendorname,
      m.id
    ).then(resp => {
      this.setState({
        vendor: resp.data,
        tags: resp.data.tags,
        meals: resp.data.meals
      })
    })
  }

  handleUpdate = (e) => {
    this.setState({
      loading: true
    })

    VendorService.updateMeal(
      this.state.currentUser.vendorname,
      this.state.id,
      this.state.sample,
      this.state.name,
      this.state.price,
      this.state.sampleAlt,
      this.state.tag,
      this.state.discount,
      this.state.desc,
      this.state.available
    ).then(resp => {
      this.modalMount(resp.data)
    }, () => {
      this.setState({
        loading: false,
        id: "",
        name: "",
        price: "",
        sampleAlt: "",
        tag: "",
        discount: "",
        desc: "",
        available: "",
        sample: ""
      })
    })
  }

  handleCreate = (e) => {
    this.setState({
      loading: true
    })

    VendorService.createMeal(
      this.state.currentUser.vendorname,
      this.state.sample,
      this.state.name,
      this.state.price,
      this.state.sampleAlt,
      this.state.tag,
      this.state.discount,
      this.state.desc
    ).then(resp => {
      this.modalMount(resp.data)
    })
  }

  handleDestroy = (e) => {
    this.setState({
      loading: true
    })

    VendorService.destroyMeal(
      this.state.currentUser.vendorname,
      this.state.id
    ).then(
      window.location.reload()
    )
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onChangeAvailable = (e) => {
    this.setState({
      available: e.target.value
    });
  }

  onChangePrice = (e) => {
    this.setState({
      price: e.target.value
    })
  }

  onChangeTag = (e) => {
    this.setState({
      tag: e.target.value
    })
  }

  onChangeDiscount = (e) => {
    this.setState({
      discount: e.target.value
    })
  }

  onChangeDesc = (e) => {
    this.setState({
      desc: e.target.value
    })
  }

  onChangeSampleAlt = (e) => {
    this.setState({
      sampleAlt: e.target.value
    })
  }

  onChangeSample = (e) => {
    this.setState({
      sample: e.target.value
    })
  }

  modalMount = (m) => {
    this.setState({
      editShow: true,
      id: m.id,
      sample: m.sample,
      name: m.name,
      price: m.price,
      sampleAlt: m.sample_alt,
      tag: m.tag,
      discount: m.discount,
      desc: m.desc,
      available: m.available,
    })
  }

  render() {
    const vendorCard = { width: "22rem", maxWidth: "352px !important", maxHeight: "158px !important", minWidth: "22rem" }
    let close = () => this.setState({
      editShow: false,
      newShow: false,
      id: "",
      name: "",
      price: "",
      sampleAlt: "",
      tag: "",
      discount: "",
      desc: "",
      available: ""
    });
    return (
      <>
        <Modal show={this.state.editShow} onHide={close} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Form onSubmit={this.handleUpdate}>
            <div className="d-flex flex-row justify-content-start" style={{ padding: "12px" }}>
              <div className="col">
                <Image className="vendor-man-image col" src={this.state.sample} thumbnail />
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="sample"
                    // ref="file"
                    placeholder="Sample URL"
                    onChange={this.onChangeSample}
                  />
                </div>
              </div>
              <div className="col">
                <input
                  type="food"
                  className="form-control form-control-lg"
                  name="meal-title"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="meal-price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="meal-sample-alt"
                  value={this.state.sampleAlt}
                  onChange={this.onChangeSampleAlt}
                />
              </div>
              <div className="col">
                <input
                  type="food"
                  className="form-control form-control-lg"
                  name="meal-tag"
                  value={this.state.tag}
                  onChange={this.onChangeTag}
                />
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="meal-discount"
                  value={this.state.discount}
                  onChange={this.onChangeDiscount}
                />
              </div>
            </div>
            <div className="col-md-12 form-group">
              {this.state.available ? <br></br> : "Item not available"}
              <textarea
                type="textarea"
                className="form-control form-control-lg"
                style={{ minHeight: "20vh" }}
                name="desc"
                value={this.state.desc}
                onChange={this.onChangeDesc}
              />
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
          <Modal.Footer>
            <button onClick={this.handleDestroy} className="btn btn-outline-danger btn-lg btn-block" disabled={this.state.loading} >
              {this.state.loading ?
                (<span className="spinner-border spinner-border-sm"></span>)
                :
                <span>Delete</span>
              }
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.newShow} onHide={close} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Form onSubmit={this.handleCreate}>
            <div className="d-flex flex-row justify-content-start" style={{ padding: "12px" }}>
              <div className="col">
                <Image className="vendor-man-image col" src={this.state.sample} thumbnail />
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="sample"
                    // ref="file"
                    placeholder="Sample URL"
                    onChange={this.onChangeSample}
                  />
                </div>
              </div>
              <div className="col">
                <input
                  type="food"
                  className="form-control form-control-lg"
                  name="meal-title"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Price"
                  name="meal-price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="meal-sample-alt"
                  placeholder="Picture description"
                  value={this.state.sampleAlt}
                  onChange={this.onChangeSampleAlt}
                />
              </div>
              <div className="col">
                <input
                  type="food"
                  className="form-control form-control-lg"
                  name="meal-tag"
                  placeholder="Tag"
                  value={this.state.tag}
                  onChange={this.onChangeTag}
                />
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="meal-discount"
                  placeholder="Discount"
                  value={this.state.discount}
                  onChange={this.onChangeDiscount}
                />
              </div>
            </div>
            <div className="col-md-12 form-group">
              <textarea
                type="textarea"
                className="form-control form-control-lg"
                style={{ minHeight: "20vh" }}
                name="desc"
                value={this.state.desc}
                onChange={this.onChangeDesc}
              />
            </div>
            <Modal.Footer>
              <button className="btn btn-outline-primary btn-lg btn-block" disabled={this.state.loading} >
                {this.state.loading ?
                  (<span className="spinner-border spinner-border-sm"></span>)
                  :
                  <span>Create</span>
                }
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Navbar className="nav" expand="lg" bg="white" sticky="top" variant="light" style={{ height: "70px" }}>
          <div className="container text-capitalize">
            {this.state.tags ?
              <>
                <ScrollspyNav
                  scrollTargetIds={this.state.tags}
                  offset={-50}
                  activeNavClass="scroll-active"
                  scrollDuration="1000"
                  headerBackground="true">
                  <div className="d-flex flex-row justify-content-start">
                    {
                      this.state.tags.map((t, i) => {
                        return (
                          <>
                            <div key={i} className="btn">
                              <a href={"#" + t} className="scroll-inactive">{t}</a>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </ScrollspyNav>
              </>
              :
              <>
                Featured
              </>
            }
          </div>
        </Navbar>

        <div className="container d-flex flex-column flex-wrap justify-content-start" style={{ width: "fit-content" }}>
          {
            this.state.tags &&
            <>
              {
                this.state.tags.map((t, j) => {
                  return (
                    <div id={t} key={j} style={{ marginBottom: "2.5rem" }}>
                      <div className="home-location text-capitalize" style={{ marginLeft: "8px" }}>
                        {t}
                      </div>
                      <div className="d-flex flex-row flex-wrap justify-content-start">
                        {this.state.meals &&
                          <>
                            {
                              this.state.meals.map((m, i) => {
                                return (
                                  <>
                                    {(m.tag === t) &&
                                      <div key={i} className="position-relative">
                                        <Card className="vendor-card pointer" onClick={() => this.modalMount(m)}
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
                                        <div onClick={() => this.toggleAvailability(m)}>
                                          <FontAwesomeIcon icon={faCircle} className={m.available === true ? "floating-available glowing-green" : "floating-available glowing-red"} />
                                        </div>
                                      </div>
                                    }
                                  </>
                                );
                              })
                            }
                          </>
                        }
                      </div>
                    </div>
                  );
                })
              }
            </>
          }

          <div onClick={() => this.setState({ newShow: true })} className="meals-btn">
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
        </div>
      </>
    );
  }
}