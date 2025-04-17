"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  BarChart2,
  Clock,
  CheckCircle,
  Award,
  Target,
  BookOpen,
  Brain,
  BarChart,
} from "lucide-react";

export default function ProgressPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  // Mock data for progress statistics (will be replaced with real data from userData)
  const [stats, setStats] = useState({
    overallProgress: 68,
    testScores: {
      math: 75,
      reading: 62,
      writing: 68,
    },
    testsTaken: 4,
    questionsAnswered: 256,
    studyHours: 42,
    streak: 8,
    scoreIncreaseRate: 8.5,
  });

  // Mock data for recent activity (will be replaced with real data)
  const [recentActivity, setRecentActivity] = useState([
    {
      type: "test",
      name: "Practice Test #4",
      score: 1320,
      date: "3 days ago",
      improvement: 40,
    },
    {
      type: "study",
      name: "Algebra Review",
      duration: "1.5 hours",
      date: "5 days ago",
    },
    {
      type: "flashcards",
      name: "Grammar Rules",
      cards: 30,
      mastered: 22,
      date: "1 week ago",
    },
  ]);

  // Update stats with userData when available
  useEffect(() => {
    if (userData) {
      // Update with real user data
      const userStats = {
        overallProgress: calculateOverallProgress(userData),
        testScores: getLatestTestScores(userData),
        testsTaken: userData.practiceTests?.length || 0,
        questionsAnswered:
          userData.progressMetrics?.totalQuestionsAnswered || 0,
        studyHours: userData.studyHoursPerWeek || 0,
        streak: userData.streak || 0,
        scoreIncreaseRate: userData.progressMetrics?.improvementRate || 0,
      };

      setStats(userStats);

      // Update recent activity with real data
      if (userData.practiceTests && userData.practiceTests.length > 0) {
        // Transform practice tests to activity format
        const testActivities = userData.practiceTests
          .slice(-3) // Get most recent 3 tests
          .map((test) => {
            return {
              type: "test",
              name: `${test.type === "full" ? "Full Test" : "Mini Test"} #${
                test.testId
              }`,
              score: test.score.total || 0,
              date: formatDate(test.date),
              improvement: calculateImprovement(test, userData.practiceTests),
            };
          });

        setRecentActivity(testActivities);
      }
    }
  }, [userData]);

  // Helper function to calculate overall progress
  const calculateOverallProgress = (userData: any) => {
    if (!userData) return 0;

    // This is a placeholder for real logic
    // Calculate based on tests taken, scores, study time, etc.
    return userData.practiceTests?.length
      ? Math.min(100, userData.practiceTests.length * 15 + userData.streak * 2)
      : Math.min(100, userData.streak * 5);
  };

  // Helper function to get latest test scores
  const getLatestTestScores = (userData: any) => {
    if (!userData?.practiceTests?.length) {
      return { math: 0, reading: 0, writing: 0 };
    }

    // Get the most recent test
    const latestTest =
      userData.practiceTests[userData.practiceTests.length - 1];

    return {
      math: Math.round((latestTest.score.math / 800) * 100),
      reading: Math.round((latestTest.score.reading / 800) * 100),
      writing: Math.round((latestTest.score.writing / 800) * 100),
    };
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.round(
      (now.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.round(diffDays / 7)} weeks ago`;
    return `${Math.round(diffDays / 30)} months ago`;
  };

  // Helper function to calculate score improvement
  const calculateImprovement = (test: any, allTests: any[]) => {
    if (allTests.length < 2) return 0;

    const testIndex = allTests.findIndex((t) => t.testId === test.testId);
    if (testIndex <= 0) return 0;

    const previousTest = allTests[testIndex - 1];
    const currentTotal = test.score.total || 0;
    const previousTotal = previousTest.score.total || 0;

    return currentTotal - previousTotal;
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121220] text-white">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
          <div
            className="w-4 h-4 rounded-full bg-indigo-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Your Progress
          </h1>
          <p className="text-gray-400 mt-2">
            Track your improvement and performance across all study areas
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2 text-purple-400 h-5 w-5" />
              Overall Progress
            </h2>
            <div className="mb-4">
              <div className="h-4 w-full bg-[#252538] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${stats.overallProgress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-right text-sm text-gray-400">
                {stats.overallProgress}% Complete
              </div>
            </div>

            <h3 className="font-medium mb-3 text-gray-300">Subject Scores</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Math</span>
                  <span>{stats.testScores.math}%</span>
                </div>
                <div className="h-2 w-full bg-[#252538] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${stats.testScores.math}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Reading</span>
                  <span>{stats.testScores.reading}%</span>
                </div>
                <div className="h-2 w-full bg-[#252538] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${stats.testScores.reading}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Writing</span>
                  <span>{stats.testScores.writing}%</span>
                </div>
                <div className="h-2 w-full bg-[#252538] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${stats.testScores.writing}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6">
            <h2 className="text-xl font-semibold mb-4">Detailed Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#252538] rounded-lg">
                <div className="flex items-center mb-2 text-purple-400">
                  <Target className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Tests Taken</span>
                </div>
                <p className="text-2xl font-bold">{stats.testsTaken}</p>
              </div>
              <div className="p-4 bg-[#252538] rounded-lg">
                <div className="flex items-center mb-2 text-indigo-400">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Questions</span>
                </div>
                <p className="text-2xl font-bold">{stats.questionsAnswered}</p>
              </div>
              <div className="p-4 bg-[#252538] rounded-lg">
                <div className="flex items-center mb-2 text-blue-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Study Hours</span>
                </div>
                <p className="text-2xl font-bold">{stats.studyHours}</p>
              </div>
              <div className="p-4 bg-[#252538] rounded-lg">
                <div className="flex items-center mb-2 text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Current Streak</span>
                </div>
                <p className="text-2xl font-bold">{stats.streak} days</p>
              </div>
              {stats.scoreIncreaseRate > 0 && (
                <div className="col-span-2 p-4 bg-[#252538] rounded-lg">
                  <div className="flex items-center mb-2 text-yellow-400">
                    <BarChart className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      Avg. Score Increase
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    +{stats.scoreIncreaseRate} points per test
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#252538] rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center mb-1">
                      {activity.type === "test" && (
                        <Target className="h-4 w-4 mr-2 text-purple-400" />
                      )}
                      {activity.type === "study" && (
                        <BookOpen className="h-4 w-4 mr-2 text-blue-400" />
                      )}
                      {activity.type === "flashcards" && (
                        <Brain className="h-4 w-4 mr-2 text-indigo-400" />
                      )}
                      <span className="font-medium">{activity.name}</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <span>{activity.date}</span>

                      {activity.type === "test" && (
                        <span className="ml-3 flex items-center">
                          Score:{" "}
                          <span className="text-white ml-1 font-medium">
                            {activity.score}
                          </span>
                          {activity.improvement > 0 && (
                            <span className="text-green-400 ml-2">
                              +{activity.improvement}
                            </span>
                          )}
                        </span>
                      )}

                      {activity.type === "study" && (
                        <span className="ml-3">
                          Duration:{" "}
                          <span className="text-white ml-1">
                            {activity.duration}
                          </span>
                        </span>
                      )}

                      {activity.type === "flashcards" &&
                        activity.mastered !== undefined && (
                          <span className="ml-3">
                            Mastered:{" "}
                            <span className="text-white ml-1">
                              {activity.mastered}/{activity.cards}
                            </span>
                          </span>
                        )}
                    </div>
                  </div>

                  <div>
                    {activity.type === "test" && activity.improvement > 0 && (
                      <div className="flex items-center text-green-400">
                        <Award className="h-5 w-5 mr-1" />
                        <span>Improved</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>
                No recent activity yet. Start taking tests and studying to see
                your progress!
              </p>
            </div>
          )}
        </div>

        {/* Weekly Performance Chart */}
        <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
          <div className="relative h-64 mt-4">
            {/* Mock chart - In a real app, use a charting library */}
            <div className="absolute inset-0 grid grid-cols-7 gap-2">
              <div className="flex flex-col justify-end">
                <div className="h-[65%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Mon
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[40%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Tue
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[75%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Wed
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[50%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Thu
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[85%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Fri
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[60%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Sat
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="h-[30%] w-full bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-md"></div>
                <div className="text-xs text-center mt-2 text-gray-400">
                  Sun
                </div>
              </div>
            </div>

            {/* Chart legend */}
            <div className="absolute left-0 h-full w-12 flex flex-col justify-between pointer-events-none">
              <div className="text-xs text-gray-400">2h</div>
              <div className="text-xs text-gray-400">1h</div>
              <div className="text-xs text-gray-400">0</div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-gray-400">
            Time spent studying this week:{" "}
            <span className="text-white font-medium">8 hours 15 minutes</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
