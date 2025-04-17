// src/app/ai-lessons/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Brain,
  Target,
  Sparkles,
  Zap,
  ChevronRight,
  Download,
  Share2,
  Bookmark,
  Library,
  Star,
  ArrowRight,
  Clock,
  Lightbulb,
  CheckCircle,
  FileText,
  BookOpenCheck,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  subtopics: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  popular?: boolean;
}

export default function AILessonsPage() {
  const [activeTab, setActiveTab] = useState<
    "featured" | "my-lessons" | "recommended"
  >("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("math");

  const categories = [
    { id: "math", name: "Mathematics", icon: <Target className="h-4 w-4" /> },
    { id: "reading", name: "Reading", icon: <BookOpen className="h-4 w-4" /> },
    { id: "writing", name: "Writing", icon: <FileText className="h-4 w-4" /> },
    { id: "all", name: "All Topics", icon: <Library className="h-4 w-4" /> },
  ];

  const topics: Topic[] = [
    {
      id: "algebra",
      title: "Algebra Foundations",
      description:
        "Master core algebraic concepts including equations, inequalities, and functions",
      icon: <Brain className="h-10 w-10" />,
      subtopics: [
        "Linear Equations",
        "Quadratic Equations",
        "Systems of Equations",
        "Inequalities",
      ],
      difficulty: "Intermediate",
      duration: "45-60 min",
      popular: true,
    },
    {
      id: "geometry",
      title: "Geometry Essentials",
      description:
        "Learn about shapes, angles, and spatial relationships with interactive examples",
      icon: <Target className="h-10 w-10" />,
      subtopics: [
        "Triangles",
        "Circles",
        "Coordinate Geometry",
        "Transformations",
      ],
      difficulty: "Intermediate",
      duration: "40-50 min",
    },
    {
      id: "probability",
      title: "Probability & Statistics",
      description:
        "Understand data analysis, probability distributions, and statistical inference",
      icon: <Sparkles className="h-10 w-10" />,
      subtopics: [
        "Basic Probability",
        "Data Analysis",
        "Statistical Measures",
        "Normal Distribution",
      ],
      difficulty: "Advanced",
      duration: "50-65 min",
      popular: true,
    },
      {
      id: "reading-comp",
      title: "Reading Comprehension",
      description:
        "Develop strategies for understanding complex passages and identifying key information",
      icon: <BookOpen className="h-10 w-10" />,
      subtopics: [
        "Main Idea",
        "Supporting Details",
        "Author's Purpose",
        "Inference",
      ],
      difficulty: "Intermediate",
      duration: "30-45 min",
    },
    {
      id: "grammar",
      title: "Grammar & Usage",
      description:
        "Strengthen your understanding of grammar rules, punctuation, and syntax",
      icon: <FileText className="h-10 w-10" />,
      subtopics: [
        "Subject-Verb Agreement",
        "Punctuation",
        "Modifiers",
        "Sentence Structure",
        ],
      difficulty: "Beginner",
      duration: "25-40 min",
    },
    {
      id: "trig",
      title: "Trigonometry",
      description:
        "Explore trigonometric functions, identities, and applications in various contexts",
      icon: <Zap className="h-10 w-10" />,
      subtopics: [
        "Trigonometric Functions",
        "Right Triangles",
        "Unit Circle",
        "Trigonometric Identities",
      ],
      difficulty: "Advanced",
      duration: "60-75 min",
    },
  ];

  const filteredTopics =
    selectedCategory === "all"
      ? topics
      : topics.filter((topic) => {
          if (selectedCategory === "math")
            return ["algebra", "geometry", "probability", "trig"].includes(
              topic.id
            );
          if (selectedCategory === "reading")
            return ["reading-comp"].includes(topic.id);
          if (selectedCategory === "writing")
            return ["grammar"].includes(topic.id);
          return true;
        });

  const recentLessons = [
    {
      id: "recent-1",
      title: "Quadratic Equations",
      lastAccessed: "2 days ago",
      progress: 75,
      parentTopic: "Algebra Foundations",
    },
    {
      id: "recent-2",
      title: "Reading for Main Idea",
      lastAccessed: "1 week ago",
      progress: 100,
      parentTopic: "Reading Comprehension",
    },
    {
      id: "recent-3",
      title: "Probability Basics",
      lastAccessed: "3 days ago",
      progress: 40,
      parentTopic: "Probability & Statistics",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            AI-Powered Study Lessons
          </h1>
          <p className="text-gray-400 mt-2">
            Personalized lessons tailored to your learning style and knowledge
            gaps
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-900/30 mb-6">
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "featured"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Featured Lessons
          </button>
          <button
            onClick={() => setActiveTab("my-lessons")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "my-lessons"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            My Lessons
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "recommended"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Recommended For You
          </button>
        </div>

        {activeTab === "featured" && (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      selectedCategory === category.id
                        ? "bg-purple-600 text-white"
                        : "bg-[#252538] text-gray-300 hover:bg-[#2a2a42]"
                    }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>

            {/* Popular lessons highlight */}
            {selectedCategory === "all" && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Popular Lessons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topics
                    .filter((t) => t.popular)
                    .map((topic) => (
                      <div
                        key={`popular-${topic.id}`}
                        className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-5 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
                      >
                        <div className="flex gap-4">
                          <div className="bg-purple-900/50 rounded-lg p-3 h-fit">
                            {topic.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {topic.title}
                            </h3>
                            <p className="text-gray-300 text-sm mt-1">
                              {topic.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-xs text-purple-300 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {topic.duration}
                              </span>
                              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                                {topic.difficulty}
                              </span>
                            </div>
                            <Link
                              href={`/ai-lessons/${topic.id}`}
                              className="mt-4 inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 group-hover:underline"
                            >
                              Start learning{" "}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
          </div>
        )}

            {/* All lessons grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                {selectedCategory === "all"
                  ? "All Topics"
                  : selectedCategory === "math"
                  ? "Mathematics"
                  : selectedCategory === "reading"
                  ? "Reading"
                  : "Writing"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-[#1e1e2f] rounded-xl p-5 border border-purple-900/30 hover:shadow-purple-500/5 hover:border-purple-600/30 transition-all group"
                  >
                    <div className="text-purple-500 mb-3">{topic.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {topic.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.subtopics.slice(0, 2).map((subtopic) => (
                        <span
                          key={`${topic.id}-${subtopic}`}
                          className="text-xs bg-[#252538] text-gray-300 px-2 py-1 rounded-md"
                        >
                          {subtopic}
                        </span>
                      ))}
                      {topic.subtopics.length > 2 && (
                        <span className="text-xs bg-[#252538] text-gray-300 px-2 py-1 rounded-md">
                          +{topic.subtopics.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {topic.duration}
                        </span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                          {topic.difficulty}
                        </span>
                      </div>
                      <Link
                        href={`/ai-lessons/${topic.id}`}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <div className="text-purple-500 mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI-Generated Content
                </h3>
                <p className="text-gray-400 text-sm">
                  Each lesson is created by advanced AI tailored to your
                  learning style and knowledge gaps.
                </p>
              </div>

              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <div className="text-purple-500 mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Adaptive Learning
                </h3>
                <p className="text-gray-400 text-sm">
                  Our system adapts to your responses, focusing more on areas
                  where you need improvement.
                </p>
              </div>

              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <div className="text-purple-500 mb-4">
                  <BookOpenCheck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Practice Integration
                </h3>
                <p className="text-gray-400 text-sm">
                  Each lesson includes practice questions and connects to
                  full-length tests for comprehensive learning.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === "my-lessons" && (
          <div className="space-y-8">
            {/* Recent lessons */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 overflow-hidden hover:border-purple-600/30 transition-all group"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">
                          {lesson.title}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {lesson.lastAccessed}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">
                        From: {lesson.parentTopic}
                      </p>

                      <div className="w-full bg-[#252538] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            lesson.progress === 100
                              ? "bg-green-500"
                              : "bg-purple-500"
                          }`}
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-300">
                          {lesson.progress}% complete
                        </span>
                        {lesson.progress === 100 ? (
                          <span className="text-xs flex items-center text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" /> Completed
                          </span>
                        ) : (
                          <Link
                            href={`/ai-lessons/continue/${lesson.id}`}
                            className="text-xs text-purple-400 hover:text-purple-300"
                          >
                            Continue
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#252538] px-5 py-3 flex justify-between items-center">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-gray-300">
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-300">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-300">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>

                      <Link
                        href={`/ai-lessons/review/${lesson.id}`}
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Review lesson
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved lessons */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Saved Lessons
              </h2>
              <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-8 text-center">
                <Bookmark className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">
                  You haven't saved any lessons yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Bookmark lessons to access them quickly later
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Browse lessons
                </button>
              </div>
            </div>

            {/* Learning stats */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Learning Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">
                    Lessons Completed
                  </h3>
                  <p className="text-3xl font-bold text-white">7</p>
                  <div className="mt-2 text-xs text-green-400 flex items-center">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                    +2 from last week
                  </div>
                </div>

                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">
                    Learning Streak
                  </h3>
                  <p className="text-3xl font-bold text-white">5 days</p>
                  <div className="mt-2 text-xs text-gray-400 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    Keep going!
                  </div>
                </div>

                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">
                    Total Learning Time
                  </h3>
                  <p className="text-3xl font-bold text-white">12.5 hrs</p>
                  <div className="mt-2 text-xs text-gray-400">
                    Avg. 45 min per session
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recommended" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <Sparkles className="h-12 w-12 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Personalized for You
                  </h2>
                  <p className="text-gray-300 md:max-w-2xl">
                    Based on your recent tests and study habits, we've
                    identified these topics that will help you improve your
                    score the most.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full mb-2 inline-block">
                      Weak area
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      Quadratic Equations
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400">Math - Algebra</span>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Based on your performance in the last 3 practice tests, you're
                  scoring 32% below average in questions related to quadratic
                  equations.
                </p>

                <div className="mb-4 bg-[#252538] h-2 rounded-full w-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>

                <Link
                  href="#"
                  className="block text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Start focused lesson
                </Link>
              </div>

              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full mb-2 inline-block">
                      Improvement needed
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      Reading Inference
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400">Reading</span>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Your ability to make inferences from reading passages needs
                  improvement. This is affecting 18% of your reading section
                  questions.
                </p>

                <div className="mb-4 bg-[#252538] h-2 rounded-full w-full overflow-hidden">
                  <div
                    className="bg-yellow-500 h-full rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>

                <Link
                  href="#"
                  className="block text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Start focused lesson
                </Link>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">
              Additional Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topics.slice(0, 3).map((topic) => (
                <div
                  key={`rec-${topic.id}`}
                  className="bg-[#1e1e2f] rounded-xl p-5 border border-purple-900/30 hover:shadow-purple-500/5 hover:border-purple-600/30 transition-all group"
                >
                  <div className="text-purple-500 mb-3">{topic.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {topic.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {topic.difficulty}
                    </span>
                    <Link
                      href={`/ai-lessons/${topic.id}`}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      Get started <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
