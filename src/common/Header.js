import React, { Component } from "react";
import logo from "../common/logo.png";
import "./Header.css";
import Search from "./Search";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">
          <img src={logo} alt="LogoHeader" className="Header-logo" />
          <Search />
        </Link>
      </div>
    );
  }
}

export default Header;
