import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { verifyOrder, formatPrice, formatDate } from '../utils/api';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-green-100 text-green-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await verifyOrder(email);
            setOrders(data.orders);
            setCustomer(data.customer);
            setIsLoggedIn(true);
            
            // Store email for future use
            localStorage.setItem('customerEmail', email);
        } catch (err) {
            setError('No orders found for this email address');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setEmail('');
        setOrders([]);
        setCustomer(null);
        setIsLoggedIn(false);
        setError('');
        localStorage.removeItem('customerEmail');
    };

    const getOrderTypeIcon = (type) => {
        return type === 'room' ? '🏨' : '🍽️';
    };

    const getRecentOrders = () => {
        return orders.slice(0, 3);
    };

    const getOrderStats = () => {
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const completedOrders = orders.filter(order => order.status === 'paid' || order.status === 'confirmed').length;

        return { totalOrders, totalSpent, pendingOrders, completedOrders };
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">🏨</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                        <p className="text-gray-600">Enter your email to view your orders and booking history</p>
                    </div>

                    <div className="space-y-4">
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
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Loading...' : 'View My Orders'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <div className="text-center">
                            <button
                                onClick={() => navigate('/')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stats = getOrderStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome, {customer?.firstName}!
                                </h1>
                                <p className="text-gray-600 text-sm">Manage your orders and bookings</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">💰</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-blue-600">{formatPrice(stats.totalSpent)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⏳</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                        <button
                            onClick={() => navigate('/orders')}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            View All →
                        </button>
                    </div>

                    {getRecentOrders().length > 0 ? (
                        <div className="space-y-4">
                            {getRecentOrders().map((order) => (
                                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{getOrderTypeIcon(order.type)}</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Order #{order.orderCode}
                                                </h3>
                                                <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                            <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(order.totalAmount)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span className="capitalize">{order.type} Order • {order.items.length} item(s)</span>
                                        <span>Payment: {order.paymentStatus}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                            <p className="text-gray-500 mb-4">You haven't placed any orders yet. Start by booking a room or ordering food!</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/rooms')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Book a Room
                                </button>
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Order Food
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl mb-4">🏨</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Book a Room</h3>
                        <p className="text-gray-600 text-sm mb-4">Reserve your perfect stay with us</p>
                        <button
                            onClick={() => navigate('/rooms')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        >
                            View Rooms
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl mb-4">🍽️</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Food</h3>
                        <p className="text-gray-600 text-sm mb-4">Delicious meals delivered to you</p>
                        <button
                            onClick={() => navigate('/menu')}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        >
                            View Menu
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl mb-4">📞</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                        <p className="text-gray-600 text-sm mb-4">Contact our customer support</p>
                        <a
                            href="tel:+234-xxx-xxx-xxxx"
                            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        >
                            Call Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;