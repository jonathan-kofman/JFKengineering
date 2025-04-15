// File: app/api/create-payment-intent/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Product } from '@/data/products';

console.log('Using Stripe key:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log that we're entering the API route
    console.log('Creating payment intent...');
    
    // Parse the request body
    const { cartItems } = req.body;
    
    console.log('Cart items:', cartItems);
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    // Calculate order amount from cart items
    const amount = cartItems.reduce(
      (total: number, item: Product) => total + item.price * 100, // Convert to cents
      0
    );
    
    console.log('Calculated amount:', amount);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: 'usd',
    });
    
    console.log('Payment intent created:', paymentIntent.id);

    // Return the client secret to the frontend
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Log the full error
    console.error('Error creating payment intent:', error);
    
    // Return a proper JSON error response
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}