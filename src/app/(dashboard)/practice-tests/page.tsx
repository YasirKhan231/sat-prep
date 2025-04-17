"use client";

import { useState } from "react";
import PracticeTests from "@/components/PracticeTests";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BarChart,
  Target,
  Brain,
  LineChart,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PracticeTestsPage() {
  const [activeTab, setActiveTab] = useState<"tests" | "analytics">("tests");

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Practice Tests & Performance Tracking
          </h1>
          <p className="text-gray-400 mt-2">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-900/30 mb-6">
          <button
            onClick={() => setActiveTab("tests")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "tests"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Available Tests
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Performance Analytics
          </button>
        </div>

        {activeTab === "tests" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all hover:scale-[1.02] group">
                <div className="text-purple-500 mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Full-Length SAT/ACT Simulations
                </h2>
                <p className="text-gray-400 mb-4">
                  Experience real test conditions with accurate time limits and
                  question formats.
                </p>
                <Link
                  href="#"
                  className="text-purple-400 group-hover:text-purple-300 flex items-center gap-1 text-sm font-medium"
                >
                  Start a test <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all hover:scale-[1.02] group">
                <div className="text-purple-500 mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  AI-Generated Mini Tests
                </h2>
                <p className="text-gray-400 mb-4">
                  Personalized short quizzes focusing on your weak areas for
                  targeted improvement.
                </p>
                <Link
                  href="#"
                  className="text-purple-400 group-hover:text-purple-300 flex items-center gap-1 text-sm font-medium"
                >
                  Generate test <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all hover:scale-[1.02] group">
                <div className="text-purple-500 mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Scheduled Practice Plan
                </h2>
                <p className="text-gray-400 mb-4">
                  Follow a structured test schedule to maximize your preparation
                  and build consistency.
                </p>
                <Link
                  href="#"
                  className="text-purple-400 group-hover:text-purple-300 flex items-center gap-1 text-sm font-medium"
                >
                  View schedule <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <PracticeTests />
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Average Score
                </h3>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-purple-400">85%</p>
                  <span className="text-green-400 text-sm font-medium">
                    ↑ 7%
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-900/30">
                  <p className="text-sm text-gray-400">Section breakdown</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Reading</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-[#2d2d3d] rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">82%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Writing</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-[#2d2d3d] rounded-full">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: "88%" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Math</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-[#2d2d3d] rounded-full">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Time Management
                </h3>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-purple-400">45s</p>
                  <span className="text-green-400 text-sm font-medium">
                    ↓ 5s
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Avg. time per question
                </p>

                <div className="mt-4 pt-4 border-t border-purple-900/30">
                  <p className="text-sm text-gray-400">By section</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Reading</span>
                      <span className="text-xs text-gray-300">52s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Writing</span>
                      <span className="text-xs text-gray-300">38s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Math</span>
                      <span className="text-xs text-gray-300">45s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Focus Areas
                </h3>
                <ul className="space-y-3 mt-4">
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Focus on time management in the reading section
                  </li>
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Practice more complex math problems
                  </li>
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    Review grammar rules for writing section
                  </li>
                </ul>

                <div className="mt-6">
                  <Link
                    href="#"
                    className="block text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  >
                    Generate Practice Plan
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Progress Timeline
                </h3>
                <select className="bg-[#252538] text-gray-300 text-sm border border-purple-900/30 rounded-lg px-3 py-1.5">
                  <option>Last 6 tests</option>
                  <option>Last 3 months</option>
                  <option>All time</option>
                </select>
              </div>

              <div className="h-64 relative">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>June 5</span>
                  <span>June 12</span>
                  <span>June 19</span>
                  <span>June 26</span>
                  <span>July 3</span>
                  <span>July 10</span>
                </div>

                <div className="h-48 flex items-end relative">
                  {/* Horizontal guide lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-purple-900/20 w-full h-0"></div>
                    <div className="border-b border-purple-900/20 w-full h-0"></div>
                    <div className="border-b border-purple-900/20 w-full h-0"></div>
                    <div className="border-b border-purple-900/20 w-full h-0"></div>
                  </div>

                  {/* Score lines */}
                  <div className="absolute inset-0">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 600 200"
                      preserveAspectRatio="none"
                    >
                      {/* Reading */}
                      <path
                        d="M0,120 L100,130 L200,100 L300,105 L400,90 L500,85 L600,80"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                      />

                      {/* Math */}
                      <path
                        d="M0,140 L100,135 L200,125 L300,120 L400,110 L500,95 L600,90"
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth="2"
                      />

                      {/* Overall */}
                      <path
                        d="M0,130 L100,125 L200,120 L300,110 L400,100 L500,90 L600,85"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>

                  {/* Score points */}
                  <div className="absolute inset-0">
                    <div className="flex justify-between h-full items-end px-4 pb-5">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs text-gray-400">Overall</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                    <span className="text-xs text-gray-400">Reading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="text-xs text-gray-400">Math</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Test History
              </h3>
              <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-900/30">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Test
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/20">
                    <tr className="hover:bg-purple-900/10">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        Full SAT Practice Test
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        Jul 10, 2023
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                          85%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        3h 10m
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href="#"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Review
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-900/10">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        Math Mini Test
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        Jul 3, 2023
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                          78%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">30m</td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href="#"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Review
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-900/10">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        Reading Comprehension
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        Jun 25, 2023
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                          82%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">45m</td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href="#"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Review
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
