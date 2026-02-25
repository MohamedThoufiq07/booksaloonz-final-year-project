import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, MapPin, Image, UserPlus, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Signup.css'; // Reusing Signup.css for consistency

const SalonSignup = () => {
    const [formData, setFormData] = useState({
        name: '', // This is ownerName in backend, will map it
        email: '',
        password: '',
        confirmPassword: '',
        salonName: '',
        address: 'Tirunelveli, Tamil Nadu, India',
        salonPhoto: '',
        startingPrice: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { partnerSignup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        // Frontend Validation
        if (formData.name.length < 3) {
            setError('Owner Name must be at least 3 characters.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        // Map frontend fields (name) to backend expected (ownerName)
        const partnerData = {
            ownerName: formData.name,
            salonName: formData.salonName,
            email: formData.email,
            password: formData.password,
            address: formData.address,
            salonPhoto: formData.salonPhoto,
            startingPrice: formData.startingPrice
        };

        const result = await partnerSignup(partnerData);

        if (result.success) {
            setSuccessMsg(result.message || 'Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/salon-login');
            }, 2000);
        } else {
            setError(result.message || 'Signup failed. Please try again.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="signup-container">
            <div className="signup-card partner-signup-card" style={{ maxWidth: '600px' }}>
                <Link to="/" className="signup-header">
                    <img src={logo} alt="Logo" className="auth-logo" />
                    <h1>Partner Registration</h1>
                    <p>Register your salon with BookSaloonz</p>
                </Link>

                {error && <div className="auth-error-msg">{error}</div>}
                {successMsg && <div className="auth-success-msg" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #10b981' }}>{successMsg}</div>}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="name">Owner Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input type="email" id="email" placeholder="owner@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{ paddingRight: '2.8rem' }}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={{ paddingRight: '2.8rem' }}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex="-1"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <hr style={{ margin: '20px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Salon Details</h3>

                    <div className="form-group">
                        <label htmlFor="salonName">Salon Name</label>
                        <div className="input-wrapper">
                            <Store className="input-icon" size={18} />
                            <input type="text" id="salonName" placeholder="Royal Grooming Hub" value={formData.salonName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Salon Location</label>
                        <div className="input-wrapper">
                            <MapPin className="input-icon" size={18} />
                            <input type="text" id="address" value={formData.address} readOnly style={{ backgroundColor: 'rgba(255,255,255,0.05)', cursor: 'not-allowed' }} />
                        </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="salonPhoto">Salon Photo URL</label>
                            <div className="input-wrapper">
                                <Image className="input-icon" size={18} />
                                <input type="text" id="salonPhoto" placeholder="https://..." value={formData.salonPhoto} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startingPrice">Starting Price (₹)</label>
                            <div className="input-wrapper">
                                <span className="input-icon" style={{ paddingLeft: '8px' }}>₹</span>
                                <input type="number" id="startingPrice" placeholder="500" value={formData.startingPrice} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="signup-submit-btn" disabled={isSubmitting} style={{ marginTop: '20px' }}>
                        {isSubmitting ? 'Registering...' : <><UserPlus size={18} /> Register Salon</>}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>Already a partner? <Link to="/salon-login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SalonSignup;
