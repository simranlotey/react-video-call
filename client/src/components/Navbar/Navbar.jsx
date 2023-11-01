import React from "react";
import { Navbar } from "react-bootstrap";
import { css } from "aphrodite";
import { navbarBrand } from "../../config/config";
import logo from "../../assests/logo.png";
import styles from "../Navbar/index";

function NavBar() {
  return (
    <>
      <Navbar className={css(styles.navBar)}>
        <Navbar.Brand className={css(styles.navBrand)} href="/">
          <img src={logo} alt="Logo" className={css(styles.logoImage)} />
          {navbarBrand}
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default NavBar;
