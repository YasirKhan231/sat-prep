"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Calendar, Clock, BookOpen, Award } from "lucide-react";

interface StudyPlanGeneratorProps {
  testDate: string;
  targetScore: number;
  strengths: Record<string, number>;
  onComplete: (studyPlan: StudyPlan) => void;
}

export interface StudyPlan {
  weeksUntilTest: number;
  weeklyPlans: WeeklyPlan[];
  focusAreas: string[];
  recommendedHoursPerWeek: number;
}

interface WeeklyPlan {
  week: number;
  focus: string;
  dailyTasks: DailyTask[];
  goals: string[];
}

interface DailyTask {
  day: string;
  tasks: string[];
}

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const categoryToTopics: Record<string, string[]> = {
  reading: [
    "Critical Reading Comprehension",
    "Vocabulary in Context",
    "Main Idea and Theme",
    "Author's Purpose and Tone",
    "Evidence-Based Reading",
    "Grammar and Punctuation",
  ],
  math_no_calc: [
    "Linear Equations",
    "Systems of Equations",
    "Quadratic Expressions",
    "Word Problems",
    "Functions and Relations",
    "Basic Geometry",
  ],
  math_calc: [
    "Advanced Algebra",
    "Complex Geometry",
    "Data Analysis and Statistics",
    "Trigonometry",
    "Problem Solving Strategies",
    "Calculator Techniques",
  ],
};

// Generate study plan based on inputs
export const generateStudyPlan = (
  testDateStr: string,
  targetScore: number,
  strengths: Record<string, number>
): StudyPlan => {
  const weeksUntilTest = calculateWeeksUntilTest(testDateStr);

  // Determine focus areas based on strengths (prioritize areas with lower scores)
  const focusAreas = Object.entries(strengths)
    .sort(([, a], [, b]) => a - b)
    .map(([category]) => category);

  // Calculate recommended study hours based on average strength
  const avgStrength =
    Object.values(strengths).reduce((a, b) => a + b, 0) /
    Object.values(strengths).length;
  const recommendedHoursPerWeek = Math.min(
    20,
    Math.max(5, Math.ceil(25 - avgStrength * 4))
  );

  // Generate weekly plans
  const weeklyPlans: WeeklyPlan[] = [];

  for (let week = 1; week <= Math.min(weeksUntilTest, 8); week++) {
    // Determine the focus for this week
    const weekFocus = focusAreas[week % focusAreas.length];

    // Generate daily tasks
    const dailyTasks: DailyTask[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const day = weekdays[dayIndex];
      const tasks: string[] = [];

      // Weekend: more intensive study
      if (dayIndex >= 5) {
        // Weekend tasks - practice tests and review
        tasks.push("Complete a timed practice section");
        tasks.push("Review incorrect answers");
        tasks.push("Study flashcards for key concepts");
      } else {
        // Weekday tasks - focused learning
        const topics = categoryToTopics[weekFocus] || [];
        const topic = topics[Math.floor(Math.random() * topics.length)];

        tasks.push(`Study ${topic}`);
        tasks.push("Complete 15 practice questions");

        // Add some variety based on the day
        if (dayIndex === 1 || dayIndex === 3) {
          tasks.push("Watch video lesson on difficult concepts");
        } else if (dayIndex === 0 || dayIndex === 2) {
          tasks.push("Review notes from previous sessions");
        } else {
          tasks.push("Take a short quiz to test knowledge");
        }
      }

      dailyTasks.push({ day, tasks });
    }

    // Set goals for the week
    const goals = [
      `Master basic concepts in ${
        weekFocus === "reading"
          ? "Reading & Writing"
          : weekFocus === "math_no_calc"
          ? "Math (No Calculator)"
          : "Math (Calculator)"
      }`,
      `Complete at least 100 practice questions`,
      `Improve speed and accuracy on ${weekFocus} problems`,
    ];

    weeklyPlans.push({
      week,
      focus: weekFocus,
      dailyTasks,
      goals,
    });
  }

  return {
    weeksUntilTest,
    weeklyPlans,
    focusAreas,
    recommendedHoursPerWeek,
  };
};

// Calculate weeks until test date
const calculateWeeksUntilTest = (testDateStr: string): number => {
  const today = new Date();
  const testDate = new Date(testDateStr);
  const timeDiff = testDate.getTime() - today.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return Math.max(1, Math.ceil(daysDiff / 7));
};

export default function StudyPlanGenerator({
  testDate,
  targetScore,
  strengths,
  onComplete,
}: StudyPlanGeneratorProps) {
  const [generating, setGenerating] = useState(true);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);

  useEffect(() => {
    // Simulate generating a study plan (in a real app, this would be more complex)
    const timer = setTimeout(() => {
      const plan = generateStudyPlan(testDate, targetScore, strengths);
      setStudyPlan(plan);
      setGenerating(false);
      onComplete(plan);
    }, 2500);

    return () => clearTimeout(timer);
  }, [testDate, targetScore, strengths, onComplete]);

  if (generating) {
    return (
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Creating Your Study Plan
        </h2>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-600 animate-pulse"></div>
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-600 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!studyPlan) return null;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Your Personalized Study Plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
        <div className="bg-[#252538] p-4 rounded-lg border border-purple-900/20">
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
            <h3 className="text-sm sm:text-base font-medium">
              Time Until Test
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {studyPlan.weeksUntilTest} weeks
          </p>
        </div>

        <div className="bg-[#252538] p-4 rounded-lg border border-purple-900/20">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
            <h3 className="text-sm sm:text-base font-medium">
              Recommended Study Time
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {studyPlan.recommendedHoursPerWeek} hours/week
          </p>
        </div>
      </div>

      <div className="bg-[#252538] p-4 rounded-lg border border-purple-900/20 mb-4 sm:mb-8">
        <div className="flex items-center mb-3 sm:mb-4">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
          <h3 className="text-sm sm:text-base font-medium">
            Focus Areas (In Order)
          </h3>
        </div>
        <ul className="space-y-2 sm:space-y-3">
          {studyPlan.focusAreas.map((area, index) => (
            <li key={area} className="flex items-center">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs sm:text-sm mr-2">
                {index + 1}
              </span>
              <span className="text-sm sm:text-base">
                {area === "reading"
                  ? "Reading & Writing"
                  : area === "math_no_calc"
                  ? "Math (No Calculator)"
                  : "Math (Calculator)"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#252538] p-4 rounded-lg border border-purple-900/20">
        <div className="flex items-center mb-3 sm:mb-4">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
          <h3 className="text-sm sm:text-base font-medium">Week 1 Preview</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {studyPlan.weeklyPlans[0].goals.map((goal, index) => (
            <div key={index} className="flex items-start">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
