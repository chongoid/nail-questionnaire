/**
 * useQuestionnaire Hook
 * 
 * Manages state for a multi-step questionnaire.
 * 
 * Usage:
 * const { currentStep, answers, saveAnswer, nextStep, prevStep, isFirst, isLast } = useQuestionnaire(totalQuestions);
 */
import { useState, useEffect } from 'react';

export default function useQuestionnaire(totalQuestions) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Load saved answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('questionnaire_answers');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved answers:', e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('questionnaire_answers', JSON.stringify(answers));
  }, [answers]);

  // Save an answer for a specific question
  const saveAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Go to next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalQuestions - 1));
  };

  // Go to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Check if on first step
  const isFirst = currentStep === 0;

  // Check if on last step
  const isLast = currentStep === totalQuestions - 1;

  return {
    currentStep,
    answers,
    saveAnswer,
    nextStep,
    prevStep,
    isFirst,
    isLast
  };
}
