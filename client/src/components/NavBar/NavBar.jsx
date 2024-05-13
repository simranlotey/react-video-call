import React from "react";
import { Navbar } from "react-bootstrap";
import { navbarBrand } from "../../config/config";
import logo from "../../assets/logo.png";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar className="nav-bar">
      <Navbar.Brand className="nav-brand" href="/">
        <img src={logo} alt="Logo" className="logo-image" />
        {navbarBrand}
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;
