import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Scissors } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/BookingModal';
import './Salons.css';

const Salons = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [salonsData, setSalonsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const EMPTY_IMAGE = "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80"; // Vibrant Salon Interior


    const location = useLocation();
    const { isLoggedIn, user } = useAuth();

    // Check for location query param (e.g., ?location=Tirunelveli)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const locationParam = params.get('location');
        if (locationParam) {
            setSearchTerm(locationParam);
        }
    }, [location]);

    useEffect(() => {
        fetchSalons();
    }, []);

    const fetchSalons = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:5000/api/salons');
            const data = await res.json();
            if (data.success) {
                // Filter out generic test data and standardize location
                const professionalData = data.data
                    .filter(s =>
                        !s.name.toLowerCase().includes('great salon') &&
                        !s.name.toLowerCase().includes('test') &&
                        s.name.toLowerCase() !== 'salon'
                    )
                    .map(s => ({
                        ...s,
                        address: 'Tirunelveli, Tamil Nadu, India'
                    }));
                setSalonsData(professionalData);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching salons:', err);
            setLoading(false);
        }
    };

    // Combined Data (12 Unique & Colorful Salons)
    const dummyData = [
        { id: 'd1', name: "Sapphire Styling Studio", address: "Tirunelveli, Tamil Nadu, India", rating: 4.8, startingPrice: 500, img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" },
        { id: 'd2', name: "Velvet Rose Spa", address: "Tirunelveli, Tamil Nadu, India", rating: 4.7, startingPrice: 450, img: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80" },
        { id: 'd3', name: "Emerald Glow Lounge", address: "Tirunelveli, Tamil Nadu, India", rating: 4.9, startingPrice: 1200, img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" },
        { id: 'd4', name: "Urban Crimson Cuts", address: "Tirunelveli, Tamil Nadu, India", rating: 4.5, startingPrice: 350, img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80" },
        { id: 'd5', name: "Golden Scissors Hub", address: "Tirunelveli, Tamil Nadu, India", rating: 4.6, startingPrice: 800, img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80" },
        { id: 'd6', name: "Cerulean Charm Parlour", address: "Tirunelveli, Tamil Nadu, India", rating: 4.8, startingPrice: 950, img: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=800&q=80" },
        { id: 'd7', name: "Vibrant Vista Salon", address: "Tirunelveli, Tamil Nadu, India", rating: 4.9, startingPrice: 1500, img: "https://images.unsplash.com/photo-1519735391946-c39031caeaf8?auto=format&fit=crop&w=800&q=80" },
        { id: 'd8', name: "Lavender Luxe Spa", address: "Tirunelveli, Tamil Nadu, India", rating: 4.7, startingPrice: 600, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
        { id: 'd9', name: "Ruby Radiance Studio", address: "Tirunelveli, Tamil Nadu, India", rating: 4.6, startingPrice: 550, img: "https://images.unsplash.com/photo-1620331311520-246422ff83cb?auto=format&fit=crop&w=800&q=80" },
        { id: 'd10', name: "Azure Aura Beauty", address: "Tirunelveli, Tamil Nadu, India", rating: 4.8, startingPrice: 1100, img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80" },
        { id: 'd11', name: "Tropical Teak Spa", address: "Tirunelveli, Tamil Nadu, India", rating: 4.9, startingPrice: 1300, img: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80" },
        { id: 'd12', name: "Magenta Mane Hub", address: "Tirunelveli, Tamil Nadu, India", rating: 4.7, startingPrice: 750, img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80" },
    ];

    const allSalons = [...salonsData, ...dummyData];

    // Search Logic
    const isLocationSpecificSearch = searchTerm.length > 2;
    const isTirunelveliSearch = searchTerm.toLowerCase().includes('tirunelveli') ||
        searchTerm.toLowerCase().includes('tamilnadu') ||
        searchTerm.toLowerCase().includes('india');

    const filteredSalons = allSalons.filter(salon => {
        const matchesName = salon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAddress = salon.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesName || matchesAddress;
    });

    const showNotAvailable = isLocationSpecificSearch && !isTirunelveliSearch && filteredSalons.length === 0;
    ;
    const handleBookClick = (salon) => {
        if (!isLoggedIn) {
            alert("Please Login or Sign Up to book an appointment!");
            window.location.href = '/signup';
            return;
        }
        setSelectedSalon(salon);
        setIsModalOpen(true);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="salons-container">
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                salon={selectedSalon}
                user={user}
            />

            <div className="salons-header">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Discover Premium Salons
                </motion.h1>

                <div className="search-wrapper">
                    <Search className="search-icon" size={24} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'white' }}>Loading Salons...</div>
            ) : (
                <motion.div
                    className="salon-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {showNotAvailable ? (
                        <div className="no-availability-msg" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'white' }}>
                            <MapPin size={48} color="#ef4444" style={{ marginBottom: '15px' }} />
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Sorry the location not available</h2>
                            <p style={{ opacity: 0.7 }}>Currently, BookSaloonz is only available in Tirunelveli, Tamil Nadu, India.</p>
                        </div>
                    ) : (
                        filteredSalons.map((salon) => (
                            <motion.div
                                key={salon._id || salon.id}
                                className="salon-card"
                                variants={cardVariants}
                            >
                                <div className="salon-img-container">
                                    <img
                                        src={salon.img || EMPTY_IMAGE}
                                        alt={salon.name}
                                        className="salon-card-img"
                                        onError={(e) => { e.target.src = EMPTY_IMAGE; }}
                                    />
                                </div>
                                <div className="salon-info">
                                    <h3 className="salon-card-name">{salon.name}</h3>
                                    <p className="salon-card-address">
                                        <MapPin size={16} color="#fbbf24" /> {salon.address}
                                    </p>
                                    <div className="salon-card-footer">
                                        <div className="salon-price">
                                            <span className="price-label">Starts from</span>
                                            <span className="price-value">₹{salon.startingPrice}</span>
                                        </div>
                                        <div className="salon-rating">
                                            <Star size={14} fill="#fbbf24" /> {salon.rating}
                                        </div>
                                        <button
                                            className="book-btn-mini"
                                            onClick={() => handleBookClick(salon)}
                                        >
                                            BOOK
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Salons;
