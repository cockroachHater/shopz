import Container from "react-bootstrap/Container";
import logoR from "../../img/logoR.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Navbar expand={"md"} style={{ backgroundColor: "#222" }}>
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
                <NavDropdown.Item href="/category/candy">
                  Candy
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/jelly">
                  Jelly
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/chocolate">
                  Chocolate
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/caramel">
                  Caramel
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/marshmallow">
                  Marshmallow
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/category/best">
                <Font>Best</Font>
              </Nav.Link>
              <Nav.Link href="/event">
                <Font>Event</Font>
              </Nav.Link>
              <Nav.Link href="/faq">
                <Font>FAQ</Font>
              </Nav.Link>

              {props.userName === null ? (
                <Nav.Link href="/login">
                  <Auth>Login</Auth>
                </Nav.Link>
              ) : (
                <Auth>
                  <NavDropdown
                    title={
                      <Category>
                        {props.userName}
                        <Icon icon="nrk:arrow-dropdown" />
                      </Category>
                    }
                  >
                    {props.userRole === "manager" ? (
                      <NavDropdown.Item href="/manage">
                        관리자페이지
                      </NavDropdown.Item>
                    ) : null}
                    <NavDropdown.Item href="/mypage">
                      마이페이지
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/buy">구매내역</NavDropdown.Item>
                    <NavDropdown.Item href="/cart">장바구니</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Auth>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

let Font = styled.div`
  color: #90caf9;
`;
let Auth = styled.div`
  color: #eeeeee;
  position: absolute;
  right: 15%;
`;
let Category = styled.span`
  color: #90caf9;
`;
