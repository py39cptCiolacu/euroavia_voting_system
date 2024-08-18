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
            <MDBNavbarItem>
              <MDBNavbarLink href="/admin_home">Home</MDBNavbarLink>
            </MDBNavbarItem>
            {isAuthenticated ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/admin_logout'> LogOut</MDBNavbarLink>
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
