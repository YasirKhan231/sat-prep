"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowRight, Check, X, RefreshCw, Zap } from "lucide-react";

// Mock quiz questions
const mockQuestions = [
  {
    id: 1,
    question: "What is the solution to the equation 3x + 7 = 22?",
    options: ["3", "5", "7", "15"],
    correctAnswer: "5",
    explanation:
      "To solve 3x + 7 = 22, subtract 7 from both sides to get 3x = 15, then divide by 3 to get x = 5.",
  },
  {
    id: 2,
    question:
      "Which of the following best describes the author's tone in the passage?",
    options: ["Critical", "Nostalgic", "Enthusiastic", "Indifferent"],
    correctAnswer: "Nostalgic",
    explanation:
      "The author's references to 'the good old days' and 'fond memories' indicate a nostalgic tone throughout the passage.",
  },
  {
    id: 3,
    question: "What is the value of sin(π/6)?",
    options: ["0", "1/2", "√3/2", "1"],
    correctAnswer: "1/2",
    explanation:
      "The value of sin(π/6) is 1/2, which can be derived from the unit circle or using the sine values of standard angles.",
  },
  {
    id: 4,
    question:
      "Which literary device is demonstrated by the phrase 'the wind whispered through the trees'?",
    options: ["Simile", "Metaphor", "Personification", "Alliteration"],
    correctAnswer: "Personification",
    explanation:
      "Personification is attributing human characteristics to non-human things. Here, the wind is described as being able to whisper, which is a human action.",
  },
  {
    id: 5,
    question:
      "What is the midpoint of the line segment with endpoints at (2, 3) and (6, 7)?",
    options: ["(4, 5)", "(3, 4)", "(8, 10)", "(4, 10)"],
    correctAnswer: "(4, 5)",
    explanation:
      "To find the midpoint, average the x-coordinates and average the y-coordinates: ((2+6)/2, (3+7)/2) = (4, 5)",
  },
];

export default function QuickQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);

  const handleOptionSelect = (option: string) => {
    if (answered.includes(currentQuestion)) return;

    setSelectedOption(option);
    setShowExplanation(true);
    setAnswered([...answered, currentQuestion]);

    if (option === mockQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizComplete(false);
    setScore(0);
    setAnswered([]);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Quick Quiz
          </h1>
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-gray-400">
              {!quizComplete
                ? `Question ${currentQuestion + 1}/${mockQuestions.length}`
                : `Quiz Complete: ${score}/${mockQuestions.length}`}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {!quizComplete ? (
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {mockQuestions[currentQuestion].question}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {mockQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className={`p-4 text-left rounded-lg border transition-all ${
                          selectedOption === option
                            ? option ===
                              mockQuestions[currentQuestion].correctAnswer
                              ? "bg-green-900/20 border-green-500/50 text-green-400"
                              : "bg-red-900/20 border-red-500/50 text-red-400"
                            : "border-purple-900/30 hover:bg-[#252538] hover:border-purple-500/50"
                        }`}
                        onClick={() => handleOptionSelect(option)}
                        disabled={answered.includes(currentQuestion)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedOption === option &&
                            (option ===
                            mockQuestions[currentQuestion].correctAnswer ? (
                              <Check className="h-5 w-5 text-green-400" />
                            ) : (
                              <X className="h-5 w-5 text-red-400" />
                            ))}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {showExplanation && (
                <div className="mb-6 p-4 bg-[#252538] rounded-lg border border-purple-900/30">
                  <h3 className="font-medium mb-2 text-purple-400">
                    Explanation:
                  </h3>
                  <p>{mockQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!answered.includes(currentQuestion)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    answered.includes(currentQuestion)
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-purple-900/20 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                >
                  {currentQuestion < mockQuestions.length - 1
                    ? "Next Question"
                    : "See Results"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
              <div className="text-5xl font-bold mb-6">
                {score}/{mockQuestions.length}
              </div>
              <p className="mb-6 text-lg">
                {score === mockQuestions.length
                  ? "Perfect! You got all questions correct! 🎉"
                  : score >= mockQuestions.length / 2
                  ? "Good job! Keep practicing to improve. 👍"
                  : "Keep studying and try again! 📚"}
              </p>
              <button
                onClick={restartQuiz}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
