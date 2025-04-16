"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  section: "reading" | "writing" | "math";
  difficulty: "easy" | "medium" | "hard";
}

interface Test {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: Question[];
}

export default function TakeTest({
  test,
  onComplete,
}: {
  test: Test;
  onComplete: (results: any) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setAnswers((prev) => ({
      ...prev,
      [test.questions[currentQuestionIndex].id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(
        answers[test.questions[currentQuestionIndex + 1].id] ?? null
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(
        answers[test.questions[currentQuestionIndex - 1].id] ?? null
      );
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);

    const results = {
      totalQuestions: test.questions.length,
      correctAnswers: Object.entries(answers).filter(([questionId, answer]) => {
        const question = test.questions.find((q) => q.id === questionId);
        return question?.correctAnswer === answer;
      }).length,
      timeSpent: test.duration * 60 - timeLeft,
      sectionBreakdown: {
        reading: calculateSectionScore("reading"),
        writing: calculateSectionScore("writing"),
        math: calculateSectionScore("math"),
      },
    };

    onComplete(results);
  };

  const calculateSectionScore = (section: "reading" | "writing" | "math") => {
    const sectionQuestions = test.questions.filter(
      (q) => q.section === section
    );
    const correctAnswers = sectionQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    return Math.round((correctAnswers / sectionQuestions.length) * 100);
  };

  const currentQuestion = test.questions[currentQuestionIndex];

  if (showResults) {
    return (
      <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
        <h2 className="text-2xl font-bold text-white mb-4">Test Complete!</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#2d2d3d] p-4 rounded-lg">
              <p className="text-gray-400">Total Questions</p>
              <p className="text-2xl font-bold text-white">
                {test.questions.length}
              </p>
            </div>
            <div className="bg-[#2d2d3d] p-4 rounded-lg">
              <p className="text-gray-400">Time Spent</p>
              <p className="text-2xl font-bold text-white">
                {formatTime(test.duration * 60 - timeLeft)}
              </p>
            </div>
            <div className="bg-[#2d2d3d] p-4 rounded-lg">
              <p className="text-gray-400">Score</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round(
                  (Object.entries(answers).filter(([questionId, answer]) => {
                    const question = test.questions.find(
                      (q) => q.id === questionId
                    );
                    return question?.correctAnswer === answer;
                  }).length /
                    test.questions.length) *
                    100
                )}
                %
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Take Another Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{test.title}</h2>
        <div className="flex items-center gap-2 text-purple-400">
          <Clock className="h-5 w-5" />
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span className="text-sm text-gray-400 capitalize">
            {currentQuestion.section}
          </span>
        </div>
        <div className="w-full h-2 bg-[#2d2d3d] rounded-full">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / test.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-white text-lg mb-4">{currentQuestion.text}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${
                selectedAnswer === index
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-gray-700 hover:border-purple-500/50 text-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#2d2d3d] text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
        {currentQuestionIndex === test.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-[#2d2d3d] text-gray-300 rounded-lg"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
