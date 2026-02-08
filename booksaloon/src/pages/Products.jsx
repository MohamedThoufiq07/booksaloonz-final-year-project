import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, ShoppingCart } from 'lucide-react';
import './Products.css';

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    // const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const EMPTY_IMAGE = "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80"; // Vibrant Product Fallback


    const categories = ['All', 'Shampoo', 'Conditioner', 'Styling', 'Serum', 'Oil', 'Mask'];

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    // const fetchProducts = async () => {
    //     try {
    //         const res = await fetch('http://localhost:5000/api/products');
    //         const data = await res.json();
    //         setProductsData(data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.error('Error fetching products:', err);
    //         setLoading(false);
    //     }
    // };

    // Temporary Dummy Data
    const productsData = [
        { id: 1, name: "Premium Argan Hair Oil", category: "Oil", price: 850, rating: 4.8, img: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=400&q=80" },
        { id: 2, name: "Keratin Infusion Shampoo", category: "Shampoo", price: 1200, rating: 4.7, img: "https://images.unsplash.com/photo-1519735811561-bbda558df9bf?auto=format&fit=crop&w=400&q=80" },
        { id: 3, name: "Ultra-Hold Styling Gel", category: "Styling", price: 450, rating: 4.5, img: "https://images.unsplash.com/photo-1594434293289-ad62bd306596?auto=format&fit=crop&w=400&q=80" },
        { id: 4, name: "Nourishing Hair Mask", category: "Mask", price: 950, rating: 4.9, img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80" },
        { id: 5, name: "Matte Finish Hair Wax", category: "Styling", price: 600, rating: 4.6, img: "https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?auto=format&fit=crop&w=400&q=80" },
        { id: 6, name: "Color Protect Conditioner", category: "Conditioner", price: 1100, rating: 4.7, img: "https://images.unsplash.com/photo-1624313501660-8f96420579a3?auto=format&fit=crop&w=400&q=80" },
        { id: 7, name: "Beard & Hair Serum", category: "Serum", price: 550, rating: 4.4, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
        { id: 8, name: "Professional Blow Dry Spray", category: "Styling", price: 750, rating: 4.8, img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80" },
        { id: 9, name: "Anti-Dandruff Therapy", category: "Shampoo", price: 890, rating: 4.6, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80" },
        { id: 10, name: "Biotin Boost Serum", category: "Serum", price: 1350, rating: 4.9, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80" },
        { id: 11, name: "Shea Butter Conditioner", category: "Conditioner", price: 980, rating: 4.7, img: "https://images.unsplash.com/photo-1624313501660-8f96420579a3?auto=format&fit=crop&w=400&q=80" },
        { id: 12, name: "Sea Salt Texturing Spray", category: "Styling", price: 650, rating: 4.5, img: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=400&q=80" }
    ];

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-container">
            <div className="products-header">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Premium Hair Products
                </motion.h1>

                <div className="search-wrapper">
                    <Search className="search-icon" size={24} color="#fbbf24" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for grooming products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'white' }}>Loading Products...</div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product._id || product.id}
                            className="product-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="product-img-container">
                                <img
                                    src={product.img || EMPTY_IMAGE}
                                    alt={product.name}
                                    className="product-card-img"
                                    onError={(e) => { e.target.src = EMPTY_IMAGE; }}
                                />
                            </div>
                            <div className="product-info">
                                <h3 className="product-card-name" style={{ color: 'white' }}>{product.name}</h3>
                                <div className="product-card-footer">
                                    <div className="product-price">₹{product.price}</div>
                                    <div className="product-rating">
                                        <Star size={14} fill="#fbbf24" color="#fbbf24" style={{ marginRight: '5px' }} /> {product.rating}
                                    </div>
                                </div>
                                <button className="add-to-cart-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '800', width: '100%', marginTop: '15px' }}>
                                    <ShoppingCart size={18} style={{ marginRight: '8px' }} /> Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
