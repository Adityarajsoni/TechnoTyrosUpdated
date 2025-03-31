'use client';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Question Generator', href: '/QuestionGenerator' },
  { name: 'Answer Evaluation', href: '/AnswerEvaluation' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuth = () => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  };

  // Listen for authentication changes
  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="Techno Tryos" className="logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="navbar-auth">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link logout">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/signup" className="nav-link signup">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Bars3Icon className="icon" />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button className="close-button" onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="icon" />
            </button>
            <div className="mobile-links">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="mobile-link logout">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  <Link to="/signup" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
