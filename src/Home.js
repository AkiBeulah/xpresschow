import React, { Component } from 'react'

import Slider from "react-slick";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

import Carousel from './pages/Carousel'
import Instructions from './pages/Instructions'
import UserService from "./services/user.service"
import AuthService from "./services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())

    this.state = {
      content: "",
      contentR: "",
      mealsR: "",
      currentUser: user,
      location: "",
      loading: true,
      search: ""
    };
    this.cancel = ''
  }

  componentDidMount() {
    let location = ""
    if (this.state.currentUser) { location = this.state.currentUser.location }
    else if (localStorage.getItem("location")) { location = localStorage.getItem("location") }

    if (location !== "" && location !== null) {
      UserService.filterByLocation(location)
        .then(
          response => {
            this.setState({
              content: response.data,
              location: location
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
    } else {
      UserService.getPublicContent().then(
        response => {
          this.setState({
            content: response.data,
            location: ""
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
  }

  renderSearchResults = () => {
    const q = this.state.search
    UserService.searchXpress(q)
      .then(resp => {
        this.setState({
          contentR: resp.data.vendors,
          mealsR: resp.data.meals,
          loading: false
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.state.location !== prevProps.location) {

    }
  }

  onChangeSearch = (e) => {
    UserService.cancelAxios()
    this.setState({
      search: e.target.value,
      loading: true,
      contentR: true
    }, () => { this.renderSearchResults() })
  }

  updateLocation = (loc) => {
    //Todo: update user location at API
    UserService.filterByLocation(this.state.location)
      .then(
        response => {
          this.setState({
            content: response.data,
            loading: false
          }, () => window.scrollTo(0, document.querySelector('#vendors').offsetTop));
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

  vendorRedirect = (loc) => {
    this.props.history.push(`/vendor/${loc}`)
    window.location.reload()
  }

  render() {
    const vendorCard = { width: "15rem" }
    const vendorCard2 = { width: "13rem" }
    var content = this.state.content;
    var currentUser = this.state.currentUser;
    var vendors = [];
    Object.keys(content).forEach(function (key) {
      vendors.push(content[key])
    });
    var settings = {
      arrows: true,
      variableWidth: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 3
    };

    return (
      <>
        {
          currentUser ? <></> :
            <>
              <Carousel
                upStateLoc={(loc => this.setState({location: loc, loading: true}, () => this.updateLocation()))}
                location={this.state.location} />
              <Instructions />
            </>
        }

        <div className="container">
          <br />
          <br />
          <Navbar className="" expand="lg" bg="dark" variant="dark">
            <div className="home-location section-title-font text-white d-flex flex-row align-items-center">
              Delivering to:
              <NavDropdown title={this.state.location !== "" && this.state.location !== null ? this.state.location : "All"} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { this.setState({ location: "Abuja", loading: true }, () => { this.updateLocation(this.state.location) }) }}>Abuja</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { this.setState({ location: "Covenant University", loading: true }, () => { this.updateLocation(this.state.location) }) }}>Covenant University</NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className="ml-auto d-flex flex-row justify-content-between">
              {/* <label htmlFor="" style={{position: "absolute", top: "10px", right: "20px"}}> */}
              <input
                type="text"
                placeholder="Search..."
                value={this.state.search}
                className="form-control"
                // {this.state.contentR.length === 0 && this.state.search.length > 1 ?
                // "form-control border-primary" : "form-control border-danger" }
                onChange={this.onChangeSearch}
                style={{ marginRight: "4px" }} />
              {/* <FontAwesomeIcon icon={ faSearch } style={{position: "absolute"}} /> */}
              {/* </label> */}

              <DropdownButton alignRight title="Filter" id="dropdown-menu-align-right" style={{ marginRight: "4px" }}>
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
              </DropdownButton>

              <DropdownButton alignRight title="Sort" id="dropdown-menu-align-right" style={{ marginRight: "4px" }}>
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
              </DropdownButton>
            </div>
          </Navbar>
          {
            this.state.contentR.length === 0 && this.state.search.length > 1 ?
              <div className="error-message text-center text-white bg-danger">
                No vendors by this name exist...
              </div>
              : <></>
          }
          <br />
          {
            Object.keys(this.state.contentR).length && this.state.contentR.length ?
              <Slider {...settings}>
                {
                  this.state.contentR.map((m, i) => {
                    return (
                      <Card className="xx card-custom" onClick={() => this.vendorRedirect(m.vendorname, m)} key={i} style={vendorCard} >
                        <div className="hidden-o">
                          <Card.Img className="card-image-custom" variant="top" src={m.logo} />
                        </div>
                        <Card.Body>
                          <Card.Title>
                            {m.company_name + ", " + m.company_branch}
                          </Card.Title>
                          <Card.Text>
                            {m.rating + " - " + m.location}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })
                }
              </Slider>
              :
              <Slider {...settings}>
                {
                  vendors.map((m, i) => {
                    return (
                      <Card className="xx card-custom" onClick={() => this.vendorRedirect(m.vendorname, m)} key={i} style={vendorCard} >
                        <div className="hidden-o">
                          <Card.Img className="card-image-custom" variant="top" src={m.logo} />
                        </div>
                        <Card.Body>
                          <Card.Title>
                            {m.company_name + ", " + m.company_branch}
                          </Card.Title>
                          <Card.Text>
                            {m.rating + " - " + m.location}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })
                }
              </Slider>
          }
          <Navbar className="" id="vendors" expand="lg" bg="transparent">
            <span className="home-location text-dark" style={{ fontSize: "2.5rem" }}>
              {this.state.search.length >  0 ? "Meals" : "30 Minutes Away"}
            </span>
          </Navbar>
          {
            Object.keys(this.state.mealsR).length && this.state.mealsR.length ?
              <div className="d-flex flex-row flex-wrap justify-content-between">
                {this.state.mealsR.map(m => {
                  return (
                    <>
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
                    </>
                  );
                })}
              </div>
              :
              <div className="d-flex flex-row flex-wrap justify-content-between">
                {
                  vendors.slice(0, 10).map((m, i) => {
                    return (
                      <Card className="xx card-custom" onClick={() => this.vendorRedirect(m.vendorname, m)} key={i} style={vendorCard2} >
                        <div className="hidden-o">
                          <Card.Img className="card-image-custom" variant="top" src={m.logo} />
                        </div>
                        <Card.Body>
                          <Card.Title>
                            {m.company_name + ", " + m.company_branch}
                          </Card.Title>
                          <Card.Text>
                            {m.rating + " - " + m.location}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })
                }
              </div>
          }
        </div>
      </>
    );
  }
}
