import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthService from "./services/auth.service";

import DashBoard from './components/carriers/dashboard.component'
import Jobs from './components/carriers/jobs.component'
import Profile from './components/carriers/profile.component'
import Messages from './components/carriers/messages.component'
import Login from './components/carriers/login.component'
import Register from './components/carriers/register.component'

export default class CarrierManagement extends Component {
  constructor(props) {
    super(props)

    let user = ""
    if (JSON.parse(AuthService.getCurrentUser())) user = JSON.parse(AuthService.getCurrentUser())
    this.state = {
      currentUser: user,
      consumer: localStorage.getItem("consumer"),
    }
  }

  componentDidMount() {
    // CarrierService.getCarrierProfile(this.state.currentUser.carriername)
    //   .then(resp => {
    //     this.setState({
    //       carrier: resp.data
    //     })
    //   })
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
                        Please if you are not a carrier, click here.
                      </div>
                    </div>
                  </a>
                  <Tabs className="d-flex xx w-100 flex-row justify-content-center" defaultActiveKey="loginForm">
                    <Tab className="xx" eventKey="loginForm" title="Login"><Login /></Tab>
                    <Tab className="xx" eventKey="registerForm" title="Register"><Register /></Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            :
            <>
              <div className="">
                <Navbar className="nav" expand="lg" bg="white" fixed="bottom" variant="light">
                  <div className="container d-flex flex-row justify-content-between">
                    <Navbar.Brand className="logo-font xxx" href="/">{this.state.currentUser.carriername}</Navbar.Brand>
                    <Nav.Link onClick={() => this.logout()}>
                      Log Out
                      </Nav.Link>
                  </div>
                </Navbar>

                <div className="container">
                  <Tab.Container
                    defaultActiveKey={localStorage.getItem("defTab") === null ? "dashboard" : localStorage.getItem("defTab")}
                    fixed="top"
                    style={{ minHeight: "100vh" }}>
                    <Row style={{ minHeight: "100vh" }}>
                      <Col sm={2} style={{ minHeight: "100vh" }}>
                        <Nav className="d-flex flex-column align-items-start" fixed="top" style={{ minHeight: "100vh", width: "130px", position: "fixed", top: "0" }}>
                          <Nav.Item>
                            <Nav.Link eventKey="dashboard" onClick={() => this.setDef("dashboard")}>Dashboard</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="jobs" onClick={() => this.setDef("jobs")}>Jobs</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="messages" onClick={() => this.setDef("messages")}>Messages</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="profile" onClick={() => this.setDef("profile")}>Profile</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={10}>
                        <Tab.Content>
                          <Tab.Pane eventKey="dashboard">
                            <DashBoard currentUser={this.state.currentUser.id}/>
                          </Tab.Pane>
                          <Tab.Pane eventKey="jobs">
                            <Jobs currentUser={this.state.currentUser} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="profile">
                            <Profile />
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