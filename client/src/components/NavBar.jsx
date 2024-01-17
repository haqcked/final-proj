import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function NavBar() {
  const { currentUser, handleLogout } = useContext(AuthContext);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Collection Management System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser ? (
              <>
                Signed in with: {currentUser.email}
                <button className='btn btn-secondary ms-3' onClick={handleLogout}>Logout
                </button>
              </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary me-2">Sign In</Link>
                  <Link to="/sign-up" className="btn btn-success">Sign Up</Link>
                </>
              )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
