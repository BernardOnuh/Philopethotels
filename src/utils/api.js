// utils/api.js - API utility functions for your React frontend

const API_BASE_URL = 'https://philbackend-sdld.onrender.com/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

// Create customer and order
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Initialize payment
export const initializePayment = async (orderId, email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, email })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error initializing payment:', error);
        throw error;
    }
};

// Verify payment
export const verifyPayment = async (reference) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reference })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
};

// Get customer orders by email only
export const getCustomerOrders = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/customer/${email}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Verify order with email (and optional order code)
export const verifyOrder = async (email, orderCode = null) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, orderCode })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error verifying order:', error);
        throw error;
    }
};

// Track order by code (internal/company use)
export const trackOrderByCode = async (orderCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/track/${orderCode}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error tracking order:', error);
        throw error;
    }
};

// Format price helper
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(price);
};

// Format date helper
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};