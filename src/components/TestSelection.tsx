"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart2, Clock, FileText } from "lucide-react";

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
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Select Your Practice Test
        </h2>
        <p className="text-gray-400">
          Choose the test type and subject you want to practice
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-purple-500/20 cursor-pointer hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5">
          <h3 className="text-xl font-bold mb-1">SAT</h3>
          <p className="text-sm opacity-90">College Admissions</p>
        </div>
        <div className="px-6 py-5 bg-[#1e1e2f] border border-purple-900/30 text-white rounded-xl shadow-md cursor-pointer hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all transform hover:-translate-y-0.5">
          <h3 className="text-xl font-bold mb-1">ACT</h3>
          <p className="text-sm text-gray-400">College Admissions</p>
        </div>
        <div className="px-6 py-5 bg-[#1e1e2f] border border-purple-900/30 text-white rounded-xl shadow-md cursor-pointer hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all transform hover:-translate-y-0.5">
          <h3 className="text-xl font-bold mb-1">AP</h3>
          <p className="text-sm text-gray-400">Advanced Placement</p>
        </div>
      </div>

      <div className="bg-[#1e1e2f] border border-purple-900/30 rounded-xl p-6 shadow-lg shadow-purple-500/5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Subject
            </label>
            <select className="w-full p-3 bg-[#121220] rounded-lg border border-purple-900/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white">
              <option>Reading</option>
              <option>Writing</option>
              <option>Math - No Calculator</option>
              <option>Math - Calculator</option>
              <option>Full Test</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Difficulty
            </label>
            <select
              defaultValue="Medium"
              className="w-full p-3 bg-[#121220] rounded-lg border border-purple-900/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Mixed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Mode
            </label>
            <div className="flex">
              <button
                onClick={() => setTestMode("timed")}
                className={`flex-1 py-3 px-4 text-center rounded-l-lg cursor-pointer transition-colors flex items-center justify-center ${
                  testMode === "timed"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-[#121220] text-gray-300 border-y border-l border-purple-900/30"
                }`}
              >
                <Clock className="w-4 h-4 mr-2" />
                Timed
              </button>
              <button
                onClick={() => setTestMode("untimed")}
                className={`flex-1 py-3 px-4 text-center rounded-r-lg cursor-pointer transition-colors flex items-center justify-center ${
                  testMode === "untimed"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-[#121220] text-gray-300 border-y border-r border-purple-900/30"
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Untimed
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Question Count
            </label>
            <select className="w-full p-3 bg-[#121220] rounded-lg border border-purple-900/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white">
              <option>10 Questions</option>
              <option selected>20 Questions</option>
              <option>Full Section</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startTest}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 flex items-center"
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Start Practice Test
          </button>
        </div>
      </div>
    </div>
  );
}
