import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router";

export default function Book() {
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const contactMethods = [
        {
            icon: "📞",
            title: "Call Us",
            subtitle: "Speak directly with our team",
            secondary: "+2347037161332",
            action: "tel:+2347037161332",
            gradient: "from-green-500 to-emerald-600"
        },
        {
            icon: "✉️",
            title: "Email Us",
            subtitle: "Get detailed information",
            primary: "infophilopethotels@gmail.com",
            action: "mailto:infophilopethotels@gmail.com",
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            icon: "📍",
            title: "Visit Us",
            subtitle: "Find us at our location",
            primary: "Aposogbe Iviocha Quarter",
            secondary: "Furgar, Edo State",
            action: "https://maps.google.com",
            gradient: "from-purple-500 to-violet-600"
        }
    ];

    const socialMedia = [
        {
            name: "Facebook",
            icon: "/images/facebook.svg",
            url: "https://web.facebook.com/philopethotelsfugar",
            color: "from-blue-600 to-blue-700",
            hoverColor: "hover:from-blue-500 hover:to-blue-600"
        },
        {
            name: "Instagram", 
            icon: "/images/instagram.svg",
            url: "https://www.instagram.com/philopetfugar",
            color: "from-pink-500 to-rose-600",
            hoverColor: "hover:from-pink-400 hover:to-rose-500"
        },
      
    ];

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.log('Copy failed');
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 py-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/40 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute top-20 right-1/4 w-20 h-20 bg-orange-300/30 rounded-full blur-xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="inline-block mb-6">
                        <span className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            🏨 Book Your Stay
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                        Book a Room Now!
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Reach out to us to book your perfect getaway and experience luxury like never before
                    </p>

                    {/* Main CTA Button */}
                    <div className="mb-12">
                    <Link 
                                to="/rooms"
                                className="group relative overflow-hidden bg-gradient-to-r hover:to-purple-700  duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-2xl"
                                aria-label="Explore our luxury rooms"
                            >
                        <button className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25 focus:outline-none focus:ring-4 focus:ring-orange-500/50">
                            <span className="relative z-10 flex items-center gap-3">
                                Book Now
                                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 group"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                {method.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                            <p className="text-gray-600 mb-4">{method.subtitle}</p>
                            
                            <div className="space-y-2">
                                <button
                                    onClick={() => method.action.startsWith('tel:') || method.action.startsWith('mailto:') ? 
                                        window.location.href = method.action : 
                                        window.open(method.action, '_blank')
                                    }
                                    className="block w-full text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                                >
                                    {method.primary}
                                </button>
                                {method.secondary && (
                                    <p className="text-sm text-gray-600">{method.secondary}</p>
                                )}
                            </div>

                            {method.title === "Call Us" && (
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={() => copyToClipboard(method.primary)}
                                        className="text-xs text-orange-600 hover:text-orange-700 transition-colors duration-200 flex items-center gap-1 mx-auto"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy number
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Copy Success Toast */}
                {copySuccess && (
                    <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Number copied to clipboard!
                        </div>
                    </div>
                )}

                {/* Social Media Section */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2>
                    <p className="text-gray-600 mb-8">Stay connected for the latest updates and special offers</p>
                    
                    <div className="flex justify-center gap-6">
                        {socialMedia.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative w-16 h-16 bg-gradient-to-br ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                                onMouseEnter={() => setHoveredSocial(index)}
                                onMouseLeave={() => setHoveredSocial(null)}
                                aria-label={`Visit our ${social.name} page`}
                            >
                                <img 
                                    src={social.icon} 
                                    alt={social.name}
                                    className="w-8 h-8 filter brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                                />
                                
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md scale-125`}></div>
                                
                                {/* Tooltip */}
                                {hoveredSocial === index && (
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                                        {social.name}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Available 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Trusted & Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">5-Star Rated</span>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}