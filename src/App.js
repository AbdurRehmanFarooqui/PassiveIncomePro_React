import React, { useEffect } from 'react';
import './App.css';
import './css/navbar.css';
import './css/home.css';
import './css/footer.css';
import './css/signUp.css';
import './css/aboutUs.css';
import './css/profile.css';
import './css/alert.css';
import './css/videobox.css';
import './css/account-vrification.css';
import './css/spinner.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcountVerification from './components/AcountVerification';

function App() {
  useEffect(() => {
    // Get the root element without the '#' symbol
    const wrapper = document.getElementById('root');

    if (!wrapper) return; // Check if root exists to prevent errors

    // Create the mutation observer
    const observer = new MutationObserver((mutations) => {
      // Update styles
      wrapper.style.height = '';
      wrapper.style.minHeight = '';
    });

    // Attach the observer to the element
    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Cleanup function to disconnect the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/signup" element={<><SignUp /></>} />
        <Route path="/login" element={<><SignUp /></>} />
        <Route path="/aboutus" element={<><AboutUs /></>} />
        <Route path="/contactus" element={<><AboutUs /></>} />
        <Route path="/privacypolicy" element={<><PrivacyPolicy /></>} />
        <Route path="/termsandconditions" element={<><PrivacyPolicy /></>} />
        <Route path="/profile" element={<><Profile /></>} />
        <Route path="/forgotpassword" element={<><ForgotPassword /></>} />
        <Route path="/auth/password/reset/verify/:secret" element={<><ForgotPassword /></>} />
        <Route path="/auth/account/verify/:secret" element={<><AcountVerification /></>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
