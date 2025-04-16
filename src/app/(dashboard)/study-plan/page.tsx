"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

type Plan = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  duration?: string;
  intensity?: string;
  mockTests?: string;
  dailyStudy?: string;
};

type Task = {
  id: string;
  type?: "reading" | "math" | "writing";
  title: string;
  duration: string;
};

type Day = {
  name: string;
  tasks: Task[];
};

const plansData: Plan[] = [
  {
    id: "fast-track",
    emoji: "🚀",
    title: "Fast Track Plan",
    description: "2 Weeks to Go",
    duration: "2 weeks",
    intensity: "High",
    mockTests: "1-2 per week",
    dailyStudy: "3-4 hours",
  },
  {
    id: "slow-steady",
    emoji: "🐢",
    title: "Slow & Steady Plan",
    description: "3 Months Prep",
    duration: "3 months",
    intensity: "Medium",
    mockTests: "1 per 2 weeks",
    dailyStudy: "1-2 hours",
  },
  {
    id: "weekend-warrior",
    emoji: "🏋️",
    title: "Weekend Warrior",
    description: "Busy Weekdays",
    duration: "2 months",
    intensity: "Medium",
    mockTests: "1 per week",
    dailyStudy: "4-5 hours (weekends)",
  },
  {
    id: "section-focused",
    emoji: "🎯",
    title: "Section-Focused Plan",
    description: "Target Weak Areas",
    duration: "6 weeks",
    intensity: "High",
    mockTests: "1 per week",
    dailyStudy: "2-3 hours",
  },
];

const sampleWeek: Day[] = [
  {
    name: "Monday",
    tasks: [
      {
        id: "1",
        type: "reading",
        title: "Reading: Literary Passage",
        duration: "45m",
      },
      {
        id: "2",
        type: "math",
        title: "Math: Algebraic Expressions",
        duration: "30m",
      },
      {
        id: "3",
        type: "writing",
        title: "Writing: Standard English Conventions",
        duration: "30m",
      },
    ],
  },
  {
    name: "Tuesday",
    tasks: [
      {
        id: "4",
        type: "reading",
        title: "Reading: Science Passage",
        duration: "45m",
      },
      {
        id: "5",
        type: "math",
        title: "Math: Problem Solving",
        duration: "45m",
      },
      {
        id: "6",
        type: "writing",
        title: "Writing: Expression of Ideas",
        duration: "30m",
      },
    ],
  },
];

export default function StudyPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [currentView, setCurrentView] = useState<
    "selection" | "detail" | "dashboard" | "customization"
  >("selection");
  const [studyDays, setStudyDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [studyHours, setStudyHours] = useState(2);
  const [selectedSubjects, setSelectedSubjects] = useState({
    reading: true,
    writing: true,
    math: true,
  });

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentView("detail");
  };

  const handleStartPlan = () => {
    setCurrentView("dashboard");
  };

  const handleCustomizePlan = () => {
    setCurrentView("customization");
  };

  const handleSaveCustomization = () => {
    setCurrentView("dashboard");
  };

  const handleCancelCustomization = () => {
    setCurrentView("detail");
  };

  const toggleStudyDay = (day: keyof typeof studyDays) => {
    setStudyDays({ ...studyDays, [day]: !studyDays[day] });
  };

  const toggleNotificationPref = (pref: keyof typeof notificationPrefs) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [pref]: !notificationPrefs[pref],
    });
  };

  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            SAT Study Planner
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView("selection")}
              className="px-4 py-2 rounded-lg bg-[#1e1e2f] border border-purple-900/30 hover:border-purple-500/50 transition-colors"
            >
              Select Plan
            </button>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="px-4 py-2 rounded-lg bg-[#1e1e2f] border border-purple-900/30 hover:border-purple-500/50 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>

        {currentView === "selection" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plansData.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan)}
                className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{plan.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Duration: {plan.duration}</p>
                  <p>Intensity: {plan.intensity}</p>
                  <p>Mock Tests: {plan.mockTests}</p>
                  <p>Daily Study: {plan.dailyStudy}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === "detail" && selectedPlan && (
          <div className="bg-[#1e1e2f] rounded-xl p-6 border border-purple-900/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedPlan.title}
                </h2>
                <p className="text-gray-400">{selectedPlan.description}</p>
              </div>
              <div className="text-4xl">{selectedPlan.emoji}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Plan Details</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Duration: {selectedPlan.duration}</p>
                  <p>Intensity: {selectedPlan.intensity}</p>
                  <p>Mock Tests: {selectedPlan.mockTests}</p>
                  <p>Daily Study: {selectedPlan.dailyStudy}</p>
                </div>
              </div>
              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Sample Week</h3>
                <div className="space-y-2">
                  {sampleWeek.map((day) => (
                    <div key={day.name} className="text-sm">
                      <p className="font-medium text-purple-400">{day.name}</p>
                      <div className="ml-4 space-y-1">
                        {day.tasks.map((task) => (
                          <p key={task.id} className="text-gray-300">
                            {task.title} ({task.duration})
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView("dashboard")}
                className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Start Plan
              </button>
              <button
                onClick={() => setCurrentView("customization")}
                className="px-6 py-2 rounded-lg bg-[#252538] hover:bg-[#2d2d3d] transition-colors"
              >
                Customize Plan
              </button>
            </div>
          </div>
        )}

        {currentView === "dashboard" && (
          <div className="bg-[#1e1e2f] rounded-xl p-6 border border-purple-900/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Study Plan Dashboard</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentView("selection")}
                  className="px-4 py-2 rounded-lg bg-[#252538] hover:bg-[#2d2d3d] transition-colors"
                >
                  Change Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="font-semibold mb-4">This Week's Schedule</h3>
                <div className="space-y-4">
                  {sampleWeek.map((day) => (
                    <div
                      key={day.name}
                      className="border-b border-purple-900/30 pb-4"
                    >
                      <p className="font-medium text-purple-400 mb-2">
                        {day.name}
                      </p>
                      <div className="space-y-2">
                        {day.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between bg-[#1e1e2f] p-2 rounded"
                          >
                            <span className="text-sm">{task.title}</span>
                            <span className="text-xs text-gray-400">
                              {task.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div className="bg-[#1e1e2f] p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">
                      Overall Progress
                    </p>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">75% Complete</p>
                  </div>
                  <div className="bg-[#1e1e2f] p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Upcoming Tasks</p>
                    <div className="space-y-2">
                      {sampleWeek[0].tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{task.title}</span>
                          <span className="text-xs text-gray-400">
                            {task.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
