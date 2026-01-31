import Link from 'next/link';

/**
 * Landing Page
 * 
 * This is the first page users see.
 * It introduces the service and links to the questionnaire.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Custom Press-On Nails</h1>
          <p className="text-xl text-gray-600">Get perfectly fitted, custom-designed press-on nails made just for you.</p>
        </div>
        
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <ol className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
              <span>Answer a few quick questions about your preferences</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
              <span>Complete your order securely with Stripe</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
              <span>Receive your custom nails within 2-3 weeks</span>
            </li>
          </ol>
        </section>

        <div className="text-center">
          <Link href="/questionnaire">
            <button 
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Your Custom Order
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
