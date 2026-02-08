import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

/**
 * Enhanced Home Page Component
 * Features:
 * - Animated Hero Section
 * - Personalized Offers
 * - "Book Now" prominent CTA
 */
const Home = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleBookNow = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const location = prompt("Please enter your location (e.g., Tirunelveli, Tamil Nadu, India):");
        if (location) {
            const normalizedLocation = location.toLowerCase().trim();
            if (normalizedLocation.includes("tirunelveli")) {
                alert("Service is available in your location! Redirecting to salons...");
                navigate('/salons?location=Tirunelveli');
            } else {
                alert("Sorry the location not available. BookSaloonz is currently only available in Tirunelveli, Tamil Nadu, India.");
            }
        }
    };
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.span className="badge" variants={fadeInUp}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} />
                        Smart Booking for Smart People
                    </motion.span>

                    <motion.h1 className="hero-title" variants={fadeInUp}>
                        Experience the <br />
                        <span>Smart Way to Groom</span>
                    </motion.h1>

                    <motion.p className="hero-subtitle" variants={fadeInUp}>
                        Book premium salons instantly with AI-powered
                        recommendations and seamless slot selection.
                    </motion.p>

                    <motion.div className="cta-group" variants={fadeInUp}>
                        <button
                            onClick={handleBookNow}
                            className="btn-primary"
                        >
                            <Sparkles size={20} style={{ marginRight: '8px' }} /> Book Now
                        </button>
                        <a href="/salons" className="btn-secondary">
                            Explore Salons <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Offers Section */}
            <section className="offers-section">
                <div className="section-header">
                    <div>
                        <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Exclusive</span>
                        <h2 className="section-title">Deals for You</h2>
                    </div>
                </div>

                <motion.div
                    className="offer-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {/* Offer 1 */}
                    <motion.div className="offer-card" variants={fadeInUp}>
                        <div className="offer-tag">50% OFF</div>
                        <Sparkles size={36} color="#ffffff" />
                        <h3 className="offer-title">First Booking</h3>
                        <p className="offer-desc">Get a flat 50% discount on your first salon appointment. Valid for all services.</p>
                        <a href="/bookings" className="book-now-mini">
                            Claim Offer <ArrowRight size={18} />
                        </a>
                    </motion.div>

                    {/* Offer 2 */}
                    <motion.div className="offer-card" variants={fadeInUp}>
                        <div className="offer-tag">COMBO</div>
                        <Star size={36} color="#fbbf24" />
                        <h3 className="offer-title">Premium Stylist</h3>
                        <p className="offer-desc">Buy a haircut and get a free head massage. Only for premium salon members.</p>
                        <a href="/bookings" className="book-now-mini">
                            Book Combo <ArrowRight size={18} />
                        </a>
                    </motion.div>

                    {/* Offer 3 */}
                    <motion.div className="offer-card" variants={fadeInUp}>
                        <div className="offer-tag">LIMITED</div>
                        <MapPin size={36} color="#ffffff" />
                        <h3 className="offer-title">Nearby Special</h3>
                        <p className="offer-desc">Top-rated salons in your area are offering weekend specials. Check them out!</p>
                        <a href="/salons" className="book-now-mini">
                            View Near Me <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
