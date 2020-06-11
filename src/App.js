import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './App.css'

import AuthService from "./services/auth.service";

import Home from "./Home"
import Profile from "./components/profile.component"
import Footer from "./pages/Footer"
import LoginForm from './components/login.component'
import RegisterForm from './components/register.component'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      show: props.modal
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.modal) {
      this.setState({ show: nextProps.modal })
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: JSON.parse(user)
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.history.pushState("", "", "/home")
    window.location.reload()
  }

  setModalShow(b) {
    this.setState({
      modalShow: b
    })
  }

  render() {
    const { currentUser } = this.state;
    let close = () => this.setState({ show: false });


    return (
      <>
        <Modal show={this.state.show} onHide={close} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <Tabs className="d-flex xx w-100 flex-row justify-content-center" defaultActiveKey="loginForm" id="uncontrolled-tab-example">
            <Tab className="xx" eventKey="loginForm" title="Login Form">
              <LoginForm />
            </Tab>
            <Tab className="xx" eventKey="registerForm" title="Register Form">
              <RegisterForm />
            </Tab>
          </Tabs>
        </Modal>

        <Navbar collapseOnSelect className="nav" expand="lg" bg="white" sticky="top" variant="light">
          <div className="container">
            <Navbar.Brand className="logo-font xxx" href="/">XpressChow</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link>
                  <div className="btn btn-link no-border text-dark">Help</div>
                </Nav.Link>
                {
                  currentUser ?
                    <>
                      <NavDropdown title={"Hi, " + currentUser.first_name} className="btn btn-link no-border text-light">
                        <Nav.Link href={"/profile"}>
                          <button className="btn btn-link text-dark no-border">Timeline</button>
                        </Nav.Link>
                        <Nav.Link href={"/profile"}>
                          <button className="btn btn-link text-dark no-border">My Account</button>
                        </Nav.Link>
                        <Nav.Link href={"/profile"}>
                          <button className="btn btn-link text-dark no-border">Address Book</button>
                        </Nav.Link>
                        <NavDropdown.Divider />
                        <Nav.Link onClick={() => this.logOut()}>
                          <button className="btn btn-link text-dark no-border">Sign Out</button>
                        </Nav.Link>
                      </NavDropdown>
                    </>
                    :
                    <Nav.Link onClick={() => this.setState({ show: true })}>
                      <button className="btn btn-light no-border">Login/Signup</button>
                    </Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
        <Footer />
      </>
    )
  }
}

export default App;