import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { verifyPayment } from '../utils/api';

const PaymentCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, failed
    const [paymentData, setPaymentData] = useState(null);
    const [orderCode, setOrderCode] = useState('');

    useEffect(() => {
        const reference = searchParams.get('reference');
        const trxref = searchParams.get('trxref');
        
        // Get stored order code
        const storedOrderCode = localStorage.getItem('lastOrderCode');
        if (storedOrderCode) {
            setOrderCode(storedOrderCode);
        }

        const paymentRef = reference || trxref;
        
        if (paymentRef) {
            verifyPaymentStatus(paymentRef);
        } else {
            setStatus('failed');
        }
    }, [searchParams]);

    const verifyPaymentStatus = async (reference) => {
        try {
            const result = await verifyPayment(reference);
            setPaymentData(result);
            
            if (result.status === 'success') {
                setStatus('success');
            } else {
                setStatus('failed');
            }
        } catch (error) {
            console.error('Payment verification failed:', error);
            setStatus('failed');
        }
    };

    const handleContinue = () => {
        if (status === 'success') {
            navigate('/orders');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Verifying State */}
                {status === 'verifying' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Payment</h2>
                        <p className="text-gray-600">Please wait while we confirm your payment...</p>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
                        
                        {orderCode && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-green-800">
                                    <span className="font-medium">Order Code:</span> 
                                    <span className="font-mono font-bold ml-2">{orderCode}</span>
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                    Save this code to track your order
                                </p>
                            </div>
                        )}
                        
                        {paymentData && (
                            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">Amount:</span> ₦{paymentData.amount?.toLocaleString()}</p>
                                    <p><span className="font-medium">Reference:</span> {paymentData.reference}</p>
                                    <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Successful</span></p>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleContinue}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                Track Your Order
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                )}

                {/* Failed State */}
                {status === 'failed' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">
                            Unfortunately, your payment could not be processed. You can try again or contact support.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/orders')}
                                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                Check Order Status
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentCallback;