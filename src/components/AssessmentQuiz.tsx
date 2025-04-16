"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

// Define the question types for the assessment
export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface AssessmentQuizProps {
  onComplete: (results: AssessmentResults) => void;
  onBack: () => void;
}

export interface AssessmentResults {
  score: number;
  totalQuestions: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  recommendedAreas: string[];
}

// Sample assessment questions (simplified for demonstration)
const sampleQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    category: "reading",
    question: "The author's tone in the passage can best be described as...",
    options: [
      "Enthusiastic and optimistic",
      "Critical and pessimistic",
      "Neutral and objective",
      "Nostalgic and reflective",
    ],
    correctAnswer: 2,
  },
  {
    id: "q2",
    category: "reading",
    question:
      "Based on the passage, what can be inferred about the author's view on climate change?",
    options: [
      "It is an exaggerated threat",
      "It requires immediate action",
      "It is a natural cycle",
      "It is beyond human control",
    ],
    correctAnswer: 1,
  },
  {
    id: "q3",
    category: "math_no_calc",
    question: "Solve for x: 2x + 5 = 13",
    options: ["x = 4", "x = 9", "x = 4.5", "x = 4"],
    correctAnswer: 0,
  },
  {
    id: "q4",
    category: "math_no_calc",
    question:
      "If a rectangle has a length of 12 units and a width of 5 units, what is its area?",
    options: [
      "17 square units",
      "60 square units",
      "35 square units",
      "30 square units",
    ],
    correctAnswer: 1,
  },
  {
    id: "q5",
    category: "math_calc",
    question:
      "What is the slope of the line passing through the points (2, 5) and (4, 9)?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
  },
  {
    id: "q6",
    category: "math_calc",
    question:
      "The function f(x) = 2x² - 3x + 1 has a minimum value at what value of x?",
    options: ["x = 0.5", "x = 0.75", "x = 1", "x = 1.5"],
    correctAnswer: 1,
  },
];

const categoryNames: Record<string, string> = {
  reading: "Reading & Writing",
  math_no_calc: "Math (No Calculator)",
  math_calc: "Math (Calculator)",
};

export default function AssessmentQuiz({
  onComplete,
  onBack,
}: AssessmentQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    // Calculate results
    let correctAnswers = 0;
    const categoryScores: Record<string, { correct: number; total: number }> =
      {};

    // Initialize category scores
    sampleQuestions.forEach((q) => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total += 1;
    });

    // Calculate correct answers for each category
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctAnswers++;
        categoryScores[q.category].correct += 1;
      }
    });

    // Determine areas that need improvement (below 70% correct)
    const recommendedAreas: string[] = [];
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const percentage = (scores.correct / scores.total) * 100;
      if (percentage < 70) {
        recommendedAreas.push(category);
      }
    });

    const assessmentResults: AssessmentResults = {
      score: correctAnswers,
      totalQuestions: sampleQuestions.length,
      categoryScores,
      recommendedAreas,
    };

    setResults(assessmentResults);
    setQuizComplete(true);
    onComplete(assessmentResults);
  };

  const isAnswered = (questionId: string) => {
    return answers[questionId] !== undefined;
  };

  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;

  return (
    <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#2d2d3d] rounded-full mb-8">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">
            Initial Assessment
          </h2>
          <span className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </span>
        </div>

        <div className="bg-[#252538] p-5 rounded-lg mb-6 border border-purple-900/20">
          <div className="text-sm text-purple-400 mb-2">
            {categoryNames[currentQuestion.category]}
          </div>
          <p className="text-gray-200 text-lg mb-4">
            {currentQuestion.question}
          </p>

          <div className="space-y-3 mt-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between
                  ${
                    answers[currentQuestion.id] === index
                      ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 text-white"
                      : "bg-[#2d2d3d] hover:bg-[#32324a] text-gray-300"
                  }`}
              >
                <span>{option}</span>
                {answers[currentQuestion.id] === index && (
                  <Check className="w-5 h-5 text-purple-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 rounded-lg bg-[#2d2d3d] text-gray-300 hover:bg-purple-900/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Profile
          </button>

          <button
            onClick={
              currentQuestionIndex === sampleQuestions.length - 1
                ? finishQuiz
                : goToNextQuestion
            }
            disabled={!isAnswered(currentQuestion.id)}
            className={`flex items-center px-6 py-2 rounded-lg transition-all 
              ${
                isAnswered(currentQuestion.id)
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-purple-500/20"
                  : "bg-[#2d2d3d] text-gray-500 cursor-not-allowed"
              }`}
          >
            {currentQuestionIndex === sampleQuestions.length - 1
              ? "Finish"
              : "Next"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
