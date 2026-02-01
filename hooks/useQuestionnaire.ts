import { useState, useEffect } from 'react';

interface QuestionnaireAnswer {
  [key: string]: unknown;
}

interface UseQuestionnaireReturn {
  currentStep: number;
  answers: QuestionnaireAnswer;
  saveAnswer: (questionId: string, value: unknown) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function useQuestionnaire(totalQuestions: number): UseQuestionnaireReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer>({});

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
  const saveAnswer = (questionId: string, value: unknown) => {
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
