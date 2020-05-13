import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export class NavbarComponent extends React.Component {
  render() {
    return(
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-contols="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/graph">Graph</Nav.Link>
            <Nav.Link href="/graph2">Graph2</Nav.Link>        
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
