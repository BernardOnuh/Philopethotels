import React, { useState } from 'react';
import { createOrder, initializePayment, formatPrice } from '../utils/api';

const BookingModal = ({ isOpen, onClose, room }) => {
    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orderCreated, setOrderCreated] = useState(null);

    const handleInputChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        });
    };

    const calculateNights = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getTotalAmount = () => {
        const nights = calculateNights();
        return nights * room.price;
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.phone) {
            alert('Please fill in all customer details');
            return;
        }
        
        if (!checkInDate || !checkOutDate) {
            alert('Please select check-in and check-out dates');
            return;
        }
        
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare order data
            const orderData = {
                customerData,
                items: [{
                    id: room.id.toString(),
                    name: room.name,
                    price: room.price,
                    quantity: calculateNights(),
                    checkIn: checkInDate,
                    checkOut: checkOutDate,
                    category: room.category
                }],
                type: 'room',
                totalAmount: getTotalAmount()
            };

            // Create order
            const orderResult = await createOrder(orderData);
            setOrderCreated(orderResult);
            
            // Initialize payment
            const paymentResult = await initializePayment(
                orderResult.order._id, 
                customerData.email
            );

            // Store order code in localStorage for later reference
            localStorage.setItem('lastOrderCode', orderResult.orderCode);
            localStorage.setItem('lastOrderEmail', customerData.email);

            // Redirect to Paystack
            window.location.href = paymentResult.authorization_url;
            
        } catch (error) {
            alert('Booking failed: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setCustomerData({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
        setCheckInDate('');
        setCheckOutDate('');
        setOrderCreated(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen || !room) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Book {room.name}</h2>
                        <p className="text-blue-100">{room.description}</p>
                    </div>
                </div>

                <div className="p-6">
                    {/* Room Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Room Rate:</span>
                            <span className="text-blue-600 font-bold">{formatPrice(room.price)} per night</span>
                        </div>
                        {checkInDate && checkOutDate && (
                            <>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Number of nights:</span>
                                    <span>{calculateNights()}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total Amount:</span>
                                    <span className="text-blue-600">{formatPrice(getTotalAmount())}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Booking Form */}
                    <div className="space-y-6">
                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Check-in Date *
                                </label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Check-out Date *
                                </label>
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    min={checkInDate || new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={customerData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={customerData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={customerData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={customerData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+234..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                            <button
                                onClick={handleClose}
                                className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={isLoading || !checkInDate || !checkOutDate}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? 'Processing...' : `Pay ${formatPrice(getTotalAmount())}`}
                            </button>
                        </div>
                    </div>

                    {/* Success Message */}
                    {orderCreated && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-green-800">Booking Created Successfully!</h4>
                                    <p className="text-green-700 text-sm mt-1">
                                        Order Code: <span className="font-mono font-bold">{orderCreated.orderCode}</span>
                                        <br />
                                        You'll be redirected to payment shortly...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;