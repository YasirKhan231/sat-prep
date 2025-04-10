"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function TestComponent({ testId }: { testId: string }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

  // Mock data - in a real app, you would fetch this from your backend
  useEffect(() => {
    const mockQuestions: Question[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      text: `This is question ${
        i + 1
      } about SAT reading comprehension. It tests your ability to analyze and interpret complex texts.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
      explanation:
        "This is the explanation for why the correct answer is correct.",
    }));

    setQuestions(mockQuestions);
    setLoading(false);

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testId]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Submit test
      router.push("/tests/completed");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">Loading test questions...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          SAT Practice Test - Reading
        </h2>
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg">
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to exit the test? Your progress will be lost."
                )
              ) {
                router.push("/tests");
              }
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
          >
            Exit Test
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-lg font-medium mb-6 dark:text-white">
              {currentQuestion.text}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`option-container border rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedOption === option
                    ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1
            ? "Finish Test"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
