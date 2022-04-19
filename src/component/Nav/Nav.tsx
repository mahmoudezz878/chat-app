import React from "react";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to={"/"} className="logo">
        <div className="logo-img">
          <img src={logo} alt="logo" width="55px" />
        </div>
        <div className="logo-text">
          <h2>
            Conn<span className="ect">ect</span>
          </h2>
        </div>
      </Link>
      <div className="user-avatar">
        <img src={avatar} alt="avatar" width="55px" />
      </div>
    </div>
  );
};

export default Nav;
