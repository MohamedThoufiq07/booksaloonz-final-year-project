import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, BarChart, History, Lightbulb } from 'lucide-react';
import './HairTracker.css';

const HairTracker = () => {
    return (
        <div className="hair-tracker-container">
            <div className="tracker-hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="ai-badge">
                        <Sparkles size={16} /> <span>Powered by AI</span>
                    </div>
                    <h1>AI Hair <span className="highlight">Tracker</span></h1>
                    <p>Track your hair growth, health, and style journey with our advanced computer vision technology.</p>
                </motion.div>
            </div>

            <div className="features-grid">
                <motion.div className="feature-card" whileHover={{ y: -10 }}>
                    <div className="feature-icon"><Camera size={32} /></div>
                    <h3>Growth Analysis</h3>
                    <p>Upload weekly photos to track length and volume changes with millimeter precision.</p>
                </motion.div>
                <motion.div className="feature-card" whileHover={{ y: -10 }}>
                    <div className="feature-icon"><BarChart size={32} /></div>
                    <h3>Health Score</h3>
                    <p>Our AI analyzes texture, shine, and split ends to give you a comprehensive health report.</p>
                </motion.div>
                <motion.div className="feature-card" whileHover={{ y: -10 }}>
                    <div className="feature-icon"><Lightbulb size={32} /></div>
                    <h3>Smart Recommendations</h3>
                    <p>Get personalized product and treatment suggestions based on your unique hair profile.</p>
                </motion.div>
                <motion.div className="feature-card" whileHover={{ y: -10 }}>
                    <div className="feature-icon"><History size={32} /></div>
                    <h3>Journey Timeline</h3>
                    <p>Visualize your progress over months and see the impact of your hair care routine.</p>
                </motion.div>
            </div>

            <div className="cta-section">
                <motion.div
                    className="cta-card"
                    whileHover={{ scale: 1.02 }}
                >
                    <h2>Ready to start your journey?</h2>
                    <p>Join thousands of users who are taking their hair care to the next level.</p>
                    <button className="start-btn">Launch Simulator <Sparkles size={18} /></button>
                </motion.div>
            </div>
        </div>
    );
};

export default HairTracker;
