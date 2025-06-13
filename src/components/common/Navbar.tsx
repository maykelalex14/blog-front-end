import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import SteakzLogo from '../SteakzLogo';

const Nav = styled.nav`
  background: #222;
  color: #fff;
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
`;
const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  letter-spacing: 2px;
`;
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover {
    background: #b71c1c;
  }
`;
const LogoutBtn = styled.button`
  background: #b71c1c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #7f1010;
  }
`;

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav>
      <Container>
        <Logo to="/" style={{display:'flex',alignItems:'center',gap:8}} onClick={() => window.location.href = '/'}>
          <SteakzLogo size={36} />
          <span style={{fontWeight:700,letterSpacing:2}}>Steakz</span>
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu" reloadDocument>Menu</NavLink>
          <NavLink to="/reservations" reloadDocument>Reservations</NavLink>
          <NavLink to="/contact" reloadDocument>Contact</NavLink>
          <NavLink to="/about">About Us</NavLink>
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              {/* Show Inventory only for manager/admin */}
              {(user.role === 'manager' || user.role === 'admin') && (
                <NavLink to="/inventory">Inventory</NavLink>
              )}
              {/* Show Kitchen for chef */}
              {user.role === 'chef' && (
                <NavLink to="/dashboard">Kitchen</NavLink>
              )}
              {/* Show Branch Manager Dashboard for branchManager */}
              {user.role === 'branchManager' && (
                <NavLink to="/dashboard">Branch Manager</NavLink>
              )}
              {/* Show HQ Manager Dashboard for hqManager */}
              {user.role === 'hqManager' && (
                <NavLink to="/dashboard">HQ Manager</NavLink>
              )}
              {/* Show Admin Settings for admin */}
              {user.role === 'admin' && (
                <NavLink to="/admin-settings">Admin Settings</NavLink>
              )}
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </>
          )}
        </NavLinks>
      </Container>
    </Nav>
  );
};

export default Navbar;

// TODO: Students - Enhance the Navbar with the following:
// 1. Add responsive design (e.g., hamburger menu for mobile)
// 2. Add styling for active links using react-router-dom's NavLink
// 3. Add accessibility attributes (e.g., aria-labels)
