import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';

const Navbar = ({ isAuthenticated }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand="lg" light>
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          data-bs-target="#navbarTogglerExternalContent"
          aria-controls="navbarTogglerExternalContent"
          aria-expanded={showNav}
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        />
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav className='ms-auto mb-2 mb-lg-0'>
            {isAuthenticated ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/admin_home">Home</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/create_app'> Create App</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/manage_app'> Manage App</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/voting_session'> Voting Session </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/current_voting_session'> Current Voting Session</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/results'> Results</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/admin_logout'> Logout</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/admin_login">Admin Login</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/admin_register">Admin Register</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
