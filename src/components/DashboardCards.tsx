"use client";

import Link from "next/link";

export default function DashboardCards() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">📅</span> Upcoming Test Date
          </h3>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            28
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Days Remaining
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">📈</span> Study Plan Progress
          </h3>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            65%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Completion Rate
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">🎯</span> Last Practice Test Score
          </h3>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            82%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Above Average
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/tests"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 transition-all"
        >
          <div className="text-blue-500 dark:text-blue-400 text-3xl mb-4">
            ✏️
          </div>
          <h3 className="text-xl font-semibold mb-2">Take Practice Test</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Challenge yourself with a new practice test
          </p>
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 transition-all">
          <div className="text-green-500 dark:text-green-400 text-3xl mb-4">
            📋
          </div>
          <h3 className="text-xl font-semibold mb-2">View Study Plan</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Check your personalized study schedule
          </p>
        </div>
        <Link
          href="/ai-lessons"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 transition-all"
        >
          <div className="text-purple-500 dark:text-purple-400 text-3xl mb-4">
            💡
          </div>
          <h3 className="text-xl font-semibold mb-2">AI generated lessons</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized learning content
          </p>
        </Link>
        <Link
          href="/notes"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 transition-all"
        >
          <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-4">
            📊
          </div>
          <h3 className="text-xl font-semibold mb-2">Generate Notes</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Create study notes from test content
          </p>
        </Link>
      </div>
    </>
  );
}
