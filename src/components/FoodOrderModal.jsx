import React, { useState } from 'react';
import { createOrder, initializePayment, formatPrice } from '../utils/api';

const FoodOrderModal = ({ isOpen, onClose, cart, getTotalPrice, clearCart }) => {
    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [deliveryOption, setDeliveryOption] = useState('dine-in');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orderCreated, setOrderCreated] = useState(null);

    const handleInputChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.phone) {
            alert('Please fill in all customer details');
            return;
        }
        
        if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
            alert('Please provide delivery address');
            return;
        }
        
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare order data
            const orderData = {
                customerData,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                })),
                type: 'food',
                totalAmount: getTotalPrice(),
                deliveryOption,
                deliveryAddress: deliveryOption === 'delivery' ? deliveryAddress : null,
                specialInstructions: specialInstructions || null
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

            // Clear cart
            clearCart();

            // Redirect to Paystack
            window.location.href = paymentResult.authorization_url;
            
        } catch (error) {
            alert('Order failed: ' + error.message);
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
        setDeliveryOption('dine-in');
        setDeliveryAddress('');
        setSpecialInstructions('');
        setOrderCreated(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Complete Your Order</h2>
                        <p className="text-orange-100">Review your items and provide delivery details</p>
                    </div>
                </div>

                <div className="p-6">
                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                        <div className="space-y-2 mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-2">
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total Amount:</span>
                                <span className="text-orange-600">{formatPrice(getTotalPrice())}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Form */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Option</h3>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="dine-in"
                                        checked={deliveryOption === 'dine-in'}
                                        onChange={(e) => setDeliveryOption(e.target.value)}
                                        className="mr-3 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div>
                                        <span className="font-medium">Dine In</span>
                                        <p className="text-sm text-gray-600">Enjoy your meal at our restaurant</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="takeaway"
                                        checked={deliveryOption === 'takeaway'}
                                        onChange={(e) => setDeliveryOption(e.target.value)}
                                        className="mr-3 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div>
                                        <span className="font-medium">Takeaway</span>
                                        <p className="text-sm text-gray-600">Pick up your order from our restaurant</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="delivery"
                                        checked={deliveryOption === 'delivery'}
                                        onChange={(e) => setDeliveryOption(e.target.value)}
                                        className="mr-3 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div>
                                        <span className="font-medium">Delivery</span>
                                        <p className="text-sm text-gray-600">We'll deliver to your address</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Delivery Address (if delivery selected) */}
                        {deliveryOption === 'delivery' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Address *
                                </label>
                                <textarea
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Enter your full delivery address..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        {/* Special Instructions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Instructions (Optional)
                            </label>
                            <textarea
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                placeholder="Any special requests for your order..."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
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
                                onClick={handlePlaceOrder}
                                disabled={isLoading || cart.length === 0}
                                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? 'Processing...' : `Pay ${formatPrice(getTotalPrice())}`}
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
                                    <h4 className="font-semibold text-green-800">Order Created Successfully!</h4>
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

export default FoodOrderModal;