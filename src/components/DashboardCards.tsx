"use client";

import Link from "next/link";
import {
  BookOpen,
  Brain,
  BarChart,
  Clock,
  Target,
  Zap,
  Book,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="space-y-8">
      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/lessons">
          <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-purple-900/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI-Powered Study Lessons
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Personalized learning paths
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/practice-tests">
          <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-purple-900/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Practice Tests & Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your progress
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/subscription">
          <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-purple-900/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Premium Features
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Unlock full potential
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/lessons" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2">
                  <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Lessons
                </span>
              </div>
            </div>
          </Link>

          <Link href="/practice-tests" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Practice Tests
                </span>
              </div>
            </div>
          </Link>

          <Link href="/study-materials" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mb-2">
                  <Book className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Study Materials
                </span>
              </div>
            </div>
          </Link>

          <Link href="/notes" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Notes
                </span>
              </div>
            </div>
          </Link>

          <Link href="/chat" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-2">
                  <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  AI Chat
                </span>
              </div>
            </div>
          </Link>

          <Link href="/settings" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gray-100 dark:bg-gray-900/30 rounded-lg mb-2">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Settings
                </span>
              </div>
            </div>
          </Link>

          <Link href="/help" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg mb-2">
                  <HelpCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Help Center
                </span>
              </div>
            </div>
          </Link>

          <Link href="/subscription" className="group">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-900/20 group-hover:border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Upgrade
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
