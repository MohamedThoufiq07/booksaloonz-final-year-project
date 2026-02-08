import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Scissors, Package, Info, Phone, User, LogIn, ChevronDown, Sparkles, Settings, MapPin, LogOut, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import './Navbar.css';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            {/* Left Side: Image Logo & Brand Name */}
            <div className="navbar-brand">
                <div className="brand-logo-container">
                    <span className="brand-logo-text">BZ</span>
                </div>
                <span className="brand-name">
                    BookSaloonz
                </span>
            </div>

            <button className="mobile-menu-btn" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Navigation & Auth Section grouped */}
            <div className={`navbar-menu ${isMenuOpen ? 'mobile-active' : ''}`}>
                <ul className="navbar-links">
                    <li><Link to="/" className="nav-item" onClick={closeMenu}><HomeIcon size={18} /> Home</Link></li>
                    <li><Link to="/salons" className="nav-item" onClick={closeMenu}><Scissors size={18} /> Saloon & Spas</Link></li>
                    <li><Link to="/products" className="nav-item" onClick={closeMenu}><Package size={18} /> Products</Link></li>
                    <li><Link to="/about" className="nav-item" onClick={closeMenu}><Info size={18} /> About</Link></li>
                    <li><a href="#contact" className="nav-item" onClick={closeMenu}><Phone size={18} /> Contact</a></li>
                    <li><Link to="/hair-tracker" className="nav-item ai-tracker-nav" onClick={closeMenu}><Sparkles size={18} /> AI Hair Tracker</Link></li>
                </ul>

                <div className="auth-group">
                    {isLoggedIn ? (
                        <div className="profile-container">
                            <div
                                className="profile-wrapper profile-icon-only"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                title={user?.name || 'Profile'}
                            >
                                <div className="profile-icon">
                                    <User size={20} />
                                </div>
                                <ChevronDown size={14} className={`dropdown-arrow ${showProfileMenu ? 'active' : ''}`} />
                            </div>

                            {showProfileMenu && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-user-info">
                                        <p className="dropdown-user-name">{user?.name || 'User'}</p>
                                        <p className="dropdown-user-email">{user?.email || ''}</p>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    <Link to="/profile" className="profile-dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <User size={16} /> Profile
                                    </Link>
                                    <button className="profile-dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <Settings size={16} /> Settings
                                    </button>
                                    <button className="profile-dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <MapPin size={16} /> Change Address
                                    </button>
                                    <hr className="dropdown-divider" />
                                    <button className="logout-btn" onClick={() => { logout(); closeMenu(); }}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="dropdown">
                                <button
                                    className="dropdown-btn"
                                    onClick={() => setShowLoginMenu(!showLoginMenu)}
                                >
                                    <LogIn size={18} /> Login <ChevronDown size={14} />
                                </button>
                                {showLoginMenu && (
                                    <div className="dropdown-content">
                                        <Link
                                            to="/login"
                                            className="dropdown-item"
                                            onClick={() => { setShowLoginMenu(false); closeMenu(); }}
                                        >
                                            User Login
                                        </Link>
                                        <Link
                                            to="/salon-login"
                                            className="dropdown-item"
                                            onClick={() => { setShowLoginMenu(false); closeMenu(); }}
                                        >
                                            Partner Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/signup" className="signup-btn" onClick={closeMenu}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
