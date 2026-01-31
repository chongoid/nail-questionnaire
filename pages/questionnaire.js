import { useState } from 'react';
import useQuestionnaire from '../hooks/useQuestionnaire';
import { redirectToCheckout } from '../lib/stripe';

// Import question components
import QuestionShape from '../components/questionnaire/QuestionShape';
import QuestionSize from '../components/questionnaire/QuestionSize';
import QuestionDesign from '../components/questionnaire/QuestionDesign';

/**
 * Questionnaire Page
 * 
 * This page manages the multi-step questionnaire flow.
 * 
 * HOW TO ADD A NEW QUESTION:
 * ===========================
 * 
 * 1. Create a new component in /components/questionnaire/
 *    Example: QuestionColor.js
 * 
 *    export default function QuestionColor({ value, onChange }) {
 *      return (
 *        <div>
 *          <h2>What color scheme do you prefer?</h2>
 *          <input 
 *            type="text" 
 *            value={value || ''} 
 *            onChange={(e) => onChange(e.target.value)} 
 *          />
 *        </div>
 *      );
 *    }
 * 
 * 2. Import it at the top of this file:
 *    import QuestionColor from '../components/questionnaire/QuestionColor';
 * 
 * 3. Add it to the questions array below:
 *    {
 *      id: 'color',
 *      component: QuestionColor,
 *    },
 * 
 * That's it! The questionnaire will automatically handle the new step.
 */

// Define all questions here
const questions = [
  {
    id: 'shape',
    component: QuestionShape,
  },
  {
    id: 'size',
    component: QuestionSize,
  },
  {
    id: 'design',
    component: QuestionDesign,
  },
  // Add more questions here following the same pattern
];

export default function Questionnaire() {
  const {
    currentStep,
    answers,
    saveAnswer,
    nextStep,
    prevStep,
    isFirst,
    isLast,
  } = useQuestionnaire(questions.length);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the current question
  const currentQuestion = questions[currentStep];
  const CurrentQuestionComponent = currentQuestion.component;

  /**
   * Handle answer change for current question
   */
  const handleAnswerChange = (value) => {
    saveAnswer(currentQuestion.id, value);
  };

  /**
   * Handle next button click
   */
  const handleNext = () => {
    nextStep();
  };

  /**
   * Handle final submission and redirect to Stripe
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // You can save answers to a database here if needed
      console.log('Final answers:', answers);
      
      // Redirect to Stripe checkout
      await redirectToCheckout(answers);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <main className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Custom Nail Order</h1>
          <p className="text-lg text-gray-600">Step {currentStep + 1} of {questions.length}</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 flex items-center justify-end pr-2"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          >
            <span className="text-xs font-semibold text-white">
              {Math.round(((currentStep + 1) / questions.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Current question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <CurrentQuestionComponent
            value={answers[currentQuestion.id]}
            onChange={handleAnswerChange}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center gap-4">
          {!isFirst && (
            <button 
              type="button" 
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
            >
              ← Previous
            </button>
          )}

          {!isLast && (
            <button 
              type="button" 
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Next →
            </button>
          )}

          {isLast && (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : '✓ Complete Order'}
            </button>
          )}
        </div>

        {/* Debug info (remove in production) */}
        <details className="mt-8 p-4 bg-gray-100 rounded-lg">
          <summary className="cursor-pointer text-sm text-gray-600 font-medium">Debug: View Current Answers</summary>
          <pre className="mt-2 text-xs text-gray-700 overflow-auto">{JSON.stringify(answers, null, 2)}</pre>
        </details>
      </main>
    </div>
  );
}
