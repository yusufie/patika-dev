import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  {
    path: "/",
    display: "Overview",
  },
  {
    path: "/symptoms",
    display: "Symptoms",
  },
  {
    path: "/statistics",
    display: "Statistics",
  },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link to="/" className="navbar-brand" >
          <img src={logo} alt="Logo" width="300" height="100" className="d-inline-block align-text-top"/>
          </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse justify-content-center" id="collapsingNavbar">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link to={link.path} className="nav-link text-light fs-5">
                  {link.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
