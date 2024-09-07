import './App.css';
import './css/navbar.css'
import './css/home.css'
import './css/footer.css'
import './css/signUp.css'
import './css/aboutUs.css'
import './css/profile.css'
import './css/alert.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import {
  BrowserRouter as Router,
  Routes, 
  Route 
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Navbar /> {/* Navbar */}
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

      </Routes>

      <Footer /> {/* Footer */}

    </Router>
  );
}

export default App;
