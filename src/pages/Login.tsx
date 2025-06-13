import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserRole } from '../types';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  max-width: 400px;
  margin: 48px auto;
`;
const Title = styled.h1`
  color: #222;
  margin-bottom: 24px;
  text-align: center;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
const Button = styled.button`
  background: #b71c1c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: #7f1010;
  }
`;
const ErrorMsg = styled.p`
  color: #c62828;
  text-align: center;
  margin-bottom: 0;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Demo: assign role based on username for mock login
  const getRole = (username: string): UserRole => {
    if (username.toLowerCase() === 'admin') return 'admin';
    if (username.toLowerCase() === 'manager') return 'manager';
    return 'customer';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      const rbacUser = {
        id: 'mock-' + username,
        name: username,
        role: getRole(username),
      };
      authLogin('mock-token', rbacUser);
      navigate('/dashboard');
    } else {
      setError('Login failed');
    }
  };

  return (
    <Card>
      <Title>Login</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </StyledForm>
    </Card>
  );
};

export default Login;
