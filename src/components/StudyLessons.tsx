"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: number;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface UserProgress {
  currentLesson: number;
  correctAnswers: number;
  totalQuestions: number;
  difficultyLevel: number;
}

export default function StudyLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLesson: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    difficultyLevel: 1,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/lessons");
      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }
      const data = await response.json();
      setLessons(data.lessons);
      if (data.lessons.length > 0) {
        setCurrentLesson(data.lessons[0]);
        setCurrentQuestion(data.lessons[0].questions[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after submission
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setUserProgress((prev) => ({
      ...prev,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalQuestions: prev.totalQuestions + 1,
      difficultyLevel: isCorrect
        ? Math.min(prev.difficultyLevel + 0.1, 5)
        : Math.max(prev.difficultyLevel - 0.2, 1),
    }));

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!currentLesson) return;

    const currentIndex = currentLesson.questions.findIndex(
      (q) => q.id === currentQuestion?.id
    );

    if (currentIndex < currentLesson.questions.length - 1) {
      setCurrentQuestion(currentLesson.questions[currentIndex + 1]);
    } else {
      // Move to next lesson or complete
      const nextLessonIndex =
        lessons.findIndex((l) => l.id === currentLesson.id) + 1;

      if (nextLessonIndex < lessons.length) {
        setCurrentLesson(lessons[nextLessonIndex]);
        setCurrentQuestion(lessons[nextLessonIndex].questions[0]);
      }
    }

    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!currentLesson || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No lessons available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          {currentLesson.title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Difficulty:</span>
          <div className="w-32 h-2 bg-[#2d2d3d] rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
              style={{ width: `${userProgress.difficultyLevel * 20}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
        <div className="prose max-w-none text-gray-300">
          {currentLesson.content}
        </div>
      </div>

      <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Question {currentQuestion.id}
        </h3>
        <p className="mb-6 text-gray-300">{currentQuestion.text}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg transition-all ${
                selectedAnswer === index
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-[#2d2d3d] text-gray-300 hover:bg-[#32324a]"
              } ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? "bg-green-500 hover:bg-green-600"
                    : selectedAnswer === index
                    ? "bg-red-500 hover:bg-red-600"
                    : ""
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-[#13131f] rounded-lg border border-purple-900/30">
            <p className="font-semibold mb-2 text-white">
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct!"
                : "Incorrect"}
            </p>
            <p className="text-gray-300">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              Next Question <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Progress: {userProgress.correctAnswers}/{userProgress.totalQuestions}{" "}
          correct
        </span>
        <span>
          Lesson {userProgress.currentLesson + 1} of {lessons.length}
        </span>
      </div>
    </div>
  );
}
