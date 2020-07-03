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
import Vendor from "./components/vendor.component"
// import Test from "./components/test.component"
import Checkout from "./components/checkout.component"
import Footer from "./pages/Footer"
import LoginForm from './components/login.component'
import RegisterForm from './components/register.component'
import NotFound from './NotFound'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      show: props.modal,
      cart: [],
      placedOrderData: []
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

  updateCart = (arr) => {
    this.setState({
      cart: arr
    })
  }

  scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop)
  }

  placeOrderData = (arr) => {
    this.setState({
      placedOrderData: arr,
      cart: []
    })
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
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Modal show={this.state.show} onHide={close} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <Tabs className="d-flex xx w-100 flex-row justify-content-center" defaultActiveKey="loginForm" id="uncontrolled-tab-example">
            <Tab className="xx" eventKey="loginForm" title="Login Form">
              <LoginForm hideModal={() => this.setState({ show: false })} />
            </Tab>
            <Tab className="xx" eventKey="registerForm" title="Register Form">
              <RegisterForm hideModal={() => this.setState({ show: false })}  showModal={() => this.setState({ show: true })}/>
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
                      <NavDropdown title={"Hi, " + currentUser.first_name} className="btn btn-link xx text-light">
                      <Nav.Link className="xx" href={"/profile"}>
                          <button className="btn btn-link text-dark no-border">Timeline</button>
                        </Nav.Link>
                        <Nav.Link className="xx" href={"/profile"}>
                          <button className="btn btn-link text-dark no-border">My Account</button>
                        </Nav.Link>
                        <Nav.Link className="xx" href={"/profile"}>
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

        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path={["/", "/home"]} render={(props) =>
              <Home {...props} />} />
            <Route exact path="/profile" render={(props) =>
              <Profile {...props}
                placedOrderData={this.state.placedOrderData}
              />} />
            <Route exact path="/vendor/:vendorname" render={(props) =>
              <Vendor {...props}
                updateCart={this.updateCart}
              />} />
            <Route exact path="/vendor/:vendorname/checkout" render={(props) =>
              JSON.parse(localStorage.getItem("cartTemp")).length === 0 && this.state.cart.length === 0 ?
                (  
                  window.location.href = "/"
                )
                :
              (<Checkout {...props}
                cart={this.state.cart}
                placeOrderData={(a) => this.placeOrderData(a)}
                showModal={() => this.setState({ show: true })}
                />)
            } />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;