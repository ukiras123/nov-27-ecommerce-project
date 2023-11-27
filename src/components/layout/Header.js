import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar expand="lg" bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href="/">Tech CMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to={"/login"} className='nav-link'>Login</Link>
                        <Link to={"/#"} className='nav-link'>Logout</Link>
                        <Link to="/register" className='nav-link'>Signup</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header