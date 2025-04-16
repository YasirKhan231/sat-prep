"use client";

import { useState, useEffect } from "react";
import { Clock, BarChart, Target, ArrowRight } from "lucide-react";
import TakeTest from "./TakeTest";

interface TestResult {
  section: string;
  score: number;
  timePerQuestion: number;
  recommendations: string[];
  date: Date;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  sectionBreakdown: {
    reading: number;
    writing: number;
    math: number;
  };
}

export default function PracticeTests() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isTakingTest, setIsTakingTest] = useState(false);

  const mockTests = [
    {
      id: "full-sat",
      title: "Full SAT Practice Test",
      duration: 180, // 3 hours
      description: "Complete SAT simulation with all sections",
      icon: <Clock className="h-6 w-6" />,
      questions: [
        {
          id: "q1",
          text: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["5", "10", "15", "20"],
          correctAnswer: 0,
          section: "math",
          difficulty: "easy",
        },
        {
          id: "q2",
          text: "Which of the following best describes the author's tone in the passage?",
          options: ["Critical", "Humorous", "Nostalgic", "Objective"],
          correctAnswer: 2,
          section: "reading",
          difficulty: "medium",
        },
        // Add more questions as needed
      ],
    },
    {
      id: "mini-math",
      title: "Math Mini Test",
      duration: 30,
      description: "Focus on your weak areas in math",
      icon: <Target className="h-6 w-6" />,
      questions: [
        {
          id: "m1",
          text: "If f(x) = 3x² - 2x + 1, what is f(2)?",
          options: ["9", "11", "13", "15"],
          correctAnswer: 0,
          section: "math",
          difficulty: "medium",
        },
        // Add more questions as needed
      ],
    },
    {
      id: "reading",
      title: "Reading Comprehension",
      duration: 20,
      description: "Practice reading and analysis skills",
      icon: <BarChart className="h-6 w-6" />,
    },
  ];

  useEffect(() => {
    const mockResults: TestResult[] = [
      {
        section: "Full SAT Practice Test",
        score: 85,
        timePerQuestion: 45,
        recommendations: [
          "Focus on time management in the reading section",
          "Practice more complex math problems",
          "Review grammar rules for writing section",
        ],
        date: new Date(),
        totalQuestions: 154,
        correctAnswers: 131,
        timeSpent: 180,
        sectionBreakdown: {
          reading: 82,
          writing: 88,
          math: 85,
        },
      },
      {
        section: "Math Mini Test",
        score: 78,
        timePerQuestion: 60,
        recommendations: [
          "Work on algebra fundamentals",
          "Practice geometry problems",
          "Improve calculator usage",
        ],
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        totalQuestions: 58,
        correctAnswers: 45,
        timeSpent: 30,
        sectionBreakdown: {
          reading: 0,
          writing: 0,
          math: 78,
        },
      },
    ];
    setTestResults(mockResults);
  }, []);

  const calculateAverageScore = () => {
    if (testResults.length === 0) return 0;
    const total = testResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(total / testResults.length);
  };

  const getScoreTrend = () => {
    if (testResults.length < 2) return 0;
    const latestScore = testResults[0].score;
    const previousScore = testResults[1].score;
    return latestScore - previousScore;
  };

  const handleTestComplete = (results: any) => {
    const newResult: TestResult = {
      section: selectedTest || "Unknown Test",
      score: Math.round(
        (results.correctAnswers / results.totalQuestions) * 100
      ),
      timePerQuestion: Math.round(results.timeSpent / results.totalQuestions),
      recommendations: generateRecommendations(results),
      date: new Date(),
      totalQuestions: results.totalQuestions,
      correctAnswers: results.correctAnswers,
      timeSpent: results.timeSpent,
      sectionBreakdown: results.sectionBreakdown,
    };

    setTestResults((prev) => [newResult, ...prev]);
    setIsTakingTest(false);
    setSelectedTest(null);
  };

  const generateRecommendations = (results: any) => {
    const recommendations = [];
    if (results.sectionBreakdown.reading < 80) {
      recommendations.push("Focus on improving reading comprehension skills");
    }
    if (results.sectionBreakdown.writing < 80) {
      recommendations.push("Practice grammar and writing rules");
    }
    if (results.sectionBreakdown.math < 80) {
      recommendations.push("Work on math problem-solving strategies");
    }
    if (results.timePerQuestion > 60) {
      recommendations.push("Improve time management skills");
    }
    return recommendations;
  };

  const startTest = (testId: string) => {
    setSelectedTest(testId);
    setIsTakingTest(true);
  };

  if (isTakingTest) {
    const test = mockTests.find((t) => t.id === selectedTest);
    if (!test) return null;
    return <TakeTest test={test} onComplete={handleTestComplete} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Practice Tests & Performance
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Overall Progress:</span>
            <div className="w-32 h-2 bg-[#2d2d3d] rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
                style={{ width: `${calculateAverageScore()}%` }}
              ></div>
            </div>
          </div>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-4 py-2 bg-[#1e1e2f] hover:bg-[#2a2a3f] rounded-lg text-gray-200 border border-purple-500/20 transition-colors"
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>
      </div>

      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
            <h3 className="text-lg font-semibold text-white mb-2">
              Average Score
            </h3>
            <p className="text-3xl font-bold text-purple-400">
              {calculateAverageScore()}%
            </p>
            <div className="flex items-center mt-2">
              <span
                className={`text-sm ${
                  getScoreTrend() >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {getScoreTrend() >= 0 ? "↑" : "↓"} {Math.abs(getScoreTrend())}%
              </span>
              <span className="text-sm text-gray-400 ml-2">from last test</span>
            </div>
          </div>
          <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
            <h3 className="text-lg font-semibold text-white mb-2">
              Time Management
            </h3>
            <p className="text-3xl font-bold text-purple-400">
              {Math.round(testResults[0]?.timePerQuestion || 0)}s
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Average time per question
            </p>
          </div>
          <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
            <h3 className="text-lg font-semibold text-white mb-2">
              Test History
            </h3>
            <p className="text-3xl font-bold text-purple-400">
              {testResults.length}
            </p>
            <p className="text-sm text-gray-400 mt-2">Tests completed</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer"
            onClick={() => startTest(test.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-purple-500">{test.icon}</div>
              <h3 className="text-xl font-semibold text-white">{test.title}</h3>
            </div>
            <p className="text-gray-400 mb-2">{test.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{formatDuration(test.duration)}</span>
              <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                Start Test <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
        <h3 className="text-xl font-semibold mb-4 text-white">Test Results</h3>
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className="p-4 bg-[#2d2d3d] rounded-lg border border-purple-900/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-white">{result.section}</h4>
                  <p className="text-sm text-gray-400">
                    {result.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-purple-400 text-xl font-bold">
                    {result.score}%
                  </span>
                  <p className="text-sm text-gray-400">
                    {result.correctAnswers}/{result.totalQuestions} correct
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-400">Reading</p>
                  <p className="text-white font-medium">
                    {result.sectionBreakdown.reading}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Writing</p>
                  <p className="text-white font-medium">
                    {result.sectionBreakdown.writing}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Math</p>
                  <p className="text-white font-medium">
                    {result.sectionBreakdown.math}%
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Average time per question: {result.timePerQuestion}s
              </div>
              <div className="space-y-1">
                {result.recommendations.map((rec, i) => (
                  <p key={i} className="text-sm text-gray-300">
                    • {rec}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
};
