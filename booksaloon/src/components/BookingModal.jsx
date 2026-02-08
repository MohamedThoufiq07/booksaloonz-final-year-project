import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CreditCard, Smartphone, ScanLine } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, salon, user }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [step, setStep] = useState(1); // 1: Service, 2: Payment
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);

    // Dummy services if backend doesn't return them yet
    const services = salon?.services && salon.services.length > 0 ? salon.services : [
        { name: "Regular Haircut", price: salon?.startingPrice || 350 },
        { name: "Premium Styling", price: (salon?.startingPrice || 350) + 200 },
        { name: "Beard Trim", price: 150 },
        { name: "Hair Spa", price: 800 },
        { name: "Facial", price: 1200 }
    ];

    const totalAmount = selectedService ? selectedService.price : 0;

    const handleBook = () => {
        // Here you would typically make an API call to create the booking
        setTimeout(() => {
            setIsBookingSuccess(true);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>

                    {isBookingSuccess ? (
                        <div className="success-view">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="success-icon"
                            >
                                <Check size={48} color="white" />
                            </motion.div>
                            <h2>Booking Confirmed!</h2>
                            <p>Your appointment at {salon?.name} is set.</p>
                            <button className="btn-primary" onClick={onClose}>Done</button>
                        </div>
                    ) : (
                        <>
                            <h2>{step === 1 ? 'Select Service' : 'Payment'}</h2>

                            {step === 1 && (
                                <div className="service-selection">
                                    <p className="salon-name-modal">Booking at: <span>{salon?.name}</span></p>
                                    <div className="services-list">
                                        {services.map((service, idx) => (
                                            <div
                                                key={idx}
                                                className={`service-item ${selectedService?.name === service.name ? 'selected' : ''}`}
                                                onClick={() => setSelectedService(service)}
                                            >
                                                <span>{service.name}</span>
                                                <span className="service-price">₹{service.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="modal-footer">
                                        <div className="total-display">Total: ₹{totalAmount}</div>
                                        <button
                                            className="btn-primary"
                                            disabled={!selectedService}
                                            onClick={() => setStep(2)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="payment-selection">
                                    <p className="summary-text">Pay <strong>₹{totalAmount}</strong> for {selectedService?.name}</p>

                                    <div className="payment-options">
                                        <div
                                            className={`payment-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('gpay')}
                                        >
                                            <Smartphone size={24} /> <span>GPay / UPI</span>
                                        </div>
                                        <div
                                            className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('card')}
                                        >
                                            <CreditCard size={24} /> <span>Credit/Debit Card</span>
                                        </div>
                                        <div
                                            className={`payment-option ${paymentMethod === 'scan' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('scan')}
                                        >
                                            <ScanLine size={24} /> <span>Scan QR</span>
                                        </div>
                                    </div>

                                    {paymentMethod === 'scan' && (
                                        <div className="qr-placeholder">
                                            <div className="qr-box"></div>
                                            <p>Scan to Pay</p>
                                        </div>
                                    )}

                                    <div className="modal-footer">
                                        <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                                        <button
                                            className="btn-primary"
                                            disabled={!paymentMethod}
                                            onClick={handleBook}
                                        >
                                            Pay & Confirm
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
