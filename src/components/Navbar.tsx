import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.nav)<{scrolled: boolean}>`
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 100;
  background: ${({ scrolled }: { scrolled: boolean }) =>
    scrolled
      ? 'rgba(20, 20, 20, 0.95)'
      : 'linear-gradient(90deg, #1a1a1a 60%, #e85d04 100%)'};
  box-shadow: ${({ scrolled }: { scrolled: boolean }) =>
    scrolled ? '0 2px 8px rgba(0,0,0,0.12)' : 'none'};
  transition: background 0.3s, box-shadow 0.3s;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 24px;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: #fff8f0;
  letter-spacing: 2px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: #fff8f0;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #ffd166;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 28px;
  height: 3px;
  background: #fff8f0;
  border-radius: 2px;
  transition: all 0.3s;
`;

const MobileMenu = styled(motion.ul)`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100vw;
    background: #1a1a1a;
    gap: 0;
    z-index: 200;
    padding: 0;
  }
`;

const navItems = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'menu', label: 'Menu' },
  { to: 'reservation', label: 'Reservations' },
  { to: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <NavbarContainer scrolled={scrolled} initial={{ y: -80 }} animate={{ y: 0 }}>
      <NavContent>
        <Logo to="hero" smooth duration={600} offset={-70} spy>Steakz</Logo>
        <NavLinks className="desktop-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                smooth
                duration={600}
                offset={-70}
                spy
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </NavLinks>
        <Hamburger onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle navigation">
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
        {mobileOpen && (
          <MobileMenu
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  smooth
                  duration={600}
                  offset={-70}
                  spy
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </MobileMenu>
        )}
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;

export {};
