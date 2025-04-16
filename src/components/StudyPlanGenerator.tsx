"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Calendar, Clock, BookOpen, Award } from "lucide-react";
import { AssessmentResults } from "./AssessmentQuiz";

interface StudyPlanGeneratorProps {
  testDate: string;
  targetScore: number;
  assessmentResults: AssessmentResults;
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

export default function StudyPlanGenerator({
  testDate,
  targetScore,
  assessmentResults,
  onComplete,
}: StudyPlanGeneratorProps) {
  const [generating, setGenerating] = useState(true);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);

  useEffect(() => {
    // Simulate generating a study plan (in a real app, this would be more complex)
    const timer = setTimeout(() => {
      const plan = generateStudyPlan(testDate, targetScore, assessmentResults);
      setStudyPlan(plan);
      setGenerating(false);
      onComplete(plan);
    }, 2500);

    return () => clearTimeout(timer);
  }, [testDate, targetScore, assessmentResults, onComplete]);

  // Calculate weeks until test date
  const calculateWeeksUntilTest = (testDateStr: string): number => {
    const today = new Date();
    const testDate = new Date(testDateStr);
    const timeDiff = testDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return Math.max(1, Math.ceil(daysDiff / 7));
  };

  // Generate study plan based on inputs
  const generateStudyPlan = (
    testDateStr: string,
    targetScore: number,
    assessmentResults: AssessmentResults
  ): StudyPlan => {
    const weeksUntilTest = calculateWeeksUntilTest(testDateStr);

    // Determine focus areas based on assessment results
    const focusAreas =
      assessmentResults.recommendedAreas.length > 0
        ? assessmentResults.recommendedAreas
        : Object.keys(assessmentResults.categoryScores);

    // Calculate recommended study hours
    const recommendedHoursPerWeek = Math.min(
      20,
      Math.max(
        5,
        Math.ceil(
          15 - (assessmentResults.score / assessmentResults.totalQuestions) * 10
        )
      )
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

  if (generating) {
    return (
      <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30 text-center">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Creating Your Study Plan
        </h2>
        <p className="text-gray-400 mb-8">
          Analyzing your strengths and areas for improvement...
        </p>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
          <p className="text-gray-300">This may take a moment...</p>
        </div>
      </div>
    );
  }

  if (!studyPlan) return null;

  return (
    <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Your Personalized Study Plan
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Based on your assessment results and goals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252538] p-5 rounded-lg border border-purple-900/20">
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-200 mb-1">
                Time Until Test
              </h3>
              <p className="text-gray-400 text-sm">
                {studyPlan.weeksUntilTest} weeks until your exam
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#252538] p-5 rounded-lg border border-purple-900/20">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-200 mb-1">
                Recommended Study Time
              </h3>
              <p className="text-gray-400 text-sm">
                {studyPlan.recommendedHoursPerWeek} hours per week
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#252538] p-5 rounded-lg border border-purple-900/20">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-200 mb-1">Focus Areas</h3>
              <p className="text-gray-400 text-sm">
                {studyPlan.focusAreas
                  .map((area) =>
                    area === "reading"
                      ? "Reading & Writing"
                      : area === "math_no_calc"
                      ? "Math (No Calculator)"
                      : "Math (Calculator)"
                  )
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#252538] p-5 rounded-lg border border-purple-900/20">
          <div className="flex items-start gap-3">
            <Award className="w-6 h-6 text-purple-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-200 mb-1">Target Score</h3>
              <p className="text-gray-400 text-sm">{targetScore} out of 1600</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Weekly Plan Preview */}
      {studyPlan.weeklyPlans.length > 0 && (
        <div className="bg-[#252538] p-5 rounded-lg border border-purple-900/20 mb-8">
          <h3 className="font-medium text-gray-200 mb-3">
            Week 1 Focus:{" "}
            {studyPlan.weeklyPlans[0].focus === "reading"
              ? "Reading & Writing"
              : studyPlan.weeklyPlans[0].focus === "math_no_calc"
              ? "Math (No Calculator)"
              : "Math (Calculator)"}
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-purple-400 mb-2">
                Weekly Goals:
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                {studyPlan.weeklyPlans[0].goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-purple-400 mb-2">
                Sample Day (Monday):
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                {studyPlan.weeklyPlans[0].dailyTasks[0].tasks.map(
                  (task, index) => (
                    <li key={index}>{task}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-400 text-sm mb-6">
          Your complete study plan is now available in your dashboard. We'll
          send you daily reminders to keep you on track!
        </p>
      </div>
    </div>
  );
}
