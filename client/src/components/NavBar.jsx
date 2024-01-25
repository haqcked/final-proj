import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function NavBar() {
  const { currentUser, handleLogout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand fw-bolder">CollectionBOOK</Link>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser ? (
              <>
                Signed in with: {currentUser.email}
                <button className='btn btn-outline-secondary ms-3' onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            ) : (
              <>
                {(location.pathname === '/login' || location.pathname === '/') && (
                  <Link to="/sign-up" className="btn btn-outline-success me-3">Sign Up</Link>
                )}
                {(location.pathname === '/sign-up' || location.pathname === '/') && (
                  <Link to="/login" className="btn btn-outline-primary">Login</Link>
                )}
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
