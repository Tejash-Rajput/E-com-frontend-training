/**
 * Footer Component
 * 
 * This component renders the footer section of the application, including:
 * - Logo and brief description.
 * - Quick navigation links.
 * - Social media icons with external links.
 * - Copyright information.
 * 
 * @component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../Common/styles/common.scss';

const Footer = () => {
  return (
    <footer className="footer-in">
      <div className="footer-container">
        
        {/* Logo and Description */}
        <div className="footer-logo">
          <h2>V-Comm</h2>
          <p>Your one-stop shop for everything.</p>
        </div>

        {/* Quick Navigation Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            {/* <li><Link to="/about">About</Link></li> */}
            {/* <li><Link to="/contact">Contact</Link></li> */}
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} V-Comm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
