import { loadStripe } from '@stripe/stripe-js';

/**
 * Stripe Configuration
 * 
 * IMPORTANT: Replace 'YOUR_STRIPE_PUBLISHABLE_KEY' with your actual Stripe publishable key
 * Get your key from: https://dashboard.stripe.com/apikeys
 * 
 * For testing: Use a key that starts with 'pk_test_'
 * For production: Use a key that starts with 'pk_live_'
 */
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'YOUR_STRIPE_PUBLISHABLE_KEY';

let stripePromise;

/**
 * Get Stripe.js instance
 * This is cached to avoid loading Stripe multiple times
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

/**
 * Redirect to Stripe Checkout
 * 
 * @param {object} answers - The questionnaire answers
 * @returns {Promise} - Resolves when checkout is initiated
 * 
 * HOW TO IMPLEMENT:
 * 
 * Option 1: Using Stripe Checkout (Recommended for beginners)
 * ------------------------------------------------------------
 * 1. Create a product in Stripe Dashboard
 * 2. Get the price ID (starts with 'price_')
 * 3. Replace 'YOUR_PRICE_ID' below with your actual price ID
 * 4. Stripe will handle the payment page
 * 
 * Option 2: Using Stripe Payment Links (Easiest)
 * -----------------------------------------------
 * 1. Create a Payment Link in Stripe Dashboard
 * 2. Instead of using this function, redirect directly to the payment link URL
 * 
 * Option 3: Custom Backend (Most flexible)
 * -----------------------------------------
 * 1. Create an API route in /pages/api/checkout.js
 * 2. Call that API route here to create a checkout session
 * 3. Use the session ID to redirect to Stripe
 * 
 * Example for Option 3:
 * 
 * const response = await fetch('/api/checkout', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ answers }),
 * });
 * const { sessionId } = await response.json();
 * const stripe = await getStripe();
 * await stripe.redirectToCheckout({ sessionId });
 */
export const redirectToCheckout = async (answers) => {
  try {
    const stripe = await getStripe();
    
    // OPTION 1: Direct checkout with a price ID
    // Uncomment and configure this when you have your Stripe price ID
    /*
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'YOUR_PRICE_ID', // Replace with your actual price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/thank-you`,
      cancelUrl: `${window.location.origin}/questionnaire`,
      // You can pass metadata about the order
      clientReferenceId: JSON.stringify(answers),
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
    */

    // OPTION 2: Using a custom backend API route
    // Uncomment this when you create /pages/api/checkout.js
    /*
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    
    const { sessionId } = await response.json();
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
    */

    // TEMPORARY: For development, just redirect to thank you page
    // Remove this and uncomment one of the options above when ready
    console.log('Questionnaire answers:', answers);
    alert('Stripe is not configured yet. Check lib/stripe.js for instructions.');
    window.location.href = '/thank-you';
    
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};
