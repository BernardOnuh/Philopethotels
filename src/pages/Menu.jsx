import { useNavigate } from "react-router";
import { useState, useMemo, useCallback, useEffect } from "react";
import FoodOrderModal from '../components/FoodOrderModal'; // Add this import

export default function Menu() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [toast, setToast] = useState(null);
    const [cartBounce, setCartBounce] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false); // Add this state

    const menuData = {
        local: {
            title: "Local Dishes",
            description: "Authentic Nigerian cuisine crafted with traditional recipes",
            icon: "🇳🇬",
            items: [
                {
                    id: 'local-1',
                    name: 'Pounded Yam and Egusi',
                    price: 6000,
                    image: '/images/local1.jpg',
                    description: 'Traditional pounded yam served with rich egusi soup made with melon seeds and vegetables',
                    category: 'local',
                    spiceLevel: 2,
                    cookingTime: '25-30 mins',
                    ingredients: ['Yam', 'Egusi leaves', 'Palm oil', 'Beef', 'Fish'],
                    allergens: ['Fish'],
                    popular: true
                },
                {
                    id: 'local-2',
                    name: 'Amala and Ewedu',
                    price: 2500,
                    image: '/images/local2.jpg',
                    description: 'Smooth yam flour swallow paired with nutritious jute leaf soup',
                    category: 'local',
                    spiceLevel: 1,
                    cookingTime: '20-25 mins',
                    ingredients: ['Yam flour', 'Ewedu leaves', 'Locust beans'],
                    allergens: [],
                    vegetarian: true
                },
                {
                    id: 'local-3',
                    name: 'Semovita and Egusi',
                    price: 4000,
                    image: '/images/local3.jpg',
                    description: 'Light semolina meal with our signature egusi soup',
                    category: 'local',
                    spiceLevel: 2,
                    cookingTime: '20-25 mins',
                    ingredients: ['Semolina', 'Egusi', 'Assorted meat'],
                    allergens: ['Gluten']
                },
                {
                    id: 'local-4',
                    name: 'Fufu and Vegetable',
                    price: 3500,
                    image: '/images/local4.jpg',
                    description: 'Cassava-based fufu served with mixed vegetable soup',
                    category: 'local',
                    spiceLevel: 1,
                    cookingTime: '30-35 mins',
                    ingredients: ['Cassava', 'Mixed vegetables', 'Palm oil'],
                    allergens: [],
                    vegetarian: true
                },
                {
                    id: 'local-5',
                    name: 'Eba and Oha Soup',
                    price: 4000,
                    image: '/images/local5.jpg',
                    description: 'Garri-based eba with traditional oha leaf soup',
                    category: 'local',
                    spiceLevel: 2,
                    cookingTime: '25-30 mins',
                    ingredients: ['Garri', 'Oha leaves', 'Stockfish'],
                    allergens: ['Fish']
                },
                {
                    id: 'local-6',
                    name: 'Tuwo Shinkafa and Soup',
                    price: 5000,
                    image: '/images/local6.jpg',
                    description: 'Northern Nigerian rice meal with flavorful soup',
                    category: 'local',
                    spiceLevel: 3,
                    cookingTime: '35-40 mins',
                    ingredients: ['Rice flour', 'Traditional spices'],
                    allergens: []
                },
                {
                    id: 'local-7',
                    name: 'Ofada Rice and Moi Moi',
                    price: 5500,
                    image: '/images/local7.jpg',
                    description: 'Local brown rice served with steamed bean pudding',
                    category: 'local',
                    spiceLevel: 2,
                    cookingTime: '30-35 mins',
                    ingredients: ['Ofada rice', 'Black-eyed beans', 'Palm oil'],
                    allergens: [],
                    popular: true
                }
            ]
        },
        continental: {
            title: "Continental",
            description: "International cuisine with modern culinary techniques",
            icon: "🌍",
            items: [
                {
                    id: 'cont-1',
                    name: 'Fried Rice',
                    price: 10500,
                    image: '/images/cont1.avif',
                    description: 'Aromatic fried rice with mixed vegetables and your choice of protein',
                    category: 'continental',
                    spiceLevel: 1,
                    cookingTime: '15-20 mins',
                    ingredients: ['Basmati rice', 'Mixed vegetables', 'Soy sauce'],
                    allergens: ['Soy', 'Gluten']
                },
                {
                    id: 'cont-2',
                    name: 'Jollof Rice',
                    price: 12500,
                    image: '/images/jellof.webp',
                    description: 'West African favorite - perfectly seasoned rice in tomato base',
                    category: 'continental',
                    spiceLevel: 2,
                    cookingTime: '25-30 mins',
                    ingredients: ['Long grain rice', 'Tomatoes', 'Bell peppers'],
                    allergens: [],
                    popular: true,
                    chefSpecial: true
                },
                {
                    id: 'cont-3',
                    name: 'Coconut Rice',
                    price: 10500,
                    image: '/images/cont2.webp',
                    description: 'Fragrant rice cooked in rich coconut milk with tropical flavors',
                    category: 'continental',
                    spiceLevel: 1,
                    cookingTime: '20-25 mins',
                    ingredients: ['Jasmine rice', 'Coconut milk', 'Curry leaves'],
                    allergens: ['Coconut']
                },
                {
                    id: 'cont-4',
                    name: 'Spaghetti',
                    price: 9500,
                    image: '/images/spagetthi.webp',
                    description: 'Al dente pasta with choice of marinara, carbonara, or bolognese sauce',
                    category: 'continental',
                    spiceLevel: 1,
                    cookingTime: '15-20 mins',
                    ingredients: ['Durum wheat pasta', 'Tomato sauce', 'Herbs'],
                    allergens: ['Gluten', 'Dairy']
                },
                {
                    id: 'cont-5',
                    name: 'Cod Fish',
                    price: 11500,
                    image: '/images/codfish.webp',
                    description: 'Fresh Atlantic cod, grilled to perfection with herbs and lemon',
                    category: 'continental',
                    spiceLevel: 1,
                    cookingTime: '20-25 mins',
                    ingredients: ['Atlantic cod', 'Herbs', 'Lemon'],
                    allergens: ['Fish'],
                    healthy: true
                },
                {
                    id: 'cont-6',
                    name: 'Strawberry Shake',
                    price: 13500,
                    image: '/images/cont2.avif',
                    description: 'Creamy milkshake made with fresh strawberries and premium ice cream',
                    category: 'continental',
                    spiceLevel: 0,
                    cookingTime: '5-10 mins',
                    ingredients: ['Fresh strawberries', 'Vanilla ice cream', 'Milk'],
                    allergens: ['Dairy'],
                    beverage: true
                },
                {
                    id: 'cont-7',
                    name: 'Pasta',
                    price: 10500,
                    image: '/images/pasta.webp',
                    description: 'House special pasta with creamy sauce and seasonal vegetables',
                    category: 'continental',
                    spiceLevel: 1,
                    cookingTime: '15-20 mins',
                    ingredients: ['Fresh pasta', 'Cream sauce', 'Parmesan'],
                    allergens: ['Gluten', 'Dairy']
                }
            ]
        }
    };

    const allItems = useMemo(() => {
        return [...menuData.local.items, ...menuData.continental.items];
    }, []);

    const filteredItems = useMemo(() => {
        let items = activeCategory === 'all' ? allItems : menuData[activeCategory]?.items || [];
        
        if (searchTerm) {
            items = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return items.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
    }, [activeCategory, searchTerm, sortBy, allItems]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };

    const addToCart = useCallback((item) => {
        setCart(prev => {
            const existing = prev.find(cartItem => cartItem.id === item.id);
            if (existing) {
                return prev.map(cartItem =>
                    cartItem.id === item.id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        
        // Show toast notification
        setToast({
            message: `${item.name} added to cart!`,
            type: 'success'
        });
        
        // Trigger cart bounce animation
        setCartBounce(true);
        setTimeout(() => setCartBounce(false), 600);
        
        // Auto-hide toast after 3 seconds
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Toast auto-hide effect
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const removeFromCart = useCallback((itemId) => {
        setCart(prev => prev.filter(item => item.id !== itemId));
    }, []);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    const getSpiceIndicator = (level) => {
        return '🌶️'.repeat(level) + '○'.repeat(3 - level);
    };

    // Updated handlePlaceOrder function
    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        setShowOrderModal(true);
        setShowCart(false);
    };

    const categories = [
        { id: 'all', name: 'All Items', icon: '🍽️' },
        { id: 'local', name: 'Local Dishes', icon: '🇳🇬' },
        { id: 'continental', name: 'Continental', icon: '🌍' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                aria-label="Go back to previous page"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Restaurant Menu</h1>
                                <p className="text-gray-600 text-sm">Delicious cuisine crafted with passion</p>
                            </div>
                        </div>
                        
                        {/* Header Buttons */}
                        <div className="flex items-center gap-4">
                            {/* Dashboard Button */}
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                My Dashboard
                            </button>
                            
                            {/* Track Order Button */}
                            <button
                                onClick={() => navigate('/orders')}
                                className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Track Order
                            </button>
                            
                            {/* Cart Button */}
                            <button
                                onClick={() => setShowCart(!showCart)}
                                className={`relative flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                                    cartBounce ? 'animate-bounce' : ''
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                Cart ({cart.length})
                                {cart.length > 0 && (
                                    <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                                        cartBounce ? 'scale-125' : 'scale-100'
                                    }`}>
                                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Menu</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for dishes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="name">Name</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mt-6">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        activeCategory === category.id
                                            ? 'bg-orange-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {item.popular && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            🔥 Popular
                                        </span>
                                    )}
                                    {item.chefSpecial && (
                                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            👨‍🍳 Chef's Special
                                        </span>
                                    )}
                                    {item.vegetarian && (
                                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            🌱 Vegetarian
                                        </span>
                                    )}
                                    {item.healthy && (
                                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            💪 Healthy
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                    <span className="text-lg font-bold text-gray-800">{formatPrice(item.price)}</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                                        {item.name}
                                    </h3>
                                    <div className="text-sm text-gray-500" title={`Spice level: ${item.spiceLevel}/3`}>
                                        {getSpiceIndicator(item.spiceLevel)}
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {item.cookingTime}
                                    </span>
                                    <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                                        {item.category}
                                    </span>
                                </div>
                                
                                {item.allergens.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-red-600">
                                            ⚠️ Contains: {item.allergens.join(', ')}
                                        </p>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => addToCart(item)}
                                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No dishes found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-16 bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
                            <p className="text-amber-700 text-sm">
                                Prices are subject to change based on availability and season. Please inform our staff of any allergies or dietary restrictions. Cooking times may vary during peak hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            {showCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Your Order</h2>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">🛒</div>
                                    <p className="text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{item.name}</h4>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-semibold text-orange-600">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-bold">Total:</span>
                                            <span className="text-xl font-bold text-orange-600">{formatPrice(getTotalPrice())}</span>
                                        </div>
                                        <button 
                                            onClick={handlePlaceOrder}
                                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors duration-200"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Food Order Modal */}
            <FoodOrderModal 
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                cart={cart}
                getTotalPrice={getTotalPrice}
                clearCart={clearCart}
            />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {toast.message}
                    </div>
                </div>
            )}
        </div>
    );
}