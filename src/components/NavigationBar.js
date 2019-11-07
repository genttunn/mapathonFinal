import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { IoMdDownload, IoIosLogOut, IoIosLogIn } from "react-icons/io";
class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="" expand="lg">
          <Navbar.Brand>Mapathon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/roger-schaer/mapathon">
                Source Repository
              </Nav.Link>
              <Nav.Link href={""} onClick={this.props.handleOpenGuide}>
                User Guide
              </Nav.Link>
            </Nav>
            {this.props.isAuthenticated ? (
              <div>
                {this.props.user.email}
                <Button
                  variant="danger"
                  className="mr-sm-2 ml-sm-4"
                  onClick={this.props.handleLogout}
                >
                  <IoIosLogOut size={24} />
                </Button>
                <Button
                  variant="warning"
                  className="mr-sm-2"
                  onClick={this.props.handleGetPOI}
                >
                  <IoMdDownload size={24} />
                </Button>
                <Button
                  variant="info"
                  className="mr-sm-2"
                  onClick={this.props.toggleMenu}
                >
                  Menu
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="success"
                  className="mr-sm-2"
                  onClick={this.props.handleLogin}
                >
                  <IoIosLogIn size={24} />
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>{" "}
      </React.Fragment>
    );
  }
}

export default NavigationBar;
