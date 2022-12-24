import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

function NavbarComponent({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("store-user");
    setCurrentUser(null);
    navigate("/");
  };

  return (

    <Navbar expand="lg" style={{"backgroundColor": "WhiteSmoke"}}>
    <Container>
      <Navbar.Brand href="#home">StoreName</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          { currentUser && <Nav.Link href="/all-products">Products</Nav.Link> }
          { currentUser && <Nav.Link href="/cart">Cart</Nav.Link> }
          { currentUser && <Nav.Link href="/orders">Orders</Nav.Link> }
          <Nav.Link href="/about">About</Nav.Link>
          { currentUser && <Navbar.Text> {currentUser} </Navbar.Text> }
          { currentUser && <Button onClick={handleLogout} variant="secondary" style={{"marginLeft": "15px"}}>Logout</Button> }
          { !currentUser && <Nav.Link href="/signup">Signup</Nav.Link> }
          { !currentUser && <Nav.Link href="/login">Login</Nav.Link> }
        </Nav>
    </Container>
  </Navbar>
  );
}

export default NavbarComponent;