import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthService from "./services/auth.service";
import VendorService from "./services/vendor.service"

import Meals from './components/vendors/meals.component'
import Orders from './components/vendors/orders.component'
import Profile from './components/vendors/profile.component'
import Messages from './components/vendors/messages.component'
import VendorLogin from './components/vendors/login.component'
import VendorRegister from './components/vendors/register.component'

export default class VendorManagement extends Component {
  constructor(props) {
    super(props)

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())
    this.state = {
      currentUser: user,
      consumer: localStorage.getItem("consumer"),
      vendor: ""
    }
  }

  componentDidMount() {
    VendorService.getVendorProfile(this.state.currentUser.vendorname)
      .then(resp => {
        this.setState({
          vendor: resp.data
        })
      })
  }

  setDef(a) {
      localStorage.setItem("defTab", a)
  }

  logout() {
    AuthService.logout();
    window.history.pushState("", "", "/home")
    window.location.reload()
  }

  render() {
    const user = this.state.currentUser
    return (
      <div className="">
        {
          (this.state.currentUser === "" || this.state.currentUser === null || this.state.currentUser === undefined) ?
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 card xx">
                  <br />
                  <br />
                  <div className="display-3 text-center section-title-font">XpressChow</div>
                  <br />
                  <a href="/">
                    <div className="form-group">
                      <div className="bg-warning w-100 text-center text-white">
                        Please if you are not a vendor, click here.
                      </div>
                    </div>
                  </a>
                  <Tabs className="d-flex xx w-100 flex-row justify-content-center" defaultActiveKey="loginForm">
                    <Tab className="xx" eventKey="loginForm" title="Login"><VendorLogin /></Tab>
                    <Tab className="xx" eventKey="registerForm" title="Register"><VendorRegister /></Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            :
            <>
              <div className="">
                <Navbar className="nav" expand="lg" bg="white" fixed="bottom" variant="light">
                  <div className="container d-flex flex-row justify-content-between">
                    <Navbar.Brand className="logo-font xxx" href="/">{
                      user.company_name + ", " + user.company_branch
                    }</Navbar.Brand>
                    <Nav.Link onClick={() => this.logout()}>
                      Log Out
                      </Nav.Link>
                  </div>
                </Navbar>

                <div className="container">
                  <Tab.Container
                    defaultActiveKey={localStorage.getItem("defTab") === null ? "orders" : localStorage.getItem("defTab")}
                    fixed="top"
                    style={{ minHeight: "100vh" }}>
                    <Row style={{ minHeight: "100vh" }}>
                      <Col sm={2} style={{ minHeight: "100vh" }}>
                        <Nav className="d-flex flex-column align-items-start" fixed="top" style={{ minHeight: "100vh", width: "130px", position: "fixed", top: "0" }}>
                          <Nav.Item>
                            <Nav.Link eventKey="orders" onClick={() => this.setDef("orders")}>Orders</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="meals" onClick={() => this.setDef("meals")}>Meals</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="profile" onClick={() => this.setDef("profile")}>Profile</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="messages" onClick={() => this.setDef("messages")}>Messages</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={10}>
                        <Tab.Content>
                          <Tab.Pane eventKey="orders">
                            <Orders />
                          </Tab.Pane>
                          <Tab.Pane eventKey="meals">
                            <Meals />
                          </Tab.Pane>
                          <Tab.Pane eventKey="profile">
                            <Profile vendor={this.state.vendor} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="messages">
                            <Messages />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
                <div className="" style={{ minHeight: "64px", minWidth: "100%" }}></div>
              </div>
            </>
        }
      </div>
    )
  }
}