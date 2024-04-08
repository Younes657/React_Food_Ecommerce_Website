import React from "react";

let logo = require("../../Assets/Images/mango.png");
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className=" container-fluid">
        <a className="navbar-brand" href="/">
          <img  style={{width:"40px", aspectRatio:1 / 1}} src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                Services
              </a>
            </li>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
          </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
