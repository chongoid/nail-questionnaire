import Link from 'next/link';

/**
 * Thank You / Confirmation Page
 * 
 * This page is shown after successful checkout.
 * Users are redirected here from Stripe after payment.
 */
export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <main className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-6xl">✨</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600">Your custom nail order has been received.</p>
        </div>
        
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">What happens next?</h2>
          <ol className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
              <span>You'll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
              <span>We'll start creating your custom nails</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
              <span>Your order will ship within 2-3 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
              <span>You'll receive tracking information when it ships</span>
            </li>
          </ol>
        </section>

        <section className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-3">Questions?</h2>
          <p className="text-gray-700">
            If you have any questions about your order, please contact us at{' '}
            <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-700 underline">
              support@example.com
            </a>
          </p>
        </section>

        <div className="text-center">
          <Link href="/">
            <button 
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              ← Return to Homepage
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
