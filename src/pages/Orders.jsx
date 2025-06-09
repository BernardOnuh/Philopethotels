import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { trackOrderByCode, verifyOrder, formatPrice, formatDate } from '../utils/api';

const Orders = () => {
    const navigate = useNavigate();
    const [orderCode, setOrderCode] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [trackingMode, setTrackingMode] = useState('quick');

    // Check for last order on component mount
    useEffect(() => {
        const lastOrderCode = localStorage.getItem('lastOrderCode');
        const lastOrderEmail = localStorage.getItem('lastOrderEmail');
        
        if (lastOrderCode) {
            setOrderCode(lastOrderCode);
            if (lastOrderEmail) {
                setEmail(lastOrderEmail);
                setTrackingMode('verify');
            }
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'paid': return 'bg-green-100 text-green-800 border-green-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'success': return 'text-green-600';
            case 'failed': return 'text-red-600';
            case 'pending': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    const handleQuickTrack = async (e) => {
        e.preventDefault();
        if (!orderCode.trim()) {
            setError('Please enter your order code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await trackOrderByCode(orderCode); // Updated function name
            setOrder(data.order);
        } catch (err) {
            setError(err.message || 'Order not found');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOwnership = async (e) => {
        e.preventDefault();
        if (!orderCode.trim() || !email.trim()) {
            setError('Please enter both order code and email');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await verifyOrder(email, orderCode); // Updated function name and parameter order
            setOrder(data.order);
        } catch (err) {
            setError(err.message || 'Verification failed');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setOrderCode('');
        setEmail('');
        setOrder(null);
        setError('');
        // Clear stored order info
        localStorage.removeItem('lastOrderCode');
        localStorage.removeItem('lastOrderEmail');
    };

    const handleTrackAction = () => {
        if (trackingMode === 'quick') {
            handleQuickTrack({ preventDefault: () => {} });
        } else {
            handleVerifyOwnership({ preventDefault: () => {} });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
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
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Track Your Order</h1>
                            <p className="text-gray-600 text-sm">Enter your order code to check status</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Tracking Mode Toggle */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                            onClick={() => {
                                setTrackingMode('quick');
                                resetForm();
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                trackingMode === 'quick'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Quick Track
                        </button>
                        <button
                            onClick={() => {
                                setTrackingMode('verify');
                                resetForm();
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                trackingMode === 'verify'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Verify & View Full Details
                        </button>
                    </div>

                    {/* Quick Track Form */}
                    {trackingMode === 'quick' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., PH123456ABCD"
                                    value={orderCode}
                                    onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrackAction()}
                                />
                            </div>
                            <button
                                onClick={handleTrackAction}
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Tracking...' : 'Track Order'}
                            </button>
                        </div>
                    )}

                    {/* Verify Ownership Form */}
                    {trackingMode === 'verify' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., PH123456ABCD"
                                    value={orderCode}
                                    onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrackAction()}
                                />
                            </div>
                            <button
                                onClick={handleTrackAction}
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Verify & Track'}
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-700">{error}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Details */}
                {order && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Order Details</h2>
                                    <p className="text-blue-100">Order Code: <span className="font-semibold">{order.orderCode}</span></p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Customer Info */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="font-medium text-gray-600">Name:</span> {order.customer.firstName} {order.customer.lastName}</p>
                                        <p><span className="font-medium text-gray-600">Email:</span> {order.customer.email}</p>
                                        <p><span className="font-medium text-gray-600">Order Date:</span> {formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="font-medium text-gray-600">Total Amount:</span> <span className="text-lg font-bold text-blue-600">{formatPrice(order.totalAmount)}</span></p>
                                        <p><span className="font-medium text-gray-600">Payment Status:</span> 
                                            <span className={`ml-2 font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                            </span>
                                        </p>
                                        <p><span className="font-medium text-gray-600">Order Type:</span> <span className="capitalize">{order.type}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <span>Quantity: {item.quantity}</span>
                                                {item.checkIn && (
                                                    <>
                                                        <span>Check-in: {formatDate(item.checkIn)}</span>
                                                        <span>Check-out: {formatDate(item.checkOut)}</span>
                                                    </>
                                                )}
                                                {item.category && (
                                                    <span>Category: {item.category}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
                                >
                                    Track Another Order
                                </button>
                                
                                {order.paymentStatus === 'pending' && (
                                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                                        Complete Payment
                                    </button>
                                )}
                                
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Cards */}
                {!order && (
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="text-3xl mb-4">🔍</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Track</h3>
                                <p className="text-gray-600 text-sm">
                                    Get basic order status information using just your order code. 
                                    Perfect for quick status checks.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="text-3xl mb-4">🔐</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify & View Full Details</h3>
                                <p className="text-gray-600 text-sm">
                                    Access complete order information including payment details 
                                    by providing both your order code and email.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;