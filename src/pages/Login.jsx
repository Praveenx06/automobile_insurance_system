


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/loginlogo.jpg";  
import axios from '../services/http-common.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { username: email, password });

      const token = res.data.token || res.data.access_token;
      if (token) {
        localStorage.setItem('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'ADMIN') {
          navigate('/admin/dashboard');  
        } else {
          navigate('/user/dashboard');   
        }
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="bg-dark text-white p-4 rounded" style={{ minWidth: '320px', opacity: 0.85 }}>
        <h2 className="text-center mb-4">Welcome to login</h2>
        
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        <button
          className="btn btn-light w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <div className="text-danger mt-2 text-center">{error}</div>}

       
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <span 
            onClick={() => navigate("/register")} 
            className="text-info cursor-pointer"
            style={{ textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
