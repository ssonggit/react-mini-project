import React from "react";
import { Link } from "react-router-dom";


// 리액트 부트스트랩
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" bg='dark' variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="https://byline.network/wp-content/uploads/2018/04/580b57fcd9996e24bc43c529-e1522889554101.png" 
            alt="로고이미지"
            width={100}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="nav-item" to='/'>Home</Link>
              <Link className="nav-item" to='/movies'>Movie</Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="검색할 영화명..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
