import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { login, signup } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err: any) {
      setError('Failed to ' + (isLogin ? 'log in' : 'sign up') + ': ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      {error && <div style={{ 
        backgroundColor: '#fdeded', 
        color: '#5f2120',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '16px'
      }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            width: '100%'
          }}
        >
          {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
        </button>
      </form>
      
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#4285f4',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
  );
};

export default Login;