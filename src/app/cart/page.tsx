'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeProvider from '@/components/StripeProvider';

function CartContent() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  const stripe = useStripe();
  const elements = useElements();
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    // Load cart items from localStorage when component mounts
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        
        // Create a payment intent on the server
        if (parsedCart.length > 0) {
          createPaymentIntent(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPaymentIntent = async (items: Product[]) => {
    try {
      console.log('Sending cart items to create payment intent:', items);
      const response = await fetch('/api/create-payment-intent/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: items }),
      });
      
      // Check if response is ok
      if (!response.ok) {
        // Try to get text first to see what's being returned
        const text = await response.text();
        console.error('Error response text:', text);
        
        // Try to parse as JSON if possible
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          console.error(e);
        }
        
        setPaymentError(errorData?.error || `Server error: ${response.status}`);
        return;
      }
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentError('Network error. Please try again.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded yet or client secret is not available
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentError('Card element not found');
      return;
    }
    
    setProcessing(true);
    setPaymentError(null);
    
    try {
      // Confirm the payment with the card details
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zip,
            },
          },
        },
      });
      
      if (error) {
        setPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        setPaymentSuccess(true);
        // Clear the cart
        localStorage.removeItem('cartItems');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError('An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="bg-slate-800/50 p-8 rounded-lg text-center max-w-md">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
          <Link
            href="/store"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/store" 
            className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Store
          </Link>

          <h1 className="text-4xl font-bold mb-8 gradient-text">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center p-12 bg-slate-800/50 rounded-lg">
              <p className="text-xl mb-6">Your cart is empty</p>
              <Link 
                href="/store"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Cart Items */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Items</h2>
                <div className="bg-slate-800/50 rounded-lg overflow-hidden">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`}
                      className="flex items-center p-4 border-b border-slate-700 last:border-0"
                    >
                      <div className="w-16 h-16 relative mr-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 64px, 64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.category}</p>
                      </div>
                      <div className="text-blue-400 font-bold">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                  <div className="p-4 bg-slate-700/30 flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="text-blue-400 font-bold">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Card Details</h3>
                    <div className="p-3 rounded bg-slate-700 border border-slate-600 focus-within:border-blue-500">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#FFFFFF',
                              '::placeholder': {
                                color: '#AAAAAA',
                              },
                            },
                            invalid: {
                              color: '#EF4444',
                            },
                          },
                        }}
                      />
                    </div>
                    {paymentError && (
                      <div className="mt-2 text-red-500 text-sm">{paymentError}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-colors ${
                      processing || !stripe || !clientSecret
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-[#F1641E] hover:bg-[#E55C18]'
                    } text-white`}
                  >
                    {processing ? 'Processing...' : `Pay $${calculateTotal()}`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <StripeProvider>
      <CartContent />
    </StripeProvider>
  );
}