import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // 🔹 For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://technotyrosupdated.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Signup successful! Logging in...");

        // 🔹 Auto-login after signup
        const loginResponse = await fetch("https://technotyrosupdated.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("authToken", loginData.token); // 🔹 Store token
          navigate('/Dashboard'); // 🔹 Redirect to Dashboard
        } else {
          alert("Signup successful! Please log in manually.");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo-section">
          <i className='bx bx-wave logo-icon'></i>
          <h2>Sign up for an account</h2>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-group">
              <i className='bx bx-envelope'></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <i className='bx bx-lock-alt'></i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="/" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="signin-button">
            Sign up
            <i className='bx bx-chevron-right'></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
