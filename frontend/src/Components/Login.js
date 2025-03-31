import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await axios.post('http://localhost:8000/login', { email, password }, { withCredentials: true });
  
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);  // Store token
        window.dispatchEvent(new Event("authChange")); // 🔥 Notify other components
        navigate('/dashboard');  // Redirect to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };
  

  return (
    <div className="login-container">
      <h2>Log in to Techno Tryos</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}
