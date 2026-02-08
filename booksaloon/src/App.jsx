import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Salons from './pages/Salons';
import Products from './pages/Products';
import About from './pages/About';
import Footer from './components/Footer';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SalonLogin from './pages/SalonLogin';
import SalonSignup from './pages/SalonSignup';
import HairTracker from './pages/HairTracker';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
    const location = useLocation();
    const hideNavbarFooter = ['/login', '/signup', '/salon-login', '/salon-signup'].includes(location.pathname);

    return (
        <div className="app-container">
            {!hideNavbarFooter && <Navbar />}
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/salons" element={<Salons />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/salon-login" element={<SalonLogin />} />
                    <Route path="/salon-signup" element={<SalonSignup />} />
                    <Route path="/hair-tracker" element={<HairTracker />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            {!hideNavbarFooter && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
