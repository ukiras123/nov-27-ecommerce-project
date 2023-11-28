import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth"
import { auth } from '../../firebase-config';
import { setUser } from '../../redux/auth/userSlice';
function Header() {
    const { user } = useSelector(state => state.userInfo)
    const dispatch = useDispatch();
    const handleLogOut = () => {
        // Logout from firebase and also create redux user
        signOut(auth).then(() => {
            dispatch(setUser({}))
        })
    }
    return (
        <Navbar expand="lg" bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href="/">Tech CMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user.uid ? <Link to={"/#"} onClick={handleLogOut} className='nav-link'>Logout</Link>
                            :
                            <Link to={"/login"} className='nav-link'>Login</Link>
                        }



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header