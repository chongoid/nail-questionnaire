import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

/**
 * Redirect to Stripe Checkout
 * 
 * @param {Object} answers - The questionnaire answers to pass to checkout
 */
export async function redirectToCheckout(answers) {
  const stripe = await stripePromise;
  
  // In production, you would create a checkout session on your server
  // For now, we'll use the redirect method with line items
  
  // Example: Create a checkout session via API endpoint
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ answers }),
  // });
  // const { sessionId } = await response.json();
  // await stripe.redirectToCheckout({ sessionId });
  
  // For demo purposes, show how to redirect with line items directly
  console.log('Answers collected:', answers);
  console.log('Stripe publishable key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
  // This is where you would implement the actual checkout flow
  alert('Stripe checkout would redirect here with your publishable key configured.');
}

export { stripePromise };
