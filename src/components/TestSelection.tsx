"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestSelection() {
  const router = useRouter();
  const [testMode, setTestMode] = useState<"timed" | "untimed">("timed");

  const startTest = () => {
    // In a real app, you would create a test session and redirect to it
    router.push("/tests/1");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Select Your Practice Test
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose the test type and subject you want to practice
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="px-6 py-4 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition-colors">
          <h3 className="text-xl font-bold mb-1">SAT</h3>
          <p className="text-sm opacity-90">College Admissions</p>
        </div>
        <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <h3 className="text-xl font-bold mb-1">ACT</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            College Admissions
          </p>
        </div>
        <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <h3 className="text-xl font-bold mb-1">AP</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Advanced Placement
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Subject
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200">
              <option>Reading</option>
              <option>Writing</option>
              <option>Math - No Calculator</option>
              <option>Math - Calculator</option>
              <option>Full Test</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Difficulty
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200">
              <option>Easy</option>
              <option selected>Medium</option>
              <option>Hard</option>
              <option>Mixed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Mode
            </label>
            <div className="flex">
              <button
                onClick={() => setTestMode("timed")}
                className={`flex-1 py-2 px-4 text-center rounded-l-lg cursor-pointer transition-colors ${
                  testMode === "timed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                ⏲️ Timed
              </button>
              <button
                onClick={() => setTestMode("untimed")}
                className={`flex-1 py-2 px-4 text-center rounded-r-lg cursor-pointer transition-colors ${
                  testMode === "untimed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                🕒 Untimed
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Question Count
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200">
              <option>10 Questions</option>
              <option selected>20 Questions</option>
              <option>Full Section</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
        <button
          onClick={startTest}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
