import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './components/common/GlobalStyle';
import Navbar from './components/common/Navbar';
import HeroBanner from './components/HeroBanner';
import About from './components/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ScrollToSection from './components/common/ScrollToSection';
import ProtectedRoute from './components/ProtectedRoute';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import { LoginLogProvider } from './context/LoginLogContext';
import { AuthProvider, UserProvider } from './context/AuthContext';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import ReservationConfirmation from './pages/ReservationConfirmation';
import ContactConfirmation from './pages/ContactConfirmation';
import Checkout from './pages/Checkout';
import LeaveReview from './pages/LeaveReview';
import AdminSettings from './pages/AdminSettings';

const NotFound: React.FC = () => <div style={{padding: 40}}><h2>404 - Page Not Found</h2></div>;

const Home: React.FC = () => (
  <>
    <HeroBanner />
    <About />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <LoginLogProvider>
        <UserProvider>
          <AuthProvider>
            <Router>
              <ScrollToSection />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/menu" element={<Menu />} />
                <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}> 
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/admin-settings" element={<AdminSettings />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['admin', 'manager', 'customer']} />}> 
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reservation-confirmation" element={<ReservationConfirmation />} />
                <Route path="/contact-confirmation" element={<ContactConfirmation />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/leave-review" element={<LeaveReview />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AuthProvider>
        </UserProvider>
      </LoginLogProvider>
    </>
  );
};

export default App;

// TODO: Students - Complete the routing setup by:
// 1. Implementing the MyPosts page (/my-posts) to show the logged-in user's posts
// 2. Adding protected route logic to restrict access to certain routes based on user role
// 3. Adding a 404 page for invalid routes
