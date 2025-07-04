import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { RBACUser, UserRole } from '../types';
import { LoginLogContext } from './LoginLogContext';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  loginTime?: string; // Add loginTime to User interface
  branchId?: string; // Add branchId for branchManager/chef
}

// Simulate a logged-in user (replace with real auth in production)
export const mockUser: RBACUser = {
  id: '1',
  name: 'Jane Doe',
  role: 'manager', // Change to 'admin' or 'customer' to test
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: RBACUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType & { loading: boolean }>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addLog } = React.useContext(LoginLogContext);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Always restore user from localStorage if missing (for all roles, including cashier)
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  const login = (token: string, user: RBACUser) => {
    setToken(token);
    setUser({ ...user, loginTime: new Date().toLocaleString() });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ ...user, loginTime: new Date().toLocaleString() }));
    addLog({
      username: user.name,
      role: user.role,
      time: new Date().toLocaleString(),
      status: 'success',
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally, clear cookies if you use them for auth (not shown here)
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

interface UserContextType {
  user: RBACUser;
  setUser: React.Dispatch<React.SetStateAction<RBACUser>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<RBACUser>(mockUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

