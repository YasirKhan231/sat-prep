"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BookOpen,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock data for practice questions
const mockQuestions = [
  {
    id: 1,
    subject: "Math",
    topic: "Algebra",
    difficulty: "Medium",
    question: "Solve for x: 2x + 5 = 15",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
    correctAnswer: "x = 5",
    explanation: "2x + 5 = 15\n2x = 10\nx = 5",
  },
  {
    id: 2,
    subject: "English",
    topic: "Vocabulary",
    difficulty: "Easy",
    question: "Which word is a synonym for 'benevolent'?",
    options: ["Malicious", "Kind", "Ambivalent", "Curious"],
    correctAnswer: "Kind",
    explanation: "Benevolent means 'well-meaning and kindly'.",
  },
  {
    id: 3,
    subject: "Science",
    topic: "Biology",
    difficulty: "Hard",
    question: "Which of the following is NOT a function of the liver?",
    options: [
      "Detoxification",
      "Protein synthesis",
      "Bile production",
      "Insulin production",
    ],
    correctAnswer: "Insulin production",
    explanation:
      "The liver performs many functions including detoxification, protein synthesis, and bile production. Insulin is produced by the pancreas, not the liver.",
  },
  {
    id: 4,
    subject: "Math",
    topic: "Geometry",
    difficulty: "Medium",
    question: "What is the area of a circle with radius 4 units?",
    options: [
      "16π square units",
      "8π square units",
      "4π square units",
      "12π square units",
    ],
    correctAnswer: "16π square units",
    explanation:
      "The area of a circle is πr², where r is the radius. So, area = π × 4² = 16π square units.",
  },
  {
    id: 5,
    subject: "English",
    topic: "Grammar",
    difficulty: "Medium",
    question: "Identify the correct sentence:",
    options: [
      "The committee have reached their decision.",
      "The committee has reached it's decision.",
      "The committee has reached its decision.",
      "The committee have reached its decision.",
    ],
    correctAnswer: "The committee has reached its decision.",
    explanation:
      "'Committee' is a collective noun that takes a singular verb ('has'). 'Its' is the possessive form (not 'it's', which is a contraction of 'it is').",
  },
];

// Subjects and topics for filters
const subjects = ["All Subjects", "Math", "English", "Science"];
const topics = {
  "All Subjects": ["All Topics"],
  Math: ["All Topics", "Algebra", "Geometry", "Calculus", "Statistics"],
  English: ["All Topics", "Grammar", "Vocabulary", "Reading Comprehension"],
  Science: ["All Topics", "Biology", "Chemistry", "Physics"],
};
const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];

export default function PracticeQuestionsPage() {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulties");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Filter questions based on selected filters and search query
  const filteredQuestions = mockQuestions.filter((q) => {
    const matchesSubject =
      selectedSubject === "All Subjects" || q.subject === selectedSubject;
    const matchesTopic =
      selectedTopic === "All Topics" || q.topic === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === "All Difficulties" ||
      q.difficulty === selectedDifficulty;
    const matchesQuery =
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesTopic && matchesDifficulty && matchesQuery;
  });

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubject = e.target.value;
    setSelectedSubject(newSubject);
    setSelectedTopic("All Topics");
  };

  const handleStartQuestion = (questionId: number) => {
    setCurrentQuestion(questionId);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleOptionSelect = (option: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  const handleBackToList = () => {
    setCurrentQuestion(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const currentQuestionData = currentQuestion
    ? mockQuestions.find((q) => q.id === currentQuestion)
    : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Practice Questions</h1>
          {currentQuestion && (
            <button
              onClick={handleBackToList}
              className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
            >
              <BookOpen className="w-4 h-4 mr-1" /> Back to question list
            </button>
          )}
        </div>

        {!currentQuestion ? (
          <>
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  {topics[selectedSubject as keyof typeof topics].map(
                    (topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="relative">
                <select
                  className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question List */}
            {filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-[#252538] border border-purple-900/30 rounded-lg p-4 hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            question.difficulty === "Easy"
                              ? "bg-green-900/30 text-green-400"
                              : question.difficulty === "Medium"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-purple-400 text-sm">
                          {question.subject} - {question.topic}
                        </span>
                      </div>
                      <button
                        onClick={() => handleStartQuestion(question.id)}
                        className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        Practice <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    <h3 className="mt-2 text-white">{question.question}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#252538] border border-purple-900/30 rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  No questions match your filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </>
        ) : (
          currentQuestionData && (
            <div className="bg-[#252538] border border-purple-900/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    currentQuestionData.difficulty === "Easy"
                      ? "bg-green-900/30 text-green-400"
                      : currentQuestionData.difficulty === "Medium"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {currentQuestionData.difficulty}
                </span>
                <span className="text-purple-400 text-sm">
                  {currentQuestionData.subject} - {currentQuestionData.topic}
                </span>
              </div>

              <h2 className="text-xl font-medium mb-6">
                {currentQuestionData.question}
              </h2>

              <div className="space-y-3 mb-6">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === option
                        ? isAnswerSubmitted
                          ? option === currentQuestionData.correctAnswer
                            ? "border-green-500 bg-green-900/20"
                            : "border-red-500 bg-red-900/20"
                          : "border-purple-500 bg-purple-900/20"
                        : isAnswerSubmitted &&
                          option === currentQuestionData.correctAnswer
                        ? "border-green-500 bg-green-900/20"
                        : "border-purple-900/30 bg-[#1e1e2f] hover:border-purple-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isAnswerSubmitted &&
                        (option === currentQuestionData.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : selectedOption === option ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : null)}
                    </div>
                  </div>
                ))}
              </div>

              {isAnswerSubmitted ? (
                <div className="mt-6">
                  <h3 className="font-medium text-purple-400 mb-2">
                    Explanation:
                  </h3>
                  <div className="bg-[#1e1e2f] p-4 rounded-lg whitespace-pre-line">
                    {currentQuestionData.explanation}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handleBackToList}
                      className="bg-[#1e1e2f] hover:bg-[#2a2a3d] text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Back to question list
                    </button>

                    <button
                      onClick={() => {
                        const nextId =
                          filteredQuestions.findIndex(
                            (q) => q.id === currentQuestion
                          ) + 1;
                        if (nextId < filteredQuestions.length) {
                          handleStartQuestion(filteredQuestions[nextId].id);
                        } else {
                          handleBackToList();
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Next question
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
                    selectedOption
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-[#1e1e2f] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              )}
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}
