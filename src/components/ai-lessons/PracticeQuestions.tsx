// src/components/ai-lessons/PracticeQuestions.tsx
"use client";

import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface PracticeQuestionsProps {
  questions: Question[];
}

export default function PracticeQuestions({
  questions,
}: PracticeQuestionsProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<
    Record<number, { isCorrect: boolean; explanation: string }>
  >({});

  const handleAnswerSelect = (questionId: number, option: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = option === question.correctAnswer;

    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
    setFeedback((prev) => ({
      ...prev,
      [questionId]: {
        isCorrect,
        explanation: isCorrect
          ? "Correct! Well done."
          : `Incorrect. ${question.explanation}`,
      },
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        Practice Questions
      </h2>
      <div className="space-y-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <p className="font-medium mb-3 text-gray-800 dark:text-gray-200">
              {question.question}
            </p>

            <div className="space-y-2 mb-3">
              {question.options.map((option) => (
                <div key={option} className="flex items-start">
                  <input
                    type="radio"
                    id={`q${question.id}-${option}`}
                    name={`question-${question.id}`}
                    className="mt-1 mr-2 accent-blue-600"
                    onChange={() => handleAnswerSelect(question.id, option)}
                    checked={userAnswers[question.id] === option}
                  />
                  <label
                    htmlFor={`q${question.id}-${option}`}
                    className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>

            {feedback[question.id] && (
              <div
                className={`p-3 rounded-lg mt-3 ${
                  feedback[question.id].isCorrect
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-500 dark:border-green-700"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-500 dark:border-red-700"
                }`}
              >
                <p className="font-medium">
                  {feedback[question.id].isCorrect
                    ? "✓ Correct!"
                    : "✗ Incorrect"}
                </p>
                <p>{feedback[question.id].explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
