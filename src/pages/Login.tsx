import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserRole } from '../types';
import styled from 'styled-components';
import { RegisteredUsersContext } from '../context/RegisteredUsersContext';
import { LoginLogContext } from '../context/LoginLogContext';

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
  const { isRegistered, users: registeredCustomers } = useContext(RegisteredUsersContext);
  const { addLog } = useContext(LoginLogContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toLocaleString();
    if (username === 'admin' && password === 'admin123') {
      // Admin has access to everything
      const rbacUser = {
        id: 'admin',
        name: 'admin',
        role: 'admin' as UserRole,
      };
      authLogin('mock-token', rbacUser);
      addLog({ username: 'admin', role: 'admin', time: now, status: 'success' });
      navigate('/admin/users'); // Redirect admin to User Management
      return;
    }
    if (username === 'manager' && password === 'manager123') {
      const rbacUser = {
        id: 'manager',
        name: 'manager',
        role: 'manager' as UserRole,
      };
      authLogin('mock-token', rbacUser);
      addLog({ username: 'manager', role: 'manager', time: now, status: 'success' });
      navigate('/dashboard/manager/reports'); // Redirect manager to Reports page
      return;
    }
    if (username === 'hqmanager' && password === 'hq123') {
      const rbacUser = {
        id: 'hqmanager',
        name: 'hqmanager',
        role: 'hqManager' as UserRole,
      };
      authLogin('mock-token', rbacUser);
      addLog({ username: 'hqmanager', role: 'hqManager', time: now, status: 'success' });
      navigate('/dashboard/hq');
      return;
    }
    if (username === 'cashier' && password === 'cashier123') {
      const rbacUser = {
        id: 'cashier',
        name: 'cashier',
        role: 'cashier' as UserRole,
      };
      authLogin('mock-token', rbacUser);
      addLog({ username: 'cashier', role: 'cashier', time: now, status: 'success' });
      navigate('/dashboard/cashier/orders'); // Redirect cashier to Order Management as default
      return;
    }
    if (username && password) {
      // Only allow login for registered customers with correct credentials
      if (isRegistered(username, password)) {
        const rbacUser = {
          id: 'mock-' + username,
          name: username,
          role: 'customer' as UserRole,
        };
        authLogin('mock-token', rbacUser);
        addLog({ username, role: 'customer', time: now, status: 'success' });
        navigate('/'); // Always redirect customer to home page after login
        return;
      } else if (registeredCustomers.some(u => u.username === username)) {
        setError('Login failed: Incorrect password.');
        addLog({ username, role: 'customer', time: now, status: 'fail' });
      } else {
        setError('Login failed: You must sign up first.');
        addLog({ username, role: 'customer', time: now, status: 'fail' });
      }
      return;
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
