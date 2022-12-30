import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavbarComponent({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("store-user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "WhiteSmoke" }}>
      <Container>
        <Navbar.Brand href="#home">SwiftStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {currentUser && <Nav.Link href="/all-products">Products</Nav.Link>}
            {currentUser && <Nav.Link href="/cart">Cart</Nav.Link>}
            {currentUser && <Nav.Link href="/orders">Orders</Nav.Link>}
            {currentUser && (
              <Navbar.Text style={{ marginLeft: "10px" }}>
                {currentUser}
              </Navbar.Text>
            )}
            {currentUser && (
              <Button
                onClick={handleLogout}
                variant="secondary"
                style={{ marginLeft: "15px" }}
              >
                Logout
              </Button>
            )}
            {!currentUser && <Nav.Link href="/signup">Signup</Nav.Link>}
            {!currentUser && <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
