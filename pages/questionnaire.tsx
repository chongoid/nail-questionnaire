import { useState } from 'react';
import useQuestionnaire from '../hooks/useQuestionnaire';
import { redirectToCheckout } from '../lib/stripe';
import Layout from '../components/Layout';

// Import question components
import QuestionShape from '../components/questionnaire/QuestionShape';
import QuestionSize from '../components/questionnaire/QuestionSize';
import QuestionDesign from '../components/questionnaire/QuestionDesign';

interface Question {
  id: string;
  component: React.ComponentType<{ value: unknown; onChange: (value: unknown) => void }>;
}

/**
 * Questionnaire Page
 * 
 * HOW TO ADD A NEW QUESTION:
 * ===========================
 * 
 * 1. Create a new component in /components/questionnaire/
 *    Example: QuestionColor.tsx
 * 
 *    import React from 'react';
 * 
 *    interface QuestionColorProps {
 *      value: string | undefined;
 *      onChange: (value: string) => void;
 *    }
 * 
 *    QuestionColor.label = 'Color Scheme';
 * 
 *    QuestionColor.Review = function({ value }: { value?: string }) {
 *      return <span>{value || 'Not selected'}</span>;
 *    };
 * 
 *    export default function QuestionColor({ value, onChange }: QuestionColorProps) {
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
 */

// Define all questions here
const questions: Question[] = [
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
  const [showReview, setShowReview] = useState(false);

  // Total steps = questions + review screen
  const totalSteps = questions.length + 1;

  // Get the current question (only if not on review screen)
  const currentQuestion = questions[currentStep];
  const CurrentQuestionComponent = currentQuestion?.component;

  /**
   * Handle answer change for current question
   */
  const handleAnswerChange = (value: unknown) => {
    saveAnswer(currentQuestion.id, value);
  };

  /**
   * Handle next button click
   */
  const handleNext = () => {
    if (isLast) {
      // After last question, show review screen
      setShowReview(true);
    } else {
      nextStep();
    }
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

  // Get step display number
  const getStepNumber = () => {
    if (showReview) return questions.length + 1;
    return currentStep + 1;
  };

  return (
    <Layout>
      <main>
        <h1>Custom Nail Order</h1>
        <p>Step {getStepNumber()} of {totalSteps}</p>

        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(getStepNumber() / totalSteps) * 100}%` }}>
            <span>{Math.round((getStepNumber() / totalSteps) * 100)}%</span>
          </div>
        </div>

        {/* Review Screen */}
        {showReview ? (
          <div>
            <h2>Review Your Answers</h2>
            
            <div>
              {questions.map((question) => {
                const QuestionComponent = question.component;
                const answer = answers[question.id];
                
                return (
                  <div key={question.id}>
                    <div>
                      <label>{QuestionComponent.label}</label>
                      <button onClick={() => { setShowReview(false); prevStep(); }}>
                        Edit
                      </button>
                    </div>
                    <div>
                      <QuestionComponent.Review value={answer} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <p>By proceeding to checkout, you confirm that all the information above is correct.</p>
            </div>
          </div>
        ) : (
          /* Current question */
          <div>
            {CurrentQuestionComponent && (
              <CurrentQuestionComponent
                value={answers[currentQuestion.id]}
                onChange={handleAnswerChange}
              />
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div>
          {!showReview && !isFirst && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}

          {showReview && (
            <button type="button" onClick={() => setShowReview(false)}>
              Back to Questions
            </button>
          )}

          {!showReview && !isLast && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}

          {showReview && (
            <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          )}

          {!showReview && isLast && (
            <button type="button" onClick={handleNext}>
              Review Order
            </button>
          )}
        </div>

        {/* Debug info (remove in production) */}
        <details>
          <summary>Debug: View Current Answers</summary>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
        </details>
      </main>
    </Layout>
  );
}
