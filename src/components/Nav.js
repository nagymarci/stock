import React from 'react';

import Nav from 'react-bootstrap/Nav';

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const logoutHandler = () =>
    logout({
      returnTo: window.location.origin,
    });

  const {isAuthenticated, logout} = useAuth0();
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/watchlist">WatchLists</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin">Admin</Nav.Link>
      </Nav.Item>
      {
        isAuthenticated && 
        (
          <Nav.Item>
            <Nav.Link onClick={() => logoutHandler()}>Logout</Nav.Link>
          </Nav.Item>
        )
      }
    </Nav>
  )
}

export default NavBar;