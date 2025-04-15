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
    <div className="bg-[#13131f] p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-purple-400">
        Practice Questions
      </h2>
      <div className="space-y-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-700 p-4 rounded-lg bg-[#18181f]"
          >
            <p className="font-medium mb-3 text-white">{question.question}</p>

            <div className="space-y-2 mb-3">
              {question.options.map((option) => (
                <div key={option} className="flex items-start">
                  <input
                    type="radio"
                    id={`q${question.id}-${option}`}
                    name={`question-${question.id}`}
                    className="mt-1 mr-2 accent-violet-600"
                    onChange={() => handleAnswerSelect(question.id, option)}
                    checked={userAnswers[question.id] === option}
                  />
                  <label
                    htmlFor={`q${question.id}-${option}`}
                    className="cursor-pointer text-gray-300 hover:text-purple-400"
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
                    ? "bg-green-900/30 text-green-300 border border-green-700/50"
                    : "bg-red-900/30 text-red-300 border border-red-700/50"
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
