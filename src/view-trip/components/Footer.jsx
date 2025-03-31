import React from "react";
import "./Footer.css"; // Import CSS file
import logo from "../../assets/logo2.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo} className="footer-logo" alt="Logo" />
      <h3 className="footer-text">
        Wish You A Very Happy Journey From Our Side ✌️
      </h3>
      <h4 className="footer-credits">Created by Bhavishya Parmar</h4>
    </div>
  );
};

export default Footer;
