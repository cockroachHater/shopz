import logoR from "../img/logoR.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <Navbar expand={"lg"} style={{ backgroundColor: "#222" }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            className="logoImg_side"
            src={logoR}
            style={{ height: "50px" }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle style={{ backgroundColor: "#ababab" }} />
        <Navbar.Offcanvas placement="end" style={{ backgroundColor: "#222" }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Font>So Sweet</Font>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1">
              <NavDropdown
                title={
                  <Category>
                    Category
                    <Icon icon="nrk:arrow-dropdown" />
                  </Category>
                }
              >
                <NavDropdown.Item href="/candy">Candy</NavDropdown.Item>
                <NavDropdown.Item href="/jelly">Jelly</NavDropdown.Item>
                <NavDropdown.Item href="/chocolate">Chocolate</NavDropdown.Item>
                <NavDropdown.Item href="/caramel">Caramel</NavDropdown.Item>
                <NavDropdown.Item href="/marshmallow">
                  Marshmallow
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/best">
                <Font>Best</Font>
              </Nav.Link>
              <Nav.Link href="/event">
                <Font>Event</Font>
              </Nav.Link>
              <Nav.Link href="/faq">
                <Font>FAQ</Font>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

let Font = styled.div`
  color: #82cfff;
`;

let Category = styled.span`
  color: #82cfff;
`;
