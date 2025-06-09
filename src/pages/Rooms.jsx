import { useNavigate } from 'react-router';
import Image from '../components/Image';
import { useState, useMemo } from 'react';
import BookingModal from '../components/BookingModal'

export default function Rooms() {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [sortBy, setSortBy] = useState('price-asc');
    const [filterBy, setFilterBy] = useState('all');
    const [showBookingModal, setShowBookingModal] = useState(false); // Add this state
    const [roomToBook, setRoomToBook] = useState(null); // Add this state

    const roomsData = [
        {
            id: 1,
            name: 'Super Deluxe',
            price: 15000,
            image: '/images/superdeluxe.jpg',
            description: 'Comfortable and stylish room with modern amenities',
            amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'TV'],
            capacity: '2 Adults',
            size: '25 sqm',
            category: 'standard'
        },
        {
            id: 2,
            name: 'Fun Deluxe',
            price: 20000,
            image: '/images/hotel5.jpg',
            description: 'Spacious room designed for relaxation and entertainment',
            amenities: ['Free WiFi', 'Mini Bar', 'Balcony', 'Premium TV', 'Room Service'],
            capacity: '2-3 Adults',
            size: '30 sqm',
            category: 'deluxe'
        },
        {
            id: 3,
            name: 'Executive',
            price: 25000,
            image: '/images/executive.jpg',
            description: 'Professional comfort with business-friendly amenities',
            amenities: ['Business Desk', 'Premium WiFi', 'Executive Lounge Access', 'Coffee Machine'],
            capacity: '2 Adults',
            size: '35 sqm',
            category: 'executive'
        },
        {
            id: 4,
            name: 'Governor',
            price: 30000,
            image: '/images/governor.jpg',
            description: 'Luxurious suite with premium furnishings and services',
            amenities: ['Separate Living Area', 'Premium Amenities', 'Concierge Service', 'Jacuzzi'],
            capacity: '2-4 Adults',
            size: '45 sqm',
            category: 'luxury'
        },
        {
            id: 5,
            name: 'Presidential',
            price: 40000,
            image: '/images/presidential-suite.jpg',
            description: 'Ultimate luxury with personalized service and exclusive amenities',
            amenities: ['Private Butler', 'Dining Area', 'Premium Bar', 'City Views', 'Spa Access'],
            capacity: '4-6 Adults',
            size: '65 sqm',
            category: 'presidential'
        },
        {
            id: 6,
            name: 'Continental',
            price: 50000,
            image: '/images/continental-suite.jpg',
            description: 'The pinnacle of luxury accommodation with world-class facilities',
            amenities: ['Multiple Bedrooms', 'Private Kitchen', 'Panoramic Views', 'Personal Chef', 'Limousine Service'],
            capacity: '6-8 Adults',
            size: '85 sqm',
            category: 'presidential'
        }
    ];

    const filteredAndSortedRooms = useMemo(() => {
        let filtered = roomsData;
        
        // Apply filter
        if (filterBy !== 'all') {
            filtered = roomsData.filter(room => room.category === filterBy);
        }
        
        // Apply sort
        return filtered.sort((a, b) => {
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
    }, [sortBy, filterBy]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };

    const openRoomModal = (room) => {
        setSelectedRoom(room);
        document.body.style.overflow = 'hidden';
    };

    const closeRoomModal = () => {
        setSelectedRoom(null);
        document.body.style.overflow = 'unset';
    };

    // Updated handleBookRoom function
    const handleBookRoom = (room) => {
        setRoomToBook(room);
        setShowBookingModal(true);
        closeRoomModal(); // Close the details modal
    };

    const handleCloseBookingModal = () => {
        setShowBookingModal(false);
        setRoomToBook(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Go back to previous page"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Our Rooms</h1>
                                <p className="text-gray-600 text-sm">Discover luxury and comfort in every detail</p>
                            </div>
                        </div>
                        
                      {/* Navigation Buttons */}
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
                                
                                {/* Quick Book Button */}
                                <a 
                                    href="tel:+234-xxx-xxx-xxxx"
                                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Quick Book
                                </a>
                            </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Filters and Sort */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                                <select
                                    value={filterBy}
                                    onChange={(e) => setFilterBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Rooms</option>
                                    <option value="standard">Standard</option>
                                    <option value="deluxe">Deluxe</option>
                                    <option value="executive">Executive</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="presidential">Presidential</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                            Showing {filteredAndSortedRooms.length} room{filteredAndSortedRooms.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedRooms.map((room, index) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                            onClick={() => openRoomModal(room)}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative overflow-hidden">
                                <Image 
                                    src={room.image} 
                                    alt={`${room.name} room`}
                                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                    <span className="text-sm font-semibold text-gray-800">{formatPrice(room.price)}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                        {room.name}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        {room.capacity}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        {room.size}
                                    </span>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                            {amenity}
                                        </span>
                                    ))}
                                    {room.amenities.length > 3 && (
                                        <span className="text-gray-500 text-xs py-1">
                                            +{room.amenities.length - 3} more
                                        </span>
                                    )}
                                </div>
                                
                                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
                        <p className="text-blue-100 mb-6">Contact our reservation team for personalized assistance and special offers</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a 
                                href="tel:+234-xxx-xxx-xxxx"
                                className="flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Call Now
                            </a>
                            
                            <a 
                                href="mailto:reservations@philopethotels.com"
                                className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Room Detail Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <Image 
                                src={selectedRoom.image} 
                                alt={`${selectedRoom.name} room`}
                                className="h-64 md:h-80 w-full object-cover"
                            />
                            <button
                                onClick={closeRoomModal}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedRoom.name}</h3>
                                    <p className="text-gray-600">{selectedRoom.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-blue-600">{formatPrice(selectedRoom.price)}</div>
                                    <div className="text-sm text-gray-500">per night</div>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Room Details</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Capacity:</span>
                                            <span>{selectedRoom.capacity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Size:</span>
                                            <span>{selectedRoom.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Category:</span>
                                            <span className="capitalize">{selectedRoom.category}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {selectedRoom.amenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => handleBookRoom(selectedRoom)}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Book Now
                                </button>
                                <button
                                    onClick={closeRoomModal}
                                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            <BookingModal 
                isOpen={showBookingModal}
                onClose={handleCloseBookingModal}
                room={roomToBook}
            />
        </div>
    );
}