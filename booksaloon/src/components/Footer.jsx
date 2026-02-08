import React from 'react';
import { Link } from 'react-router-dom';
import {
    Mail,
    MapPin,
    MessageCircle,
    Twitter,
    Instagram,
    Send,
    Sparkles,
    ChevronRight,
    Phone
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-top">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-section brand-info">
                        <div className="footer-logo">
                            <div className="brand-logo-container" style={{ width: '32px', height: '32px' }}>
                                <span className="brand-logo-text" style={{ fontSize: '1rem' }}>BZ</span>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>BookSaloonz</span>
                        </div>
                        <p className="footer-desc">
                            Revolutionizing the salon experience with AI-powered bookings
                            and premium grooming services. Your style, our priority.
                        </p>
                        <div className="social-links">
                            <a href="https://web.whatsapp.com/919600471080" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" title="WhatsApp">
                                <MessageCircle size={20} />
                            </a>
                            <a href="https://instagram.com/booksaloonz" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-icon twitter" title="Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/"><ChevronRight size={14} /> Home</Link></li>
                            <li><Link to="/salons"><ChevronRight size={14} /> Salons & Spas</Link></li>
                            <li><Link to="/products"><ChevronRight size={14} /> Shop Products</Link></li>
                            <li><Link to="/about"><ChevronRight size={14} /> About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <ul className="contact-details">
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>booksaloonz@gmail.com</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>0462 3567382</span>
                            </li>
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>Melapalayam, Tamil Nadu, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="footer-section newsletter">
                        <h3>Newsletter</h3>
                        <p>Subscribe to get latest offers and grooming tips.</p>
                        <div className="newsletter-box">
                            <input type="email" placeholder="Enter your email" />
                            <button className="subscribe-btn">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} BookSaloonz. All rights reserved. | Final Year Project</p>
            </div>
        </footer>
    );
};

export default Footer;
