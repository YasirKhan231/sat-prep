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

interface TestComponentProps {
  testId: string;
}

export default function TestComponent({ testId }: TestComponentProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

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

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
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
      <div className="min-h-screen flex items-center justify-center bg-[#121220] text-white">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
          <div
            className="w-4 h-4 rounded-full bg-indigo-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#121220] text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            SAT Practice Test - Reading
          </h2>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-purple-900/40 border border-purple-500/30 text-white rounded-lg">
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
              className="px-4 py-2 bg-[#1e1e2f] hover:bg-[#2a2a3f] rounded-lg text-gray-200 border border-purple-500/20 transition-colors"
            >
              Exit Test
            </button>
          </div>
        </div>

        <div className="relative w-full h-2 bg-[#1e1e2f] rounded-full mb-6 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="bg-[#1e1e2f] border border-purple-900/30 rounded-xl p-6 shadow-lg shadow-purple-500/5 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-lg font-medium mb-6 text-white">
              {currentQuestion.text}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`option-container border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedOption === option
                    ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/50"
                    : "border-purple-900/20 hover:border-purple-500/30 hover:bg-[#2a2a3f]"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                      selectedOption === option
                        ? "bg-purple-500 text-white"
                        : "bg-[#2a2a3f] text-gray-400 border border-purple-900/20"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-[#1e1e2f] border border-purple-900/30 rounded-lg hover:bg-[#2a2a3f] hover:border-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1e1e2f] disabled:hover:border-purple-900/30"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
          >
            {currentQuestionIndex === questions.length - 1
              ? "Finish Test"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
