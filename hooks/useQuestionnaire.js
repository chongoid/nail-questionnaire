import { useState } from 'react';

/**
 * Custom hook for managing questionnaire state
 * 
 * This hook manages:
 * - Current step in the questionnaire
 * - All answers collected from the user
 * - Navigation between steps
 * 
 * HOW TO ADD NEW QUESTIONS:
 * 1. Add a new question component in /components/questionnaire/
 * 2. Import and add it to the questions array in questionnaire.js
 * 3. The hook will automatically track the answer using the question's ID
 */
export default function useQuestionnaire(totalSteps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  /**
   * Save an answer for a specific question
   * @param {string} questionId - Unique identifier for the question
   * @param {any} value - The answer value
   */
  const saveAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  /**
   * Move to the next step
   */
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Move to the previous step
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  /**
   * Check if current step is the first
   */
  const isFirst = currentStep === 0;

  /**
   * Check if current step is the last
   */
  const isLast = currentStep === totalSteps - 1;

  return {
    currentStep,
    answers,
    saveAnswer,
    nextStep,
    prevStep,
    isFirst,
    isLast,
  };
}
