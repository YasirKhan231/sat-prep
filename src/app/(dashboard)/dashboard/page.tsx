"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, doc, updateDoc } from "@/lib/firebase";
import { hasCompletedOnboarding, getUserProfile } from "@/lib/userProfile";
import {
  UserProgress,
  defaultUserProgress,
  getUserProgress,
  updateUserProgress,
} from "@/lib/schemas/userProgress";
import Link from "next/link";
import {
  Sun,
  Moon,
  MessageSquare,
  LogOut,
  BarChart2,
  BookOpen,
  Brain,
  FileText,
  Award,
  Zap,
  Star,
  Check,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import LevelUpModal from "@/components/LevelUpModal";
import AIChatbot from "@/components/AIChatbot";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userProgress, setUserProgress] =
    useState<UserProgress>(defaultUserProgress);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [levelUpRewards, setLevelUpRewards] = useState<{
    level: number;
    xpBonus?: number;
    newFeature?: string;
    badge?: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
      return;
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Check if user has completed onboarding
    const checkOnboardingStatus = async () => {
      if (user) {
        try {
          const completed = await hasCompletedOnboarding(user.uid);
          if (!completed) {
            router.push("/onboarding");
            return;
          }
          setCheckingOnboarding(false);

          // Get user profile data
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);

          // Get user progress data
          await loadUserProgress();
        } catch (error) {
          console.error("Error checking onboarding status:", error);
          setCheckingOnboarding(false);
        }
      }
    };

    if (user) {
      checkOnboardingStatus();
    }
  }, [user, loading, router]);

  // Load user progress from firestore
  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progress = await getUserProgress(user.uid);
      setUserProgress(progress);
      setLoadingProgress(false);
    } catch (error) {
      console.error("Error loading user progress:", error);
      setLoadingProgress(false);
    }
  };

  // Toggle daily goal completion
  const toggleDailyGoal = async (goalId: string) => {
    if (!user) return;

    // Find the goal
    const updatedGoals = userProgress.dailyGoals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    });

    // Calculate XP to add if completing (not uncompleting)
    const goal = userProgress.dailyGoals.find((g) => g.id === goalId);
    let xpChange = 0;
    if (goal && !goal.completed) {
      xpChange = goal.xp;
    } else if (goal && goal.completed) {
      xpChange = -goal.xp; // Remove XP if uncompleting
    }

    // Check if all goals are now completed
    const allCompleted = updatedGoals.every((goal) => goal.completed);

    // Add streak bonus if completing all goals for the first time today
    let streakChange = 0;
    const today = new Date().toISOString().split("T")[0];

    if (allCompleted && !userProgress.dailyGoalCompleted) {
      // Check if last study date was yesterday
      const lastDate = new Date(userProgress.lastStudyDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastDate.toISOString().split("T")[0] ===
          yesterday.toISOString().split("T")[0] ||
        userProgress.streak === 0
      ) {
        // Increase streak and add bonus XP
        streakChange = 1;
        xpChange += 10 * (userProgress.streak + 1); // Bonus XP based on streak
      }
    } else if (!allCompleted && userProgress.dailyGoalCompleted) {
      // No streak change, but update daily goal completion status
    }

    // Calculate new XP and level
    let newXP = userProgress.xp + xpChange;
    let newLevel = userProgress.level;
    let newXpToNextLevel = userProgress.xpToNextLevel;
    let didLevelUp = false;

    // Level up if XP threshold reached
    while (newXP >= newXpToNextLevel) {
      newXP -= newXpToNextLevel;
      newLevel++;
      newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5); // Increase XP needed for next level
      didLevelUp = true;

      // Set rewards for level up modal
      const levelRewards: {
        level: number;
        xpBonus: number;
        badge?: string;
      } = {
        level: newLevel,
        xpBonus: newLevel * 5, // Scale bonus with level
      };

      // Add badge reward for certain levels
      if (newLevel === 5) {
        levelRewards.badge = "Dedicated Scholar";
      } else if (newLevel === 10) {
        levelRewards.badge = "Knowledge Master";
      }

      setLevelUpRewards(levelRewards);
    }

    // Update user progress
    const updatedProgress = {
      ...userProgress,
      dailyGoals: updatedGoals,
      dailyGoalCompleted: allCompleted,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: newXpToNextLevel,
      streak: userProgress.streak + streakChange,
      lastStudyDate: today,
    };

    // Add to recent activities if completing a goal
    if (goal && !goal.completed) {
      const newActivity = {
        id: Date.now().toString(),
        type: "goal" as const,
        title: `Completed: ${goal.title}`,
        timestamp: new Date().toISOString(),
        xpEarned: goal.xp,
      };

      updatedProgress.recentActivities = [
        newActivity,
        ...updatedProgress.recentActivities.slice(0, 9), // Keep last 10 activities
      ];
    }

    setUserProgress(updatedProgress);

    // Update firestore
    try {
      await updateUserProgress(user.uid, updatedProgress);

      // Show level up modal if user leveled up
      if (didLevelUp && levelUpRewards) {
        setShowLevelUpModal(true);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading || checkingOnboarding || !user || loadingProgress) {
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

  // Calculate XP progress percentage
  const xpProgressPercentage = Math.floor(
    (userProgress.xp / userProgress.xpToNextLevel) * 100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* User Progress Panel */}
        <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-6 border border-purple-900/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">
                Hey {user.displayName || user.email?.split("@")[0]}!
              </h2>
              <p className="text-gray-400">
                {userProgress.dailyGoalCompleted
                  ? "All daily goals complete! 🎉"
                  : "Complete your daily goals to earn XP and keep your streak going!"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Streak indicator */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/30 rounded-full px-3 py-1.5">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-yellow-300">
                  {userProgress.streak} day
                  {userProgress.streak !== 1 ? "s" : ""} streak
                </span>
              </div>
            </div>
          </div>

          {/* Level progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-400" />
                <span className="font-medium">Level {userProgress.level}</span>
              </div>
              <span className="text-sm text-gray-400">
                {userProgress.xp} / {userProgress.xpToNextLevel} XP to next
                level
              </span>
            </div>
            <div className="w-full h-2 bg-[#2d2d3d] rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all"
                style={{ width: `${xpProgressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Daily goals */}
          <div className="bg-[#252538] rounded-lg p-4 border border-purple-900/20">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Daily Goals
              </h3>
              <span className="text-sm bg-[#1e1e2f] px-2 py-0.5 rounded-md text-gray-400">
                {userProgress.dailyGoals.filter((g) => g.completed).length} /{" "}
                {userProgress.dailyGoals.length} completed
              </span>
            </div>

            <div className="space-y-3">
              {userProgress.dailyGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleDailyGoal(goal.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    goal.completed
                      ? "bg-purple-900/20 border border-purple-500/30"
                      : "bg-[#2d2d3d] hover:bg-[#32324a] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        goal.completed
                          ? "bg-purple-600"
                          : "border-2 border-gray-600"
                      }`}
                    >
                      {goal.completed && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span
                      className={
                        goal.completed
                          ? "text-gray-300 line-through"
                          : "text-white"
                      }
                    >
                      {goal.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium bg-[#1e1e2f] px-2 py-0.5 rounded-md">
                    <Zap className="h-3 w-3" />
                    {goal.xp} XP
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-400" /> Upcoming Test
              Date
            </h3>
            <div className="text-3xl font-bold text-purple-400 mb-1">28</div>
            <div className="text-sm text-gray-400">Days Remaining</div>
          </div>
          <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-400" /> Study Plan
              Progress
            </h3>
            <div className="text-3xl font-bold text-purple-400 mb-1">65%</div>
            <div className="text-sm text-gray-400">Completion Rate</div>
          </div>
          <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-400" /> Recent
              Achievement
            </h3>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {userProgress.streak > 0
                ? `${userProgress.streak} day${
                    userProgress.streak !== 1 ? "s" : ""
                  }`
                : "Start Today"}
            </div>
            <div className="text-sm text-gray-400">Study Streak</div>
          </div>
        </div>

        {/* Recent Activity */}
        {userProgress.recentActivities.length > 0 && (
          <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {userProgress.recentActivities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-purple-900/20 pb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#252538] flex items-center justify-center">
                      {activity.type === "goal" && (
                        <Check className="h-5 w-5 text-green-400" />
                      )}
                      {activity.type === "quiz" && (
                        <Brain className="h-5 w-5 text-blue-400" />
                      )}
                      {activity.type === "practice" && (
                        <BarChart2 className="h-5 w-5 text-yellow-400" />
                      )}
                      {activity.type === "streak" && (
                        <Star className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white">{activity.title}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Zap className="h-4 w-4" />
                    <span className="font-medium">+{activity.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/tests"
            className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="text-purple-500 mb-4">
              <BarChart2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Take Practice Test</h3>
            <p className="text-gray-400">Challenge yourself and earn 50+ XP</p>
          </Link>
          <Link
            href="/lessons"
            className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="text-purple-500 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Study Lessons</h3>
            <p className="text-gray-400">Learn with AI-powered lessons</p>
          </Link>
          <Link
            href="/ai-lessons"
            className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="text-purple-500 mb-4">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Tutor Chat</h3>
            <p className="text-gray-400">Get help with difficult concepts</p>
          </Link>
          <Link
            href="/flashcards/quick"
            className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="text-purple-500 mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">5-min Quick Quiz</h3>
            <p className="text-gray-400">Complete a quick quiz for 20 XP</p>
          </Link>
        </div>

        {/* Level Up Modal */}
        {showLevelUpModal && levelUpRewards && (
          <LevelUpModal
            level={levelUpRewards.level}
            onClose={() => setShowLevelUpModal(false)}
            rewards={levelUpRewards}
          />
        )}

        {/* AI Chatbot */}
        <AIChatbot
          isOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
          userId={user?.uid || ""}
        />
      </div>
    </DashboardLayout>
  );
}
