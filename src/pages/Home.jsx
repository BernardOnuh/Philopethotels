import Button from '../components/Button';
import { Link } from 'react-router';
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function Home({ scrollToBottom }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [width, setWidth] = useState(() => 
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    const [isScrolled, setIsScrolled] = useState(false);
    
    const isMobile = useMemo(() => width < 768, [width]);
    
    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleBookClick = useCallback(() => {
        scrollToBottom?.();
        closeMenu();
    }, [scrollToBottom, closeMenu]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('nav')) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobile && menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, menuOpen]);

    const navItems = [
        { to: '/rooms', text: 'Rooms', ariaLabel: 'View our luxury rooms', icon: '🏨' },
        { to: '/menu', text: 'Menu', ariaLabel: 'Browse restaurant menu', icon: '🍽️' },
        { to: '/dashboard', text: 'Dashboard', ariaLabel: 'Access customer dashboard', icon: '📊' },
        { to: '/orders', text: 'Orders', ariaLabel: 'Track your orders', icon: '📋' },
        { 
            onClick: handleBookClick, 
            text: 'Book', 
            ariaLabel: 'Book your stay',
            icon: '📞',
            isButton: true 
        }
    ];

    return (
        <div className="relative">
            <section
                className="relative w-full flex flex-col items-center min-h-screen text-gray-400 overflow-hidden"
                role="banner"
                aria-label="Hotel homepage hero section"
            >
                {/* Background Image with Lazy Loading */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                    style={{
                        backgroundImage: `url('/images/reception2.jpg')`,
                        willChange: 'transform'
                    }}
                    aria-hidden="true"
                />
                
                {/* Enhanced Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

                {/* Enhanced Navigation */}
                <nav 
                    className={`w-full py-4 px-4 md:px-8 relative z-20 transition-all duration-500 ${
                        isScrolled 
                            ? 'bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
                            : 'bg-gradient-to-r from-transparent via-black/10 to-transparent backdrop-blur-sm border-b border-white/10'
                    }`}
                    role="navigation"
                    aria-label="Main navigation"
                >
                    {/* Decorative top border */}
                    <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
                        isScrolled 
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-100' 
                            : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50'
                    }`}></div>

                    <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-xl p-2 -m-2 hover:bg-white/5 transition-all duration-300"
                            aria-label="Philopethotels homepage"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-yellow-500/30 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></div>
                                <img 
                                    src="/logo.png" 
                                    alt="Philopethotels logo" 
                                    width={isMobile ? 35 : 45} 
                                    height={isMobile ? 35 : 45}
                                    className="relative z-10 transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-yellow-300 group-hover:to-amber-200 transition-all duration-300`}>
                                    Philopethotels
                                </h1>
                                {!isMobile && (
                                    <span className="text-xs text-amber-300/80 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                                        Luxury Experience
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 shadow-lg">
                                {navItems.map((item, index) => (
                                    item.isButton ? (
                                        <button
                                            key={index}
                                            onClick={item.onClick}
                                            className="relative px-6 py-2 text-white hover:text-amber-200 transition-all duration-300 focus:outline-none rounded-full group overflow-hidden"
                                            aria-label={item.ariaLabel}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                                            <span className="relative z-10 font-medium">{item.text}</span>
                                            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
                                        </button>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={item.to}
                                            className="relative px-6 py-2 text-white hover:text-amber-200 transition-all duration-300 focus:outline-none rounded-full group overflow-hidden"
                                            aria-label={item.ariaLabel}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                                            <span className="relative z-10 font-medium">{item.text}</span>
                                            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}

                        {/* Simple Mobile Menu Button */}
                        {isMobile && (
                            <button
                                onClick={toggleMenu}
                                className={`relative z-30 p-3 rounded-xl backdrop-blur-lg transition-all duration-300 focus:outline-none ${
                                    menuOpen 
                                        ? 'bg-amber-500 text-black scale-105' 
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={menuOpen}
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${
                                        menuOpen ? 'rotate-45 translate-y-1' : ''
                                    }`} />
                                    <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 mt-1 ${
                                        menuOpen ? 'opacity-0' : ''
                                    }`} />
                                    <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 mt-1 ${
                                        menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                    }`} />
                                </div>
                            </button>
                        )}
                    </div>

                    {/* Clean Mobile Menu */}
                    {isMobile && (
                        <div
                            className={`absolute top-full left-0 right-0 transition-all duration-300 ${
                                menuOpen 
                                    ? 'opacity-100 visible translate-y-0' 
                                    : 'opacity-0 invisible -translate-y-4'
                            }`}
                        >
                            <div className="bg-black/95 backdrop-blur-xl border-t border-amber-400/20 shadow-2xl">
                                <div className="px-4 py-6">
                                    <div className="space-y-2">
                                        {navItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`transform transition-all duration-300 ${
                                                    menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                                }`}
                                                style={{ transitionDelay: `${index * 50}ms` }}
                                            >
                                                {item.isButton ? (
                                                    <button
                                                        onClick={item.onClick}
                                                        className="w-full flex items-center gap-4 p-4 text-white hover:bg-amber-500/20 rounded-xl transition-all duration-200 text-left"
                                                    >
                                                        <span className="text-2xl">{item.icon}</span>
                                                        <span className="text-lg font-medium">{item.text}</span>
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to={item.to}
                                                        onClick={closeMenu}
                                                        className="flex items-center gap-4 p-4 text-white hover:bg-amber-500/20 rounded-xl transition-all duration-200"
                                                    >
                                                        <span className="text-2xl">{item.icon}</span>
                                                        <span className="text-lg font-medium">{item.text}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Mobile Menu Footer */}
                                <div className="px-4 pb-6 pt-2 border-t border-white/10">
                                    <div className="text-center">
                                        <span className="text-sm text-amber-300/60 font-medium">
                                            ✨ Luxury Experience Awaits
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
                
                {/* Hero Content */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
                    {/* Decorative Star */}
                    <div className="mb-8 animate-pulse">
                        <img 
                            src="/images/star.png" 
                            alt="Luxury star decoration" 
                            className="h-8 w-auto opacity-90"
                            loading="lazy"
                        />
                    </div>
                    
                    {/* Main Heading - Mobile Responsive */}
                    <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl lg:text-7xl'} font-bold text-white mb-8 leading-tight`}>
                        <span className="block mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                            ENJOY A
                        </span>
                        <span className="block bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                            LUXURY
                        </span>
                        <span className="block mt-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                            EXPERIENCE
                        </span>
                    </h2>

                    {/* Subtitle - Mobile Responsive */}
                    <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-300 mb-12 max-w-2xl leading-relaxed px-4`}>
                        Immerse yourself in unparalleled comfort and sophistication at our world-class hotel
                    </p>
                    
                    {/* CTA Button - Mobile Responsive */}
                    <Link 
                        to="/rooms"
                        className={`group relative overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white font-semibold ${isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4'} rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50 shadow-2xl`}
                        aria-label="Explore our luxury rooms"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Check Rooms
                            <svg 
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                </div>

                {/* Scroll Indicator */}
                {!isMobile && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="animate-bounce">
                            <svg 
                                className="w-6 h-6 text-white/70" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                )}
            </section>

            {/* Mobile Menu Overlay */}
            {isMobile && menuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}