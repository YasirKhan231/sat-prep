"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Star,
} from "lucide-react";

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
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-purple-400 font-medium">
          Loading your personalized lessons...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <XCircle className="h-12 w-12 text-red-500" />
        <p className="text-red-400 font-medium">{error}</p>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          onClick={fetchLessons}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentLesson || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <BookOpen className="h-12 w-12 text-purple-500" />
        <p className="text-purple-400 font-medium">No lessons available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-400" />
          {currentLesson.title}
        </h2>
        <div className="flex items-center gap-3 bg-[#252538] px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-300">Difficulty:</span>
          <div className="w-32 h-2 bg-[#2d2d3d] rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
              style={{ width: `${userProgress.difficultyLevel * 20}%` }}
            ></div>
          </div>
          <span className="text-xs text-purple-400 font-medium">
            Level {Math.ceil(userProgress.difficultyLevel)}
          </span>
        </div>
      </div>

      <div className="bg-[#252538] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
        <div className="prose max-w-none text-gray-200 leading-relaxed">
          {currentLesson.content}
        </div>
      </div>

      <div className="bg-[#252538] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">
            Question {currentQuestion.id}
          </h3>
        </div>
        <p className="mb-6 text-gray-200 font-medium">{currentQuestion.text}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg transition-all ${
                selectedAnswer === index
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-[#1e1e2f] text-gray-200 hover:bg-[#32324a]"
              } ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? "bg-green-600/80 text-white border border-green-500"
                    : selectedAnswer === index
                    ? "bg-red-600/80 text-white border border-red-500"
                    : ""
                  : ""
              } ${selectedAnswer === index ? "font-medium" : ""}`}
              disabled={showExplanation}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center 
                  ${
                    showExplanation && index === currentQuestion.correctAnswer
                      ? "bg-green-500"
                      : showExplanation && selectedAnswer === index
                      ? "bg-red-500"
                      : selectedAnswer === index
                      ? "bg-purple-500"
                      : "border border-gray-500"
                  }`}
                >
                  {showExplanation &&
                    index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  {showExplanation &&
                    index === selectedAnswer &&
                    index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-4 w-4 text-white" />
                    )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-5 bg-[#13131f] rounded-lg border border-purple-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <p className="font-semibold text-white">
                {selectedAnswer === currentQuestion.correctAnswer
                  ? "Correct! Well done."
                  : "Not quite right. Let's learn from this."}
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm bg-[#1e1e2f] p-4 rounded-lg border border-purple-900/30">
        <div className="flex items-center gap-2 text-gray-300">
          <div className="bg-purple-500/20 rounded-full px-3 py-1 text-purple-300 font-medium flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            {userProgress.correctAnswers}/{userProgress.totalQuestions} correct
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-300 mt-2 sm:mt-0">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>
            Lesson {userProgress.currentLesson + 1} of {lessons.length}
          </span>
        </div>
      </div>
    </div>
  );
}
