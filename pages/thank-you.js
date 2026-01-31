import Link from 'next/link';

/**
 * Thank You / Confirmation Page
 * 
 * This page is shown after successful checkout.
 * Users are redirected here from Stripe after payment.
 */
export default function ThankYou() {
  return (
    <div>
      <main>
        <h1>Thank You!</h1>
        <p>Your custom nail order has been received.</p>
        
        <section>
          <h2>What happens next?</h2>
          <ol>
            <li>You'll receive an order confirmation email shortly</li>
            <li>We'll start creating your custom nails</li>
            <li>Your order will ship within 2-3 weeks</li>
            <li>You'll receive tracking information when it ships</li>
          </ol>
        </section>

        <section>
          <h2>Questions?</h2>
          <p>If you have any questions about your order, please contact us at support@example.com</p>
        </section>

        <div>
          <Link href="/">
            <button type="button">Return to Homepage</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
