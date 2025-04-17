"use client";

import StudyLessons from "@/components/StudyLessons";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Brain, FileText, Star } from "lucide-react";

export default function LessonsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AI-Powered Study Lessons
          </h1>
          <p className="text-gray-400 mt-2">
            Master key SAT/ACT concepts with our interactive, AI-guided lessons
            tailored to your learning style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-103">
            <div className="text-purple-500 mb-4">
              <BookOpen className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-white">
              Bite-Sized Lessons
            </h2>
            <p className="text-gray-400 text-sm">
              AI summarizes key concepts in easy-to-understand explanations.
            </p>
          </div>
          <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-103">
            <div className="text-purple-500 mb-4">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-white">
              Practice Questions
            </h2>
            <p className="text-gray-400 text-sm">
              Each lesson comes with 5-10 interactive questions to reinforce
              learning.
            </p>
          </div>
          <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-103">
            <div className="text-purple-500 mb-4">
              <Brain className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-white">
              Instant AI Feedback
            </h2>
            <p className="text-gray-400 text-sm">
              Provides explanations when users get an answer wrong.
            </p>
          </div>
          <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-103">
            <div className="text-purple-500 mb-4">
              <Star className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-white">
              Dynamic Difficulty
            </h2>
            <p className="text-gray-400 text-sm">
              Questions adapt based on your performance, ensuring the right
              level of challenge.
            </p>
          </div>
        </div>

        <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 shadow-lg p-6">
          <StudyLessons />
        </div>
      </div>
    </DashboardLayout>
  );
}
