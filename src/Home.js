import React, { Component } from 'react'
import Slider from "react-slick";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Carousel from './pages/Carousel'
import Instructions from './pages/Instructions'
import UserService from "./services/user.service"
import AuthService from "./services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    if (JSON.parse(AuthService.getCurrentUser())) {
      var user = JSON.parse(AuthService.getCurrentUser())
      var loc = user.location
    } else {
      user = ""
      loc = ""
    }

    this.state = {
      content: "",
      currentUser: user,
      location: loc
    };
  }

  componentDidMount() {
    if (this.state.currentUser.location) {
      UserService.getFilteredVendors(this.state.currentUser.location)
        .then(
          response => {
            this.setState({
              content: response.data,
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
      if (!this.state.location === "") {
        UserService.getFilteredVendors(this.state.location)
          .then(
            response => {
              this.setState({
                content: response.data,
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
  }

  componentDidUpdate(prevProps) {
    if (this.state.location !== prevProps.location) {
      
    }
  }

  updateLocation = (loc) => {
    localStorage.setItem("location", loc);
    this.setState({
      location: loc
    });
    UserService.getFilteredVendors(this.state.location)
      .then(
        response => {
          this.setState({
            content: response.data,
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
          currentUser ?
            <>
            </>
            :
            <>
              <Carousel />
              <Instructions />
            </>
        }

        <div className="container">
          <br />
          <br />
          <Navbar className="" expand="lg" bg="dark" variant="dark">
            <div className="home-location section-title-font text-white d-flex flex-row align-items-center">
              Delivering to: {
                currentUser
                  ?
                  <NavDropdown style={{ color: 'white !important' }} title={this.state.location ? this.state.location : "All"} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => this.updateLocation("Abuja")}>Abuja</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => this.updateLocation("Covenant University")}>Covenant University</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <NavDropdown style={{ color: 'white !important' }} title={this.state.location ? this.state.location : "All"} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => this.updateLocation("Abuja")}>Abuja</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => this.updateLocation("Covenant University")}>Covenant University</NavDropdown.Item>
                  </NavDropdown>
              }
            </div>
          </Navbar>
          <br />
          <Slider {...settings}>
            {
              vendors.map(m => {
                return (
                  <Card className="xx card-custom" onClick={() => this.vendorRedirect(m.vendorname, m)} style={vendorCard} >
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

          <Navbar className="" expand="lg" bg="transparent">
            <span className="home-location text-dark" style={{ fontSize: "2.5rem" }}>30 Minutes Away</span>
          </Navbar>
          <div className="d-flex flex-row flex-wrap justify-content-between">
            {
              vendors.slice(0, 10).map(m => {
                return (
                  <Card className="xx card-custom" onClick={() => this.vendorRedirect(m.vendorname, m)} style={vendorCard2} >
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
        </div>
      </>
    );
  }
}