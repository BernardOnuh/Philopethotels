import Image from '../components/Image';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function AboutUs() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const hotelImages = [
        { src: '/images/hotel1.jpg', alt: 'Elegant hotel lobby' },
        { src: '/images/hotel2.jpg', alt: 'Luxury suite' },
        { src: '/images/hotel2.avif', alt: 'Fine dining area' },
        { src: '/images/hotel4.avif', alt: 'Spa and wellness' },
        { src: '/images/hotel5.avif', alt: 'Conference facilities' },
        { src: '/images/environ1.jpg', alt: 'Beautiful surroundings' }
    ];

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative flex flex-col items-center text-black py-20 px-6">
                {/* Enhanced Title Section */}
                <div className="text-center mb-16 relative">
                    {/* Decorative badge */}
                    <div className="inline-block mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            ✨ About Us
                        </span>
                    </div>

                    {/* Main heading with gradient */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                        Welcome to
                        <br />
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            Philopethotels
                        </span>
                    </h1>

                    {/* Enhanced description */}
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
                            From luxurious suites to personalized experiences, Philopethotels is designed to make
                            every guest feel at home.
                        </p>
                        <p className="text-lg text-gray-600">
                            Discover the perfect blend of nature, elegance, and warmth.
                        </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                    </div>
                </div>

                {/* Enhanced Image Gallery */}
                <div className="w-full max-w-6xl">
                    {/* Featured Image with Auto-rotation */}
                    <div className="mb-8">
                        <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
                            <Image
                                src={hotelImages[currentImageIndex].src}
                                alt={hotelImages[currentImageIndex].alt}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            
                            {/* Image counter */}
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-gray-800">
                                {currentImageIndex + 1} / {hotelImages.length}
                            </div>

                            {/* Navigation dots */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                {hotelImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentImageIndex 
                                                ? 'bg-white scale-125 shadow-lg' 
                                                : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Grid Gallery */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {hotelImages.map((image, index) => (
                            <div
                                key={index}
                                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-500"
                                onClick={() => setCurrentImageIndex(index)}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                                />
                                
                                {/* Hover overlay with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Active indicator */}
                                {index === currentImageIndex && (
                                    <div className="absolute top-3 right-3 w-3 h-3 bg-amber-400 rounded-full shadow-lg animate-pulse"></div>
                                )}

                                {/* Border glow effect */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Call-to-Action */}
                <div className="mt-20 text-center">
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Ready for an Unforgettable Stay?
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Experience luxury, comfort, and exceptional service at Philopethotels
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/rooms"
                                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-2xl"
                                aria-label="Explore our luxury rooms"
                            >
                                Book Your Room
                            </Link>
                            <button className="border-2 border-gray-300 hover:border-gray-400 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm">
                                Contact Us
                            </button>
                        </div>

                        {/* Decorative stars */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Rated 5/5 by our guests</p>
                    </div>
                </div>
            </div>
        </div>
    );
}