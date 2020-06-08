import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import RegisterForm from '../auth/RegisterForm'
import LoginForm from '../auth/LoginForm'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function Auth(props) {
  return (
    <Modal  {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Tabs className="d-flex w-100 flex-row justify-content-center" defaultActiveKey="loginForm" id="uncontrolled-tab-example">
        <Tab eventKey="loginForm" title="Login Form">
          <LoginForm handleLogin={props.handleLogin} user={props.user} />
        </Tab>
        <Tab eventKey="registerForm" title="Register Form">
          <RegisterForm handleLogin={props.handleLogin} user={props.user} />
        </Tab>
      </Tabs>
    </Modal>
  );
}

function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  // const handleLogin = props.handleLogin
  // const user = props.user

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="transparent" fixed="top" variant="dark">
        <div className="container">
          <Navbar.Brand className="logo-font" href="#home">XpressChow</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <div className="btn btn-link no-border text-white">Help</div>
              </Nav.Link>
              <Nav.Link onClick={() => setModalShow(true)}>
                <button className="btn btn-light no-border">Login/Signup</button>
              </Nav.Link>
              <Nav.Link onClick={() => setModalShow(true)}>
                {/* {props.user} */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <Auth show={modalShow} onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Header