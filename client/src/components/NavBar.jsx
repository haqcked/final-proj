import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Collection Management System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser ? `Signed in with: ${currentUser.email}` : '👤'}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
