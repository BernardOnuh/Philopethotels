import { useState, useEffect, useRef } from 'react';
import Home from './Home';
import AboutUs from './AboutUs';
import Book from './Book';

export default function Page() {
    const [showWarning, setShowWarning] = useState(false);
    const [hasVisited, setHasVisited] = useState(false);
    const modalRef = useRef(null);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Check if user has seen the warning before
    useEffect(() => {
        const hasSeenWarning = localStorage.getItem('philopethotels_warning_seen');
        if (!hasSeenWarning) {
            // Small delay to let the page load first
            setTimeout(() => {
                setShowWarning(true);
            }, 1000);
        } else {
            setHasVisited(true);
        }
    }, []);

    // Handle click outside modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleAcceptWarning();
            }
        };

        if (showWarning) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showWarning]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showWarning) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showWarning]);

    const handleAcceptWarning = () => {
        setShowWarning(false);
        setHasVisited(true);
        localStorage.setItem('philopethotels_warning_seen', 'true');
    };

    const handleShowAgain = () => {
        localStorage.removeItem('philopethotels_warning_seen');
        setShowWarning(true);
    };

    return (
        <div className="relative">
            <Home scrollToBottom={scrollToBottom} />
            <AboutUs />
            <Book />

            {/* Security Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
                    <div 
                        ref={modalRef}
                        className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl overflow-hidden animate-scale-in my-auto"
                    >
                        {/* Header with gradient - Mobile optimized */}
                        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-4 md:p-6 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10 flex items-center gap-3 md:gap-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-lg md:text-2xl font-bold mb-1">🛡️ Security Notice</h2>
                                    <p className="text-orange-100 text-sm md:text-base">Important information for your safety</p>
                                </div>
                                {/* Close button */}
                                <button
                                    onClick={handleAcceptWarning}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content - Mobile optimized with scrolling */}
                        <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></span>
                                    Payment Security Warning
                                </h3>
                                
                                <div className="bg-red-50 border-l-4 border-red-500 p-3 md:p-4 rounded-r-lg mb-6">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div className="min-w-0">
                                            <p className="text-red-800 font-semibold mb-2 text-sm md:text-base">
                                                <strong>NEVER pay any individual person directly!</strong>
                                            </p>
                                            <p className="text-red-700 text-xs md:text-sm">
                                                All legitimate payments must be made exclusively through our official website or verified booking platforms.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-800 text-sm md:text-base">Secure Online Payments Only</p>
                                            <p className="text-xs md:text-sm text-gray-600">Use our official website or authorized booking platforms</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-800 text-sm md:text-base">Official Communication Channels</p>
                                            <p className="text-xs md:text-sm text-gray-600">Contact us through verified phone numbers or email addresses listed on this website</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-800 text-sm md:text-base">Always Request Official Receipts</p>
                                            <p className="text-xs md:text-sm text-gray-600">Legitimate bookings come with proper documentation and confirmation emails</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6">
                                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2 text-sm md:text-base">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Verify Our Official Contact Details:
                                </h4>
                                <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 text-xs md:text-sm">
                                    <div>
                                        <p className="font-medium text-blue-800">📞 Phone Numbers:</p>
                                        <p className="text-blue-700 break-all">+234 7037161332</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-blue-800">✉️ Official Email:</p>
                                        <p className="text-blue-700 break-all">infophilopethotels@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="sticky bottom-0 bg-white pt-4 -mx-4 md:-mx-8 px-4 md:px-8 pb-0">
                                <button
                                    onClick={handleAcceptWarning}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500/50 text-sm md:text-base"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        I Understand - Continue to Website
                                    </span>
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-3">
                                    This notice helps protect you from potential fraud. We care about your security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Debug: Show Warning Again Button (for testing - remove in production) */}
            {hasVisited && process.env.NODE_ENV === 'development' && (
                <button
                    onClick={handleShowAgain}
                    className="fixed bottom-4 left-4 bg-gray-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-700 transition-colors z-40"
                >
                    Show Warning Again (Dev)
                </button>
            )}

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}