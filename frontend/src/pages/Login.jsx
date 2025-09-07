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
    <>
      {/* Inject placeholder styling */}
      <style>
        {`
          ::placeholder {
            color: white !important;
            opacity: 1;
          }
        `}
      </style>

      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            color: '#ffc400e1',
            fontWeight: 'bold',
            fontSize: '3.5rem',
            textShadow: '2px 2px 6px rgba(48, 47, 47, 0.6)',
            marginBottom: '2rem'
          }}
        >
          WELCOME TO AUTOMOBILE INSURANCE SYSTEM
        </h1>

        <div
          className="text-white shadow-lg"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          <h3 className="text-center mb-4" style={{ fontWeight: '600', letterSpacing: '1px' }}>
            Login
          </h3>

          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-transparent text-white border-light"
              placeholder="Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ color: 'white' }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-transparent text-white border-light"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ color: 'white' }}
            />
          </div>

          <button
            className="btn btn-warning w-100 fw-bold"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <div className="text-danger mt-3 text-center">{error}</div>}

          <p className="mt-4 text-center" style={{ fontSize: '0.9rem' }}>
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-info"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
