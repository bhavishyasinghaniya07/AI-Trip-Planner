import React from "react";
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo2.png";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-branding">
          <img src={logo} className="footer-logo" alt="TripPlanner Logo" />
          <p className="footer-slogan">Making memories around the globe</p>
        </div>

        <div className="footer-message">
          <p className="journey-wish">
            Wish You A Very Happy Journey From Our Side{" "}
            <span className="emoji">✌️</span>
          </p>
        </div>

        <div className="footer-credits">
          <p className="copyright">
            © {currentYear} Created with <FaHeart className="heart-icon" /> by
            Bhavishya Parmar
          </p>

          <div className="social-links">
            <a href="#" className="social-link" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
