import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>Techno Tryos</h3>
          <p>Automate, Analyze, and Accelerate Learning</p>
        </div>

        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="#home">Dashboard</Link></li>
            <li><Link to="#about">Features</Link></li>
            <li><Link to="#gallery">Testimonals</Link></li>
            <li><Link to="#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <Link to="#" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Techno Tryos. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
